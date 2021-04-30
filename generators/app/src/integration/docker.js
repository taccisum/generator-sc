'use strict'

const Base = require('../base');

module.exports = class Docker extends Base {
  async prompt () {
    this.enabled = (await this._prompt({ name: 'docker',
      message: '是否集成 Docker',
      type: 'confirm'
    }))['docker'];

    if (this.enabled) {
      // do something here
    }
  }

  generate () {
    if (!this.enabled) {
      return
    }
    this._write('Dockerfile', this._template('Dockerfile', {
    }))
  }
}
