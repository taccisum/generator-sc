# Generator SC(Spring Cloud)

## 如何使用

此脚手架基于 [yeoman]() 首先要确保你安装了它

```bash
$ TODO::
```

### 本地使用

```bash
$ git clone https://github.com/taccisum/generator-sc
$ cd generator-sc
$ npm link
$ yo sc
# 接下来按照提示操作即可
```

## 全配置一览

```json
// .generator-sc.json
{
    "name": "foo-service",      // 项目名称
    "displayName": "Foo Service",       // 项目展示名
    "finalName": "foo",     // 制品名称
    "description": "A micro-service",       // 项目描述
    "enableResourcesFiltering": true,       // 是否开启 resources 中的 @变量@ 替换
    "groupId": "com.github.taccisum",       // 项目 group id
    "version": "0.1-SNAPSHOT",      // 项目版本
    "author": "taccisum",       // 作者
    "email": "liaojinfeng6938@dingtalk.com",        // 联系邮箱
    "url": "https://github.com/foo/foo-service",    // 项目 url
    // 项目使用的仓库列表
    "repos": {
        "ali-maven": {
            "name": "AliYun Maven",
            "url": "http://maven.aliyun.com/nexus/content/groups/public"
        },
        "other-maven": {
            "name": "Other Maven",
            "url": "other_url"
        }
    },
    "licenses": "MIT",      // 协议
    // actuator 相关配置
    "actuator": { 
        "port": 18080       // actuator 端口
    },
    // spring boot 相关配置
    "boot": {
        "version": "2.3.0.RELEASE",     // 使用版本
        "port": 8081        // web 端口
    },
    // spring cloud 相关配置
    "cloud": {
        "version": "Greenwich.SR2"      // 使用版本
    },
    // docker 相关配置
    "docker": { 
        "enabled": true     // 启用/禁用
    },
    // 数据库相关配置
    "db": {
        "enabled": true,    // 启用/禁用
        "name": "foo"       // 数据库名称
    },
    // swagger 相关配置
    "swagger": { 
        "enabled": true     // 启用/禁用
    },
    // DDD 相关配置
    "domain": { 
        "enabled": true     // 启用/禁用
    },
    // 演示相关配置
    "demo": {
        "enabled": true     // 启用/禁用
    }
}
```

> tips: 上述 json 因为有注释无法直接使用，可以 copy 到 vim 中使用以下正则消除全部注释

```bash
:%s#// .*##g
```


