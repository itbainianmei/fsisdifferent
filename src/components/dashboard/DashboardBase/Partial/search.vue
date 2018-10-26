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
                <el-row  class="end-row">
                    <el-col :span="10">
                        <el-form-item label="数据维度:" prop="hyChildName">
                           <el-autocomplete
                                ref="autocomplete"
                                popper-class="my-autocomplete"
                                v-model="searchForm.hyChildName"
                                placeholder="请选择数据维度"
                                readonly
                                :fetch-suggestions="querySearch"
                                @blur="autoWIdth">
                                <i class="el-icon-arrow-down el-input__icon"
                                    slot="suffix" @click="onAutoIcon"></i>
                                <div slot-scope="{ item }"  :style="{width: '3333px'}">
                                    <el-tree style="overflow-x: auto"
                                        @check="hySelectedTag"
                                        :data="hyList"
                                        show-checkbox
                                        default-expand-all
                                        :default-checked-keys="searchForm.hyChild"
                                        node-key="id">
                                    </el-tree>
                                </div>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6"  :offset="2">
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
import {KYC} from '@/constants';
import { compareValFun } from "@/components/utils";

export default {
    props:{
        searchForm: Object,
        btnPower: Boolean
    },
    data () {
        return {
            hyList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME
            }],
            rules: {},
            endDate: '',
            pickerStartDate: {
                disabledDate: (time) => {
                    if (this.searchForm.endDate != "") {
                        let s = new Date(this.searchForm.endDate)
                        return time.getTime() > s.getTime();
                    }
                }
            },
            pickerEndDate: {
                disabledDate: (time) => {
                    let e = new Date(this.endDate)
                    let s = new Date(new Date(this.searchForm.beginDate).getTime() - 24*60*60*1000)
                    return time.getTime() <  s.getTime() || time.getTime() > e.getTime();
                }
            }
        }
    },
    created () {
        this.endDate = this.searchForm.endDate
        this.getQueryEnum(92, 'hyList')
    },
    methods: {
        onAutoIcon(){
            this.$refs.autocomplete.focus()
        },
        getQueryEnum (type, listName) {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: type
                })
            ).then(res => {
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
                    }
                }
            });
        },
        registerMethod() {
            this.$refs.searchForm.validate(valid => {
                 if (valid) {
                    this.$emit('searchData')
                }
            })
        },
        hySelectedTag(data, selectedItem){
            this.$emit('hySelectedTag', selectedItem)
        },
        autoWIdth(){
            document.querySelector('.my-autocomplete').style.width = document.querySelector('.my-autocomplete').style.width + 30
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
