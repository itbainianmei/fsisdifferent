import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const LeftSide = resolve => {
  import("@/components/leftSide/leftSide").then(module => {
    resolve(module);
  })
}
const MainContent = resolve => {
  import("@/components/mainContent/mainContent").then(module => {
    resolve(module);
  });
}
const Manager = resolve => {
  import("@/components/manager/manager").then(module => {
    resolve(module);
  });
}
const DownloadPage0 = resolve => {
  import("@/components/downloadpage/downloadpage0").then(module => {
    resolve(module);
  });
}
const DownloadPage1 = resolve => {
  import("@/components/downloadpage/downloadpage1").then(module => {
    resolve(module);
  });
}
const DownloadPage2 = resolve => {
  import("@/components/downloadpage/downloadpage2").then(module => {
    resolve(module);
  });
}
const DownloadPage3 = resolve => {
  import("@/components/downloadpage/downloadpage3").then(module => {
    resolve(module);
  });
}
const DownloadPage4 = resolve => {
  import("@/components/downloadpage/downloadpage4").then(module => {
    resolve(module);
  });
}
const DownloadPage5 = resolve => {
  import("@/components/downloadpage/downloadpage5").then(module => {
    resolve(module);
  });
}

/*登录*/
import Login from "@/components/login/login.vue"

/*商户评级管理*/
import CustomerMgt from '@/components/ratingMgt/CustomerMgt.vue'
/*销售评级管理*/
import SalesRatingMgt from "@/components/ratingMgt/SalesRatingMgt.vue"
/*商户风险管理*/
import MerchantsRiskMgt from "@/components/merchantsRiskMgt/merchantsRiskMgt.vue"
/*系统配置管理*/
import SysConfigMgt from "@/components/systemConfiguration/systemConfiguration.vue"
/*系统用户管理*/
import SystemUsers from "@/components/systemUsers/systemUsers"
/*系统角色管理*/
import SystemRole from "@/components/systemRole/systemRole"
/*线上机构管理*/
import SystemOnline from "@/components/systemOnline/systemOnline"
/*线下机构管理*/
import SystemOffline from "@/components/systemOffline/systemOffline"
/*风险等级设置*/
import SystemRisklevel from "@/components/systemRisklevel/systemRisklevel"
/*日志管理*/
import SystemLog from "@/components/systemLog/systemLog"
/*日志详情*/
import LogDetails from "@/components/logDetails/logDetails"
/*线上核查单*/
import OnlineCheckMgt from "@/components/checkListMgt/OnlineMgt.vue"
/*线下核查单*/
import OfflineMgt from "@/components/checkListMgt/OfflineMgt.vue"
/*解冻提示配置*/
import ThawProConfig from "@/components/checkListMgt/ThawPromotConfig.vue"
/*商户核查单管理平台*/
import CusChecklistMgt from "@/components/checkListMgt/CusChecklistMgt.vue"
import CusChecklistImmuneMgt from "@/components/checkListMgt/CusChecklistImmuneMgt.vue"
/*外呼商户配置管理*/
import OutboundCusConfigMgt from "@/components/checkListMgt/OutboundCusConfigMgt.vue"
/*管控审批清单*/
import ManageControlApprove from "@/components/checkListMgt/ManageControlApprove.vue"
/*当天未处理报警*/
import Alarm from "@/components/checkListMgt/UntrtatedAlarm.vue"
/*案件查询*/
import CaseSearch from "@/components/caseCenter/CaseSearch.vue"
import MerchantCaseQuery from "@/components/caseCenter/MerchantCaseQuery.vue"
/*黑名单*/
import BlackList from "@/components/rosterMgt/BlackList.vue"
/*白名单*/
import WhiteList from "@/components/rosterMgt/WhiteList.vue"
/*灰名单*/
import GrayList from "@/components/rosterMgt/GrayList.vue"
/*名单默认值配置表*/
import DefaultList from "@/components/rosterMgt/DefaultList.vue"


