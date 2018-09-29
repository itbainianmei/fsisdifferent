<!--评级模型管理-->
<template>
    <div>
        <div class='listHeader' >
            <div class="search-item">
                <span class="search-item-label">模型类别:</span>
                <div class="search-item-content">
                    <el-select v-model="modelType" placeholder="请选择" @change="search">
                        <el-option label="全部" value="">
                        </el-option>
                        <el-option
                            v-for="(item,index) in searchModelTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <span class="search-item-label">模型状态:</span>
                <div class="search-item-content">
                    <el-select v-model="modelStatus" placeholder="请选择" @change="search">
                        <el-option label="全部" value="">

                        </el-option>
                        <el-option
                            v-for="(item,index) in modelStatusList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addModel" data-title='新建'>
                <div class="btn-icon addIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="deleteModel" data-title='删除'>
                <div class="btn-icon removIcon"></div>
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
                    :formatter="item.formatter"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page"></Page>
        <!-- 新建评级模型 -->
        <el-dialog title="新建评级模型" :visible.sync="addFormDialog" width="55%" v-dialogDrag >
            <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="modelName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="addForm.modelName"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="modelType">
                    <el-select v-model="addForm.modelType" placeholder="请选择" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(item,index) in searchModelTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户KYC：" prop="type">
                    <el-checkbox-group v-model="addForm.customKyc">
                        <el-checkbox v-for="(item,index) in customKycList" :key="index" :label="item.value" :disabled='item.label==="1"' name="customKyc"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox  name="modelStatus" v-model="addForm.modelStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="模型分值映射：" style="margin-bottom:5px;">
                    <span style="font-size:12px;color:red;">提示：左开右闭（由大到小填写，分值区间101-0）</span>
                </el-form-item>
                <el-form-item label="" prop="modelScoreMap" id="addFormScoreMap">
                    <el-col v-for="(item, index) in levelNameList1" class="scoreMapItem" :key="index" data-name="item">
                        <el-col  :span="7" v-for='(val,ind) in item.title' :key='ind'>
                          <el-col :span="4" class="levelName" style="text-align: right;">{{val.levelname}}：</el-col>
                          <el-col :span="8">
                              <el-input type="text" v-model="val.maxval" style="width: 100%"></el-input>
                          </el-col>
                          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                          <el-col :span="8">
                              <el-input type="text" v-model="val.minval" style="width: 100%"></el-input>
                          </el-col>
                        </el-col>
                    </el-col>
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

        <!-- 修改评级模型 -->
        <el-dialog title="修改评级模型" :visible.sync="updateFormDialog" width="55%" v-dialogDrag >
            <el-form ref="addForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="modelName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="updateForm.modelName"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="modelType">
                    <el-select v-model="updateForm.modelType" placeholder="请选择" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(item,index) in searchModelTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户KYC：" prop="type">
                    <el-checkbox-group v-model="updateForm.customKyc">
                        <el-checkbox v-for="(item,index) in customKycList" :key="index" :label="item.value" :disabled='item.label==="1"' name="customKyc"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox  name="modelStatus" v-model="updateForm.modelStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="模型分值映射：" style="margin-bottom:5px;">
                    <span style="font-size:12px;color:red;">提示：左开右闭（由大到小填写，分值区间101-0）</span>
                </el-form-item>
                <el-form-item label="" prop="modelScoreMap" id="addFormScoreMap">
                    <el-col v-for="(item, index) in levelNameList1" class="scoreMapItem" :key="index" data-name="item">
                        <el-col  :span="7" v-for='(val,ind) in item.title' :key='ind'>
                          <el-col :span="4" class="levelName" style="text-align: right;">{{val.levelname}}：</el-col>
                          <el-col :span="8">
                              <el-input type="text" v-model="val.maxval" style="width: 100%"></el-input>
                          </el-col>
                          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                          <el-col :span="8">
                              <el-input type="text" v-model="val.minval" style="width: 100%"></el-input>
                          </el-col>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updateForm.remark" style="width: 85%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelUpdate()">取 消</el-button>
                <el-button type="primary" @click="submitUpdate('updateForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    const validateNameByAjax = (rule, value, cb) => {
      this.$axios
        .post(
          '/rateModel/modelNames',
          qs.stringify({
            modelName: this.addForm.modelName
          })
        )
        .then(res => {
          if (res.status !== 200) {
            cb(new Error(res.errMsg))
          } else {
            cb()
          }
        })
    }
    return {
      searchModelTypeList: [],
      modelStatusList: [],
      modelType: '',
      modelStatus: '',
      page: {
        isShowSizeChange: false,
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        sizeList: [10, 20, 30, 40]
      },
      tableDataHeader: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: '评级模型ID', width: '100' },
        {
          prop: 'modeltype',
          label: '模型类别',
          width: '100',
          formatter: this.modeltype
        },
        { prop: 'modelname', label: '评级模型名称', width: '150' },
        {
          prop: 'modelstatus',
          label: '状态',
          width: '80',
          formatter: this.modelstatus
        },
        { prop: 'customkyc', label: '商户KYC', width: '150' },
        { prop: 'remark', label: '备注', width: '180' },
        { prop: 'createtime', label: '创建日期', width: '150' },
        { prop: 'updatetime', label: '更新日期', width: '150' },
        { prop: 'updateby', label: '操作人员', width: '130' }
      ],
      tableData: [],
      multipleSelection: [],
      removeArr: [],
      addFormDialog: false,
      addForm: {
        modelName: '', //模型名称
        modelType: '', //模型类别
        modelStatus: false, //是否启用
        valueList: [], //模型分值映射
        remark: '', //备注
        customKyc: [] //商户kyc
      },
      updateFormDialog: false,
      updateForm: {
        modelName: '', //模型名称
        modelType: '', //模型类别
        modelStatus: false, //是否启用
        valueList: [], //模型分值映射
        remark: '', //备注
        customKyc: '' //商户kyc
      },
      rules: {
        modelName: [
          { required: true, message: '请输入模型名称', trigger: 'blur' },
          { validator: validateNameByAjax, trigger: 'blur' }
        ],
        modelType: [
          { required: true, message: '请选择模型类别', trigger: 'change' }
        ],
        remark: [
          {
            max: 200,
            min: 0,
            message: '最长长度不能超过200位',
            trigger: 'blur'
          }
        ]
      },
      modelTypeList: null,
      levelNameList: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'],
      levelNameList1: [
        {
          title: [
            {
              levelname: 'A+',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'A',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'A-',
              maxval: '',
              minval: ''
            }
          ]
        },
        {
          title: [
            {
              levelname: 'B+',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'B',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'B-',
              maxval: '',
              minval: ''
            }
          ]
        },
        {
          title: [
            {
              levelname: 'C+',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'C',
              maxval: '',
              minval: ''
            },
            {
              levelname: 'C-',
              maxval: '',
              minval: ''
            }
          ]
        }
      ],
      customKycList: []
    }
  },
  methods: {
    search() {
      this.$axios
        .post(
          '/rateModel/queryRateModel',
          qs.stringify({
            modelType: this.modelType,
            modelStatus: this.modelStatus,
            pageNum: this.page.currentPage,
            pageSize: this.page.pageSize
          })
        )
        .then(res => {
          this.tableData = res.data.data.result
          this.page.totalCount = res.data.data.total
          this.page.currentPage = res.data.data.pages
          this.searchModelTypeList = res.data.data.modelType
          this.modelStatusList = res.data.data.rateStatus
        })
        .catch(error => {
          console.log(error)
        })
    },
    selectModel(row) {
      this.multipleSelection = row
      this.removeArr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.removeArr.push(this.multipleSelection[i].id)
      }
    },
    modeltype(row) {
      if (row.modeltype === '01') {
        return '商户评级模型'
      } else if (row.modeltype === '02') {
        return '销售评级模型'
      } else {
        return '分公司评价模型'
      }
    },
    modelstatus(row) {
      return row.modelstatus === '01' ? '启用' : '未启用'
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
            '/rateModel/deleteRateField',
            qs.stringify({
              ids: this.removeArr.join(',')
            })
          )
          .then(res => {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.search()
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getModelType() {
      this.$axios.post('/rateModel/queryAllKyc').then(res => {
        if ((res.data.code = 200)) {
          this.customKycList = res.data.data.kycList
          return
        }
        this.$alert(res.data.msg, '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
      })
    },
    // 新建模型
    addModel() {
      this.addFormDialog = true
      this.addForm.modelStatus = false
    },
    // 修改模型
    updateModel(row) {
      this.updateForm.modelName = row.modelname
      if(row.modeltype==='01'){
          this.updateForm.modelType = '商户评价模型'
      }
      else if(row.modeltype==='02'){
        this.updateForm.modelType = '销售评价模型'
      }
      else if(row.modeltype==='03'){
         this.updateForm.modelType = '分公司评价模型'
      }
      if (row.modelstatus === '02') {
        this.updateForm.modelStatus = false
      } else {
        this.updateForm.modelStatus = true
      }
      this.updateForm.customKyc=row.customkyc.split(',')
      this.updateForm.remark = row.remark
      this.updateFormDialog = true
    },
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.addFormDialog = false
      this.addForm.modelStatus = false
    },
    cancelUpdate() {
      this.updateFormDialog = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }
        const arr = []
        this.levelNameList1.forEach((item, index) => {
          item.title.forEach(val => {
            arr.push(val)
          })
        })
        const param = {
          modelName: this[formName].modelName,
          modelType: this[formName].modelType,
          modelStatus: this[formName].modelStatus ? '01' : '02',
          valueList: arr,
          remark: this[formName].remark,
          customKyc: this[formName].customKyc.join(',')
        }
        var sult = JSON.stringify(param)
        this.$axios
          .post('/rateModel/addRateModel', qs.stringify({ param: sult }))
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(res.data.msg, '提示', {
                type: 'success',
                confirmButtonText: '确定'
              })
              this.search()
              this.addFormDialog = false
              return
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    submitUpdate(formName) {},
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
      obj.path = '/manager/modelManagement/detail/' + id
      obj.name = '评级模型编辑'
      obj.act = false
      this.$router.push({ path: obj.path })
    }
  },
  mounted() {
    this.search()
    this.getModelType()
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/button.less';
.listHeader {
  padding-bottom: 20px;
  padding-right: 15%;
  font-size: 13px;
  color: #333;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.search-item {
  position: relative;
  display: inline-block;
  margin-top: 17px;
  width: 33%;
}
.search-item .search-item-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 36px;
  line-height: 36px;
  text-align: right;
}
.search-item .search-item-content {
  margin-left: 45%;
  width: 55%;
  input {
    width: 60%;
    height: 36px;
  }
}
.dataTable {
  margin: 15px 10px 0;
}
</style>
