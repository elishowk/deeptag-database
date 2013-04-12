'use strict';


/**
 * configuration: REPLACE_WITH_ENV (process.env.NODE_ENV)
 */
var config = module.exports = function () {
  /**
    * database
    */
  var db = require('../lib/db');
  db.open('localhost', 'deeptag-database-dev');
};

