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
    it('should null by default', () => {
      assert(new Project({}).basePackage == null)
    });

    it('should same as group id', () => {
      let proj = new Project({})
      proj.groupId = 'com.github'
      assert(proj.basePackage === 'com.github')
    });
  });

  describe('get basePath', () => {
    it('should null by default', () => {
      assert(new Project({}).basePath == null)
    });

    it('should convert from group id', () => {
      let proj = new Project({})
      proj.groupId = 'com.github'
      assert(proj.basePath === path.join('com', 'github'))
    });
  });

  describe('get baseJavaPath', () => {
    it('should default when null', () => {
      assert(new Project({}).baseJavaPath === path.join('src', 'main', 'java'))
    });

    it('should concat with group id', () => {
      let proj = new Project({})
      proj.groupId = 'com.github'
      assert(proj.baseJavaPath === path.join('src', 'main', 'java', 'com', 'github'))
    });
  });
});
