<template>
  <div>
  <div class="login-container" v-if="!cookiee">
    <h2 class="sign-title">用户登陆</h2>
    <div class="login-form">
      <form action="" method="post" id="loginform" @submit.prevent="login">
        <mt-field class="login-input" label="用户名"  placeholder="请输入用户名" v-model="username" :attr="{}"></mt-field>
        <mt-field class="login-input" label="密码"    placeholder="请输入密码" type="password" v-model="password" :attr="{}"></mt-field>
        <span class="auto-login">两天内免登录</span>
        <input type="submit" value="登录" id="login-button" >
        <router-link to="/signup">
        <a href="http://localhost:8080/UserIndex.vue#/login" class="login-redirect">还没有账户？点击注册</a>
        </router-link>
      </form>
    </div>

  </div>
  <div class="userinfo-container" v-if="cookiee">
    <div class="userinfo-title">用户</div>
    <div class="userinfor-header" v-on:click="userinfo">
      <div class="usericon-container">
        <div class="user-icon" v-if="!cookiee.icon"></div>
        <img v-bind:src=getImg(cookiee.icon) alt="" v-if="cookiee.icon" class="user-icon" >
      </div>
      <div class="user-detail">
        <span >&nbsp{{cookiee.username}}</span><br>
        <span class="user-email">&nbsp<i class="iconfont icon-conowleadermailbox"></i>&nbsp{{cookiee.email}}</span>

      </div>
    </div>
  </div >
    <div class="user-menu" v-if="cookiee">
    <div class="count-menu">
      <div class="item"><span class="count"><span class="number">0.00</span>&nbsp元</span><br>
        <span>余额</span></div>
      <div class="item" v-on:click="linktoA"><span class="count"><span class="number">{{items.length}}</span>&nbsp条</span><br>
        <span>讨论</span></div>
      <div class="item"><span class="count"><span class="number">20</span>&nbsp分</span><br>
        <span>积分</span></div>
    </div>
    <div class="selection-container">
      <div class="first-wrapper">
        <div class="items"><i class="iconfont icon-shoucang1"></i>　　<span>我的收藏</span></div>
        <div class="items"><i class="iconfont icon-youxiang"></i>　　<span>我的消息</span></div>
        <div class="items"><i class="iconfont icon-lishi"></i>　　<span>浏览历史</span></div>
      </div>
      <div class="second-wrapper">
        <div class="items"><i class="iconfont icon-gengxin3"></i>　　<span>版本更新</span></div>
        <div class="items"><i class="iconfont icon-set"></i>　　<span>应用设置</span></div>
        <div class="items" v-on:click="entercancel()"><i class="iconfont icon-tuichudenglu1"></i>　　<span>退出登录</span></div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import { MessageBox } from 'mint-ui';
  export default{
      name:'Login',
      mounted(){
        this.getcookie();
        this.getMyArticle();
      },
      data(){
          return{
            username:'',
            password:'',
            email:'',
            logininfo:{},
            type:'',
            cookiee:{},
            cookieinfo:'',
            items:[]
          }
      },
      methods:{
        login(username,password,type){
          let _this = this;
          username=_this.username;
          password=_this.password;
          type=_this.type;
          this.$indicator.open();
          $.ajax({
            url:_this.getSever('user','login'),
            method:'post',
            data:{
              'username':username,
              'password':password,
              'type':type
            },
            error:function () {
              _this.$indicator.close();
              _this.$toast({
                message:'网络连接失败!',
                duration: 1500,
                iconClass: 'icon iconfont icon-shibai'
              })
              },
              })
            .then(function (res) {
                _this.cookieinfo=JSON.stringify(res);
                res=JSON.parse(res);
                _this.logininfo = res;
            }).then(function () {
            _this.$indicator.close();
            if(_this.logininfo.status===0) {
              _this.$toast({
                message: "登录成功！" ,
                duration: 1500,
                iconClass: 'icon iconfont  icon-chenggong'
              });
              _this.$cookie.set('userinfo',_this.cookieinfo , 2);
              _this.cookiee = _this.$cookie.get('userinfo');
              _this.cookiee = JSON.parse(_this.cookiee);
              _this.cookiee = JSON.parse(_this.cookiee);
              _this.getMyArticle()

            } else if(_this.logininfo.status===1){
              _this.$toast({
                message: "用户名或密码不正确！",
                duration: 1500,
                iconClass: 'icon iconfont icon-shibai'
              })
            }
          })

        },
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
        entercancel(){
            let _this= this;
          MessageBox.confirm('确定退出登录?').then(action => {
            _this.cookiee = _this.$cookie.delete('userinfo');

          },() => {


          });
        },
        getMyArticle(){
          let _this = this;
          let username = _this.cookiee.username;
          $.ajax({
            url:_this.getSever('article','my'),
            method:'post',
            data:{
              'username':username
            },
            success:function (res) {
              res = JSON.parse(res);
              _this.items = res
            }
          })
        },
        linktoA(){
            this.$router.push({path:'/community/my'})
        },
        userinfo(){
          this.$router.push({path:'/userinfo'})
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
