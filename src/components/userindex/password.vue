<template>
  <div class="usersafe-container">
    <div class="header">
      <span><i class="iconfont icon-fanhui fanhuibutton" v-on:click="backto"></i>　修改密码</span>
    </div>
    <div class="reset-password">
      <form action="" @submit.prevent="reset(oldpsd,newpsd)" method="post">
      <mt-field label="旧密码" placeholder="请输入旧密码" type="password" v-model="oldpsd" :attr="{required:'true'}"></mt-field>
      <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="newpsd" :attr="{required:'true'}"></mt-field>
      <div class="reset-button">
        <input type="submit" value="修改并提交" id="reset">
      </div>
      </form>
    </div>
    </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    mounted(){
      this.getcookie()
    },
    data() {
      return {
        cookiee:{},
        oldpsd:'',
        newpsd:'',
        info:{}
      };
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
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      },
      backto(){
        this.$router.push({path:'/userinfo'})
      },
      linkto(){
        this.$router.push({path:'/password'})
      },
      reset(oldpsd,newpsd,username){
          let _this = this;
           oldpsd = this.oldpsd;
           newpsd = this.newpsd;
           username = this.cookiee.username;
            _this.$indicator.open();

          $.ajax({
            url:_this.getSever('user','reset'),
            method:'post',
            data:{
              'oldpsd':oldpsd,
              'newpsd':newpsd,
              'username':username,
          },
            error:function () {
              _this.$indicator.close();
              _this.$toast({
                message:'网络连接失败！',
                duration: 1500,
                iconClass: 'icon iconfont icon-shibai'
              })
            },

          }).then(function (res) {
            res=JSON.parse(res);
            _this.info = res;
          }).then(function () {
              _this.$indicator.close();
              if(_this.info.status===0) {
                _this.$toast({
                  message: '您的新密码为:'+_this.info.password,
                  duration: 5000,
                  iconClass: 'icon iconfont  icon-chenggong'
                });
                setTimeout(function () {
                  _this.$router.push({path: '/userindex'})
                },100);


              } else if(_this.info.status===1){
                _this.$toast({
                  message: "旧密码不正确！",
                  duration: 3000,
                  iconClass: 'icon iconfont icon-shibai'
                })
              }
            })
      }
    }
  };
</script>
