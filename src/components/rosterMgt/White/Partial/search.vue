<template>
    <div class='search-content'>
        <div class="search-content-left">
            <el-form ref="searchForm" class="search-form">
                <div class="search-form-item" prop="startTime">
                    <span class="form-item-label">更新时间(开始):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        @change='changeStart'
                        :clearable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item" prop="endTime">
                    <span class="form-item-label">更新时间(结束):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.endTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        @change='changeEnd'
                        :clearable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">生效场景:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.effectiveScene" id="effectiveScene" placeholder="请选择" @focus="getQueryEnum(117, 'searchTypeList')" @change="typeChange">
                            <el-option
                                v-for="item in searchTypeList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">状态:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.status" id="status" placeholder="请选择">
                            <el-option
                                v-for="item in conditions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.idCard">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.IDCardChecked">身份证号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.idCard" :disabled="!searchParamsChecked.IDCardChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.bankNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.bankNumberChecked">银行卡号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.bankNumber" :disabled="!searchParamsChecked.bankNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.phoneNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.phoneNumberChecked">手机号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.phoneNumber" :disabled="!searchParamsChecked.phoneNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.ip">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.IPChecked">IP:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.ip" :disabled="!searchParamsChecked.IPChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.terminalNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.terminalNumberChecked">终端号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.terminalNumber" :disabled="!searchParamsChecked.terminalNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.customerNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.customerNumberChecked">商户编号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customerNumber" :disabled="!searchParamsChecked.customerNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.longitude">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.longitudeChecked">经度:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.longitude" :disabled="!searchParamsChecked.longitudeChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.dimension">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.dimensionChecked">纬度:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.dimension" :disabled="!searchParamsChecked.dimensionChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.paperNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.paperNumberChecked">证件号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.paperNumber" :disabled="!searchParamsChecked.paperNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.fixedLine">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.fixedLineChecked">固话:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.fixedLine" :disabled="!searchParamsChecked.fixedLineChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.businessProducts">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.businessProductsChecked">业务产品:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.businessProducts" :disabled="!searchParamsChecked.businessProductsChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.bankType">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.bankTypeChecked">银行类型:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.bankType" :disabled="!searchParamsChecked.bankTypeChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.testTerminalNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.testTerminalNumberChecked">测试终端号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.testTerminalNumber" :disabled="!searchParamsChecked.testTerminalNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.eposTerminalNumber">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.eposTerminalNumberChecked">EPOS终端号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.eposTerminalNumber" :disabled="!searchParamsChecked.eposTerminalNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item" v-show="searchParamsShow.webUrl">
                    <span class="form-item-label"><el-checkbox v-model="searchParamsChecked.webUrlChecked">网址:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.webUrl" :disabled="!searchParamsChecked.webUrlChecked"></el-input>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="search-content-right text-btn"  style="top: 50%">
            <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="searchData" v-if="btnPower.searchBtn"><span>查询</span></el-button>
            <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm" v-if="btnPower.resetBtn"><span>重置</span></el-button>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import { compareValFun } from '@/components/utils'
export default {
  props: {
    searchParamsShow: Object,
    searchParamsChecked: Object,
    searchForm: Object,
    searchTypeList: Array
  },
  data() {
    return {
      conditions: [
        {
          value: '全部',
          label: '全部',
          key: 'all'
        },
        {
          value: '生效',
          label: '生效',
          key: '1'
        },
        {
          value: '未生效',
          label: '未生效',
          key: '0'
        }
      ],
      btnPower: {
        searchBtn:false,
        resetBtn:false
      },
      resetPermission: false,
      showSearchBtn: false,
      rules: {
        startTime: [{trigger: 'change' }],
        endTime: [{trigger: 'change' }]
      }
    }
  },
  created() {
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.searchBtn = idList.indexOf(142) === -1 ? false : true
    this.btnPower.resetBtn = idList.indexOf(143) === -1 ? false : true
  },
  methods: {
    getQueryEnum(typeVal, listName) {
      let searchParam = {
        enumType: typeVal,
        list: listName
      }
      this.$emit('getQueryEnum', searchParam)
    },
    changeStart(val) {
      if (!val) {
        this.$message.error('更新时间(开始)不能为空')
        return
      }
      let flag = compareValFun(val, this.searchForm.endTime)
      if (!flag) {
        this.$message.error('更新时间(开始)不能大于更新时间(结束)')
      }
    },
    changeEnd(val) {
      if (!val) {
        this.$message.error('更新时间(结束)不能为空')
        return
      }
      let flag = compareValFun(val, this.searchForm.startTime)
      if (flag) {
        this.$message.error('更新时间(结束)不能小于更新时间(开始)')
      }
    },
    typeChange(val) {
      this.$emit('typeChange', val)
    },
    resetForm() {
      this.$emit('resetForm')
    },
    searchData() {
      if (!this.searchForm.startTime) {
        this.$message.error('更新时间(开始)不能为空')
        return
      }
      if (!this.searchForm.endTime) {
        this.$message.error('更新时间(结束)不能为空')
        return
      }
      if (!compareValFun(this.searchForm.startTime, this.searchForm.endTime)) {
        this.$message.error('更新时间(开始)不能大于更新时间(结束)')
        return
      }
      this.$emit('searchData', this.searchForm)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/less/search.less';
.el-checkbox {
  color: #333;
}
</style>
