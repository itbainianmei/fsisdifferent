import Vue from 'vue'
// import echarts from 'echarts'
import Common from './util/util.js'
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import App from './App'
import router from './router'
import './directive.js'

Vue.use(ElementUI)
Vue.use(Common)

function getContextPath(){ 
 var pathName = document.location.pathname; 
 var index = pathName.substr(1).indexOf("/"); 
 var result = pathName.substr(0,index+1); 
 return result;
}



import axios from 'axios'
import qs from 'qs'
Vue.prototype.$echarts = echarts 
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

// 公共路径 云上 url地址
// axios.defaults.baseURL = 'http://47.104.99.228:8080/BusinessSys';
// 公共路径 wzh url地址

// axios.defaults.baseURL = 'http://dev.fengshen.tcredit.com/BusinessSys';
// axios.defaults.baseURL = 'http://172.19.164.238:8080/BusinessSys'; //杜聪
// axios.defaults.baseURL = 'http://172.19.41.177:8080/BusinessSys'; //刘杨涛
// axios.defaults.baseURL = 'http://172.18.162.18:8080/BusinessSys'; //文杰
// axios.defaults.baseURL = 'http://172.18.162.84:8066/BusinessSys';  //谷泽霖
axios.defaults.baseURL = 'http://10.151.30.110:8066/BusinessSys';  //服务器
// axios.defaults.baseURL = 'http://10.151.30.110:8076/BusinessSys';  //服务器2
// Vue.prototype.uploadBaseUrl = getContextPath();

Vue.prototype.uploadBaseUrl = 'http://dev.fengshen.tcredit.com/BusinessSys';  //天创的上传下载  双方应该一致！！
Vue.prototype.url = 'http://10.151.30.110:8066/BusinessSys'   // 易宝的上传下载   双方应该一致！！！ 



Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/index.js'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import VueCookie  from 'vue-cookie'
Vue.use(VueCookie)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
