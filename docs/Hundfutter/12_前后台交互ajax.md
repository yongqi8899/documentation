# 12. 前后台交互ajax

## 12.1. 下载依赖包
```
npm install axios nprogress
```



## 12.2. 封装ajax请求模块

1. api/ajax.js

```js
/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

/* 1. 配置通用的基础路径和超时 */
const service = axios.create({
  baseURL: '/api', // 基础路径
  timeout: 20000, // 连接请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config) => { // 在发送请求前回调

  /* 2. 显示请求进度条 */
  // 显示请求进度条
  NProgress.start()

  // 必须返回config  ==> 用于内部发ajax请求
  return config
})

// 添加响应拦截器
service.interceptors.response.use(
  response => { // 请求成功返回的回调
    // 隐藏请求进度条
    NProgress.done()

    /* 3. 成功返回的数据不再是response, 而直接是响应体数据response.data */
    // 返回响应体数据
    return response.data
  },
  error => { // 请求出错返回的回调
    // 隐藏请求进度条
    NProgress.done()

    /* 4. 统一处理请求错误, 具体请求也可以选择处理或不处理 */
    // 统一处理错误
    alert(`请求出错: ${error.message||'未知错误'}`)

    // 将错误传递下去, 外面可以选择处理或不处理
    // throw error
    return Promise.reject(error)
  }
)

export default service
```




2. api/index.js

```js
/* 
包含所有接口请求函数的模块
*/
import ajax from './ajax'

//获取商品的三级分类列表
export const reqBaseCategoryList = ()=>ajax.get('/product/getBaseCategoryList')
```



## 12.3. App.vue

```js
import {reqBaseCategoryList} from '@/api'

async mounted () {
    const result = await reqBaseCategoryList()
    console.log('result', result)
},
```



## 12.4. 配置代理

- vue.config.js

```js
devServer: {
  proxy: {
    '/api': { // 只对请求路由以/api开头的请求进行代理转发
      target: 'http://39.99.186.36', // 转发的目标url
      changeOrigin: true // 支持跨域
       // pathRewrite: {‘^/api’: ‘’}
    }
  }
},
```

