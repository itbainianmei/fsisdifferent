<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">时间刻度:</span>
                    <div class="form-item-content">
                        <el-radio-group v-model="serachForm.dateType" >
                            <el-radio label="day">日</el-radio>
                            <el-radio label="week">周</el-radio>
                            <el-radio label="month">月</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">开始时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.beginDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">结束时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">数据维度:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.tagType" placeholder="请选择">
                            <el-option
                                v-for="item in tagList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"></span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                       <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="serachForm.childTagName"
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
                                    :default-checked-keys="serachForm.childTag"
                                    node-key="id" v-if="serachForm.tagType === 'kyc'">
                                </el-tree>
                                <el-tree
                                    @check="selectedTag"
                                    :data="hyList"
                                    :default-checked-keys="serachForm.childTag"
                                    show-checkbox
                                    default-expand-all
                                    node-key="id" v-else>
                                </el-tree>
                            </template>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchName"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerNumber"></el-input>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right text-btn">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
          <el-button type="success" class="iconStyle iconRefer no-icon" @click="registerMethod('onTarget')"><span>投诉明细查询</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {DATA_TAG, MERCHANT_COMPLAINT_SATISTICS_ENUM, KYC} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
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
            }]
        }
    },
    created() {
        if (this.serachForm.tagType === 'kyc') {
            this.getKYC()
        } else {
            this.getQueryEnum()
        }
    },
    watch: {
        'serachForm.tagType': function(){
            if (this.serachForm.tagType === 'kyc') {
                this.getKYC()
            } else {
                this.getQueryEnum()
            }
        }
    },
    methods: {
        getQueryEnum () {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: this.serachForm.tagType
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
        registerMethod(methodName, val) {
            if (typeof val !== 'undefined') {
                this.$emit(methodName, val)
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
