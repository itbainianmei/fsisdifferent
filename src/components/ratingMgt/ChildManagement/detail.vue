<!--评级子详情编辑-->
<template>
    <div>
      <div class="button">
        <el-button type="primary" @click='save' v-if='btnPower.submitBtn'>保存</el-button>
        <el-button type="success" @click='Verification' v-if='btnPower.verificationBtn'>验证</el-button>
      </div>
      <codemirror ref="edit" v-model="code" :options="cmOptions"></codemirror>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="验证信息" name="1">
          <el-table
              height="200"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                label="所在行"
                width="180"
                prop="lineNumber">
              </el-table-column>
              <el-table-column
                label="错误信息"
                algin='center'
                prop="status"
                >
              </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: '评级子项详情',
  data() {
    return {
      modelDetail: [],
      code: '',
      id: this.$route.params.id,
      activeNames: '1',
      btnPower: {
        submitBtn: false,
        verificationBtn: false
      },
      tableData: [
        {
          status: '',
          lineNumber: null
        }
      ],
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
  created() {
    // 按钮权限
    const mapPower = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.submitBtn = mapPower.indexOf(710) === -1 ? false : true
    this.btnPower.verificationBtn = mapPower.indexOf(711) === -1 ? false : true
  },
  methods: {
    getDetail() {
      this.$axios
        .post(
          '/rateManage/querySubitemById',
          qs.stringify({
            id: this.$route.params.id
          })
        )
        .then(res => {
          if (res.data.data[0].fieldsql !== null) {
            this.code = res.data.data[0].fieldsql
          }
        })
    },
    Verification() {
      this.$axios
        .post('/rateManage/validateSql', qs.stringify({ fieldSql: this.code }))
        .then(res => {
          if (res.data.code === 0) {
            this.tableData[0].status = res.data.data
            this.tableData[0].lineNumber = res.data.lineNumber
          }
          if (res.data.code === 1) {
            this.$alert('验证成功', '提示', {
              type: 'success',
              confirmButtonText: '确定'
            })
            this.tableData[0].status = res.data.data
            this.tableData[0].lineNumber = res.data.lineNumber
          }
        })
    },
    save() {
      if (this.id !== '0') {
        this.$axios
          .post(
            '/rateManage/saveRateField',
            qs.stringify({ fieldSql: this.code, id: this.id })
          )
          .then(res => {
            if (res.data.code === 200) {
              this.$alert(res.data.msg, '提示', {
                type: 'success',
                confirmButtonText: '确定'
              })
              this.$router.push('/manager/childManagement')
            }
          })
      } else {
        if (!this.code) {
          this.$alert('参数不能为空', '提示', {
            type: 'error',
            confirmButtonText: '确定'
          })
          return
        } else {
          this.$axios
            .post(
              '/rateManage/validateSql',
              qs.stringify({ fieldSql: this.code })
            )
            .then(res => {
              if (res.data.code === 0) {
                this.tableData[0].status = res.data.data
                this.tableData[0].lineNumber = res.data.lineNumber
              }
              if (res.data.code === 1) {
                this.$axios
                  .post(
                    '/rateManage/addRateField',
                    qs.stringify({
                      fieldname: this.$route.query.fieldname,
                      fieldtype: this.$route.query.fieldtype,
                      fieldstatus: this.$route.query.fieldstatus,
                      remark: this.$route.query.remark,
                      fieldsql: this.code
                    })
                  )
                  .then(res => {
                    if (res.data.code == 200) {
                      this.$alert(res.data.msg, '提示', {
                        type: 'success',
                        confirmButtonText: '确定'
                      })
                      this.$router.push('/manager/childManagement')
                    }
                  })
              }
            })
        }
      }
    }
  },
  mounted() {
    if (this.id !== '0') {
      this.getDetail()
    }
  }
}
</script>
<style scoped lang="less" >
@import '~@/less/button.less';
.button {
  margin-bottom: 20px;
}
</style>
