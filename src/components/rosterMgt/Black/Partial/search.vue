<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">更新时间(开始):</span>
                    <div class="form-item-content">
                        <el-date-picker
                        v-model="serachForm.beginTime"
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
                        v-model="serachForm.endTime"
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
                        <el-select v-model="serachForm.effectiveScene" placeholder="请选择" @focus="getEffectiveSceneList">
                            <el-option
                                v-for="item in ess"
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
                        <el-select v-model="serachForm.vvalue" placeholder="请选择" @focus="getVeidList">
                            <el-option
                                v-for="item in veidoos"
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
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.listVal" id="mdz"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">来源:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.svalue" placeholder="请选择" @focus="getSourceList">
                        <el-option
                            v-for="item in sources"
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
                        <el-select v-model="serachForm.cvalue" placeholder="请选择" @focus="getSourceList">
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
        serachForm: {
            type: Object
        }
    },
    data () {
        return {
            veidoos: [],
            conditions: [
                {
                value: "全部",
                label: "全部",
                key: ""
                },
                {
                value: "生效",
                label: "生效",
                key: "1"
                },
                {
                value: "未生效",
                label: "未生效",
                key: "0"
                }
            ],
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
        // 获取维度
        getVeidList() {
           
        },
        // 来源列表
        getSourceList() {
            this.$axios
                .post(
                "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: 19
                })
            )
            .then(res => {
                let obj = {};
                obj.sysname = "全部";
                obj.label = "全部";
                obj.sysconid = "";
                res.data.unshift(obj);
                this.sources = [];
                this.sources = this.sources.concat(res.data);
            });
        },
        // 生效场景
        getEffectiveSceneList () {
            this.$axios
                .post(
                "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: 19
                })
            )
            .then(res => {
                let obj = {};
                obj.sysname = "全部";
                obj.label = "全部";
                obj.sysconid = "";
                res.data.unshift(obj);
                this.ess = [];
                this.ess = this.ess.concat(res.data);
            });
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
    @import '../../less/search.less';
</style>