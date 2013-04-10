'use strict';

var Schema = require('mongoose').Schema;

module.exports = new Schema({
  'username': {
    'type': String,
    'index': true
  },
  'id': {
    'type': String,
    'required': true,
    'index': true
  },
  'uri': {
    'type': String,
  }
}, {
  'collection': 'user',
  'strict': true,
  'versionKey': false,
  '_id': false
});
