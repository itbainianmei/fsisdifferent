<template>
    <div class='search-content'>
       <div class="search-content-left" :style="{'padding-top':'20px','padding-bottom': '10px'}">
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
                            >
                            </el-date-picker>
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
import {KYC} from '@/constants';
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
            hoverName: 'hover-input',
            isHover: false,
            kycList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME,
                children: []
            }],
            rules: {
                startMonth: [{ required: true, validator: validatorStartDate, trigger: "change" }],
                endMonth: [{required: true, validator: validatorEndDate, trigger:'change' }]
            }
        }
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
