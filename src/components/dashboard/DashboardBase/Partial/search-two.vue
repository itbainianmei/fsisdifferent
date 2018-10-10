<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="115px" >
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="时间刻度:" required>
                            <el-col :span="8">
                                <el-radio-group v-model="searchForm.dateType" >
                                    <el-radio label="day">日</el-radio>
                                    <el-radio label="week">周</el-radio>
                                    <el-radio label="month">月</el-radio>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="beginDate">
                                    <el-date-picker style="width: 99%"
                                        v-model="searchForm.beginDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        :editable="false"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="endDate">
                                    <el-date-picker style="width: 99%;margin-left: 1%;"
                                        v-model="searchForm.endDate"
                                        type="date"
                                        placeholder="选择日期"
                                        value-format="yyyy-MM-dd"
                                        :editable="false"
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
                        <el-form-item label="商户唯一标识:" prop="customerNumber" style="margin-bottom: 0">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="商户编号:" prop="customerSign" style="margin-bottom: 0">
                            <el-input clearable placeholder="请输入" v-model="searchForm.customerSign"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn" :style="{top: '73%'}">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
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
        let validatorStartDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '开始时间不能为空'
            } else {
                let _this = this
                setTimeout(() => {
                    _this.$refs.searchForm.validateField('endDate');
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
            rules: {
                beginDate: [{ required: true, validator: validatorStartDate, trigger: "change" }],
                endDate: [{required: true, validator: validatorEndDate, trigger:'change' }]
            }
        }
    },
    methods: {
        registerMethod(methodName, val) {
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
