<template>
    <div class='search-content'>
       <div class="search-content-left" style="border:none">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="115px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="时间刻度:" prop="dateType">
                           <el-radio-group v-model="searchForm.dateType" >
                                <el-radio label="day">日</el-radio>
                                <el-radio label="week">周</el-radio>
                                <el-radio label="month">月</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开始时间:" prop="beginDate">
                           <el-date-picker
                                v-model="searchForm.beginDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                                @change="changeSDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束时间:" prop="endDate">
                           <el-date-picker
                                v-model="searchForm.endDate"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="数据维度:" prop="tagType">
                            <el-select v-model="searchForm.tagType" placeholder="请选择">
                                <el-option
                                    v-for="item in tagList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="" prop="branchcompany">
                            <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model="searchForm.childTagName"
                                placeholder="请选择二级维度"
                                readonly
                                :fetch-suggestions="querySearch"
                                >
                                <i
                                    class="el-icon-arrow-down el-input__icon"
                                    slot="suffix">
                                </i>
                                <template slot-scope="{ item }">
                                    <el-tree
                                        @check="selectedTag"
                                        :data="kycList"
                                        show-checkbox
                                        default-expand-all
                                        :default-checked-keys="searchForm.childTag"
                                        node-key="id" v-if="searchForm.tagType === 'kyc'">
                                    </el-tree>
                                    <el-tree
                                        @check="selectedTag"
                                        :data="hyList"
                                        :default-checked-keys="searchForm.childTag"
                                        show-checkbox
                                        default-expand-all
                                        node-key="id" v-else>
                                    </el-tree>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分公司:" prop="salesname">
                            <el-input clearable placeholder="请输入" v-model="searchForm.branchName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="8">
                        <el-form-item label="商户编号:" prop="branchcompany">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn"  :style="{top: '35%'}">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
          <el-button type="success" class="iconStyle iconRefer no-icon" @click="registerMethod('onTarget')"><span>投诉明细查询</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {DATA_TAG, MERCHANT_COMPLAINT_SATISTICS_ENUM, KYC} from '@/constants';
import { compareValFun } from "@/components/utils";

export default {
    props:{
        searchForm: Object
    },
    data () {
        let validatorStartDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '开始时间不能为空'
            } else {
                let _this = this
                setTimeout(() => {
                    if(!_this.isBtnSearch){
                        _this.$refs.searchForm.validateField('endDate');
                    }
                }, 100);
            }
            if(msg !== '') {
                this.$message.error(msg);
                callback(new Error(msg));
            } else {
                callback();
            }
        };
        let validatorEndDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '结束时间不能为空'
            } else {
                let resFlag  = compareValFun(value, this.searchForm.beginDate)
                if(resFlag) {
                    msg = '结束时间不能小于开始时间'
                }
            }
            if(msg !== '') {
                this.$message.error(msg);
                callback(new Error(msg));
            } else {
                callback();
            }
        };
        return {
            ENUM_VAL: MERCHANT_COMPLAINT_SATISTICS_ENUM,
            tagList: DATA_TAG,
            hoverName: 'hover-input',
            isHover: false,
            kycList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME,
                children: []
            }],
            hyList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME
            }],
            rules: {
                beginDate: [{validator: validatorStartDate, trigger: "change" }],
                endDate: [{validator: validatorEndDate, trigger:'change' }]
            },
            isBtnSearch: false
        }
    },
    created() {
        if (this.searchForm.tagType === 'kyc') {
            this.getKYC()
        } else {
            this.getQueryEnum()
        }
    },
    watch: {
        'searchForm.tagType': function(){
            if (this.searchForm.tagType === 'kyc') {
                this.getKYC()
            } else {
                this.getQueryEnum()
            }
        }
    },
    methods: {
        changeSDate() {
            this.isBtnSearch = false
        },
        getQueryEnum () {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: this.searchForm.tagType
                })
            ).then(res => {
                console.log(res)
                if (res.status * 1 === 200) {
                    this.hyList = [{
                        id: KYC.ALL,
                        label: KYC.ALL_NAME,
                        children: res.data.map(one => {
                            let two = {
                                id: one.syscode,
                                label: one.sysname
                            }
                            return two
                        })
                    }]
                }
            });
        },
        getKYC(){
            this.$axios.post('/SysConfigController/queryKyc', qs.stringify({})).then(res => {
                let normalList = []
                let riskList = []
                res.data.map(one => {
                    if (one.strategy_cat === KYC.NORMAL) {
                        normalList.push({
                            id: one.strategy_code,
                            label: one.strategy_code
                        })
                    } else {
                       riskList.push({
                            id: one.strategy_code,
                            label: one.strategy_code
                       }) 
                    }
                })
                this.kycList = [{
                    id: KYC.ALL,
                    label: KYC.ALL_NAME,
                    children: [{
                        id: KYC.NORMAL,
                        label: KYC.NORMAL_NAME,
                        children: normalList
                    },
                    {
                        id: KYC.RISK,
                        label: KYC.RISK_NAME,
                        children: riskList
                    }]
                }]
            });
        },
        registerMethod(methodName) {
            if (methodName === 'searchData') {
                this.isBtnSearch = true
                this.$refs.searchForm.validate(valid => {
                    if (valid) {
                    this.$emit(methodName)
                    }
                })
            } else {
                this.$emit(methodName)
            }
        },
        selectedTag(data, selectedItem){
            this.$emit('selectedChange', selectedItem)
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
<style>
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
