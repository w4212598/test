<template>
  <div>
    <div class="new-post">
      <div class="newpost-container">
        <div class="newpost-title">
          <div class="newpost-cancel" v-on:click="exitNewPost">取消</div>
          <div class="newpost-text">发表回复</div>
          <div class="newpost-post" v-on:click="newPost">发表</div>
        </div>
        <div class="newpost-content">
          <textarea  class="posting-content" name="content" v-model="content"></textarea>
        </div>
      </div>
    </div>
  <div class="detail-post-title"><span class="search-back"><i class="iconfont icon-fanhui fanhui" v-on:click="BackTo"></i></span>帖子详情</div>
  <div class="article-container">
    <div class="theme">
      <div class="theme-author"><img class='theme-icon' v-bind:src=getImg(items.icon) alt="" v-if="items.icon">{{items.author}}　
        <span class='author-type' v-if="items.type==0">房东</span><span v-if="items.type==1" class='author-type'>租客</span>
        <span class="delete-this" v-if="cookiee.username==items.author" v-on:click="deletethis">删除</span>
      </div>
      <div class='theme-time'>{{items.createTime}}</div>
      <div class="theme-title">{{items.title}}</div>
      <div class="theme-content">{{items.content}}
      <img v-bind:src=getImg(items.img) alt="" v-if="items.img">
      </div>
      <div class="post-comment" > <i class="iconfont icon-pinglun-copy pinglun" v-on:click="showNewPost(10000)"></i> <i class="iconfont icon-dianzan1 dianzan" v-on:click="upvote"></i>　
      <span class="upvote-count" ><span v-if="count===null">{{items.upvote}}</span><span v-if="count!==null">{{count}}</span></span></div>
      <div class="clear"></div>
    </div>
    <div class="comment-container">
      <div class="comment-container-title">
        <span>　　全部回复（{{comments.length}}条）</span><span class="orderby" v-on:click="orderby">最新发表</span>
      </div>
      <div class="comment-items" v-for="(link,index) in comments">
        <div class="floor">第{{index+1}}楼</div>
        <div class="comment-author"><img class='theme-icon' v-bind:src=getImg(link.icon) alt="" v-if="link.icon">{{link.author}}
        　<span class='author-type' v-if="link.type==0">房东</span><span v-if="link.type==1" class='author-type'>租客</span>
      </div>
        <div class='comment-time'>{{link.createTime}}</div>

        <div class="comment-content">{{link.content}}</div>
        <span class="delete-comment" v-if="cookiee.username==link.author" v-on:click="deletecomment(link,link.id)">删除</span>
        <div class="post-comment" >
          <i class="iconfont icon-pinglun-copy pinglun" v-on:click="showNewPost(index+1)"></i>
          <i class="iconfont icon-dianzan1 dianzan" v-on:click="Cupvote(link,link.id)"></i>
        <span class="upvote-count"><span>{{link.cupvote}}</span>
          </span></div>
        <div class="clear"></div>

      </div>
    </div>

</div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import $ from 'jquery'
  export default{
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getThis();
        vm.getComment();
        vm.getcookie();
      })
    },
    mounted(){

    },
    data(){
      return {
        items:{},
        comments:[],
        content:'',
        cookiee:{

        },
        count:null,
        Ccount:null
      }
    },
    methods:{

      getThis(){
        let id = this.$route.params.id;
        let _this = this;
        $.ajax({
          url:_this.getSever('article','article')+'&id='+id,
          success:function (res) {
            res = JSON.parse(res);
            _this.items = res
          },
          error:function () {
            _this.$toast({
              message:'网络连接失败！',
              duration: 1500,
              position:'bottom'
            })
          },
        })
      },
      getComment(){
        let id = this.$route.params.id;
        let _this = this;
        $.ajax({
          url:_this.getSever('article','comment')+'&id='+id,
          success:function (res) {
            res = JSON.parse(res);
            _this.comments = res
          },
          error:function () {
            _this.$toast({
              message:'网络连接失败！',
              duration: 1500,
              position:'bottom'
            })
          },
        })
      },
      orderby(){
        let id = this.$route.params.id;
        let _this = this;
        $.ajax({
          url:_this.getSever('article','order')+'&id='+id,
          success:function (res) {
            res = JSON.parse(res);
            _this.comments = res
          }
        })
      },
      getSever(controller,action){
        return this.webConfig.getAjaxPath(controller,action)
      },
      showNewPost(index){
          $('.new-post').css('visibility','visible');
          $('.newpost-container').animate({height:'30vh'},300);
          if(index!==10000){
              $('.posting-content').val('回复第'+index+'楼:'+'\n')
          }
      },
      exitNewPost(){
        $('.newpost-container').animate({height:'0'},300);
        $('.new-post').css('visibility','hidden')
      },
      getImg(name){
        return this.webConfig.getImgPath('assets/img/'+name)
      },
      newPost(){
        let _this= this;
        let id = this.$route.params.id;
        if(_this.cookiee==null){
          _this.$toast({
            message: "请登录后再回复！",
            duration: 1500,
          });
          return false
        }
        if(_this.content==''){
          _this.$toast({
            message:'内容不能为空！',
            duration: 1500,
          });
          return false
        }
        this.$indicator.open();
        $.ajax({
          url: _this.getSever('article', 'post') ,
          method: 'post',
          data: {
            'author': _this.cookiee.username,
            'content': _this.content,
            'aid':id,
            'icon':_this.cookiee.icon,
            'type':_this.cookiee.type,

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

            }
          }).then(function () {
            setTimeout(function () {
              $('.newpost-container').animate({height:'0'},300);
              $('.new-post').css('visibility','hidden');
              _this.getComment()
            },2000)
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
      backTo(){
          this.$router.push({path:'/community'})
      },
      upvote(){

          let id = this.$route.params.id;
            let _this = this;
            $.ajax({
              url:_this.getSever('article', 'upvote')+'&id='+id,
              success:function (res) {
                _this.count = res
              }
            });

      },
      Cupvote(link,id){
        let _this = this;
        $.ajax({
          url:_this.getSever('article', 'cupvote')+'&id='+id,
          success:function (res) {
            link.cupvote = res;
          }
        }).then(function () {
          $('.dianzan').animate({fontSize:'1.8rem!important'},500)
        })

      },
      deletethis(){
        let id = this.$route.params.id;
        let _this = this;
        MessageBox.confirm('确定删除该文章(同时删除所有评论)?').then(action => {
          $.ajax({
            url:_this.getSever('article','delete')+'&id='+id,
            success:function (res) {
              res = JSON.parse(res);
              _this.items = res
            }
          });
          _this.$router.push({path: '/community'})
        },() => {
        });

      },
      deletecomment(link,id){

        let _this = this;
        MessageBox.confirm('确定删除该回复?').then(action => {
          $.ajax({
            url:_this.getSever('article','remove')+'&id='+id,
            success:function (res) {
              res = JSON.parse(res);
              _this.items = res
            }

          });
          _this.getThis();
          _this.getComment();


        },() => {
        });

      },
      BackTo(){
        this.$router.push({path: '/community'})
      }

    }
  }
</script>
