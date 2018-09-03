<!--出款-->
<template>
    <div id="outmoney" @click="allarea($event)" style="height:84vh;">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="116px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="id" label-width="126px">
                                     <el-input v-model="form.id" placeholder="请输入" style="width: 90%;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="no">
                                    <el-input v-model="form.no" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="sign">
                                    <el-input v-model="form.sign" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                   <div class="rightContent">
                        <el-button type="primary" v-show="authsearch" class="serchbtn" icon="el-icon-search" @click='listQuery("/usRemit/getAll","outPay")'>查询</el-button>
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("outPay")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius rightRadius" v-show="authdownload" title="下载" @click="downloadList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                    fixed 
                    max-height="600"
                    @selection-change="selectedItems"
                    @row-dblclick="gotoDetail"
                    @cell-mouse-enter="showsecret"
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
                     v-if="tableDataSec.id[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="orderNo"
                        label="商户唯一标识"
                       >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.result[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="result"
                        label="唯一标识风险评级结果"
                         >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.nextnumber[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="nextnumber"
                        label="下属商编数"
                         >
                    </el-table-column>
                </el-table>
            </div>
            
           <div class="block">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 28%;">
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
                    :page-size="Number(currenteveryno)"
                    :total=length
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
    name:'出款交易查询',
    data(){
      return{
        authsearch:false,
        authreset:false,
        authdownload:false,
        currenteveryno:20,
        serchToggle:true,
        lsstShow:true,
        lsstTable:[{
            "id": 116,
            "result": "000115",
            "nextnumber": "销售2号",
         }],
        tableDataSec:{  //控制列显示  key和table prop一致
              id:[true,'商户唯一标识'],
              result:[true,'唯一标识风险评级结果'],
              nextnumber:[true,'下属商编数']
            },
          form:{
            id:'',  //商户唯一标识
            no:'',  //商户编号
            sign:'',  //商户签约名
          },
          oneProductSelect:[],//产品
          ywftArray:[],//业务方
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
    gotoDetail(row){
        window.open('#/merchantIdentityDetail/'+ row.id)
    },
    queryAuthList(){  //权限管理
           var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
         JSON.parse(arr).map(function(ele){
            switch(ele){
                case 169:
                    self.authsearch= true
                break;
                case 170:
                    self.authreset= true
                break;
                case 171:
                    self.authdownload= true
                break;
            }
        })
    },
    handleSizeChange() {  //更改页数
        var params = this.form
        var validateObj = {
           "yeepayNo":params.yeepayNo,
            "orderNo":params.orderNo,
            "merchantNo":params.merchantNo,
            "receiveCardNo":params.receiveCardNo,
            "outBatchNo":params.outBatchNo
        }
         var result = this.oneofmust(validateObj)  //校验结果
        if(!result){
            this.$alert('易宝交易流水号、出款订单号、商户编号、收款账户号、出款批次号必填其中之一', '筛选项必填', {
              confirmButtonText: '确定'
            });
            return false
        }
        this.pageRow = this.currenteveryno
        this.listQuery("/usRemit/getAll","outPay",true)
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/usRemit/getAll","outPay",true)
    },
    downloadList() {//是否下载
        var self = this
        if(self.idList.length < 1){
            var params = this.processParams('outPay')//入参;
        }else{
            var params = this.processParams('outPay')//入参
            params.yeepayNoList = self.idList
        }
        if(!params){
            return false
        }
        var newp = this.addSessionId(params)
        this.$axios.post("/usRemit/checkNum",qs.stringify(newp)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usRemit/download?" + qs.stringify(newp)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
        // window.location = this.url+"/usRemit/download?" + qs.stringify(params)
    }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
    //加载页面数据
  },
  components:{
    TableSelect
  }
}
</script>
<style scoped>
.secret{
   background: rgba(0,0,0,0.8);
   color:white;
   border-radius: 3px;
   line-height: 28px;
   padding:0 8px;
   font-size: 14px;
   top:8px;z-index:10;
   &:before{
    content: '';
    display: inline-block;
    position: absolute;
    left:-10px;
    top:10px;
    width: 0;
    height: 0;
    border-top: 5px solid white;
    border-right: 10px solid rgba(0,0,0,0.8);
    border-bottom: 5px solid white;
   }
}
.tableData{
    width: 100%;
    height: auto;
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
