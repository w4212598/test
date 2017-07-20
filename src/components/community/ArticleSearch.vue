<template>
  <div class="asearch-container">
    <div class="asearch-header">
      <span class="asearch-back"><i class="iconfont icon-fanhui fanhui" v-on:click="back"></i></span>　
      <input type="text" class="asearch-input" placeholder="请输入文章标题" @keyup.enter="search" v-model="value">
    </div>
    <div class="asearch-content">
      <div class='result-not-found' v-if="items.length==0">未找到结果</div>
      <router-link v-for="(link,index) in items" :to="{path:'/articledetail/'+link.id}" class="post-link" :key="index">
        <div class="post-items" style="background-color: white">
          <div class="post-title">
            {{link.title}}
      </div>
          <div class="post-content">
            <div class="nopic-content" v-if="!link.img">
              {{link.content}}
        </div>
            <img v-bind:src=getImg(link.img) alt="" v-if="link.img">
          </div>
          <div class="post-info">
            <div class="create-time">{{link.createTime}}</div>
            <img class='author-icon' v-bind:src=getImg(link.icon) alt="" v-if="link.icon"><div class="post-author">{{link.author}}
        　</div>
            <div class="clear"></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
      name:'',
      data(){
          return{
            value:'',
            items:[]
          }
      },
      methods:{
          back(){
            this.$router.push({path:'/community'});
        },
          getSever(controller,action){
          return this.webConfig.getAjaxPath(controller,action)
        },
          getImg(name){
          return this.webConfig.getImgPath('assets/img/'+name)
        },
          search(){
              let _this = this ;
              $.ajax({
                url:_this.getSever('article','find')+'&val='+_this.value,
                error:function () {

                  _this.$toast({
                    message:'网络连接失败！',
                    duration: 1500,
                    position:'bottom'
                  })
                },
              }).then(function (res) {
                  _this.items = JSON.parse(res)
              })
          }
      }
  }
</script>
