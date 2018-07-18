<template>
  <!--名单默认值-->
  <div>
    <div class='listHeader' @click='refresh'>
      <span class='headerIconRefer'></span>
    </div>
    <div class="dataTable clear">   
        <el-table 
        :data="tableData"
          border
          style="width: 100%"
          @row-dblclick = 'dblClick'
        >
          <el-table-column
            align='center'  
            v-for='item in tableDataHeader'
            :key='item.id'
            :prop="item.key"
            :label="item.value" 
            width="140px"
          >          
          </el-table-column> 
        </el-table> 
        <el-dialog title="修改名单默认值配置" :visible.sync="editListDefault" width="400px" v-dialogDrag>
                  <el-form :model="form"  :label-position="labelPosition" label-width="100px" style='margin-left:15px'>
                      <el-form-item label="入口类型:">
                        <span>{{name}}</span>
                    </el-form-item>
                    <el-form-item label="维度默认勾选:">
                        <el-select v-model="value5" multiple placeholder="请选择">
                          <el-option
                            v-for="item in optionsList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.key"
                            allow-create='false'
                            >
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效期:">
                        <el-input type="number" min="1" ref='sr8' v-model="form.expiryDays" class='iptOnline' ></el-input>
                    </el-form-item>
                     <el-form-item label="备注:">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="textarea"
                          class='iptOnline'
                          >
                        </el-input>
                    </el-form-item>
                    <el-form-item label="操作员:">
                        <span>{{modifier}}</span>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click='editListDefault = false'>取 消</el-button>
                    <el-button type="primary" @click='editSubmitBtn'>确 定</el-button>
                  </div>
                </el-dialog>
    </div>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="100">
    </el-pagination> -->
  </div>


</template>
<script>
 import qs from 'qs'
