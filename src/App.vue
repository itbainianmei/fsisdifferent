<template>
  <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
      reload(){
          this.isRouterAlive = false;
          this.$nextTick(function(){
              this.isRouterAlive = true;
          })
      }
  }
}

</script>

<style lang="less">

.tableExpandCheckzym .el-checkbox__label{display: none;}
.list {padding:10px 20px;border:1px solid #ddd;border-radius: 4px;font-size:14px;line-height: 20px;z-index:20;background: #fff;max-height:250px;overflow: scroll;}
/*分页开始*/
 .block{margin-top:5px;width:100%;}
  .pagination{margin-left:34px;font-size:12px;color:#333333;display:inline-block;}
  .evetotal{
    margin-left: 3px; padding-left: 10px;
    background:url('./images/xxjt.png') no-repeat;
    background-position: 34px 8px; background-size:7px 5px;
    outline: none;
    -moz-appearance:none;
    -webkit-appearance:none;width:50px;height:22px;
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    font-family: PingFangSC-Regular;
    font-size: 12px;  color: #333333;
  }
  .paginationRight{float: right;}
/*分也结束*/
// common start

/* 娴忚鍣ㄩ噸缃� end */
.ver-mid{vertical-align: middle;}
.ver-top{vertical-align: top;}
.cfff{color:#fff}.cccc{color:#ccc}.c999 { color:#999}.c666 { color:#666}.c333{color:#333}.c000 {color:#000}
.b{ border:1px solid #ddd}.bl{ border-left:1px solid #ddd}.br{ border-right:1px solid #ddd}.bt{ border-top:1px solid #ddd}.bb{ border-bottom:1px solid #ddd}
.tl{text-align:left}.tr{text-align:right}.tc{text-align:center}
 .bold{font-weight:700;}
.hide {display:none!important;}
.none {display:none;}
.dis-inline{display:inline-block;}
.auto{margin:auto;}
.auto-x{margin:0 auto;}
.scroll {overflow-y:auto;-webkit-overflow-scrolling:touch;}
.w {width:100%}
.w1{width:1px}
.bgfff{background:#fff}
.bg-none{background:transparent;}
.bg-none2{color:transparent;}
.bg-fixed{position:fixed;top: 0;left: 0;right: 0;bottom: 0;background:rgba(0,0,0,0.5);overflow: auto;z-index:10;}
.fs10{font-size:10px}.fs12{font-size:12px}.fs14{font-size:14px}.fs16{font-size:16px}.fs18{font-size:18px}.fs20{font-size:20px}.fs22{font-size:22px}.fs24{font-size:24px}
.fs26{font-size:26px}.fs28{font-size:28px}.fs30{font-size:30px}.fs32{font-size:32px}.fs34{font-size:34px}.fs36{font-size:36px}.fs38{font-size:38px}.fs40{font-size:40px}
.mt10{margin-top:10px;}.mt20{margin-top:20px}.mt30{margin-top:30px}.mb10{margin-bottom:10px}.mb20{margin-bottom:20px}.mb30{margin-bottom:30px;}
.ml10{margin-left:10px;}.ml20{margin-left:20px}.ml30{margin-left:30px}.mr10{margin-right:10px}.mr20{margin-right:20px}.mr30{margin-right:30px;}
.pt10{padding-top:10px;}.pt20{padding-top:20px}.pt30{padding-top:30px}.pb10{padding-bottom:10px}.pb20{padding-bottom:20px}.pb30{padding-bottom:30px;}
.pl10{padding-left:10px}.pl20{padding-left:20px}.pl30{padding-left:30px}.pr10{padding-right:10px}.pr20{padding-right:20px}.pr30{padding-right:30px;}
.b-radius100{border-radius:50%;}
.bg-img{background-size:cover;background-position: center;background-repeat: no-repeat;}
.pa{position: absolute;}.pr{position: relative;}.fixed{position: fixed;}
.fl{float: left;}.fr{float: right;}
.clear:after{content:'';display: block;overflow: hidden;width:100%;height:0;clear:both}
.t-ell{white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;}

// common end
  .el-submenu__title,.el-submenu,.el-menu-item{color: #ffffff;font-size: 14px}
  .el-submenu__title:hover{background-color:#38e139;color: #ffffff;}
  .el-submenu:hover ,.el-menu-item:hover{background-color:#38e139;color: #ffffff;}
  .el-submenu .el-menu{background-color: #242C3C;}
.el-table--border th {
    background-color: rgb(245, 246, 250);
    color: #636363;
    border-right: 0;
    height: 50px;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgb(243, 255, 254);
}
.el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    line-height: 17px;
}
.el-tree-node__content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 32px;
    cursor: pointer;
}

.el-dialog {
    position: relative;
    /*margin: 0 auto 50px; */
    background: #F1F2F5;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    top: 0;
    left:0;
}
.el-dialog__header {
    padding: 9px 25px 0px;
    background-color: #F1F2F5;
}
.el-dialog__body {
    padding: 14px 0px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
    margin-top: 9px;
    background-color: #fff;
    margin-left: 24px;
    margin-right: 24px;
    border: 1px solid #E0E0E0;
    overflow: hidden;
}
.el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover {
    color: rgb(63, 170, 249);
}
.el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    color: #000;
    font-size: 14px;
}
.dialog-footer{
    /* background-color: #fff;
    padding: 15px 32px 18px 0px;
    margin-top: -22px;
    border: 1px solid #E0E0E0; */
    margin-left: 4px;
    margin-right: 4px;
    border-top: 0;
}
.el-button {
    border-radius: 30px;
    padding: 8px 24px;
}
.el-dialog__title {
    line-height: 29px;
    font-size: 18px;
    color: #333333;
    /* font-weight: 600; */
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 36px;
    outline: 0;
    padding: 0;
    padding-left:15px;

    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    /* width: 200px; */
}
.el-icon-arrow-up:before {
    content: "\E605";
    color: #3FAAF9;
    font-weight: 800;
}
html::-webkit-scrollbar{display: none;}

// .el-radio__label{display:none;}
#app{font-family: PingFangSC-Light, sans-serif;}

// .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{border-color:#dcdfe6;}
// .el-form-item--small .el-form-item__error{display:none;}
input[type=number]::-webkit-inner-spin-button{
      height:40px;
    width:40px;
}
input[type=number]::-webkit-outer-spin-button {
    height:40px;
    width:40px;
    margin-right: 12px;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td, .el-table__body tr.current-row>td, .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td{
    background-color:#ffffff
}
.ratingMgt{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px -1px;
    display: inline-block;
    margin-right: 10px;
}
.merchantRisk{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px -28px;
    display: inline-block;
    margin-right: 10px;
}
.checkListIcon{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px -60px;
    display: inline-block;
    margin-right: 10px;
}
.caseCenterIcon{
     background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 202px;
    display: inline-block;
    margin-right: 10px;
}
.roster{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 170px;
    display: inline-block;
    margin-right: 10px;
}
.linkedQuery{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 143px;
    display: inline-block;
    margin-right: 10px;
}
.reverseQuery{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 113px;
    display: inline-block;
    margin-right: 10px;
}
.reportCenter{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 82px;
    display: inline-block;
    margin-right: 10px;
}
.monitoringCenter{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 50px;
    display: inline-block;
    margin-right: 10px;
}
.systemSetup{
    background-image: url(./images/navImg.png);
    height: 25px;
    width: 25px;
    background-position: 0px 25px;
    display: inline-block;
    margin-right: 10px;
}
.secondMenu{
    display: inline-block;
    height: 6px;
    width: 6px;
    background-color: #8D8DA3;
}
.rightContent{
    color:white;
    display: inline-block;
    vertical-align: top;
    margin-top:20px;
    .serchbtn{
        width: 100px;
        height:36px;
        margin-bottom: 15px;
        margin-left: 10px;
        margin-left: 30%;
        display: block;
    }
}
// .el-form-item--mini .el-form-item__error{display:none}
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus{
    border-color:#dcdfe6;
}
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 17px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
._c .el-textarea__inner {
  width: 360px;
  border-radius: 10px;
}
._c .el-input__inner {
  width: 360px;
}
// .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{////////////////
//     width:10px;
//     height:10px;
//     border:1px solid #e0e0e0;
//     line-height: 10px;
//     left: 5px;
//     top: 10px;
// ｝


/* 日期修改 */
.el-date-picker{
width:230px;
}
.el-date-picker__header{
margin: 3px 20px 0px;
}
.el-date-picker .el-picker-panel__content{
width:200px;
}
.el-picker-panel__content {
margin: 0 15px;
}
.el-date-table td{padding:0;}
/* .el-date-picker__time-header{display:none} */
.el-icon-time{display:none}
// .el-input--prefix .el-input__inner{padding:0 10px;font-size:12px;}
.el-input--prefix .el-input__inner{font-size:12px;}
.el-select-dropdown__item span{font-size:12px;color:#333333;}
.el-form-item__error{margin-left:4px;}
.search-content .el-form-item__error{
    // color: #fff;
    font-size: 0;
    line-height: 0;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 0;
}
scrollbar[orient="vertical"] {
max-width: 3px !important;
}
scrollbar {
-moz-appearance: none !important;
background: #3FAAF9 !important;
}
.el-table thead{font-size:13px;color:#333333;}
.el-table--enable-row-transition .el-table__body td{font-size:12px;color:#333333;}
.el-form-item__label{font-size:13px;color:#333333;}
.el-dialog__headerbtn{display:none;}
.el-dialog__footer{
text-align: center;padding:0;background-color: #ffffff;padding:3px 0 10px 0;
border-left:12px solid #F1F2F5;border-right: 12px solid #F1F2F5;border-bottom: 20px solid #F1F2F5;padding: 20px 0px;
}
.el-dialog__header{height:40px;line-height: 40px;padding: 0;padding-left:25px;}
.el-dialog__body{margin-top:0;margin-left:12px;margin-right:12px;border:0;padding-bottom: 0;}
/* .el-button+.el-button{margin-left:50px} */
.footerDiv{width:100%;margin: 0 auto;text-align: center;}
.dialog-footer{background-color: #ffffff !important;}
.el-message-box__header{padding: 0;padding-left:14px;height:40px;line-height: 40px;background-color: #f1f2f5;}
.el-message-box__title{font-size:16px;color:#333333;line-height:inherit;}
.el-message-box__headerbtn{display:none;}
.el-message-box__content{text-align: center;padding: 0;border-left:12px solid #f1f2f5;border-right:12px solid #f1f2f5;padding-top:49px;max-height: 400px;overflow:auto;}
.el-message-box__btns{text-align: center;padding: 0;border-left:12px solid #f1f2f5;border-right:12px solid #f1f2f5;padding-top:20px;padding-bottom:20px;}
.el-message-box{padding-bottom: 0;border-bottom:20px solid #f1f2f5;}
.el-message-box__status+.el-message-box__message {
    padding-left: 36px;
    padding-right: 12px;
    margin-top: 25px;
}
.el-message-box__status.el-icon-warning {
    color: #F1F2F5;
}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar
{
width: 4px;
// height: 4px;
height: 10px;
}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-track
{
border-radius: 5px;
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: rgba(0,0,0,0.2);
}
.el-table--scrollable-x .el-table__body-wrapper::-webkit-scrollbar-thumb
{
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
border-radius: 0;
background: rgba(64,158,255,0.8);
/* background-color: #409EFF */
}
.dialogRight::-webkit-scrollbar
{
width: 4px;
height: 4px;
}
.dialogRight::-webkit-scrollbar-track
{
border-radius: 5px;
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: rgba(0,0,0,0.2);
}
.dialogRight::-webkit-scrollbar-thumb
{
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
border-radius: 0;
/* background: rgba(0,0,0,0.1); */
background: rgba(64,158,255,0.8);
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar
{
    width: 4px;
    height: 4px;
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track
{
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
.el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb
{
    box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(64,158,255,0.8);
    /* background-color: #409EFF */
}
.el-message-box__status {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    /* margin-bottom: 5px; */
    -webkit-transform: translateY(-68%);
    transform: translateY(-68%);
    font-size: 24px!important;
}
.el-message-box__status+.el-message-box__message{
    width: 100%;
    text-align: center;
    padding: 0;
}
.cj{
    background: url(./images/off1.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.dr{
    background: url(./images/import1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.pf{
    background: url(./images/off3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.cl{
    background: url(./images/off4.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sh{
    background: url(./images/off5.png) no-repeat;
    width: 39px;
    height: 28px;
}
.xz{
    background: url(./images/icon4.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc{
    background: url(./images/sc.png) no-repeat;
    width: 39px;
    height: 28px;
}
.tj{
    background: url(./images/off1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc{
    background: url(./images/sc.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc{
    background: url(./images/sc.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc{
    background: url(./images/sc.png) no-repeat;
    width: 39px;
    height: 28px;
}
//+++
.bjwgwjy{
    background: url(./images/bjwgwjy1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jrhmd{
     background: url(./images/icon1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.schmd{
     background: url(./images/schmd1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jyzjjh{
     background: url(./images/jyzjjh1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.shzjjh{
     background: url(./images/shzjjh1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jyzjzh{
     background: url(./images/jyzjzh1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.shzjzh{
     background: url(./images/shzjzh1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.qxgwjy{
     background: url(./images/qxgwjy1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.scshaj{
     background: url(./images/scshaj1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.gk{
     background: url(./images/gk1.png) no-repeat;
    width: 39px;
    height: 28px;
}
.gk:hover{
     background: url(./images/gk2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.scshaj:hover{
     background: url(./images/scshaj2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.qxgwjy:hover{
     background: url(./images/qxgwjy2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.shzjzh:hover{
     background: url(./images/shzjzh2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jyzjzh:hover{
     background: url(./images/jyzjzh2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.shzjjh:hover{
     background: url(./images/shzjjh2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jyzjjh:hover{
     background: url(./images/jyzjjh2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.schmd:hover{
     background: url(./images/schmd2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.jrhmd:hover{
     background: url(./images/icon1-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.bjwgwjy:hover{
    background: url(./images/bjwgwjy2.png) no-repeat;
    width: 39px;
    height: 28px;
}
//+++
.cj:hover{
    background: url(./images/addHover.png) no-repeat;
    width: 39px;
    height: 28px;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.dr:hover{
    background: url(./images/import_actived.png) no-repeat;
    width: 39px;
    height: 28px;
}
.pf:hover{
    background: url(./images/pfHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.cl:hover{
    background: url(./images/clHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sh:hover{
    background: url(./images/shHover.png) no-repeat;
    width: 39px;
    height: 28px;
}

.xz:hover{
    background: url(./images/icon4-2.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc:hover{
    background: url(./images/scH.png) no-repeat;
    width: 39px;
    height: 28px;
}
.tj:hover{
    background: url(./images/addHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc:hover{
    background: url(./images/scH.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sc:hover{
    background: url(./images/scH.png) no-repeat;
    width: 39px;
    height: 28px;
}
// 主体视图所需
.el-table__expanded-cell[class*=cell]{
    padding:0 !important;
}
// 日期插件图标
.el-icon-date:before{
    opacity: 0;
}
//线下核查单修改样式

.inpListShow .el-textarea__inner,.streamNoInpListShow .el-textarea__inner,.busiNumInpListShow .el-textarea__inner{
    border: none;
    resize:none
}
.tableExpandCheck .el-checkbox__label{visibility: hidden}
.tableExpandCheck .el-checkbox__input{position:relative;left:20px;}
.systemUser .el-radio__label{display: none}

// .searchBasic .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
//   border-color: red;
// }
.searchBasic .el-form-item__error {
  display:inline-block;
}
// 隐藏日期小图标
.hideTimeRightIcon .el-input__suffix{
    display:none
}
// .ruleformIdIcon  .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
//     border-color:#dcdfe6
// }

.addDialog .el-textarea__inner,.editDialog .textarea__inner{outline:none;resize:none;}
.el-input--prefix .el-input__inner{padding-left: 15px;padding-right: 15px}

.el-table th {
  background-color: #f5f6fa;
}
.el-radio__label{
    padding-left: 1px;
}
.chart-box{
    margin: 10px 0;
}
.more-head .el-table__empty-block{
    justify-content:flex-start
}
.more-head .el-table__empty-text{
   text-align: left;
   margin-left: 40px;
}
</style>
