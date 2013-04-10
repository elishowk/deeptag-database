'use strict';

var spore = require('spore');
//var job = require('./lib/job');


/**
 * configuration: local
 */
var config = require('./config/env.' + process.env.NODE_ENV);
config();

var MessageModel = require('./lib/db').model('message');
var VideoModel = require('./lib/db').model('video');
var UserModel = require('./lib/db').model('user');

/**
 * spore youtubeclient
 */
var youtubeclient = spore.createClient(__dirname +'/spore-specifications-deeptag/youtube-data.json');

var getVideos = function(callback, q, orderby, maxResults, startIndex, category, fields) {
  var params = {
    'v': 2,
    'orderby': 'viewCount',
    'alt': 'json'
  };
  if (q) {
    params.q= q;
  }
  if (orderby) {
    params.orderby = orderby;
  }
  if (maxResults) {
    params['max-results'] = maxResults;
  }
  if (startIndex) {
    params['start-index'] = startIndex;
  }
  if (category) {
    params.category = category;
  }
  if (fields) {
    params.fields = fields;
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

getVideos(function(result) {
  var body = JSON.parse(result.body);
  body.feed.entry.forEach(function(item) {
    // TODO try catch here
    console.log(item['gd$comments']['gd$feedLink']['href']);
  });
}, null, 'viewCount', 50, null, null, 'entry(gd:comments)');
