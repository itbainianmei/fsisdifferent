<template>
    <div class='search-content'>
       <div class="search-content-left">
           <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.startTime"
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
                            v-model="serachForm.endTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">处理方式:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.processModle" placeholder="请选择">
                            <el-option
                                v-for="item in processMethodList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">处理结果:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-select v-model="serachForm.processReslut" placeholder="请选择">
                            <el-option
                                v-for="item in processResultsList"
                               :key="item.key"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户唯一标识:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerSign"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerNumber"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户签约名:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.signedName"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">行业业绩属性:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                         <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="serachForm.hyChildName"
                            placeholder="请选择行业业绩属性"
                            readonly
                            :fetch-suggestions="querySearch"
                            >
                            <i
                                class="el-icon-arrow-down el-input__icon"
                                slot="suffix">
                            </i>
                            <template slot-scope="{ item }">
                                 <el-tree
                                    @check="hySelectedTag"
                                    :data="hyList"
                                    show-checkbox
                                    default-expand-all
                                    :default-checked-keys="serachForm.hyChild"
                                    node-key="id">
                                </el-tree>
                            </template>
                        </el-autocomplete>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">商户自然属性一级:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                         <el-autocomplete
                            popper-class="my-autocomplete"
                            v-model="serachForm.childTagName"
                            placeholder="请选择商户自然属性一级"
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
                                    :data="zrList"
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
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.salesName"></el-input>
                    </div>
                </div>

                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content" style="position:relative;cursor: pointer;">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.yejishuxing"></el-input>
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
import {PROCESS_RESULT_LIST, PROCESS_METHOD_LIST, SILENT_MERCHANT_DATA_ENUM, KYC} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {
            hoverName: 'hover-input',
            isHover: false,
            hyList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME
            }],
            zrList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME
            }],
            processResultsList: PROCESS_RESULT_LIST,
            processMethodList: PROCESS_METHOD_LIST
        }
    },
    created() {
        this.getQueryEnum(SILENT_MERCHANT_DATA_ENUM.INDUSTRYATTR, 'hyList')
        this.getQueryEnum(SILENT_MERCHANT_DATA_ENUM.AGENCYATTR, 'zrList')
    },
    methods: {
        getQueryEnum (type, listName) {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: type
                })
            ).then(res => {
                console.log(res)
                if (res.status * 1 === 200) {
                     this[listName] = [{
                        id: KYC.ALL,
                        label: KYC.ALL_NAME,
                        children: res.data.map(one => {
                            let two = {
                                id: one.sysconid,
                                label: one.sysname
                            }
                            return two
                        })
                    }]
                }
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
        hySelectedTag(data, selectedItem){
            this.$emit('hySelectedTag', selectedItem)
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
