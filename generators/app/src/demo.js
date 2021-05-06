'use strict'

const Base = require('./base')
const path = require('path')

module.exports = class Demo extends Base {
  generate () {
    let gid = this.ctx.project.groupId || 'com.github.taccisum'

    this._write(path.join(this.ctx.project.baseJavaPath, 'controller', 'DemoController.java'),
      this._template(path.join('main', 'java', 'controller', 'DemoController.java'), {
        current: this.ctx.current.format(this.ctx.dateFormat.full),
        author: this.ctx.project.author,
        email: this.ctx.project.email,
        base_package: gid
      }))
  }
}
