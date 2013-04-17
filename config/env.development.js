'use strict';


/**
 * configuration: REPLACE_WITH_ENV (process.env.NODE_ENV)
 */
var config = module.exports = function () {
  /**
    * database
    */
  var db = require('../lib/db');
  db.open('localhost', 'deeptag-dev');
  db.on('error', function() {
    console.error(arguments);
  });
};

config.soundcloud = {
  'consumer_key': '13f889003b89e2fd9162d70310a856e1',
  'limit': 20,
  'videoGoal': 1000,
  'offset': 1000
};
