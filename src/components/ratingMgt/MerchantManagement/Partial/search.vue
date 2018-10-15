<template>
    <div class='search-content'>
        <div class="search-content-left">
            <el-form ref="searchForm" class="search-form">
                <div class="search-form-item" prop="startDate">
                    <span class="form-item-label">开始日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.createTimeBegin"
                        type="month"
                        placeholder="选择日期时间"
                        value-format='yyyy-MM'
                        id="startDate"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item" prop="endDate">
                    <span class="form-item-label">结束日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.createTimeEnd"
                        type="month"
                        value-format='yyyy-MM'
                        placeholder="选择日期时间"
                        id="endDate"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户唯一标识:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customerSign"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customernumber"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户签约名称:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.signedname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.salesname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">代理商编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.agentcode"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">代理商名称:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.agentname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.YEJISHUXING"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">评级等级:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.ratingresults" id="ratingresults" placeholder="请选择" >
                           <el-option
                                label="全部"
                                value="">
                            </el-option>
                            <el-option
                                v-for="(item,index) in ratdata"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">行业业绩属性:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.productline" id="productline" placeholder="请选择">
                            <el-option
                                label="全部"
                                value="">
                            </el-option>
                            <el-option
                                v-for="(item,index) in productlineList1"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户自然属性一级:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.businesscat" id="customerSignLevel" placeholder="请选择">
                           <el-option
                                label="全部"
                                value="">
                            </el-option>
                            <el-option
                                v-for="(item,index) in businesscatList1"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户KYC:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.KYCCognizance" id="customerKYC" placeholder="请选择">
                           <el-option
                                label="全部"
                                value="">
                            </el-option>
                            <el-option
                                v-for="(item,index) in SYClist1"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
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
export default {
  props: {
    resetPermission: Boolean,
    searchPermission: Boolean,
    searchForm: Object,
    ratingLevelList: Array,
    productlineList: Array,
    customerSignLevelList: Array,
    customerKYCList: Array
  },
  data() {
    return {
      ratdata: [],
      productlineList1: [],
      businesscatList1: [],
      SYClist1: [],
      btnPower: {
        searchBtn: false,
        resetBtn: false
      }
    }
  },
  created() {
    // 按钮权限
    const mapPower = JSON.parse(localStorage.getItem('ARRLEVEL'))
    this.btnPower.searchBtn = mapPower.indexOf(50) === -1 ? false : true
    this.btnPower.resetBtn = mapPower.indexOf(51) === -1 ? false : true
  },
  mounted() {
    this.getSelect()
  },
  methods: {
    getSelect() {
      this.$axios.post('/CustomerRate/getCustomerRateType').then(res => {
        if (res.data.code === 200) {
          this.ratdata = res.data.data.RateStatusList
          this.productlineList1 = res.data.data.productlineList
          this.businesscatList1 = res.data.data.businesscatList
          this.SYClist1 = res.data.data.SYClist
        }
      })
    },
    getQueryEnum(typeVal, listName) {
      let searchParam = {
        enumType: typeVal,
        list: listName
      }
      this.$emit('getQueryEnum', searchParam)
    },
    resetForm() {
      this.$emit('resetForm')
    },
    searchData() {
      this.$emit('searchData', this.searchForm)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/less/search.less';
.listValInp {
  width: 60%;
  height: 36px;
}
</style>
