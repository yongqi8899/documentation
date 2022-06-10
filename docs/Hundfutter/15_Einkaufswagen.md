# 21. ShopCart路由

## 1. 重难点说明

1) 用户临时ID的处理

2) 购物车数据的管理(复杂)

3) 不使用v-model监控用户输入

4) async / await / Promise.all() 的使用

## 2. 接口请求函数



 

## 3. vuex管理的购物车模块

store/modules/shopCart.js



 

## 4. 请求携带唯一的用户临时ID

1) 下载工具包

npm install uuid store -S

2) utils/storageUtils



 

3) store/modules/user.js



4) api/ajax.js



## 5. ShopCart路由组件

pages/ShopCart/index.vue

