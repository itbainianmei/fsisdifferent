<template>
    <div>
      <search-form :searchForm="searchForm" :queryEnumList="queryEnumList" @search="search" @resetForm="resetForm"></search-form>
      <div class="button">
          <div class="BotoomBtn leftRadius" @click="add" data-title='添加'>
            <div class="btn-icon addIcon" ></div>
          </div>
          <div class="BotoomBtn" @click="del" data-title='删除'>
            <div class="btn-icon removIcon"></div>
          </div>
          <div class="BotoomBtn improt-btn" data-title='导入' @click="importList">
            <div class="btn-icon refreshIcon"></div>
          </div>
          <div class="BotoomBtn rightRadius" data-title='下载' @click="exportList">
            <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
          </div>
      </div>
      <div class="dataTable clear">
        <el-table :data="tableData" border style="width:100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="维度" prop="tag" show-overflow-tooltip></el-table-column>
          <el-table-column label="值" prop="unique"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" :formatter="dateTimeFormatUtil"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime" :formatter="dateTimeFormatUtil"></el-table-column>
          <el-table-column label="操作员" prop="updateBy"></el-table-column>
          <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="block">
        <div class="paginationRight">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="paginationInfo.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="paginationInfo.total">
          </el-pagination>
        </div>
      </div>
      <add-dialog v-if="dialogConf.addDialogVisiable" :visiable="dialogConf.addDialogVisiable" :queryEnumList="queryEnumList" @addClose="addClose" @addSubmit="addSubmit"></add-dialog>
      <import-dialog v-if="dialogConf.importDialogVisiable" :visiable="dialogConf.importDialogVisiable" @importClose="importClose" @importSubmit="importSubmit"></import-dialog>
    </div>
</template>

<script>
import qs from "qs";
import searchForm from "./Partial/searchForm";
import addDialog from "./Partial/addDialog";
import importDialog from "./Partial/importDialog";

export default {
  data() {
    return {
      searchForm: {
        startDate: "2018-09-30 12:00:00",
        endDate: "2018-09-30 12:00:00",
        tag: "",
        uniqueId: ""
      },
      paginationInfo: {
        pageNum: 1,
        pageSize: 10,
        total: null
      },
      queryEnumList: [], //维度列表
      tableData: [], //表格数据
      multipleSelection: [], //选中的表格数据
      dialogConf: {
        addDialogVisiable: false,
        importDialogVisiable: false
      }
    };
  },
  components: { searchForm, addDialog, importDialog },
  created() {
    this.getEnumList();
    this.initSearch();
  },
  methods: {
    // 获取维度列表
    getEnumList() {
      this.$axios
        .post("/SysConfigController/queryEnum", qs.stringify({ type: 132 }))
        .then(res => {
          this.queryEnumList = res.data;
          this.queryEnumList.unshift({
            sysname: '全部',
            label: '全部',
            sysconid: '',
            syscode: ''
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    search(params = {}) {
      const _params = {
        pageNum: 1,
        pageSize: this.paginationInfo.pageSize
      };
      Object.assign(_params, params);
      this.paginationInfo.pageNum = _params.pageNum;
      this.$axios
        .post("/inspectWhiteName/query", qs.stringify(_params))
        .then(res => {
          const result = res.data;
          if (result.code == 200 && result.data) {
            this.tableData = result.data.recordList;
            this.paginationInfo.total = result.data.totalCount;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm() {
      this.initSearch();
    },
    // 搜索条件重置为初始值
    initSearch() {
      Object.keys(this.searchForm).forEach(key => {
        this.searchForm[key] = "";
      });
      this.paginationInfo.pageSize = 10;
      this.paginationInfo.pageNum = 1;
      this.paginationInfo.total = null;
      const _params = { ...this.searchForm, ...this.paginationInfo };
      this.search(_params);
    },
    // 当前页重置为1
    initFirstPageSearch() {
      this.paginationInfo.pageNum = 1;
      const _params = { ...this.searchForm, ...this.paginationInfo };
      this.search(_params);
    },
    handleSizeChange(val) {
      this.paginationInfo.pageSize = val;
      this.paginationInfo.pageNum = 1;
      const _params = {
        ...this.paginationInfo,
        ...this.searchForm
      };
      this.search(_params);
    },
    handleCurrentChange(val) {
      this.paginationInfo.pageNum = val;
      const _params = {
        ...this.paginationInfo,
        ...this.searchForm
      };
      this.search(_params);
    },
    add() {
      this.dialogConf.addDialogVisiable = true;
    },
    del() {
      if (this.multipleSelection.length === 0) {
        this.$alert("请至少选中一条需要处理的数据", "提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
      } else if (this.multipleSelection.length > 0) {
        this.$confirm("确认将选中的名单值删除？", "提示", {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            const idList = this.multipleSelection.map(item => item.id);
            const ids = idList.join(",");
            this.$axios
              .post("/inspectWhiteName/delete", qs.stringify({ ids }))
              .then(res => {
                const result = res.data;
                if (result.code == 200) {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                    showClose: true
                  });
                  this.initFirstPageSearch();
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(action => {
            console.log(action);
          });
      }
    },
    addSubmit(form) {
      this.$axios
        .post("/inspectWhiteName/add", qs.stringify(form))
        .then(res => {
          const result = res.data;
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.initFirstPageSearch();
            this.dialogConf.addDialogVisiable = false;
          }
        });
    },
    addClose() {
      this.dialogConf.addDialogVisiable = false;
    },
    // 导入
    importList() {
      this.dialogConf.importDialogVisiable = true;
    },
    importClose() {
      this.dialogConf.importDialogVisiable = false;
    },
    importSubmit() {
      this.dialogConf.importDialogVisiable = false;
      this.initFirstPageSearch();
    },
    // 下载列表
    exportList() {
      const params = qs.stringify(this.searchForm);
      window.location = encodeURI(
        this.uploadBaseUrl + "/inspectWhiteName/export?" + params
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
<style lang='less' scoped>
@import "~@/less/button.less";
</style>
