<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="120px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开始月份:" prop="startMonth">
                           <el-date-picker
                                v-model="searchForm.startMonth"
                                type="month"
                                placeholder="选择月份"
                                value-format="yyyy-MM"
                                :editable="false"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="结束月份:" prop="endMonth">
                            <el-date-picker
                                v-model="searchForm.endMonth"
                                type="month"
                                placeholder="选择月份"
                                value-format="yyyy-MM"
                                :editable="false"
                                @change="changeSDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="巡检类型:" prop="type">
                            <el-select v-model="searchForm.type" placeholder="请选择">
                                <el-option
                                    v-for="item in processMethodList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="巡检结果:" prop="result">
                            <el-select v-model="searchForm.result" placeholder="请选择">
                                <el-option
                                    v-for="item in processResultsList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户编号:" prop="mchId">
                            <el-input clearable placeholder="请输入" v-model="searchForm.mchId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户签约名:" prop="signName">
                            <el-input clearable placeholder="请输入" v-model="searchForm.signName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="8">
                        <el-form-item label="商户自然属性一级:" prop="bizCatCode">
                            <el-select v-model="searchForm.bizCatCode" placeholder="请选择">
                                <el-option
                                    v-for="item in zrOneList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商户自然属性二级:" prop="subBizCatCode">
                            <el-select v-model="searchForm.subBizCatCode" placeholder="请选择">
                                <el-option
                                    v-for="item in zrTwoList"
                                    :key="item.key"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
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
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn"   :style="{top: '53%'}">
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
                msg = '开始月份不能为空'
            } else {
                let _this = this
                setTimeout(() => {
                    _this.$refs.searchForm.validateField('endMonth');
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
                msg = '结束月份不能为空'
            } else {
                let resFlag  = compareValFun(value, this.searchForm.startMonth)
                if(resFlag) {
                    msg = '结束月份不能小于开始月份'
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
            zrOneList: [{
                            syscode: '',
                            sysname: "全部",
                            key: 0
                        }],
            zrTwoList: [{
                            syscode: '',
                            sysname: "全部",
                            key: 0
                        }],
            bakList: [],
            processMethodList: [
                {
                    syscode: '',
                    sysname: "全部",
                    key: 0
                },
                {
                    syscode: 1,
                    sysname: "常规巡检",
                    key: 1
                },
                {
                    syscode: 2,
                    sysname: "专项巡检",
                    key: 2
                }
            ],
            processResultsList: [
                {
                    syscode: '',
                    sysname: "全部",
                    key: 1
                }, {
                    syscode: 1,
                    sysname: "通过",
                    key: 2
                }, {
                    syscode: 2,
                    sysname: "不通过",
                    key: 3
                }
            ],
            rules: {
                startMonth: [{ validator: validatorStartDate, trigger: "change" }],
                endMonth: [{validator: validatorEndDate, trigger:'change' }]
            }
        }
    },
    created() {
        this.getQueryEnum(SILENT_MERCHANT_DATA_ENUM.INDUSTRYATTR, 'hyList')
        this.getQueryEnum(52, 'zrOneList')
    },
    watch: {
        'searchForm.bizCatCode': function () {
            if (this.searchForm.bizCatCode !== '') {
                let newList = []
                this.bakList.map(one => {
                    if (one.syscode === this.searchForm.bizCatCode) {
                        newList.push(one)
                    }
                })
                // console.log(JSON.stringify(newList, null, 2))
                this.zrTwoList = newList
                this.zrTwoList.unshift({
                    syscode: '',
                    sysname: "全部",
                    key: 0
                })
            }
        }
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
                    if (listName === 'hyList') {
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
                    } else if (listName === 'zrOneList'){
                        let oneArr = []
                        let two = []
                        res.data.map(one =>{
                            oneArr.push(one.syscode)
                        })
                        this.zrOneList = []
                        this.zrTwoList = []
                        let arr = [...new Set(oneArr)]
                        arr.map((one,  i) =>{
                            this.zrOneList.push({
                                syscode: i,
                                sysname: one,
                                key: i + 1
                            })
                        })
                        this.bakList = res.data
                        this.zrTwoList = res.data
                        this.zrOneList.unshift({
                            syscode: '',
                            sysname: "全部",
                            key: 0
                        })
                        this.zrTwoList.unshift({
                            syscode: '',
                            sysname: "全部",
                            key: 0
                        })
                    } else {
                        this[listName] = res.data
                        this[listName].unshift({
                            syscode: '全部',
                            sysname: "全部",
                            key: 0
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
