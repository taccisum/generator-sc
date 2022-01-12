'use strict'

const BaseComponent = require('../../base_component')
const path = require('path')
const _ = require('lodash')

module.exports = class Db extends BaseComponent {
  constructor (ctx) {
    super(ctx, '数据库', 'db')
  }

  async prompt0 (def) {
    await this._promptIfMissingAndAssign(def, { name: 'name',
      message: '请输入数据库名称',
      default: this.ctx.project.projectName,
      type: 'input'
    }, 'dbName')
    // this._promptIfMissingAndAssign(def, { name: 'type',
    //   message: '请选择数据库种类',
    //   type: 'list',
    //   choices: [
    //     'mysql'
    //   ]
    // })
    // TODO:: 写死，目前仅支持 mysql
    this.type = 'mysql'
    this.orm = 'mybatis-plus'
    this.dbpool = 'druid'
    this.mysql = def.mysql || {

    }

    // let type = def.db.type || 'mysql';
    // let orm = def.db.orm || 'mybatis';
    // let dbpool = def.db.dbpool || 'druid';
  }

  dependencies () {
    let deps = []

    switch (this.type) {
      case 'mysql':
        deps.push(
          {
            group_id: 'mysql',
            artifact_id: 'mysql-connector-java'
          }
        )
        break
      default:
        break
    }

    switch (this.orm) {
      case 'mybatis-plus':
        deps.push(
          {
            group_id: 'com.baomidou',
            artifact_id: 'mybatis-plus-boot-starter',
            version: '3.3.2'
          }
        )
        break
      default:
        break
    }

    // TODO::
    // switch (this.dbpool) {
    //   case 'druid':
    //     deps.push(
    //       {
    //         group_id: 'mysql',
    //         artifact_id: 'mysql-connector-java'
    //       }
    //     )
    //     break
    //   default:
    //     break
    // }

    return deps;
  }

  handlers () {
    let _this = this;
    let dbName = this.dbName || this.ctx.project.projectName || 'db_name'
    return {
      profiles (def, { local, dev, prod }) {
        _.merge(local, _this._loadYaml(path.join('main', 'resources', 'mysql', 'application-local.yml'), {
          url: `jdbc:mysql://127.0.0.1:3306/${dbName}`,
          username: 'root',
          password: '123456'
        })
        )
      }
    }
  }
}
