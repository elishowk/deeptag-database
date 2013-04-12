'use strict';

var thoonk = require('thoonk').createClient(
    'localhost',
    6379,
    1
);
module.exports = thoonk.job('deeptag-job-queue');
