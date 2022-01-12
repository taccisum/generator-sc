'use strict'

const BaseComponent = require('../base_component');

module.exports = class Docker extends BaseComponent {
  constructor (ctx) {
    super(ctx, 'Docker', 'docker')
  }

  async prompt0 (def) {
    // do something here
    console.log('集成 docker')
  }

  generate () {
    if (!this.enabled) {
      return
    }
    this._write('Dockerfile', this._template('Dockerfile', {
      jar_name: this.ctx.project.finalName
    }))
  }

  _key () {
    return 'docker'
  }
}
