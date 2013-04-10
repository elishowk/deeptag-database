'use strict';

var Schema = require('mongoose').Schema;

module.exports = new Schema({
  'title': {
    'type': String,
    'required': true
  },
  'uri': {
    'type': String,
    'required': true
  },
  'user': {
    'type': String,
    'required': true,
    'index': true
  },
  'category': {
    'type': Schema.Types.Mixed
  },
  'meta': {
    'type': Schema.Types.Mixed
  },
  'published': {
    'type': String
  }
}, {
  'collection': 'video',
  'strict': true
});
