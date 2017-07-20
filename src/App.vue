<template>
  <div id="app">
    <div id="welcome-index" >
      <span class="count-down" v-on:click="exit">跳过此页{{second}}</span>
      <div class="welcome-text">
        <span class="welcome-to">欢迎使用租房客</span></div>
    </div>
<transition :name="transitionName">
    <router-view class="Router"></router-view>
</transition>
    <footer-component></footer-component>
  </div>
</template>

<script>
  import $ from 'jquery'
  import footer from './components/pubilc/Footer.vue'
  require('./assets/css/index.css');
  require('./assets/css/fonts/iconfont.css');
  require('../node_modules/jquery/dist/jquery.js');
  export default {
  name: 'app',
    components:{
      'footer-component':footer,
    },
    mounted(){
      this.showwelcome();
      this.time()
    },
    data(){
      return {
        transitionName:'',
        cookiee:{

        },
        second:5,
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    methods:{
      getcookie(){
        let _this =this;
        if(_this.cookiee){
          this.cookiee = this.$cookie.get('userinfo');
          this.cookiee = JSON.parse(this.cookiee);
          this.cookiee = JSON.parse(this.cookiee);
        }{
          return false
        }
      },
      showwelcome(){
        $('.welcome-to').fadeIn(2000);

          setTimeout(
              function () {
              $('#welcome-index').css('visibility','hidden')
          },5000)
      },
      exit(){
        $('#welcome-index').css('visibility','hidden')
      },
      time(){
          let _this = this;
          function timer(){
            _this.second--;
            if(_this.second===0){
                return false
            }
            setTimeout(timer,1000)
          }
          setTimeout(timer,1000)
      }
    }
}
</script>


<style>
  .Router {
    position: absolute;
    width: 100%;
    transition: all .2s ease;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity:0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity:0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }

</style>
