<template>
  <div>
  <div v-if="cookiee" class="newarticle-container">
  <div class="newarticle-title">
    <span class="article-back"><i class="iconfont icon-fanhui fanhui" v-on:click="BackTo"></i></span>
    <span>发表新帖</span>
    <span class="newarticle-post" v-on:click="postNew">
    发布
  </span>
  </div>
  <div class='newarticle-content'>
    <input type="text" name="title" class="title" placeholder="请输入帖子标题" v-model="title" required>
    <textarea  name="content" class="content" placeholder="请输入帖子内容" v-model="content" required></textarea>
    <div class="img-preview"><span class="post-plus">+</span>
    <input type="file" name="file" class="post-img"  accept="image/*" multiple v-on:change="onFileChange" capture="camera">
    </div>

  </div>
  </div>
  <div class='no-login' v-if="!cookiee">
    <div class="newarticle-title">
      <span class="article-back"><i class="iconfont icon-fanhui fanhui" v-on:click="BackTo"></i></span>
      <span>发表新帖</span>
      <span class="newarticle-post" v-on:click="postNew">
    发布
  </span>
    </div>
    登陆后才能发帖哦</div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
      name:'NewArticle',
      beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getcookie()
      })
    },
      data(){
          return{
            cookiee:{},
            author:'',
            title:'',
            content:'',
          Message:{

          },
            image: [],

        }
      },
      methods: {
        postNew(){
          let _this = this;
          if(_this.cookiee==null){
            _this.$toast({
              message: "请登录后发帖！",
              duration: 1500,
            });
            return false
          }
          if(_this.title==''){
            _this.$toast({
              message:'标题不能为空！',
              duration: 1500,
            });
            return false
          }else if(_this.content==''){
            _this.$toast({
              message:'内容不能为空！',
              duration: 1500,
            });
            return false
          }
          this.$indicator.open();
          $.ajax({
            url: _this.getSever('article', 'new') ,
            method: 'post',
            data: {
              'author': _this.cookiee.username,
              'title': _this.title,
              'content': _this.content,
              'image':_this.image,
              'icon':_this.cookiee.icon,
              'type':_this.cookiee.type,

            },
            error:function () {
              _this.$indicator.close();
              _this.$toast({
                message:'网络连接失败！',
                duration: 1500,
                position:'bottom'
              })
            },

          }).then(function (res) {
            res = JSON.parse(res);
            _this.Message = res;


          })
            .then(function () {
              _this.$indicator.close();
              if (_this.Message.status === 1) {
                _this.$toast({
                  message: "发表成功",
                  duration: 1500,
                  iconClass: 'icon iconfont  icon-chenggong'
                });

                setTimeout(function () {
                  _this.$router.push({path: '/community'})
                },1000);
              }
            })
        },
        getSever(controller, action){
          return this.webConfig.getAjaxPath(controller, action)
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
          var URL = window.URL || window.webkitURL;
          // 通过 file 生成目标 url
          var imgURL = URL.createObjectURL(file);
          // 用这个 URL 产生一个 <img> 将其显示出来
          $('.img-preview').append($('<img/>').attr('src', imgURL));
          reader.onload = (e) => {
            var canvas=document.createElement("canvas");
            var ctx=canvas.getContext("2d");
            var image=new Image();
            image.src=e.target.result;
            image.onload=function(){
              var cw=image.width;
              var ch=image.height;
              var w=image.width;
              var h=image.height;
              canvas.width=w;
              canvas.height=h;
              if(cw>300){
                w=680;
                h=530;
                canvas.width=w;
                canvas.height=h;
              }
//              if(ch>300&&ch>cw){
//                h=530;
//                w=1024;
//                canvas.width=w;
//                canvas.height=h;
//
//              }
              ctx.drawImage(image,0,0,w,h);
              vm.image = canvas.toDataURL("image/jpeg",0.8);
            };

          };

        },
        BackTo(){
          this.$router.push({path: '/community'})
        }
      }
  }
</script>
