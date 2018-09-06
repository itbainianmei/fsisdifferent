<!--商户核查单管理-->
<template>
    <div id="cuschecklist" @click="allarea($event)">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="130px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="jjj">
                                     <el-input v-model="form.jjj" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                     <el-input v-model="form.merchantNo" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="merchantContractName">
                                    <el-input v-model="form.merchantContractName" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item class="pr" label="商户KYC:" prop="KYC" >
                                     <el-input class="fs12" v-model="form.KYC" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="addproperty"></el-input>
                                     <span class="pa iconbox" @click="addproperty">
                                       <i class="el-icon-arrow-down blue"></i>
                                     </span>
                                     <!-- 多选框 -->
                                    <ManyCheckbox v-show="kycshow" :onepropertySelectshow="kycshow" :submitData="form.KYC" @isShow="isShow"></ManyCheckbox>
                                   
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户自然属性一级:" prop="naturalPropertyOne">
                                    <el-select v-model="form.naturalPropertyOne" placeholder="请选择"  >
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in onepropertySelect"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="销售:" prop="sale">
                                    <el-input v-model="form.sale" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="subCompany">
                                    <el-input v-model="form.subCompany" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="行业业绩属性:" prop="achievementProperty">
                                    <el-select v-model="form.achievementProperty" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in worktypeArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户评级:" prop="ppp">
                                    <el-select v-model="form.ppp" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in pingji"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentNo">
                                    <el-input v-model="form.agentNo" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentName">
                                    <el-input v-model="form.agentName" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent" v-show="!seniorSearchToggle">
                        <el-button type="primary"  class="serchbtn" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                         
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheck")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="xxx" title="商户管控" >
                            <div class=""></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="ahthdown"  title="下载" @click="downList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <!-- 流水视图 -->
                <el-table
                    fixed 
                    max-height="600"
                    @selection-change="selectedItemsid"
                    @row-dblclick="gotoDetail"
                    :data="lsstTable"
                    border
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.ddd[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="ddd"
                        label="商户唯一标识"
                        width="150">
                    </el-table-column>
                   <el-table-column
                    v-if="tableDataSec0.merchantNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantContractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.KYC[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="KYC"
                        label="商户KYC"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.rrr[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="rrr"
                        label="初始结果"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.fff[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="fff"
                        label="复核结果"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.re[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="re"
                        label="人工识别结果"
                        width="180">
                    </el-table-column>
                      <el-table-column
                    v-if="tableDataSec0.merchantNetTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.shpj[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="shpj"
                        label="商户评级"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.achievementProperty[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.naturalPropertyOne[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyOne"
                        label="商户自然属性一级"
                        width="150">
                    </el-table-column>
                   <el-table-column
                    v-if="tableDataSec0.agentNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.sale[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.subCompany[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
            </div>
            <div class="block mb20">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange0" v-model="currenteveryno0" style="width: 28%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[10,20,30,40]"
                    :page-size="Number(currenteveryno0)"
                    :total="length"
                    @current-change="handleCurrentChange0">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
         <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec0" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
import ManyCheckbox from '../checkListMgt/manyCheckbox.vue'
export default {
    name:'商户画像',
    data(){
        return{
            xxx:true,
            isprtypetext:'请至少选择一种产品类型',
            authsearch1:false,
            authreset:false,
            ahthcl:false,
            showid:false,
            loading:true,
            isChoose:false,//弹框状态计算
            merchant:false,
            merchanttext:'',
            flag:0,
            areaall:false,
            currenteveryno0:20,
            currenteveryno1:20,
            merchantnoisok:false,
            
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            formLabelWidth: '150px',
            seniorSearchToggle:false,
            serchToggle:true,
            
            lsstShow:true,
            lsstTable:[{
                "id": 116,
                "checkList": "000115",
                "sale": "销售2号",
                "time": "2018-07-10 18:04:19",
                "riskLevel": "中风险",
                "riskQualitativeAnalysis": "未定性",
                "dealStatus": "待处理",
                "riskDeal": "未处理",
                "companyId": "1",
                "merchantNetTime": "2018-07-10",
                "achievementProperty": "电信行业线",
                "merchantNo": "100400501",
                "merchantName": "测试商户有限公司",
                "merchantContractName": "签约测试2",
                "agentNo": "100400500",
                "agentName": "代理商名称1",
                "naturalPropertyOne": "一级行业测试2",
                "naturalPropertyTwo": "二级行业测试2",
                "lastModifiedBy": "",
                "lastModifiedTime": "2018-07-10 18:04:18",
                "businessTime": "2018-07-10 18:04:19",
                "createTime": "2018-07-10 18:04:19",
                "subCompanyId": "23",
                "subCompany": "线下机构(北京一分公司)",
                "pageNumber": 0,
                "pageRow": 0,
                "pageIndex": 0
                }],
            pingji:[],
            tableDataSec0:{
              ddd:[true,'商户唯一标识'],
              merchantNo:[true,'商户编号'],
              merchantContractName:[true,'商户签约名'],
              KYC:[true,'商户KYC'],
              rrr:[true,'初始结果'],
              fff:[true,'复核结果'],
              re:[true,'人工识别结果'],
              merchantNetTime:[true,'商户入网日期'],
              shpj:[true,'商户评级'],
              achievementProperty:[true,'行业业绩属性'],
              naturalPropertyOne:[true,'商户自然属性一级'],
               agentNo:[true,'代理商编号'],
              agentName:[true,'代理商名称'],
              sale:[true,'销售'],
              subCompany:[true,'分公司']
            },
          form:{
            jjj:'',
            merchantNo:'',
            merchantContractName:'',
            KYC:'',
            naturalPropertyOne:'all',
            sale:'',
            subCompany:'',
            achievementProperty:'all',
            ppp:'all',
            agentNo:'', 
            agentName:''
          },
          kycshow:false,
          onepropertySelect:[],//商户自然属性一级
          worktypeArray:[],//商户业绩属性
          rules:{
            merchantNo:[
                {required: true, message: ' ', trigger: 'blur'}
            ],
            riskQualitativeAnalysis:[
                {required: true, message: '人工识别商户KYC', trigger: 'blur'}
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            prtype: [
                { type: 'array', required: true, message: ' ', trigger: 'change' }
            ]
          },
          idList:[],//表格中选中的行idlist
          pageNumber0:1,
          pageRow0:20,
          length:0 
      }
  },
   created(){
    this.getMerchantFirst()//商户自然属性一级
    this.getIndustryAchievementProperty()//商户业绩属性
    this.queryAuthList()
   },
  methods:{
    hasOne(){
        if(this.processform.prtype != ''){
            this.prtype = false
        }else{
            this.prtype = true
        }
    },
    addproperty(){//增加商户自然一级属性
        this.kycshow = true
    },
    isShow(val){
        this.form.KYC= val.submitData
        this.kycshow = val.onepropertySelectshow
    },
    gotoDetail(row){ //进入详情页
            window.open('#/merchantPhotoDetail/'+ row.id)
    },
    queryAuthList(){  //权限管理
        var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
        JSON.parse(arr).map(function(ele){
            switch(ele){
                case 84 || 232:
                    self.authsearch1= true
                break;
                case 86:
                    self.authreset= true
                break;
                case 93:
                    self.ahthdown = true
                break;
            }
        })
    },
    
     
    downList(){ //下载
        var self = this
        var params = this.processParams('cuscheck')//入参
        if(!params){
            return false
        } 
        if(self.lsstShow){
            params.id=self.idList.join(',')
        }else if(self.ztstShow){
            params.id=self.chackboxChoose.join(',')
        }
        params.sessionId =localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        this.$axios.post("/checklist/downLoadCheck",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code == '200'){
                window.location = this.url+"/checklist/downLoad?" + qs.stringify(params)
            }else{
                this.$message.error({message:response.msg,center: true});
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
                subParam.id= this.idList.concat(this.chackboxChoose).join(',')
                this[hiddenElement] = false 
                subParam.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
                this.$axios.post('/checklist/handle',qs.stringify(subParam)).then(res => {
                  var response = res.data
                  if(response.code == '200'){
                     this.listQuery("/checklist/getAll","cuscheck")
                     this.processform = {  //处理商户核查单
                         riskQualitativeAnalysis:'请选择', 
                         riskDeal:'请选择',
                         immuneStart:'',
                         immuneEnd:'',
                         remark:''
                      }
                      self.successTip(response.msg)
                  }else{
                    self.failTip(response.msg)
                  }
              }) 
            }
        })
        
     },  
    
     query(){
        this.listQuery("/checklist/getAll","cuscheck")
     },
     handleSizeChange0() {  //更改页数
        this.pageRow0 = this.currenteveryno0
    },
    handleCurrentChange0(val) {  //处理当前页
         this.pageNumber0 = `${val}`  //当前页
    },
  },
  components:{
    TableSelect,ManyCheckbox
  }
}
</script>
<style lang="less" scoped>
.iconbox{
  right:13%;
    .blue{
        color:#3FAAF9;
        font-weight: 800;
    }
}
.errorbox{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    }
.ztstlist{
    margin-top: -20px;
    .checkbox{
        padding:12px 20px 12px 14px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
         float: left;
    }
    .text{
        width:129px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding:12px 10px;
        float: left;
        white-space:nowrap;
        overflow:hidden;
        -o-text-overflow:ellipsis;
        text-overflow:ellipsis;
    }
}
.tableExpandIcon{
    min-width:48px !important;text-align:center;overflow: hidden;
}
.tableExpandCheckzym{
    min-width:50px !important;text-align:center;overflow: hidden;
}
.tableExpandTd{
min-width:150px !important;max-width:150px !important;text-align:left;padding-left:10px;overflow: hidden;
}
.tableExpandTd2{
min-width:180px !important;max-width:180px !important;text-align:left;padding-left:10px;overflow: hidden;
}

.checkbox{padding:12px 14px;}
.importData{line-height: 30px;}
.listValInp{width: 60%;height: 36px;}
.formIpt{
    padding: 0;
    width: 14%;
    height: 31px;
    float: right;
    margin-top: -37px;
    border: 0px;
}
 
.lsst{
    margin-top: 15px;
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/lsst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
}
 
.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
}
.clear{
    clear: both;
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
    -webkit-transition: all 1s;
    transition: all 1s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}

.rightContent1{
    color:white;
    display: inline-block;
    vertical-align: top;
    margin-top:20px;
    /*width: 18%;
    height: 118px;
    float: right;*/
}
.formConClass{
    display: inline-block;
    width: 32%;
}
.serchbtn{
    width: 100px;
    height:36px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-left: 30%;
    display: block;
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
