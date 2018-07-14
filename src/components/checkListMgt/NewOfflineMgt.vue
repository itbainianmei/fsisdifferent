<template>
  <!--创建线下核查单-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>核查单管理平台</el-breadcrumb-item>
        <el-breadcrumb-item>线下核查单管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建核查单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn" v-if="createPermission">
           <el-button type="primary" round class="rightBtn" style="margin-right:10px;height:36px;line-height:0;font-size:14px;" @click='complateEstablish'>完成创建</el-button>
      </div>
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;height:auto;">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>创建基本信息</span>  
                        <div class="divContent">
                            <div class="text" style="width:24%">
                                <div class="boxOnly" style='position:relative'>
                                    <div class="labelC textborder">
                                        <span style="color:red;font-size: 15px;font-weight: 500;vertical-align:middle;">*</span>
                                        商户编号:</div>
                                    <div class="text-box" > 
                                        <el-input   v-model="busiNo" id='busiNo' @input="busiNoBlur"  @blur='busiNoBlurEvent'></el-input>
                                      
                                    </div>
                                    
                                    <div class='busiNoList'>
                                        <span class='busiNoListItem' v-for='(item,index) in busiNoListSearch' :key='index' @click='chooseBusiItem'>{{item}}</span>
                                    </div>
                                    <div class='busiNoErrorText'>
                                        <span>该商户编号不存在,请重新输入 </span>
                                    </div>
                                    
                                   
                                    
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">终端号:</div>
                                    <div class="text-box"> 
                                    <el-input   v-model="terminal"></el-input>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span style="color:red;font-size: 15px;font-weight: 500;vertical-align:middle;">*</span>
                                        风险类型:</div>
                                    <div class="text-box"> 
                                    <el-select v-model="riskType" placeholder="请选择" style="width: 100%;max-width:225px;" id='riskType' @focus="getRiskTypeList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in riskTypeList' :key='index'></el-option>
                                       
                                    </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户订单号:</div>
                                    <div class="text-box"> 
                                    <el-input   v-model="busiOrderNo"></el-input>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span style="color:red;font-size: 15px;font-weight: 500;vertical-align:middle;">*</span>
                                        来源:</div>
                                    <div class="text-box"> 
                                    <el-select v-model="scource" placeholder="请选择" style="width: 100%;max-width:225px;" id='scource' @focus="getScourceList">
                                        <el-option :label="item.sysname" :value="item.sysconid" v-for='(item,index) in scourceList' :key='index'></el-option>
                                       
                                    </el-select>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">
                                        <span style="color:red;font-size: 15px;font-weight: 500;vertical-align:middle;">*</span>
                                        风险等级:</div>
                                    <div class="text-box"> 
                                     <el-select v-model="riskLevel" placeholder="请选择" style="width: 100%;max-width:225px;" id='riskLevel' @focus="getRiskLevelList">
                                        <el-option :label="item.riskName" :value="item.riskId" v-for='(item,index) in riskLevelList' :key='index'></el-option>
                                       
                                    </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="text" style="width:50%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder" style="width:16%">备注:</div>
                                    <div class="text-box" style="width:72%"> 
                                    <el-input type="textarea" style="margin-bottom: 20px;"  :rows="6" v-model="desc">
                                    </el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>商户信息</span>  
                        <div class="divContent">
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">分公司:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.branchCompany}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">代理商编号:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.agentNum}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户状态:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantActive}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">法人姓名:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.legalName}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">联系人电话:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.legalName}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">入网时间:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.networkTime}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户编号:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantId}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">代理商名称:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.agentName}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">营业执照号:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.businessLicense}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">法人证件类型:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.legalPaperWorkType}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">联系人邮箱:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.contactEmail}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">结算帐户名:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.settleAccounts}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户名称:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantName}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">销售:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.sale}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">注册资本:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.registeredCapital}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">法人证件号码:</div>
                                    <div class="text-box"> 
                                        <span></span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户省份:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantProvince}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">结算银行卡:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.settleBankCard}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">MCC:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.mcc}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户类型:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantType}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">收款账户性质:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.receiptAccountNature}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">联系人:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.contactName}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户城市:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantCity}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">商户唯一标识:</div>
                                    <div class="text-box"> 
                                        <span>{{busiInfoData.merchantUniqueId}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <hr class="hr">
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>终端信息</span> 
                        <div class="divContent">
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">终端号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">终端状态:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">终端机型:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">安装地点:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">柜台电话:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="divHead">
                        <span class="rideus"></span>
                        <span class='rideusText'>交易信息</span> 
                        <div class="divContent">
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">交易时间:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">卡介质:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">发卡行名称:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">系统参考号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">交易类型:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">卡BIN:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">交易流水号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">交易卡号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">交易金额:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">批次号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="text"  style="width:24%">
                                <div class="boxOnly" >
                                    <div class="labelC textborder">卡类型:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">应答码:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                                <div class="boxOnly" >
                                    <div class="labelC textborder">授权号:</div>
                                    <div class="text-box"> 
                                        <span>{{ceshi}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
</template>
<script>
import qs from 'qs'
export default {
        data() {
            return {
                createPermission: true,//完成创建权限
                tableData:[],
                tableData2:[],
                ceshi:'暂无',
                options:[{  
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }],
                merchantsState:'',
                value:'',
                scource:'',
                scourceList:[
                    {id:'1',value:'全部'},
                    {id:'2',value:'规则触发'},
                    {id:'3',value:'银联'},
                    {id:'4',value:'警方'},
                    {id:'5',value:'自查'},
                    {id:'6',value:'其他'}
                ],
                riskType:'',
                riskTypeList:[
                    // {id:'1',value:'洗单'},
                    // {id:'2',value:'盗卡'}
                ],
                riskLevel:'',
                riskLevelList:[
                    // {id:'1',value:'全部'},
                    // {id:'2',value:'高风险'},
                    // {id:'3',value:'中风险'},
                    // {id:'4',value:'低风险'}
                ],
                busiNo:'',
                desc:'',
                busiOrderNo:'',
                terminal:'',
                busiNoListSearch:'',
                busiInfoData:'',

            }
        },
        created() {
            // 按钮权限
            const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
            // this.createPermission = idList.indexOf(50) === -1 ? false : true;
        },
        methods:{
            // 完成创建
            complateEstablish(){
                console.log(this.busiNo)
                console.log(this.scource)
                console.log(this.riskType)
                console.log(this.riskLevel)
                console.log(this.desc)
                console.log( this.busiOrderNo)
                console.log(this.terminal)
                
                let busiNo = document.querySelector('#busiNo')
                let scource = document.querySelector('#scource')
                let riskType = document.querySelector('#riskType')
                let riskLevel = document.querySelector('#riskLevel')
                if(this.busiNo === ''){
                    busiNo.style.border = '1px solid #f56c6c'
                    return
                }else if(this.busiNo !== ''){
                    busiNo.style.border = '1px solid #dcdfe6'
                    if(this.scource === ''){
                        scource.style.border = '1px solid #f56c6c'
                        return
                    }else if(this.scource !== ''){
                        scource.style.border = '1px solid #dcdfe6'
                        if(this.riskType === ''){
                            riskType.style.border = '1px solid #f56c6c'
                            return
                        }else if(this.riskType !== ''){
                            riskType.style.border = '1px solid #dcdfe6'
                            if(this.riskLevel === ''){
                                riskLevel.style.border = '1px solid #f56c6c'
                                return
                            }else if(this.riskLevel !== ''){
                                riskLevel.style.border = '1px solid #dcdfe6'
                            }
                        }
                    }
                }
                if(document.querySelector('.busiNoErrorText').style.display === 'block'){
                    return;
                }

                this.$axios.post('/OfflineChecklistController/addOfflineChecklist',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'merchantId':this.busiNo,
                    'merchantOrder':this.busiOrderNo,
                    'terminalNum':this.terminal,
                    'source':this.scource,
                    'riskType':this.riskType,
                    'riskLevel':this.riskLevel,
                    'remark':this.desc,
                    'requestType':2,
                    'agency':localStorage.getItem('Agency'),
                    'userId':localStorage.getItem('USERID'),
                }))
                .then(res => {
                    console.log(res.data)
                    if(res.data.code === 1){
                        this.$alert('创建成功','系统提示',{
                            confirmButtonText: '确定',
                            type:'success',
                            callback:action =>{
                                window.close()
                            }
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            },
            busiNoBlur(){
                
                //console.log(this.busiNo)
                this.$axios.post('/OfflineChecklistController/easyInquiry',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'merchantId':this.busiNo,
                   
                }))
                .then(res => {
                    console.log(res.data)
                    if(res.data.ids.length !== 0){
                        document.querySelector('.busiNoList').style.display = 'block'
                        this.busiNoListSearch = []
                        this.busiNoListSearch =  this.busiNoListSearch.concat(res.data.ids)
                    }else if(res.data.ids.length === 0){
                        this.busiNoListSearch = []
                        document.querySelector('.busiNoList').style.display = 'none'
                    }
                   
                })
                .catch(error => {
                    console.log(error)
                })
            },
            busiNoBlurEvent(){
                if(this.busiNo !== ''){
                    this.$axios.post('/OfflineChecklistController/easyInquiry',qs.stringify({
                        'sessionId':localStorage.getItem('SID'),
                        'merchantId':this.busiNo,
                    }))
                    .then(res => {
                        console.log(res.data)
                        if(res.data.ids.length === 0){
                            document.querySelector('.busiNoErrorText').style.display = 'block'
                        }else if(res.data.ids.length !== 0){
                            document.querySelector('.busiNoErrorText').style.display = 'none'
                        }
                    })
                }else if(this.busiNo === ''){
                    document.querySelector('.busiNoErrorText').style.display = 'none'
                }
            },
            chooseBusiItem(e){
                //console.log(e.target.innerText)
                this.busiNo = e.target.innerText
                document.querySelector('.busiNoList').style.display = 'none'
                this.searchBusiInfo()
            },
            // 获取商户详情
            searchBusiInfo(){
                console.log(this.busiNo)
                console.log(this.busiOrderNo)
                console.log(this.terminal)
                console.log(this.scource)
                console.log(this.riskType)
                console.log(this.desc)
               
                
                this.$axios.post('/OfflineChecklistController/addOfflineChecklist',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'merchantId':this.busiNo,
                    'merchantOrder':this.busiOrderNo,
                    'terminalNum':this.terminal,
                    'source':this.scource,
                    'riskType':this.riskType,
                    'riskLevel':this.riskLevel,
                    'remark':this.desc,
                    'requestType':1

                }))
                .then(res => {
                    console.log(res.data)
                    this.busiInfoData = res.data.result
                    
                })
                .catch(error => {
                    console.log(error)
                })

                
                
            },
            // 风险类型下拉框
            getRiskTypeList(){
                this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'type':57
                }))
                .then(res => {
                    console.log(res.data)
                    this.riskTypeList = res.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            // 来源
            getScourceList(){
                this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                    'sessionId':localStorage.getItem('SID'),
                    'type':61
                }))
                .then(res => {
                    console.log(res.data)
                    this.scourceList = res.data
                })
                .catch(error => {
                    console.log(error)
                })
            },
            // 风险等级
            getRiskLevelList(){
                this.$axios.get('/OfflineChecklistController/queryRiskLevel?sessionId=' + localStorage.getItem('SID'))
                .then(res => {
                    console.log(res.data)
                    this.riskLevelList = res.data.riskLevel
                })
                .catch(error => {
                    console.log(error)
                })
            },
        },
        mounted(){

        },
        watch:{
            busiNo(){
                if(this.busiNo !== ''){
                     busiNo.style.border = '1px solid #dcdfe6'
                }
            },
        }
    }
