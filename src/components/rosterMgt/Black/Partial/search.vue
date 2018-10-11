<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="115px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="更新时间(开始):" prop="startDate">
                            <el-date-picker
                            v-model="searchForm.startDate"
                            type="datetime"
                            placeholder="请选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="更新时间(结束):" prop="endDate">
                            <el-date-picker
                            v-model="searchForm.endDate"
                            type="datetime"
                            placeholder="请选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生效场景:" prop="type">
                           <el-select v-model="searchForm.type" placeholder="请选择">
                                <el-option
                                    v-for="item in searchTypeList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="维度:" prop="tag">
                           <el-select v-model="searchForm.tag" placeholder="请选择">
                                <el-option
                                    v-for="item in searchTagList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="名单值:" prop="uniqueId">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.uniqueId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="来源:" prop="source">
                            <el-select v-model="searchForm.source" placeholder="请选择" @focus="getQueryEnum(ENUM_LIST.SOURCE, 'searchSourceList')">
                                <el-option
                                    v-for="item in searchSourceList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="8">
                        <el-form-item label="状态:" prop="status">
                            <el-select v-model="searchForm.status" placeholder="请选择">
                                <el-option
                                    v-for="item in conditions"
                                    :key="item.key"
                                    :label="item.label"
                                    :value="item.key">
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
import {STATUS} from '@/constants';
import { compareValFun } from "@/components/utils";
export default {
    props:{
        searchForm: Object,
        searchTagList: Array,
        searchSourceList: Array,
        searchTypeList: Array,
        ENUM_LIST: Object
    },
    data () {
        let validatorStartDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '更新时间(开始)不能为空'
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
                msg = '更新时间(结束)不能为空'
            } else {
                let resFlag  = compareValFun(value, this.searchForm.startDate)
                if(resFlag) {
                    msg = '更新时间(结束)不能小于更新时间(开始)'
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
            conditions: STATUS,
            resetPermission: false,
            showSearchBtn: false,
            rules: {
                startDate: [{ required: true, validator: validatorStartDate, trigger: "change" }],
                endDate: [{required: true, validator: validatorEndDate, trigger:'change' }]
            }
        }
    },
    created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.resetPermission = idList.indexOf(129) === -1 ? false : true;
        this.showSearchBtn = idList.indexOf(128) === -1 ? false : true;
    },
    methods: {
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
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    this.$emit('searchData')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>
