'use strict'

module.exports = class Context {
  constructor (generator, args) {
    this.generator = generator;
    this.args = args || {};
  }
}
