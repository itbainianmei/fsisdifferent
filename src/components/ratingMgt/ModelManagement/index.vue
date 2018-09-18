<!--评级模型管理-->
<template>
    <div>
        <div class='listHeader' >
            <div class="search-item">
                <span class="search-item-label">模型类别:</span>
                <div class="search-item-content">
                    <el-select v-model="modelType" placeholder="请选择" @change="search">
                        <el-option
                            v-for="item in searchModelTypeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="search-item">
                <span class="search-item-label">模型状态:</span>
                <div class="search-item-content">
                    <el-select v-model="modelStatus" placeholder="请选择" @change="search">
                        <el-option
                            v-for="item in modelStatusList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addModel" data-title='新建'>
                <div class="btn-icon addIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="deleteModel" data-title='删除'>
                <div class="btn-icon removIcon"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="selectModel"
                @row-dblclick="updateModel">
                <el-table-column
                    align='center'
                    v-for='item in tableDataHeader'
                    :type="item.type"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.id)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 新建评级模型 -->
        <el-dialog title="新建评级模型" :visible.sync="addFormDialog" width="55%" v-dialogDrag >
            <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="modelName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="addForm.modelName" @blur="checkModelName('addForm')"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="modelType">
                    <el-select v-model="addForm.modelType" placeholder="请选择" @focus="getModelType" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(key, value) in modelTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户KYC：" v-show="addForm.modelType == '01'" prop="type">
                    <el-checkbox-group v-model="addForm.customKyc">
                        <el-checkbox v-for="item in customKycList" :key="item" label="item" name="customKyc"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="modelStatus" v-model="addForm.modelStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="模型分值映射：" prop="modelScoreMap" id="addFormScoreMap">
                    <el-col :span="7" v-for="(item, index) in levelNameList" class="scoreMapItem" :key="index" data-name="item">
                        <el-col :span="4" class="levelName" style="text-align: right;">{{item}}：</el-col>
                        <el-col :span="8">
                            <el-input type="text" class="minVal" style="width: 100%"></el-input>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                        <el-col :span="8">
                            <el-input type="text" class="maxVal" style="width: 100%"></el-input>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="addForm.remark" style="width: 85%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改评级模型 -->
        <el-dialog title="修改评级模型" :visible.sync="updateFormDialog" width="55%" v-dialogDrag >
            <el-form ref="updateForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="modelName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="updateForm.modelName" @blur="checkModelName('addForm')"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="modelType">
                    <el-select v-model="updateForm.modelType" placeholder="请选择" @focus="getModelType" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(key, value) in modelTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户KYC：" v-show="updateForm.modelType == '01'" prop="type">
                    <el-checkbox-group v-model="updateForm.customKyc">
                        <el-checkbox v-for="item in customKycList" :key="item" label="item" name="customKyc"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="modelStatus" v-model="updateForm.modelStatus"></el-checkbox>
                </el-form-item>
                <el-form-item label="模型分值映射：" prop="modelScoreMap" id="updateFormScoreMap">
                    <el-col :span="7" v-for="(item, index) in levelNameList" class="scoreMapItem" :key="index" data-name="item">
                        <el-col :span="4" class="levelName" style="text-align: right;">{{item}}：</el-col>
                        <el-col :span="8">
                            <el-input type="text" class="minVal" style="width: 100%"></el-input>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                        <el-col :span="8">
                            <el-input type="text" class="maxVal" style="width: 100%"></el-input>
                        </el-col>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updateForm.remark" style="width: 85%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updateForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('updateForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data() {
        return {
            searchModelTypeList: [
                {
                    syscode: '',
                    sysname: '全部'
                },
                {
                    syscode: '01',
                    sysname: '商户评级模型'
                },
                {
                    syscode: '02',
                    sysname: '销售评级模型'
                },
                {
                    syscode: '03',
                    sysname: '分公司评级模型'
                },
            ],
            modelStatusList: [
                {
                    syscode: '',
                    sysname: '全部'
                },
                {
                    syscode: '1',
                    sysname: '启用'
                },
                {
                    syscode: '0',
                    sysname: '未启用'
                }
            ],
            modelType: '',
            modelStatus: '',
            tableDataHeader: [
                { type: 'selection', label: '', width: '50' },
                { prop: 'id', label: '评级模型ID', width: '100'},
                { prop: 'modelType', label: '模型类别', width: '100'},
                { prop: 'modelName', label: '评级模型名称', width: '150'},
                { prop: 'modelStatus', label: '状态', width: '80'},
                { prop: 'customKyc', label: '商户KYC', width: '150'},
                { prop: 'modelComments', label: '备注', width: '180'},
                { prop: 'createTime', label: '创建日期', width: '150'},
                { prop: 'updateTime', label: '更新日期', width: '150'},
                { prop: 'opeateBy', label: '操作人员', width: '130'}
            ],
            tableData: [],
            multipleSelection: [],
            removeArr: [],
            addFormDialog: false,
            addForm: {
                modelName: '', //模型名称
                modelType: '', //模型类别
                modelStatus: '', //是否启用
                valueList: [], //模型分值映射
                remark: '', //备注
                customKyc: '' //商户kyc
            },
            updateFormDialog: false,
            updateForm: {
                modelName: '', //模型名称
                modelType: '', //模型类别
                modelStatus: '', //是否启用
                valueList: [], //模型分值映射
                remark: '', //备注
                customKyc: '' //商户kyc
            },
            rules: {
                modelName: [{ required: true, message: "请输入模型名称", trigger: "blur" }],
                modelType: [{ required: true, message: "请选择模型类别", trigger: "change" }],

                remark: [{ max: 200, min: 0, message: "最长长度不能超过200位", trigger: "blur" }]
            },
            modelTypeList: null,
            levelNameList: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'],
            customKycList: []
        }
    },
    methods: {
        search() {
            this.$axios.post('/rateManage/queryRateModel', qs.stringify({
                modelType: this.modelType,
                modelStatus: this.modelStatus
            })).then(res => {
                this.tableData = res.data.data.result;
                console.log(JSON.stringify(this.tableData, null, 2));
            }).catch(error => {
                console.log(error);
            });
        },
        selectModel(row) {
            this.multipleSelection = row;
            this.removeArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                this.removeArr.push(this.multipleSelection[i].id);
            }
        },
        // 删除
        deleteModel() {
            if (this.removeArr.length === 0) {
                this.$alert("请至少选中一条需要处理的数据", "提示", {
                    type: "warning",
                    confirmButtonText: "确定"
                });
                return false;
            }

            this.$confirm('确认将选中的名单值删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/rateManage/deleteRateModel',
                    qs.stringify({
                        ids: this.removeArr
                    })
                ).then(res => {
                    this.$alert(res.data.msg, "提示", {
                        confirmButtonText: "确定",
                    });
                    this.search();
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        getModelType() {
            this.$axios.post('/rateManage/addRateModelType').then(res => {
                if (res.data.code = 200) {
                    this.modelTypeList = res.data.data.addType;
                    this.customKycList = res.data.data.KYC;
                    return;
                }
                this.$alert(res.data.msg, "提示", {
                    type: "warning",
                    confirmButtonText: "确定"
                });
            });
        },
        // 新建模型
        addModel() {
            this.addFormDialog = true;
        },
        // 修改模型
        updateModel(row) {
            this.updateForm.modelName = row.modelName;
            this.updateForm.modelType = row.modelType;
            this.updateForm.modelStatus = row.modelStatus;
            this.updateForm.levelName = row.levelName;
            this.updateForm.maxVal = row.maxVal;
            this.updateForm.minVal = row.minVal;
            this.updateForm.remark = row.remark;
            this.updateForm.customKyc = row.customKyc;
            this.updateFormDialog = true;

        },
        cancelForm(formName) {
            this.$refs[formName].resetFields();
            this[formName + 'Dialog'] = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) {
                    return false;
                }
                let scoreArr = [];
                let $scoreFields = document.querySelector('#addFormScoreMap .scoreMapItem');
                $scoreFields.each(item => {
                    let scoreItem = {
                        levelName: item.data('name'),
                        minVal: item.querySelector('.minVal').value,
                        maxVal: item.querySelector('.maxVal').value,
                    };
                    scoreArr.push(scoreItem);
                });

                this.$axios.post('/rateManage/addRateModel', qs.stringify({
                    modelName: this[formName].modelName,
                    modelType: this[formName].modelType,
                    modelStatus: this[formName].modelStatus,
                    valueList: JSON.stringify(scoreArr),
                    remark: this[formName].remark,
                    customKyc: JSON.stringify(this[formName].customKyc)
                })).then(res => {
                    if (res.data.code == 200) {
                        this.$alert(res.data.msg, "提示", {
                            type: "success",
                            confirmButtonText: "确定"
                        });

                        cancelForm(formName);
                        this.searchData();
                        return;
                    }
                    this.$alert(res.data.msg, "提示", {
                        type: "warning",
                        confirmButtonText: "确定"
                    });
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        checkModelName(formName) {
            this.$axios.post('/rateManage/modelNames', qs.stringify({
                modelName: this[formName].modelName,
            })).then(res => {
                // todo

            }).catch(error => {
                console.log(error);
            });
        },
        handleEdit(id) {
            let obj = {};
            obj.path = '/manager/modelManagement/detail/' + id;
            obj.name = '评级模型编辑';
            obj.act  = false;
            this.$router.push({path: obj.path});
            // 遍历循环看是否存在评级模型编辑，如果存在先删除在添加
            this.$store.state.tabsArr.map((one, index) =>{
                if (one.name === '评级模型编辑') {
                    this.$store.dispatch('deltab',index);
                    this.$store.dispatch('updateTabCache',index);
                }
            });
            this.$store.dispatch('addtab', obj);
            this.$store.dispatch('updateTabCache');
        }
    },
    mounted() {
        this.search();
    }
};
</script>
<style lang="less" scoped>
@import '~@/less/button.less';
.listHeader {
    padding-bottom: 20px;
    padding-right: 15%;
    font-size: 13px;
    color: #333;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
}
.search-item{
    position: relative;
    display: inline-block;
    margin-top: 17px;
    width: 33%;
}
.search-item .search-item-label{
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 36px;
    line-height: 36px;
    text-align: right;
}
.search-item .search-item-content{
    margin-left: 45%;
    width: 55%;
    input{
        width: 60%;
        height: 36px;
    }
}
.dataTable {
    margin: 15px 10px 0;
}
.iptOnline {
    width: 88%;
}
</style>
