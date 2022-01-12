'use strict'

const Base = require('./base');

/**
 * project component base class.
 */
module.exports = class BaseComponent extends Base {
  constructor (ctx, name, key) {
    super(ctx)
    this.enabled = true;
    this.name = name || 'unknown'
    this.key = key || 'unknown'
  }

  async prompt (def) {
    if (def.enabled === false) {
      this.enabled = false
    } else {
      this.enabled = def.enabled || (await this._prompt({ name: 'enabled',
        message: `是否集成 ${this.name}`,
        type: 'confirm'
      }))[this.key];
    }

    if (this.enabled) {
      await this.prompt0(def)
    }
  }

  async prompt0 () {

  }

  /**
   * 返回模板通用 props
   */
  _commonProps () {
    return {
      current: this.ctx.current.format(this.ctx.dateFormat.full),
      author: this.ctx.project.author,
      email: this.ctx.project.email,
      base_package: this.ctx.project.basePackage
    }
  }

  /**
   * <pre>
   * 返回 swagger 相关 handler，支持
   * profiles|func: 处理 application.yml
   * </pre>
   */
  handlers () {
    return {}
  }
}
