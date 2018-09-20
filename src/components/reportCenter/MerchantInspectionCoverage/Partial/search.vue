<template>
    <div class='search-content'>
       <div class="search-content-left">
           <el-form ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">开始月份:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.startTime"
                            type="month"
                            placeholder="选择日期"
                            value-format="yyyy-MM"
                            :editable="false"
                        >
                        </el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">结束月份:</span>
                    <div class="form-item-content">
                        <el-date-picker
                            v-model="serachForm.endTime"
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
       <div class="search-content-right text-btn">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="registerMethod('searchData')"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-download"  @click="registerMethod('onDownload')" ><span>下载</span></el-button>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        serachForm: Object
    },
    data () {
        return {

        }
    },
    methods: {
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
.search-content .search-form-item {
    margin: 10px 0;
}
.search-content .text-btn {
    top: 50%;
}
.search-content-right {
    margin-top: -41px;
}
</style>
