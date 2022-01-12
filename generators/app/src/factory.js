'use strict'

const Project = require('./project');
const Readme = require('./readme');
const Docker = require('./integration/docker');
const Info = require('./info');
const Demo = require('./demo');
const Swagger = require('./integration/swagger');
const GitIgnore = require('./gitignore');
const Domain = require('./integration/domain');
const Db = require('./integration/db/db');

module.exports = {
  createMicroServiceProject (ctx) {
    let proj = new Project(ctx);
    proj.supports = {
      info: new Info(ctx),
      readme: new Readme(ctx),
      gitignore: new GitIgnore(ctx),
      docker: new Docker(ctx),
      swagger: new Swagger(ctx),
      db: new Db(ctx),
      domain: new Domain(ctx),
      demo: new Demo(ctx)
    }
    return proj;
  }
}
