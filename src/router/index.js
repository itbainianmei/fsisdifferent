import Vue from 'vue'
import Router from 'vue-router'
 /*商户核查单管理平台*/
 import CusChecklistMgt from "@/components/checkListMgt/CusChecklistMgt.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: 'CusChecklistMgt',
      component: CusChecklistMgt
    }
  ]
});
