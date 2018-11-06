<!--评级子项管理-->
<template>
    <div>
        <div class='search-content'>
            <div class="search-content-left">
                <el-form ref="searchForm" class="search-form">
                    <div class="search-form-item">
                        <span class="form-item-label">子项类别:</span>
                        <div class="form-item-content">
                            <el-select v-model="fieldType" placeholder="请选择" @change="search">
                                 <el-option
                                    label="全部"
                                    value="">
                                </el-option>
                                <el-option
                                    v-for="item in searchFieldTypeList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="search-form-item">
                        <span class="form-item-label">子项状态:</span>
                        <div class="form-item-content">
                            <el-select v-model="fieldStatus" placeholder="请选择" @change="search">
                                <el-option
                                    label="全部"
                                    value="">
                                </el-option>
                                <el-option
                                    v-for="item in searchFieldStatusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="search-form-item">
                        <span class="form-item-label">子项名称:</span>
                        <div class="form-item-content">
                            <el-input clearable placeholder="请输入" class="listValInp" v-model="fieldName"></el-input>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="search-content-right text-btn"  style="top: 50%">
              <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="search" v-if='btnPower.searchBtn'><span>查询</span></el-button>
            </div>
        </div>

        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addModel" data-title='新建' v-if='btnPower.createBtn'>
                <div class="btn-icon addIcon"></div>
            </div>
            <div class="BotoomBtn" @click="deleteModel" data-title='删除' v-if='btnPower.deleteBtn'>
                <div class="btn-icon removIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="Enable" data-title='启用' v-if='btnPower.startBtn'>
                <div class="btn-icon startIcon"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="selectModel"
                @row-dblclick="updateModel">
                <el-table-column
                    align='center'
                    v-for='item in tableDataHeader'
                    :type="item.type"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :formatter="item.formatter"
                    :width="item.width">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)" style='padding: 8px 17px;'>编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page" @onCurrentChange="onCurrentChange"></Page>
        <!-- 新建评级子项 -->
        <el-dialog title="新建评级子项" :visible.sync="addFormDialog" width="55%" v-dialogDrag >
            <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="评级子项名称：" prop="fieldName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="addForm.fieldName"></el-input>
                </el-form-item>
                <el-form-item label="评级子项类别：" prop="fieldType">
                    <el-select v-model="addForm.fieldType" placeholder="请选择" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(value,index) in searchFieldTypeList"
                            :key="index"
                            :label="value.label"
                            :value="value.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="fieldStatus" v-model="addForm.fieldStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="addForm.remark" style="width: 85%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改评级子项 -->
        <el-dialog title="修改评级子项" :visible.sync="updateFormDialog" width="55%" v-dialogDrag >
            <el-form ref="updateForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="评级子项名称：" prop="fieldName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="updateForm.fieldName"></el-input>
                </el-form-item>
                <el-form-item label="评级子项类别：" prop="fieldType">
                    <el-select v-model="updateForm.fieldType" placeholder="请选择"  style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(value,index) in searchFieldTypeList"
                            :key="index"
                            :label="value.label"
                            :value="value.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="fieldStatus" v-model="updateForm.fieldStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updateForm.remark" style="width: 85%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updateForm')">取 消</el-button>
                <el-button type="primary" @click="submitUpdate('updateForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: '评级子项管理',
  data() {
    const validateNameByAjax = (rule, value, cb) => {
      if (value === this.repeat) {
        return cb()
      }
      this.$axios
        .post(
          '/rateManage/fieldNames',
          qs.stringify({
            fieldName: value
          })
        )
        .then(res => {
          if (res.data.code !== 200) {
            cb(new Error(res.data.msg))
          } else {
            cb()
          }
        })
    }
    return {
      searchFieldTypeList: [],
      searchFieldStatusList: [],
      fieldTypeList: null,
      fieldType: '',
      fieldStatus: '',
      fieldName: '',
      repeat: '',
      page: {
        isShowSizeChange: false,
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        sizeList: [10, 20, 30, 40]
      },
      tableDataHeader: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: '评级子项ID', width: '100' },
        {
          prop: 'fieldtype',
          label: '评级子项类别',
          width: '120',
          formatter: this.fieldtype
        },
        { prop: 'fieldname', label: '评级子项名称', width: '150' },
        {
          prop: 'fieldstatus',
          label: '状态',
          width: '80',
          formatter: this.fieldstatus
        },
        { prop: 'remark', label: '备注', width: '180' },
        { prop: 'createtime', label: '创建日期', width: '150' },
        { prop: 'updatetime', label: '更新日期', width: '150' },
        { prop: 'updateby', label: '操作人员', width: '130' }
      ],
      tableData: [],
      multipleSelection: [],
      removeArr: [],
      btnPower: {
        createBtn: false,
        deleteBtn: false,
        searchBtn:false,
        startBtn:false,
        reviseBtn:false,
        edit:false
      },
      addFormDialog: false,
      addForm: {
        fieldName: '', //子项名称
        fieldType: '', //子项类别
        fieldStatus: false, //是否启用
        remark: '' //备注
      },
      updateFormDialog: false,
      updateForm: {
        id: '',
        fieldName: '', //子项名称
        fieldType: '', //子项类别
        fieldStatus: false, //是否启用
        remark: '' //备注
      },
      rules: {
        fieldName: [
          { required: true, message: '请输入子项名称', trigger: 'blur' },
          { validator: validateNameByAjax, trigger: 'blur' }
        ],
        fieldType: [
          { required: true, message: '请选择子项类别', trigger: 'change' }
        ],
        remark: [
          {
            required: true,
            message: '请填写活动形式',
            min: 0,
            max: 200,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    // 按钮权限
    const mapPower = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.createBtn = mapPower.indexOf(545) === -1 ? false : true
    this.btnPower.deleteBtn = mapPower.indexOf(546) === -1 ? false : true
    this.btnPower.searchBtn = mapPower.indexOf(544) === -1 ? false : true
    this.btnPower.startBtn = mapPower.indexOf(547) === -1 ? false : true
    this.btnPower.reviseBtn = mapPower.indexOf(548) === -1 ? false : true
    this.btnPower.edit = mapPower.indexOf(709) === -1 ? false : true
  },
  methods: {
    search() {
      this.$axios
        .post(
          '/rateManage/queryRateField',
          qs.stringify({
            fieldType: this.fieldType,
            fieldStatus: this.fieldStatus,
            fieldName: this.fieldName,
            pageNum: this.page.currentPage,
            pageSize: this.page.pageSize
          })
        )
        .then(res => {
          this.tableData = res.data.data.result
          this.page.totalCount = res.data.data.total
          this.page.currentPage = res.data.data.pageNumber
          this.searchFieldStatusList = res.data.data.rateStatus
          this.searchFieldTypeList = res.data.data.rateTypeMap
        })
        .catch(error => {
          console.log(error)
        })
    },
    Enable() {
      if (this.removeArr.length === 0) {
        this.$alert('请至少选中一条需要处理的数据', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      this.$confirm('确认将选中的子项启用？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post(
            '/rateManage/updateRateFieldStartStatus',
            qs.stringify({
              ids: this.removeArr.join(',')
            })
          )
          .then(res => {
            if (res.data.code * 1 === 200) {
              this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定'
              })
              this.search()
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    fieldstatus(row) {
      return row.fieldstatus === '01' ? '启用' : '未启用'
    },
    fieldtype(row) {
      if (row.fieldtype === '01') {
        return '商户评级子项'
      } else if (row.fieldtype === '02') {
        return '销售评级子项'
      } else {
        return '分公司评级子项'
      }
    },
    selectModel(row) {
      this.multipleSelection = row
      this.removeArr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.removeArr.push(this.multipleSelection[i].id)
      }
    },
    onCurrentChange(val) {
      this.page.currentPage = val
      this.search()
    },
    // 删除
    deleteModel() {
      if (this.removeArr.length === 0) {
        this.$alert('请至少选中一条需要处理的数据', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      this.$confirm('确认将选中的名单值删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post(
            '/rateManage/deleteRateField',
            qs.stringify({
              ids: this.removeArr.join(',')
            })
          )
          .then(res => {
            if (res.data.code * 1 === 200) {
              this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定'
              })
              this.search()
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    // getModelType() {
    //   this.$axios.post('/rateManage/addRateModelType').then(res => {
    //     if ((res.data.code = 200)) {
    //       this.modelTypeList = res.data.data.addType
    //       return
    //     }
    //     this.$alert(res.data.msg, '提示', {
    //       type: 'warning',
    //       confirmButtonText: '确定'
    //     })
    //   })
    // },
    // 新建模型
    addModel() {
      this.addFormDialog = true
      this.addForm.fieldStatus = false
    },
    // 修改模型
    updateModel(row) {
      if(!this.btnPower.reviseBtn){
        return
      }
      this.updateForm.fieldName = row.fieldname
      this.repeat = this.updateForm.fieldName
      this.updateForm.fieldType = row.fieldtype
      this.updateForm.id = row.id
      if (row.fieldstatus === '02') {
        this.updateForm.fieldStatus = false
      } else {
        this.updateForm.fieldStatus = true
      }
      this.updateForm.remark = row.remark
      this.updateFormDialog = true
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this[formName + 'Dialog'] = false
      this.addForm.fieldStatus = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$router.push({path:'/manager/childManagement/detail/0',query:{ fieldname: this[formName].fieldName,  fieldtype: this[formName].fieldType,  fieldstatus: this[formName].fieldStatus ? '01' : '02', remark: this[formName].remark}})
        this.$refs[formName].resetFields()
        this.addForm.fieldStatus = false
      })
    },
    submitUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        this.$axios
          .post(
            '/rateManage/update',
            qs.stringify({
              id: this[formName].id,
              fieldname: this[formName].fieldName,
              fieldtype: this[formName].fieldType,
              fieldstatus: this[formName].fieldStatus ? '01' : '02',
              remark: this[formName].remark
            })
          )
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(res.data.msg, '提示', {
                type: 'success',
                confirmButtonText: '确定'
              })
              this.updateFormDialog = false
              this.search()
              return
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    checkModelName(formName) {
      this.$axios
        .post(
          '/rateManage/modelNames',
          qs.stringify({
            modelName: this[formName].modelName
          })
        )
        .then(res => {
          // todo
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleEdit(id) {
      let obj = {}
      obj.path = '/manager/childManagement/detail/' + id
      obj.name = '评级子项编辑'
      obj.act = false
      this.$router.push({ path: obj.path })
      // 遍历循环看是否存在评级模型编辑，如果存在先删除在添加
      this.$store.state.tabsArr.map((one, index) => {
        if (one.name === '评级子项编辑') {
          this.$store.dispatch('deltab', index)
          this.$store.dispatch('updateTabCache', index)
        }
      })
      this.$store.dispatch('addtab', obj)
      this.$store.dispatch('updateTabCache')
    }
  },
  mounted() {
    this.search()
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/search.less';
@import '~@/less/button.less';
.search-content .search-form-item {
  margin-bottom: 0;
}
.search-content-right {
  margin-top: -18px;
}
.demo-ruleForm .el-form-item {
  margin-bottom: 20px;
}
.dataTable {
  margin: 15px 10px 0;
}
</style>
