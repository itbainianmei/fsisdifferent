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
        formLabelAlign: {
            modular:'',
            submodule:'',
            operator:'',
            opetm:'',
            operate:'',
            opeip:'',
            pmfing:'',
            opecontent:'',
            url:'',
            resoname:'',
            para:'',
            port:'',
            http:'',
            hert:'',
            body:'',
            content:''

        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      
        this.formLabelAlign.modular = JSON.parse(localStorage.getItem('operaTime')).modular
        this.formLabelAlign.submodule = JSON.parse(localStorage.getItem('operaTime')).submodule
        this.formLabelAlign.operator = JSON.parse(localStorage.getItem('operaTime')).operator
        this.formLabelAlign.opetm = JSON.parse(localStorage.getItem('operaTime')).dateStr
        this.formLabelAlign.operate = JSON.parse(localStorage.getItem('operaTime')).operate
        this.formLabelAlign.opeip = JSON.parse(localStorage.getItem('operaTime')).opeip
        this.formLabelAlign.pmfing = JSON.parse(localStorage.getItem('operaTime')).pmfing
        this.formLabelAlign.opecontent = JSON.parse(localStorage.getItem('operaTime')).opecontent
        this.formLabelAlign.url = JSON.parse(localStorage.getItem('operaTime')).url
        this.formLabelAlign.resoname = JSON.parse(localStorage.getItem('operaTime')).resoname
        this.formLabelAlign.para = JSON.parse(localStorage.getItem('operaTime')).para
        this.formLabelAlign.port = JSON.parse(localStorage.getItem('operaTime')).port
        this.formLabelAlign.http = JSON.parse(localStorage.getItem('operaTime')).http
        this.formLabelAlign.hert = JSON.parse(localStorage.getItem('operaTime')).hert
        this.formLabelAlign.body = JSON.parse(localStorage.getItem('operaTime')).body
        this.formLabelAlign.content = JSON.parse(localStorage.getItem('operaTime')).content

      /*4537*/
    //   this.$axios.post("/LogManageController/queryByLogId",qs.stringify({
    //     "logid":parseInt(this.$route.params.id),
    //     'sessionId':localStorage.getItem('SID'),
    //     'operaTime':localStorage.getItem('operaTime') ,
    //   }))
    //     .then(res => {
    //       console.log(res.data)
    //       this.formLabelAlign = res.data[0]
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
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
