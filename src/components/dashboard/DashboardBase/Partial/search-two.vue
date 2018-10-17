<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="115px" >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间刻度:">
                            <el-col :span="6">
                                <el-radio-group v-model="searchForm.dateType" >
                                    <el-radio label="day">日</el-radio>
                                    <el-radio label="week">周</el-radio>
                                    <el-radio label="month">月</el-radio>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item prop="beginDate">
                                    <el-date-picker style="width: 99%"
                                        v-model="searchForm.beginDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        :editable="false"
                                        :clearable="false"
                                        :picker-options="pickerStartDate"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="9">
                                <el-form-item prop="endDate">
                                    <el-date-picker style="width: 99%;margin-left: 1%;"
                                        v-model="searchForm.endDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        :editable="false"
                                        :clearable="false"
                                        :picker-options="pickerEndDate"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分公司:" prop="branchName">
                            <el-input clearable placeholder="请输入" v-model="searchForm.branchName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商户编号:" prop="customerSign">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerSign"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="6">
                        <el-form-item label="商户唯一标识:" prop="customerNumber">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn" :style="{top: '73%'}">
          <el-button v-if="btnPower" type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import { compareValFun } from "@/components/utils";
export default {
    props:{
        searchForm: Object
    },
    data () {
        return {
            rules: {},
            endDate: '',
            pickerStartDate: {
                disabledDate: (time) => {
                    if (this.searchForm.endDate != "") {
                        let s = new Date(this.searchForm.endDate)
                        return time.getTime() > Date.now() || time.getTime() > s.getTime();
                    } else {
                        return time.getTime() > Date.now();
                    }

                }
            },
            pickerEndDate: {
                disabledDate: (time) => {
                    let e = new Date(this.endDate)
                    let s = new Date(this.searchForm.beginDate)
                    return time.getTime() <  s.getTime() || time.getTime() > e.getTime();
                }
            },
            btnPower: false
        }
    },
    created () {
        this.endDate = this.searchForm.endDate
        const idList = JSON.parse(localStorage.getItem('ARRLEVEL'))
        this.btnPower = idList.indexOf(656) === -1 ? false : true
    },
    methods: {
        registerMethod() {
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    this.$emit('searchData')
                }
            })
        },
        querySearch(queryString, cb) {
            cb([2])
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>
<style lang="less">
.search-content .hover-input .el-icon-arrow-down{
    transition: transform .3s,-webkit-transform .3s;
    transform: rotateZ(-180deg);
}
.search-content .el-icon-arrow-down:before {
    content: "\E603";
    color: #3FAAF9!important;
    font-weight: 800;
}
.el-autocomplete-suggestion li{
    padding: 0;
}
.el-tree-node__label{
    font-size: 12px;
}
</style>
