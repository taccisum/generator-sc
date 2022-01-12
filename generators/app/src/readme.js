'use strict'

const BaseComponent = require('./base_component');

module.exports = class Readme extends BaseComponent {
  constructor (ctx) {
    super(ctx, 'README', 'readme')
  }

  async prompt (def) {
    this.type = def.type || (await this._prompt({ name: 'type',
      message: 'README 类型',
      type: 'list',
      choices: ['.md', '.txt']
    }))['type']
  }

  generate () {
    let params = {
      title: this.title || this.ctx.project.name || 'Unknown Project'
    }
    if (this.ctx.project.supports.docker.enabled) {
      params.docker = {
        startup_guide: 'docker run xxx'
      }
    } else {
      params.docker = false
    }
    this._write('README.md', this._template('README.md', params))
  }
}