// 关联查询 开始
import EposQuery from "@/components/linkQuery/EposQuery.vue" //epos
import EposQueryDetail from "@/components/linkQuery/EposQueryDetail.vue" //epos
import noneEposQuery from "@/components/linkQuery/noneEposQuery.vue" //非epos
import noneEposQueryDetail from "@/components/linkQuery/noneEposQueryDetail.vue" //非epos
import offlIineTransactionQuery from "@/components/linkQuery/offlIineTransactionQuery.vue" //线下交易查询
import outMoneyTransactionQuery from "@/components/linkQuery/outMoneyTransactionQuery.vue"//出款交易查询
import highRiskTransactionQuery from "@/components/linkQuery/highRiskTransactionQuery.vue"//高危交易查询
import highRiskTransactionQueryDetail from "@/components/linkQuery/highRiskTransactionQueryDetail.vue"//高危交易查询
// 关联查询 结束

// 报表中心 开始
import ruleStatistics from "@/components/reportCenter/ruleStatistics.vue"   //规则有效性统计
import ruleTrendStatistics from "@/components/reportCenter/ruleTrendStatistics.vue"   //规则有效性趋势统计
import merchantFraudComplaintTransactionStatistics from "@/components/reportCenter/merchantFraudComplaintTransactionStatistics.vue"   //商户欺诈投诉交易统计表
import merchantTypeFraudComplaintTransactionStatistics from "@/components/reportCenter/merchantTypeFraudComplaintTransactionStatistics.vue"   //商户类型欺诈投诉交易统计表
import riskinterceptStatistics from "@/components/reportCenter/riskinterceptStatistics.vue"   //风险拦截数据统计
import overcallWorkEfficiencyCoveragevue from "@/components/reportCenter/overcallWorkEfficiencyCoveragevue.vue"   //外呼工作效率统计表
import TradeAndFraudComplaints from "@/components/reportCenter/TradeAndFraudComplaints.vue"   //交易及欺诈投诉
import overcallcoverage from "@/components/reportCenter/overcallcoverage.vue"   //外呼覆盖率统计
import ruleRelativityStatistics from "@/components/reportCenter/ruleRelativityStatistics.vue"   //规则相关性统计报表
import employeeRuleEffectivenessStatics from "@/components/reportCenter/employeeRuleEffectivenessStatics.vue"   //员工规则有效性趋势统计
import branchAuditSheetHandling from "@/components/reportCenter/branchAuditSheetHandling.vue"   //分公司核查单处理情况

// 报表中心 结束
import realTimeRiskMap from "@/components/monitoringCenter/realTimeRiskMap.vue"   //实时地图
import RiskHistoryMap from "@/components/monitoringCenter/RiskHistoryMap.vue"   //历史风险地图
// 监控中心开始
// 监控中心结束
/*个人中心*/
import Personal from "@/components/personal/Personal.vue"
/*系统用户下载页*/
import downloadPage0 from "@/components/downloadpage/downloadpage0.vue"
// 评级详情
import DetailLevel from '@/components/ratingMgt/DetailLevel.vue'
// 线上核查单详情
import OnlineMgtDetails from '@/components/checkListMgt/OnlineMgtDetails.vue'
// 生成案件
import newCase from '@/components/caseCenter/newCase.vue'
// 线下核查单详情
import OfflineMgtDetails from '@/components/checkListMgt/OfflineMgtDetails.vue'
// 线下核查单 - 线下核查单详情 - 快照查看
import snapshotView from '@/components/checkListMgt/snapshotView.vue'
// 线下核查单 - 创建线下核查单
import NewOfflineMgt from '@/components/checkListMgt/NewOfflineMgt.vue'
// 线下核查单 - 商户风险管理
import merchantRiskManagement from '@/components/checkListMgt/merchantRiskManagement.vue'
// 案件中心 - 案件详情
import caseMgt from '@/components/caseCenter/caseMgt.vue'
// 线下核查单 - 处理线下核查单
import Dealwithoffline from '@/components/checkListMgt/DealwithOffline.vue'

