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
                    <span class="form-item-label">投诉来源:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.dataTag" placeholder="请选择"  @focus="getQueryEnum(ENUM_VAL.SOURCE)">
                            <el-option
                                v-for="item in sourceList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyNo"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户签约名:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyNo"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户KYC:</span>
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
                                    node-key="id">
                                </el-tree>
                            </template>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户订单号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyNo"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyNo"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchCompany"></el-input>
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
import {MERCHANT_COMPLAINT_DETAIL_ENUM} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {
            ENUM_VAL: MERCHANT_COMPLAINT_DETAIL_ENUM,
            hoverName: 'hover-input',
            isHover: false,
            kycList: [{
                id: MERCHANT_COMPLAINT_DETAIL_ENUM.ALL,
                label: '全部',
                children: [{
                    id: 11,
                    label: '正常',
                    children: [
                        { 
                            id: 111,
                            label: '三级 1-2-1'
                        }
                    ]
                },
                {
                    id: 12,
                    label: '风险',
                    children: [
                        { 
                            id: 121,
                            label: '三级 2-2-1'
                        }
                    ]
                }]
            }],
            sourceList: []
        }
    },
    created() {
        this.getKYC()
    },
    methods: {
        getQueryEnum (type) {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: type
                })
            ).then(res => {
                if (res.status * 1 === 200) {
                    this.sourceList = res.data
                }
            });
        },
        getKYC(){
            this.kycList = [{
                id: this.ENUM_VAL.ALL,
                label: '全部',
                children: [{
                    id: 11,
                    label: '正常',
                    children: [
                        { 
                            id: 111,
                            label: '三级 1-2-1'
                        }
                    ]
                },
                {
                    id: 12,
                    label: '风险',
                    children: [
                        { 
                            id: 121,
                            label: '三级 2-2-1'
                        }
                    ]
                }]
            }]
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
