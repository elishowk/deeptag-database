'use strict';

/**
  * database
  */
var db = require('./lib/db');


/**
 * configuration: local
 */
var config = require('./config/env.' + process.env.NODE_ENV);
config();


/**
 * Set models
 */
db.model('message', require('./db-schema').Message);
db.model('widget', require('./db-schema').Widget);
db.model('user', require('./db-schema').User);

// TODO
var getMostViewedComments = require('./spore-clients/youtube');
getMostViewedComments();
