<template>
    <div class='search-content'>
       <div class="search-content-left" :style="{'padding-top':'20px','padding-bottom': '10px'}">
            <el-form  ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.startMonth"
                            type="month"
                            placeholder="选择日期"
                            value-format="yyyy-MM"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">结束时间:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.endMonth"
                            type="month"
                            placeholder="选择日期"
                            value-format="yyyy-MM"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </el-form>
       </div>
       <div class="search-content-right text-btn"  :style="{top: '53%'}">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
      </div>
    </div>
</template>
<script>
import qs from "qs";
import {KYC} from '@/constants';
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {
            hoverName: 'hover-input',
            isHover: false,
            kycList: [{
                id: KYC.ALL,
                label: KYC.ALL_NAME,
                children: []
            }]
        }
    },
    methods: {
        registerMethod(methodName, val) {
            if (typeof val !== 'undefined') {
                this.$emit(methodName, val)
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
