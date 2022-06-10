# 14. AddCartSuccess路由

## 1. 重难点说明

1. 跳转路由, 如何携带对象数据?
2. 区别使用sessionStorage与localStorage?
3. 如何实现分发异步action完成后处理逻辑?

## 2. vuex

- store/modules/shopCart.js

```js
async addToCart ({dispatch}, {skuId, skuNum}) {
  const result = await reqAddToCart(skuId, skuNum)
  if (result.code!==200) {
    throw new Error('添加购物车失败')
  }
}
```

## 3. Detail组件

```js
/*
添加到购物车
*/
async addToCart () {
  // 准备数据
  const skuId = this.$route.params.id
  const skuNum = this.skuNum

  /*
  dispatch()返回一个promise, promise的结果值就是action的返回值
    如果action返回的是promise, 那就是它
    如果action返回的是非promise, 创建一个promise对象返回
  */
  try {
    // 分发添加购物车的异步action
    await this.$store.dispatch('addToCart', {skuId, skuNum})
    // 根据请求是否成功, 做不同的响应的处理
    // 成功了
    // 将skuInfo对象的json保存到sessionStorage
    window.sessionStorage.setItem('SKU_INFO', JSON.stringify(this.skuInfo))

    // 跳转到成功路由并携带query参数
    this.$router.push({
      path: '/addcartsuccess',
      query: {
        skuNum
      }
    })
  } catch (error) {
    alert(error.message)
  }
},
```



## 4. AddCartSuccess路由组件

```vue
<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{skuInfo.skuName}}</p>
            <p class="attr">颜色：WFZ5099IH/5L钛金釜内胆 数量：{{$route.query.skuNum}}</p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link :to="{name: 'detail', params: {id: skuInfo.id}}" class="sui-btn btn-xlarge">查看商品详情</router-link>
          <a href="javascript:" @click="$router.push('/shopcart')">去购物车结算 > </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCartSuccess',

    data () {
      return {
        skuInfo: JSON.parse(window.sessionStorage.getItem('SKU_INFO'))
      }
    }
  }
</script>
```

