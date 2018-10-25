<!--出款-->
<template>
    <div id="outmoney" @click="allarea($event)" style="height:84vh;">
        <div class="searchBasic">
           <!--  <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div> -->
            <el-collapse-transition>

                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="106px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="customerSignArr" label-width="100px">
                                     <el-input v-model="form.customerSignArr" placeholder="" style="width: 90%;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="customerNumberArr">
                                    <el-input v-model="form.customerNumberArr" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="signedname">
                                    <el-input v-model="form.signedname" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                   <div class="rightContent clear">
                        <el-button type="primary" style="margin-left:10px;" v-show="authsearch" class="serchbtn fl" icon="el-icon-search" @click='listQuery("/CustomerUniqueMarker/getList","CustomerUniqueMarker")'>查询</el-button>
                        <el-button type="primary" style="margin-left:10px;" v-show="authreset" class="serchbtn fl" icon="el-icon-refresh" @click='reset("CustomerUniqueMarker")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        
        <div class="tableData">
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius rightRadius" v-show="authdownload" title="下载" @click="uplistbefore">
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
                     v-if="tableDataSec.customerSign[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerSign"
                        label="商户唯一标识"
                       >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.customerSignLevel[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="customerSignLevel"
                        label="唯一标识风险评级结果"
                         >
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec.bussineNumberCounts[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="bussineNumberCounts"
                        label="下属商编数"
                         >
                    </el-table-column>
                </el-table>
            </div>
            
           <div class="block">
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
                    :page-size="Number(currenteveryno)"
                    :total=length
                    @current-change="handleCurrentChange">
                   </el-pagination>
                </div>
            </div>
            <el-dialog title="商户唯一标识下载：分页选择下载" :visible.sync="downloadOffLine" width="30%" >
                <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="1" class="downClass" >到<input type="number" min="1"  class="downClass" v-model="loadEndNum" >页的数据</div>
                <h4 style="text-align: center">当前共<span>{{totalSize}}</span>页</h4>
                <span slot="footer" class="dialog-footer">
                <el-button @click="downloadOffLineClose">取 消</el-button>
                <el-button type="primary" @click="uploadList">下 载</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect :tableDataSec="tableDataSec" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
    name:'商户唯一标识',
    data(){
      return{
        totalSize:0,
        authsearch:false,
        authreset:false,
        authdownload:false,
        currenteveryno:20,
        serchToggle:true,
        downloadOffLine:false,  //下载
        loadStartNum: 0,//下载
        loadEndNum: 0,//下载
        lsstShow:true,
        lsstTable:[],
        tableDataSec:{  //控制列显示  key和table prop一致
          customerSign:[true,'商户唯一标识'],
          customerSignLevel:[true,'唯一标识风险评级结果'],
          bussineNumberCounts:[true,'下属商编数']
        },
        form:{
          customerSignArr:'',  //商户唯一标识
          customerNumberArr:'',  //商户编号
          signedname:''  //商户签约名
          // startNum:1,
          // endNum:1
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
    downloadOffLineClose(){
      this.downloadOffLine = false
    },
    uplistbefore(){
        this.downloadOffLine=true
        this.loadEndNum = this.totalSize
        if(this.totalSize == 0){
            this.loadStartNum = 0
        }else{
            this.loadStartNum = 1
        }
    },
    uploadList(){
        var self = this

         
        if (this.loadStartNum == 0 || this.loadEndNum == 0) {
            this.$alert('值必须大于或等于1', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
            });
            return
        }
        if (this.totalSize == 0 || this.loadStartNum > this.totalSize || this.loadEndNum > this.totalSize) {
            this.$alert('值必须小于或等于总页数，且不能为0', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
            });
            return
        }
        if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
            this.$alert('起始值需小于结束值', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
            });
            return
        }
        var para1 = {
            pageRow: self.pageRow,
            startNum: self.loadStartNum,
            endNum: self.loadEndNum,
            endPage: self.totalSize
        }
      this.$axios
        .post('/CustomerUniqueMarker/countDownloadUniList',qs.stringify(para1))
        .then(res => {
          var response = res.data
          if (response.code == '200' || response.code == 200) {
            var para = {
              customerSignArr: self.form.customerSignArr,
              customerNumberArr: self.form.customerNumberArr,
              signedname: self.form.signedname,
              startRow: response.data.startRow,
              sumRow: response.data.sumRow
            }
            window.location = self.url + '/CustomerUniqueMarker/downloadList?' + qs.stringify(para)
            this.downloadOffLine = false
          }
        })
    },
    gotoDetail(row){
        window.open('#/merchantIdentityDetail/'+ row.customerSign)
    },
    queryAuthList(){  //权限管理
           var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
         JSON.parse(arr).map(function(ele){
            switch(ele){
                case 549:
                    self.authsearch= true
                break;
                case 550:
                    self.authreset= true
                break;
                case 551:
                    self.authdownload= true
                break;
            }
        })
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/CustomerUniqueMarker/getList","CustomerUniqueMarker",true,val)
    },
    downloadList() {//是否下载
        var self = this
        // if(self.idList.length < 1){
        //     var params = this.processParams('outPay')//入参;
        // }else{
        //     var params = this.processParams('outPay')//入参
        //     params.yeepayNoList = self.idList
        // }
        if(!params){
            return false
        }
        this.$axios.post("/CustomerUniqueMarker/downloadList",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code == '200'){
                    window.location = self.url+"/usRemit/download?" + qs.stringify(params)
            }
        })
    }
  },
  created(){
     this.queryAuthList()
  },
  mounted(){
    //加载页面数据
    this.listQuery("/CustomerUniqueMarker/getList","CustomerUniqueMarker")
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
    height: 44px;
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
    overflow:hidden;
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
    padding-top: 8px;
    padding-bottom: 6px;
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
