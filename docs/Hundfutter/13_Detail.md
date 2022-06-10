# 19. Detail路由 

## 1. 重难点
1) 图片放大镜效果
2) 小图轮播

## 2. 接口请求函数 

```js
// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)
```



## 3. Vuex管理的详情模块 

- store\modules\detail.js

```js
import { reqDetailInfo } from '@/api'

const state = {
  detailInfo:{} // 商品详情信息   
}

const mutations = {
  /* 
  接收商品详情信息
  */
  RECEIVE_DETAIL_INFO (state,detailInfo){
    state.detailInfo=detailInfo
  }
}

const actions = {
  /* 
  获取指定skuid的商品信息的异步action
  */
  async getDetailInfo({commit},skuId){
    const result=await reqDetailInfo(skuId)
    if(result.code===200){
      const detailInfo = result.data
      commit('RECEIVE_DETAIL_INFO', detailInfo)
    }
  },
}

const getters = {
  /* 
  返回三级分类名称数据的对象
  */
  categoryView (state) {
    const categoryView = state.detailInfo.categoryView
    return categoryView ? categoryView : {}
  },

  /* 
  返回商品sku相关信息对象
  */
  skuInfo(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo : {}
  },

  /* 
  返回商品的轮播的图片数组
  */
  skuImageList(state){
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
  
  /* 
  返回商品SPU销售属性列表
  */
  spuSaleAttrList(state){
    const spuSaleAttrList = state.detailInfo.spuSaleAttrList
    return spuSaleAttrList ? spuSaleAttrList : []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}

```

 

## 4. 商品小图片列表组件 

- pages/Detail/ImageList/ImageList.vue

```vue
<template>
  <swiper :options="{
      slidesPerView: 5,  // 一次显示5页
      slidesPerGroup: 5, // 每次翻动多少(5)页
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }">
    <swiper-slide v-for="(item, index) in skuImageList" :key="item.id">
      <img :src="item.imgUrl" :class="{active: currentIndex===index}" 
        @click="changeCurrent(index)">
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "ImageList",

    data () {
      return {
        currentIndex: 0
      }
    },

    methods: {
      changeCurrent (index) {
        // 如果点击就是当前下标的图片, 直接结束
        if (index===this.currentIndex) return
        // 指定当前页的下标
        this.currentIndex = index
        // 通知父组件, 当前下标变化了
        this.$emit('currentChange', index)
      }
    },

    computed: {
      ...mapGetters(['skuImageList'])
    }
  }
</script>
```

 

## 5. 图片放大镜组件 

- pages/Detail/Zoom/Zoom.vue

```vue
<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="move" ref="event"></div>
    <div class="mask" ref="mask"></div>

    <div class="big">
      <img :src="bigUrl" ref="bigImg"/>
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'
  export default {
    name: "Zoom",

    props: {
      imgUrl: String, // 中图的url
      bigUrl: String, // 大图的url
    },

    mounted () {
      // this.maskWidth = this.$refs.mask.clientWidth // 开始是隐藏的, 得不到宽度
      // console.log('maskWidth', this.maskWidth)
      this.maskWidth = this.$refs.event.clientWidth / 2
    },

    methods: {
      move: throttle(function (event) {

        // console.log('-----')

        let left, top
        const maskDiv = this.$refs.mask
        const bigImg = this.$refs.bigImg

        // 取出相关的数据: 事件的offsetX/offsetY, mask <div>的宽度maskWidth
        const {offsetX, offsetY} = event
        const maskWidth = maskDiv.clientWidth
        // const maskWidth = this.maskWidth

        // 计算left, top
        left = offsetX - maskWidth/2
        top = offsetY - maskWidth/2
        // left和top必须在[0, maskWidth]区间内
        if (left<0) {
          left = 0
        } else if (left>maskWidth) {
          left = maskWidth
        }
        if (top<0) {
          top = 0
        } else if (top>maskWidth) {
          top = maskWidth
        }

        // 指定mask <div>的坐标值(left, top)
        maskDiv.style.left = left + 'px'
        maskDiv.style.top = top + 'px'

        // 指定大图 <img>的坐标值(left, top)
        bigImg.style.left = -2 * left + 'px'
        bigImg.style.top = -2 * top + 'px'
      }, 50)
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
```

 

## 6. Detail路由组件 

