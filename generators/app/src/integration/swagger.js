'use strict'

const BaseComponent = require('../base_component')
const path = require('path')
const _ = require('lodash')

module.exports = class Swagger extends BaseComponent {
  constructor (ctx) {
    super(ctx, 'Swagger', 'swagger')
  }

  async prompt (def) {
    this.enabled = def.enabled || (await this._prompt({ name: 'enabled',
      message: '是否集成 Swagger',
      type: 'confirm'
    }))['enabled'];

    if (this.enabled) {
      // do something here
    }
  }

  dependencies () {
    return [
      {
        group_id: 'com.github.taccisum',
        artifact_id: 'swagger-spring-boot2-starter',
        version: '1.0.1'
      }
    ]
  }

  handlers () {
    let _this = this;
    return {
      profiles (def, { local, prod }) {
        _.merge(def, _this._loadYaml(path.join('main', 'resources', 'swagger', 'application.yml'), {
          base_package: _this.ctx.project.basePackage,
          project_name: _this.ctx.project.displayName || _this.ctx.project.name || 'Unknown Project Name'
        })
        )
        if (prod) {
          _.merge(prod, _this._loadYaml(path.join('main', 'resources', 'swagger', 'application-prod.yml'), {
          })
          )
        }
      }
    }
  }

  generate () {
    if (this.enabled) {
      this._write(path.join(this.ctx.project.baseJavaPath, 'config', 'SwaggerEndpointPrinter.java'),
        this._template(
          path.join('main', 'java', 'config', 'SwaggerEndpointPrinter.java'),
          _.assign(this._commonProps(), {})
        )
      )
    }
  }
}
