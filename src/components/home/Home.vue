<template>
  <div>


  <div class="home-container">
  <!--<Head-component></Head-component>-->
    <Search-component></Search-component>
  <HouseInfo-component></HouseInfo-component>

      </div>
  </div>
</template>
<script>

  import Head from './components/Head.vue'
  import HouseInfo from './components/HouseInfo.vue'
  import Search from './components/Search.vue'


//  解决手机输入框弹出后高度变化的问题、


  export default{
      name:"home",
      mounted(){

      },
      components:{
          'Head-component':Head,
          'HouseInfo-component':HouseInfo,
          'Search-component':Search,

      }

  }
</script>
