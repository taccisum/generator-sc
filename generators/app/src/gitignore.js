'use strict'

const BaseComponent = require('./base_component');

module.exports = class GitIgnore extends BaseComponent {
  prompt () {
    console.log('gitignore')
    this.enabled = true;
  }

  generate () {
    console.log('aaaa')
    this._write('.gitignore', this._template('.gitignore', {
    }))
  }
}
