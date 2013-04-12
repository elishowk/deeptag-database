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

// TODO better API and jobs
var getComments = require('./spore-clients/youtube');
getComments(config);

getComments = require('./spore-clients/soundcloud');
getComments(config);
