<template>
    <div class='search-content'>
        <div class="search-content-left">
            <el-form ref="form" class="search-form">
                <div class="search-form-item">
                    <span class="form-item-label">更新时间(开始):</span>
                    <div class="form-item-content">
                        <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :editable="false"></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">更新时间(结束):</span>
                    <div class="form-item-content">
                        <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :editable="false"></el-date-picker>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">维度:</span>
                    <div class="form-item-content">
                        <el-select v-model="searchForm.tag" placeholder="请选择">
                            <el-option v-for="option in queryEnumList" :key="option.syscode" :label="option.sysname" :value="option.syscode"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-form-item">
                    <span class="form-item-label">值:</span>
                    <div class="form-item-content">
                        <el-input clearable placeholder="请输入" class="listValInp" v-model="searchForm.uniqueId"></el-input>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="search-content-right">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="search"></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm"></el-button>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    searchForm: Object,
    queryEnumList: Array
  },
  methods: {
    search() {
      this.$emit("search", this.searchForm);
    },
    resetForm() {
      this.$emit("resetForm");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/less/search.less";
</style>