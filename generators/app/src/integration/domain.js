'use strict'

const BaseComponent = require('../base_component')

module.exports = class Domain extends BaseComponent {
  constructor (ctx) {
    super(ctx, 'Domain', 'domain')
  }

  dependencies () {
    return [
      {
        group_id: 'com.github.taccisum',
        artifact_id: 'domain-core',
        version: '0.2.1'
      },
      {
        group_id: 'org.springframework.boot',
        artifact_id: 'spring-boot-starter-aop'
      }
    ]
  }
}
