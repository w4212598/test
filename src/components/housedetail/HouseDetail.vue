
<template>
  <div class="detail-container" >
    <div class="header">
      <span><i class="iconfont icon-fanhui backto" v-on:click="backhome"></i>　房间详情</span>
    </div>
    <div class="header-selector">
      <router-link v-for="(link,index) in data1" :key="index"
                    :to="{path:link.roomid}"
      >
      <div class="item1"><span>房间{{index+1}}</span>　
        <p class="house-status-true" v-if="link.status==1">空</p>
        <p class="house-status-false" v-if="link.status==0">住</p><br><br>
        <span>Room{{index+1}}</span>
      </div>
      </router-link>
      </div>


    <router-view>

    </router-view>




  </div>


</template>

<script>
  import Vue from 'vue'
  import Swiper from 'vue-swiper'
  import map from './map.vue'
  import $ from 'jquery';
  import room from './Room.vue'
  export default{
    name:"HouseDetail",


    beforeRouteEnter (to, from, next) {
      next(vm => {

        vm.Update();
        vm.getInfo();
        vm.BackToTop()
      })
    },
    beforeRouteUpdate (to, from, next) {
      next();
      this.getInfo();
      this.BackToTop();
      this.Update();
    },
    data(){
      return{
        data1:[],
        data:{},
        index: 0
      }
    },

    methods:{
      getInfo(){
        let id = this.$route.params.id;
        let aid = this.$route.params.aid;
        let _this = this;
        $.ajax({
          url:_this.getSever('house','find')+'&aid='+aid+'&id='+id,
          success:function (res) {
            let data = JSON.parse(res);
            _this.data  = data[0];
          },
          error:function () {
            _this.$toast({
              message:'网络连接失败！',
              duration: 1500,
              position:'bottom'
            })
          },
        })
      },
      Update(){
        let id = this.$route.params.id;
        let aid = this.$route.params.aid;
        let _this = this;
        $.ajax({
          url:_this.getSever('house','update')+'&aid='+aid,
          success:function (res) {
            let data = JSON.parse(res);
            _this.data1  = data;
          },
          error:function () {
            _this.$toast({
              message:'网络连接失败！',
              duration: 1500,
              position:'bottom'
            })
          },
        })
      },
      BackToTop(){
        $('body').css('scrollTop','0')
      },
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      },
      backhome(){
         this.$router.push({path:'/home'})
      }

    },
    components:{
        'map-component':map,
        'room-component':room,

    }
  }
</script>

