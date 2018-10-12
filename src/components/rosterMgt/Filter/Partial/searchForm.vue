<template>
    <div class='search-content'>
        <div class="search-content-left">
             <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-left: 15px;" label-width="115px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="更新时间(开始):" prop="startDate">
                            <el-date-picker
                            v-model="searchForm.startDate"
                            type="datetime"
                            placeholder="请选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="更新时间(结束):" prop="endDate">
                            <el-date-picker
                            v-model="searchForm.endDate"
                            type="datetime"
                            placeholder="请选择时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :editable="false"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="维度:" prop="tag">
                            <el-select v-model="searchForm.tag" placeholder="请选择">
                                <el-option v-for="option in queryEnumList" :key="option.syscode" :label="option.sysname" :value="option.syscode"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="end-row">
                    <el-col :span="8">
                        <el-form-item label="值:" prop="uniqueId">
                            <el-input clearable placeholder="请输入"  v-model="searchForm.uniqueId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="search-content-right text-btn" style="top: 55%">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="search"><span>查询</span></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click="resetForm"><span>重置</span></el-button>
        </div>
    </div>
</template>
<script>
import { compareValFun } from "@/components/utils";

export default {
  props: {
    searchForm: Object,
    queryEnumList: Array
  },
        data () {
        let validatorStartDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '更新时间(开始)不能为空'
            } else {
                let _this = this
                setTimeout(() => {
                    _this.$refs.searchForm.validateField('endDate');
                }, 100);
            }
            if(msg !== '') {
                this.$message.error(msg);
                callback(new Error(msg));
            } else {
                callback();
            }
        };
        let validatorEndDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '更新时间(结束)不能为空'
            } else {
                let resFlag  = compareValFun(value, this.searchForm.startDate)
                if(resFlag) {
                    msg = '更新时间(结束)不能小于更新时间(开始)'
                }
            }
            if(msg !== '') {
                this.$message.error(msg);
                callback(new Error(msg));
            } else {
                callback();
            }
        };
        return {
            rules: {
                startDate: [{ required: true, validator: validatorStartDate, trigger: "change" }],
                endDate: [{required: true, validator: validatorEndDate, trigger:'change' }]
            }
        }
    },
    methods: {
        search() {
            this.$refs.searchForm.validate(valid => {
                if (valid) {
                    this.$emit("search", this.searchForm);
                }
            })
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