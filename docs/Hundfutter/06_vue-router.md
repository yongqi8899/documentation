# 6. 引入vue-router

## 6.1.下载依赖包
```shell
npm install vue-router
```

## 6.2. 编码

1. pages/Home/index.vue
```vue
<template>
  <div>Home</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
```

2. pages/Search/index.vue
```vue
<template>
  <div>Search</div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>

</style>
```

3. pages/Register/index.vue
```vue
<template>
  <div>Register</div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {}
  },
}
</script>

<style  lang="less" scoped>

</style>
```

4. pages/Login/index.vue

```vue
<template>
  <div>Login</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
}
</script>

<style  lang="less" scoped>

</style>
```

5. router/routes.js
```js
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

/* 
所有静态路由配置的数组
*/
export default [
  {
    path: '/',
    component: Home
  },

  {
    path: '/search',
    component: Search
  },

  {
    path: '/register',
    component: Register
  },

  {
    path: '/login',
    component: Login
  }
]
```

6. router/index.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

// 声明使用插件
Vue.use(VueRouter)

// 向外默认暴露路由器对象
export default new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由
})
```

7. main.js
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, // 注册路由器
}).$mount('#app')
```

8. components/Header/index.vue
```vue
<template>
  <div>Header</div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
}
</script>

<style  lang="less" scoped>

</style>
```

9. components/Footer/index.vue
```vue
<template>
  <div>Footer</div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {}
  },
}
</script>

<style  lang="less" scoped>

</style>
```

10. App.vue
```vue
<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less" scoped>

</style>
```

11. public/css/reset.css
```css
/* 清除内外边距 */
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote,
dl, dt, dd, ul, ol, li,
pre,
fieldset, lengend, button, input, textarea,
th, td {
    margin: 0;
    padding: 0;
}

/* 设置默认字体 */
body,
button, input, select, textarea { /* for ie */
    /*font: 12px/1 Tahoma, Helvetica, Arial, "宋体", sans-serif;*/
    font: 12px/1.3 "Microsoft YaHei",Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif; /* 用 ascii 字符表示，使得在任何编码下都无问题 */
    color: #333;
}

h1 { font-size: 18px; /* 18px / 12px = 1.5 */ }
h2 { font-size: 16px; }
h3 { font-size: 14px; }
h4, h5, h6 { font-size: 100%; }

address, cite, dfn, em, var, i{ font-style: normal; } /* 将斜体扶正 */
b, strong{ font-weight: normal; } /* 将粗体扶细 */
code, kbd, pre, samp, tt { font-family: "Courier New", Courier, monospace; } /* 统一等宽字体 */
small { font-size: 12px; } /* 小于 12px 的中文很难阅读，让 small 正常化 */

/* 重置列表元素 */
ul, ol { list-style: none; }

/* 重置文本格式元素 */
a { text-decoration: none; color: #666;}
a:hover{
    color : rgb(79, 76, 212) !important;
}

/* 重置表单元素 */
legend { color: #000; } /* for ie6 */
fieldset, img { border: none; }
button, input, select, textarea {
    font-size: 100%; /* 使得表单元素在 ie 下能继承字体大小 */
}

/* 重置表格元素 */
table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* 重置 hr */
hr {
    border: none;
    height: 1px;
}
.clearFix::after{
    content:"";
    display: block;
    clear:both;
}
/* 让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁 */
html { overflow-y: scroll; }

/* 清除浮动 */
.clearfix::after {
    display: block;
    height: 0;
    content: "";
    clear: both;
    visibility: hidden;
}
```

12. public/index.html
```html
<link rel="stylesheet" href="/css/reset.css"> 
<div id="app"></div>
```

## 6.3. 运行并请求不同路由路径
查看运行效果

## 6.4. jsconfig.json
让vscode提示@开头的模块路径引入

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```


