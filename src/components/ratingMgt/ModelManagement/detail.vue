<!--评级模型编辑-->
<template>
    <div>
      <div class="button">
        <el-button type="primary">保存</el-button>
        <el-button type="success">验证</el-button>
      </div>
      <codemirror ref="edit" v-model="code" :options="cmOptions"></codemirror>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      modelDetail: [],
      code:'qweqewqewqewqewqewqewq',
      id:this.$route.params.id,
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        lineWrapping: true,
        theme: 'material',
        autofocus: true,
        readOnly: false
      }
    }
  },
  methods: {
    getDetail() {
      this.$axios
        .post(
          '/rateManage/queryAll',
          qs.stringify({
            modelId: this.$route.params.id
          })
        )
        .then(res => {
          if ((res.data.code = 200)) {
            this.modelDetail = res.data.data.result
            return
          }
          this.$alert(res.data.msg, '提示', {
            type: 'warning',
            confirmButtonText: '确定'
          })
        })
    }
  },
  mounted() {
    // console.log(this.id)
    // this.getDetail();
  }
}
</script>
<style scoped lang="less" >
  @import '~@/less/button.less';  
  .button{
    margin-bottom: 20px;
  }
</style>
