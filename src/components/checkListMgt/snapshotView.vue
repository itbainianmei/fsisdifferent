<template>
  <!--线下核查单 操作记录 快照-->
    <div>
        <div class="htmlHead">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>核查单管理平台</el-breadcrumb-item>
                <el-breadcrumb-item>线下核查单管理</el-breadcrumb-item>
                <el-breadcrumb-item>核查单操作记录快照</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="border: 1px solid #E0E0E0;width:97%;margin:20px auto 20px;height:auto;">
            <div class="divHead">
                <span class="rideus"></span>调单情况
                <div class="divContent">
                    <div class="text"  style="width:24%">
                        <div class="boxOnly" >
                            <div class="labelC textborder">是否调取签购单:</div>
                            <div class="text-box"> 
                            <el-input   v-model="isRecallPurorder"></el-input>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>调单方式:</div>
                            <div class="text-box"> 
                            <el-input   v-model="recallWay"></el-input>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>处理措施建议:</div>
                            <div class="text-box"> 
                            <el-input    v-model="treatmentMeasures">
                            </el-input>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>风险性质建议:</div>
                            <div class="text-box"> 
                            <el-input    v-model="riskNature">
                            </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:24%">
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>签购单是否合规:</div>
                            <div class="text-box"> 
                            <el-input   v-model="purorderIsauthorized"></el-input>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">签购单不合规原因:</div>
                            <div class="text-box"> 
                            <el-input  type="textarea" style="margin-bottom: 20px;"  :rows="6" v-model="purorderFailReaseon"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:24%">
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>其他单据数量:</div>
                            <div class="text-box"> 
                            <el-input   v-model="otherInvoiceNum"></el-input>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">其他单据说明:</div>
                            <div class="text-box"> 
                            <el-input  type="textarea" style="margin-bottom: 20px;"  :rows="6" v-model="otherInvoiceDirection"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:24%">
                        <div class="boxOnly" >
                            <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>调单情况说明:</div>
                            <div class="text-box"> 
                            <el-input  type="textarea" style="margin-bottom: 20px;"  :rows="8" v-model="orderInstructions"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                    <span class="rideus"></span>调单结论
                    <div class="divContent">
                        <div class="text" style="width:24%">
                            <div class="boxOnly" >
                                <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>风险定性:</div>
                                <div class="text-box"> 
                                <el-input  v-model="riskQualitative"></el-input>
                                </div>
                            </div>
                            <div class="boxOnly" >
                                <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>风险程度:</div>
                                <div class="text-box"> 
                                <el-input   v-model="riskDegree"></el-input>
                                </div>
                            </div>
                            <div class="boxOnly" >
                                <div class="labelC textborder"><span style="color:red;font-size: 15px;font-weight: 500;">*</span>风险类型:</div>
                                <div class="text-box"> 
                                <el-input   v-model="riskType"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="text" style="width:71%">
                            <div class="boxOnly" >
                                <div class="labelC textborder" style="width:16%">结案陈词:</div>
                                <div class="text-box" style="width:80%"> 
                                <el-input type="textarea" style="margin-bottom: 20px;"  :rows="6" v-model="closingArguments">
                                </el-input>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <hr class="hr">
            <div class="divHead">
                <span class="rideus"></span>处理情况
                <div class="divContent">
                    <div class="text" style="width: 30%;display: block;float: none;">
                        <div class="boxOnly" >
                            <div class="labelC textborder" style="width: 22%;margin-left: 9%;">处理情况:</div>
                            <div class="text-box"> 
                            <el-input   v-model="surveyConclusion"></el-input>
                            </div>
                        </div>
                    </div>
                    <div class="text" style="width: 100%;display: block;float: none;">
                        <div class="boxOnly" >
                            <div class="labelC textborder" style="width: 8%;margin-left: 1%;">其他处理说明:</div>
                            <div class="text-box" > 
                                <el-input  type="textarea" :rows="5" v-model="otherProcessInstructions" style="width: 166%;margin-bottom: 20px;">
                                </el-input>
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
            tableData:[],
            tableData2:[],
            
            options:[{  
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            merchantsState:'',
            value:'',

            SurveyInfo:'',
            isRecallPurorder:'', 
            purorderIsauthorized:'', 
            recallWay:'',
            treatmentMeasures:'',
            riskNaturem:'', 

            purorderFailReaseon:'',
            otherInvoiceNum:'',
            otherInvoiceDirection:'',
            orderInstructions:'',
            riskQualitative:'',
            riskDegree:'',
            riskType:'',
            closingArguments:'',
            processingSituation:'',
            otherProcessInstructions:'',

            merchantId:'',
            transactionMoney:'',


        }
      },
      methods:{
        getMsg(){
            this.$axios.post('/OfflineChecklistController/querySurveyInfo',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                checkId:window.location.href.split('?')[1],
            }))
            .then(res => {
                console.log(res)
                this.SurveyInfo = res.data
                this.isRecallPurorder = res.data.surveyInfo.isRecallPurorder
                this.purorderIsauthorized = res.data.surveyInfo.purorderIsauthorized
                this.recallWay = res.data.surveyInfo.recallWay
                this.treatmentMeasures = res.data.surveyInfo.treatmentMeasures
                this.riskNature = res.data.surveyInfo.riskNature

                this.purorderFailReaseon = res.data.surveyInfo.purorderFailReaseon
                this.otherInvoiceNum = res.data.surveyInfo.otherInvoiceNum
                this.otherInvoiceDirection = res.data.surveyInfo.otherInvoiceDirection
                this.orderInstructions = res.data.surveyInfo.orderInstructions
                this.riskQualitative = res.data.surveyState.riskQualitative
                this.riskDegree = res.data.surveyState.riskDegree
                this.riskType = res.data.surveyState.riskType
                this.closingArguments = res.data.surveyState.closingArguments
                this.processingSituation = res.data.surveyConclusion.processingSituation
                this.otherProcessInstructions = res.data.surveyConclusion.otherProcessInstructions

                this.merchantId = res.data.merchantInfo.merchantInfo
                this.transactionMoney = res.data.transaction.transactionMoney
            })
            .catch(error => {
            })
        },
      },
      mounted(){
          this.getMsg()
      },
    }
</script>
<style scoped>

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
  width:10px;
  height:10px;
  background-color:#000;
  border-radius:5px;
  float:left;
  margin-top: 7px;
  margin-right: 15px;  
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
  font-size: 13px;
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
</style>
