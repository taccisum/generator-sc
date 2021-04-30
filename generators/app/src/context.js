'use strict'

const moment = require('moment');

module.exports = class Context {
  constructor (generator, args) {
    this.generator = generator;
    this.args = args || {};
    this.current = moment();
    this.dateFormat = {
      full: 'yyyy-MM-DD hh:mm:ss A ddd'
    }
  }
}
