'use strict';

var Schema = require('mongoose').Schema;

module.exports = new Schema({
  'body': {
    'type': String,
    'required': true,
    'trim': true
  },
  'reference': {
    'type': Number,
    'index': true
  },
  'user': {
    'type': String,
    'required': true,
    'index': true,
  },
  'published': {
    'type': String
  },
  'video': {
    'type': String,
    'required': true,
    'index': true
  },
  'meta': {
    'type': Schema.Types.Mixed
  }
}, {
  'collection': 'message',
  'strict': true
});