export default{
 
  data(){
    return {
       jiashuju:[
         {"id":1,"entryTypeCode":"check_detail_black","entryTypeValue":"核查加黑","expiryDays":4,"createTime":"May 3, 2018 12:00:00 AM","updateTime":"May 4, 2018 11:09:32 AM","remark":"qqq","modifier":"未定义","detail":"idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":2,"entryTypeCode":"check_detail_grey","entryTypeValue":"核查加灰","expiryDays":5,"createTime":"May 3, 2018 12:00:00 AM","updateTime":"May 4, 2018 11:11:56 AM","remark":"123","modifier":"未定义","detail":"imeiBl,bankCardNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI","sort":"1"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号"},{"key":"idNoBl","value":"线上-身份证号"},{"key":"referBl","value":"线上-网址"}]},{"id":3,"entryTypeCode":"check_detail_delBlack","entryTypeValue":"核查删黑","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2018-04-19 15:40:05","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":4,"entryTypeCode":"check_detail_white","entryTypeValue":"核查加白","createTime":"May 3, 2018 12:00:00 AM","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2017-02-22 11:38:24","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":5,"entryTypeCode":"case_detail_black","entryTypeValue":"案件详情加黑","createTime":"May 3, 2018 12:00:00 AM","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2016-12-01 00:00:00","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":6,"entryTypeCode":"case_detail_delBlack","entryTypeValue":"案件详情删黑","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2016-12-01 00:00:00","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":7,"entryTypeCode":"one_key_black","entryTypeValue":"一键交易加黑","createTime":"May 3, 2018 12:00:00 AM","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2017-02-22 11:29:08","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":8,"entryTypeCode":"one_key_delBlack","entryTypeValue":"一键交易删黑","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2017-02-22 11:29:18","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":9,"entryTypeCode":"epos_black","entryTypeValue":"epos交易加黑","createTime":"May 3, 2018 12:00:00 AM","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2017-02-22 11:29:30","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":10,"entryTypeCode":"epos_delBlack","entryTypeValue":"epos交易删黑","updateTime":"Dec 1, 2016 12:00:00 AM","remark":"2017-02-22 11:29:37","modifier":"","detail":"bankCardNoBl,userPhoneBl,idNoBl","list":[{"key":"bankCardNoBl","value":"线上-银行卡号","sort":"1"},{"key":"imeiBl","value":"线上-IMEI"},{"key":"terminalIdBl","value":"线上-终端号"},{"key":"loginNameBl","value":"线上-登录名"},{"key":"userIpBl","value":"线上-IP"},{"key":"userPhoneBl","value":"线上-手机号","sort":"1"},{"key":"idNoBl","value":"线上-身份证号","sort":"1"},{"key":"referBl","value":"线上-网址"}]},{"id":11,"entryTypeCode":"off_check_black","entryTypeValue":"线下核查加黑","createTime":"May 3, 0018 12:00:00 AM","updateTime":"Jul 4, 2017 10:25:19 AM","remark":"2018-03-29 14:06:55","modifier":"","detail":"","list":[{"key":"merchantId","value":"线下-商户编号"},{"key":"terminalIdBl","value":"线下-终端号"},{"key":"corporateName","value":"线下-法人姓名"},{"key":"corporateNo","value":"线下-法人身份证"},{"key":"settlementAcct","value":"线下-结算银行卡"},{"key":"settlementAcctName","value":"线下-结算账户名"},{"key":"businessId","value":"线下-营业执照号"},{"key":"merchantGuid","value":"线下-商户唯一标识"}]},{"id":12,"entryTypeCode":"off_trade_black","entryTypeValue":"线下交易一键加黑","updateTime":"Jul 24, 2017 1:27:47 PM","remark":"2017-07-24 13:27:47","modifier":"","list":[{"key":"merchantId","value":"线下-商户编号"},{"key":"terminalIdBl","value":"线下-终端号"},{"key":"corporateName","value":"线下-法人姓名"},{"key":"corporateNo","value":"线下-法人身份证"},{"key":"settlementAcct","value":"线下-结算银行卡"},{"key":"settlementAcctName","value":"线下-结算账户名"},{"key":"businessId","value":"线下-营业执照号"},{"key":"merchantGuid","value":"线下-商户唯一标识"}]}
       ], 
       jiahead:[
          {"key":"entryTypeValue","value":"入口类型"},
          {"key":"bankCardNoBl","value":"线上-银行卡号"},
          {"key":"imeiBl","value":"线上-IMEI"},
          {"key":"terminalIdBl","value":"线上-终端号"},
          {"key":"loginNameBl","value":"线上-登录名"},
          {"key":"userIpBl","value":"线上-IP"},
          {"key":"userPhoneBl","value":"线上-手机号"},
          {"key":"idNoBl","value":"线上-身份证号"},
          {"key":"referBl","value":"线上-网址"},
          {"key":"merchantId","value":"线下-商户编号"},
          {"key":"terminalIdBl","value":"线下-终端号"},
          {"key":"corporateName","value":"线下-法人姓名"},
          {"key":"corporateNo","value":"线下-法人身份证"},
          {"key":"settlementAcct","value":"线下-结算银行卡"},
          {"key":"settlementAcctName","value":"线下-结算账户名"},
          {"key":"businessId","value":"线下-营业执照号"},
          {"key":"merchantGuid","value":"线下-商户唯一标识"},
          {"key":"expiryDays","value":"有效期(天)"},
          {"key":"updateTime","value":"更新时间"},
          {"key":"remark","value":"备注"},
          {"key":"modifier","value":"操作员"}
       ] ,

      currentPage:1,
      tableData:[],
      tableDataHeader:[],
      name:'',
      form:{
        expiryDays:1
      },
      editListDefault:false,
       optionsList: [],
        value5: [],
        textarea:'',
        labelPosition:'right',
        modifier:'',
        editID:'',
    }
  },
  methods:{
    handleSizeChange(){},
    handleCurrentChange(){},
    dblClick(row){
      this.name = row.entryTypeValue
      this.editListDefault = true
      this.modifier = row.modifier
      this.optionsList = row.list
      this.editID = row.id
      this.form.expiryDays = row.expiryDays
      if(row.detail === ''){
      this.value5 = []
      }else if(row.detail !== ''){
      this.value5 = row.detail.split(',')
      }

    },
    init(){
      this.$axios.get('/NameConfigController/query?sessionId=' + localStorage.getItem('SID'))
      .then(res => {
        this.tableData = JSON.parse(res.data.data)
        this.tableDataHeader = JSON.parse(res.data.heared) 
          this.tableData.forEach((ele,index) => {
           let arr = ele.detail.split(',')
           this.tableDataHeader.forEach((item,index) => {
             arr.forEach(element => {
                if(index>0){  
                  if(item.key === element){
                    let duihao = element
                    duihao = '✓'
                    ele[item.key] = duihao
                  }
                }
             })           
           })
          })       
      })
      .catch(error => {
        console.log(error)
      })
    },
    refresh(){
      this.init()
    },
    editSubmitBtn(){
      if(this.form.expiryDays === ''){
        this.form.expiryDays = 0
      }

      this.$axios.post('/NameConfigController/update',qs.stringify({
        "sessionId":localStorage.getItem('SID'),
        'id':this.editID.toString(),
        'expiryDays':this.form.expiryDays,
        'remark':this.textarea,
        'detail':this.value5.join(',')
      }))
      .then(res => {
        if(res.data.code === '1'){
          this.$alert(res.data.message,'提示',{
            confirmButtonText:'确定',
            callback:action => {
              this.editListDefault = false
              this.init()
            }
          })
          return
        }
        this.$alert(res.data.message,'提示',{
            confirmButtonText:'确定',
            callback:action => {
              
            }
          })
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
  mounted(){
     this.init()
  },
  watch:{
    editListDefault(){
      if(this.editListDefault === true){
         let arr = []
        this.optionsList.forEach((ele,index) => {
          if(ele.sort === '1'){
            arr.push(ele.value)
          }
        })
      }else if(this.editListDefault === false){
        this.value5 = ''
        this.textarea = ''
      }
    }
  }
}
</script>
<style scoped>
.listHeader{
  height: 70px;
  width:100%;
  border-top:1px solid #e0e0e0;
 
}
.headerIconRefer{
  display:inline-block;
  width:44px;
  height:30px;
  background: url(../../images/icon.png) no-repeat -93px -5px;
  margin: 0 auto;
  border:1px solid #38E139; 
  border-radius:5px;
  float:right;
  margin-top:20px;
  margin-right:30px
}
.headerIconRefer:hover{
  display:inline-block;
  width:44px;
  height:30px;
  background: url(../../images/icon.png) no-repeat -93px -27px;
  margin: 0 auto;
  border:1px solid #38E139; 
  background-color: #38E139;
  border-radius:5px;
  float:right;
  margin-top:20px;
  margin-right:30px
}
.dataTable{
  margin-left:10px;
  margin-right:10px;
}
.iptOnline{
  width:88%
}
</style>
