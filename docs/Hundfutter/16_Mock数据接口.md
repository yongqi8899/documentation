# 16. Mock/模拟数据接口

## 1. 下载依赖包
```shell
npm install mockjs
```

## 2. Web应用前后端(台)分离

1. 后台向前台提供API接口, 只负责数据的提供和计算，而完全不处理展现
2. 前台通过Http(Ajax)请求获取数据,　在浏览器端动态构建界面显示数据

## 3. 设计JSON数据结构
### 1) 理解JSON数据结构
1. 结构: 名称, 数据类型
2.  value
3.  value可以变, 但结构不能变

### 2) 编写模拟JSON数据

1. 首页今日推荐数据: src/mock/recommends.json

```json
[{
    "id": "1",
    "imageUrl": "/images/today02.png"
  },
  {
    "id": "2",
    "imageUrl": "/images/today01.png"
  },
  {
    "id": "3",
    "imageUrl": "/images/today03.png"
  },
  {
    "id": "4",
    "imageUrl": "/images/today04.png"
  }
]
```



2. 首页楼层数据: src/mock/floors.json

```
[
  {
    "id|1-3": "001",
    "name|1": ["家用电器1", "家用电器2", "家用电器3"],
    "keywords": ["节能补贴", "4K电视", "空气净化器", "IH电饭煲", "滚筒洗衣机"],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [
      {
        "url": "#",
        "text": "热门"
      },
      {
        "url": "#",
        "text": "大家电"
      },
      {
        "url": "#",
        "text": "生活电器"
      },
      {
        "url": "#",
        "text": "厨房电器"
      },
      {
        "url": "#",
        "text": "应季电器"
      },
      {
        "url": "#",
        "text": "空气/净水"
      },
      {
        "url": "#",
        "text": "高端电器"
      }
    ],
    "carouselList": [
      {
        "id": "0011",
        "imageUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imageUrl": "/images/floor-1-b02.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-3.png",
      "/images/floor-1-2.png",
      "/images/floor-1-6.png",
      "/images/floor-1-5.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  },
  {
    "id": "002",
    "name": "手机通讯",
    "keywords": ["节能补贴2", "4K电视2", "空气净化器2", "IH电饭煲2"],
    "imgUrl": "/images/floor-1-1.png",
    "navList": [{
        "url": "#",
        "text": "热门2"
      },
      {
        "url": "#",
        "text": "大家电2"
      },
      {
        "url": "#",
        "text": "生活电器2"
      },
      {
        "url": "#",
        "text": "厨房电器2"
      },
      {
        "url": "#",
        "text": "应季电器2"
      },
      {
        "url": "#",
        "text": "空气/净水2"
      },
      {
        "url": "#",
        "text": "高端电器2"
      }
    ],
    "carouselList": [{
        "id": "0011",
        "imageUrl": "/images/floor-1-b01.png"
      },
      {
        "id": "0012",
        "imageUrl": "/images/floor-1-b02.png"
      },
      {
        "id": "0013",
        "imageUrl": "/images/floor-1-b03.png"
      }
    ],
    "recommendList": [
      "/images/floor-1-2.png",
      "/images/floor-1-3.png",
      "/images/floor-1-5.png",
      "/images/floor-1-6.png"
    ],
    "bigImg": "/images/floor-1-4.png"
  }
]
```

::: warning 注意

需要将相关的图片拷贝到 public/images目录下

:::



## 4. 利用mockjs提供模拟数据

### 1) Mockjs

用来拦截ajax请求, 生成随机数据返回

### 2) 学习
1. http://mockjs.com/
2.  https://github.com/nuysoft/Mock

### 3) 使用(mock/mockServer.js)

```js
/* 
利用mockjs来mock数据接口
*/
import Mock from 'mockjs'
import recommends from './recommends.json'
import floors from './floors.json'

// 提供今日推荐数据的接口
Mock.mock('/mock/recommends',{
    code: 200,
    data: recommends
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floors',{
    code: 200,
    data: floors
})

console.log('mockServer...')
```

 

## 5. api/ajaxMock.js

```js
/* 
专门请求mock接口的axios封装
*/
import axios from 'axios'

const mockAjax = axios.create({
  baseURL: "/mock", // 路径前缀
  timeout: 10000 // 请求超时时间
})

mockAjax.interceptors.request.use((config) => {
  return config
})

mockAjax.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default mockAjax

```



## 6. api/index.js

```js
import mockAjax from './mockAjax'

// 获取广告轮播列表
export const reqRecommends = ()=> mockAjax.get('/recommends')
// 获取首页楼层列表
export const reqFloors = ()=> mockAjax.get('/floors')
```



## 7. vuex

- store/modules/home.js

```js
import { reqRecommends, reqFloors } from '@/api'

const state = {
  recommends: [], // 今日推荐数据的数组
  floors: [], // 所有楼层数据的数组
}

const mutations = {
  /* 
  接收楼层列表
  */
  RECEIVE_RECOMMENTS(state, recommends) {
    state.recommends = recommends
  },

  /* 
  接收楼层列表
  */
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
}

const actions = {

  //异步获取所有楼层数据
  async getRecommends({commit}) {
    const result = await reqRecommends();
    if (result.code === 200) {
      commit('RECEIVE_RECOMMENTS', result.data)
    }
  },

  //异步获取所有楼层数据
  async getFloors({commit}) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit('RECEIVE_FLOORS', result.data)
    }
  },
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
```

