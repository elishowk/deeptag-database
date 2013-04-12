'use strict';

var Schema = require('mongoose').Schema;
var check = require('validator').check;

module.exports = new Schema({
  'body': {
    'type': String,
    'required': true,
    'trim': true,
    'validate': [function (value) {
      try {
        check(value).len(1, 250);
      } catch (e) {
        return false;
      }
    }]
  },
  'reference': {
    'type': Number,
    'index': true
  },
  'likeCount': {
    'type': Number,
    'default': 0
  },
  'like': {
    'type': [Schema.Types.ObjectId],
    'select': false
  },
  'user': {
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true,
    'ref': 'user'
  },
  'widget': {
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true
  }
}, {
  'collection': 'message',
  'strict': true
});
