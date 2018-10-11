<!--评级模型编辑-->
<template>
    <div>
      <div class="button">
        <el-button type="primary" @click='submit'>保存</el-button>
        <el-button type="success" @click='cancel'>取消</el-button>
      </div>
      <div class="button">
        <el-button type="primary" @click='addChildren'>添加子项</el-button>
        <el-button type="danger" @click="deleteChildren">删除</el-button>
      </div>
      <div class="dataTable clear">
            <el-table
                :data="tableDatas"
                :span-method="arraySpanMethod"
                @selection-change="selectModels"
                border
                style="width: 100%">
                <el-table-column
                    align='center'
                    v-for='item in tableDataels'
                    :type="item.type"
                    :key="item.id"
                    :label="item.label"
                    :formatter="item.formatter"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small">新增</el-button>
                      <el-button type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
       <el-dialog title="添加子项" :visible.sync="addShow" width="55%" v-dialogDrag style=" max-height: 800px; overflow-y: auto;">
         <div>
            <div class='listHeader' >
              <div class="search-item" style="width:300px;">
                  <span class="search-item-label">模型名称:</span>
                  <div class="search-item-content">
                    <el-input v-model="addForm.name" placeholder="请输入内容"></el-input>
                  </div>
              </div>
              <div class="search-item" style="width:40px;">
                <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click='search'></el-button>
              </div>
            </div>
            <div class="dataTable clear">
              <el-table
                  :data="tableData"
                  border
                  height="350"
                  style="width: 100%"
                  @selection-change="selectModels">
                  <el-table-column type="selection" width="50" align="center" :selectable="disableCheckbox"></el-table-column>
                  <el-table-column
                      align='center'
                      v-for='item in tableDataHeader'
                      :type="item.type"
                      :key="item.id"
                      :label="item.label"
                      :prop="item.prop"
                      :width="item.width">
                  </el-table-column>
              </el-table>
            </div>
            <div class="button" style="margin-bottom:10px;margin-left:250px;">
              <el-button type="primary" @click='addReult'>确定</el-button>
              <el-button type="info" @click="canelDar">取消</el-button>
            </div>
         </div>
       </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    const formatter = function(row, column, cellValue, index) {
      let sign = 0
      const arr = row.modelSubitemWeightList.map(ele => {
        return this.$createElement(
          'li',
          {
            attrs: {
              class: 'clearfix'
            }
          },
          [
            this.$createElement(
              'div',
              {
                attrs: {
                  class: 'cell_item'
                }
              },
              [
                this.$createElement('input', {
                  attrs: {
                    class: 'score',
                    autocomplete: 'off',
                    value: ele.score
                  },
                  on: {
                    input: event => {
                      event.target.value = event.target.value.replace(
                        /[^\d.]/g,
                        ''
                      )
                      //保证只有出现一个.而没有多个.
                      event.target.value = event.target.value.replace(
                        /\.{2,}/g,
                        '.'
                      )
                      //必须保证第一个为数字而不是.
                      event.target.value = event.target.value.replace(
                        /^\./g,
                        ''
                      )
                      //保证.只出现一次，而不能出现两次以上
                      event.target.value = event.target.value
                        .replace('.', '$#$')
                        .replace(/\./g, '')
                        .replace('$#$', '.')
                      //只能输入两个小数
                      event.target.value = event.target.value.replace(
                        /^(\-)*(\d+)\.(\d\d).*$/,
                        '$1$2.$3'
                      )
                      ele.score = event.target.value
                    }
                  }
                })
              ]
            ),
            this.$createElement(
              'div',
              {
                attrs: {
                  class: 'cell_item'
                }
              },
              [
                this.$createElement('input', {
                  attrs: {
                    class: 'value',
                    autocomplete: 'off',
                    value: ele.value
                  },
                  on: {
                    input: event => {
                      var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\s`~!@#$%^&*()_+-=\[\]{}|;:'"<,>.?∞/·～！¥￥……（）——「」【】、；：‘“”’，。《》？／]*$/
                      if (!reg.test(event.target.value)) {
                        this.$alert(
                          '请输入中文、英文、数字、∞或常用符号(包括空格、单引号、双引号)',
                          '提示',
                          {
                            confirmButtonText: '确定'
                          }
                        )
                        return
                      }
                      ele.value = event.target.value
                    }
                  }
                })
              ]
            ),
            this.$createElement(
              'div',
              {
                attrs: {
                  class: 'cell_item'
                }
              },
              [
                this.$createElement('button', {
                  attrs: {
                    class: 'cell_btn_left'
                  },
                  domProps: {
                    innerHTML: '新增'
                  },
                  on: {
                    click: function(event) {
                      row.modelSubitemWeightList.push({
                        isdelete: 'A',
                        modelid: row.modelid,
                        subitemid: row.subitemid,
                        score: '',
                        value: ''
                      })
                    }
                  }
                }),
                this.$createElement('button', {
                  attrs: {
                    class: 'cell_btn_right'
                  },
                  domProps: {
                    innerHTML: '删除'
                  },
                  on: {
                    click: (function(n) {
                      return function(event) {
                        row.modelSubitemWeightList.splice(n, 1)
                      }
                    })(sign++)
                  }
                })
              ]
            )
          ]
        )
      })
      return this.$createElement('ul', arr)
    }.bind(this)
    const formatter1 = function(row, column, cellValue, index) {
      return this.$createElement(
        'li',
        {
          attrs: {
            class: 'clearfix'
          }
        },
        [
          this.$createElement(
            'div',
            {
              attrs: {
                class: 'cell_item'
              }
            },
            [
              this.$createElement('input', {
                attrs: {
                  class: 'weight',
                  autocomplete: 'off',
                  value: row.weight
                },
                on: {
                  input: event => {
                    event.target.value = event.target.value.replace(
                      /[^\d]/g,
                      ''
                    )
                    row.weight = event.target.value
                  }
                }
              })
            ]
          )
        ]
      )
      return this.$createElement('ul', arr1)
    }.bind(this)
    return {
      modelDetail: [],
      id: this.$route.params.id,
      type: this.$route.query.type,
      addShow: false,
      canelShow: false,
      addForm: {
        modelType: '',
        name: ''
      },
      tableData: [],
      tableDatas: [],
      tableDataHeader: [
        { prop: 'id', label: '子项ID', width: '100' },
        { prop: 'fieldname', label: '评级子项名称' }
      ],
      tableDataels: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: 'id', width: '100' },
        { prop: 'fieldname', label: '子项名称' },
        { prop: 'weight', label: '权重', formatter: formatter1 },
        { prop: 'score', label: '分值', formatter: formatter },
        { prop: 'value', label: '对应值' }
      ],
      searchModelTypeList: [],
      multipleSelection: [],
      removeArr: []
    }
  },
  mounted() {
    this.getDate()
    this.getDetail()
  },
  methods: {
    getDate() {
      this.$axios
        .post('/rateModel/queryAll', qs.stringify({ modelId: this.id }))
        .then(res => {
          this.tableDatas = res.data.data
        })
    },
    getDetail() {
      this.$axios
        .post(
          '/rateManage/queryRateFieldModel',
          qs.stringify({
            fieldType: this.type,
            fieldName: this.addForm.name,
            modelId: this.id
          })
        )
        .then(res => {
          this.tableData = res.data.data.result
          this.searchModelTypeList = res.data.data.rateTypeMap
        })
    },
    addChildren() {
      this.getDetail()
      this.addShow = true
    },
    disableCheckbox(row) {
      if (row.remark == '1') {
        return 0
      }
      return 1
    },
    addReult() {
      if (this.removeArr.length === 0) {
        this.$alert('请至少选中一条需要处理的数据', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      this.$confirm('确认添加？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post(
            '/rateModel/addSubitem',
            qs.stringify({
              modelId: this.id,
              subitemId: this.removeArr.join(',')
            })
          )
          .then(res => {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.addShow = false
            this.getDate()
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    search() {
      this.getDetail()
    },
    canelDar() {
      this.addShow = false
    },
    deleteChildren() {
      if (this.removeArr.length === 0) {
        this.$alert('请至少选中一条需要处理的数据', '提示', {
          type: 'warning',
          confirmButtonText: '确定'
        })
        return false
      }
      this.$confirm('确认将选中的值删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post(
            '/rateModel/deleteRatemodelAndField',
            qs.stringify({
              modelid: this.id,
              subitemid: this.removeArr.join(',')
            })
          )
          .then(res => {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定'
            })
            this.getDate()
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    selectModels(row) {
      this.multipleSelection = row
      this.removeArr = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.removeArr.push(
          this.multipleSelection[i].subitemid || this.multipleSelection[i].id
        )
      }
    },
    selectModel() {},
    submit() {
      var sult = JSON.stringify(this.tableDatas)
      this.$axios
        .post('/rateModel/saveRatemodel', qs.stringify({ param: sult }))
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.msg, '提示', {
              type: 'success',
              confirmButtonText: '确定'
            })
            this.getDate()
            return
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancel() {
      this.$confirm('您确定取消所有修改吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已取消',
            callback: this.pathTo()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃修改'
          })
        })
    },
    pathTo() {
      this.$router.push('/manager/modelManagement')
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return [1, 3]
      } else if (columnIndex === 5) {
        return [0, 0]
      } else if (columnIndex === 6) {
        return [0, 0]
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/less/button.less';
.listHeader {
  padding-bottom: 20px;
  font-size: 13px;
  color: #333;
}
.search-item {
  position: relative;
  display: inline-block;
  margin-top: 17px;
  width: 32%;
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
.clearfix {
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  .cell_item {
    flex: 1;
    input {
      outline: 0;
      font-size: 14px;
      height: 27px;
      border-radius: 4px;
      border: 1px solid #c8cccf;
      color: #6a6f77;
    }
  }
  .cell_btn_left {
    color: #fff;
    margin-top: 3px;
    border: none;
    outline: none;
    background: #409eff;
    width: 38px;
    height: 20px;
    border-radius: 3px;
  }
  .cell_btn_right {
    margin-right: 90px;
    margin-top: 3px;
    margin-left: 7px;
    color: #fff;
    border: none;
    outline: none;
    background: red;
    width: 38px;
    height: 20px;
    border-radius: 3px;
  }
}
</style>