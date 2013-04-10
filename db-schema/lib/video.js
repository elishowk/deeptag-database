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
    'trim': true,
    'validate': [function (value) {
      try {
        /** TODO check real video url **/
        check(value).isUrl();
      } catch (e) {
        return false;
      }
    }]
  },
  'user': {
    'type': Schema.Types.ObjectId,
    'required': true,
    'index': true
  }
}, {
  'collection': 'video',
  'strict': true
});
