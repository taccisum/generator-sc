'use strict'

const Base = require('./base')
const path = require('path')
const yaml = require('js-yaml')

module.exports = class Project extends Base {
  constructor (context) {
    super(context);
    context.project = this;
    this.supports = [
      'readme',
      'docker',
      'swagger',
      'info',
      'demo'
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

    this.displayName = def.displayName || (await this._prompt({ name: 'project_display_name',
      message: '请输入项目展示名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }))['project_display_name'];

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
    this._writePom()
    this._writeMainClass()
    this._writeProfiles()

    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        this[key] && this[key].generate && this[key].generate();
      }
    }
  }

  _forEachSupports (func) {
    for (const idx in this.supports) {
      if (this.supports.hasOwnProperty(idx)) {
        let key = this.supports[idx];
        if (this[key]) {
          func(this[key])
        }
      }
    }
  }

  _writePom () {
    let licensesName;
    let licensesUrl;
    switch (this.licenses) {
      case 'MIT': {
        licensesName = 'MIT License';
        licensesUrl = 'https://mit-license.org/';
        break;
      }
    }

    let deps = []
    this._forEachSupports(component => {
      component.dependencies && component.enabled && deps.push(...component.dependencies())
    })

    deps = (function distinct (arr) {
      // TODO:: 去重
      return arr;
    }(deps))

    this._write('pom.xml', this._template('pom.xml', {
      author: this.author,
      email: this.email,
      project_name: this.name,
      display_name: this.displayName || this.name || 'Unknown',
      description: this.description || 'Nothing',
      group_id: this.groupId,
      version: this.version || '0.1',
      url: this.url,
      licenses_name: licensesName,
      licenses_url: licensesUrl,
      dependencies: deps
    }))
  }

  _writeMainClass () {
    let gid = this.groupId || 'com.github.taccisum';
    // package 转路径
    let rpath = gid.split(/\./g).reduce((p, c) => {
      return path.join(p, c);
    })

    this._write(path.join('src', 'main', 'java', rpath, 'StartupApplication.java'),
      this._template(path.join('main', 'java', 'StartupApplication.java'), {
        current: this.ctx.current.format(this.ctx.dateFormat.full),
        author: this.author,
        email: this.email,
        base_package: gid
      }))
  }

  _writeProfiles () {
    let defYaml = this._loadYaml(path.join('main', 'resources', 'application.yml'), {})
    this._forEachSupports(component => {
      if (component.handlers) {
        let handlers = component.handlers()
        handlers.profiles && handlers.profiles(defYaml)
      }
    })
    this._write(
      path.join('src', 'main', 'resources', 'application.yml'),
      yaml.safeDump(defYaml)
    )
  }

  get author () {
    return this._author || 'anonymous'
  }

  get basePath () {
    if (!this.groupId) {
      return
    }
    let sections = this.groupId.split(/\./g)
    return sections.reduce((p, c) => {
      return path.join(p, c)
    })
  }

  get baseJavaPath () {
    let p = path.join('src', 'main', 'java');
    if (this.basePath) {
      return path.join(p, this.basePath)
    }
    return p
  }

  get basePackage () {
    return this.groupId;
  }
}
