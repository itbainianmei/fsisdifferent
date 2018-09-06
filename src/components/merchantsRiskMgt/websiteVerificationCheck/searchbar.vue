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
                            <el-form-item label="商户编号:" prop="customerNumber">
                                <el-input v-model="form.customerNumber" placeholder="多个用英文逗号隔开" style="width: 90%;max-width:225px;"></el-input>
                            </el-form-item>
                        </div>
                        <div class="formConClass">
                            <el-form-item label="交易网址:" prop="trxUrl">
                                <el-input v-model="form.trxUrl" placeholder="多个用英文逗号隔开" style="width: 90%;max-width:225px;"></el-input>
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
            form: {
                startTime: '',
                endTime: '',
                customerNumber: '',
                trxUrl: ''
            },
            rules: {
                startTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                endTime: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ]
            },
            result: null
        };
    },
    props: ['getList'],
    methods: {
        search() {
            this.$refs['form'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                let params = {
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    customerNumber: this.form.customerNumber,
                    trxUrl: this.form.trxUrl,
                    pageNum: 1
                };
                console.info('params', params);
                this.getList(params);
            });
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
