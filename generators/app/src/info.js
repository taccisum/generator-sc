'use strict'

const moment = require('moment')
const BaseComponent = require('./base_component')

/**
 * scaffold info
 */
module.exports = class Info extends BaseComponent {
  constructor (ctx) {
    super(ctx, 'Info', 'info')
  }

  prompt () {

  }

  generate () {
    this._write('info.md', this._template('info.md', {
      title: '脚手架信息 by Generator SC(Spring Cloud)',
      current: moment.now(),
      version: 'xxx',
      node: 'xxx',
      yo: 'xxx',
      method: 'xxx',
      github_url: 'https://github.com/taccisum/generator-sc',
      args: this.ctx.project.profiles(),
      command: 'yo sc'
    }))
  }
}
