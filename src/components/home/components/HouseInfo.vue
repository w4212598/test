<template>
  <div>
    <div class="no-items" v-if="!isloading&&items.length==0&&!noconnect">这里还没有内容哦,赶快发表第一篇帖子吧</div>
    <div class="no-connect" v-if="noconnect">网络不给力，请检查网络设置;
    <span v-on:click="getList" class="relink">点击重试</span>
    </div>
    <div class="loading-container" v-if="isloading">
      <mt-spinner type="snake" color='rgb(30,144,255)'  class="translate-in" :size=35></mt-spinner>
      <span class='loading-text' >　加载数据中...</span>
    </div>
    <div class="house-items">
      <router-link v-for="(link,index) in items" class="house-container"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10"
       infinite-scroll-immediate-check="false"
                 :key="index"
                 :to="{path:'housedetail/'+link.apartmentid+'/'+link.id}"

  >


      <div class="item-container">
      <img v-bind:src=getImg(link.img3) alt="" class="house-image">
      <div class="price">￥{{link.price}}/月</div>
      </div>
      <div class="house-name">{{link.name}}<span class="status">未租</span></div>
      <div class="house-info"><span class="location">{{link.location}}</span><span class="area">{{link.area}}平米</span><span class="direction">{{link.direction}}</span></div>



  </router-link>
  </div>
  <div class="loading" v-show="loading"><img v-bind:src='getImg("loading.gif")' alt="">加载数据中...</div>
  </div>




</template>
<script>

  import $ from 'jquery';
  import router from 'vue-router'
  export default{
    name:"HouseInfo",
    mounted(){
       this.getList();
    },
    data(){
        return{
          houseid:1,
          allLoaded:false,
          items:[],
          pagenation : 3,
          loading : false,
          isMax :false,
          isloading:true,
          noconnect:false
        }
    },

    methods:{
      getList(){
            this.isloading=true;
            this.noconnect=false;
            let _this = this;
            setTimeout(function () {
              $.ajax({
                url:_this.getSever('house','get')+'&i=0',
                success:function (res) {
                  res=JSON.parse(res);
                  _this.items  = res;
                  _this.isloading=false
                },
                error:function () {
                  _this.isloading=false;
                  _this.noconnect=true
                }
              })
            },3000)
            },
      update(){
        let _this = this;

        return $.ajax({
            url:_this.getSever('house','get')+'&i='+_this.pagenation
        }).then(function (res) {
          res=JSON.parse(res);
          _this.items  =_this.items.concat(res);
          _this.pagenation += 3;
        });
      },
      loadMore () {
        if(this.isMax){
          return ;

        }
        let _this = this;
          this.loading = true;
        setTimeout(() => {
          _this.update();
          _this.loading = false;
        }, 2500);



        this.isMax =this.pagenation>0
      },
      findOne(id){
        router.push({ path: '/housedetail', query: { plan: id }})
      },
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      }
    }



    }



</script>