// 侧边栏对应的路由，需要在login.vue中根据权限去渲染侧边栏
const asideRouterMap = [
  {
    id: 1,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:"评级管理",
    children:[
      {path:'/manager/CustomerMgt',component:CustomerMgt,name:"商户评级管理",meta:{keepAlive: true},act:false,id: 9,hidden: true},
      // {path:'/manager/SalesRatingMgt',component:SalesRatingMgt,name:"销售评级管理",meta:{keepAlive: true},act:false,id: 340,hidden: true}
    ],
    iconCls:"ratingMgt"
  },
  {
    id:2,
    hidden: false,
    path:'/manager',
    component:Manager,
    name:'核查单管理',
    iconCls:"checkListIcon",
    children:[
      {path:'/manager/onlineMgt',component:OnlineCheckMgt,name:'线上核查单管理',meta:['线上核查单管理'],act:false,id: 10, hidden: true},
      {path:'/manager/offlineMgt',component:OfflineMgt,name:'线下核查单管理',meta:['线下核查单管理'],act:false,id: 12,hidden: true},
      {path:'/manager/config',component:ThawProConfig,name:'解冻提示配置',meta:['解冻提示配置'],act:false,id: 13,hidden: true},
      {path:'/manager/cusCheckMgt',component:CusChecklistMgt,name:'商户核查单管理平台',meta:['商户核查单管理平台'],act:false,id: 14,hidden: true},
      {path:'/manager/CusChecklistImmuneMgt',component:CusChecklistImmuneMgt,name:'商户核查单免疫管理',meta:['商户核查单免疫管理'],act:false,id: 15,hidden: true},
      {path:'/manager/outCusMgt',component:OutboundCusConfigMgt,name:'外呼商户配置平台',meta:['外呼商户配置平台'],act:false,id: 16,hidden: true},
      {path:'/manager/mgtControl',component:ManageControlApprove,name:'管控审批清单',meta:['管控审批清单'],act:false,id: 17,hidden: true},
      {path:'/manager/alarm',component:Alarm,name:'当天未处理报警',meta:['当天未处理报警'],act:false,id: 18,hidden: true},
    ]
  },
  {
    id:3,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:"案件中心",
    iconCls:"caseCenterIcon",
    children:[
      {path:'/manager/caseSearch',component:CaseSearch,name:"案件查询",meta:['案件查询'],act:false, id: 19,hidden: true},
      {path:'/manager/MerchantCaseQuery',component:MerchantCaseQuery,name:"商户案件查询",meta:['商户案件查询'],act:false, id: 205,hidden: true}
    ]
  },
  {
    id: 4,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:'名单管理',
    iconCls:"roster",
    children:[
      {path:'/manager/BlackList',component:BlackList,name:'黑名单',meta:{keepAlive: true},act:false,id: 22,hidden: true},
      {path:'/manager/GrayList',component:GrayList,name:'灰名单',meta:{keepAlive: true},act:false,id: 23,hidden: true},
      {path:'/manager/WhiteList',component:WhiteList,name:'白名单',meta:{keepAlive: true},act:false,id: 24,hidden: true},
      {path:'/manager/DefaultList',component:DefaultList,name:'名单默认值配置表',meta:{keepAlive: true},act:false,id: 334,hidden: true},
    ]
  },
  {
    id: 5,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:"关联查询",
    iconCls:"linkedQuery",
    children:[
      {path:'/manager/noneEposQuery',component:noneEposQuery,name:'非Epos交易查询',meta:['非Epos交易查询'],act:false,id: 25,hidden:true},
      // {id:267,path:'/manager/noneEposQueryDetail/:id',component:noneEposQueryDetail,name:'非Epos交易查询详情',meta:['非Epos交易查询详情'],act:false,hidden:true},
      {id:26,path:'/manager/EposQuery',component:EposQuery ,name:'Epos交易查询',meta:['Epos交易查询'],act:false, hidden:true},
      // {id:268,path:'/manager/EposQueryDetail/:id',component:EposQueryDetail,name:'Epos交易查询详情',meta:['Epos交易查询详情'],act:false,hidden:true},
      {id:27,path:'/manager/offlIineTransactionQuery',component:offlIineTransactionQuery ,name:'线下交易查询',meta:['线下交易查询'],act:false,hidden:true},
      {id:28,path:'/manager/outMoneyTransactionQuery',component:outMoneyTransactionQuery ,name:'出款交易查询',meta:['出款交易查询'],act:false,hidden:true},
      {id:29,path:'/manager/highRiskTransactionQuery',component:highRiskTransactionQuery ,name:'高危交易查询',meta:['高危交易查询'],act:false,hidden:true}
      // {id:268,path:'/manager/highRiskTransactionQueryDetail/:id',component:highRiskTransactionQueryDetail,name:'高危交易查询详情',meta:['高危交易查询详情'],act:false,hidden:true}
    ]
  },
  {
    id:6,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:"报表中心",
    iconCls:"reportCenter",
    children:[
      {id:30,path:'/manager/ruleStatistics',component:ruleStatistics,name:'规则有效性统计',meta:['规则有效性统计'],act:false,hidden: true,},
      {id:31,path:'/manager/ruleTrendStatistics',component:ruleTrendStatistics,name:'规则有效性趋势统计',meta:['规则有效性趋势统计'],act:false,hidden: true,},
      {id:32,path:'/manager/merchantFraudComplaintTransactionStatistics',component:merchantFraudComplaintTransactionStatistics,name:'商户欺诈投诉交易统计表',meta:['商户欺诈投诉交易统计表'],act:false,hidden: true,},
      {id:33,path:'/manager/merchantTypeFraudComplaintTransactionStatistics',component:merchantTypeFraudComplaintTransactionStatistics,name:'商户类型欺诈投诉交易统计表',meta:['商户类型欺诈投诉交易统计表'],act:false,hidden: true,},
      {id:34,path:'/manager/riskinterceptStatistics',component:riskinterceptStatistics,name:'风险拦截数据统计',meta:['风险拦截数据统计'],act:false,hidden: true,},
      {id:35,path:'/manager/overcallWorkEfficiencyCoveragevue',component:overcallWorkEfficiencyCoveragevue,name:'外呼工作效率统计表',meta:['外呼工作效率统计表'],act:false,hidden: true,},
      {id:36,path:'/manager/TradeAndFraudComplaints',component:TradeAndFraudComplaints,name:'交易及欺诈投诉统计',meta:['交易及欺诈投诉统计'],act:false,hidden: true,},
      {id:37,path:'/manager/ruleRelativityStatistics',component:ruleRelativityStatistics,name:'规则相关性统计报表',meta:['规则相关性统计报表'],act:false,hidden: true},
      {id:38,path:'/manager/employeeRuleEffectivenessStatics',component:employeeRuleEffectivenessStatics,name:'员工规则有效性趋势统计',meta:['员工规则有效性趋势统计'],act:false,hidden: true},
      {id:39,path:'/manager/overcallcoverage',component:overcallcoverage,name:'外呼覆盖率统计',meta:['外呼覆盖率统计'],act:false,hidden: true},
      {id:40,path:'/manager/branchAuditSheetHandling',component:branchAuditSheetHandling,name:'分公司核查单处理情况',meta:['分公司核查单处理情况'],act:false,hidden: true,}
    ]
  },
  {
    id:7,
    hidden: true,
    path:'/manager',
    component:Manager,
    name:"监控中心",
    iconCls:"monitoringCenter",
    children:[
      {id:41,path:'/manager/realTimeRiskMap',component:realTimeRiskMap,name:'实时风险地图',meta:['实时风险地图'],act:false,hidden: true,},
      {id:42,path:'/manager/RiskHistoryMap',component:RiskHistoryMap,name:'历史风险地图',meta:['历史风险地图'],act:false,hidden: true,},
    ]
  },
  {
    id: 8,
    hidden: true,
    path: "/manager",
    component: Manager,
    name:'系统设置',
    iconCls:"systemSetup",
    children: [
      {
        id: 43,
        hidden: true,
        path: "/manager/systemUsers",
        component: SystemUsers,
        name:'系统用户管理',
        meta:['系统用户管理'],
        act:false
      },
      {
        id: 44,
        hidden: true,
        path: "/manager/systemRole",
        component: SystemRole,
        name:'系统角色管理',
        meta:['系统角色管理'],
        act:false
      },
      {
        id: 45,
        hidden: true,
        path: "/manager/systemOnline",
        component: SystemOnline,
        name:"线上机构管理",
        meta:['线上机构管理'],
        act:false
      },
      {
        id: 46,
        hidden: true,
        path: "/manager/systemOffline",
        component: SystemOffline,
        name:'线下机构管理',
        meta:['线下机构管理'],
        act:false
      },
      {
        id: 47,
        hidden: true,
        path: "/manager/systemRisklevel",
        component: SystemRisklevel,
        name:'风险等级设置',
        meta:['风险等级设置'],
        act:false
      },
      {
        id: 48,
        hidden: true,
        path:'/manager/SysConfigMgt',
        component:SysConfigMgt,
        name:'系统配置管理',
        meta:['系统配置管理'],
        act:false
      },
      {
        id: 49,
        hidden: true,
        path: "/manager/systemLog",
        component: SystemLog,
        name:'日志管理',
        meta:['日志管理'],
        act:false
      },
      {
        hidden: true,
        path: "/manager/logDetails",
        component: LogDetails,
        name:'日志详情',
        hidden:true
      },
      {
        hidden: true,
        path: "/manager/personal",
        component: Personal,
        name:'个人信息',
        hidden:true
      }
    ]
  }
];

