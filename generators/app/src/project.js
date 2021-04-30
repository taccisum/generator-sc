'use strict'

const Base = require('./base');
const path = require('path');

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
    this._author = def.author || (await this._prompt({ name: 'author',
      message: '请输入你的名称',
      type: 'input',
      require: false
    }))['author'];

    this.email = def.email || (await this._prompt({ name: 'email',
      message: '请输入你的邮箱',
      type: 'input',
      validate (answer) {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/g
        if (answer.match(reg)) {
          return true
        }
        return `格式错误，应为 ${reg}`
      }
    }))['email'];

    this.name = def.name || (await this._prompt({ name: 'project_name',
      message: '请输入项目名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }))['project_name'];

    this.groupId = def.groupId || (await this._prompt({ name: 'project_group_id',
      message: '请输入 Group ID',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }))['project_group_id'];

    this.version = def.version || (await this._prompt({ name: 'project_version',
      message: '请输入项目版本号',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }))['project_version'];

    this.url = def.url || (await this._prompt({ name: 'url',
      message: '请输入您的项目 URL',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }))['url'];

    this.licenses = def.licenses || (await this._prompt({ name: 'licenses',
      message: '请选择开放源代码协议',
      type: 'list',
      choices: [
        'None',
        'MIT'
      ]
    }))['licenses'];

    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        this[key] && this[key].prompt && await this[key].prompt(def[key] || {});
      }
    }
  }

  generate () {
    let licensesName;
    let licensesUrl;
    switch (this.licenses) {
      case 'MIT': {
        licensesName = 'MIT License';
        licensesUrl = 'https://mit-license.org/';
        break;
      }
    }

    this._write('pom.xml', this._template('pom.xml', {
      author: this.author,
      email: this.email,
      project_name: this.name,
      group_id: this.groupId,
      version: this.version || '0.1',
      url: this.url,
      licenses_name: licensesName,
      licenses_url: licensesUrl
    }))

    let gid = this.groupId || 'com.github.taccisum';
    // package 转路径
    let rpath = gid.split(/\./g).reduce((p, c) => {
      return path.join(p, c);
    })

    this._write(path.join('src', 'main', 'java', rpath, 'StartupApplication.java'), this._template(path.join('main', 'java', 'StartupApplication.java'), {
      current: this.ctx.current.format(this.ctx.dateFormat.full),
      author: this.author,
      email: this.email,
      base_package: gid
    }))

    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        this[key] && this[key].generate && this[key].generate();
      }
    }
  }

  get author () {
    return this._author || 'anonymous'
  }
}
