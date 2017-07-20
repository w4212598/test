<template>

  <div class="community-container">
    <div class="post-search">
      <div class="icon-wrapper">
        <img class='logining-icon' v-bind:src=getImg(cookiee.icon) alt="" v-if="cookiee">
      </div>
      <div class="post-header">
        <router-link to='/community/all' class="all-post" exact>所有</router-link>
            <router-link to='/community/my' class="my-post" exact>我的</router-link>
      </div>
      <div class="function-container">
      <router-link to="/searcharticle" class="post-find" exact><i class="iconfont icon-search fangdajing"></i></router-link>
      <router-link to="/new" class="post-new"><i class=" iconfont icon-yijianfankui"></i></router-link>
      </div>
    </div>
    <router-view></router-view>
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

           }

         }
    },
    methods:{

        getArticle(){
            let _this = this;
            $.ajax({
              url:_this.getSever('article','get'),
              success:function (res) {
                res = JSON.parse(res);
                _this.items = res
              }
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
      }
    }
  }
</script>
