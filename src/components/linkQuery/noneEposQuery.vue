<!--非Epos交易查询-->
<template>
    <div>
        <div>
            <div class="searchBasic">
                <div class="title" >
                    <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                    <span>基础查询</span>
                </div>
                <el-collapse-transition>
                    <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                        <div class="leftContent" >
                            <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                                <div class="formConClass">
                                    <el-form-item label="开始时间:" prop="startTime">
                                        <el-date-picker  v-model="form.startTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="结束时间:" prop="endTime">
                                        <el-date-picker  v-model="form.endTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                    </el-form-item>
                                </div>
                               <div class="formConClass">
                                    <el-form-item label="交易状态:" prop="status">
                                        <el-select v-model="form.status" placeholder="请选择" style="width: 90%;max-width:225px;">
                                            <el-option label="全部" value="all"></el-option>
                                            <el-option label="成功" value="success"></el-option>
                                            <el-option label="失败" value="fail"></el-option>

                                        </el-select>
                                    </el-form-item>
                                </div>
                                 
                                <div class="formConClass">
                                    <el-form-item label="产品:" prop="product">
                                        <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                            <el-option
                                                v-for="item in productArray"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                 
                                <div class="formConClass">
                                    <el-form-item label="手机号:" prop="mobile">
                                        <el-input v-model="form.mobile" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="商户编号:" prop="number">
                                        <el-input v-model="form.number" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="商户订单号:" prop="orderNo">
                                        <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="终端号:" prop="terminal">
                                        <el-input v-model="form.terminal" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="银行卡号:" prop="cardNo">
                                        <el-input v-model="form.cardNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                 <div class="formConClass">
                                    <el-form-item label="身份证号:" prop="IDNo">
                                        <el-input v-model="form.IDNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="用户id:" prop="userId">
                                        <el-input v-model="form.userId" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                                 <div class="formConClass">
                                    <el-form-item label="银行卡类型:" prop="cardType">
                                        <el-select v-model="form.cardType" placeholder="请选择" style="width: 90%;max-width:225px;">
                                            <el-option label="全部" value="all"></el-option>
                                            <el-option label="信用卡" value="creditCard"></el-option>
                                            <el-option label="借记卡" value="debitCard"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="formConClass">
                                    <el-form-item label="通道编码:" prop="channel">
                                        <el-input v-model="form.channel" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                       <div class="rightContent">
                            <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/noepos/getAll","noneEpos")'>查询</el-button>
                            <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("noneEpos")'>重置</el-button>
                        </div>
                    </div>
                </el-collapse-transition>
            </div>
            <div class="tableData">
                <div class="contentBotoom clear">
                    <div class="button fl">
                        <div class="leftButton clear ">
                            <div class="BotoomBtn leftRadius" title="加入黑名单" @click="blackListTip(true)">
                                <div class="cj"></div>
                            </div>
                            <div class="BotoomBtn" title="删除黑名单" @click="blackListTip(false)">
                                <div class="dr"></div>
                            </div>
                            <div class="BotoomBtn" title="标记为高危交易" @click="highRiskList(true)">
                                <div class="pf"></div>
                            </div>
                             <div class="BotoomBtn rightRadius" title="下载" @click="downloadList">
                                <div class="cl"></div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <!-- <div class="tr mr20">
                    <el-button type="primary" @click="blackListTip(true)">加入黑名单</el-button>
                    <el-button type="primary" @click="blackListTip(false)">删除黑名单</el-button>
                    <el-button type="primary" @click="highRiskList(true)">标记为高危交易</el-button>
                    <el-button type="primary" @click="downloadList">下载</el-button>
                </div> -->
                <div class="mt30">
                    <el-table
                        @selection-change="selectedItems"
                        @row-dblclick="gotoDetail"
                        :data="lsstTable"
                        style="width: 100%"
                        v-if="lsstShow">

                        <el-table-column
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column
                            prop="saleName"
                            label="销售姓名"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="product"
                            label="商品类别"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            label="产品"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="No"
                            label="商户订单号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="yeepayNo"
                            label="易宝交易流水号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardNo"
                            label="银行唯一识别号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="idNo"
                            label="商户编号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="商户名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            label="订单金额(元)"
                            width="150">
                        </el-table-column>
                        
                        <el-table-column
                            prop="status"
                            label="交易状态"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardNo"
                            label="银行卡号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardHolderMobile"
                            label="持卡人手机号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="idNo"
                            label="证件号码"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="payMethod"
                            label="支付方式"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardType"
                            label="银行卡类型"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="bankName"
                            label="银行名称"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="userId"
                            label="用户id"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="IP"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="intercepeReason"
                            label="风控拦截原因"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="bankReturn"
                            label="银行返回"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="清算时间"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="hasCode"
                            label="是否下发验证码"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="bankOrderNo"
                            label="银行订单号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="channel"
                            label="通道编码"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="terminal"
                            label="终端号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="cardUpdateTime"
                            label="绑卡更新时间"
                            width="150">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <div class='pagination'>
                        <span>每页显示</span> 
                         <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 25%;">
                            <el-option label="10" value="10"></el-option>
                            <el-option label="20" value="20"></el-option>
                            <el-option label="30" value="30"></el-option>
                            <el-option label="40" value="40"></el-option>
                        </el-select>
                    </div>
                    <div class='paginationRight'>
                       <el-pagination
                        layout="prev, pager, next"
                        :page-sizes="[10,20,30,40,50]"
                        :page-size="10"
                        :total="length"
                        @current-change="handleCurrentChange">
                       </el-pagination>
                       
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
// {
//                 "id":"222",
//                 "saleName":"saleName",
//                 "productName":"productName",
//                 "product":"product",
//                 "orderNo":"orderNo",
//                 "yeepayNo":"yeepayNo",
//                 "bankSign":"bankSign",
//                 "No":"No",
//                 "name":"商户名称",
//                 "money":"money",
//                 "status":"交易状态",
//                 "cardNo":"cardNo",
//                 "cardHolderMobile":"cardHolderMobile",
//                 "cardHolderName":"美如我",
//                 "idNo":"idNo",
//                 "payMethod":"payMethod",
//                 "cardType":"cardType",
//                 "bankName":"农业银行",
//                 "userId":"userId",
//                 "ip":"ip",
//                 "intercepeReason":"intercepeReason",
//                 "bankReturn":"bankReturn",
//                 "time":"time",
//                 "hasCode":"hasCode",
//                 "bankOrderNo":"bankOrderNo",
//                 "channel":"channel",
//                 "terminal":"terminal",
//                 "cardUpdateTime":"cardUpdateTime"
//             } 
import qs from 'qs';
export default {
  data(){
      return{
        currenteveryno:"10",
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
        form:{
            startTime:'',
            endTime:'',
            status:"all",//交易状态
            product:'',//产品
            mobile:'',//手机号
            number:'',//商户编号
            orderNo:'',////商户订单号
            terminal:'',//终端号
            cardNo:'',//银行卡号
            IDNo:'',//身份证号
            userId:'',//用户id
            cardType:'all',//银行卡类型 
            channel:''//通道编码
        },
        productArray:[
             
        ],//产品
        idList:[],//选中的产品id列表
        rules: {
        },
        currentPage:1,// 分页
        pageNumber:1,
        pageRow:20,
        length:0 
      }
  },
  methods:{
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/union/noepos/getAll","noneEpos")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/union/noepos/getAll","noneEpos")
    },
    blackList(value){  //是否加入黑名单
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post("/riskgod/union/noepos/blackList",qs.stringify({
            status:value,
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            var text =''
            if(value){
                text = '加入黑名单成功'
            }else {
                 text = '删除黑名单成功'
            }
            if(response.code == '200'){
               // 干哈？？？
               self.successTip(text)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        }) 
    },
    highRiskList(value) {  //是否标记为高危交易
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/riskgod/union/noepos/highRisk",qs.stringify({
            status:value,
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               if(response.data.status){
                    self.highRiskListTip('标记成功！')  
               }else{
                    self.highRiskListTip('订单号已标记')
               }
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.$axios.post("/riskgod/union/noepos/download",qs.stringify({
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
               ///// 干哈？？？
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    gotoDetail(row){ //进入详情页
        this.$router.push({path:'./noneEposQueryDetail/'+row.id})
    }
  },
  created(){
    //加载页面数据
    this.$axios.get("/riskgod/union/noepos/getParam").then(res => {
        var response = res.data
        if(response.code == '200'){
            this.form.startTime = response.data.startTime
            this.form.endTime = response.data.endTime
            this.productArray = response.data.product
        }else{
            this.$message.error({message:response.msg,center: true});
        }
    }) 
  }
}
</script>
<style scoped>
.tableData{
    width: 100%;
    height: auto;
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
    padding-top: 20px;
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

.title{
    height: 50px;
    line-height: 50px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
}

.searchContentgray,.seniorSearchContent{
    height: auto;
    /* line-height: 76px; */
    padding-left: 3%;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-transition: all 1s;
    transition: all 1s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}

.formConClass{
    display: inline-block;
    width: 32%;
}

</style>
