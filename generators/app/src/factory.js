'use strict'

const Project = require('./project');
const Readme = require('./readme');
const Docker = require('./integration/docker');
const Info = require('./info');

module.exports = {
  createMicroServiceProject (ctx) {
    let proj = new Project(ctx);
    proj.readme = new Readme(ctx);
    proj.docker = new Docker(ctx);
    proj.info = new Info(ctx);
    return proj;
  }
}
