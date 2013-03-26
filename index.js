'use strict';

var spore = require('spore');
//var job = require('./lib/job');

/**
 * spore client
 */
var client = spore.createClient(__dirname +'/youtube-data.json');

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

  client.getVideos(params, function(err, result) {
    if(err) {
      console.error(err);
      // TODO reject job
      return;
    }
    callback(result);
  });
};

getVideos(function(result) {
  console.log(result);
}, null, 'viewCount', 10, null, null, 'entry(gd:comments)');
