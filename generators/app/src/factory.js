'use strict'

const Project = require('./project');
const Readme = require('./readme');
const Docker = require('./integration/docker');

module.exports = {
  createMicroServiceProject (ctx) {
    let proj = new Project(ctx);
    proj.readme = new Readme(ctx);
    proj.docker = new Docker(ctx);
    return proj;
  }
}
