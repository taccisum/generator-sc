'use strict'

const Base = require('./base')
const moment = require('moment')

/**
 * scaffold info
 */
module.exports = class Info extends Base {
  generate () {
    this._write('info.md', this._template('info.md', {
      title: '脚手架信息 by Generator SC(Spring Cloud)',
      current: moment.now(),
      version: 'xxx',
      node: 'xxx',
      yo: 'xxx',
      method: 'xxx',
      github_url: 'https://github.com/taccisum/generator-sc'
    }))
  }
}
