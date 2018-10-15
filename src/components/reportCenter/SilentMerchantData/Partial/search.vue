<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="120px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开始时间:" prop="startTime">
                           <el-date-picker
                                v-model="searchForm.startTime"
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
                        <el-form-item label="结束时间:" prop="endTime">
                           <el-date-picker
                                v-model="searchForm.endTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="处理方式:" prop="processModle">
                            <el-select v-model="searchForm.processModle" placeholder="请选择" @focus="getQueryEnum(ENUM_VAL.METHOD, 'processMethodList')">
                                <el-option
                                    v-for="item in processMethodList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="处理结果:" prop="processReslut">
                            <el-select v-model="searchForm.processReslut" placeholder="请选择" @focus="getQueryEnum(ENUM_VAL.RESULT, 'processResultsList')">
                                <el-option
                                    v-for="item in processResultsList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户唯一标识:" prop="customerSign">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerSign"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户编号:" prop="customerNumber">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商户签约名:" prop="signedName">
                            <el-input clearable placeholder="请输入" v-model="searchForm.signedName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="行业业绩属性:" prop="hyChildName">
                            <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model="searchForm.hyChildName"
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
                                        :default-checked-keys="searchForm.hyChild"
                                        node-key="id">
                                    </el-tree>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户自然属性一级:" prop="childTagName">
                            <el-autocomplete
                                popper-class="my-autocomplete"
                                v-model="searchForm.childTagName"
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
                                        :default-checked-keys="searchForm.childTag"
                                        node-key="id">
                                    </el-tree>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="8">
                        <el-form-item label="销售:" prop="salesName">
                            <el-input clearable placeholder="请输入" v-model="searchForm.salesName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分公司:" prop="yejishuxing">
                            <el-input clearable placeholder="请输入" v-model="searchForm.yejishuxing"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn"  :style="{top: '54%'}">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {PROCESS_RESULT_LIST, PROCESS_METHOD_LIST, SILENT_MERCHANT_DATA_ENUM, KYC} from '@/constants';
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
                        _this.$refs.searchForm.validateField('endTime');
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
                let resFlag  = compareValFun(value, this.searchForm.startTime)
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
            ENUM_VAL: SILENT_MERCHANT_DATA_ENUM,
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
            processResultsList: [
                {
                    syscode: '全部',
                    sysname: "全部",
                    key: 101
                }
            ],
            processMethodList: [
                {
                    syscode: '全部',
                    sysname: "全部",
                    key: 108
                }
            ],
            rules: {
                startTime: [{ validator: validatorStartDate, trigger: "change" }],
                endTime: [{validator: validatorEndDate, trigger:'change' }]
            },
            isBtnSearch: false
        }
    },
    created() {
        this.getQueryEnum(SILENT_MERCHANT_DATA_ENUM.INDUSTRYATTR, 'hyList')
        this.getQueryEnum(SILENT_MERCHANT_DATA_ENUM.AGENCYATTR, 'zrList')
    },
    methods: {
        changeSDate() {
            this.isBtnSearch = false
        },
        getQueryEnum (type, listName) {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: type
                })
            ).then(res => {
                console.log(res)
                if (res.status * 1 === 200) {
                    if (listName === 'hyList' || listName === 'zrList') {
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
                    } else{
                        this[listName] = res.data
                        this[listName].unshift({
                            syscode: '全部',
                            sysname: "全部",
                            key: 108
                        })
                    }
                }
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
