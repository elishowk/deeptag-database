
'use strict';

var spore = require('spore');
var UserModel = require('../lib/db').model('user');
var WidgetModel = require('../lib/db').model('widget');


/**
 * spore youtubeclient
 */
var client = spore.createClient(__dirname +'/soundcloud.json');

var getWidget = function(callback, query) {
  var params = {
    'format': 'json',
    'order': 'hotness'
  };
  if (query.orderby) {
    params.order = query.orderby;
  }
  if (query.category) {
    params.genres = query.category;
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

var getComments = module.exports = function(config) {
  getWidget(function(result) {
    if (result.status !== 200) {
      // FIXME reject job
      return;
    }
    var data = JSON.parse(result.body);
    data.forEach(function(item) {
      if (item.comment_count === 0) {
        return;
      }
      var user = new UserModel({
        'username': item.user.username,
        'meta': [{
          'key': 'id',
          'value': item.user.id
        }],
        'url': item.user.uri
      });

      var widget = new WidgetModel({
        'title': item.title,
        'video': item.permalink_url,
        'user': user._id,
        'published': new Date(item.created_at),
        'permalink': item.permalink_url
      });
      widget.save();
    });
  }, {
    'consumer_key': config.soundcloud.consumer_key
  });
};
