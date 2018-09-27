<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="serachForm.createTimeBegin"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">结束日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="serachForm.createTimeEnd"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.salesname"></el-input>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchCompany"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">评级等级:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.ratingresults" placeholder="请选择" @focus="getQueryEnum('searchSourceList')">
                            <el-option
                                v-for="item in searchSourceList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.sysname">
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
import {STATUS} from '@/constants';

export default {
    props:{
        serachForm: Object,
        searchSourceList: Array
    },
    data () {
        return {
            conditions: STATUS,
            resetPermission: false,
            showSearchBtn: false
        }
    },
    created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.resetPermission = idList.indexOf(129) === -1 ? false : true;
        this.showSearchBtn = idList.indexOf(128) === -1 ? false : true;
    },
    methods: {
        getQueryEnum (listName) {
            let searchParam = {
                list: listName,
                pageType: 'search'
            }
            this.$emit('getQueryEnum', searchParam)
        },
        resetForm() {
            this.$emit('resetForm')
        },
        searchData() {
            this.$emit('searchData', this.serachForm)
        }
    },

}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>