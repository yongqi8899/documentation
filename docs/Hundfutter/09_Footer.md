# 9. Footer Komponent
## 9.1. Aussehen

![img](./images/hund_footer.png) 

## 9.2. Footer Code
```vue
<template>
  <div class="footer">
       <a href="http://yongqi.ml/" target="_blank">@ Yongqi Zhang</a>
  </div>
</template>

<script>
export default {
name:"Footer"
}
</script>

<style lang="scss" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2rem;
  color: var(--themeColor);
  border-top: 0.1px solid var(--gray);
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  line-height: 2rem;
  z-index: 100;

}    
a{
  color: var(--themeColor);
  }
</style>
```


