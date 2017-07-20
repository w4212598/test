<template>
  <div>
  <div class="already-sale" v-if="data.status==0" >该房间已经租出去了，看看其他房间吧！</div>
  <div class="swipe-container">
    <div class="swiper">
      <mt-swipe :show-indicators="false">
        <mt-swipe-item><img class="swipe-img" v-bind:src="getImg(data.img1)" alt=""></mt-swipe-item>
        <mt-swipe-item><img class="swipe-img" v-bind:src="getImg(data.img2)" alt=""></mt-swipe-item>
        <mt-swipe-item><img class="swipe-img" v-bind:src="getImg(data.img3)" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="detail-price">{{data.price}}元/月</div>
  </div>

  <div class="room-detail">
    <div class="title">
      {{data.name}}
        <p class="total-price">整租优惠价：{{data.totalprice}}元/月</p>
    </div>
    <div class="content">
      <div class="items">
        <div class="detail-title">小区</div>
        <div class="detail-content">{{data.villagename}}</div>
      </div>

      <div class="items">
        <div class="detail-title">户型</div>
        <div class="detail-content">{{data.housetype}}</div>
      </div>

      <div class="items">
        <div class="detail-title">楼层</div>
        <div class="detail-content">4/6</div>
      </div>

      <div class="items">
        <div class="detail-title">面积</div>
        <div class="detail-content">{{data.area}}平米</div>
      </div>

      <div class="items">
        <div class="detail-title">朝向</div>
        <div class="detail-content">{{data.direction}}</div>
      </div>

      <div class="nofloat-items">
        <div class="detail-title">交通</div>
        <div class="content">地铁:四号线　公交：1路
          </div>

      </div>

      <div class="nofloat-items">
        <div class="detail-title">购物</div>
        <div class="content">永辉超市</div>
      </div>

      <div class="nofloat-items">
        <div class="detail-title">银行</div>
        <div class="content">工商银行、中国银行</div>
      </div>
    </div>
    <div class="room-img">
      <div class="title">
        房间详情
      </div>
      <div class="img-content">
        <img class="detail-img" v-bind:src=" getImg(data.img1)" alt="">
      </div>
      <div class="support">
        <div class="title">
          配套设施
        </div>
        <div class="icon-container">
          <i class="icon iconfont icon-quanmianqingjie"></i>
          <i class="icon iconfont icon-dianshi"></i>
          <i class="icon iconfont icon-weibolu"></i>
          <i class="icon iconfont icon-kongtiao"></i>
          <i class="icon iconfont icon-xiyiji"></i>
          <i class="icon iconfont icon-chuang"></i>
          <i class="icon iconfont icon-deng"></i>
          <i class="icon iconfont icon-diancilu"></i>
          <i class="icon iconfont icon-kongtiao"></i>
        </div>
        <img class="detail-img" v-bind:src="getImg(data.img2)" alt="">
      </div>
      <div class="service">
        <div class="title">管家服务</div>
        <div class="content">
          <div class="item">
            <i class="icon iconfont icon-wifi"></i><br>
            <span>免费wifi</span>

          </div>

          <div class="item">
            <i class="icon iconfont icon-icon-test"></i><br>
            <span>管家服务</span>
          </div>

          <div class="item">
            <i class="icon iconfont icon-weixiu"></i><br>
            <span>维修服务</span>
          </div>

          <div class="item">
            <i class="icon iconfont icon-baojifuwu"></i><br>
            <span>保洁服务</span>
          </div>

        </div>
      </div>
      <map-component></map-component>
      <recommend-component></recommend-component>

    </div>
  </div>
  <div class="button-container" v-if="data.status==1">
    <button class="remark-button">预约看房</button>
    <button class="remark-button">抢订房源</button>
  </div>
    <div class="button-container-false" v-if="data.status==0">
      <button class="remark-button" disabled="disabled">预约看房</button>
      <button class="remark-button" disabled="disabled">抢订房源</button>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import Swiper from 'vue-swiper'
  import map from './map.vue'
  import recommend from './recommend.vue'
  import $ from 'jquery';
  export default{
    name:'name',
    mouted(){

    },
    beforeRouteEnter (to, from, next) {
      next(vm => {

        vm.getInfo();
        vm.Update();
        vm.BackToTop()
      })
    },
    beforeRouteUpdate (to, from, next) {
      next(vm => {
        vm.getInfo();
        vm.BackToTop()
      });
      this.getInfo();
    },
    data(){
      return{
        data1:[],
        data:{
          img1:'',
          img2:'',
          img3:'',
        },
        index: 0
      }
    },
    methods:{
      getInfo(){
        this.BackToTop();
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
        $('body').animate({scrollTop:'0'},100)
      },
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      }
    },

    components:{
      'map-component':map,
      'recommend-component':recommend

    }
  }
</script>