- pages/Detail/index.vue

```vue
<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span>{{categoryView.category1Name}}</span>
        <span>{{categoryView.category2Name}}</span>
        <span>{{categoryView.category3Name}}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom 
            v-if="skuImageList.length>0"
            :imgUrl="skuImageList[currentImgIndex].imgUrl" 
            :bigImgUrl="skuImageList[currentImgIndex].imgUrl"/>
          <!-- 小图列表 -->
          <ImageList @changeCurrentIndex="changeCurrentIndex"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{skuInfo.skuName}}</h3>
            <p class="news">{{skuInfo.skuDesc}}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{skuInfo.price}}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray">满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</div>
                <div class="fixWidth">以旧换新，闲置手机回收 4G套餐超值抢 礼品购</div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="(attr, index) in spuSaleAttrList" :key="attr.id">
                <dt class="title">{{attr.saleAttrName}}</dt>
                <dd 
                  v-for="(value, index) in attr.spuSaleAttrValueList" 
                  :key="value.id" :class="{active: value.isChecked==='1'}" 
                  @click="selectValue(value, attr.spuSaleAttrValueList)"
                >
                  {{value.saleAttrValueName}}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="skuNum">
                <a href="javascript:" class="plus" @click="skuNum++">+</a>
                <a href="javascript:" class="mins" @click="skuNum>1 ? skuNum-- : ''">-</a>
              </div>
              <div class="add">
                <a href="javascript:" @click="addToCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part01.png" />
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699) </div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/part03.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <img src="./images/l-m01.png" />
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <img src="./images/dp01.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39">
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp02.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50">
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp03.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59">
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <img src="./images/dp04.png" />
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99">
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">
                套餐价
              </div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">
                商品介绍
              </a>
            </li>
            <li>
              <a href="###">
                规格与包装
              </a>
            </li>
            <li>
              <a href="###">
                售后保障
              </a>
            </li>
            <li>
              <a href="###">
                商品评价
              </a>
            </li>
            <li>
              <a href="###">
                手机社区
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" />
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import ImageList from './ImageList/ImageList'
  import Zoom from './Zoom/Zoom'

  export default {
    name: 'Detail',

    data () {
      return {
        currentImgIndex: 0, // 当前图片下标
        skuNum: 1, // 商品的数量
      }
    },

    mounted () {
      // 取出skuId的params参数
      const skuId = this.$route.params.skuId
      // 分发给获取商品详情的异步action
      this.$store.dispatch('getDetailInfo', skuId)
    },

    computed: {
      ...mapGetters(['categoryView', 'skuInfo', 'spuSaleAttrList', 'skuImageList'])
    },

    methods: {
      /* 
      选择某个属性值
      */
      selectValue (value, valueList) {
        // 如果当前项没有选中才处理
        if (value.isChecked!=='1') {
          // 将所有的项都先指定为不选择
          valueList.forEach(v => v.isChecked = '0')
          // 选中当前的
          value.isChecked = '1'
        }
      },

      /* 
      changeCurrentIndex事件的回调函数
       */
      changeCurrentIndex (index) {
        // 更新当前的currentImgIndex
        this.currentImgIndex = index
      },

      /* 
      将当前商品添加到购物车, 成功后跳转到成功界面
      */
      async addToCart () {
        const query = {skuId: this.skuInfo.id, skuNum: this.skuNum}
        // 分发添加购物车的action
        // this.$store.dispatch('addToCart', {...query, callback: this.callback})
        const errorMsg = await this.$store.dispatch('addToCart2', query)
        this.callback(errorMsg)
      },

      callback (errorMsg) {

        const query = {skuId: this.skuInfo.id, skuNum: this.skuNum}
        // 如果成功了
        if (!errorMsg) {
          
          // 在跳转前将skuInfo保存到sessionStorage (key=value, value只能是字符串)
          window.sessionStorage.setItem('SKU_INFO_KEY', JSON.stringify(this.skuInfo))

          this.$router.push({path: '/addcartsuccess', query})
        } else {
          alert(errorMsg)
        }
      }
    },
    
    components: {
      ImageList,
      Zoom
    }
  }
</script>
```

 

## 7. 注册Detail路由 

- router/routes.js

```js
{
  path: '/detail/:skuId',
  component: Detail
},
```

 

 