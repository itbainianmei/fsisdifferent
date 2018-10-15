<template>
<div>
    <div class='search-content'>
       <div class="search-content-left">
            <el-form :model="form" :rules="rules" ref="form" style="margin-left: 15px;" label-width="135px" >
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="交易开始时间:" prop="startTime">
                            <el-date-picker
                            v-model="form.startTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="交易结束时间:" prop="endTime">
                            <el-date-picker
                                v-model="form.endTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                :editable="false"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="customerNumber">
                            <el-radio slot="label" v-model="radio" label="1" @change="radioChange">商户编号:</el-radio>
                            <el-input :disabled="customerNumberDisabled" clearable placeholder="请输入多个用英文逗号隔开"  v-model="form.customerNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item prop="trxUrl">
                             <el-radio slot="label" v-model="radio" label="2" @change="radioChange">交易网址:</el-radio>
                            <el-input :disabled="trxUrlDisabled" clearable placeholder="请输入多个用英文逗号隔开"  v-model="form.trxUrl"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
       </div>
       <div class="search-content-right text-btn"  style="top: 75%">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click='search'><span>查询</span></el-button>
      </div>
    </div>
</div>
</template>
<script>
import { compareValFun } from "@/components/utils";
export default {
    data() {
        let validatorStartDate = (rule, value, callback) => {
            let msg = ''
            if (value === '' || value === null) {
                msg = '交易开始时间不能为空'
            } else {
                let _this = this
                setTimeout(() => {
                    _this.$refs.form.validateField('endTime');
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
                msg = '交易结束时间不能为空'
            } else {
                let resFlag  = compareValFun(value, this.form.startTime)
                if(resFlag) {
                    msg = '交易结束时间不能小于交易开始时间'
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
            radio: '',
            customerNumberDisabled: true,
            trxUrlDisabled: true,
            form: {
                startTime: '',   // 交易开始时间
                endTime: '',   // 交易结束时间
                customerNumber: '',  // 商户编号
                trxUrl: ''  // 交易网址
            },
            rules: {
                startTime: [{ validator: validatorStartDate, trigger: "change" }],
                endTime: [{validator: validatorEndDate, trigger:'change' }]
            }
        };
    },
    props: ['getList'],
    methods: {
        search() {
            this.$refs.form.validate((valid) => {
                if (!valid) {
                    return false;
                }
                if(this.form.customerNumber == '' && this.form.trxUrl == ''){
                    this.$alert('商户编号、交易网址必填其中之一', '筛选项必填', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                let params = {
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    customerNumber: this.form.customerNumber,
                    trxUrl: this.form.trxUrl,
                    pageNum: 1
                };
                this.getList(params);
            });
        },
        // 商户编号、交易网址选填二选一
        radioChange(value) {
            if (value == 1) {
                this.customerNumberDisabled = false;
                this.trxUrlDisabled = true;
                this.form.trxUrl = '';
            } else if (value == 2) {
                this.trxUrlDisabled = false;
                this.customerNumberDisabled = true;
                this.form.customerNumber = '';
            }
        },
        // 设置默认时间
        initSetTime() {
            let date = new Date();
            let y = date.getFullYear();
            let m = '0' + (date.getMonth() + 1);
            let d = '0' + date.getDate();
            let ds='0'+(date.getDate()+7);
            this.form.startTime = y + '-' + m.substring(m.length-2, m.length) + '-' + d.substring(d.length-2, d.length);
            this.form.endTime = y + '-' + m.substring(m.length-2, m.length) + '-' + ds.substring(ds.length-2, ds.length);
        },
    },
    mounted() {
        this.initSetTime();
    }
};

</script>
<style lang="less" scoped>
    @import '~@/less/search.less';
</style>