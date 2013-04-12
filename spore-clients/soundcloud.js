
'use strict';

var spore = require('spore');
var UserModel = require('../lib/db').model('user');
/**
 * spore youtubeclient
 */
var client = spore.createClient(__dirname +'/soundcloud.json');
var config = require('../config/env.' + process.env.NODE_ENV);

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
    console.log(result);
  }, {
    'consumer_key': config.soundcloud.consumer_key
  });
};
