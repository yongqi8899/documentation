# 11. Detail Komponent

## 11.1 Aussehen

![img](./images/hund_detail.png) 

## 11.2 Detail Komponente Konstruktor

1. DetailLeft.vue: Banner
2. DetailRechts.vue: Detail
3. index.vue: exportieren

## 11.3 code

- DetailLeft.vue
```vue
<template>
  <div>
    <div class="produkt-container" v-if="produkt && produkt.imgs">
      <img 
        v-for="(img, j) in produkt.imgs"
        :key="j"
        :src="img"
        alt=""
        v-show="cur == j"
      />
    </div>
  </div>
</template>
<script>
import { getProduktById } from "@/api/produkt";
export default {
  data() {
    return {
      cur: 0,
      timer: null,
      produkt: null,
    };
  },
  created() {
    const proId = this.$route.params.id;
    this.produkt = getProduktById(proId);
  },
  methods: {
    play() {
      this.timer = setInterval(this.autoPlay, 2000);
    },
    autoPlay() {
      this.cur++;
      if (this.cur >= this.produkt.imgs.length) {
        this.cur = 0;
      }
    },
  },
  mounted() {
    this.play();
  },
  destroyed() {
    clearInterval(this.timer);
    clearInterval(this.imgs);
  },
};
</script>
<style lang="scss" scoped>
body {
  color: var(--text);
}
h2 {
  color: var(--themeColor);
}
.produkte_discreption {
  background-color: antiquewhite;
  border: 1px var(--themeColor);
}
.content {
  display: flex;
}
.produkt-container {
  display: flex;
  position: relative;
  img {
    width:37rem; 
    height:37rem;
  }
  .icofont-circled-left{
  position: absolute;
  left: 10px;
  top:50%;
  transition: (-50%);
  }
  .banner-circle{
    position: absolute;
    bottom: 10px;
    left: 50%;
  }
  .icofont-circled-right{
    position: absolute;
    right: 10px;
    top:50%;
    
  }
  .icofont-3x{
    color: var(--bgColor);
    &:hover{
    color: var(--themeColor);
    
    }
  }
}

@media only screen and (max-width: 768px) {
  img {
  
    width:20rem; 
    height:20rem;
  
  }
  #content-wrapper {
    flex-wrap: wrap;
  }
}
</style>

```

- DetailRechts.vue
```vue
<template>
  <div class="recht">
    <div id="content-wrapper" v-if="produkt">
      <div class="text">
        <h1>{{ produkt.title }}</h1>
        <hr />
        <hr />
        <h1>€{{ produkt.price }}</h1>
        <hr />
        <h3>{{ produkt.text }}</h3>
        <div class="counter">
          <span class="ico icofont-ui-remove" @click="decrement"></span>
              <p>{{$store.state.count}}</p>
          <span class="ico icofont-ui-add" @click="increment"></span>
          <my-btn :title="'IN DEN EINKAUFSWAGEN'" @click.native="doAddToCard()"> </my-btn>
        </div>
        <my-btn :title='"zurück"'  @click.native="goBack()" class="goback"/>
       </div>
    </div>
  </div>
</template>
<script>
import { getProduktById,addShopcart,getShopcart } from "@/api/produkt";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      // produkt: null,
      // cart: null,
      item:{}
    };
  },
  created() {
    const proId = this.$route.params.id;
    this.produkt = getProduktById(proId);
    this.cart = getShopcart()
  },
 
 methods: {
    goBack() {
      this.$router.push("/produkt");
    },
    ...mapActions(["decrement"]),
    
    ...mapActions({
      increment() {
        this.$store.dispatch("increment");
      },
    }),
    doAddToCard(){
      // addShopcart({
        // ...this.produkt,
        // count:this.$store.state.count,
      this.$store.dispatch('cartAdd',this.item);
      this.$router.push('/order');
      // })
    }
    },

 computed: {
    ...mapState(["count"])
  },
};
</script>
<style lang="scss" scoped>
#content-wrapper {
  display: flex;
   height: 100%;
    width: 100%;
  .text {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    line-height: 2rem;
    .ico{
      color: var(--themeColor);
      align-items: center;
      &:hover {
        cursor: pointer;
      }
    }
    .goback{
        width:100px;
      }
    .counter {
      display: flex;
      margin: 2rem 0;
      width: 100%;
      justify-content: space-between;

      .count{
        display: flex;
        border-bottom: 2px solid var(--themeColor);
        width: 5rem;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
}
</style>

```
- index.vue
```vue
<template>
  <div class="layout">
    <div class="left">
      <DetailLeft />
    </div>
    <div class="recht">
      <DetailRecht />
    </div>
  </div>
</template>

<script>
import DetailRecht from "./DetailRecht.vue"
import DetailLeft from "./DetailLeft.vue"
export default {
  name: "DetailView",
  components: {
    DetailLeft,
    DetailRecht,
  },
};
</script>
<style scoped>

@media only screen and (max-width:1024px){
	body{display: grid;
    height: 100vh;
   grid-template-columns: 100%;
    grid-template-rows: 10% auto 10%;
    background-color:rgba(220,165,95,0.0);
	grid-template-areas: 
		"nav"
		"left"
		"footer"
}
	
	nav{
    grid-area: nav;
}
    
.left{
      grid-area: left;
}
.recht{
      background-color: rgba(184,83,184,0.00); 
      grid-area: left;
	z-index: 10;
}}

</style>

```
