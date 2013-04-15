'use strict';

var Schema = require('mongoose').Schema;
var check = require('validator').check;

module.exports = new Schema({
  'title': {
    'type': String,
    'required': true,
    'trim': true,
    'match': /^.{0,100}$/
  },
  'video': {
    'type': String,
    'required': true,
    'trim': true
  },
  'permalink': {
    'type': String,
    'required': true,
    'trim': true,
    'index': { 'unique': true }
  },
  'id': {
    'type': String,
    'required': true,
    'trim': true,
    'index': { 'unique': true }
  },
  'created_at': {
    'type': Date
  },
  'user': {
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true
  }
}, {
  'collection': 'widget',
  'strict': true
});
