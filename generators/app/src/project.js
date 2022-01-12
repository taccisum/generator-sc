'use strict'

const Base = require('./base')
const path = require('path')
const yaml = require('js-yaml')
const _ = require('lodash')

module.exports = class Project extends Base {
  constructor (context) {
    super(context);
    context.project = this;
  }

  async prompt (def) {
    // 自有属性
    await this._promptIfMissingAndAssign(def, { name: 'author',
      message: '请输入你的名称',
      type: 'input',
      require: false
    }, '_author')

    await this._promptIfMissingAndAssign(def, { name: 'email',
      message: '请输入你的邮箱',
      type: 'input',
      validate (answer) {
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/g
        if (answer.match(reg)) {
          return true
        }
        return `格式错误，应为 ${reg}`
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'name',
      message: '请输入项目名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }, 'projectName');

    await this._promptIfMissingAndAssign(def, { name: 'displayName',
      message: '请输入项目展示名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'finalName',
      message: '请输入项目生成的最终 .jar 制品名称',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'description',
      message: '请输入项目描述',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'enableResourcesFiltering',
      message: '是否开启 resources @变量@ 替换',
      type: 'confirm'
    });

    await this._promptIfMissingAndAssign(def, { name: 'groupId',
      message: '请输入 Group ID',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'version',
      message: '请输入项目版本号',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'basePackage',
      message: '请输入基础包路径',
      type: 'input',
      default: `${this.groupId}.${this.projectName}`,
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    }, '_basePackage');

    await this._promptIfMissingAndAssign(def, { name: 'url',
      message: '请输入您的项目 URL',
      type: 'input',
      validate (answer) {
        if (answer && answer.length > 0) {
          return true;
        }
        return false;
      }
    });

    await this._promptIfMissingAndAssign(def, { name: 'licenses',
      message: '请选择开放源代码协议',
      type: 'list',
      choices: [
        'None',
        'MIT'
      ]
    });

    this.version = this.version || '0.1-SNAPSHOT'
    this.readme = def.readme || {
      type: '.md'
    }
    this.info = def.info || {
    }
    this.gitignore = def.gitignore || {
    }
    this.boot = def.boot || {
      version: '2.0.7.RELEASE',
      port: 8080
    }
    this.cloud = def.cloud || {
      version: 'Finchley.SR2'
    }
    this.csv = def.csv || {
    }
    this.repos = def.repos || {
      'ali-maven': {
        'name': 'AliYun Maven',
        'url': 'http://maven.aliyun.com/nexus/content/groups/public'
      }
    }
    this.actuator = def.actuator || {
      port: 18080
    }

    await this._forEachSupportsAsync(async (component, key) => {
      // 遍历 supports，执行其 prompt 方法，提示用户补全缺失的参数
      console.log(`prompt ${key}`)
      component.prompt && await component.prompt(def[key] || {});
    })
  }

  /**
   * 生成脚手架
   */
  async generate () {
    this._writePom()
    this._writeMainClass()
    this._writeProfiles()

    this._forEachSupports((component, key) => {
      // 遍历 supports，执行其 generate 方法，生成脚手架相关的文件
      console.log(`generate ${key}`)
      component.generate && component.generate();
    })
  }

  _forEachSupports (func) {
    for (const key in this.supports) {
      let component = this.supports[key]
      func(component, key)
    }
  }

  async _forEachSupportsAsync (func) {
    for (const key in this.supports) {
      let component = this.supports[key]
      await func(component, key)
    }
  }

  /**
   * 写 pom.xml
   * 会遍历 supports.dependencies 自动写入 pom.xml 中
   */
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
      project_name: this.projectName,
      display_name: this.displayName || this.projectName || 'Unknown',
      final_name: this.finalName || this.projectName || 'app',
      description: this.description || 'Nothing',
      group_id: this.groupId,
      version: this.version,
      url: this.url,
      repos: this.repos || false,
      licenses_name: licensesName,
      licenses_url: licensesUrl,
      boot_version: this.boot.version,
      cloud_version: this.cloud.version,
      enable_resources_filtering: this.enableResourcesFiltering,
      dependencies: deps
    }))
  }

  _writeMainClass () {
    this._write(path.join('src', 'main', 'java', this.basePath, 'StartupApplication.java'),
      this._template(path.join('main', 'java', 'StartupApplication.java'), {
        current: this.ctx.current.format(this.ctx.dateFormat.full),
        author: this.author,
        email: this.email,
        base_package: this.basePackage
      }))
  }

  _writeProfiles () {
    let defYaml = this._loadYaml(path.join('main', 'resources', 'application.yml'), {
      port: this.boot.port,
      actuator_port: this.actuator.port
    })
    let envYamls = ['dev', 'local', 'prod']
      .map(env => {
        let pair = {}
        pair[env] = this._loadYaml(path.join('main', 'resources', `application-${env}.yml`))
        return pair
      }).reduce((a, b) => {
        return _.assign(a, b)
      })
    this._forEachSupports(component => {
      if (component.handlers) {
        let handlers = component.handlers()
        handlers.profiles && handlers.profiles(defYaml, envYamls)
      }
    })
    this._write(
      path.join('src', 'main', 'resources', 'application.yml'),
      yaml.safeDump(defYaml)
    )
    for (let env in envYamls) {
      let envYaml = envYamls[env]
      let content = ''
      if (envYaml) {
        content = yaml.safeDump(envYaml)
      }
      this._write(path.join('src', 'main', 'resources', `application-${env}.yml`), content)
    }
  }

  get author () {
    return this._author || 'anonymous'
  }

  get basePath () {
    if (!this.basePackage) {
      return
    }
    let sections = this.basePackage.split(/\./g)
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
    return this._basePackage || `${this.groupId}.${this.projectName}`;
  }
}
