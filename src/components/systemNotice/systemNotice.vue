<template>
  <div class="dataContent" >
    <div class="contentTop clear">
      <div class="serBtn">模板名称：  <el-input clearable placeholder="请输入内容" class="ipt"  v-model="getInfo" ></el-input></div>
      <div class="serBtn">类型：
        <template>
          <el-select v-model="nType" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="serchImg serBtn" @click="searchList()" v-if="btnPower.searchBtn">
        <img src="../../images/fdj.png" alt="" >
      </div>
    </div>
    <div class="contentBotoom">
      <div class="button">
        <div class="leftButton clear">
          <!--添加table新数据-->
          <div class="BotoomBtn leftRadius" v-if="btnPower.addBtn">
            <div class="addIcon" data-title='添加'  @click="dataAddClick" id='addIconTitle'></div>
          </div>
          <!--删除table的数据-->
          <div class="BotoomBtn rightRadius" v-if="btnPower.deleteBtn">
            <div class="removIcon" data-title='删除' @click="delcontactInfo" id='removeIconTitle'></div>
          </div>

        </div>
      </div>
    </div>
    <div class="dialog">
      <div class="hiddeBox _c">
        <el-dialog :title="`${subType?'新建':'修改'}用户`" :visible.sync="dataAdd" width="600px" v-dialogDrag>
          <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item label="模板名称" prop="name">
                    <el-input placeholder="请输入模板名称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="form.type">
                    <el-radio :label="1">邮箱</el-radio>
                    <el-radio :label="2">短信</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="通知内容" prop="content">
                  <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                  <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item> -->
            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dataAddClose">取 消</el-button>
            <el-button type="primary" @click="addUserSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="contentData">
      <div class="dataTable clear">
        <el-table
          ref="multipleTable"
          :data="infoList"
          tooltip-effect="dark"
          style="width: 100%"
          @row-dblclick = "dataEdit"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="templetName"
            label="模板名称">
          </el-table-column>
          <el-table-column
            prop="templetType"
            :formatter="typeFormat"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="updateBy"
            label="最后操作人"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="最后操作时间"
            :formatter="dateFormat"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </div>

      <div class="block">
          <!-- <div class='pagination'>
              <span>每页显示</span>
              <select  class="evetotal"  @change="handleSizeChange">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
          </div> -->
          <div class='paginationRight'>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size=20
                layout="prev, pager, next"
                :total = totalCountNum
                :disabled="this.totalCountNum > 20 ? false : true">
              </el-pagination>
          </div>
      </div>
    </div>
    <el-dialog v-dialogDrag title="删除" :visible.sync="delDialog" width="30%">
      <div style='width:100%;text-align:center'>
            <span>确定要删除以下用户吗？</span>
            <p v-for="(item,index) in multipleSelection" :key="index">模板名称={{item.templetName}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialog = false">取 消</el-button>
        <el-button type="primary" @click="delSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script >
import qs from "qs";
const padDate = function(value) {
  return value < 10 ? `0${value}` : value;
};
export default {
  name: "systemInformation",
  data() {
    return {
      getInfo: "",
      infoList: [],
      addPermission: true,
      delPermission: true,
      pageNum: 1,
      pageSize: 20,
      totalCountNum: 20,
      dataAdd: false,
      contactInfoIds: [],
      multipleSelection: [],
      delDialog: false,
      nType: null,
      subType: true,
      temId: null,
      typeList: [
        {id: null,name:'全部'},
        {id: 1,name:'邮箱'},
        {id: 2,name:'短信'}
      ],
      form: {
        name: "",
        type: "",
        content: "",
        remarks: ""
      },
      btnPower: {
        reviseBtn:false,
        searchBtn:false,
        addBtn:false,
        deleteBtn:false
      },
      rules: {
        name: [
            { required: true, message: " *请输入模板名称", trigger: "blur" },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '* 选择类型', trigger: 'change' }
        ],
        content: [
            { required: true, message: " *请输入说明内容", trigger: "blur" },
            { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.deleteBtn = idList.indexOf(654) === -1 ? false : true
    this.btnPower.addBtn = idList.indexOf(653) === -1 ? false : true
    this.btnPower.searchBtn = idList.indexOf(652) === -1 ? false : true
    this.btnPower.reviseBtn = idList.indexOf(663) === -1 ? false : true
  },
  methods: {
    dateFormat: function(row, column) {
      const dater = row[column.property];
      if (dater == undefined) {
        return "";
      }
      const date = new Date(dater);
      const year = date.getFullYear();
      const month = padDate(date.getMonth() + 1);
      const day = padDate(date.getDate());
      const hours = padDate(date.getHours());
      const minutes = padDate(date.getMinutes());
      const seconds = padDate(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    typeFormat(row) {
      let type;
      switch(row.templetType) {
        case '1':
          type = '邮箱';
          break;
        case '2':
          type = '短信';
          break;
      }
      return type;
    },
    handleSizeChange(val) {
      this.pageSize = parseInt(val.target.value);
      this.getInfoList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      if (this.totalCountNum > 20)
        this.getInfoList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.contactInfoIds = '';
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.contactInfoIds+=`${this.multipleSelection[i].id},`;
      }
    },
    init() {
      this.getInfo = "";
      this.pageNum = 1;
      this.getInfoList();
    },
    // 新增
    addUserSubmit() {
      const subUrl = this.subType ? '/NoticeTempletConf/addtemplet' : '/NoticeTempletConf/updtemplet';
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
                templetName: this.form.name,
                templetType: this.form.type,
                noticeContent: this.form.content,
                remarks: this.form.remarks
              };
          if(this.temId)params.id = this.temId;
          this.$axios
            .post(
              subUrl,
              qs.stringify(params)
            )
            .then(res => {
              this.dataAddClose();
              this.$refs.form.resetFields();
              if (res.data.code == 200) {
                this.$alert(res.data.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "success",
                });
                 this.init();
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    dataAddClose() {
      this.dataAdd = false;
      this.$refs.form.resetFields();
    },
    dataEdit(row) {
      if(!this.btnPower.reviseBtn){
        return 
      }
      this.dataAdd = true;
      this.subType = false;
      this.temId = row.id;
      this.form.name = row.templetName;
      this.form.type = parseInt(row.templetType);
      this.form.content = row.noticeContent;
      this.form.remarks = row.remarks;
    },
    delcontactInfo() {
      if (this.contactInfoIds.length === 0) {
        this.$alert("请选择您要删除的用户", "出错提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      this.delDialog = true;
    },
    // 删除用户
    delSubmit() {
      this.$axios
        .post(
          "/NoticeTempletConf/deltemplet",
          qs.stringify({
            id: this.contactInfoIds.slice(0,this.contactInfoIds.length-1)
          })
        )
        .then(res => {
          this.delDialog = false;
          if (res.data.code == 200) {
            this.$alert("删除成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: actions => {}
            });
            this.init();
          } else {
            this.$alert(res.data.errMsg, "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        });
    },
    searchList () {
      this.pageNum = 1;
      this.getInfoList();
    },
    // 获取权限列表
    getInfoList() {
      this.$axios
        .post(
          "/NoticeTempletConf/gettemplet",
          qs.stringify({
            templetName: this.getInfo,
            templetType: this.nType,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          })
        )
        .then(res => {
          // this.infoList = [];
          this.infoList = res.data.data.returnList;
          this.totalCountNum = res.data.data.total;
        });
    },
    dataAddClick() {
      this.dataAdd = true;
      this.subType = true;
      this.temId = null;
      this.form.name = '';
      this.form.type = null;
      this.form.content = '';
      this.form.remarks = '';
    }
  },
  mounted() {
    this.getInfoList();
  }
};
</script>
<style scoped>
.el-input__inner {
  width: 450px;
}
.dialog-footer {
  background-color: #f1f2f5;
  border: none;
}
.dialogLeft {
  float: left;
  border-right: 1px solid #ccc;
  /* padding-right: 19px;
    margin-right: 36px; */
  padding: 0 15px;
  width: 40%;
}
.dialogRight {
  float: left;
  width: 52%;
  max-height: 400px;
  overflow-y: scroll;
  padding-left: 15px;
}

.addIpt {
  width: 187px;
  height: 26px;
  border-radius: 37px;
}
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
  height: 39px;
  margin-right: 40px;
  margin-left: 10px;
  border-radius: 37px;
}
.contentTop {
  padding: 30px;
  padding-left: 80px;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}
.contentBotoom {
  height: 60px;
  background-color: #fff;
  font-size: 13px;
  padding-top: 25px;
  margin-left: 47px;
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
.contentData {
  background-color: #fff;
  border-right: 10px solid #ffffff;
  padding-left: 10px;
}
.leftButton {
  float: left;
  margin-left: 80px;
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
.xgImg {
  background: url(../../images/icon.png) no-repeat -37px -7px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  margin-top: 5px;
  border: 1px solid #38e139;
  cursor: pointer;
  border-radius: 5px;
}
.xgImg:hover {
  background: url(../../images/icon.png) no-repeat -37px -32px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  background-color: #38e139;
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
  margin-left: 48px;
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
.block {
  float: right;
  margin-right: 20px;
}
.elIconP {
  position: relative;
}
.elIconPosction {
  position: absolute;
  font-size: 10px;
}
.el-icon-caret-top {
  top: 45px;
  right: 5px;
  font-size: 17px;
}
.el-icon-caret-bottom {
  top: 57px;
  right: 5px;
  font-size: 17px;
}
input:focus {
  border: 1px solid #3faaf9;
}
.disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
#addIconTitle,
#removeIconTitle,
#refreshIconTitle,
#downloadIconTitle {
  position: relative;
}
#addIconTitle:hover::after,
#removeIconTitle:hover::after,
#refreshIconTitle:hover::after,
#downloadIconTitle:hover::after {
  content: attr(data-title);
  position: absolute;
  top: 35px;
  left: 0px;
  line-height: 26px;
  height: 26px;
  width: 44px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);
  z-index: 11;
  font-size: 12px;
  color: #333333;
}
</style>
