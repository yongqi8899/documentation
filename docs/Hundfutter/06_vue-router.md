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
2. router/index.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/index.vue'
import AboutView from '../views/About/index.vue'
import ProduktView from '../views/Produkt/index.vue'
import DetailView from '../views/Detail/index.vue'
import KontaktView from '../views/Kontakt/Kontaktrechts.vue'
import OrderView from '../views/Einkaufswagen/index.vue'
import LoginView from '../views/Anmelden/LoginView.vue'
import RegistrierenView from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/produkt',
    name: 'produkt',
    meta:{
      keepAlive: true 
    },
    component: ProduktView
  },
  {
    path: '/detail/:id',
    // path:'/detail',
    // query:{id:detailsId},
    name: 'detail',
    component: DetailView
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component:KontaktView
  },
  {
    path: '/order',
    name: 'order',
    component:OrderView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
      path: '/login',
      name: 'login',
      component:LoginView
    },
  {
      path: '/',
      name: 'registrieren',
      component:RegistrierenView
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


