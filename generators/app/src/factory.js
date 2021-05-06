'use strict'

const Project = require('./project');
const Readme = require('./readme');
const Docker = require('./integration/docker');
const Info = require('./info');
const Demo = require('./demo');
const Swagger = require('./integration/swagger');

module.exports = {
  createMicroServiceProject (ctx) {
    let proj = new Project(ctx);
    proj.readme = new Readme(ctx);
    proj.docker = new Docker(ctx);
    proj.info = new Info(ctx);
    proj.swagger = new Swagger(ctx);
    proj.demo = new Demo(ctx);
    return proj;
  }
}
