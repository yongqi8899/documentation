# 16. 利用Mock接口实现动态的Home

## 1. 重难点
1. 动态显示今日推荐列表
2. 动态显示楼层列表

## 3. 首页的TodayRecommend组件

```vue
<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./images/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner" v-for="item in recommends" :key="item.id">
          <img :src="item.imageUrl" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'TodayRecommend',
  computed: {
    ...mapState({
      recommends: state => state.home.recommends
    })
  }
}
</script>
```



## 4. 首页的Floor组件

```vue
<swiper class="swiper" :options="{
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true // 默认是false
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
}">
    <swiper-slide v-for="item in floor.carouselList" :key="item.id">
    <img :src="item.imageUrl"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
</swiper>

<script>
export default {
  name: 'Floor',
  props: {
    floor: Object
  }
}
</script>
```



## 5. 在Home组件中使用

```js
<!--今日推荐-->
<TodayRecommend />

<!--楼层-->
<Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>

mounted () {
  // 触发vuex的异步action调用, 从mock接口请求数据到state中
  this.$store.dispatch('getRecommends')
  this.$store.dispatch('getFloors')
},

computed: {
  ...mapState({
    floors: state => state.home.floors
  })
},
```


