/* eslint-disable no-undef */
const assert = require('assert');
const Project = require('../../generators/app/src/project')
const path = require('path')

describe('src/project.js', () => {
  describe('get author', () => {
    it('should default value when null', () => {
      assert(new Project({}).author === 'anonymous')
    });
  })

  describe('get basePackage', () => {
    it('should not empty by default', () => {
      assert(new Project({}).basePackage.length > 0)
    });

    it('should same as group id + project name', () => {
      let proj = new Project({})
      proj.groupId = 'com.github'
      proj.projectName = 'foo'
      assert(proj.basePackage === 'com.github.foo')
    });
  });

  describe('get basePath', () => {
    it('should not empty by default', () => {
      assert(new Project({}).basePath.length > 0)
    });

    it('should convert from base package', () => {
      let proj = new Project({})
      proj._basePackage = 'com.github'
      assert(proj.basePath === path.join('com', 'github'))
    });
  });

  describe('get baseJavaPath', () => {
    it('should default when null', () => {
      let proj = new Project({})
      proj._basePackage = 'com.foo'
      assert(proj.baseJavaPath === path.join('src', 'main', 'java', 'com', 'foo'))
    });

    it('should concat with base package', () => {
      let proj = new Project({})
      proj._basePackage = 'com.github'
      assert(proj.baseJavaPath === path.join('src', 'main', 'java', 'com', 'github'))
    });
  });
});
