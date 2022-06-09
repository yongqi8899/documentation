# 8. Header组件

## 8.1. 说明

![img](./images/wps1.jpg) 

1. 使用声明式路由导航与编程式路由导航
2. 跳转路由与携带参数相关问题
3. 解决编程式路由重复导航的一个错误

## 8.2. Header组件编码
1. 准备图片资源: logo.png
2. 静态页面
```vue
<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登陆</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="javascript:">我的订单</a>
          <a href="javascript:">我的购物车</a>
          <a href="javascript:">我的尚品汇</a>
          <a href="javascript:">尚品汇会员</a>
          <a href="javascript:">企业采购</a>
          <a href="javascript:">关注尚品汇</a>
          <a href="javascript:">合作招商</a>
          <a href="javascript:">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/">
          <img src="./images/logo.png" alt="logo" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" 
          	v-model="keyword"/>
          <button class="sui-btn btn-xlarge btn-danger" @click.prevent="search">
              搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        keyword: ''
      }
    },

    methods: {
      search () {
        // this.$router.push(`/search/${this.keyword}`)
        this.$router.push({
            name: 'search',
            params: {keyword: this.keyword}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.header {
  &>.top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          &+a {
            border-left: 1px solid #b3aeae;
          }
        }

      }

    }
  }

  &>.bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
```



## 8.3. Search组件编码
```vue
<div>搜索关键字: {{$route.params.keyword}}</div>
```

## 8.4. 路由跳转与传参相关问题

1. 跳转路由的2种基本方式

- 声明式: `<router-link to="">`
- 编程式: `this.$router.push()/replace()`



2. 跳转路由携带参数的2种方式

- /search/aa?categoryName=phone&category1Id=2
- params参数: aa  注册路由时一定要带 '/search/:keyword'
- query参数: categoryName=phone&category1Id=2



3. push(location)的2种语法

- 字符串: `push(path)  // path可以带参数(params或者query)数据`
- 对象: push({})  // 也可以带参数

```js
// 字符串方式
this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)

// 对象方式
this.$router.push({
    name: 'search', 
    params: {keyword},
    query: {keyword2: keyword.toUpperCase()}
})
```



4. params与path一起使用可以吗?

- 一旦有params参数, 必须有name配置, 不能是path
- 但query参数没有此限制



5. 如何实现params参数可传可不传?

- 配置路由路径的params部分时用?: path: '/search/:keyword?'

- 只有params参数有值时, 才指定params配置(不要携带一个值为空串的params参数)

  ```js
  {
      path: '/search/:keyword?', // params参数可传可不传
      component: Search
  },
  ```

  ```js
  search() {
    const {keyword} = this
    
    /* push(path) */
    // if (keyword) {
    //   this.$router.push(`/search/${keyword}?keyword2=${keyword.toUpperCase()}`)
    // } else {
    //   this.$router.push(`/search`)
    // }
    
    /* push(options) */
    const location = {
      name: "search",
    }
    if (keyword) {
      location.params = { keyword }
      location.query = {
        keyword2: this.keyword.toUpperCase()
      }
    }
  
    this.$router.push(location)
  }
  ```

  ```vue
  <h3>params.keyword: {{$route.params.keyword}}</h3>
  <h3>query.keyword2: {{$route.query.keyword2}}</h3>
  ```

  

6. 路由组件能不能传递props数据

- 可以, 通过路由的props配置指定

- 路由配置:  将路由跳转的params/query参数/自定义参数映射成props传递给路由组件

  ```js
  props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
  ```

- 组件读取: 接收props属性必须声明
  ```js
  props: ['keyword3', 'keyword4']
  
  {{keyword3}} / this.keyword3
  ```

  




## 8.5. 重复跳转路由的错误
1. 问题: 

![image-20201219141655333](./images/image-20201219141655333.png)

  编程式路由跳转到当前路径且参数没有变化时会抛出 NavigationDuplicated(重复导航) 错误

2. 原因分析: 
    vue-router3.1.0之后, 引入了push()的promise的语法, 如果没有通过参数指定回调函数就返回一个promise来指定成功/失败的回调, 且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise

  说明文档: https://github.com/vuejs/vue-router/releases?after=v3.3.1

3. 解决: 

- 方案1: 在进行跳转时, 指定跳转成功的回调函数或catch错误

```js
// catch()处理错误
this.$router.push(`/search/${this.keyword}`).catch(() => {})
// 指定成功的回调函数
this.$router.push(`/search/${this.keyword}`, () => {})
// 指定失败的回调函数
this.$router.push(`/search/${this.keyword}`, undefined, () => {})
```

- 方案2: 修正Vue原型上的push和replace方法

```js
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
// replace同理处理
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}
```

4. 补充说明:

- 问题: 为什么声明式路由跳转没有此问题?

- 答: 因为默认传入了成功的空回调函数

