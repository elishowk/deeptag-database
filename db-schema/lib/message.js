'use strict';

var Schema = require('mongoose').Schema;
var check = require('validator').check;

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
  },
  'id': {
    'type': String,
    'required': true,
    'index': { 'unique': true }
  }
}, {
  'collection': 'message',
  'strict': true
});
