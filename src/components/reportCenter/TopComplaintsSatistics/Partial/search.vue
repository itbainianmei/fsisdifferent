<template>
    <div class='search-content'>
       <div class="search-content-left">
           <el-form  ref="form" class="search-form">
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
                    <span class="form-item-label">商户KYC:</span>
                    <div class="form-item-content">
                          <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="serachForm.childTagName"
                            placeholder="请选择商户KYC"
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
                                    node-key="id">
                                </el-tree>
                            </template>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">行业业绩属性:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.productLine" @focus="getQueryEnum()" placeholder="请选择">
                            <el-option
                                v-for="item in hyList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">展示维度:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.dimension" placeholder="请选择">
                            <el-option
                                v-for="item in showTagList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">展示选项:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.line" placeholder="请选择">
                            <el-option
                                v-for="item in showOptionList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right text-btn">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {SHOW_TAG_LIST, SHOW_OPTION_LIST, TOP_COMPLAINT_SATISTICS_ENUM, KYC} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {
            hoverName: 'hover-input',
            isHover: false,
            kycList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME,
                children: []
            }],
            hyList: [{
                sysname: '全部',
                label: '全部',
                sysconid: '',
                syscode: ''
            }],
            showTagList: SHOW_TAG_LIST,
            showOptionList: SHOW_OPTION_LIST
        }
    },
    created() {
        this.getKYC()
    },
    methods: {
        getQueryEnum () {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: TOP_COMPLAINT_SATISTICS_ENUM.INDUSTRYATTR
                })
            ).then(res => {
                console.log(res)
                if (res.status * 1 === 200) {
                    this.hyList = res.data
                    this.hyList.unshift({
                        sysname: '全部',
                        label: '全部',
                        sysconid: '',
                        syscode: ''
                    })
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
