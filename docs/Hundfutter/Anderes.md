# Anderes

## 1. Bilder lazyload
### 1) vue-lazyload herunterladen
```
npm install -S vue-lazyload
```

### 2) Bilder importieren und konfigurieren

main.js

```js
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload)
```


### 3) code
    produkt.vue
    ```vue
    <div>
        <img src="@/assets/img/loading.gif" v-lazy="produkt.card" alt="" />
      </div>
    ```


## 2. vue-router lazyloading

1. code
```js
Home = () => import('@/pages/Home')
```

## 3. SVG Loader
```vue
 npm install vue-svg-loader@0.16.0",
 npm install vue-template-compiler@2.6.14
```

## zwischengespeichert mit Keep-Alive
```vue

```

 

 

 

 

 


 