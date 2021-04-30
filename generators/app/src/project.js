'use strict'

const Base = require('./base');

module.exports = class Project extends Base {
  constructor (context) {
    super(context);
    context.project = this;
    this.supports = [
      'readme',
      'docker',
      'info'
    ]
  }

  async prompt (def) {
    this.name = def.name || (await this._prompt({ name: 'project_name',
      message: '请输入项目名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      } }))['project_name'];

    this.groupId = def.groupId || (await this._prompt({ name: 'project_group_id',
      message: '请输入 Group ID',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      } }))['project_group_id'];

    this.version = def.version || (await this._prompt({ name: 'project_version',
      message: '请输入项目版本号',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      } }))['project_version'];

    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        this[key] && this[key].prompt && await this[key].prompt(def[key] || {});
      }
    }
  }

  generate () {
    this._write('pom.xml', this._template('pom.xml', {
      version: this.version || '0.1'
    }))

    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        this[key] && this[key].generate && this[key].generate();
      }
    }
  }
}
