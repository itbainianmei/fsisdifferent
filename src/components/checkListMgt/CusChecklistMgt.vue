<!--商户核查单管理-->
<template>
    <div id="cuschecklist">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray mt10" id="searchContentgray" >
                    <div class="clear">
                        <el-button type="primary" v-if="lsstShow && authsearch1" class=" fl" icon="el-icon-search" @click='listQuery2("/checklist/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search" @click="removeItem">删除</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search">审核</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div>{{idList}}</div> 
        <!-- <div>
            风神是我2018年主要的项目产出，分为两期。工作内容特别多，难度较高，大家之前都没有接触相关的东西，前端是我自己，后端是4个人，团队预期瓶颈会出现在前端。结果是我超出预期完成了所有工作，在后端完成日期之前交付前端工作，并且为了保证工作顺利进行，积极给未完成后端工作的队友制定了数据格式并输出接口文档，以往这些工作属于后端同学的工作，使后续对接由预期两三天时间缩短为半天，进行的非常顺利。在每个环节中保证前端工作顺利进行，使得即使后端三四次延期的情况下，也保证了一期风神如约交付。二期风神，介入人员比一期多，由子公司天创和易宝支付各自平等分工进行开发。天创出了4个前端同学，分工完成，易宝这边依然是我一个前端，工作内容比其他同学多，而且给我的工作难度稍微高一些，最终我不负所望完成了风神二期的开发和联调等工作。在两期风神中得到了风控团队队友和领导的认可。
            配置中心也是2018年我帮过的项目，原因是这个项目的前端魏瑞同学工作内容实在特别多，内容难度大，时间又很紧张，于是我就加入了进去。负责一个大模块的开发和联调，时间也特别的紧张，我也有事要请假。所以本来预期是我只能帮助完成全部开发，保证正向过程通顺即可。结果我提前一天半交付工作，完成了所有的开发和联调，以及修复bug。又因为当时魏瑞同学也要赶着时间去国外团建，项目又要如期上线，所以我在修复bug的过程中先挑难度大的搞，防止魏瑞不熟悉我这边的开发，耗时太久，延误项目工期。过程是这么做的，结果却是超预期修复了我走之前测试同学提出的所有bug。赢得了配置中心队友们的认可，得了wow卡一枚。
            2017年参与的项目特别多特别多，都还好。
            这是入职易宝将近一年半首次报名T序列任职资格评审。
        </div> -->
        <div class="tableData mt20">
            <div class="pl10 pr10">
            <!-- 流水视图 -->
                <el-table
                    fixed
                    max-height="600"
                    @selection-change="selectedItemsid"
                    :data="lsstTable"
                    border
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkList"
                        label="核查单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantOnlyId"
                        label="商户唯一标识"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantKyc"
                        label="商户KYC"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyOne"
                        label="商户自然属性一级"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="expiryTime"
                        label="过期时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="dealStatus"
                        label="处理状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="investigationInfo"
                        label="调查信息"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListSource"
                        label="核查单来源"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="autoRiskDeal"
                        label="规则处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
                        width="150">
                    </el-table-column>
                   <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedBy"
                        label="最后操作人"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedTime"
                        label="最后操作时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remark"
                        label="备注"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
            </div>
           
        </div>
    </div>
</template>
<script>

import qs from 'qs'
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import ManyCheckbox from '../zymCommon/manyCheckbox.vue'
export default {
    name:'CusChecklistMgt',
    data(){
        return{
            lsstShow:true,
            authsearch1:true,
            authsearch2:true,
            addCase:true,
            authreset:true,
            ahthpf:true,
            ahthcl:true,
            ahthsh:true,
            ahthdown:true,
            lsstTable:[],
            idList:[]
      }
  },
   created(){
    this.listQuery2()
   },
  methods:{
    listQuery2(){
        this.$axios.get("/api/querylist").then(res => {
            var response = res.data
            if(response.code == '200'){
                console.log(response)
                this.lsstTable = response.returnList
            }
        })
    },
    removeItem(){  //删除
        var idList = {}
        idList.id = this.idList.join(',')
        this.$axios.delete("/api/update",{data: qs.stringify(idList)}).then(res => {
            var response = res.data
            console.log(response)
            if(response.ok){
                this.successTip(response.msg)
            }
        })
    },
    processForm(formName,params,hiddenElement){
        /*  处理
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var self = this
        this.hasOne()
        this.$refs[formName].validate((valid) => {
            if(valid){
                var subParam = params
                this[hiddenElement] = false
                this.$axios.post('/checklist/handle',qs.stringify(subParam)).then(res => {
                  var response = res.data
                  if(response.code == '200'){
                     this.processform = {  //处理商户核查单
                         riskQualitativeAnalysis:'请选择',
                         riskDeal:'请选择',
                         immuneStart:'',
                         immuneEnd:'',
                         remark:''
                      }
                      self.successTip(response.msg)
                  }
              })
            }
        })
     },
  },
  components:{
    KycCheckbox
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/common.less';
.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
}
.clear{
    clear: both;
}
 
.searchContentgray,.seniorSearchContent{
    height: auto;
    /* line-height: 76px; */
    padding-left: 3%;
    padding-top: 8px;
    padding-bottom: 6px;
    -webkit-transition: all 1s;
    transition: all 1s;
}
 
.formConClass{
    display: inline-block;
    width: 32%;
}

.serch{
    float: right;
    width: 18%;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.fontC{
    color: #3DC6B2;
    cursor: pointer;
    line-height: 17px;
  }
</style>

   
