<template>
  <div class="search-index">
    <div class="input-container">
    <input
    v-model="value"
    @keyup.enter="search"
    placeholder="输入小区名、区域名等">
      <router-link to="/">
      <a class='back' href="">返回</a>
      </router-link>
    </div>

    <div
      class="house-items"
    >
    <div class='result-not-found' v-if="result.length==0">未找到结果</div>
      <router-link v-for="(link, index) in result" :key="index" class="house-container"
                   :to="{path:'housedetail/'+link.apartmentid+'/'+link.id}"
                   v-if="result.length!==0"

      >


        <div class="item-container">
          <img v-bind:src="getImg(link.img3) " alt="" class="house-image">
          <div class="price">￥{{link.price}}/月</div>
        </div>
        <div class="house-name">{{link.name}}<span class="status">未租</span></div>
        <div class="house-info"><span class="location">{{link.location}}</span><span class="area">{{link.area}}平米</span><span class="direction">{{link.direction}}</span></div>



      </router-link>

    </div>

  </div>

</template>

<script>
  import $ from 'jquery';
  export default{

    name:"SearchIndex",
    data(){
        return{
          value:'',
          result:[]
        };

    },
    methods:{
        search(){

            let _this = this;
            return $.ajax({
              url:_this.getSever('house','search')+'&value='+this.value,
              error:function () {
                _this.$toast({
                  message:'网络连接失败！',
                  duration: 1500,
                  position:'bottom'
                })
              },
            }).then(function (res) {
              _this.result= JSON.parse(res);

            })

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
