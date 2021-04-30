'use strict'

const _ = require('lodash')

module.exports = class Base {
  constructor (ctx) {
    this.ctx = ctx;
  }

  async _prompt (opts) {
    return this.ctx.generator.prompt(opts);
  }

  _write (dest, contents) {
    return this.ctx.generator.fs.write(dest, contents);
  }

  _template (path, props) {
    const tpl = _.template(this.ctx.generator.fs.read(this.ctx.generator.templatePath(path)));
    return tpl(props);
  }
}
