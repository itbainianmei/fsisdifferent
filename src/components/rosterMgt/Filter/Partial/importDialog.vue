<template>
  <div>
    <el-dialog title="从EXCEL导入到巡检名单" :visible="visiable" width="570px" v-dialogDrag>
      <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadMb">下载模板</span>
      <div class="prompt ipC" ></div><span class="fontC" @click="helpTitle = !helpTitle" style="vertical-align: top;">模板格式要求</span>
      <div style="margin-left: 50px;margin-top: 20px;">
          <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="nameFormChange"></el-input>
          <label class="ui_button" for="filename">选择</label>
          <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
              <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileChange'
              accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
          </form>
      </div>
      <span slot="footer" class="dialog-footer" style="padding: 20px;">
        <el-button @click="importCancel">取 消</el-button>
        <el-button type="primary" @click="upload">导 入</el-button>
        <div class="promptText" v-show="helpTitle">
            <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
            <el-table
            :data="templateData"
            border
            style="width: 100%;text-align:left;">
            <el-table-column
                width="140px"
                prop="name"
                label="第一行必须包含字段">
            </el-table-column>
            <el-table-column
                prop="help"
                label="字段格式要求">
            </el-table-column>
            </el-table>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      helpTitle: false,
      templateData: [
        {
          name: "维度",
          help:
            "商户自然属性一级编码、商户自然属性二级编码、基础产品码、零售产品码、代理商编号、代理商编号(屏蔽子商户)、商户编号、商户签约名、客户编号"
        },
        {
          name: "名单值",
          help: "文本格式，不能为空"
        },
        {
          name: "备注",
          help: "文本格式，不超过200个字符"
        }
      ],
      nameFormChange: "",
      file: ""
    };
  },
  props: {
    visiable: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    downloadMb() {
      window.location = encodeURI(
        this.uploadBaseUrl + "/inspectWhiteName/exportTemplate"
      );
    },
    importCancel() {
      document.getElementById("filename").value = "";
      this.nameFormChange = "";
      this.file = "";
      this.$emit("importClose");
    },
    fileChange(e) {
      this.file = e.target.files[0];
      this.nameFormChange = e.target.files[0].name;
    },
    // 上传
    upload() {
      if (this.file === "") {
        this.$alert("不能上传空文件", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);
      this.$axios
        .post("/inspectWhiteName/import", formData)
        .then(res => {
          let result = res.data;
          if (result.code * 1 === 200) {
            document.getElementById("filename").value = "";
            this.nameFormChange = "";
            this.file = "";
            this.$emit('importSubmit');
            this.$alert(result.msg, "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {}
            });
          } else {
            this.$alert(result.msg, "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='less' scoped>
@import '../../less/roster.less';
</style>