export default new Router({
  routes: [
    ...asideRouterMap,
    {
      path: "",
      redirect: "/manager",
      name: 'manager',
      hidden:true
    },
    {
      path: "/login",
      name: 'login',
      component: Login,
      hidden:true
    },
    {
      path: "/downloadpage0",
      component: DownloadPage0,
      name:'下载',
      hidden:true
    },
    {
      path: "/dealwithoffline",
      component: Dealwithoffline,
      name:'处理线下核查单',
      hidden:true
    },
    {
      path: "/casemgt",
      component: caseMgt,
      name:'案件中心 - 案件详情',
      hidden:true
    },
    {
      path: "/detailLevel",
      component: DetailLevel,
      name:'查看评级详情',
      hidden:true
    },
    {
      path: "/onlineMgtDetails",
      component: OnlineMgtDetails,
      name:'查看线上核查单详情',
      hidden:true
    },
    {
      path: "/offlineMgtDetails",
      component: OfflineMgtDetails,
      name:'查看线下核查单详情',
      hidden:true
    },
    {
      path: "/noneEposQueryDetail/:id",  
      component: noneEposQueryDetail,
      name:'非Epos交易查询详情',
      hidden:true
    },
    {
      path: "/EposQueryDetail/:id", //////////////////////
      component: EposQueryDetail,
      name:'Epos交易查询详情',
      hidden:true
    },
    {
      path: "/newcase",
      component: newCase,
      name:'生成案件',
      hidden:true
    },
    {
      path: "/newOfflineMgt",
      component: NewOfflineMgt,
      name:'创建线下核查单',
      hidden:true
    },
    {
      path: "/snapshotview",
      component: snapshotView,
      name:'线下核查单详情快照',
      hidden:true
    },
    {
      path: "/merchantriskmanagement",
      component: merchantRiskManagement,
      name:'线下核查单商户风险管理',
      hidden:true
    }
  ]
});
