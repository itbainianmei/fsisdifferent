<!--评级模型编辑-->
<template>
    <div>
      <div class="button">
        <el-button type="primary">保存</el-button>
        <el-button type="success">取消</el-button>
      </div>
      <div class="button">
        <el-button type="primary" @click='addChildren'>添加子项</el-button>
        <el-button type="danger" @click="deleteChildren">删除</el-button>
      </div>
       <el-dialog title="添加子项" :visible.sync="addShow" width="55%" v-dialogDrag style=" max-height: 800px; overflow-y: auto;">
         <div>
            <div class='listHeader' >
              <div class="search-item">
                  <span class="search-item-label">模型类别:</span>
                  <div class="search-item-content">
                    <el-select v-model="addForm.modelType" placeholder="请选择" style="height: 36px;width: 100%" id="type">
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
                  <span class="search-item-label">模型类别:</span>
                  <div class="search-item-content">
                    <el-input v-model="addForm.name" placeholder="请输入内容"></el-input>
                  </div>
              </div>
              <div class="search-item">
                <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click='search'></el-button>
              </div>
            </div>
            <div class="dataTable clear">
              <el-table
                  :data="tableData"
                  border
                  height="350"
                  style="width: 100%"
                  @selection-change="selectModel">
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
              <el-button type="primary" @click='addChildren'>确定</el-button>
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
    return {
      modelDetail: [],
      id: this.$route.params.id,
      addShow: false,
      addForm: {
        modelType: '',
        name: ''
      },
      tableData: [],
      tableDataHeader: [
        { type: 'selection', label: '', width: '50' },
        { prop: 'id', label: '子项ID', width: '100' },
        { prop: 'fieldname', label: '评级子项名称' }
      ],
      searchModelTypeList: [
      ]
    }
  },
  mounted() {
    // console.log(this.id)
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.$axios
        .post(
          '/rateManage/queryRateFieldModel',
          qs.stringify({
            fieldType: this.addForm.modelType,
            fieldName: this.addForm.name
          })
        )
        .then(res => {
          this.tableData = res.data.data.result
          this.searchModelTypeList=res.data.data.rateTypeMap
        })
    },
    addChildren() {
      this.getDetail()
      this.addShow = true
    },
    search(){
      this.getDetail()
    },
    canelDar(){
        this.addShow = false
    },
    deleteChildren() {},
    selectModel() {}
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
</style>