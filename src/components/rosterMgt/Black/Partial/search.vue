<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">更新时间(开始):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="serachForm.startDate"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">更新时间(结束):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="serachForm.endDate"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :editable="false"
                        ></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">生效场景:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.type" placeholder="请选择" @focus="getQueryEnum(19, 'searchTypeList')">
                            <el-option
                                v-for="item in searchTypeList"
                                :key="item.sysconid"
                                :label="item.sysname"
                                :value="item.sysconid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">维度:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.tag" placeholder="请选择" @focus="getQueryEnum(18, 'searchTagList')">
                            <el-option
                                v-for="item in searchTagList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">名单值:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.uniqueId" id="mdz"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">来源:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.source" placeholder="请选择" @focus="getQueryEnum(19, 'searchSourceList')">
                            <el-option
                                v-for="item in searchSourceList"
                                :key="item.sysconid"
                                :label="item.sysname"
                                :value="item.sysconid">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">状态:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.status" placeholder="请选择">
                            <el-option
                                v-for="item in conditions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
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
export default {
    props:{
        serachForm: Object,
        searchTagList: Array,
        searchSourceList: Array,
        searchTypeList: Array
    },
    data () {
        return {
            conditions: [
                {
                    value: "全部",
                    label: "全部",
                    key: ""
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
            this.$emit('searchData', this.serachForm)
        }
    },

}
</script>

<style lang="less" scoped>
    @import '~@/less/search.less';
</style>