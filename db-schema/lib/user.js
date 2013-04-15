'use strict';

var Schema = require('mongoose').Schema;
var check = require('validator').check;

module.exports = new Schema({
  'username': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    //'match': /\w{3,15}/,
    'index': {'unique': true}
  },
  'url': {
    'type': String,
    'select': false
  },
  'id': {
    'type': String,
    'required': true,
    'trim': true,
    'index': { 'unique': true }
  },
  'meta': {
    'type': [{
      'key': {
        'type': String,
        'required': true
      },
      'value': {
        'type': Schema.Types.Mixed,
        'required': true
      }
    }],
    'select': false
  }
}, {
  'collection': 'user',
  'strict': true
});
