// 解冻提示配置
<template>
  <div class="dataContent">
      <div class="contentBotoom">
          <div class="button">
                <div class="leftButton clear">
                    <div class="BotoomBtn leftRadius" @click="newAdd = true" title='新建' v-if="createPermisson">
                        <div class="addIcon"></div>
                    </div>
                    <div class="BotoomBtn" @click="amendOpen" title='修改' v-if="editPermission">
                          <div class="xgIcon"></div>
                    </div>
                    <div class="BotoomBtn" @click="removeData" title='删除'  v-if="delPermission">
                          <div class="removIcon"></div>
                    </div>
                    <div class="BotoomBtn rightRadius" @click="refrech" title='刷新' v-if="refreshPermission">
                          <div class="refreshIcon"></div>
                    </div>
                </div>
          </div>
      </div>
      <div class="contentData">
          <div class="dataTable clear">
             <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
                >
                 <el-table-column
                    type="selection"
                    width="55"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="id"
                    label="解冻提示配置ID"
                    align='center'
                  >
                  </el-table-column>
                  <el-table-column
                    prop="ruleScore"
                    label="对应规则分值"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="hint"
                    label="提示语"
                    align='center'
                    >
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="状态"
                    align='center'
                   >
                  </el-table-column>
                  <el-table-column
                    prop="lastUpdateTime"
                    label="最后更新时间"
                    align='center'
                    :formatter="tableFormatDate"
                   >
                  </el-table-column>
              </el-table>
          </div>
          <!-- <div class="block">
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
                    layout="prev, pager, next"
                    :total="70"
                    @current-change="handleCurrentChange">
                  </el-pagination>
              </div>
          </div> -->
      </div>
      <el-dialog title="新建解冻提示" :visible.sync="newAdd" width="30%" v-dialogDrag>
        <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" label-width="100px"  style="margin-left:6%;">

          <el-form-item label="对应规则分值:">
            <el-col :span="8">
              <el-form-item prop="date1">
                <el-input min="0" type="number" v-model="form.leftNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="margin-left:17px;">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-input min="0" type="number" v-model="form.rightNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="提示语:" prop="roleDesc">
              <el-input type="textarea" placeholder="限制150字" :maxlength="150"  :rows="6" v-model="form.roleDesc" style="width: 84%"></el-input>
          </el-form-item>

          <el-form-item label="状态:" >
                <el-checkbox v-model="form.radioChecked">是否启用</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAdd">取 消</el-button>
          <el-button type="primary" @click="newData">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改解冻提示" :visible.sync="amend" width="30%" v-dialogDrag>
        <el-form ref="form" :model="form" :rules="rules"  class="demo-ruleForm" label-width="100px"  style="margin-left:6%;">

          <el-form-item label="对应规则分值:">
            <el-col :span="8">
              <el-form-item prop="date1">
                <el-input min="0" type="number" v-model="amendForm.leftNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="margin-left:17px;">-</el-col>
            <el-col :span="8">
              <el-form-item prop="date2">
                <el-input min="0" type="number" v-model="amendForm.rightNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="提示语:" prop="roleDesc">
              <el-input type="textarea" placeholder="限制150字" :maxlength="150"  :rows="6" v-model="amendForm.roleDesc" style="width: 84%"></el-input>
          </el-form-item>

          <el-form-item label="状态:" >
                <el-checkbox v-model="amendForm.radioChecked">是否启用</el-checkbox>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeAmend">取 消</el-button>
          <el-button type="primary" @click="amendData">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="removeItemDialog" width="30%" v-dialogDrag>
       <div style='width:100%;text-align:center'>
         <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
         <p>确定删除?</p>
       </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="removeItemDialog = false">取 消</el-button>
          <el-button type="primary" @click="removeSaveBtn">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>
