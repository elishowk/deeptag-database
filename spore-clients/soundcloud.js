'use strict';

var spore = require('spore');
var UserModel = require('../lib/db').model('user');
var WidgetModel = require('../lib/db').model('widget');
var MessageModel = require('../lib/db').model('message');


/**
 * spore youtubeclient
 */
var client = spore.createClient(__dirname +'/soundcloud.json');

var getWidget = function(callback, query) {
  var params = {
    'format': 'json',
    'order': 'hotness',
    'limit': 10,
    'offset': 0
  };
  if (query.orderby) {
    params.order = query.orderby;
  }
  if (query.category) {
    params.genres = query.category;
  }
  if (query.limit) {
    params.limit = query.limit;
  }
  if (query.offset) {
    params.offset = query.offset;
  }
  params.consumer_key = query.consumer_key;
  client.getTracks(params, function(err, result) {
    if(err) {
      console.error(err);
      // TODO reject or retry later
      return;
    }
    callback(result);
  });
};

var getComments = function(callback, query) {
  var params = {
    'format': 'json'
  };
  if (query.limit) {
    params.limit = query.limit;
  }
  if (query.offset) {
    params.offset = query.offset;
  }
  params.consumer_key = query.consumer_key;
  params.id = query.id;

  client.getComments(params, function(err, result) {
    if(err) {
      console.error(err);
      // TODO reject or retry later
      return;
    }
    callback(result);
  });
};

var saveUser = function(item, cb) {
  var user = new UserModel({
    'username': item.user.username,
    'url': item.user.uri,
    'id': item.user.id
  });
  user.save(function(err, user) {
    if (err) {
      console.error(err);
    }
    if (err && err.code === 11000) {
      UserModel.findOne({'id': item.user.id}, function(err, user) {
        if(err) {
          return;
        }
        if (user) {
          cb(user);
        }
      });
      return;
    }
    cb(user);
  });
};

var saveWidget = function(item, user, cb) {
  if (item.comment_count && item.comment_count === 0) {
    return false;
  }
  var widget = new WidgetModel({
    'title': item.title,
    'video': item.permalink_url,
    'user': user._id,
    'created_at': new Date(item.created_at),
    'permalink': item.permalink_url,
    'id': item.id
  });
  widget.save(function(err, widget) {
    if (err) {
      console.error(err);
      return;
    }
    cb(widget);
  });
};

var saveComments = function(widget, config) {
  getComments(function(result) {
    if (result.status !== 200) {
      // FIXME reject job
      return;
    }
    var data = JSON.parse(result.body);
    data.forEach(function(item) {
      saveUser(item, function(user) {
        if (!user) {
          return;
        }
        var msg = new MessageModel({
          'body': item.body,
          'created_at': item.created_at,
          'id': item.id,
          'reference': item.timestamp,
          'user': user._id,
          'widget': widget._id
        });
        msg.save(function(err) {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  }, {
    'id': widget.id,
    'consumer_key': config.soundcloud.consumer_key
  });
};

/**
 * Main crawling function
 */
module.exports = function(config) {
  var onGetWidget = function(result) {
    if (result.status !== 200) {
      // FIXME reject job
      return;
    }
    var data = JSON.parse(result.body);
    data.forEach(function(item) {
      saveUser(item, function(user) {
        saveWidget(item, user, function(widget) {
          saveComments(widget, config);
        });
      });

    });
  };
  for (var offset = config.soundcloud.offset; offset <= config.soundcloud.offset + config.soundcloud.videoGoal; offset=offset+config.soundcloud.limit) {
    getWidget(onGetWidget, {
      'offset': offset,
      'limit': config.soundcloud.limit,
      'consumer_key': config.soundcloud.consumer_key
    });
  }
};
