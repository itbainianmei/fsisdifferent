import Vue from 'vue'
import echarts from 'echarts'
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
Vue.prototype.$echarts = echarts 
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios

// 公共路径 云上 url地址
// axios.defaults.baseURL = 'http://47.104.99.228:8080/BusinessSys';
// 公共路径 wzh url地址
// axios.defaults.baseURL = 'http://172.19.41.214:8080/BusinessSys-maven';
// axios.defaults.baseURL = 'http://10.151.30.148:8080/BusinessSys';
// axios.defaults.baseURL = 'http://172.19.40.127:8080/BusinessSys';
// axios.defaults.baseURL = getContextPath();
// axios.defaults.baseURL = 'http://10.151.30.148:8888/BusinessSys-test'; 
// axios.defaults.baseURL = 'http://dev.fengshen.tcredit.com/BusinessSys';
// axios.defaults.baseURL = 'http://172.19.162.41:8080/BusinessSys';
// axios.defaults.baseURL = 'http://172.19.163.82:8080/BusinessSys';
axios.defaults.baseURL = 'http://test.fengshen.tcredit.com/BusinessSys';
// wzh服务器公共下载地址
// Vue.prototype.uploadBaseUrl = 'http://172.19.41.214:8080/BusinessSys-maven';
// // 云上公共下载地址l
// Vue.prototype.uploadBaseUrl = 'http://47.104.99.228:8080/BusinessSys';
// 服务器公共下载地址
// Vue.prototype.uploadBaseUrl = getContextPath();
Vue.prototype.uploadBaseUrl = 'http://dev.fengshen.tcredit.com/BusinessSys';
// Vue.prototype.uploadBaseUrl = 'http://172.19.40.127:8080/BusinessSys';
// Vue.prototype.uploadBaseUrl = 'http://10.151.30.148:8888/BusinessSys-test'; 
// Vue.prototype.uploadBaseUrl = 'http://172.19.162.41:8080/BusinessSys';
// axios.defaults.baseURL = 'http://172.19.163.82:8080/BusinessSys';


// 打印的云上公共地址
// Vue.prototype.distUrl = 'http://47.104.99.228:8080';
// 打印的wzh公共地址
// Vue.prototype.distUrl = 'http://172.19.41.214:8080';
// Vue.prototype.distUrl = 'http://10.151.30.148:8888';






// axios.defaults.baseURL = 'http://192.168.1.124:8080/BusinessSys';
// Vue.prototype.uploadBaseUrl = 'http://192.168.1.124:8080/BusinessSys';
// Vue.prototype.distUrl = 'http://192.168.1.120:8080';

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
