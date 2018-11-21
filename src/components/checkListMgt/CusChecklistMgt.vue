<!--商户核查单管理-->
<template>
    <div id="cuschecklist">
        <div class="searchBasic">
            <el-collapse-transition>
                <div class="searchContentgray mt10" id="searchContentgray" >
                    <div class="clear">
                        <el-button type="primary" v-if="lsstShow && authsearch1" class=" fl" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search" @click="del">删除</el-button>
                        <el-button type="primary" class=" fl" icon="el-icon-search" @click="sh">审核</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <!-- <div>{{idList}}</div>  -->
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
        <!-- 审核弹框 -->
        <el-dialog title="" :visible.sync="auditformElementVisible" width="600px">
          <el-form :model="auditform" :rules="rules2" ref="auditformElement">
            <el-form-item label="审核结果:" :label-width="formLabelWidth" prop="auditResult">
              <el-select v-model="auditform.auditResult" @change="isauditResultErro"  placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核拒绝" value="0"></el-option>
                </el-select>
                <span class="errorbox" v-show="auditResult" v-html="auditResulttext"></span>
            </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 start 额外做了判空 -->
                <el-form-item label="审核意见:" :label-width="formLabelWidth" prop="auditOpinion" >
                  <el-input v-model="auditform.auditOpinion" maxlength="100" placeholder="审核意见" auto-complete="off"></el-input>
                </el-form-item>
                 <div style="position:relative;top:-30px;font-size:10px;width:120px;text-align:right;color:#666;">(审核拒绝时必填)</div>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 end-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isdisable" @click="checkProcess">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>

import qs from 'qs'
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import ManyCheckbox from '../zymCommon/manyCheckbox.vue'
export default {
    name:'CusChecklistMgt',
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        }
    },
    data(){
        return{
            auditform:{
                auditResult:'',
                auditOpinion:''
            },
            auditResult:false,  //审核结果
            auditResulttext:'',
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            formLabelWidth: '150px',
            authsearch1:true,
            lsstShow:true,
            ahthsh:true,
            lsstTable:[],
            idList:[],
            rules2:{
                auditResult:[
                    {required: true, message: '请选择审核结果', trigger: 'change'}
                ],
                auditOpinion:[
                    {required: true, message: ' ', trigger: 'blur'}
                ]
          },
      }
  },
   created(){
    this.listQuery()
   },
  methods:{
    listQuery(){  //查询列表
        this.$axios.get("/api/querylist").then(res => {
            var response = res.data
            this.lsstTable = response
        })
    },
    del(){   //删除
        if(this.idList.length < 1){
            this.atleastOne()
            return false
        }
        this.removeItem()
    },
    removeItem(){  //删除
        var idList = {}
        idList.id = this.idList.join(',')
        this.$axios.delete("/api/update",{data: qs.stringify(idList)}).then(res => {
            var response = res.data
            if(response.code == 200){
                this.listQuery()  //更新查询
                this.successTip(response.msg)
            }
        })
    },
    checkProcess(){  //审核
        var self = this
        var idList = {}
        idList.id = self.idList.join(',')
        idList.auditResult = self.auditform.auditResult
        idList.auditOpinion = self.auditform.auditOpinion
        this.auditformElementVisible = false
        this.$axios.put("/api/checkupdate",qs.stringify(idList)).then(res => {
            var response = res.data
            if(response.code == 200){
                this.listQuery()  //更新查询
                this.successTip(response.msg)
            }
        })
     },
     isauditResultErro(){
       if(this.auditform.auditResult == '请选择' || this.auditform.auditResult == ''){
            this.auditResult=true
            this.auditResulttext='请选择审核结果'
            return false
        }else{
            this.auditResult=false
            return true
        }
    },
     sh(){  //审核
        var self = this
       if(self.lsstShow){
            if(self.idList.length < 1){
                this.atleastOne()
                return false
            }
        }else if(self.ztstShow){
            if(self.chackboxChoose.length < 1){
                this.atleastOne()
                return false
            }
        }
        this.auditformElementVisible = true
    }
  },
  components:{
    KycCheckbox
  }
}
</script>
<style lang="less" scoped>

</style>

   
