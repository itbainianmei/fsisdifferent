<!--Epos交易查询-->
<template>
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
                                <el-form-item label="产品:" prop="product">
                                    <el-select v-model="form.product" placeholder="请选择" style="width: 90%;max-width:225px;">
                                    <el-option label="全部" value="all" ></el-option>
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
                                <el-form-item label="标记开始日期:" prop="markStartTime">
                                    <el-date-picker  v-model="form.markStartTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="标记结束日期:" prop="endTime">
                                    <el-date-picker  v-model="form.markEndTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="标记人:" prop="markPerson">
                                    <el-input v-model="form.markPerson" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="No">
                                    <el-input v-model="form.No" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item> 
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户名称:" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item> 
                            </div>
                            <div class="formConClass">
                                <el-form-item label="手机号:" prop="mobile">
                                    <el-input v-model="form.mobile" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行卡号:" prop="card">
                                    <el-input v-model="form.card" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:" prop="orderNo">
                                    <el-input v-model="form.orderNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="银行名称:" prop="bankName">
                                    <el-input v-model="form.bankName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/highrisk/getAll","highrisk")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("highrisk")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
         
        <div class="tableData">
            <div class="tr mr10">
                <el-button type="primary" @click="highRiskCancelList">取消高危交易</el-button>
                <el-button type="primary" @click="downloadList">下载</el-button>
            </div>
            <div class="mt30">
                <el-table
                     @selection-change="selectedItems"
                    @row-dblclick="gotoDetail"
                    :data="lsstTable"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="product"
                        label="产品"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="merchantName"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="orderNo"
                        label="商户订单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardNo"
                        label="银行卡号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="交易金额(元)"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="银行名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="markPerson"
                        label="标记人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="markTime"
                        label="标记时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="交易时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="交易状态"
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
</template>
<script>
import qs from 'qs';
export default {
    // {
    //             "id":"000",
    //             "product":"product",
    //             "merchantNo":"merchantNo",
    //             "merchantName":"merchantName",
    //             "orderNo":"orderNo",
    //             "cardNo":"cardNo",
    //             "mobile":"mobile",
    //             "money":"money",
    //             "bankName":"bankName",
    //             "markPerson":"markPerson",
    //             "markTime":"markTime",
    //             "time":"time",
    //             "status":"status" 
    //         },{
    //             "id":"111",
    //             "product":"product",
    //             "merchantNo":"merchantNo",
    //             "merchantName":"merchantName",
    //             "orderNo":"orderNo",
    //             "cardNo":"cardNo",
    //             "mobile":"mobile",
    //             "money":"money",
    //             "bankName":"bankName",
    //             "markPerson":"markPerson",
    //             "markTime":"markTime",
    //             "time":"time",
    //             "status":"status" 
    //         }
  data(){
      return{
        currenteveryno:"10",
          serchToggle:true,
          lsstShow:true,
          lsstTable:[],
          form:{
            startTime:'',
            endTime:'',
            product:'all',//产品
            markStartTime:'',//标记开始时间
            markEndTime:'',//标记结束时间
            markPerson:'',//标记人
            No:'',//商户编号
            name:'',//商户名称
            mobile:'',//手机
            card:'',//银行卡号
            orderNo:'',//商户订单号
            bankName:''//银行名称
          },
          productArray:[],//产品
          idList:[],//选中的产品id列表
          rules: {
          },
          currentPage:1,// 分页
          pageNumber:1,
          pageRow:20,
          length:0
      }
  },
  created(){
    //加载页面数据
    this.$axios.get("/riskgod/union/highrisk/getParam").then(res => {
        var response = res.data
        if(response.code == '200'){
            this.form.startTime = response.data.startTime
            this.form.endTime = response.data.endTime
            this.form.markStartTime = response.data.sighStartTime
            this.form.markEndTime = response.data.sighEndTime
            this.productArray = response.data.product
        }else{
            this.$message.error({message:response.msg,center: true});
        }
    }) 
  },
  methods:{
     handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/union/highrisk/getAll","highrisk")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/union/highrisk/getAll","highrisk")
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post("/riskgod/union/highrisk/download",qs.stringify({
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
    highRiskCancelList(value) {  //取消高危交易
        var self = this
        if(self.idList.length < 1){
            return false
        }
        this.$axios.post("/riskgod/union/highrisk/cancel",qs.stringify({
            id:self.idList  //选中的行的id列表
        })).then(res => {
            var response = res.data
            if(response.code == '200'){
                
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    gotoDetail(row){ //进入详情页
        this.$router.push({path:'./highRiskTransactionQueryDetail/'+row.id})
    }
  } 
}
</script>
<style scoped lang="less">
.tableData{
    width: 100%;
    height: auto;
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
