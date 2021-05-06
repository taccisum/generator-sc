'use strict'

const _ = require('lodash')
const yaml = require('js-yaml')

module.exports = class Base {
  constructor (ctx) {
    this.ctx = ctx;
    this.enabled = true;
  }

  async _prompt (opts) {
    return this.ctx.generator.prompt(opts);
  }

  _write (dest, contents) {
    return this.ctx.generator.fs.write(dest, contents);
  }

  _loadYaml (dest, props) {
    let content = this._template(dest, props)
    return yaml.safeLoad(content)
  }

  _template (path, props) {
    const tpl = _.template(this.ctx.generator.fs.read(this.ctx.generator.templatePath(path)));
    return tpl(props);
  }

  // interfaces

  // define dependencies of this integration
  // dependencies () {
  //   return [{
  //     group_id: 'com.github.demo',
  //     artifact_id: 'demo',
  //     version: '1.0.0'
  //   }]
  // }

  // async prompt () {
  // }
}
