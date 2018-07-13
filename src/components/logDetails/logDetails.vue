<template>
    <div class="content">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" >
                <el-form-item label="模块:" label-width="150px" class="formWidth" >
                    <el-input v-model="formLabelAlign.modular" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="子模块:" label-width="150px" class="formWidth" >
                    <el-input v-model="formLabelAlign.submodule" readonly="readonly"  ></el-input>
                </el-form-item>
                <el-form-item label="操作人:" label-width="150px" class="formWidth">
                    <el-input v-model="formLabelAlign.operator" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="操作时间:" label-width="150px" class="formWidth" >
                    <el-input v-model="formLabelAlign.opetm" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="操作:" label-width="150px" class="formWidth" >
                    <el-input v-model="formLabelAlign.operate" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="操作ip:" label-width="150px" class="formWidth">
                    <el-input v-model="formLabelAlign.opeip" readonly="readonly"></el-input>
                </el-form-item>


                <el-form-item label="设备指纹:" label-width="150px" >
                  <el-input v-model="formLabelAlign.pmfing" type="textarea"    readonly="readonly"  ></el-input>
                </el-form-item>
                <el-form-item label="操作内容:" label-width="150px">
                    <el-input v-model="formLabelAlign.opecontent" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="请求的完整URL:" label-width="150px">
                    <el-input v-model="formLabelAlign.url" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="请求的资源名:" label-width="150px">
                    <el-input v-model="formLabelAlign.resoname" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="请求的参数:" label-width="150px">
                    <el-input v-model="formLabelAlign.para" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="请求所使用的端口号:" label-width="150px">
                    <el-input v-model="formLabelAlign.port" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="请求使用的HTTP方法:" label-width="150px">
                    <el-input v-model="formLabelAlign.http" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="请求的头信息:" label-width="150px">
                    <el-input v-model="formLabelAlign.hert"  type="textarea"  :rows="3" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="请求的Body信息:" label-width="150px">
                    <el-input v-model="formLabelAlign.body"  type="textarea"  :rows="3" readonly="readonly" ></el-input>
                </el-form-item>
                <el-form-item label="响应内容:" label-width="150px">
                    <el-input v-model="formLabelAlign.content"  type="textarea"  :rows="3" readonly="readonly" ></el-input>
                </el-form-item>

            </el-form>

    </div>
</template>

<script>
  import qs from "qs"
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {},
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      console.log(this.$route.params.id)
      /*4537*/
      this.$axios.post("/LogManageController/queryByLogId",qs.stringify({
        "logid":parseInt(this.$route.params.id),
        'sessionId':localStorage.getItem('SID'),
        'operaTime':localStorage.getItem('operaTime') ,
      }))
        .then(res => {
          console.log(res.data)
          this.formLabelAlign = res.data[0]
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
</script>

<style scoped>
.content{
    width: 95%;
    height: 100%;
    margin: 0 auto;
    padding-top: 25px;
    margin-bottom: 180px;
    border-top: 1px solid #e0e0e0;
}
  .formWidth{
    width: 33%;display: inline-block
  }
</style>
