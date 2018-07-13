<template>
  <!--商户评级管理-->
  <div>
    <div class='customerHeader'>
       <div class="customerHeadertLeft">
        <el-form :model="form"  ref="form" >
          <div class="beginTime hideTimeRightIcon">
            <span class="span">统计日期:</span>
            <el-date-picker
              v-model="form.beginTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style='width:55%'
              id='beginTimeFocus'
              @focus="beginTimeFocusEvent"
            >
            </el-date-picker>
          </div>

          <div class="cycle">
            <span class="span">评级周期</span>
            <el-select v-model="form.cycle" filterable placeholder="请选择"  class="editInput">
                <el-option label="近7天" value="7"></el-option>
                <el-option label="近30天" value="30"></el-option>
            </el-select>
          </div>

          <div class="customerID">
            <span class="span">商户编号:</span>
            <el-input placeholder="请输入" v-model="form.customerID" class="editInput"></el-input>
          </div>

          <div class="customerName">
            <span class="span">商户签约名称:</span>
            <el-input placeholder="请输入"  v-model="form.customerName" class="editInput"></el-input>
          </div>

          <div class="sales">
            <span class="span">销售:</span>
            <el-input placeholder="请输入"  v-model="form.sales" class="editInput"></el-input>
          </div>

          <div class="branchOffice">
            <span class="span">分公司:</span>
            <el-input placeholder="请输入"  v-model="form.branchOffice" class="editInput"></el-input>
          </div>

          <div class="agentID">
            <span class="span">代理商编号:</span>
            <el-input placeholder="请输入"  v-model="form.agentID" class="editInput"></el-input>
          </div>

          <div class="agentUser">
            <span class="span">代理商名称:</span>
            <el-input placeholder="请输入"  v-model="form.agentUser" class="editInput"></el-input>
          </div>

          <div class="customerPerformance">
            <span class="span">商户业绩属性:</span>
            <el-select v-model="form.naturalQualityProperty" filterable placeholder="请选择" class="editInput" @focus='getBusiPropertyList'>
              <el-option
                v-for="item in naturalQualityPropertyList"
                :key="item.sysconid"
                :label="item.sysname"
                :value="item.sysname">
              </el-option>
            </el-select>
          </div>

          <div class="naturalQualityOneLevel">
            <span class="span">商户自然属性一级:</span>
            <el-select v-model="form.naturalQualityOneLevel" filterable placeholder="请选择"  class="editInput" @change="oneListChange">
                <el-option
                 v-for="item in this.OneList"
                :key="item.id"
                :label="item.syscode"
                :value="item.syscode">
                </el-option>
            </el-select>
          </div>

          <div class="naturalQualityTwoLevel">
            <span class="span">商户自然属性二级:</span>
            <el-select v-model="form.naturalQualityTwoLevel" filterable placeholder="请选择" id='levelTwo'  class="editInput"  @focus="getTwoList" >
                <el-option
                 v-for="item in this.TwoList"
                :key="item.id"
                :label="item.sysname"
                :value="item.sysname">
                </el-option>
            </el-select>
          </div>

        </el-form>  
       </div>
       <div class="searchContentRight">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="serch" v-if="searchPermission"></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm"></el-button>
      </div>
    </div>
    <div class="customerTabSwitcher" id="customerTabSwitcher">
        <div class="noChoose"  @click="clickClass">
            判断列表
        </div>
        <div class="noChoose" @click="clickClass">
            关注列表
        </div>
        <div class="active" @click="clickClass">
            评级列表
        </div>
    </div>
    <div class="contentBtn">
        <div class="button">
          <div class="leftButton clear">
            <div class="BotoomBtn leftRadius"  @click="amendData" data-title='修改' id='editIconTitle' v-if="editPermission">
              <div class="xgIcon"></div>
            </div>
            <div class="BotoomBtn" @click="importe = true" data-title='导入' id='importIconTitle' v-if="importPermission">
              <div class="amendIconIc"></div>
            </div>
            <div class="BotoomBtn" @click="dlDetailsOpen" data-title='下载详情' id='downloadIconTitle'  v-if="downloadPermission1">
              <div class="refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="downloadOpen" data-title='下载列表' id='downloadDetailIconTitle' v-if="downloadPermission2">
              <div class="removIconIc"></div>
            </div>
          </div>
        </div>
    </div>
    <div class="tableData">
        <table style='width:100%;min-width: 5000px;border-collapse:collapse;margin-left: 10px;' id='tableScroll'>
          <tr class='tr' >
            <td class='r0'><input class='inputPosition' type='checkbox' v-model='checkAll'></td>
            <td class='r1'>商户编号</td>
            <td class='r2'>商户名称</td>
            <td class='r3'>商户签约名称</td>
            <td class='r4'>接入网址</td>
            <td class='r5' v-for='(item,index) in tableDataHeader' :key='index' >{{item.model_name}}</td>
            <td class='r6'>行业子模型等级</td>
            <td class='r7'>行业子模型分值</td>
            <td class='r8'>综合评级</td>
            <td class='r9'>人工评级</td>
            <td class='r9'>人工评级备注</td>
            <td class='r10'>商户入网时间</td>
            <td class='r11'>是否限额限次特批</td>
            <td class='r11'>是否保证金特批</td>
            <td class='r11'>是否入网特批</td>
            <td class='r11'>是否评级特批</td>
            <td class='r12'>特批次数</td>
            <td class='r13'>分公司</td>
            <td class='r14'>代理商编号</td>
            <td class='r14'>代理商名称</td>            
            <td class='r15'>销售</td>
            <td class='r16'>修改原因</td>
            <td class='r17'>商户业绩属性</td>
            <td class='r18'>行业主体</td>
            <td class='r18'>签约主体</td>
            <td class='r19'>商户自然属性一级</td>
            <td class='r20'>商户自然属性二级</td>
            <td class='r21'>支付接口状态</td>
            <td class='r21'>客户状态</td>
            <td class='r22'>账户状态</td>
            <td class='r23'>生成日期</td>
            <td class='r24'>商户详情</td>
          </tr>
          <tr class='tr1' v-for='(ele,index) in tableData' :key='index'>
            <td class='r0'><input class='inputPosition' type='checkbox' :value='ele.merchant_id' v-model='checkItem'></td>
            <td class='r1'>{{ele.merchant_id}}</td>
            <td class='r2'>{{ele.merchant_name}}</td>
            <td class='r3'>{{ele.merchant_sign_name}}</td>
            <td class='r4'>{{ele.refer}}</td>

            <td class='r5' v-for='(item,index) in ele.colsdata' :key='index'>{{item}}</td>
            <!-- <td class='r5' v-for='(item,index) in tableDataHeader' :key='index' >{{ele.merchant_score}}</td> -->
  
           
            <td class='r6'>{{ele.tradeModelLevel}}</td>
            <td class='r7'>{{ele.tradeModelValue}}</td>
            <td class='r8'>{{ele.comprehensive_rating}}</td>
            <td class='r9'>{{ele.value_level}}</td>
            <td class='r9'>{{ele.value_comments}}</td>
            <td class='r10'>{{ele.inNetTime}}</td>
            <td class='r11' >
              <span v-if='ele.is_limit_spcl === 1'>是</span>
              <span v-if='ele.is_limit_spcl === 0'>否</span>
            </td>
            <td class='r11'>
              <span v-if='ele.is_deposit_spcl === 1'>是 </span>
              <span v-if='ele.is_deposit_spcl === 0'>否</span>
            </td>
            <td class='r11'>
              <span v-if='ele.is_net_in_spcl === 1'>是 </span>
              <span v-if='ele.is_net_in_spcl === 0'>否</span>
            </td>
            <td class='r11'>
              <span v-if='ele.is_rate_spcl === 1'>是 </span>
              <span v-if='ele.is_rate_spcl === 0'>否</span>
            </td> 
            <td class='r12'>{{ele.spcl_num}}</td>
            <td class='r13'>{{ele.organization_id}}</td>
            <td class='r14'>{{ele.agent_id}}</td>
            <td class='r14'>{{ele.agent_name}}</td>            
            <td class='r15'>{{ele.merchant_saler}}</td>
            <td class='r16'>{{ele.change_reson}}</td>
            <td class='r17'>{{ele.merchant_achievement}}</td>
            <td class='r18'>{{ele.industry_type}}</td>
            <td class='r18'>{{ele.sign_primary}}</td>
            <td class='r19'>{{ele.mer_first_property}}</td>
            <td class='r20'>{{ele.mer_secend_property}}</td>
            <td class='r21'>{{ele.payapi_status}}</td>
            <td class='r21'>{{ele.customer_status}}</td>
            <td class='r22'>{{ele.account_status}}</td>
            <td class='r23'>{{ele.create_time}}</td>
            <td class='r24'>
              <span class='checkIcon' @click="handleClick(ele.merchant_id)"></span>
            </td>
          </tr>
        </table>
    </div>
         <div class="block">
              <div class='pagination'>
                <span>每页显示</span> 
                <select  class="evetotal"  @change="changeHandleSize($event)" >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
              <div class='paginationRight'>
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size= pagenum
                     layout="prev, pager, next"
                    :total=totalNum
                    >
                  </el-pagination>
              </div>
            </div>
    <el-dialog title="修改级别" :visible.sync="amend" width="650px"  >
      <el-form :model="amendForm" :rules="rules" ref="ruleForm" label-width="130px" style="margin-left: 13%;max-height:390px;overflow-y: scroll;"  class="demo-ruleForm">
        <el-form-item label="商户编号:" prop="merchantCode" >
          <el-input style="width:70%;" v-model="amendForm.merchantCode"></el-input>
        </el-form-item>
        <el-form-item label="人工评级:" prop="ArtificialRating">
          <el-input style="width:70%;"  v-model="amendForm.ArtificialRating"></el-input>
        </el-form-item>
        <el-form-item label="人工评级备注:" prop="ArtificialRatingDesc">
          <el-input style="width:70%;border-radius:17px;" type="textarea"  :rows="7"  placeholder="请输入 (200字以内) " v-model="amendForm.ArtificialRatingDesc" ></el-input>
        </el-form-item>
        <div class="formRadioBox">
            <span>是否限额限次特批:</span>
            <label for="radio1" class="radioChoose"></label>
            <input type="radio"  id="radio1" value="1"  style="clip:rect(0 0 0 0);" v-model="amendForm.limit">是
            <label for="radio2" class="radioChoose"></label>
            <input type="radio"  id="radio2" value="0" style="clip:rect(0 0 0 0);" v-model="amendForm.limit">否
        </div>
        <div class="formRadioBox">
          <span>是否入网特批:</span>
          <label for="radio3" class="radioChoose"></label>
          <input type="radio"  id="radio3" value="1"  style="clip:rect(0 0 0 0);" v-model="amendForm.specialPermit">是
          <label for="radio4" class="radioChoose"></label>
          <input type="radio"  id="radio4" value="0" style="clip:rect(0 0 0 0);" v-model="amendForm.specialPermit">否
        </div>
        <div class="formRadioBox">
          <span>是否保证金特批:</span>
          <label for="radio5" class="radioChoose"></label>
          <input type="radio"  id="radio5" value="1"  style="clip:rect(0 0 0 0);" v-model="amendForm.money">是
          <label for="radio6" class="radioChoose"></label>
          <input type="radio"  id="radio6" value="0" style="clip:rect(0 0 0 0);" v-model="amendForm.money">否
        </div>
        <div class="formRadioBox">
          <span>是否评级特批:</span>
          <label for="radio7" class="radioChoose"></label>
          <input type="radio"  id="radio7" value="1"  style="clip:rect(0 0 0 0);" v-model="amendForm.rating">是
          <label for="radio8" class="radioChoose"></label>
          <input type="radio"  id="radio8" value="0" style="clip:rect(0 0 0 0);" v-model="amendForm.rating">否
        </div>
        <el-form-item label="特批次数:" prop="number">
          <el-input style="width:70%;" v-model="amendForm.number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="amend = false">取 消</el-button>
        <el-button type="primary" @click="amendBtn">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="评级列表：分页选择下载" :visible.sync="download" width="30%">
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum" min="0" class="downClass" >到<input type="number" min="0"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalNum}}</span>页</h4>
        <span slot="footer" class="dialog-footer">
          <el-button @click="downloadClose">取 消</el-button>
          <el-button type="primary" @click="uploadList" v-if="this.tableData.length != ''">下 载</el-button>
        </span>
    </el-dialog>
    <el-dialog title="评级详情：分页选择下载" :visible.sync="dlDetails" width="30%">
            <div style="text-align: center; margin-bottom:20px;">选择下载从<input type="number" v-model="loadStartNum"  min="0" class="downClass" >到<input type="number" min="0"  class="downClass" v-model="loadEndNum" >页的数据</div>
            <h4 style="text-align: center">当前共<span>{{totalNum}}</span>页</h4>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dlDetailsClose">取 消</el-button>
          <el-button type="primary" @click="uploadMgt" v-if="this.tableData.length != ''">下 载</el-button>
        </span>
    </el-dialog>
    <el-dialog title="从Excel导入到手动评级" :visible.sync="importe" width="570px" style="">
        <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadModel">下载模板</span>
        <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick">模板格式要求</span>
        <div style="margin-left: 50px;margin-top: 20px;">
            <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" :value=valueText  @click='fileChangeClick'  v-model="fileData"></el-input>
            <label class="ui_button" for="filename">选择</label>
            <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
               <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileChange'>
            </form>
        </div>
        <span slot="footer" class="dialog-footer">
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
        <el-dialog width="50%" title="导入数据信息" :visible.sync="innerVisible" append-to-body>
          <table>
             <tr>
               <th>标题</th>
               <th>记录数</th>
             </tr>
             <tr>
               <td>成功导入数</td>
               <td>{{uploadDataS}}</td>
             </tr>
             <tr>
               <td>错误记录数</td>
               <td>{{uploadDataF}}</td>
             </tr>
          </table>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="downErrer">下载错误Excel</el-button>
          </span>
        </el-dialog>
      </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import qs from 'qs'
