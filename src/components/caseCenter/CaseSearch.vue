<template>
  <!--案件查询-->
  <div>
        <div class="searchBasic">
            <div class="title" @click="serchToggleC" style="cursor:pointer">
                <i class="el-icon-arrow-down toggleIcon" id="ordinarySerch"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="案件开始时间:">
                                    <el-date-picker v-model="sCaseTime"
                                    value-format='yyyy-MM-dd HH:mm:ss' type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='beginTime'
                                    @focus='beginTimeFocus'
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="案件结束时间:">
                                    <el-date-picker v-model="eCaseTime" value-format='yyyy-MM-dd HH:mm:ss'
                                    type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='endTime' @focus="endTimeFocus"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件状态:">
                                    <el-select v-model="caseStatus" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='getajzt'>
                                        <el-option v-for="item in this.ajzt" :key="item.sysconid" :label="item.sysname" :value="item.sysconid"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="交易开始时间:">
                                    <el-date-picker v-model="sTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='sTransactionTimeBegin' @focus='sTransactionTimeFocus'
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass hideTimeRightIcon">
                                <el-form-item label="交易结束时间:">
                                    <el-date-picker v-model="eTransactionTime"
                                    value-format='yyyy-MM-dd HH:mm:ss'  type="datetime"
                                    placeholder="选择日期时间" style="width: 90%;max-width:225px;"
                                    id='eTransactionTimeEnd' @focus="eTransactionTimeFocus"
                                    ></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户订单号:">
                                      <el-input v-model="merchantOrder"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件类型:">
                                    <el-select v-model="caseType" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='getajlx'>
                                        <el-option v-for="item in ajlx" :key="item.sysconid" :label="item.sysname" :value="item.sysconid"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="被盗银行卡:">
                                    <el-input v-model="stolenCardNumber"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="创建人:">

                                    <el-select v-model="created" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getPersonList">
                                       <el-option :label="item.userName" :value="item.userId" v-for='(item,index) in personList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent divserchbtn">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 50px;" @click="getData" v-if='searchShowHide'></el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refresh" v-if="resetPermission"></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch">
            <div class="title" style="cursor:pointer"  @click="seniorSearchToggleC">
                <i class="el-icon-arrow-down toggleIcon" id="advancedSerch"></i>
                <span >高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent" v-show="seniorSearchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户编号:">
                                    <el-input v-model="merchantId"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="案件号:">
                                    <el-input v-model="id"  placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="来源:">
                                    <el-select v-model="source" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='getly'>
                                        <el-option v-for="item in this.ly" :key="item.id" :label="item.sysname" :value="item.sysconid"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="受理人员:">
                                    <el-select v-model="acceptedPersonnel" placeholder="请选择" style="width: 90%;max-width:225px;" @focus="getAcceptPersonList">
                                        <el-option :label="item.userName" :value="item.userId" v-for='(item,index) in acceptPersonList' :key='index'></el-option>

                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="业务线:">
                                    <el-select v-model="businessLine" placeholder="请选择" style="width: 90%;max-width:225px;" @focus='getywx'>
                                        <el-option v-for="item in this.ywx" :key="item.id" :label="item.sysname" :value="item.sysconid"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;" @click="getData" v-if='showSeniorHide'></el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click="refresh"></el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="contentBotoom">
            <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn leftRadius" @click="newCase" title='创建案件' v-if='createCase'>
                        <div class="addIcon"></div>
                    </div>
                    <div class="BotoomBtn"  @click="importe = true" title='导入' v-if='importCase'>
                        <div class="amendIconIcon"></div>
                    </div>
                    <div class="BotoomBtn" @click="allocationOpen" title='分配' v-if='allotBtnShow'>
                        <div class="icon3"></div>
                    </div>
                    <div class="BotoomBtn" @click="removeData" title='删除' v-if='delShowBtn'>
                        <div class="remouve"></div>
                    </div>
                    <div class="BotoomBtn" @click="dlDetailsOpen" title='下载列表' v-if='importShowList'>
                        <div class="refreshIcon"></div>
                    </div>
                    <div class="BotoomBtn rightRadius" @click="downloadOpen" title='下载详情' v-if='importShowDetail'>
                        <div class="removIconIcon"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentData">
            <div class="dataTable clear">
                <el-table
                    fixed
                    max-height="600"
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange"
                    @row-dblclick="caseMgt"
                    style="width: 100%"
                    >
                    <el-table-column
                        type="selection"
                        width="55"
                        align='center'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="id"
                        label="案件号"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="stolenCardNumber"
                        width="200px"
                        label="被盗银行卡号"
                        align='center'>
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    {{ scope.row.stolenCardNumber}}
                                <div slot="reference" >
                                    {{ scope.row.stolenCardNumberCopy }}
                                </div>
                                </el-popover>
                            </template>
                    </el-table-column>
                    <el-table-column
                        prop="merchantId"
                        width='130px'
                        label="商户编号"
                        align='center'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="merchantOrder"
                        width="130px"
                        label="商户订单号"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caseType"
                        width='100px'
                        label="案件类型"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="source"
                        label="来源"
                        width='100px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caseStatus"
                        label="案件状态"
                        width='100px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="refusedAmount"
                        width="130px"
                        label="拒付金额（元）"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="bearMoney"
                        width="190px"
                        label="商户和易宝承担金额（元）"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="actualPaymentMoney"
                        width="190px"
                        label="易宝实际赔付金额（元）"
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="acceptedPersonnel"
                        label="受理人员"
                        width='100px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="created"
                        label="创建人"
                        width='120px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="businessLine"
                        label="业务线"
                        width='100px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="创建时间"
                        width='150px'
                        align='center'
                    >
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width='150px'
                        align='center'
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <div class='pagination'>
                  <span>每页显示</span>
                  <select  class="evetotal"  @change="handleSizeChange($event)">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                  </select>
              </div>
              <div class='paginationRight'>
                  <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total=totalSize
                    :page-size=pageSize
                    :page-sizes="[10,20,30,40]">
                  </el-pagination>
              </div>
            </div>
        </div>
        <el-dialog title="从Excel导入到案件" :visible.sync="importe" width="570px" >
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadModel">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="fileData"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input :value=valueText class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename" @click='fileChangeClick'  @change='fileChange'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button type="primary" @click="upload">导 入</el-button>
                <el-button @click="importeBtn">取 消</el-button>
                    <div class="promptText" v-show="helpTitle">
                        <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
                        <el-table
                        :data="titleData"
                        border
                        style="width: 100%;text-align:left;">
                        <el-table-column
                            prop="name"
                            label="字段名">
                        </el-table-column>
                        <el-table-column
                            prop="help"
                            label="字段格式要求">
                        </el-table-column>
                        </el-table>
                    </div>
            </span>
        </el-dialog>
        <el-dialog title="分配" :visible.sync="allocation" width="30%" >
            <div style="width: 270px;margin: 0 auto;padding: 10px 0px 20px 0px;">
                <label>分配至</label>
                <el-select v-model="allocationText" placeholder="请选择" @focus="getFp">
                    <el-option v-for="item in this.getFpData"  :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allocation = false">取 消</el-button>
                <el-button type="primary" @click="allocationAdd">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="案件详情：分页选择下载" :visible.sync="download" width="30%">
            <div style="text-align: center; margin-bottom:20px;">选择下载从
                <input type="number" v-model="loadStartNum" min="1" class="downClass" >到
                <input type="number" min="1" :max=totalNum  class="downClass" v-model="loadEndNum" >页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{totalNum}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="downloadClose">取 消</el-button>
            <el-button type="primary" @click="uploadMgt" v-if="this.tableData.length != ''">下 载</el-button>
            </span>
        </el-dialog>
        <el-dialog title="案件列表：分页选择下载" :visible.sync="dlDetails" width="30%">
                <div style="text-align: center; margin-bottom:20px;">选择下载从
                    <input type="number" v-model="loadStartNum"  min="1" class="downClass" >到
                    <input type="number" min="1" :max=totalNum  class="downClass" v-model="loadEndNum" >页的数据
                </div>
                <h4 style="text-align: center">当前共<span>{{totalNum}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dlDetailsClose">取 消</el-button>
            <el-button type="primary" @click="uploadList" v-if="this.tableData.length != ''">下 载</el-button>
            </span>
        </el-dialog>
  </div>
</template>
<script>
  import qs from "qs"
  import {card,phone,idCard} from '../utils'

  export default {
      name:'案件查询',
    data() {
      return {
          createCase:false,
          importCase:false,
          allotBtnShow:false,
          delShowBtn:false,
          importShowList:false,
          importShowDetail:false,
          searchShowHide:false,
          showSeniorHide:true,
          viewCaseDetailPermission: true,//双击查看案件详情
          resetPermission: false,//重置

          valueText:'',
        loadEndNum:'',
        loadStartNum:'',
        download:false,
        dlDetails:false,
        totalNum:0,
        multipleSelection:[],
        allocationText:'',
        allocation:false,
        acceptPersonList:[],
        personList:[],
        file:'',
        fileData:'',
        titleData:[
            {
                name:'商户编号',
                help:'必填，文本格式，100字以内',
            },
            {
                name:'商户订单',
                help:'必填，文本格式，100字以内',
            },
            {
                name:'商户和易宝承担金额',
                help:'选填，单位：元',
            },
            {
                name:'易宝实际赔付金额',
                help:'选填，单位：元',
            },
            {
                name:'案件类型',
                help:'必填，枚举：恶意拒付、盗卡交易',
            },
            {
                name:'备注',
                help:'选填，文本格式，字数200字以内',
            },
        ],
        helpTitle:false,
        importe:false,
        ceshi:'',
        tableData:[],
        seniorSearchToggle:false,
        serchToggle:true,

        sCaseTime:'',
        eCaseTime:'',
        caseStatus:'',
        sTransactionTime:'',
        eTransactionTime:'',
        merchantOrder:'',
        caseType:'',
        stolenCardNumber:'',
        created:'',
        merchantId:'',
        id:'',
        source:'',
        acceptedPersonnel:'',
        businessLine:'',


        pageSize:10,
        pageNum:1,
        totalSize:0,
        getFpData:[],


        ajzt:'',
        ajlx:'',
        ywx:'',
        ly:'',

        rules: {
        },
        form:{},
      };
    },

    methods: {
        getly(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                type:'74',
            }))
            .then(res => {
              this.ly = res.data
              console.log(res)
              // console.log(this.ly)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getajlx(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                type:'73',
            }))
            .then(res => {
              console.log(res)
              this.ajlx = res.data

              // console.log(this.ajlx)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getywx(){
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                type:'75',
            }))
            .then(res => {
              this.ywx = res.data
            //   console.log(res)
              // console.log(this.ywx)
            })
            .catch(error => {
                console.log(error)
            })
        },
        getajzt(){
            console.log(111)
            this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                type:'72',
            }))
            .then(res => {
                this.ajzt = []
              this.ajzt = res.data
                console.log(res.data)
              // console.log(this.ajzt)
            })
            .catch(error => {
                console.log(error)
            })
        },
        // 获取数据列表
        getData(){
            // console.log(localStorage.getItem('SID'))
            // console.log(this.sCaseTime)
            // console.log(this.eCaseTime)
            // console.log(this.eTransactionTime)
            // console.log(this.merchantOrder)
            // console.log(this.caseType)
            // console.log(this.caseStatus)
            // console.log(this.stolenCardNumber)
            // console.log(this.created)
            // console.log(this.merchantId)
            // console.log(this.id)
            // console.log(this.source)
            // console.log(this.acceptedPersonnel)
            // console.log(this.businessLine)
            // console.log(this.pageNum)
            // console.log(this.pageSize)


            var caseStatusNone
            if(this.caseStatus == 658){
               caseStatusNone = ''
            }else if(this.caseStatus != 658){
                caseStatusNone = this.caseStatus
            }

            var sourceNone
            if(this.source == 668){
               sourceNone = ''
            }else if(this.source != 668){
                sourceNone = this.source
            }

            var caseTypeNone
            if(this.caseType == 664){
               caseTypeNone = ''
            }else if(this.caseType != 664){
                caseTypeNone = this.caseType
            }


            this.$axios.post('/CaseInquiryController/queryCaseList',qs.stringify({
                sessionId:localStorage.getItem('SID'),
                sCaseTime:this.sCaseTime,
                eCaseTime:this.eCaseTime,
                caseStatus:caseStatusNone,
                sTransactionTime:this.sTransactionTime,
                eTransactionTime:this.eTransactionTime,
                merchantOrder:this.merchantOrder,
                caseType:caseTypeNone,
                stolenCardNumber:this.stolenCardNumber,
                created:this.created,
                merchantId:this.merchantId,
                id:this.id,
                source:sourceNone,
                acceptedPersonnel:this.acceptedPersonnel,
                businessLine:this.businessLine,
                pageNum:this.pageNum,
                pageSize:this.pageSize,
            }))
            .then(res => {
                console.log(sourceNone)
                console.log(caseStatusNone)
                console.log(caseTypeNone)
                console.log('------------------------------------------')
                console.log(res)
                this.totalSize = res.data.totalSize
                this.totalNum = Math.ceil(this.totalSize/this.pageSize)
                this.tableData = res.data.recordList

                this.tableData.forEach(ele => {
                    ele.stolenCardNumberCopy = ''
                    if(ele.stolenCardNumber === ''){
                        ele.stolenCardNumberCopy = ele.stolenCardNumber
                    }else if(ele.stolenCardNumber !== ''){
                        ele.stolenCardNumberCopy = card(ele.stolenCardNumber)
                    }
                })


            })
            .catch(error => {
                console.log(error)
            })
        },

        downloadClose(){
          this.download = false;
          this.loadStartNum = ''
          this.loadEndNum = ''
        },
        dlDetailsClose(){
            this.dlDetails = false;
            this.loadStartNum = ''
            this.loadEndNum = ''
        },
        removeData(){

            let arr = []
            this.multipleSelection.forEach(ele => {
                arr.push(ele.id)
            })
            console.log(arr.join(','))
            if(this.multipleSelection.length == 0 ){
                this.$alert('请至少选择一条数据', '系统提示', {
                        confirmButtonText: '确定',
                        type:'warning',
                });
            }else if(this.multipleSelection.length > 0){

                this.$confirm('确认删除记录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal:false,
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/CaseInquiryController/deleteCase',qs.stringify({
                        'sessionId':localStorage.getItem('SID'),
                        'ids':arr.join(',')
                    }))
                    .then(res=>{
                        console.log(res.data)
                        if(res.data.code === 1){
                            this.$alert('删除成功', '系统提示', {
                                type:'success',
                                confirmButtonText: '确定',
                                callback:action=>{
                                    this.getData()
                                }
                            });

                        }else if(res.data.code !== 1){
                            this.$alert(res.data.message, '系统提示', {
                                type:'warning',
                                confirmButtonText: '确定',
                            });
                        }
                    })

                })


            }
        },
        allocationAdd(){

            let arr = []
            for(let i = 0; i<this.multipleSelection.length;i++){
                arr.push(this.multipleSelection[i].id)
            }

            this.$axios.post('/CaseInquiryController/distribution',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
                'ids':arr.join(','),
                'userId':this.allocationText
            }))
            .then(res => {
                console.log(res.data)
                if(res.data.code === 1){
                    this.$alert('操作成功', '系统提示', {
                        confirmButtonText: '确定',
                        type:'success'
                    });
                    this.allocation = false
                    this.getData()
                    this.allocationText = ''
                }else if(res.data.code !== 1){
                    this.$alert('操作失败', '系统提示', {
                        confirmButtonText: '确定',
                        type:'warning'
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })


        },
        allocationOpen(){
            if(this.multipleSelection.length == 0){
            this.$alert('请选择至少一条需要分配的数据', '系统提示', {
                confirmButtonText: '确定',
                type: 'warning'
            });
            }else{
                this.allocation = true;
            }
        },
        serchToggleC(){
            this.serchToggle = !this.serchToggle
            var ordinarySerch = document.getElementById("ordinarySerch")
            if(this.serchToggle == false){
                ordinarySerch.style.transform = 'rotate(180deg)'
            }else if (this.serchToggle != false){
                ordinarySerch.style.transform = 'rotate(0deg)'
            }
        },
        seniorSearchToggleC(){
            this.seniorSearchToggle = !this.seniorSearchToggle
            let serchbtn = document.querySelector('.divserchbtn')
            var advancedSerch = document.getElementById("advancedSerch")

            if(this.seniorSearchToggle == true){
                serchbtn.style.display = 'none'
                serchbtn.style.transition = 'all 2s'
                advancedSerch.style.transform = 'rotate(0deg)'
            }else if(this.seniorSearchToggle == false){
                serchbtn.style.display = 'inline-block'
                serchbtn.style.transition = 'all 2s'
                advancedSerch.style.transform = 'rotate(180deg)'
            }
        },
        refresh(){
            this.initTimeSet()
            this.merchantOrder = ''
            this.caseType = ''
            this.caseStatus = ''
            this.stolenCardNumber = ''
            this.created = ''
            this.merchantId = ''
            this.id = ''
            this.source = ''
            this.acceptedPersonnel = ''
            this.businessLine = ''
        },
        importeBtn(){
            this.importe = false
            this.fileData = ''
            this.file = ''
        },
        upload(){
            let formData = new FormData()
            formData.append('file',this.file)
            if(this.file  == ''){
            this.$alert('不能上传空文件', '系统提示', {
                confirmButtonText: '确定',
            });
            return
            }
            this.$axios.post('/CaseInquiryController/batchImportCase',formData)
            .then(res => {
                console.log(res)
                if(res.data.code == 1 ){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText: '确定',
                        type:'success'
                    });
                    this.importe = false
                    this.fileData = ''
                    this.file = ''
                }else if (res.data.code == 0){
                    this.$alert(res.data.message, '系统提示', {
                        confirmButtonText: '确定',
                        type:'warning'
                    });

                }
            })
            .catch(error => {
                this.fileData = ''
                this.file = ''
                console.log(error)
            })
        },
        fileChange(e){
            console.log(e.target.files[0])
            this.file = e.target.files[0]
            this.fileData = e.target.files[0].name
        },
        fileChangeClick(){
            this.valueText = ''
        },
        helpTitleClick(){
            this.helpTitle = !this.helpTitle
        },
        downloadModel(){
            // 导入下载模板
            let uploadBaseUrl = 'http://172.19.162.41:8080/BusinessSys'
            window.location=encodeURI(this.uploadBaseUrl+"/CaseInquiryController/exportCaseModel")
        },
        caseMgt(row){
            // 如果没有查看案件详情的权限，则不跳转
            if(this.viewCaseDetailPermission === false) return;
          console.log(row)

          var name = ''
          var nameId =  row.id

          if(row.caseStatus === '待初审' || row.caseStatus === '初审中'){
              name = 1
          }else if(row.caseStatus === '初审完结' || row.caseStatus === '复审中'){
              name = 2
          }else if(row.caseStatus === '复审完结'){
              name = 3
          }
        //   window.open('http://172.19.40.47:8080/#/caseMgt?' + name + '&' + nameId)

        //   window.open('http://10.151.30.148:8080/business-view/#/caseMgt?' + name + '&' + nameId)
          window.open(window.location.href.split('#')[0] +'#/caseMgt?name=' + name  + '&nameId=' +  nameId)

          localStorage.setItem('ID',row.id)
          localStorage.setItem('STOLENUM',row.stolenCardNumber)
          localStorage.setItem('MERID',row.merchantOrder)
          localStorage.setItem('BUSILINE',row.businessLine)
          localStorage.setItem('CASETYPE',row.caseType)
          localStorage.setItem('merchantMgtCode',row.merchantId)

        },
        newCase(){
        //   window.open('http://172.19.40.47:8080/#/newCase')
        //   window.open('http://10.151.30.148:8080/business-view/#/newCase?from=' + 2)
          window.open(window.location.href.split('#')[0] +'#/newCase?from=' + 2)
        },
        dlDetailsOpen(){
            this.dlDetails = true
            if(this.totalNum == 0){
                this.loadStartNum = 0
                this.loadEndNum = 0
            }else if(this.totalNum != 0){
                this.loadEndNum = Math.ceil(this.totalSize/this.pageSize)
                this.loadStartNum = 1
            }

        },
        downloadOpen(){
            this.download = true
            if(this.totalNum == 0){
                this.loadStartNum = 0
                this.loadEndNum = 0
            }else if(this.totalNum != 0){
                this.loadEndNum = Math.ceil(this.totalSize/this.pageSize)
                this.loadStartNum = 1
            }
        },
        // 下载列表
        uploadList(){
            if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
                console.log(111)
                this.$alert('起始值需小于结束值', '系统提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return
            }

            if(parseInt(this.pageSize) * ((parseInt(this.loadStartNum) - parseInt(this.loadEndNum) + 1)) > 100000){
                this.$alert('最多只能导出10万条数据','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action=>{

                    }
                })
                return
            }

            if(this.eCaseTime == null){this.eCaseTime = ''}
            if(this.sCaseTime == null){this.sCaseTime = ''}
            if(this.caseStatus == null){this.caseStatus = ''}
            if(this.sTransactionTime == null){this.sTransactionTime = ''}
            if(this.eTransactionTime == null){this.eTransactionTime = ''}
            if(this.merchantOrder == null){this.merchantOrder = ''}
            if(this.caseType == null){this.caseType = ''}
            if(this.stolenCardNumber == null){this.stolenCardNumber = ''}
            if(this.created == null){this.created = ''}
            if(this.businessLine == null){this.businessLine = ''}
            if(this.loadStartNum == null){this.loadStartNum = ''}
            if(this.loadEndNum == null){this.loadEndNum = ''}
            if(this.pageSize == null){this.pageSize = ''}

            window.location = encodeURI(this.uploadBaseUrl + '/CaseInquiryController/exportCaseList?sCaseTime=' +  this.sCaseTime + '&eCaseTime=' + this.eCaseTime + '&caseStatus=' + this.caseStatus + '&sTransactionTime=' + this.sTransactionTime
                    + '&eTransactionTime=' +  this.eTransactionTime + '&merchantOrder=' + this.merchantOrder + '&caseType=' + this.caseType + '&stolenCardNumber=' + this.stolenCardNumber + '&created=' + this.created
                    + '&merchantId' + this.merchantId + '&id=' + this.id + '&source=' + this.source + '&acceptedPersonnel=' + this.acceptedPersonnel
                    + '&businessLine=' + this.businessLine + '&pageNum=' + this.loadStartNum + '&pageSize=' + this.pageSize + '&totalPage=' + this.loadEndNum)
        },
        // 下载详情
        uploadMgt(){
            if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
                console.log(111)
                this.$alert('起始值需小于结束值', '系统提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return
            }

            if(parseInt(this.pageSize) * ((parseInt(this.loadStartNum) - parseInt(this.loadEndNum) + 1)) > 100000){
                this.$alert('最多只能导出10万条数据','提示',{
                    confirmButtonText:'确定',
                    type:'warning',
                    callback:action=>{

                    }
                })
                return
            }

            if(this.eCaseTime == null){this.eCaseTime = ''}
            if(this.sCaseTime == null){this.sCaseTime = ''}
            if(this.caseStatus == null){this.caseStatus = ''}
            if(this.sTransactionTime == null){this.sTransactionTime = ''}
            if(this.eTransactionTime == null){this.eTransactionTime = ''}
            if(this.merchantOrder == null){this.merchantOrder = ''}
            if(this.caseType == null){this.caseType = ''}
            if(this.stolenCardNumber == null){this.stolenCardNumber = ''}
            if(this.created == null){this.created = ''}
            if(this.businessLine == null){this.businessLine = ''}
            if(this.loadStartNum == null){this.loadStartNum = ''}
            if(this.loadEndNum == null){this.loadEndNum = ''}
            if(this.pageSize == null){this.pageSize = ''}


            window.location = encodeURI(this.uploadBaseUrl + '/CaseInquiryController/exportCaseDetail?sCaseTime='  + this.sCaseTime + '&eCaseTime=' + this.eCaseTime + '&caseStatus=' + this.caseStatus + '&sTransactionTime=' + this.sTransactionTime
                    + '&eTransactionTime=' +  this.eTransactionTime + '&merchantOrder=' + this.merchantOrder + '&caseType=' + this.caseType + '&stolenCardNumber=' + this.stolenCardNumber + '&created=' + this.created
                    + '&merchantId' + this.merchantId + '&id=' + this.id + '&source=' + this.source + '&acceptedPersonnel=' + this.acceptedPersonnel
                    + '&businessLine=' + this.businessLine + '&pageNum=' + this.loadStartNum + '&pageSize=' + this.pageSize + '&totalPage=' + this.loadEndNum)
        },
        handleSizeChange(val) {
            console.log(val.target.value);
            this.pageSize = parseInt(val.target.value)
            console.log(this.pageSize)
            this.getData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val
            this.getData()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        },
          // 设置默认时间
        initTimeSet(){
            let date = new Date()
            let y = date.getFullYear()
            let m = "0"+(date.getMonth()+1)
            let d = "0"+date.getDate()
            // console.log(y+'-'+m+'-'+d)
            this.sCaseTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+  '00:00:00'
            this.sTransactionTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) + ' '+  '00:00:00'
            this.eCaseTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) +' '+  '23:59:59'
            this.eTransactionTime = y+'-'+m.substring(m.length-2,m.length)+'-'+d.substring(d.length-2,d.length) +' '+  '23:59:59'

        },
        getAcceptPersonList(){
            this.$axios.get('/CaseInquiryController/queryPerson?sessionId=' + localStorage.getItem('SID'))
                .then(res => {
                    console.log(res.data)
                    this.acceptPersonList = []
                    this.acceptPersonList = this.acceptPersonList.concat(res.data.recordList)
                })
                .catch(error => {
                    // console.log(res.data)
                })
        },
        getFp(){
            this.$axios.get('/CaseInquiryController/queryPerson?sessionId=' + localStorage.getItem('SID'))
                .then(res => {
                    console.log(res.data)
                    this.getFpData = []
                    this.getFpData = this.getFpData.concat(res.data.recordList)
                })
                .catch(error => {
                    console.log(res.data)
                })
        },
        getPersonList(){
            this.$axios.get('/CaseInquiryController/queryPerson?sessionId=' + localStorage.getItem('SID'))
                .then(res => {
                    console.log(res.data)
                    this.personList = []
                    this.personList = this.personList.concat(res.data.recordList)
                })
                .catch(error => {
                    console.log(res.data)
                })
        },
        beginTimeFocus(){
            document.querySelector('#beginTime').setAttribute('readOnly',true)
        },
        endTimeFocus(){
            document.querySelector('#endTime').setAttribute('readOnly',true)
        },
        sTransactionTimeFocus(){
            document.querySelector('#sTransactionTimeBegin').setAttribute('readOnly',true)
        },
        eTransactionTimeFocus(){
            document.querySelector('#eTransactionTimeEnd').setAttribute('readOnly',true)
        },
        queryAuthList(){
            // 按钮权限
            const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
            this.createCase = idList.indexOf(116) === -1 ? false : true;
            this.importCase = idList.indexOf(219) === -1 ? false : true;
            this.allotBtnShow = idList.indexOf(117) === -1 ? false : true;
            this.delShowBtn = idList.indexOf(256) === -1 ? false : true;
            this.importShowList = idList.indexOf(118) === -1 ? false : true;
            this.importShowDetail = idList.indexOf(218) === -1 ? false : true;
            this.searchShowHide = idList.indexOf(113) === -1 ? false : true
            this.viewCaseDetailPermission = idList.indexOf(21) === -1 ? false : true
            this.resetPermission = idList.indexOf(115) === -1 ? false : true
        },
    },
    created() {
        this.queryAuthList()
    },
    mounted(){
        this.initTimeSet()
    }
  };
