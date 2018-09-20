<template>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">时间刻度:</span>
                    <div class="form-item-content">
                        <el-radio-group v-model="serachForm.dateType" @change="registerMethod('changeTime')">
                            <el-radio label="day">日</el-radio>
                            <el-radio label="week">周</el-radio>
                            <el-radio label="month">月</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">开始时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.beginDate"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyyMMdd"
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
                            value-format="yyyyMMdd"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                 <div class="search-form-item">
                    <span class="form-item-label">投诉来源:</span>
                    <div class="form-item-content">
                        <el-select v-model="serachForm.source" placeholder="请选择">
                            <el-option
                                v-for="item in sourceList"
                                :key="item.syscode"
                                :label="item.sysname"
                                :value="item.syscode">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">分公司:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.branchName"></el-input>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">商户编号:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="serachForm.customerNo"></el-input>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {DATA_TAG, MERCHANT_COMPLAINT_SATISTICS_ENUM} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {
            resetPermission: false,
            showSearchBtn: false,
            ENUM_VAL: MERCHANT_COMPLAINT_SATISTICS_ENUM,
            sourceList: DATA_TAG,
            hoverName: 'hover-input',
            isHover: false,
            selectedTagKey: [],

            hyList: [{
                id: MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL,
                label: '全部'
            }]
        }
    },
    created() {
        this.getQueryEnum()
    },
    methods: {
        getQueryEnum () {
            this.$axios.post( '/SysConfigController/queryEnum',
                qs.stringify({
                    sessionId: localStorage.getItem('SID'),
                    type: 125
                })
            ).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    // this.sourceList = res.data.result;
                }
            });
        },
        registerMethod(methodName, val) {
            if (typeof val !== 'undefined') {
                this.$emit(methodName, val)
            } else {
                this.$emit(methodName)
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '~@/less/search.less';
.search-content .iconStyle {
    font-size: 18px;
}
.search-content .iconStyle span {
    font-size: 15px;
}
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
