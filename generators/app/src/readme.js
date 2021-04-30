'use strict'

const Base = require('./base');

module.exports = class Readme extends Base {
  async prompt (def) {
    this.type = def.type || (await this._prompt({ name: 'type',
      message: 'README 类型',
      type: 'list',
      choices: ['.md', '.txt']
    }))['type']
  }

  generate () {
    this._write('README.md', this._template('README.md', {
      title: this.title || this.ctx.project.name || 'Unknown Project'
    }))
  }
}