</script>
<style scoped>
.text-box span{
    font-size: 12px;
    text-align: left;
    color: #333;
    margin-left: 13px;
    float: left;
}
.textborder{
    margin-right: 15px;
}
.leftContent{
    width:97%;
    float: left;
    border-right: 1px solid #E0E0E0;
}
.rightContent{
    width:27px;
    height: 100%;
    float: right;
}
.tabDiv{
    cursor: pointer;
    margin-top: 20px;
    height: 140px;
}
.tabDivH{
    cursor: pointer;
    margin-top: 38px;
    height: 87px;
    border-left: 6px solid rgb(63, 170, 249);
    padding-left: 6px;
}
.tabDiv span{
    display: block;
}
.text input{
    border: none;
}
.hr{
    margin-top: 25px;
    margin-bottom: 25px;
    border: none;
    height: 1px;
    background-color: #E0E0E0;
}
.flootText{
  width: 98%;
  height: 51px;
  overflow: hidden;
  border: 1px solid #E0E0E0;
  margin: -32px 10px 20px 0px;
  border-top: 0;
  padding-top: 17px;
}
.leftBtn{
  float: left;
}
.rightBtn{
  float: right;
}
.blackAddBtn{
  margin-left: 20px;
}
.btnBoxClass{
  width: 98%;
  background-color: rgb(245, 246, 250);
  height: 54px;
  margin-top: 14px;
  padding-top: 14px;
}
.clearBox{
  clear:both
}
.divHead{
  margin-top:20px;
  margin-left:20px;
}
.rideus{
  display:block;
  width:8px;
  height:8px;
  background-color:#000;
  border-radius:5px;
  float:left;
  margin-top: 7px;
  margin-right: 8px;  
}
.htmlHead{
  width:98%;
  margin-top:20px;
  margin-left:20px;
}
.divContent{
  width:98%;
  overflow: hidden;
  margin-top:20px;
  margin-bottom:30px;
  height:100%;
  border: 1px solid #E0E0E0;
  /* padding: 30px 20px 30px 20px; */
  padding-top: 15px;
}
.divContent .text input{
  border:0;
}
.text{
  width:24%;
  float:left;
  text-align: right;
}
.text-box{
  width: 50%;
  float: left;

  
}

