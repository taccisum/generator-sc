'use strict'

var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  catch (e) {
  }

  async prompting () {
    await this.prompt({ name: 'test', message: 'test prompt', type: 'input' })
  }

  write () {
    this.fs.write('1.js', 'hhhhh')
  }
}
