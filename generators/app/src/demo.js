'use strict'

const path = require('path')
const BaseComponent = require('./base_component')

module.exports = class Demo extends BaseComponent {
  constructor (ctx) {
    super(ctx, '示例', 'demo')
  }

  async prompt0 () {

  }

  generate () {
    if (this.enabled) {
      this._write(path.join(this.ctx.project.baseJavaPath, 'controller', 'DemoController.java'),
        this._template(path.join('main', 'java', 'controller', 'DemoController.java'), this._commonProps()))
    }
  }
}
