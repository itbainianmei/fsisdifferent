<template>
  <div>
    <el-dialog title="从EXCEL导入到名单" :visible="config.visiable" width="570px" v-dialogDrag>
      <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downloadMb">下载模板</span>
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
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameFormChange: "",
      file: ""
    };
  },
  props: {
    config: {
      type: Array,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    downloadMb() {
      window.location = encodeURI(
        this.uploadBaseUrl + this.config.dwTemUrl
      );
    },
    importCancel() {
      document.getElementById("filename").value = "";
      this.nameFormChange = "";
      this.file = "";
      this.$emit("close");
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
        .post(this.config.uploadUrl, formData)
        .then(res => {
          let result = res.data;
          if (result.code * 1 === 200) {
            document.getElementById("filename").value = "";
            this.nameFormChange = "";
            this.file = "";
            this.$emit('submit');
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
.dataTable {
    margin: 15px 10px 0;
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
.prompt {
    width: 18px;
    height: 18px;
    background-image: url(~@/images/prompt.png);
}
.listValInp {
    width: 60%;
    height: 36px;
}
.fontC {
    color: #3dc6b2;
    cursor: pointer;
    line-height: 17px;
}

.importe {
    width: 18px;
    height: 18px;
    background-image: url(~@/images/importe.png);
}
.ipC {
    float: left;
    margin-left: 10px;
    margin-right: 5px;
}
.ui_button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #409eff;
    border-color: #409eff;
    color: #409eff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
}
.ui_button:hover {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #409eff;
    border: 1px solid #409eff;
    border-color: #409eff;
    color: #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 23px;
    font-size: 14px;
    border-radius: 34px;
}
</style>