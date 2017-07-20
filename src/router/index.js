import Vue from 'vue'
import Router from 'vue-router'
import orderlist from '../components/orderlist/OrderList.vue'
import home from '../components/home/Home.vue'
import signup from '../components/userindex/SignUp.vue'
import housedetail from '../components/housedetail/HouseDetail.vue'
import searchindex from '../components/search/SearchIndex.vue'
import room from '../components/housedetail/Room.vue'
import userindex from '../components/userindex/UserIndex.vue'
import community from '../components/community/index.vue'
import articledetail from '../components/community/ArticleDetail.vue'
import newarticle from '../components/community/NewArticle.vue'
import allarticle from '../components/community/AllArticle.vue'
import myarticle from '../components/community/MyArticle.vue'
import articlesearch from '../components/community/ArticleSearch.vue'
import userinfo from '../components/userindex/UserInfo.vue'
import password from '../components/userindex/password.vue'
Vue.use(Router);
//过度效果
Router.prototype.goBack = function () {
  this.isBack = true;
  window.history.go(-1)
};
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'home'
    },
    {
      path:'/home',
      component:home
    },
    {
      path:'/orderlist',
      component:orderlist
    },
    {
      path:'/signup',
      component:signup
    },
    {
      path:'/housedetail/:aid',
      component:housedetail,
      children:[{
        path:':id',
        component:room,
      }]
    },
    {
      path:'/search',
      component:searchindex,
    },
    {
      path:'/userindex',
      component:userindex,

    },
    {
      path:'/community',
      component:community,
      redirect:'community/all',
      children:[{
        path:'all',
        component:allarticle,
      },
        {
          path:'my',
          component:myarticle,
        },

      ]
    },
    {
      path:'/articledetail/:id',
      component:articledetail
    },
    {
      path:'/searcharticle',
      component:articlesearch
    },
    {
      path:'/new',
      component:newarticle
    },
    {
      path:'/userinfo',
      component:userinfo,
    },
    {
      path:'/password',
      component:password,
    }


  ]
})
