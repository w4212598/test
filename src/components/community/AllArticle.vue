<template>
  <div>
    <div class="no-items" v-if="!isloading&&items.length==0&&!noconnect">这里还没有内容哦,赶快发表第一篇帖子吧</div>
    <div class="no-connect" v-if="noconnect">网络不给力，请检查网络设置
    <span v-on:click="getArticle" class="relink">点击重试</span>
    </div>
    <div class="loading-container" v-if="isloading">
      <mt-spinner type="snake" color='rgb(30,144,255)'  class="translate-in" :size=35></mt-spinner>
      <span class='loading-text' >　加载数据中...</span>
    </div>
  <div class="post-container">
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'">拉我刷新</span>
        <span v-show="topStatus === 'loading'" class="loadingmore"><img v-bind:src='getImg("loading.gif")' alt="">&nbsp文章更新中...</span>
      </div>
    <router-link v-for="(link,index) in items" :to="{path:'/articledetail/'+link.id}" class="post-link" :key="index">
      <div class="post-items" >
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
    </mt-loadmore>
  </div>

  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    mounted(){
      this.getArticle();
      this.getcookie()
    },
    data(){
      return {
        items:[],
        cookiee:{

        },
        isloading:true,
        noconnect:false,
        topStatus:''

      }
    },
    methods:{
      getArticle(){
        this.isloading=true;
        this.noconnect=false;
        let _this = this;
        setTimeout(function () {
          $.ajax({
            url:_this.getSever('article','get'),
            success:function (res) {
              res = JSON.parse(res);
              _this.items = res;
              _this.isloading=false
            },
            error:function () {
              _this.isloading=false;
              _this.noconnect=true;

            }
          })
        })
      },
      getArticle1(){
        let _this = this;
        setTimeout(function () {
          $.ajax({
            url:_this.getSever('article','get'),
            success:function (res) {
              res = JSON.parse(res);
              _this.items = res;

            },
            error:function () {

            }
          })
        })
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      },
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      getcookie(){
        let _this = this;
        if (_this.cookiee) {
          this.cookiee = this.$cookie.get('userinfo');
          this.cookiee = JSON.parse(this.cookiee);
          this.cookiee = JSON.parse(this.cookiee);
        }
        {
          return false
        }
      },
      loadTop() {
          let _this = this;
          this.getArticle1();
          setTimeout(function () {
            _this.$refs.loadmore.onTopLoaded();
          },1000);
          setTimeout(function () {
              _this.$toast({
                message: "已更新文章！",
                duration: 1500,
                position: 'bottom'
              })
            },1000)



      },
      handleTopChange(status) {
        this.topStatus = status;
      },

    }
  }
</script>
