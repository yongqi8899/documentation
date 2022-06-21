# 3. ESLint

##  Verwandte Konfiguration

1. package.json : 全局规则配置文件

```js
"rules": {
    "no-unused-vars": "off"
}
```
2. 在js/vue文件中修改局部规则

```js
/* eslint-disable no-unused-vars */
var xxx = 123
```
3. vue.config.js: 关闭规则检查

```js
module.exports = {
  // lintOnSave: false, // 关闭ESLint的规则检查
  lintOnSave: 'warning', // 输出提示错误, 但项目继续运行
}
```

  