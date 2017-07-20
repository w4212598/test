// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Mint from 'mint-ui';
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css';
import VueCookie from 'vue-cookie'
import webConfig from './assets/config/webconfig';
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'c847114b6bd702756890d1eae1d9f2cb',
  plugin: ['Scale', 'OverView', 'ToolBar', 'MapType','Geolocation']
});

Vue.use(Mint);
webConfig(Vue);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components:{ App},
  methods: {

  }

});
