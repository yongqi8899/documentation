# 14. Gemeinsam Komponents

## Button
```vue
<template>
  <div>
    <button :type="type" :class="[icon, this.theme]" :color="color" :action="action">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name:'my-btn',
  data(){
    return {
   
    }
  },
  props:{
    title:{
      type:String,
      default:''
    },
    type:{
      type:String,
      default:'submit'
    },
    theme:{
      type:String,
      default:()=>'button'
    },
    color:{
      type:String,
      default:'black'
    },
    icon:{
      type:String,
      default:' ' 
    },
    action:Function,
  },
  methods:{
   
  }
}
</script>
<style lang="scss">

 .color{
  font-size: 1rem;
  display: block;
  width: 100%;
  min-width: 100px;
  height: 50px;
  border: none;
  background: linear-gradient(120deg,var(--orange),var(--themeColor),var(--blue));
  background-size: 200%;
  color: #fff;
  outline: none;
  cursor: pointer;
  transition: .5s;
}

.color:hover{
  background-position: right;
} 

.button {
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem;
  border-radius: 1rem;
  border: 1px solid #D4D3E8;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 70px;
  min-height: 40px;
  color: var(--themeColor);;
  box-shadow: 0px 2px 2px var(--themeColor);;
  cursor: pointer;
  transition: .2s;
}

.button:active,
.button:focus,
.button:hover {
  border-color: var(--themeColor);
  outline: none;
  background-color: var(--white);
}

.blur {
  border-color: var(--themeColor);
  // color: #fff;
  box-shadow: 0 0 40px 40px var(--themeColor) inset, 0 0 0 0 var(--themeColor);
  transition: all 150ms ease-in-out;
  
  &:hover {
    box-shadow: 0 0 10px 0 var(--themeColor) inset, 0 0 10px 4px var(--themeColor);
  }
}
</style>

```

```js
import index from './main.vue'
export default index
```
- index.js
```js
import Vue from 'vue'

 const componentsContext = require.context('./', true, /\.js$/); 

 console.log( componentsContext.keys());
 componentsContext.keys().forEach(component => { 
     const componentConfig = componentsContext(component) 
     // 兼容import export和require module.export两种规范 
     const ctrl = componentConfig.default || componentConfig; 
     // 加载全局组件 
     if (ctrl && ctrl.name) { 
         Vue.component(ctrl.name, ctrl); 
    }
 })
```


