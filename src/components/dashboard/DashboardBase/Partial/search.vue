<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form search-form-d">
                <div class="search-form-item search-form-date">
                    <span class="form-item-label">时间刻度:</span>
                    <div class="form-item-content">
                        <div class="date-flex">
                        <el-radio-group v-model="serachForm.dateType" >
                            <el-radio label="day">日</el-radio>
                            <el-radio label="week">周</el-radio>
                            <el-radio label="month">月</el-radio>
                        </el-radio-group>
                         <el-date-picker
                            v-model="serachForm.beginDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                        >
                        </el-date-picker>
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
                </div>
                <div class="search-form-item search-form-i">
                    <span class="form-item-label">数据维度:</span>
                    <div class="form-item-content">
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
                <div class="search-form-item search-form-i">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchName"></el-input>
                    </div>
                </div>
                <div class="search-form-item search-form-i" style="width:33%">
                    <span class="form-item-label">商户唯一标识:</span>
                    <div class="form-item-content" style="margin-left: 10px;width: 40%">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerNumber"></el-input>
                    </div>
                </div>
                <div class="search-form-item search-form-i"  style="margin-left: 17%;">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerSign"></el-input>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right text-btn" :style="{top: '63%'}">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {KYC} from '@/constants';

export default {
    props:{
        serachForm: Object
    },
    created() {
        this.getQueryEnum(92, 'hyList')
    },
    data () {
        return {
            hyList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME
            }]
        }
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
        registerMethod(methodName, val) {
            if (typeof val !== 'undefined') {
                this.$emit(methodName, val)
            } else {
                this.$emit(methodName)
            }
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
.search-content{
    .search-form-d{
        .search-form-date{
            width: 50%;
            .form-item-label{
                width: 20%;
            }
            .form-item-content{
                width: 70%;
                margin-left: 0
            }
            .date-flex{
                display:flex;
                flex:1;
                align-items: baseline;
                >div:first-child {
                    flex-basis: 50%;
                }
                >div:not(:first-child) {
                    margin-left: 1%;
                }
            }
        }
        .search-form-i{
            width: 23%;
            .form-item-label{
                width: 30%;
            }
            .form-item-content{
                width: 60%;
                margin-left: 0
            }
        }
    }
}
</style>
