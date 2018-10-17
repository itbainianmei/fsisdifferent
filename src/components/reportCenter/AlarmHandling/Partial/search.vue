<template>
    <div class='search-content'>
       <div class="search-content-left" :style="{'padding-top':'20px','padding-bottom': '10px'}">
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
                                :clearable="false"
                                :picker-options="pickerStartDate"
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
                                :clearable="false"
                                :picker-options="pickerEndDate"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn" :style="{top: '54%'}">
          <el-button v-if="searchBtnPower" type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button v-if="downloadBtnPower" type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
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
        return {
            rules: {},
            endDate: '',
            pickerStartDate: {
                disabledDate: (time) => {
                    if (this.searchForm.endDate != "") {
                        let s = new Date(this.searchForm.endDate)
                        return time.getTime() > Date.now() || time.getTime() > s.getTime();
                    } else {
                        return time.getTime() > Date.now();
                    }

                }
            },
            pickerEndDate: {
                disabledDate: (time) => {
                    let e = new Date(this.endDate)
                    let s = new Date(this.searchForm.beginDate)
                    return time.getTime() <  s.getTime() || time.getTime() > e.getTime();
                }
            },
            searchBtnPower: false,
            downloadBtnPower: false
        }
    },
    created () {
        this.endDate = this.searchForm.endDate
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.searchBtnPower = idList.indexOf(595) === -1 ? false : true;
        this.downloadBtnPower = idList.indexOf(596) === -1 ? false : true;
    },
    methods: {
        registerMethod(methodName) {
            if (methodName === 'searchData') {
                this.$refs.searchForm.validate(valid => {
                    if (valid) {
                    this.$emit(methodName)
                    }
                })
            } else {
                this.$emit(methodName)
            }
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
