# 6. vue-router

## 6.1 code

1. Routing-Komponente erstellen
```
 views/About/index.vue
 views/Anmelden/index.vue
 views/Detail/index.vue
 views/Einkaufswagen/index.vue
 views/Home/index.vue
 views/Kontakt/index.vue
 views/Produkt/index.vue
 views/Search/index.vue
 views/Register/index.vue
```
2. router/index.js: 
vue-lazyload
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView = () => import('@/views/Home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView = () => import('../views/About/index.vue')
  },
  {
    path: '/produkt',
    name: 'produkt',
    meta:{
      keepAlive: true 
    },
    component: ProduktView = () => import('../views/Produkt/index.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView = () => import('../views/Detail/index.vue')
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component:KontaktView = () => import('../views/Kontakt/Kontaktrechts.vue')
  },
  {
    path: '/order',
    name: 'order',
    component:OrderView = () => import('../views/Einkaufswagen/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView = () => import('../views/Search')
  },
  {
      path: '/login',
      name: 'login',
      component:LoginView = () => import('../views/Anmelden/LoginView.vue')
    },
  {
      path: '/',
      name: 'registrieren',
      component:RegistrierenView = () => import('../views/Register')
    }
]

const router = new VueRouter({
  linkExactActiveClass:'active',
  routes
})
export default router
```
3. statische Komponenten  erstellen

```vue
  views/NavBottom.vue
  views/Footer.vue
```

4. App.vue
```vue
<template>
  <div id="app">
    <div class="NavButton">
      <NavBottom />
    </div>
    <div class="inhalt">
      <router-view />
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBottom from "./views/NavBottom.vue";
import Footer from "./views/Footer.vue";

export default {
  components: {
    NavBottom,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  .NavButton {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 102;
    padding: 1rem 10%;
  }
  .inhalt {
    margin: 7rem 10% 4rem 10%;
    // margin: 0 auto;
  }
}
</style>

```
## 6.2 jsconfig.json

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


