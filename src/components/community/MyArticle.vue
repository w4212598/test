<template>
  <div>
    <div class="no-login" v-if="!cookiee">
      登陆后查看我的帖子
    </div>
  <div class="post-container" v-if="cookiee">
    <div class="no-items" v-if="!isloading&&items.length==0&&!noconnect">这里还没有内容哦,赶快发表第一篇帖子吧</div>
    <div class="no-connect" v-if="noconnect">网络不给力，请检查网络设置
    <span v-on:click="getMyArticle" class="relink">点击重试</span>
    </div>
    <div class="loading-container" v-if="isloading">
      <mt-spinner type="snake" color='rgb(30,144,255)'  class="translate-in" :size=35></mt-spinner>
      <span class='loading-text' >　加载数据中...</span>
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
  </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getcookie();
        vm.getMyArticle();

      })
    },
      mounted(){

    },
    data(){
      return {
        items:[],
        cookiee:{

        },
        isloading:true,
        noconnect:false
      }
    },
    methods:{

      getMyArticle(cookiee){
        cookiee=this.cookiee;
        if(cookiee){
          let _this = this;
          _this.isloading=true;
          _this.noconnect=false;
          let username = _this.cookiee.username;
          setTimeout(function () {
            $.ajax({
              url:_this.getSever('article','my'),
              method:'post',
              data:{
                'username':username,
              },
              success:function (res) {
                res = JSON.parse(res);
                _this.items = res;
                _this.isloading=false
              },
              error:function () {
                _this.isloading=false;
                _this.noconnect=true
              }
            })
          },)
        }
        else{
            return false
        }


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
      }
    }
  }
</script>
