<!--名单默认值配置表-->
<template>
    <div>
        <div class='listHeader' >
            <div class="search-item">
                <span class="search-item-label" >生效场景:</span>
                <div class="search-item-content" style="margin-top:0;">
                    <el-select v-model="type" placeholder="请选择" @focus="getQueryEnum(119, 'searchTypeList')" @change="getData">
                        <el-option
                            v-for="item in searchTypeList"
                            :key="item.sysconid"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span class='headerIconRefer' @click='refresh' v-if='btnPower.resetBtn'></span>
        </div>
        <div class="dataTable clear">
            <el-table
            :data="tableData"
              border
              style="width: 100%"
              @row-dblclick='dblClick'
            >
              <el-table-column
                align='center'
                v-for='(value, key) in tableDataHeader'
                :key='value'
                :prop="key"
                :label="value"
                width="150px"
              >
              </el-table-column>
            </el-table>

            <el-dialog title="修改名单默认值配置" :visible.sync="editListDefault" width="400px">
              <el-form :model="form"  :label-position="labelPosition" label-width="100px" style='margin-left:15px; max-height: 500px; overflow-y: auto;'>
                <el-form-item label="入口类型:">
                  <span>{{form.name}}</span>
                </el-form-item>
                <el-form-item label="维度默认勾选:">
                  <el-select v-model="form.latitude" multiple placeholder="请选择" class='iptOnline'>
                    <el-option
                      v-for="(value, key) in optionsList"
                      :key="key"
                      :label="value"
                      :value="key"
                      allow-create='false'
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="有效期:">
                  <el-input v-model="form.expiryDays" class='iptOnline' :maxlength="9"></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.textarea" class='iptOnline'></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="default" @click='editListDefault = false'>取 消</el-button>
                <el-button type="primary" @click='editSubmitBtn'>确 定</el-button>
              </div>
            </el-dialog>
        </div>

        <!-- <Page :pageInfo="page"></Page> -->
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: '名单默认值配置表',
  data() {
    return {
      refreshPermission: false, //刷新权限
      editPermission: false, //修改权限
      searchTypeList: [], //生效场景
      type: '',
      currentPage: 1,
      pageSize: 20,
      tableData: [],
      tableDataHeader: null,
      page: {
        isShowSizeChange: false,
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        sizeList: [10, 20, 30, 40]
      },
      editListDefault: false,
      form: {
        name: '',
        editID: '',
        latitude: [],
        expiryDays: 0,
        textarea: ''
      },
      optionsList: null,
      latitudeLen: 0,
      labelPosition: 'right',
      btnPower: {
        reviseBtn:false,
        resetBtn:false,
      },
    }
  },
  created() {
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.resetBtn = idList.indexOf(575) === -1 ? false : true
    this.btnPower.reviseBtn = idList.indexOf(661) === -1 ? false : true
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    getQueryEnum(enumType, list, isFirst) {
      this.$axios
        .post(
          '/SysConfigController/queryEnum',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            type: enumType
          })
        )
        .then(res => {
          this[list] = res.data
          if (res.data && res.data.length) {
            if (isFirst) {
              this.type = res.data[0].syscode
            }
            this.init()
          }
        })
    },
    init() {
      this.$axios
        .post(
          '/NameConfigController/query',
          qs.stringify({
            type: this.type,
            pageNum: this.currentPage,
            pageSize: this.pageSize
          })
        )
        .then(res => {
          this.tableData = res.data.data.result
          this.tableDataHeader = res.data.data.header
          for (let key in this.tableDataHeader) {
            this.latitudeLen++
            this.tableData.forEach((ele, index) => {
              if (ele[key] == 'true') {
                ele[key] = '✓'
              } else if (ele[key] == 'false') {
                ele[key] = ''
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    refresh() {
      this.init()
    },
    getData() {
      this.tableData = []
      this.tableDataHeader = null
      this.init()
    },
    dblClick(row) {
      if (this.btnPower.reviseBtn  === false || this.latitudeLen == 0) {
        return
      }

      for (let key in row) {
        if (row[key] == '✓') {
          this.form.latitude.push(key)
        }
      }
      this.form.name = row.entryTypeValue
      this.form.editID = row.id
      this.form.textarea = row.remark
      this.form.expiryDays = row.expiryDays
      this.optionsList = {}
      let hideKeyArr = [
        'entryTypeValue',
        'expiryDays',
        'updateTime',
        'remark',
        'modifier'
      ]
      for (let key in this.tableDataHeader) {
        if (hideKeyArr.indexOf(key) == -1) {
          this.optionsList[key] = this.tableDataHeader[key]
        }
      }

      this.editListDefault = true
    },
    editSubmitBtn() {
      if (this.form.expiryDays === '') {
        this.form.expiryDays = 0
      }

      this.$axios
        .post(
          '/NameConfigController/update',
          qs.stringify({
            sessionId: localStorage.getItem('SID'),
            id: this.form.editID.toString(),
            expiryDays: this.form.expiryDays,
            remark: this.form.textarea,
            detail: this.form.latitude.join(',')
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.editListDefault = false
                this.init()
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getQueryEnum(119, 'searchTypeList', true)
  },
  watch: {
    editListDefault() {
      if (this.editListDefault === false) {
        this.form.latitude = []
        this.form.textarea = ''
      }
    },
    'form.expiryDays': function() {
      let _this = this
      this.$nextTick(() => {
        _this.form.expiryDays = _this.form.expiryDays.replace(/[^\d]/g, '')
      })
    }
  }
}
</script>
<style scoped lang='less'>
.listHeader {
  height: 70px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  font-size: 13;
  color: #333;
}
.headerIconRefer {
  display: inline-block;
  position: relative;
  top: 11px;
  width: 44px;
  height: 30px;
  background: url(../../images/icon.png) no-repeat -93px -5px;
  margin: 0 auto;
  border: 1px solid #38e139;
  border-radius: 5px;
  // margin-top: 20px;
  margin-right: 30px;
}
.headerIconRefer:hover {
  display: inline-block;
  position: relative;
  top: 11px;
  width: 44px;
  height: 30px;
  background: url(../../images/icon.png) no-repeat -93px -27px;
  margin: 0 auto;
  border: 1px solid #38e139;
  background-color: #38e139;
  border-radius: 5px;
  margin-right: 30px;
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
  margin-left: 10px;
  margin-right: 10px;
}
.iptOnline {
  width: 88%;
}
</style>
