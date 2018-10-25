<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        type="month"
                        v-model="serachForm.createTimeBegin"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM"
                        :editable="false"
                        :clearable="false"
                        :picker-options="pickerStartDate"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">结束日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        type="month"
                        v-model="serachForm.createTimeEnd"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM"
                        :editable="false"
                        :clearable="false"
                        :picker-options="pickerEndDate"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.salesname"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchCompany"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">评级等级:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.ratingresults" placeholder="请选择" @focus="getQueryEnum('searchSourceList')">
                            <el-option
                                v-for="item in searchSourceList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.sysname">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form>
       </div>
      <div class="search-content-right text-btn"  style="top: 50%">
          <el-button v-if="searchBtnPower" type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="searchData"><span>查询</span></el-button>
          <el-button v-if="resetBtnPower" type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm"><span>重置</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {STATUS} from '@/constants';

export default {
    props:{
        serachForm: Object,
        searchSourceList: Array
    },
    data () {
        return {
            conditions: STATUS,
            resetBtnPower: false,
            searchBtnPower: false,
            endDate: '',
            pickerStartDate: {
                disabledDate: (time) => {
                    if (this.serachForm.createTimeEnd != "") {
                        let s = new Date(this.serachForm.createTimeEnd)
                        return time.getTime() > Date.now() || time.getTime() > s.getTime();
                    } else {
                        return time.getTime() > Date.now();
                    }

                }
            },
            pickerEndDate: {
                disabledDate: (time) => {
                    let e = new Date(this.endDate)
                    let s = new Date(this.serachForm.createTimeBegin)
                    return time.getTime() <  s.getTime() || time.getTime() > e.getTime();
                }
            }
        }
    },
    created() {
        this.endDate = this.serachForm.createTimeEnd
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.resetBtnPower = idList.indexOf(532) === -1 ? false : true;
        this.searchBtnPower = idList.indexOf(531) === -1 ? false : true;
    },
    methods: {
        getQueryEnum (listName) {
            let searchParam = {
                list: listName,
                pageType: 'search'
            }
            this.$emit('getQueryEnum', searchParam)
        },
        resetForm() {
            this.$emit('resetForm')
        },
        searchData() {
            this.$emit('searchData', this.serachForm)
        }
    },

}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>
