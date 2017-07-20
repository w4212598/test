<template>
  <div class="recommend-container">
    <div class="title">
      你可能感兴趣的房源
    </div>
    <div class="content">
      <router-link class="item" v-for="(link,index) in items" :to="'/housedetail/'+link.apartmentid+'/'+link.id" v-on:click="reload()" :key="index" exact>
        <div class="room-image">
          <img v-bind:src="getImg(link.img1)" alt="">
        </div>
        <div class="room-info">
          <div class="name">{{link.name}}</div>
          <div class="location"><span>{{link.location}}</span>　|　<span>{{link.area}}平米</span></div>
          <div class="room-price">￥{{link.price}}</div>
          <div class="total-price">整租优惠价：8500元/月</div>
        </div>
      </router-link>


    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
      name:'recommend-container',

      mounted(){
        this.randomfind();
      },
    beforeRouteUpdate (to, from, next) {
      next(vm => {

      });
      this.BackToTop();
    },
      data(){
          return{
              items:[

              ]
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
            }
          })
        },
          randomfind(){
              let _this = this;
              $.ajax({
                url:_this.getSever('house','random'),
                success(res){
                  res = JSON.parse(res);
                  _this.items = res
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
        getImg(name){
          return this.webConfig.getImgPath('assets/img/'+name)
        },
        getSever(controller,action){
          return this.webConfig.getAjaxPath(controller,action)
        },

        BackToTop(){
          $('body').css('scrollTop','0')
        },
        open(){
            this.$emit('showbox')
        },
        reload(){
          this.BackToTop();
        }
      }
  }
</script>
