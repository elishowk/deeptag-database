'use strict';

var spore = require('spore');
var UserModel = require('../lib/db').model('user');
/**
 * spore youtubeclient
 */
var youtubeclient = spore.createClient(__dirname +'/youtube-data.json');

var getWidget = function(callback, query) {
  var params = {
    'v': 2,
    'orderby': 'viewCount',
    'alt': 'json'
  };
  if (query.q) {
    params.q = query.q;
  }
  if (query.orderby) {
    params.orderby = query.orderby;
  }
  if (query.maxResults) {
    params['max-results'] = query.maxResults;
  }
  if (query.startIndex) {
    params['start-index'] = query.startIndex;
  }
  if (query.category) {
    params.category = query.category;
  }
  if (query.fields) {
    params.fields = query.fields;
  }

  youtubeclient.getVideos(params, function(err, result) {
    if(err) {
      console.error(err);
      // TODO reject job
      return;
    }
    callback(result);
  });
};

var getComments = module.exports = function() {
  getWidget(function(result) {
    var body = JSON.parse(result.body);
    body.feed.entry.forEach(function(item) {
      // TODO try catch here
      console.log(item);
      //console.log(item['gd$comments']['gd$feedLink']['href']);
      var user = new UserModel({
        'username': item.author[0].name['$t'],
        'id': item.author[0]['yt$userId']['$t'],
        'uri': item.author[0].uri['$t']
      });
      user.save(function (err, data) {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  }, {
    'fields': 'entry(gd:comments,link,author,category)'
  });
};
