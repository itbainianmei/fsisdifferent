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

if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/BusinessSys';  //本地
} else {
  axios.defaults.baseURL = getContextPath();
}
// axios.defaults.baseURL = getContextPath();
Vue.prototype.uploadBaseUrl =  getContextPath(); //天创的上传下载  双方应该一致！！
Vue.prototype.url = getContextPath();   // 易宝的上传下载   双方应该一致！！！


Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)
import store from './store/index.js'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import VueCookie  from 'vue-cookie'
Vue.use(VueCookie)

axios.interceptors.response.use(
  res => {
    const data = res.data;
    if (data && data.access) {
      switch (data.access) {
        case 1:
          Vue.prototype.$alert(data.errMsg || '操作错误', '系统提示', {
            confirmButtonText: '确定'
          });
          return;
        case 302:
            router.replace({
                path: '/',
                query: {redirect: router.currentRoute.fullPath}
            })
            // window.location.reload()
            return;
      }
    } else {
      return res;
    }
  },
  error => {
    console.log('error', error); //for debug
    Vue.prototype.$message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

//路由钩子
router.beforeEach((to, from, next) => {
  if (to.name == 'login' || to.name == 'index') {
    next();
  } else {
    if(!sessionStorage.getItem('testName')) {
      axios.post("/SysUserManageController/getInfoById")
        .then(res => {
          sessionStorage.setItem('testName', res.data.data.userName)
          localStorage.setItem('USERID', res.data.data.id);
          localStorage.setItem("SID", res.data.data.sessionId);
        })
    }
    axios.post('/getUrlMapArray').then(res => {
      if (res.data.status == 1) {
        const sourceMenuArray = (res.data.data && res.data.data.urlMapArray.length) ? res.data.data.urlMapArray : [];
        // 获取按钮权限的id数组
        const arrLevel = [];// 按钮级别的权限id数组
        const asidePermissionIdList = [];// 一二级菜单的权限id数组
        for (let i = 0; i < sourceMenuArray.length; i++) {
          asidePermissionIdList.push(sourceMenuArray[i].id);
          for (let j = 0; j < sourceMenuArray[i].list.length; j++) {
            asidePermissionIdList.push(sourceMenuArray[i].list[j].id);
            for (let k = 0; k < sourceMenuArray[i].list[j].list.length; k++) {
              if (sourceMenuArray[i].list[j].list[k].level === 3) {
                arrLevel.push(sourceMenuArray[i].list[j].list[k].id);
              }
              for (let l = 0;l < sourceMenuArray[i].list[j].list[k].list.length;l++) {
                if (sourceMenuArray[i].list[j].list[k].list[l].level === 4) {
                  arrLevel.push(sourceMenuArray[i].list[j].list[k].list[l].id);
                }
              }
            }
          }
        }
        localStorage.setItem("ARRLEVEL", JSON.stringify(arrLevel));
        localStorage.setItem("asidePermissionIdList", JSON.stringify(asidePermissionIdList));
        next();
      }
    }).catch(error => {
      Vue.prototype.$message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
    });
  }
});

// 将page注册成为全局的组件
import Page from './components/Pagination/index.vue'
Vue.component('Page', Page)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
