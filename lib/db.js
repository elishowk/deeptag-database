'use strict';

// TODO handle timestamps (see http://docs.mongodb.org/manual/reference/method/ObjectId.getTimestamp/#ObjectId.getTimestamp and http://stackoverflow.com/questions/12669615/add-created-at-and-updated-at-fields-to-mongoose-schemas/12670523#answer-12670523)

var mongoose = require('mongoose');

module.exports = mongoose.createConnection();
