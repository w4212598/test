<template>
  <div class="sign-container">
    <h2 class="sign-title">成为租房客的一员</h2>
  <div class="signup-form">
    <form action="" method="post" id="signupform" @submit.prevent="submit">
      <mt-field class="sign-input" label="用户名"  placeholder="请输入用户名" v-model="username" :attr="{required:'true'}"></mt-field>
      <mt-field class="sign-input" label="邮箱"    placeholder="请输入邮箱" type="email" v-model="email" :attr="{required:'true'}"></mt-field>
      <mt-field class="sign-input" label="密码"    placeholder="请输入密码" type="password" v-model="password" :attr="{required:'true'}"></mt-field>

      <mt-radio
        class="radio"
        title="我是："
        v-model="type"
        :options="[
        {
          label: '房东',
          value: '0'
        },
        {
          label: '租客',
          value: '1'
        }

        ]">
      </mt-radio>
      <span class="icon-title">头像</span><div class="icon-preview"><span class="post-plus">+</span>
        <input type="file" name="file" class="post-icon"  accept="image/*"  multiple v-on:change="onFileChange">
      </div>
      <input type="submit" value="注册" id="submit">
      <router-link to="/userindex">
      <a href="" class="login-redirect">已有账号？赶紧登陆</a>
      </router-link>
    </form>
  </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    name:"userindex",
    mounted(){

    },
    data(){
      return{
          username:'',
          password:'',
          email:'',
          signinfo:{},
          type:'',
          image:[]

      }
    },
    methods:{
        submit(username,password,email,type){
            let _this = this;
            username=_this.username;
            password=_this.password;
            email=_this.email;
            type=_this.type;
            this.$indicator.open();
            $.ajax({
              url:_this.getSever('user','sign'),
              method:'post',

              data:{
                  'username':username,
                  'password':password,
                  'email':email,
                  'type':type,
                  'image':_this.image
              },
              error:function () {
                _this.$indicator.close();
                _this.$toast({
                  message:'网络连接失败！',
                  duration: 1500,
                  iconClass: 'icon iconfont icon-shibai'
                })
              },

            })
              .then(function (res) {
                res=JSON.parse(res);
                _this.signinfo = res;


            })
              .then(function () {
              _this.$indicator.close();
              if(_this.signinfo.status===0) {

                  _this.$toast({
                    message: "注册成功" ,
                    duration: 1500,
                    iconClass: 'icon iconfont  icon-chenggong'
                  });
                  setTimeout(function () {
                  _this.$router.push({path: '/userindex'})
                },100);


              } else if(_this.signinfo.status===1){
                _this.$toast({
                  message: "用户名已存在",
                  duration: 3000,
                  iconClass: 'icon iconfont icon-shibai'
                })
              } else if(_this.signinfo.status===2){
                  _this.$toast({
                    message:'email已存在',
                    duration: 1500,
                    iconClass: 'icon iconfont icon-shibai'
                  })
              }
            })

            },

        getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      },
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImage(files[0]);
        },
        createImage(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let vm = this;
        let URL = window.URL || window.webkitURL;
        // 通过 file 生成目标 url
        let imgURL = URL.createObjectURL(file);
        // 用这个 URL 产生一个 <img> 将其显示出来
          $('.icon-preview').append($('<img/>').attr('src', imgURL));
          reader.onload = (e) => {
          let canvas=document.createElement("canvas");
          let ctx=canvas.getContext("2d");
          let image=new Image();
          image.src=e.target.result;
          image.onload=function(){
            let cw=image.width;
            let ch=image.height;
            let w=image.width;
            let h=image.height;
            canvas.width=w;
            canvas.height=h;
            if(cw>300&&cw>ch){
              w=660;
              h=(440*ch)/cw;
              canvas.width=w;
              canvas.height=h;
            }
            if(ch>300&&ch>cw){
              h=440;
              w=(660*cw)/ch;
              canvas.width=w;
              canvas.height=h;

            }
            ctx.drawImage(image,0,0,w,h);
            vm.image = canvas.toDataURL("image/jpeg",0.7);
          };

        };

      },



        }




  }
</script>
