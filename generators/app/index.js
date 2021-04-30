'use strict'

const Context = require('./src/context');
const factory = require('./src/factory');

var Generator = require('yeoman-generator');

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
