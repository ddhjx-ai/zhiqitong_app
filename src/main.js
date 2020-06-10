import Vue from 'vue'
// import FastClick from 'fastclick';
import { CellSwipe } from 'mint-ui';
import { Checklist } from 'mint-ui';

import layer from '@/plugins/layer'; //弹层  http://layer.layui.com/mobile/
import session from '@/plugins/session';
import echarts from '@/plugins/echarts';
import '@/mint-ui';
import components from '@/components';
import {
  httpGet,
  httpPost,
  httpPostJSON,
  httpImgUpload
} from './service/index'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


//md5
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
// base64
import { Base64 } from 'js-base64';
Vue.prototype.$base64 = Base64;

Vue.prototype.timer = []

// 数据请求
Vue.prototype.$get = httpGet // get请求
Vue.prototype.$post = httpPost // post请求
Vue.prototype.$ImgUpload = httpImgUpload // post请求
Vue.prototype.$postJson = httpPostJSON // postJson请求


//引入轮播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Checklist.name, Checklist);

import App from './App.vue'
import router from './router'
import store from './store'
// import '@/moment';

var VueTouch = require('vue-touch')

Vue.config.productionTip = false

// 全局过滤器，方法等
import util from './util'
Vue.use(util)
Vue.use(layer);
Vue.use(session);
Vue.use(echarts);
Vue.use(components);
Vue.use(VueTouch, { name: 'v-touch' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    // FastClick.attach(document.body);
  }, false);
}