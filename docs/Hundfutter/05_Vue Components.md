# 5. Vue最基本编码

## 5.1. 配置vue组件文件模板

```json
{
  "Print to vue": {
    "prefix": "vue",
    "body": [
     "<template>",
     "  <div></div>",
     "</template>",
     "",
     "<script>",
     "export default {",
     "  name: '',",
     "}",
     "</script>",
     "",
     "<style lang=\"less\" scoped>",
     "",
     "</style>",
     ""
    ],
    "description": "快速创建vue单文件组件"
   }
}
```



## 5.2. App.vue

```vue
<template>
  <div>
    App
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```



## 5.3. main.js

```js
import Vue from 'vue'
import App from './App'

// 指定不显示非生产环境模式的提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
```