</script>
<style scoped>
 .fontC{
    color: #3DC6B2;
    cursor: pointer;
    line-height: 17px;
}
.onf{
    display: inline;
    margin-left: 45px;
    font-size: 14px;
    color: #606266;
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
    padding-left: 3%;
    padding-top: 20px;
    padding-bottom: 20px;
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}
.rightContent{
    width: 18%;
    height: 188px;
    border-left: 1px solid #e0e0e0;
    float: right;
}
.rightContent1{
    width: 18%;
    height: 118px;
    border-left: 1px solid #e0e0e0;
    float: right;
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
    padding-top: 25px;
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
.amendIconIcon {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/plxgW.png);
  }
.amendIconIcon:hover {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/plxgL.png);
}
  .removIconIcon {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xzxqW.png);
  }
  .removIconIcon:hover {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xzxqL.png);
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
    .addIcon {
      background: url(../../images/icon.png) no-repeat 6px -9px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .addIcon:hover {
      background: url(../../images/icon.png) no-repeat 6px -32px;
      width: 44px;
      height: 30px;
      margin: 0 auto;
      margin-top: 4px;
    }
    .icon3{
    background: url(../../images/icon3.png) no-repeat;
    width: 39px;
    height: 28px;
    }
    .icon3:hover{
    background: url(../../images/icon3-2.png) no-repeat;
    width: 39px;
    height: 28px;
    }
.remouve {
  background: url(../../images/sc.png) ;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.remouve:hover {
  background: url(../../images/scH.png) no-repeat ;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon{
width: 46px;
height: 32px;
border: 0;
background-image: url(../../images/xzqx.png);
}
.refreshIcon:hover{
width: 46px;
height: 32px;
border: 0;
background-image: url(../../images/xzqxH.png);
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
  .ui_button{
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #409EFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
  .ui_button:hover{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #409EFF;
    border: 1px solid #409EFF;
    border-color: #409EFF;
    color: #FFF;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
  }
  .listValInp{width: 60%;height: 36px;}
  .importe{
    width: 18px;
    height: 18px;
    background-image: url(../../images/importe.png);
  }
  .ipC{
    float: left; margin-left: 10px; margin-right: 5px;
  }
  .fontC{
    color: #3DC6B2;
    cursor: pointer;
    line-height: 17px;
  }
  .prompt{
    width: 18px;
    height: 18px;
    background-image: url(../../images/prompt.png);
  }
  .downClass {
    width: 77px;
    height: 29px;
    line-height: 18px;
    margin: 5px;
    border-radius: 19px;
    border: 1px solid #ccc;
    padding: 4px 2px;
    box-sizing: border-box;
  }
   .block{margin-top:34px;width:100%}
  .pagination{margin-left:34px;font-size:12px;color:#333333;display:inline-block}
  .evetotal{
    margin-left: 3px; padding-left: 10px;
    background:url(../../images/xxjt.png) no-repeat;
    background-position: 34px 8px; background-size:7px 5px;
    outline: none;
    appearance:none;-moz-appearance:none;
    -webkit-appearance:none;width:50px;height:22px;
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    font-family: PingFangSC-Regular;
    font-size: 12px;  color: #333333;
  }
  .paginationRight{display:inline-block; float:right;}
  #advancedSerch{
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg)
  }
</style>
