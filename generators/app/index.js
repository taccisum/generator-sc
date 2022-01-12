'use strict'

const Context = require('./src/context');
const factory = require('./src/factory');
const path = require('path')
const fs = require('fs')
const os = require('os')
const cp = require('child_process')

var Generator = require('yeoman-generator');
const { rejects } = require('assert');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.ctx = new Context(this);
    this.proj = factory.createMicroServiceProject(this.ctx);
  }

  catch (e) {
    // this.prompt({ name: 'h',
    //   type: 'list',

    //   validate () {

    //   } });
  }

  async prompting () {
    let profiles = this._readProfiles()
    console.log(profiles)
    await this.proj.prompt(profiles);
    profiles = this.proj.profiles()
    console.log(`最终配置: ${JSON.stringify(profiles)}`)
    // TODO:: implement
    // this.prompt({
    //   name: 'reWriteProfiles',
    //   message: '是否保存变更后的配置？'
    // })
  }

  async _exec (cmd, args) {
    let promise = new Promise((resolve, reject) => {
      cp.exec(cmd, (err, stdout, stderr) => {
        if (err) {
          console.error(stderr)
          reject(err, stderr)
        } else {
          if (stdout && stdout.trim().length > 0) {
            let out = stdout
            if (out.charAt(out.length - 1) === '\n') {
              out = out.slice(0, out.length - 1)
            }
            console.log(out)
          }
          resolve(stdout)
        }
      })
    })
    return promise
  }

  write () {
    this.proj.generate();
  }

  async end () {
    // if (success) {
    //   // TODO::
    // }

    console.log('初始化 Git 仓库')
    await this._exec('git init')
    await this._exec('git add .')
    await this._exec(`git commit -m 'chore: init project'`)
    // this._exec('git init')
    //   .then(() => { return this._exec('git add .') })
    //   .then(() => { return this._exec(`git commit -m 'chore: init project'`) })
    //   .catch(err => { console.log(err) })
  }

  _readProfiles () {
    const filename = '.generator-sc.json'
    let profilesFilePath = path.join(process.cwd(), filename)
    if (!fs.existsSync(profilesFilePath)) {
      profilesFilePath = path.join(os.homedir(), filename)
      if (!fs.existsSync(profilesFilePath)) {
        console.log('未找到任何配置文件')
        return {}
      }
    }

    console.log(`读取配置文件 ${profilesFilePath}`)
    let data = fs.readFileSync(profilesFilePath);
    return JSON.parse(data)
  }
}
