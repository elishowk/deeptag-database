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
    'format': 'json',
    'limit': 10,
    'offset': 0
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

var saveUser = function(item) {
  if (item.comment_count === 0) {
    return false;
  }
  var user = new UserModel({
    'username': item.user.username,
    'url': item.user.uri,
    'id': item.user.id
  });
  user.save();
  return user;
};

var saveWidget = function(item, user) {
  if (item.comment_count === 0) {
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
  widget.save();
  return widget;
};

var saveComments = function(widget, config) {
  getComments(function(result) {
    debugger;
    if (result.status !== 200) {
      // FIXME reject job
      return;
    }
    var data = JSON.parse(result.body);
    var selectedData = data.map(function(item) {
      var user = saveUser(item);
      if (user === false) {
        return;
      }
      return {
        'body': item.body,
        'created_at': item.created_at,
        'id': item.id,
        'reference': item.timestamp,
        'user': user._id,
        'widget': widget._id
      };
    });
    MessageModel.create(selectedData, function(err, indata) {
      if (err) {
        console.log(err);
      }
      console.log(indata);
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
  getWidget(function(result) {
    if (result.status !== 200) {
      // FIXME reject job
      return;
    }
    var data = JSON.parse(result.body);
    console.log(data);
    data.forEach(function(item) {
      var user = saveUser(item);
      if (user === false) {
        return;
      }

      var widget = saveWidget(item, user);
      if (widget === false) {
        return;
      }
      saveComments(widget, config);
    });
  }, {
    'consumer_key': config.soundcloud.consumer_key
  });
};
