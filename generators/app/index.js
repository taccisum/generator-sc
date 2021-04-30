'use strict'

const Context = require('./src/context');
const Project = require('./src/project');
const Readme = require('./src/readme');

var Generator = require('yeoman-generator');
const Docker = require('./src/integration/docker');

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.ctx = new Context(this);
    let proj = new Project(this.ctx);
    proj.readme = new Readme(this.ctx);
    proj.docker = new Docker(this.ctx);
    this.proj = proj;
  }

  catch (e) {
    // this.prompt({ name: 'h',
    //   type: 'list',

    //   validate () {

    //   } });
  }

  async prompting () {
    await this.proj.prompt({
      name: 'taccisum',
      groupId: 'com.github.taccisum',
      version: '0.1-SNAPSHOT',
      readme: {
        type: '.md'
      }
    });
  }

  write () {
    // proj.addReadme('hhhh');
    this.proj.generate();
  }
}
