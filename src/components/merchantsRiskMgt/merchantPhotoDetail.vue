<!--非Epos交易查询detail-->
<template>
    <div id="MerchantPhotoDetail">
        <!-- 各种table 开始 -->
        <div class="fs18 ">
            <h3 class="dis-inline fs18">商户基本信息</h3>
        </div>
        <table  cellspacing="0" cellpadding="0" style="width:100%;"> 
                <tr align="center">
                    <td  class="bgf5" style="min-width:100px;">商户唯一标识</td>
                    <td style="min-width:100px;">{{detailList.customerSign}}</td>
                    <td  class="bgf5" style="min-width:100px;">商户编号</td>
                    <td style="min-width:100px;">{{detailList.customerNumber}}</td>
                    <td  class="bgf5" style="min-width:100px;">商户签约名</td>
                    <td style="min-width:100px;">{{detailList.signName}}</td>
                    <td class="bgf5" style="min-width:100px;">商户名称</td>
                    <td style="min-width:100px;">{{detailList.signName}}</td>
                     <td class="bgf5" style="min-width:100px;">KYC认定</td>
                    <td style="min-width:100px;">{{detailList.KYCCognizance}}</td>
                     <td class="bgf5" style="min-width:100px;">初始结果</td>
                    <td style="min-width:100px;">{{detailList.kycFirstResult}}</td>
                     <td class="bgf5" style="min-width:100px;">复核结果</td>
                    <td style="min-width:100px;">{{detailList.kycReviewResult}}</td>
                </tr>
                <tr align="center">
                    <td class="bgf5">人工识别结果</td>
                    <td>{{detailList.artificialResults}}</td>
                    <td class="bgf5">唯一标识下商编数</td>
                    <td>{{detailList.customerNumOfcustomerSign}}</td>
                     <td class="bgf5">商户报备标签</td>
                    <td>{{detailList.customerLabel}}</td>
                     <td class="bgf5">商户评级</td>
                    <td>{{detailList.customerCredentialLevel}}</td>
                    <td class="bgf5">销售</td>
                    <td>{{detailList.saleName}}<a href="javascript:void(0)" @click="gotoSale">{{detailList.saleLevel}}</a></td>
                    <td class="bgf5">分公司</td>
                    <td>{{detailList.YEJISHUXING}}<a href="javascript:void(0)" @click="gotoBranchCompanyPhoto">{{detailList.YEJISHUXINGLevel}}</a></td>
                    <td class="bgf5">商户入网日期</td>
                    <td>{{detailList.createDate}}</td>
                </tr>
                 <tr align="center">
                    <td class="bgf5">商户自然属性一级</td>
                    <td>{{detailList.businessCat}}</td>
                    <td class="bgf5">商户自然属性二级</td>
                    <td>{{detailList.subBusinessCat}}</td>
                     <td class="bgf5">行业业绩属性</td>
                    <td>{{detailList.productLine}}</td>
                     <td class="bgf5">代理商编号</td>
                    <td>{{detailList.agentCode}}</td>
                    <td class="bgf5">代理商名称</td>
                    <td>{{detailList.agentName}}</td>
                    <td class="bgf5">营业执照号</td>
                    <td>{{detailList.businessLicence}}</td>
                    <td class="bgf5">特批情况</td>
                    <td>{{detailList.approved}}</td>
                </tr>
                <tr align="center">
                    <td class="bgf5">法人姓名</td>
                    <td>{{detailList.legalName}}</td>
                    <td class="bgf5">法人身份证号</td>
                    <td>{{detailList.legalIdcard}}</td>
                     <td class="bgf5">APP名称</td>
                    <td>{{detailList.appName}}</td>
                    <td class="bgf5">公众号名称</td>
                    <td>{{detailList.officialAccountName}}</td>
                    <td class="bgf5">上一次巡检结果</td>
                    <td>{{detailList.inspectionResult}}</td>
                    <td class="bgf5">上一次巡检日期</td>
                    <td>{{detailList.inspectionDate}}</td>
                    <td class="bgf5"></td>
                    <td></td>
                </tr>
                 <tr align="center">
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;">报备网址</td>
                    <td colspan="3">{{detailList.timeInterval}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;">投诉举报次数</td>
                    <td>{{detailList.contactMobile}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;">舆情次数</td>
                    <td>{{detailList.cardNo}}</td>
                     <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                    <td class="bgf5" style="border-bottom:1px solid #ebeef5;"></td>
                    <td>{{detailList.cardHolderId}}</td>
                </tr>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户核查单情况(近30天)</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shhcdqk",$event)'></i>总计：<span>2</span> 条
        </div>
        <el-table
            :data="shhcdqk"
            border
            style="width: 100%">
            <el-table-column
              prop="checkList"
              label="核查单号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="time"
              label="生成时间"
              width="220">
            </el-table-column>
            <el-table-column
              prop="dealStatus"
              width="100"
              label="处理状态">
            </el-table-column>
            <el-table-column
              prop="riskDeal"
              width="100"
              label="风险处理">
            </el-table-column>
            <el-table-column
              prop="checkListSource"
              width="100"
              label="核查单来源">
            </el-table-column>
            <el-table-column
              prop="acceptanceTime"
              width="200"
              label="受理日期">
            </el-table-column>
            <el-table-column
              prop="somplaintSource"
              width="100"
              label="投诉来源">
            </el-table-column>
            <el-table-column
              prop="somplaintReason"
              width="140"
              label="投诉原因">
            </el-table-column>
            <el-table-column
              prop="reportType"
              width="100"
              label="举报类型">
            </el-table-column>
            <el-table-column
              prop="triggerRules"
              width="120"
              label="触发规则">
            </el-table-column>
            <el-table-column
              prop="kycResult"
              width="100"
              label="KYC结果值">
            </el-table-column>
            <el-table-column
              prop="ruleScore"
              width="100"
              label="规则分值">
            </el-table-column>
            <el-table-column
              prop="publicSentimentNews"
              width="240"
              label="舆情新闻">
            </el-table-column>
            <el-table-column
              prop="publicSentimentAbstract"
              width="220"
              label="舆情摘要">
            </el-table-column>
            <el-table-column
              prop="publicSentimentAbstract"
              width="100"
              label="最后操作人">
            </el-table-column>
            <el-table-column
              prop="lastModifedTime"
              width="200"
              label="最后操作时间">
            </el-table-column>
            <el-table-column
              prop="remarks"
              width="180"
              label="备注">
            </el-table-column>
          </el-table>
          <div class="block">
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :total=length1
                @current-change="handleCurrentChange1">
               </el-pagination>
               
            </div>
          </div>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户舆情信息</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shyqxx",$event)'></i>总计：<span>2</span> 条
        </div>
        <el-table
          border
          :data="shyqxx"
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="舆情日期"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="舆情新闻"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="舆情摘要">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="舆情等级">
          </el-table-column>
        </el-table>
        <div class="block">
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :total=length2
                @current-change="handleCurrentChange2">
               </el-pagination>
               
            </div>
        </div>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户评级详情</h3>
        </div>
        <el-table
          border
          :data="shpjxq"
          style="width: 100%">
          <el-table-column
            prop="date"
            align="center"
            label="评级日期"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="评级结果"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="计算公式(权重*欺诈金额/交易金额+权重*投诉金额/交易金额)">
          </el-table-column>
        </el-table>
        <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户状态管理</h3> 
        </div>
        <table class="table" :data="shztgl" cellspacing="0" cellpadding="0" border="0" style="width:100%;">  <tr>
              <th class="bgf5">类型</th>
              <th class="bgf5">当前状态</th>
              <th class="bgf5">备注</th>
              <th class="bgf5">最后操作日期</th>
              <th class="bgf5">操作</th>
          </tr>
          <tbody>
              <tr :data="zhdata">
                  <td class="bgf5">账户状态</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><a class="blue" href="javascript:;" @click="caozuo('关闭')">关闭</a></td>
              </tr>
              <tr :data="khdata">
                  <td class="bgf5">客户状态</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><a class="blue" href="javascript:;" @click="caozuo('关闭')">关闭</a></td>
              </tr>
          </tbody>
        </table>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户开通产品</h3><i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shktcp",$event)'></i>  <span class="blue " style="margin-left:50px;">批量操作</span>
        </div>
        <el-table
          border
          @cell-click="xxx"
          @selection-change="selectedItemsid"
          :data="shktcp"
          style="width: 100%">
          <el-table-column
              type="selection"
              width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            align="center"
            label="基础产品"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="零售产品"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="更新日期">
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="关闭/开通原因">
          </el-table-column>
          <el-table-column
            prop="caozuo"
            align="center"
            label="操作"
            >
          </el-table-column>
        </el-table>
        <div class="block">
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :total=length3
                @current-change="handleCurrentChange3">
               </el-pagination>
               
            </div>
        </div>
         <!-- end -->
        <div class="fs18 mt30">
            <h3 class="dis-inline fs18">商户投诉情况</h3> <i class="el-icon-arrow-down fs24 mr30" @click='openandclose("shtsqk",$event)'></i>
        </div>
        <el-table
          border
          :data="shtsqk"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="受理日期"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            label="投诉来源">
          </el-table-column>
          <el-table-column
            prop="name"
            label="投诉原因"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="举报方式">
          </el-table-column>
           <el-table-column
            prop="name"
            label="投诉类型"
           >
          </el-table-column>
          <el-table-column
            prop="address"
            label="投诉人">
          </el-table-column>
          <el-table-column
            prop="address"
            label="联系方式">
          </el-table-column>
          
        </el-table>
        <div class="block clear" >
            <div class='paginationRight'>
               <el-pagination
                layout="total,prev, pager, next"
                :total=length4
                @current-change="handleCurrentChange4">
               </el-pagination>
               
            </div>
        </div>

        <!-- 图表 -->
        <div class="mt20 mb30 w clear">
            <div class="fl" style="width:44%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户交易毛利情况趋势</h3> 
                <div class="mb20 ml30">
                     <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                </div>
                <div id="myChart1" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div>
            <div class="fl" style="width:26%;margin-left:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户投诉情况</h3> 
                <div class="mb20 ml30">
                    <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                </div>
                <div id="myChart2" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
            <div class="fl" style="width:26%;margin-left:1%;margin-right:1%;">
                <h3 class="dis-inline fs18 ml30" style="background:#409EFF;color:white;padding:5px 10px;">商户综合费率及万元毛利收益</h3> 
                <div class="mb20 ml30">
                     <span class="active time mr30" @click='getChartData("myChart1","1",$event)'>近14天</span>
                    <span class="time mr30" @click='getChartData("myChart1","2",$event)'>近8周</span>
                    <span class="time" @click='getChartData("myChart1","3",$event)'>近6个月</span>
                </div>
                <div id="myChart3" class="center" :style="{width: '100%', height: '280px'}"></div>
            </div> 
        </div>
           
    </div>
</template>
<script>
import qs from 'qs';
var loadingTicket1,loadingTicket2,loadingTicket3,myChart1,myChart2,myChart3
export default {
    name:"商户核查单详情",
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        }
    },
    data(){
        return{
            formLabelWidth: '150px',
             isprtypetext:'请至少选择一种产品类型',
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:true,//审核核查单弹框显示与隐藏
            processElementVisible1:false,//处理弹框显示与隐藏
            source:'kyc',
            shztgl:[],
            shpjxq:[],
            idList:[],//表格中选中的行idlist
            length1:0,
            pageNumber1:1,
            pageRow1:10,
            length2:0,
            pageNumber2:1,
            pageRow2:10,
            length3:0,
            pageNumber3:1,
            pageRow3:10,
            length4:0,
            pageNumber4:1,
            pageRow4:10,
            detailList:{"YEJISHUXING":'北京'},//商户基本信息
            expandshhcdqk:[],
            expandshyqxx:[],
            expandshktcp:[],
            expandshtsqk:[],
            shhcdqk:[{//商户核查单情况(近30天
              "date":'1',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }],
            shyqxx:[],
            shtsqk:[],
            shktcp:[{//商户开通产品
              "date":'1',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "caozuo":'xx',
            },{
              "date":'3',
              "name":'xx',
              "ddd":'xx',
              "fff":'xx',
              "sss":'xx',
              "ccc":'xx',
              "www":'xx',
            }],//商户情况
            zhdata:{},
            khdata:{}
        }
    },
    mounted(){  //取详情列表
      this.drawLine1();
      this.drawLine2();
      this.drawLine3();
      this.getAllDetail()  //所有详情
      this.expandshhcdqk = this.shhcdqk
     this.expandshyqxx = this.shyqxx
     this.expandshktcp = this.shktcp
     this.expandshtsqk = this.shtsqk
    },
    methods:{
      getAllDetail(){  //获取所有列表信息
        var self = this
        var param = {
          customerNumber : self.$route.params.customerNumber
        }
        this.$axios.post('/CustomerInfoController/queryPortaritDetailsByCustomerNum',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            self.detailList = response.data.baseInfo   //基本信息
            self.shpjxq = response.data.shanghupingji  //商户评级详情
            // self.shpjxq = response.data.zhuangtaiguanli  //状态管理
            self.shyqxx = response.data.shanghuyuqing  //商户舆情
            self.shktcp = response.data.kaitongchanpin  //开通产品
            self.shtsqk = response.data.tousuqingkuang  //投诉情况
            self.shhcdqk = response.data.merchantCheckList  //商户核查单情况近30天
          }else{
            console.log(response.msg)
          }
        }) 
      },
      getMerchantStatus(para){  //商户状态管理    
        var self = this
        var param = {
          type : self.$route.params.customerSign,
        }
        this.$axios.post('/CustomerInfoController/changeAccountStatus',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            self.detailList[0] = self.$route.params.customerSign
            self.detailList[1] = self.$route.params.customerSignLevel
            self.detailList[2] = self.$route.params.bussineNumberCounts
            self.shqk = response.data.customerisituation
            self.shktqk = response.data.customeproduct
          }else{
            this.failTip(response.errMsg)
          }
        }) 
      },
      gotoBranchCompanyPhoto(){  //跳转分公司画像
        window.open('#/branchCompanyPhoto/'+this.detailList.YEJISHUXING)
      },
      gotoSale(){  //跳转销售
        window.open('#/manager/salesPortrait/'+this.detailList.saleName)
      },
      handleCurrentChange1(val) {  //处理当前页
         this.pageNumber1 = `${val}`  //当前页
         this.getChartData()
      },
      handleCurrentChange2(val) {  //处理当前页
         this.pageNumber2 = `${val}`  //当前页
         this.getChartData()
      },
      handleCurrentChange3(val) {  //处理当前页
         this.pageNumber3 = `${val}`  //当前页
         this.getChartData()
      },
      handleCurrentChange4(val) {  //处理当前页
         this.pageNumber4 = `${val}`  //当前页
         this.getChartData()
      },
      xxx(row, column, cell, event){
        if(column.label == '操作'){
          this.caozuo(row.caozuo)
        }
      },
      caozuo(text){
        this.$confirm('确认'+text+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback:function(item){
            if(item == 'confirm'){
              params.id = self.idList.join(',')
              self.$axios.post('/url',qs.stringify(params)).then(res => {
                var response = res.data
                if(response.code == '200'){
                  self.listQuery("/xxx","cuscheckimmune")
                   self.$message({  //成功弹框
                      showClose: true,
                      message: '删除成功',
                      type: 'success'
                });
                }else{
                  this.$message.error({message:response.msg,center: true});
                }
              }) 
              
            }
          }
        }) 
      },
     openandclose(data,obj){  //表格得收缩与展开显示
        var self = this
        if(obj.target.classList.contains('el-icon-arrow-down')){
          obj.target.classList.remove('el-icon-arrow-down')
          obj.target.classList.add('el-icon-arrow-up')
          switch(data){
            case 'shhcdqk':  //商户核查单情况
              var temp = self.shhcdqk
              self.shhcdqk = [temp[0]]
            break;
            case 'shyqxx':  //商户舆情信息
              var temp = self.shyqxx
              self.shyqxx = [temp[0]]
            break;
            case 'shktcp':  //商户开通产品
              var temp = self.shktcp
              self.shktcp = [temp[0]]
            break;
            case 'shtsqk':  //商户投诉情况
              var temp = self.shtsqk
              self.shtsqk = [temp[0]]
            break;
          }
        }else{
          obj.target.classList.add('el-icon-arrow-down')
          obj.target.classList.remove('el-icon-arrow-up')
          switch(data){
            case 'shhcdqk':
              self.shhcdqk  = self.expandshhcdqk
            break;
            case 'shyqxx':
              self.shyqxx  = self.expandshyqxx
            break;
            case 'shktcp':
              self.shktcp  = self.expandshktcp
            break;
            case 'shtsqk':
              self.shtsqk  = self.expandshtsqk
            break;
          } 
        }
      },
      clickActive(targ){
        Array.from(targ.parentNode.children).map(function(ele){
          ele.classList.remove('active')
        })
      },
      getChartData(id,flag,targ){
        var otarg = targ.target
        this.clickActive(otarg)
        otarg.classList.add('active')
        
        switch(id){
          case 'myChart1':
            this.getChartData1(id,flag)
          break;
          case 'myChart2':
            this.getChartData2(id,flag)
          break;
          case 'myChart3':
            this.getChartData3(id,flag)
          break;
        }
      },
      getChartData1(id,flag){
        var self = this
        var param = {
          "merchantno":1,
          "time":flag
        }
        this.$axios.post('url1',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData1()
              self.drawLine1()
              return false
            }
            option1.xAxis[0].data = response.data.times  //时间
            option1.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
            option1.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
            self.drawLine1() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      getChartData2(id,flag){
        var self = this
        var param = {
          "merchantno":1,
          "time":flag
        }
        this.$axios.post('url3',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData2()
              self.drawLine2()
              return false
            }
            option2.xAxis[0].data = response.data.times  //时间
            option2.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
            option2.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
            self.drawLine2() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      getChartData3(id,flag){
        var self = this
        var param = {
          "merchantno":1,
          "time":flag
        }
        this.$axios.post('url3',qs.stringify(param)).then(res => {
          var response = res.data
          if(response.code == '200'){
            if(JSON.stringify(response.data) == "{}"){
              self.clearData3()
              self.drawLine3()
              return false
            }
            option3.xAxis[0].data = response.data.times  //时间
            option3.series[0].data = this.dostr(response.data.transactionMoney) //成功交易额(yi元)
            option3.series[1].data = this.dostr(response.data.fraudMoney) //成功欺诈额(万元)
            self.drawLine3() 
          }else{
            this.$message.error({message:response.msg,center: true});
          }
        })
      },
      drawLine1(){
          // 基于准备好的dom，初始化echarts实例
           myChart1 = this.$echarts.init(document.getElementById('myChart1'))
          // 绘制图表
          myChart1.clear()
           loadingTicket1 = setTimeout(function (){
                myChart1.hideLoading();
                myChart1.setOption(option1);
                clearTimeout(loadingTicket1);
               
            },2000);
          myChart1.showLoading({
              text : '数据拼命加载中...',
              effect :"whirling" ,
              textStyle : {
                  fontSize : 16
              },
              effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
          });
      },
      drawLine2(){
          // 基于准备好的dom，初始化echarts实例
           myChart2 = this.$echarts.init(document.getElementById('myChart2'))
          // 绘制图表
          myChart2.clear()
          loadingTicket2 = setTimeout(function (){
                myChart2.hideLoading();
                myChart2.setOption(option2);
                clearTimeout(loadingTicket2);
               
            },2000);
          myChart2.showLoading({
              text : '数据拼命加载中...',
              effect :"whirling" ,
              textStyle : {
                  fontSize : 16
              },
              effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
          });
      },
      drawLine3(){
          // 基于准备好的dom，初始化echarts实例
           myChart3 = this.$echarts.init(document.getElementById('myChart3'))
          // 绘制图表
          myChart3.clear()
          loadingTicket3 = setTimeout(function (){
                myChart3.hideLoading();
                myChart3.setOption(option3);
                clearTimeout(loadingTicket3);
               
            },2000);
          myChart3.showLoading({
              text : '数据拼命加载中...',
              effect :"whirling" ,
              textStyle : {
                  fontSize : 16
              },
              effectOption: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}
          });
      },
    }
}
var color= ['#E0CDD1','#FBEBDC','#788A72','#C8B8A9','#C8B8A9','#D6D4C8','#F2EEED','#FBE8DA','#FBE8DA','#B7C6B3','#A47C7C','#C2C8D8','#7A7385','#E0CDD3','#B3B1A4','#A0A5BB','#D7C9AF',]
var option1 = {
    title : {
        text: '',
         x: 'center'
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
         function addCommas(nStr){  //每三位分隔符
             nStr += '';
             var x = nStr.split('.');
             var x1 = x[0];
             var x2 = x.length > 1 ? '.' + x[1] : '';
             var rgx = /(\d+)(\d{3})/;
             while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
             }
             return x1 + x2;
          }
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==0 || index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index == 2){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }
          })
          return str0+str
        }
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    grid:{
      x2:30,
    },
    legend: {
        y:'10px',
        x:'center',
        data:['收单金额',' ','xxx(0.01BP)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['08/01'],
          axisLabel:{
              rotate: 30,
              show: true,
              interval: 0,
              textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700

              }
          },
          axisTick: {
                show: true,     //设置x轴上标点显示
                length: 2,    // 设置x轴上标点显示长度
                lineStyle: {     //设置x轴上标点显示样式
                    color: '#ddd',
                    width: 1,
                    type: 'solid'
                }
          }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '亿元/万元',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name:'0.01BP',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:'收单金额',
            type:'bar',
            data:[1000,200],
            itemStyle:{
                normal:{
                    color:color[9]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
          barMaxWidth:10,
            name:' ',
            type:'bar',
            data:[2220,300],
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[3]  //改变珠子颜色
                }
            }
        },
        {
          symbol: "none",// 去掉折线上面的小圆点
            name:'xxx(0.01BP)',
            type:'line',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[10]  //改变珠子颜色
                }
            },
            data:[70.5,4.66,200] },
    ]
};
var option2 = {
    title : {
        text: '',
         x: 'center'
    },
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
          var str0=''
          var str=''
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
            
          })
          return str0+str
        },
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户投诉率(交易笔数)','商户投诉率(交易金额)']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],
    
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:20 ,
             textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700
              }
            }
        }
  ],
    grid: {
        x2:6,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '投诉率',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易笔数)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[0]  //改变珠子颜色
                }
            },
            data: [30,20,40,90,80,40,10.5,50]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '商户投诉率(交易金额)',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[1]  //改变珠子颜色
                }
            },
            data: [10,90,70,40,80,20,30,50]
        }
    ]
}
var option3 = {
    title : {
        text: '',
         x: 'center'
    },
    toolbox: {
       show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    tooltip: {
        trigger: 'axis',
        formatter:function (params) {
         function addCommas(nStr){  //每三位分隔符
             nStr += '';
             var x = nStr.split('.');
             var x1 = x[0];
             var x2 = x.length > 1 ? '.' + x[1] : '';
             var rgx = /(\d+)(\d{3})/;
             while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + ',' + '$2');
             }
             return x1 + x2;
          }
          var str0=''
          var str=''
          if(item[2].toString().indexOf('%') == -1){
              str+=item[2].toFixed(2)+'%\<br>'
            }else{
              str+=item[2]+'\<br>'
            }
          params.map(function(item,index){
            str0=item[1]+'\<br>'
            str+=item[0]+': '
            if(index==1){
              str+=addCommas(Number(item[2]).toFixed(2))+'\<br>'
            }
            if(index == 0){
              str+=Number(item[2]).toFixed(2)+'\<br>'
            }
          })
          return str0+str
        }
    },
    legend: {
        y:'10px',
        textStyle:{
            fontSize:10,
            color:'black'

        },
        itemGap:-1,
        data:['商户综合费率','万元毛利收益']
    },
    xAxis: [
        {
          splitLine:{show: false},//去除网格线
            type: 'category',
            data: ['08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01','08/01-09/01'],
    
            boundaryGap : true,   ////////控制 
            axisLabel: {  
             interval:0, ////////控制 
             rotate:20 ,
             textStyle:{
                fontSize:12,
                color:'black',
                fontWeight:700
              }
            }
        }
  ],
    grid: {
        x2:36,
        y2: 60,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上  控制x轴刻度线高度
    },
    yAxis: [
        {
            type: 'value',
            name: '',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        {
            type: 'value',
            name:'',
           splitNumber:5,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            symbol: "none",// 去掉折线上面的小圆点
            name: '商户综合费率',
            type: 'line',
            itemStyle:{
                normal:{
                    color:color[7]  //改变珠子颜色
                }
            },
            data: [60,80,20,90,100,10,30,40]
        },
        {
           symbol: "none",// 去掉折线上面的小圆点
            name: '万元毛利收益',
            type: 'line',
            yAxisIndex: 1,
            itemStyle:{
                normal:{
                    color:color[10]  //改变珠子颜色
                }
            },
            data: [30,100,20,60,10,90,30,40]
        }
    ]
};
</script>
<style scoped lang="less">
.active{background:#ecf5ff;color:#409eff;border-color:#b3d8ff;padding:6px 10px;border-radius: 100%;}
.time{padding:6px 10px;border-radius: 100%;}
.time:hover{background: #409eff;color:white;cursor:pointer;}
.el-icon-arrow-up:before{color:#999;}
.el-icon-arrow-down:before{font-weight:800;color:#999;}
table{border-right:1px solid #ebeef5;font-size:12px;border-bottom: 1px solid #ebeef5;}
td{border:solid #ebeef5; border-width:1px 0px 0px 1px;height: 50px;color:#636363;}
.bgf5{background: #F5F6FA;text-align: center;}  
table.table{
    border:1px solid #ebeef5;
    td{border-top:1px solid #ebeef5; border-right:none;height: 50px;text-align: center;color:#636363;}
    th{color:#636363;height: 50px;}
}

.blue{
color:#409eff;
cursor: pointer;
}
</style>