export default{
    name:'商户评级管理',
    data(){
      return {
        searchPermission: true,
        editPermission: true,
        importPermission: true,
        downloadPermission1: true,
        downloadPermission2: true,
        valueText:'',
        tableObjArr:[],
        totalNum:0,
        customerPerList:[
          {value:'航旅事业部',id:'1'},
          {value:'电信行业线',id:'2'},
          {value:'保险行业线',id:'3'},
          {value:'行政与教育行业线',id:'4'},
          {value:'新零售行业线-零售',id:'5'},
          {value:'新零售行业线-线下',id:'6'},
          {value:'互金行业线',id:'7'},
          {value:'消金行业线',id:'8'},
           {value:'散打业务',id:'9'},
           {value:'中小微行业线',id:'10'},
           {value:'跨境行业线',id:'11'},
           {value:'钱麦事业部',id:'12'},
        ],
        checkItem:[],
        checkAll:false,
        checkDataAll:[],
        dlDetails:false,
        titleData:[
          {
            name:'商户编号',
            help:'文本格式，不能为空',
          },
          {
            name:'易宝模型等级',
            help:'枚举：A、A-、A+、B、B-、B+、C、C-、C+',
          },
          {
            name:'易宝模型备注',
            help:'文本格式，字数200以内',
          },
          {
            name:'行业子模型级别',
            help:'枚举：A、A-、A+、B、B-、B+、C、C-、C+',
          },
          {
            name:'行业子模型备注',
            help:'文本格式，字数200以内',
          },
          {
            name:'价值分级',
            help:'枚举：V、V-',
          },
          {
            name:'价值分级备注',
            help:'文本格式，字数200以内',
          },
          {
            name:'是否限额限次特批',
            help:'枚举：是、否',
          },
          {
            name:'是否保证金特批',
            help:'枚举：是、否',
          },
          {
            name:'是否入网特批',
            help:'枚举：是、否',
          },
          {
            name:'是否评级特批',
            help:'枚举：是、否',
          },
          {
            name:'特批次数',
            help:'数字，2位以内',
          },
        ],
        uploadData:[],
        uploadDataF:'',
        uploadDataS:'',
        tableData1:[{
          abc:'',
        },{
          abcd:'',
        }],
        tableData:[],
        cycleList:[
          {id:0,value:'7'},
          {id:1,value:'30'}
        ],
        customerPerformanceList:[
          {id:0,value:'7'},
          {id:1,value:'30'}
        ],
        naturalQualityOneLevelList:[
          {id:0,value:'7'},
          {id:1,value:'30'}
        ],
        naturalQualityTwoLevelList:[
          {id:0,value:'7'},
          {id:1,value:'30'}
        ],
        amendForm:{
          merchantCode:'',
          ArtificialRating:'',
          ArtificialRatingDesc:'',
          limit:'',
          specialPermit:' ',
          money:'',
          rating:'',
          number:'',
        },
        form:{
            beginTime:'',     
            cycle:'30',
            customerID:'',
            customerName:'',
            sales:'',
            branchOffice:'',
            agentID:'',
            agentUser:'',
            naturalQualityProperty:'',
            customerPerformance:'',
            naturalQualityOneLevel:'',
            naturalQualityTwoLevel:'',
        },
        dataLenght:[],
        naturalQualityPropertyList:[],
        amend:false,
        importe:false,
        download:false,
        helpTitle:false,
        headData:[],
        headDataLabel1:[],
        headDataLabel2:[],
        OneList:[],
        TwoList:[],
        ratingList:'1',
        followList:'',
        judgmentList:'',
        innerVisible: false,
        pageSize:10,
        pagenum:10,
        
        startnum:1,
        fileData:'',
        file:'',
        rules:{
          merchantCode: [
            { required: true, message: ' ', trigger: 'blur' },
          ],
          ArtificialRatingDesc:[
            { required: true, message: ' ', trigger: 'blur' },
             { min: 0, max: 200, message: ' ', trigger: 'blur' }
          ]
        },
        tableDataHeader:[],
        errorData:'',
        isradiochoose:true,
        isnoradio:false,
        downloadModelData:'',
        merchantId:'',
        arrMapTest:[],
        loadStartNum:0,
        loadEndNum:0,
        arr:[],
      }
    },
    created() {
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.searchPermission = idList.indexOf(50) === -1 ? false : true;
      this.editPermission = idList.indexOf(51) === -1 ? false : true;
      this.importPermission = idList.indexOf(53) === -1 ? false : true;
      this.downloadPermission1 = idList.indexOf(54) === -1 ? false : true;
      this.downloadPermission2 = idList.indexOf(55) === -1 ? false : true;
    },
    methods:{
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
      handleSizeChange(val) {
       
      },
      changeHandleSize(e){
        console.log(`每页 ${e.target.value} 条`);
        this.pagenum = parseInt(e.target.value)
        this.serch();
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },
      uploadList(){
        if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
          console.log(111)
             this.$alert('起始值需小于结束值', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
              });
              return
        }

        if(parseInt(this.pagenum) * ((parseInt(this.loadStartNum) - parseInt(this.loadEndNum) + 1)) > 100000){
          this.$alert('最多只能导出10万条数据','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action=>{

            }
          })
          return
        }


        this.$axios.get('/DownloadMerchantController/exportMerchantList?grid_show=' + '' + '&sign=' + this.form.cycle + '&create_time=' + this.form.beginTime + '&merchant_id=' + this.form.customerID
                  + '&merchant_sign_name=' +  this.form.customerName + '&merchant_saler=' + this.form.sales + '&organization_id=' + this.form.branchOffice + '&agent_id=' + this.form.agentID + '&agent_name=' + this.form.agentUser
                  + '&merchant_achievement' + this.form.customerPerformance + '&mer_first_property=' + this.form.naturalQualityOneLevel + '&mer_secend_property=' + this.form.naturalQualityTwoLevel + '&rating_list=' + this.ratingList
                  + '&follow_list=' + this.followList + '&judgment_list=' + this.judgmentList + '&startnum=' + this.loadStartNum + '&pagenum=' + this.loadEndNum + '&page_total=' + this.pagenum + '&sessionId=' + localStorage.getItem('SID'))
        .then(res => {                                                                                                                    
          console.log(res.data)
          if(res.data.code == 1){
                  window.location=encodeURI(this.uploadBaseUrl+'/DownloadMerchantController/downloadList?filePath=' + res.data.filePath)
                  this.download = false
          }else{
             
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      uploadMgt(){
        if( parseInt(this.loadStartNum)  > parseInt(this.loadEndNum) ){
             this.$alert('起始值需小于结束值', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
              });
              return
        }

        if(parseInt(this.pagenum) * ((parseInt(this.loadStartNum) - parseInt(this.loadEndNum) + 1)) > 100000){
          this.$alert('最多只能导出10万条数据','提示',{
            confirmButtonText:'确定',
            type:'warning',
            callback:action=>{

            }
          })
          return
        }


        this.$axios.get('/DownloadMerchantController/downloadDetail?grid_show=' + '' + '&sign=' + this.form.cycle + '&create_time=' + this.form.beginTime + '&merchant_id=' + this.form.customerID
                  + '&merchant_sign_name=' +  this.form.customerName + '&merchant_saler=' + this.form.sales + '&organization_id=' + this.form.branchOffice + '&agent_id=' + this.form.agentID + '&agent_name=' + this.form.agentUser
                  + '&merchant_achievement' + this.form.customerPerformance + '&mer_first_property=' + this.form.naturalQualityOneLevel + '&mer_secend_property=' + this.form.naturalQualityTwoLevel + '&rating_list=' + this.ratingList
                  + '&follow_list=' + this.followList + '&judgment_list=' + this.judgmentList + '&startnum=' + this.loadStartNum + '&pagenum=' + this.loadEndNum + '&page_total=' + this.pagenum + '&sessionId=' + localStorage.getItem('SID'))
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      dlDetailsOpen(){
          this.dlDetails = true
          if(this.totalNum == 0){
             this.loadStartNum = 0
             this.loadEndNum = 0
          }else if(this.totalNum != 0){
              this.loadEndNum = this.totalNum
              this.loadStartNum = 1
          }
      },
      downloadOpen(){
          this.download = true
          if(this.totalNum == 0){
             this.loadStartNum = 0
             this.loadEndNum = 0
          }else if(this.totalNum != 0){
              this.loadEndNum = this.totalNum
              this.loadStartNum = 1
          }
      },
      importeBtn(){
        this.importe = false
        this.fileData = ''
        this.file = ''        
      },
      fileChangeClick(){
            this.valueText = ''
      },
      fileChange(e){
        console.log(e.target.files[0])
        this.file = e.target.files[0]
        this.fileData = e.target.files[0].name
      },
      downloadModel(){
        window.location=encodeURI(this.uploadBaseUrl+"/RateMerchantBatchUpdateController/exportMerchantModel")
      },
      downErrer(){
        window.location=encodeURI(this.uploadBaseUrl+'/RateMerchantBatchUpdateController/exportErrorMerchant?filePath='+this.errorData)
        this.innerVisible = false
        this.importe = false
        this.fileData = ''
      },
      getIntNum(){
        this.$axios.post('/RateMerchantController/queryAllSumpage',qs.stringify({
            "sessionId":localStorage.getItem('SID'),
            "grid_show":'是',
            "sign":this.form.cycle,
            "create_time":this.form.beginTime,
            "merchant_id":this.form.customerID,
            "merchant_sign_name":this.form.customerName,
            "merchant_saler":this.form.sales,
            "organization_id":this.form.branchOffice,
            "agent_id":this.form.agentID,
            "agent_name":this.form.agentUser,
            "merchant_achievement":this.form.naturalQualityProperty,
            "mer_first_property":this.form.naturalQualityOneLevel,
            "mer_secend_property":this.form.naturalQualityTwoLevel,
            "rating_list":this.ratingList,
            "follow_list":this.followList,
            "judgment_list":this.judgmentList,
            "startnum":this.startnum,
            "pagenum":this.pagenum,
        }))
          .then( res => {
            
            // 获取总页数
            console.log(res.data)
            this.totalNum = res.data;

          })
          .catch( error => {
            console.log(error)
          })
      },
      upload(){
          let formData = new FormData()
          formData.append('file',this.file)
          this.$axios.post('/RateMerchantBatchUpdateController/batchUpdateMerchant',formData)
          .then(res => {
            // console.log(res)

            this.uploadDataF = res.data.fail_count
            this.uploadDataS = res.data.success_count
            this.errorData = res.data.fail_download_url

            if(this.file  == ''){
              this.$alert('不能上传空文件', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
              });
              return
            }
            if(this.uploadDataF == 0 ){
              this.$alert('上传成功', '系统提示', {
                type:'warning',
                confirmButtonText: '确定',
              });
              this.importe = false
              this.fileData = ''
              this.file = ''        
            }else{
              this.innerVisible = true
              this.fileData = ''
              this.file = ''        
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
      handleClick(row) {
        console.log(row)
        
        // window.open('http://172.19.40.129:8080/#/detailLevel?' + row) 
        window.open(window.location.href.split('#')[0] + '#/detailLevel?' + row) 
        
      },
      getOneList(){
        this.$axios.get('/SysConfigController/getMer_first_property?sessionId=' + localStorage.getItem('SID'))
            .then( res => {
              this.OneList = res.data
            })
            .catch( error => {
              console.log(error)
            })
      },
      oneListChange(){
        this.form.naturalQualityTwoLevel = ''
        // this.getTwoList()
      },
      getTwoList(){
        console.log(this.form.naturalQualityOneLevel)
        if(this.form.naturalQualityOneLevel !== ''){
            this.$axios.post('/SysConfigController/querySecondProperty',qs.stringify({
              'sessionId':localStorage.getItem('SID'),
              'firstProperty':this.form.naturalQualityOneLevel
            }))
              .then( res => {
                console.log(res)
                this.TwoList = res.data.result
              })
              .catch( error => {
                console.log(error)
              })

        }else if(this.form.naturalQualityOneLevel === ''){
             document.getElementById("levelTwo").setAttribute("placeholder","请先选择一级属性")
        }
        
      },
      serch(){

          this.checkItem = []


            // 获取到vue的正确指向
            var _this = this
            // console.log(_this)

        this.$axios.post('/RateMerchantController/queryAll',qs.stringify({
            "sessionId":localStorage.getItem('SID'),
            "grid_show":'是',
            "sign":this.form.cycle,
            "create_time":this.form.beginTime,
            "merchant_id":this.form.customerID,
            "merchant_sign_name":this.form.customerName,
            "merchant_saler":this.form.sales,
            "organization_id":this.form.branchOffice,
            "agent_id":this.form.agentID,
            "agent_name":this.form.agentUser,
            "merchant_achievement":this.form.naturalQualityProperty,
            "mer_first_property":this.form.naturalQualityOneLevel,
            "mer_secend_property":this.form.naturalQualityTwoLevel,
            "rating_list":this.ratingList,
            "follow_list":this.followList,
            "judgment_list":this.judgmentList,
            "startnum":this.startnum,
            "pagenum":this.pagenum,
        }))
          .then( res => {
            console.log(res)
            console.log([res.data] instanceof Array)
            if([res.data] instanceof Array){
              this.tableData = res.data
                this.checkDataAll = []
                this.tableData.forEach(ele => {
                    this.checkDataAll.push(ele.merchant_id)
                })

              // 生成日期的时间戳转换
              this.tableData.forEach(ele => {
                var date = new Date(ele.create_time);
                  var Y = date.getFullYear() + '-';
                  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                  var D = date.getDate() + ' ';
                  var h = date.getHours() + ':';
                  var m = date.getMinutes() + ':';
                  var s = date.getSeconds(); 
                  ele.create_time = Y+M+D+h+m+s
              })
              console.log(this.tableDataHeader);
              this.tableObjArr = []
              for(let i=0;i < this.tableData.length;i++){
                  for(let j=0;j < this.tableDataHeader.length;j++){
                    _this.tableObjArr.push({"level":'',"score":''});
                  }   
              }
              
              for(let i=0;i<this.tableData.length;i++){
                var colstemp = [];
                var fans = this.tableData[i].map.fans;//列
                console.log('===='+this.tableDataHeader.length);
                for(let j=0;j < this.tableDataHeader.length;){
                  var value = '';
                  var value2 = '';
                	for(let z=0;z<fans.length;z++){
                		  if(fans[z].model_id == this.tableDataHeader[j].model_id){
                      	value = this.tableData[i].map.fans[z].level;//等级
                      	value2= this.tableData[i].map.fans[z].score;//分值
                      } 
                	}
                	//如果没找到，补全空的内容
                	colstemp.push(value);
                	colstemp.push(value2);
                	//添加了两个值
                	j=j+2;
                }
                this.tableData[i].colsdata = JSON.parse(JSON.stringify(colstemp)) ;
                console.log(this.tableData)
               }
              console.log(this.tableData)
              this.getIntNum()
            }
          })
          .catch( error => {
            console.log(error)
          })
      },
      getDataHead(){
        this.$axios.get('/RateMdetailMerchantController/getModelName?sessionId=' + localStorage.getItem('SID'))
            .then( res => {
              
              res.data.forEach(ele => {
                ele.score = ''
                ele.level = ''
              })
              this.arrMapTest = []
              this.arrMapTest = this.arrMapTest.concat(res.data)
              console.log( JSON.stringify(this.arrMapTest))

              let arr = []
              arr = JSON.parse(JSON.stringify(res.data))
              arr.forEach(element => {
                element.model_name = element.model_name + '等级'
              });
              let arr2 = []
              arr2 = JSON.parse(JSON.stringify(res.data))
              arr2.forEach(ele => {
                ele.model_name = ele.model_name + '分值'
              })
               this.tableDataHeader = [] 
             
               this.arrList = []
               arr.forEach(item => {
                 arr2.forEach(ele => {
                    if(item.model_id == ele.model_id){
                    
                    this.arrList.push(item)
                    this.arrList.push(ele)
                   }
                 })
               })
              this.tableDataHeader = this.tableDataHeader.concat(this.arrList) 

              // console.log(JSON.stringify(this.tableDataHeader))
            })
            .catch( error => {
              console.log(error)
            })
      },
      handleSelectionChange(val) {
         this.dataLenght = val;
      },
       amendData(){
        console.log(this.checkItem)
        console.log(this.checkItem[0])
        if(this.checkItem.length !== 0){
           this.amend = true
           this.tableData.forEach(ele => {
             if(ele.merchant_id === this.checkItem[0]){
               this.dataLenght = ele
             }
           })
           this.amendForm.merchantCode = this.dataLenght.merchant_id
           this.amendForm.ArtificialRating = this.dataLenght.value_level
           this.amendForm.ArtificialRatingDesc = this.dataLenght.value_comments
           this.amendForm.limit = this.dataLenght.is_limit_spcl
           this.amendForm.specialPermit = this.dataLenght.is_net_in_spcl
           this.amendForm.rating = this.dataLenght.is_rate_spcl
           this.amendForm.money = this.dataLenght.is_deposit_spcl
           this.amendForm.number = this.dataLenght.spcl_num
        }else{
          this.$alert('请选择一条需要操作的数据', '系统提示', {
              confirmButtonText: '确定',
          });
        }
      },
      amendBtn(){
        if(this.amendForm.merchantCode == ''){
          this.$alert('商户编号不能为空', '系统提示', {
            confirmButtonText: '确定',
          });
        }
        this.$axios.post('/RateMerchantController/updateRateMerchant',qs.stringify({
          "sessionId":localStorage.getItem('SID'),
           "merchant_id":this.amendForm.merchantCode,
           "is_rate_spcl":this.amendForm.rating,
           "is_net_in_spcl":this.amendForm.specialPermit,
           "is_limit_spcl":this.amendForm.limit,
           "is_deposit_spcl":this.amendForm.money,
           "spcl_num":this.amendForm.number,
           "value_level":this.amendForm.ArtificialRating,
           "value_comments":this.amendForm.ArtificialRatingDesc
        }))
          .then( res => {
            console.log(res)
            if(res.data.code == 1){
              this.$alert(res.data.message, '系统提示', {
                confirmButtonText: '确定',
              });
              this.amend = false
            }else if(res.data.code == 2){
              this.$alert(res.data.message, '系统提示', {
                confirmButtonText: '确定',
              });
            }
            this.serch()
          })
          .catch( error => {
            console.log(error)
          })
      },
      helpTitleClick(){
        this.helpTitle = !this.helpTitle
      },
      clickClass(e){
        var chooseBtn = document.getElementById("customerTabSwitcher").children;
        for(var i = 0; i<chooseBtn.length;i++){
          chooseBtn[i].className = 'noChoose'
        }
        e.target.className = 'active'
        if(e.target.innerText == '评级列表'){
              this.ratingList = '1'
              this.followList = ''
              this.judgmentList = ''
              this.serch()
        }else if(e.target.innerText == '关注列表'){
              this.followList = '1'
              this.ratingList = ''
              this.judgmentList = ''
              this.serch()
        }else if(e.target.innerText == '判断列表'){
              this.ratingList = ''
              this.followList = ''
              this.judgmentList = '1'
              this.serch()
        }
      },
      resetForm() {
        for(var name in this.$data.form) {
            this.$data.form[name] = ""
        }
      },
      // 获取商户业绩属性
      getBusiPropertyList(){
        this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
          'sessionId':localStorage.getItem('SID'),
          'type':92
        }))
        .then(res => {
          // console.log(res.data)
          this.naturalQualityPropertyList = []
          this.naturalQualityPropertyList = this.naturalQualityPropertyList.concat(res.data)
        })
        .catch(error => {
          console.log(error)
        })
      },
      Deta(){
        this.listAdd = true;
        var date=new Date();   
        var year=date.getFullYear(); //获取当前年份   
        var mon=date.getMonth()+1; //获取当前月份   
        var da=date.getDate(); //获取当前日   
        this.form.beginTime = year+'-'+mon+'-'+da;      
      },
      beginTimeFocusEvent(){
        document.querySelector('#beginTimeFocus').setAttribute('readOnly',true)
      },
    },
    watch:{
      checkAll(val){
        if(val){
          console.log(val)
          this.checkItem = this.checkItem.concat(this.checkDataAll)
          console.log(this.checkItem)
        }else{
          this.checkItem = []
        }
      }
    },
    mounted(){
      this.Deta()
      this.getDataHead()
      this.getOneList()
      // this.getTwoList()
      // this.serch()
      // this.getIntNum()
    }
}
</script>
<style scoped>
.tr td{
  height: 50px;
}
.customerHeader{
  height:244px;
  width:100%;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;color: #333333;
}
.customerHeadertLeft{
    width: 85%;
    border-right: 1px solid #e0e0e0;
    display: inline-block;
    margin-top: 20px;
}
.beginTime,.cycle,.customerID,.customerName,.sales,.branchOffice,.agentID,.agentUser,.customerPerformance,.naturalQualityOneLevel,.naturalQualityTwoLevel{
   display: inline-block;margin-bottom: 20px;    width: 33%;;
}
.naturalQualityOneLevel,.naturalQualityTwoLevel{
  margin: 0
}
.span{
  width: 40%;text-align: right;display: inline-block
}
.editInput{width: 55%;} 
.searchContentRight{float: right; padding-right: 45px;padding-top: 75px}
.iconStyle{display: block;height: 36px;width: 100px;font-size: 20px}
.iconRefer{margin-top: 20px}
.customerTabSwitcher{
  height:65px;
  width:100%;
  background-color: rgb(241, 242, 244)
}
.customerTabSwitcher .noChoose{
  width: 12.5%;
  height:55px;
  float: right;
  cursor: pointer; 
  display: block;
  text-align: center;
  line-height: 55px;
  background: #CFE1F3;
  margin-top: 10px;
}
.active{
    width: 12.5%;
    height:55px;
    float: right;
    cursor: pointer; 
    display: block;
    text-align: center;
    line-height: 55px;
    margin-top: 10px;
    background: #fff;
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
/* .customerTabSwitcher span{
    cursor: pointer; 
    display: block;
    text-align: center;
    line-height: 55px;
    background: #CFE1F3;
    margin-top: 10px;
} */
  .contentBtn {
    height: 60px;
    width: 100%;
    font-size: 13px;
    padding-top: 25px;
  }
  .leftButton {
    float: left;
    margin-left: 80px;
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
  .importe{
    width: 18px;
    height: 18px;
    background-image: url(../../images/importe.png);
  }
  .xgIcon {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xgW.png);
  }
  .xgIcon:hover {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xgL.png);
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .amendIconIc {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/plxgW.png);
  }
  .amendIconIc:hover {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/plxgL.png);
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
  .removIconIc {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xzxqW.png);
  }
  .removIconIc:hover {
    width: 46px;
    height: 32px;
    border: 0;
    background-image: url(../../images/xzxqL.png);
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
   .leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .BotoomBtn {
    width: 44px;
    height: 31px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    float: left;
    cursor: pointer;
  }
  .tableData{
    overflow-x: auto;
    height: auto;
    border-right:10px solid #ffffff;
  }
  .downClass{
    width: 77px;
    height: 29px;
    margin: 5px;
    border-radius: 19px;
    border: 1px solid #ccc;
    padding-right: 2px;
  }
  .listValInp{width: 60%;height: 36px;}
  .formIpt{
    width: 70px;
    margin-left: 5px;
  }
  .promptText{
    width: 95%;
    margin: 15px auto;
    border-top: 1px dotted #cec9c9;
  }
  .importData{
    width: 100%;
    margin-left: -30px;
    border-spacing: inherit;
  }
  .importData th{
    text-align: left;
    width: 111px;
  }
  .importData td{
    padding-left: 28px;
    text-align: left;
  }
  .labelshow {
    display: block;
  }
  .formRadioBox{
    margin-bottom: 20px;
    position:relative;
  }
  .formRadioBox span{
    display: inline-block;
    width: 119px;
    text-align: right;
  }
  .formRadioBox input{
    width: 50px;
    margin-left: 33px;
    cursor: pointer;
    z-index: 9999;
    margin-right: -15px;
  }
  .radioChoose{
    background-image: url(../../images/radio.png);
    width: 16px;
    height: 17px;
    cursor: pointer;
  }
  .noRadio{
    background-image: url(../../images/radioH.png);
    width: 16px;
    height: 17px;
    cursor: pointer;
  }
  .radioBox{
    width: 17px;
    height: 18px;
    max-width: 17px;
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
  /* .r1,.r2,.r3,.r4,.r5,.r6,.r7,.r8,.r9,{
width:150px;
}
.r10,.r11,.r12,.r13,.r14,.r15,.r16,.r17,.r18,.r19,.r20,.r21,.r22{
width:150px
} */
.r0{width:50px;
    text-align: center;}
.tr{
    border-bottom: 1px solid #DBE5F0;
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    background: #F5F6FA;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #636363;
    letter-spacing: 0;
}
.tr1{
border-bottom:1px solid #DBE5F0;
text-align: center;height:50px;
background: #ffffff;
font-family: PingFangSC-Medium; 
font-size: 14px; color: #333333; 
letter-spacing: 0;}
.tr1 td{
border-right:1px solid #e0e0e0;
}

.checkIcon{
display: inline-block;
background: url(../../images/icon.png) no-repeat -167px -8px;
width: 25px;
height: 25px;
margin: 0 auto;
margin-top: 5px;
background-color: #ffffff;
cursor: pointer;
border-radius: 5px;
border:0.5px solid #38E139;
}
.checkIcon:hover{
display:inline-block;
background: url(../../images/icon.png) no-repeat -166px -30px;
width: 25px;
height: 25px;
margin: 0 auto;
background-color: #38E139;
cursor: pointer;
margin-top: 5px;
border-radius: 5px;
}
.inputPosition{
  position: relative;
  top: 5px;
  height:14px;
}

.tableData::-webkit-scrollbar 
{ 
width: 4px; 
height: 4px; 
}
.tableData::-webkit-scrollbar-track 
{ 
border-radius: 5px;
-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: rgba(0,0,0,0.2); 
} 
.tableData::-webkit-scrollbar-thumb 
{ 
-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
border-radius: 0;
/* background: rgba(0,0,0,0.1); */
background: rgba(64,158,255,0.8);
} 
#editIconTitle,#importIconTitle,#downloadIconTitle,#downloadDetailIconTitle{position:relative}
#editIconTitle:hover::after,#importIconTitle:hover::after{
  content: attr(data-title);
  position:absolute;
  top:35px;
  left:0;
  height:26px;
  line-height: 26px;
  width:46px;
  text-align: center;
  font-size:12px;
  color:#333333;
  border:1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
}
#downloadIconTitle:hover::after,#downloadDetailIconTitle:hover::after{
  content: attr(data-title);
  position:absolute;
  top:35px;
  left:0;
  height:26px;
  line-height: 26px;
  width:60px;
  text-align: center;
  font-size:12px;
  color:#333333;
  border:1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
}
</style>
