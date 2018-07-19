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
import qs from "qs";
export default {
  data() {
    return {
      refreshPermission: false, //刷新权限
      editPermission: false, //修改权限

      currentPage: 1,
      tableData: [],
      tableDataHeader: [],
      name: "",
      form: {
        expiryDays: 1
      },
      editListDefault: false,
      optionsList: [],
      value5: [],
      textarea: "",
      labelPosition: "right",
      modifier: "",
      editID: ""
    };
  },
  created () {
    const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
    this.refreshPermission = idList.indexOf(335) === -1 ? false : true;
    this.editPermission = idList.indexOf(337) === -1 ? false : true;
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    dblClick(row) {
      if (this.editPermission === false) return;
      this.name = row.entryTypeValue;
      this.editListDefault = true;
      this.modifier = row.modifier;
      this.optionsList = row.list;
      this.editID = row.id;
      this.textarea = row.remark;
      this.form.expiryDays = row.expiryDays;
      if (row.detail === "") {
        this.value5 = [];
      } else if (row.detail !== "") {
        this.value5 = row.detail.split(",");
      }
    },
    init() {
      this.$axios
        .get(
          "/NameConfigController/query?sessionId=" + localStorage.getItem("SID")
        )
        .then(res => {
          this.tableData = JSON.parse(res.data.data);
          this.tableDataHeader = JSON.parse(res.data.heared);
          this.tableData.forEach((ele, index) => {
            let arr = ele.detail.split(",");
            this.tableDataHeader.forEach((item, index) => {
              arr.forEach(element => {
                if (index > 0) {
                  if (item.key === element) {
                    let duihao = element;
                    duihao = "✓";
                    ele[item.key] = duihao;
                  }
                }
              });
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    refresh() {
      this.init();
    },
    editSubmitBtn() {
      if (this.form.expiryDays === "") {
        this.form.expiryDays = 0;
      }

      this.$axios
        .post(
          "/NameConfigController/update",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            id: this.editID.toString(),
            expiryDays: this.form.expiryDays,
            remark: this.textarea,
            detail: this.value5.join(",")
          })
        )
        .then(res => {
          if (res.data.code === "1") {
            this.$alert(res.data.message, "系统提示", {
              confirmButtonText: "确定",
              type:'success',
              callback: action => {
                this.editListDefault = false;
                this.init();
              }
            });
            return;
          }
          this.$alert(res.data.message, "系统提示", {
            confirmButtonText: "确定",
            type:'warning',
            callback: action => {}
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    editListDefault() {
      if (this.editListDefault === true) {
        let arr = [];
        this.optionsList.forEach((ele, index) => {
          if (ele.sort === "1") {
            arr.push(ele.value);
          }
        });
      } else if (this.editListDefault === false) {
        this.value5 = "";
        this.textarea = "";
      }
    }
  }
};
</script>
<style scoped>
.listHeader {
  height: 70px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
}
.headerIconRefer {
  display: inline-block;
  width: 44px;
  height: 30px;
  background: url(../../images/icon.png) no-repeat -93px -5px;
  margin: 0 auto;
  border: 1px solid #38e139;
  border-radius: 5px;
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
.headerIconRefer:hover {
  display: inline-block;
  width: 44px;
  height: 30px;
  background: url(../../images/icon.png) no-repeat -93px -27px;
  margin: 0 auto;
  border: 1px solid #38e139;
  background-color: #38e139;
  border-radius: 5px;
  float: right;
  margin-top: 20px;
  margin-right: 30px;
}
.dataTable {
  margin-left: 10px;
  margin-right: 10px;
}
.iptOnline {
  width: 88%;
}
</style>
