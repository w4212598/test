<template>
  <div class="usersafe-container">
    <div class="header">
      <span><i class="iconfont icon-fanhui fanhuibutton" v-on:click="backto"></i>　用户信息</span>
    </div>
    <div class="userinfo-list">
      <mt-cell title="头像" class="usericon-item">
        <span></span><img v-bind:src=getImg(cookiee.icon) alt="" v-if="cookiee.icon" class="userinfo-icon" >
      </mt-cell>
      <mt-cell title="用户名">
        <span>{{cookiee.username}}</span>
      </mt-cell>
      <mt-cell title="邮箱">
        <span>{{cookiee.email}}</span>
      </mt-cell>
      <mt-cell title="用户类型">
        <span  v-if="cookiee.type==0">房东</span><span v-if="cookiee.type==1" >租客</span>
      </mt-cell>
    </div>
    <div class="userinfo-bind">
      <mt-cell title="账号绑定" class="bind-title">
      </mt-cell>
      <mt-cell title="手机"  value="未绑定"><i slot='icon' class="iconfont icon-shouji-copy" style="color:deepskyblue;">&nbsp</i></mt-cell>
      <mt-cell title="微信"  value="未绑定"><i slot='icon' class="iconfont icon-wechat-copy" style="color:limegreen;">&nbsp</i></mt-cell>
      <mt-cell title="QQ"    value="未绑定"><i slot='icon' class="iconfont icon-qq2" style="color:orangered;">&nbsp</i></mt-cell>
    </div>
    <div class="userinfo-safe">
      <mt-cell title="安全设置" class="bind-title">
      </mt-cell>
      <mt-cell title="登录密码" class="reset-password" >
        <span style="color: cornflowerblue;" v-on:click="linkto">修改</span>
      </mt-cell>
      <mt-cell title="注销账号" class="reset-password">
        <span style="color: red;" v-on:click="remove" >注销</span>
      </mt-cell>


    </div>


  </div>
</template>
<script>
  import $ from 'jquery'
  import Vue from 'vue'
  import { MessageBox } from 'mint-ui';
  export default {
    mounted(){
      this.getcookie()
    },
    data() {
      return {
        cookiee:{}

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
        this.$router.push({path:'/userindex'})
      },
      linkto(){
        this.$router.push({path:'/password'})
      },
      remove(){
          let _this = this ;
          let username = this.cookiee.username;
          MessageBox.confirm('要删除该账号的所有资料吗?').then(action => {
          $.ajax({
            url:_this.getSever('user','remove')+'&username='+username,
            error:function () {
              _this.$toast({
                message:'网络连接失败！',
                duration: 1500,
                iconClass: 'icon iconfont icon-shibai'
              })
            },
          }).then(function () {
            _this.$toast({
              message: '注销成功！感谢您使用本软件',
              duration: 3000,
              iconClass: 'icon iconfont  icon-chenggong'
            });
            _this.cookiee = _this.$cookie.delete('userinfo');
            _this.$router.push({path:'/userindex'})
          })

          },() => {


        });

      }
    }
  };
</script>
