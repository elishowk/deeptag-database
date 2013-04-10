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
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true,
    'ref': 'user'
  },
  'video': {
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true
  }
}, {
  'collection': 'message',
  'strict': true
});
