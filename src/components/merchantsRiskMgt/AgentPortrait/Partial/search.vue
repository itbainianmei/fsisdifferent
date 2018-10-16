<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="135px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开始时间:" prop="beginDate">
                            <el-date-picker
                            v-model="searchForm.beginDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                            :clearable="false"
                            @change="changeSDate"
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
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="代理商编号:" prop="agencyNo">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.agencyNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="代理商名称:" prop="agencyName">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.agencyName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="销售:" prop="sales">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.sales"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分公司:" prop="branchCompany">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.branchCompany"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="行业业绩属性:" prop="industryAttribute" style="margin-bottom: 0">
                            <el-select v-model="searchForm.industryAttribute" placeholder="请选择"  @focus="getQueryEnum(ENUM_VAL.INDUSTRYATTR, 'sPerAttrList')">
                                <el-option
                                    v-for="item in sPerAttrList"
                                    :key="item.sysconid"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="代理商自然属性一级:" prop="agencyAttribute" style="margin-bottom: 0">
                            <el-select v-model="searchForm.agencyAttribute" placeholder="请选择" @focus="getQueryEnum(ENUM_VAL.AGENCYATTR, 'sNaturalAttrList')">
                                <el-option
                                    v-for="item in sNaturalAttrList"
                                    :key="item.sysconid"
                                    :label="item.sysname"
                                    :value="item.sysname">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn"  style="top: 50%">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="searchData" v-if="showSearchBtn"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm" v-if="resetPermission"><span>重置</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {AGENT_PORTRAIT_ENUM} from '@/constants';
import { compareValFun } from "@/components/utils";

export default {
    props:{
        searchForm: Object,
        sPerAttrList: Array,
        sNaturalAttrList: Array
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
                        _this.$refs.searchForm.validateField('endDate');
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
            resetPermission: false,
            showSearchBtn: false,
            ENUM_VAL: AGENT_PORTRAIT_ENUM,
            rules: {
                beginDate: [{ validator: validatorStartDate, trigger: "change" }],
                endDate: [{validator: validatorEndDate, trigger:'change' }]
            },
            isBtnSearch: false
        }
    },
    created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.resetPermission = idList.indexOf(129) === -1 ? false : true;
        this.showSearchBtn = idList.indexOf(128) === -1 ? false : true;
    },
    methods: {
        changeSDate() {
            this.isBtnSearch = false
        },
        getQueryEnum (typeVal, listName) {
            let searchParam = {
                enumType: typeVal,
                list: listName,
                pageType: 'search'
            }
            this.$emit('getQueryEnum', searchParam)
        },
        resetForm() {
            this.$emit('resetForm')
        },
        searchData() {
            this.isBtnSearch = true
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    this.$emit('searchData')
                }
            })
        }
    },

}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>
