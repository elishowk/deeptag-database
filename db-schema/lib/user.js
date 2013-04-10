'use strict';

var Schema = require('mongoose').Schema;
var check = require('validator').check;

module.exports = new Schema({
  'deletedAt': {
    'type': Date,
    'index': true,
    'select': false
  },
  'username': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    'match': /\w{3,15}/,
    'index': {'unique': true}
  },
  'email': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    'validate': [function (value) {
      try {
        check(value).isEmail();
      } catch (e) {
        return false;
      }
    }],
    'index': {'unique': true},
    'select': false
  },
  'emailMd5': {
    'type': String,
    'required': true,
    'trim': true,
    'lowercase': true,
    'match': /[a-f0-9]{32}/
  },
  'password': {
    'type': String,
    'required': true,
    'index': true,
    'select': false
    // NOTE: as password is stored encrypted, length is checked in routes
  },
  'url': {
    'type': String,
    'select': false
  },
  'twitter': {
    'type': String,
    'trim': true,
    'lowercase': true,
    'match': /\w{1,15}/,
    'select': false
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
  },
  'account': {
    'type': String,
    'enum': ['free', 'lite', 'standard', 'pro'],
    'required': true,
    'trim': true,
    'select': false
  }
}, {
  'collection': 'user',
  'strict': true
});
