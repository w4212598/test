<template>
    <footer id="footer">
      <router-link v-bind:to="link.to"
                    v-for="(link,index) in footers"
                   :key="index"
                   class="footer-item"
                   exact


      >
        <div class="icon">
          <i v-bind:class="link.cssIconClass"></i>
        </div>
        <div class="title" style="font-size:0.8rem">
          {{link.name}}
        </div>
      </router-link>
    </footer>
</template>

<script>
  import $ from "jquery"
// 首页默认为绿色


  export default{
    name: 'footer',
    data(){
      return {
        footers: [
          {
            name:'租房',
            cssIconClass:'icon iconfont icon-shouye',
            to:'/home'
          },
          {
            name:'订单',
            cssIconClass:'icon iconfont icon-dingdan',
            to:'/orderlist'
          },
          {
            name:'讨论',
            cssIconClass:'icon iconfont icon-shequ4',
            to:'/community/all'
          },
          {
            name:'用户',
            cssIconClass:'icon iconfont icon-wode',
            to:'/userindex'
          },


        ]
      }
    },
    method:{

        changeColor(){

        }
    }
  }
  $('.footer-item').click(function () {
    $('.footer-item').css('Color','black');
  });

</script>
