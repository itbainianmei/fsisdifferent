import Vue from 'vue'
// import echarts from 'echarts'
import Common from './util/util.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import './directive.js'
Vue.use(ElementUI)
Vue.use(Common)


import axios from 'axios'
import qs from 'qs'
Vue.prototype.$echarts = echarts
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs


import Vuex from 'vuex'
Vue.use(Vuex)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