<script >
import qs from 'qs'
export default {
  name:'解冻提示配置',
    data() {
      return {
        createPermisson: true,
        editPermission: true,
        delPermission: true,
        refreshPermission: true,
        removeItemDialog:false,
        multipleSelection:[],
        amend:false,
        newAdd:false,
        // tableData:[{ceshi:'测试数据0'},{ceshi:'测试数据1'},{ceshi:'测试数据2'}],
        tableData:[],
        amendForm:{
          roleDesc:'',
          leftNumber:'',
          rightNumber:'',
          radioChecked:false,
        },
        form:{
          roleDesc:'',
          leftNumber:'',
          rightNumber:'',
          radioChecked:false,
        },
        rules:{
          roleDesc:[
            {max: 150, min:0,message: ' ', trigger: 'blur' }
          ],
        },
      }
    },
    created (){
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.createPermisson = idList.indexOf(80) === -1 ? false : true;
      this.editPermission = idList.indexOf(81) === -1 ? false : true;
      this.delPermission = idList.indexOf(82) === -1 ? false : true;
      this.refreshPermission = idList.indexOf(567) === -1 ? false : true;
    },
    mounted(){
       this.init()
    },
    methods: {
      refrech(){
       this.init()
      },
      init(){
        this.$axios.post('/UnfreezeConfigController/queryUnfreezeConfig',qs.stringify({
          sessionId:localStorage.getItem('SID'),
        }))
          .then(res => {
            res.data.recordList.forEach(element => {
                if(element.status == 0){
                    element.status = '停用'
                }else if(element.status == 1){
                    element.status = '启用'
                }
            });
            this.tableData = res.data.recordList
          })
          .catch(error => {
            console.log(error)
          })
      },
      newData(){
        if(parseInt(this.form.leftNumber) < 0 || parseInt(this.form.rightNumber) < 0){

          this.$alert('请检查表单是否填写正确', '系统提示', {
                confirmButtonText: '确定',
          });
          return
        }

        if(parseInt(this.form.leftNumber) > parseInt(this.form.rightNumber)){
          this.$alert('规则分值左侧需小于等于右侧', '系统提示', {
                confirmButtonText: '确定',
          });
          return
        }

        this.$axios.post('/UnfreezeConfigController/addUnfreezeConfig',qs.stringify({
          sessionId:localStorage.getItem('SID'),
          ruleScore:this.form.leftNumber + '-' + this.form.rightNumber,
          hint:this.form.roleDesc,
          status: this.form.radioChecked === false ? 0 : 1,
        }))
          .then(res => {
            // console.log(res.data)
            if(res.data.code == 1){
                this.$alert('操作成功', '系统提示', {
                  confirmButtonText: '确定',
                  type:'success',
                  callback:action=>{
                    this.newAdd = false
                    this.form.leftNumber = ''
                    this.form.rightNumber = ''
                    this.form.roleDesc = ''
                    this.form.radioChecked = false
                    this.init()
                  }
                });

            }else if(res.data.code !== 1){
              this.$alert('操作失败','系统提示',{
                confirmButtonText:'确定',
                type:'warning'
              })
            }


          })
          .catch(error => {
            console.log(error)
          })


      },
      tableFormatDate(row, column, cellValue, index) {
        return cellValue.substr(0, cellValue.length - 2);
      },
      amendOpen(){
        if(this.multipleSelection.length == 0){
          this.$alert('请选择一条数据进行修改', '系统提示', {
                confirmButtonText: '确定',
                type:'warning',
        });
        }if(this.multipleSelection.length > 0){
          // 多条数据选择第一个被选择的数据
          this.amend = true;
          // console.log(this.multipleSelection[0])
          this.amendForm.leftNumber = this.multipleSelection[0].ruleScore.split('-')[0]
          this.amendForm.rightNumber = this.multipleSelection[0].ruleScore.split('-')[1]
          this.amendForm.roleDesc = this.multipleSelection[0].hint
          if(this.multipleSelection[0].status == '停用'){
            this.amendForm.radioChecked = false;
          }else{
            this.amendForm.radioChecked = true;
          }
        }
      },
      amendData(){
        console.log(this.amendForm.leftNumber)
        console.log(this.amendForm.rightNumber)
        if(this.amendForm.roleDesc.length > 150){


        }else if(this.amendForm.leftNumber < 0 || this.amendForm.rightNumber < 0 ||parseInt(this.amendForm.leftNumber)  > parseInt(this.amendForm.rightNumber)){
          console.log(111)
          this.$alert('请检查表单是否填写正确', '系统提示', {
                confirmButtonText: '确定',
          });
        }else{

            if(this.amendForm.radioChecked == false){
              this.amendForm.radioChecked = 0
            }else{
              this.amendForm.radioChecked = 1
            }

              this.$axios.post('/UnfreezeConfigController/updateUnfreezeConfig',qs.stringify({
                  sessionId:localStorage.getItem('SID'),
                  id:this.multipleSelection[0].id,
                  ruleScore:this.amendForm.leftNumber + '-' + this.amendForm.rightNumber,
                  hint:this.amendForm.roleDesc,
                  status:this.amendForm.radioChecked,
              }))
                .then(res => {
                  // console.log(res.data)
                  if(res.data.code == 1){
                      this.$alert('操作成功', '系统提示', {
                        confirmButtonText: '确定',
                        type:'success',
                        callback:action=>{
                          this.amend = false
                          this.amendForm.leftNumber = ''
                          this.amendForm.rightNumber = ''
                          this.amendForm.roleDesc = ''
                          this.amendForm.radioChecked = false
                          this.init()
                        }
                      });
                  }else if(res.data.code !== 1){
                    this.$alert('操作失败','系统提示',{
                      confirmButtonText:'确定',
                      type:'warning'
                    })
                  }
                })
                .catch(error => {
                  console.log(error)
                })
        }
      },
      closeAmend(){
        this.amend = false;
        this.form.leftNumber = ''
        this.form.rightNumber = ''
        this.form.roleDesc = ''
        this.form.radioChecked = false
      },
      closeAdd(){
        this.newAdd = false;
        this.form.leftNumber = ''
        this.form.rightNumber = ''
        this.form.roleDesc = ''
        this.form.radioChecked = false
      },
      removeSaveBtn(){

          let ids = []
          for(let i = 0; i <this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id)
          }

          console.log(ids.join(","))

          this.$axios.post('/UnfreezeConfigController/deleteUnfreezeConfig',qs.stringify({
            sessionId:localStorage.getItem('SID'),
            configIds:ids.join(","),
          }))
            .then(res => {
              console.log(res)
              if(res.data.code == 1){
                  this.$alert('删除成功', '系统提示', {
                      type:'success',
                      confirmButtonText: '确定',
                      callback:action => {
                         this.removeItemDialog = false
                          this.init()
                      }
                  });
              }else if(res.data.code !== 1){
                  this.$alert('删除失败', '系统提示', {
                      type:'success',
                      confirmButtonText: '确定',
                      callback:action => {

                      }
                  });
              }

            })
            .catch(error => {
              console.log(ids.join(","))
              console.log(error)
            })
      },
      removeData(){
        if(this.multipleSelection.length == 0 ){
            this.$alert('请至少选择一条记录', '系统提示', {
                    confirmButtonText: '确定',
                    type:'warning',
          });
          }else if(this.multipleSelection.length > 0){
            this.removeItemDialog = true
          }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleSizeChange(val) {
        console.log(val.target.value);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style scoped>
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
  .paginationRight{display:inline-block;float: right;}
.dialog-footer{background-color: #F1F2F5;border: none}
.clear:after {
  clear: both;
  content: ".";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.dataContent {
  width: 100%;
  background-color: #fff;
  font-size: 13px;
}
.ipt {
  width: 200px;
  height: 36px;
  margin-right: 40px;
  margin-left: 10px;
  border-radius: 15px;
}
.contentTop {
  padding: 30px;
  padding-left: 80px;
  border-bottom: 1px solid #e0e0e0;
  border-top:1px solid #e0e0e0;
}
.contentBotoom {
  height: 60px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
  padding-top: 25px;
}
.BotoomBtn {
  width: 44px;
  height: 30px;
  margin: 0;
  margin-left: -1px;
  border: 1px solid #38e139;
  background-color: #fff;
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
.leftButton {
  float: left;
  margin-left: 80px;
}
.contentData {
  background-color: #fff;border-right: 10px solid #ffffff;
}
.addIcon {
  background: url(../../images/icon.png) no-repeat 6px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.addIcon:hover {
  background: url(../../images/icon.png) no-repeat 6px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.amendIcon {
  background: url(../../images/icon.png) no-repeat -27px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.amendIcon:hover {
  background: url(../../images/icon.png) no-repeat -27px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.xgImg{
  background: url(../../images/icon.png) no-repeat -37px -7px;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    margin-top: 5px;
    border: 1px solid #38E139;
    cursor: pointer;
    border-radius: 5px;
}
.xgImg:hover{
  background: url(../../images/icon.png) no-repeat -37px -32px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  background-color: #38E139;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 5px;

}
.removIcon {
  background: url(../../images/icon.png) no-repeat -62px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.removIcon:hover {
  background: url(../../images/icon.png) no-repeat -62px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.refreshIcon {
  background: url(../../images/icon.png) no-repeat -93px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.refreshIcon:hover {
  background: url(../../images/icon.png) no-repeat -93px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.downloadIcon {
  background: url(../../images/icon.png) no-repeat -127px -8px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.downloadIcon:hover {
  background: url(../../images/icon.png) no-repeat -127px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 5px;
}
.active {
  background-color: #38e139;
}
.serchImg {
  width: 120px;
  height: 36px;
  border-radius: 100px;
  background-color: #3faaf9;
  display: -webkit-inline-box;
  position: relative;
  cursor: pointer;
}
.serchImg img {
  width: 37px;
  position: absolute;
  left: 40px;
}
.serBtn {
  float: left;
}
.block {
  margin-top: 25px;
  margin-left: 25px;
}
.el-table th > .cell {
  color: #353535;
  font-weight: 400;
}
.block{
  float: right;
  margin-right: 20px;
}
.elIconP{
  position: relative;
}
.elIconPosction{
  position: absolute;
  font-size: 10px;
}
.el-icon-caret-top{
  top: 45px;
  right: 5px;
  font-size: 17px;
}
.el-icon-caret-bottom{
  top: 57px;
  right: 5px;
  font-size: 17px;
}
input{
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 36px;
    line-height: 36px;
    outline: none;
    padding-left: 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 60%;
    padding-right: 10px;
}
input:focus{
    border: 1px solid #3FAAF9;
}
.iptOnline{
  margin-right:15px;
  height: 36px;
  line-height: 36px;
  width: 200px;

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
</style>
