<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.beginDate"
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
                            v-model="serachForm.endDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">代理商编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyNo" id="mdz"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">代理商名称:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.agencyName" id="mdz"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.sales" id="mdz"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchCompany" id="mdz"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">行业业绩属性:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.industryAttribute" placeholder="请选择"  @focus="getQueryEnum(ENUM_VAL.INDUSTRYATTR, 'sPerAttrList')">
                            <el-option
                                v-for="item in sPerAttrList"
                                :key="item.sysconid"
                                :label="item.sysname"
                                :value="item.sysconid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">代理商自然属性一级:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.agencyAttribute" placeholder="请选择" @focus="getQueryEnum(ENUM_VAL.AGENCYATTR, 'sNaturalAttrList')">
                            <el-option
                                v-for="item in sNaturalAttrList"
                                :key="item.sysconid"
                                :label="item.sysname"
                                :value="item.sysconid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="searchData" v-if="showSearchBtn"></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm" v-if="resetPermission"></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {AGENT_PORTRAIT_ENUM} from '@/constants';
export default {
    props:{
        serachForm: Object,
        sPerAttrList: Array,
        sNaturalAttrList: Array
    },
    data () {
        return {
            resetPermission: false,
            showSearchBtn: false,
            ENUM_VAL: AGENT_PORTRAIT_ENUM
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
            // this.$emit('searchData', this.se/rachForm)
            this.$emit('searchData')
        }
    },

}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>