.labelC{
  float: left;
  font-size: 12px;
  width: 35%;
  color: rgb(142, 142, 142)
}
.boxOnly{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 40px;
}
.divContent p {
  font-size: 13px;
  color:#606266;
  padding: 10px;
  line-height: 26px;
}
.boxOnly input{
  border: none !important;
} 
.contentBotoom {
    height: 60px;
    font-size: 13px;
    margin-left: 45px;
}
.BotoomBtn {
    width: 44px;
    height: 30px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    float: left;
    cursor: pointer;
}
  .BotoomBtn:hover {
    background-color: #38e139;
  }
.leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.icon3{
    background: url(../../images/off3.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4{
    background: url(../../images/off4.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sp{
    background: url(../../images/sp.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon3:hover{
    background: url(../../images/pfHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.icon4:hover{
    background: url(../../images/clHover.png) no-repeat;
    width: 39px;
    height: 28px;
}
.sp:hover{
    background: url(../../images/spH.png) no-repeat;
    width: 39px;
    height: 28px;
}
.rideusText{
    font-size:15px;
    color:#333333;
}
.busiNoErrorText{
    color:red;
    font-size:12px;
    position: absolute;
    left:40%;
    top:25px;
    display:none;
}
.busiNoList{
    width: 49%;
    max-height: 100px;
    position: absolute;
    left: 40%;
    top: 39px;
    border: 1px solid #e0e0e0;
    background-color: #ffffff;
    z-index: 10;
    overflow-y: scroll;
    display:none;
}
.busiNoListItem{
    display:block;height:20px;line-height:20px;width:100%;text-align:left;text-indent: 15px;
    overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    font-size:12px;color:#333333;
    cursor: pointer;
}
.busiNoListItem:hover{
    background-color: #ecf5ff;
    color: #66b1ff;
}
.busiNoList::-webkit-scrollbar{
    display:none
}

</style>
