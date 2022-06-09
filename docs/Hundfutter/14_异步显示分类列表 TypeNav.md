# 14. 异步显示分类列表: TypeNav

## 1. 重难点列表

1. 组件与vuex交互
2. 优化减少组件对象数量: 使用编程式导航代替声明式导航
3. 优化事件处理效率: 利用事件委托
4. 利用标签自定义属性携带动态数据
5. 事件控制二三级分类列表的显示与隐藏
6. 优化高频事件触发处理: 利用lodash进行函数节流处理
7. 优化减小打包文件: 对lodash库实现按需引入
8. 解决快速移出后可能显示第一个分类的子分类列表的bug
9. 控制一级列表的显示与隐藏
10. 一级列表显示隐藏的过渡效果
11. 合并分类query参数与搜索的关键字params参数



## 2. 下载依赖包

```shell
npm i lodash
```



## 3. 编码实现

1. components/TypeNav/index.vue

```vue
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideList" @mouseenter="isShowFirst=true">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
          <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{active: index===currentIndex}"
                @mouseenter="showSubList(index)"
              >
                <h3>
                  <a
                    href="javascript:"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a
                          href="javascript:"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
import throttle from "lodash/throttle";
import { mapState } from "vuex";

export default {
  name: "TypeNav",

  data() {
    return {
      currentIndex: -1,
      isShowFirst: false // 是否显示一级列表
    };
  },

  computed: {
    ...mapState({
      categoryList: state => state.home.baseCategoryList
    })
  },

  created() {
    this.isShowFirst = this.$route.path === "/";
  },

  methods: {
    hideList() {
      this.currentIndex = -1;
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    },

    // showSubList: _.throttle(function (index) {
    showSubList: throttle(
      function(index) {
        console.log("----", index);
        this.currentIndex = index;
      },
      200,
      { trailing: false }
    ),

    /* 
    点击跳转去搜索界面
    */
    toSearch(event) {
      // 得到事件源标签上的自定义属性
      const {
        categoryname,
        category1id,
        category2id,
        category3id
      } = event.target.dataset;
      // console.log(categoryname)
      // 如果有分类名称, 说明点击的是某个分类项
      if (categoryname) { 
        // 准备query参数
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        } 

        // 准备用于跳转路由的目标location对象
        const location = { 
          path: "/search", 
          query, 
          params: this.$route.params // 携带上原本就有的params参数
        }

        // 跳转到搜索路由
        this.$router.push(location)
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.slide-enter-active, &.slide-leave-active {
        transition: all 0.3s;
      }
      &.slide-enter, &.slide-leave-to {
        opacity: 0;
        height: 0
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 550px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.active {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
```
