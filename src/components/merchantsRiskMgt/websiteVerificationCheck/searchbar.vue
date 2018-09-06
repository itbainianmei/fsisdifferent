<template>
    <div class="searchBasic">
        <div class="title" @click="serchToggle = !serchToggle">
            <i class="el-icon-arrow-down toggleIcon"></i>
            <span>基础查询</span>
        </div>
        <el-collapse-transition>
            <div class="searchbar" id="searchbar" v-show="serchToggle">
                <div class="leftContent">
                    <el-form ref="form" :model="form" label-width="116px" :rules="rules" class="demo-ruleForm">
                        <div class="formConClass">
                            <el-form-item label="交易开始时间:" prop="startTime">
                                <el-date-picker  v-model="form.startTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                style="width: 90%;max-width:225px;"
                                value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="formConClass">
                            <el-form-item label="交易结束时间:" prop="endTime">
                                <el-date-picker
                                v-model="form.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                style="width: 90%;max-width:225px;"
                                value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="formConClass">
                            <el-form-item prop="customerNumber">
                                <el-radio slot="label" v-model="radio" label="1" @change="radioChange">商户编号:</el-radio>
                                <el-input v-model="form.customerNumber" :disabled="customerNumberDisabled" placeholder="多个用英文逗号隔开" style="width: 90%;max-width:225px;"></el-input>
                            </el-form-item>
                        </div>
                        <div class="formConClass">
                            <el-form-item prop="trxUrl">
                                <el-radio slot="label" v-model="radio" label="2" @change="radioChange">交易网址:</el-radio>
                                <el-input v-model="form.trxUrl" :disabled="trxUrlDisabled" placeholder="多个用英文逗号隔开" style="width: 90%;max-width:225px;"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="rightContent">
                    <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='search'>查询</el-button>
                </div>
            </div>
        </el-collapse-transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            serchToggle: true,
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
                startTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ]
            }
        };
    },
    props: ['getList'],
    methods: {
        search() {
            this.$refs['form'].validate((valid) => {
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
            this.form.startTime = y + '-' + m.substring(m.length-2, m.length) + '-' + d.substring(d.length-2, d.length) + ' ' + '00:00:00';
            this.form.endTime = y + '-' + m.substring(m.length-2, m.length) + '-' + d.substring(d.length-2, d.length) + ' ' + '23:59:59';
        },
    },
    mounted() {
        this.initSetTime();
    }
};

</script>
<style scoped>
.title{
    height: 50px;
    line-height: 50px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
    cursor: pointer;
}
.searchbar{
    height: auto;
    padding: 20px 0 20px 3%;
    -webkit-transition: all 0.5s ease;
    transition: all 0.5s ease;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}

.formConClass{
    display: inline-block;
    width: 32%;
}
</style>
