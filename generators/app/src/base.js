'use strict'

const _ = require('lodash')
const yaml = require('js-yaml')

/**
 * project component base class.
 */
module.exports = class Base {
  constructor (ctx) {
    this.ctx = ctx;
    this.enabled = true;
  }

  async prompt (def) {
  }

  profiles () {
    return { 'foo': 'bar' }
  }

  /**
   *  如果缺少指定参数就发起 prompt，要求用户补全
   * @param {*} opt 参数
   * @param {*} prompt prompt 参数
   */
  async _promptIfMissing (opt, prompt) {
    let key = prompt['name']
    if (opt[key] === false) {
      return false
    } else {
      return opt[key] || (await this._prompt(prompt))[key];
    }
  }

  async _promptIfMissingAndAssign (opt, prompt, key) {
    let val = await this._promptIfMissing(opt, prompt)
    if (key) {
      this[key] = val
    } else {
      this[prompt['name']] = val
    }
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
