<template>
    <div class='search-content'>
        <div class="search-content-left">
            <el-form ref="form" class="search-form">
                <div class="search-form-item" prop="startTime">
                    <span class="form-item-label">更新时间(开始):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item" prop="endTime">
                    <span class="form-item-label">更新时间(结束):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="searchForm.endTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        id="endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">生效场景:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.effectiveScene" id="effectiveScene" placeholder="请选择" @focus="getQueryEnum(117, 'searchTypeList')">
                            <el-option
                                v-for="item in searchTypeList"
                                :key="item.sysconid"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">来源:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.source" id="source" placeholder="请选择" @focus="getQueryEnum(118, 'searchSourceList')">
                        <el-option
                            v-for="item in searchSourceList"
                            :key="item.sysconid"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">状态:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.status" id="status" placeholder="请选择">
                            <el-option
                                v-for="item in conditions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="IDCardChecked">身份证号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.idCard" :disabled="!IDCardChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="bankNumberChecked">银行卡号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.bankNumber" :disabled="!bankNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="phoneNumberChecked">手机号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.phoneNumber" :disabled="!phoneNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="IPChecked">IP:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.ip" :disabled="!IPChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="terminalNumberChecked">终端号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.terminalNumber" :disabled="!terminalNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="customerNumberChecked">商户编号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.customerNumber" :disabled="!customerNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="longitudeChecked">经度:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.longitude" :disabled="!longitudeChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="dimensionChecked">纬度:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.dimension" :disabled="!dimensionChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="paperNumberChecked">证件号:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.paperNumber" :disabled="!paperNumberChecked"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label"><el-checkbox v-model="fixedLineChecked">固话:</el-checkbox></span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.fixedLine" :disabled="!fixedLineChecked"></el-input>
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
import qs from 'qs';
export default {
    props:{
        searchForm: Object,
        searchSourceList: Array,
        searchTypeList: Array
    },
    data() {
        return {
            conditions: [
                {
                    value: "全部",
                    label: "全部",
                    key: "all"
                }, {
                    value: "生效",
                    label: "生效",
                    key: "1"
                }, {
                    value: "未生效",
                    label: "未生效",
                    key: "0"
                }
            ],
            IDCardChecked: true,
            bankNumberChecked: true,
            phoneNumberChecked: true,
            IPChecked: true,
            terminalNumberChecked: true,
            customerNumberChecked: true,
            longitudeChecked: true,
            dimensionChecked: true,
            paperNumberChecked: true,
            fixedLineChecked: true,
            veidoos: [],
            sources: [],
            ess: [],
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

            this.$emit('searchData', this.searchForm)
        }

    }
}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
    .el-checkbox {
        color: #333;
    }
</style>
