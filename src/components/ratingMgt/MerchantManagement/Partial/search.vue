<template>
    <div class='search-content'>
        <div class="search-content-left">
            <el-form ref="searchForm" class="search-form">
                <div class="search-form-item" prop="startDate">
                    <span class="form-item-label">开始日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.startDate"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="startDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item" prop="endDate">
                    <span class="form-item-label">结束日期:</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.endDate"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="endDate"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户唯一标识:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customerSign"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customernumber"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户签约名称:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.signedname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">销售:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.salesname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">代理商编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.agentcode"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">代理商名称:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.agentname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.branchname"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">评级等级:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.ratingResults" id="ratingResults" placeholder="请选择" @focus="getQueryEnum(117, 'ratingLevelList')">
                            <el-option
                                v-for="item in ratingLevelList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">行业业绩属性:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.productline" id="productline" placeholder="请选择" @focus="getQueryEnum(117, 'productlineList')">
                            <el-option
                                v-for="item in productlineList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户自然属性一级:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.customerSignLevel" id="customerSignLevel" placeholder="请选择" @focus="getQueryEnum(117, 'customerSignLevelList')">
                            <el-option
                                v-for="item in customerSignLevelList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户KYC:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.customerKYC" id="customerKYC" placeholder="请选择" @focus="getQueryEnum(117, 'customerKYCList')">
                            <el-option
                                v-for="item in customerKYCList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="search-content-right">
            <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="searchData" v-if="searchPermission"></el-button>
            <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm" v-if="resetPermission"></el-button>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    props:{
        resetPermission: Boolean,
        searchPermission: Boolean,
        searchForm: Object,
        ratingLevelList: Array,
        productlineList: Array,
        customerSignLevelList: Array,
        customerKYCList: Array
    },
    data() {
        return {

        }
    },
    methods: {
        getQueryEnum(typeVal, listName) {
            let searchParam = {
                enumType: typeVal,
                list: listName
            };
            this.$emit('getQueryEnum', searchParam);
        },
        resetForm() {
            this.$emit('resetForm');
        },
        searchData() {
            this.$emit('searchData', this.searchForm);
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/less/search.less';
.listValInp {
    width: 60%;
    height: 36px;
}
</style>
