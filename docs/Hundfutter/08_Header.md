# 8. Nav Komponent

## 8.1. Aussehen

![img](./images/hund_header.png) 

1. die deklarative Routennavigation und programmatischen Routennavigationwerden verwendet.
2. Parametern werden getragen, wenn die Route gewechselt werden
## 8.2. Nav Code
```vue
<template>
  <div>
    <nav class="dropdown">
      <div class="nav-bar">
        <button class="dropbtn">
          <i class="icofont-navigation-menu"></i>
        </button>
        <ul class="dropdown-content icofont-5x">
          <li v-for="(v, i) in items" :key="i">
            <router-link :to="v.url"
              >{{ v.name }}
              <i :class="v.icon"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="wrapper-right">
        <div class="search">
          <router-link to="/search"><my-search /></router-link>
        </div>
        <div class="right">
          <div class="login">
            <router-link to="/login">Login </router-link>
            <span>|</span>
            <router-link to="/registrieren">Registrieren</router-link>
          </div >
          <i class="icofont-ui-cart icofont-3x" @click="toCart"></i>
          <!-- <span>{{totalCount}}</span> -->
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  data() {
    return {
      items: [
        { name: "home", url: "/home" },
        { name: "produkte", url: "/produkt" },
        { name: "über uns", url: "/about" },
        { name: "kontakt", url: "/kontakt" },
      ],
    };
  },
  computed:{ 
    ...mapGetters(['totalCount']),
   
  },
  methods:{
     toCart(){
      this.$router.push('./order')
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  border-bottom: 2px solid var(--themeColor);
}
nav.dropdown {
  button {
    display: none;
  }
  margin: auto;
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  color: var(--themeColor);
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  position: sticky;
  .dropdown-content {
    display: flex;
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
  }
  .wrapper-right {
    display: flex;
    align-items: center;
    justify-content: center;
    .search {
      margin-right: 3rem;
      a {
        text-decoration: none;
        &:hover{
          background-color: transparent;
        }
      }
      .active{
        border-bottom: 0px solid transparent;
        background-color: transparent;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    .login {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 2rem;
    }
  }
}

a {
  color: var(--themeColor);
  text-decoration: none;
  padding: 5px;
  &:hover {
    background-color: var(--themeColor);
    color: var(--white);
    cursor: pointer;
  }
}

li {
  list-style: none;
  display: inline;
  margin-right: 1rem;
}

@media only screen and (max-width: 1024px) {
  .active {
  border-bottom: none;
}
  nav.dropdown {
    .dropbtn {
      display: inline-block;
      background: var(--transparent);
      font-size: 2rem;
      border: none;
      &:hover {
        background-color: var(--white);
      }
    }
    .nav-bar {
      .dropdown-content {
        display: none;
        text-align: left;
        a {
          background-color: rgba(252, 252, 252, 0.8);
          text-decoration: none;
          line-height: 2rem;
          min-width: 9rem;
          display: block;
          float: left;
          &:hover {
            background-color: var(--themeColor);
            color: var(--white);
          }
        }
      }
    }
  }

  .dropdown:hover {
    .nav-bar {
      display: block;
      .dropdown-content {
        display: flex;
        flex-direction: column;
        position: absolute;
      }
    }
  }
}
</style>
```
