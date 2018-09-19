<!--评级子项管理-->
<template>
    <div>
        <div class='search-content'>
            <div class="search-content-left">
                <el-form ref="searchForm" class="search-form">
                    <div class="search-form-item">
                        <span class="form-item-label">子项类别:</span>
                        <div class="form-item-content">
                            <el-select v-model="fieldType" placeholder="请选择" @change="search">
                                <el-option
                                    v-for="item in searchFieldTypeList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="search-form-item">
                        <span class="form-item-label">子项状态:</span>
                        <div class="form-item-content">
                            <el-select v-model="fieldStatus" placeholder="请选择" @change="search">
                                <el-option
                                    v-for="item in searchFieldStatusList"
                                    :key="item.syscode"
                                    :label="item.sysname"
                                    :value="item.syscode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="search-form-item">
                        <span class="form-item-label">子项名称:</span>
                        <div class="form-item-content">
                            <el-input clearable placeholder="请输入" class="listValInp" v-model="fieldName"></el-input>
                        </div>
                    </div>
                </el-form>
            </div>
            <div class="search-content-right">
                <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click="search"></el-button>
            </div>
        </div>

        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addModel" data-title='新建'>
                <div class="btn-icon addIcon"></div>
            </div>
            <div class="BotoomBtn" @click="deleteModel" data-title='删除'>
                <div class="btn-icon removIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="" data-title='启用'>
                <div class="btn-icon "></div>
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

        <!-- 新建评级子项 -->
        <el-dialog title="新建评级子项" :visible.sync="addFormDialog" width="55%" v-dialogDrag >
            <el-form ref="addForm" :model="addForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="fieldName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="addForm.fieldName" @blur="checkModelName('addForm')"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="fieldType">
                    <el-select v-model="addForm.fieldType" placeholder="请选择" @focus="getModelType" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(key, value) in fieldTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="fieldStatus" v-model="addForm.fieldStatus"></el-checkbox>
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

        <!-- 修改评级子项 -->
        <el-dialog title="修改评级子项" :visible.sync="updateFormDialog" width="55%" v-dialogDrag >
            <el-form ref="updateForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="120px" style="margin-left:6%; max-height: 500px; overflow-y: auto;">
                <el-form-item label="模型名称：" prop="fieldName">
                    <el-input  style="width: 85%;" clearable type="text" v-model="updateForm.fieldName" @blur="checkModelName('updateForm')"></el-input>
                </el-form-item>
                <el-form-item label="模型类别：" prop="fieldType">
                    <el-select v-model="updateForm.fieldType" placeholder="请选择" @focus="getModelType" style="height: 36px;width: 85%" id="type">
                        <el-option
                            v-for="(key, value) in fieldTypeList"
                            :key="key"
                            :label="value"
                            :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-checkbox label="" name="fieldStatus" v-model="updateForm.fieldStatus"></el-checkbox>
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
            searchFieldTypeList: [
                {
                    syscode: '',
                    sysname: '全部'
                },
                {
                    syscode: '01',
                    sysname: '商户评级子项'
                },
                {
                    syscode: '02',
                    sysname: '销售评级子项'
                },
                {
                    syscode: '03',
                    sysname: '分公司评级子项'
                },
            ],
            searchFieldStatusList: [
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
            fieldType: '',
            fieldStatus: '',
            fieldName: '',
            tableDataHeader: [
                { type: 'selection', label: '', width: '50' },
                { prop: 'id', label: '评级子项ID', width: '100'},
                { prop: 'modelType', label: '评级子项类别', width: '100'},
                { prop: 'modelName', label: '评级子项名称', width: '150'},
                { prop: 'modelStatus', label: '状态', width: '80'},
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
                fieldName: '', //子项名称
                fieldType: '', //子项类别
                fieldStatus: '', //是否启用
                remark: '' //备注
            },
            updateFormDialog: false,
            updateForm: {
                fieldName: '', //子项名称
                fieldType: '', //子项类别
                fieldStatus: '', //是否启用
                remark: '' //备注
            },
            rules: {
                fieldName: [{ required: true, message: "请输入子项名称", trigger: "blur" }],
                fieldType: [{ required: true, message: "请选择子项类别", trigger: "change" }],
                remark: [{ max: 200, min: 0, message: "最长长度不能超过200位", trigger: "blur" }]
            },
            fieldTypeList: null,
        }
    },
    methods: {
        search() {
            this.$axios.post('/rateManage/queryRateField', qs.stringify({
                fieldType: this.fieldType,
                fieldStatus: this.fieldStatus,
                fieldName: this.fieldName
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
                this.$axios.post('/rateManage/deleteRateField',
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
        // getModelType() {
        //     this.$axios.post('/rateManage/addRateModelType').then(res => {
        //         if (res.data.code = 200) {
        //             this.modelTypeList = res.data.data.addType;
        //             return;
        //         }
        //         this.$alert(res.data.msg, "提示", {
        //             type: "warning",
        //             confirmButtonText: "确定"
        //         });
        //     });
        // },
        // 新建模型
        addModel() {
            this.addFormDialog = true;
        },
        // 修改模型
        updateModel(row) {
            this.updateForm.fieldName = row.fieldName;
            this.updateForm.fieldType = row.fieldType;
            this.updateForm.fieldStatus = row.fieldStatus;
            this.updateForm.remark = row.remark;
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

                this.$axios.post('/rateManage/addRateField', qs.stringify({
                    fieldName: this[formName].fieldName,
                    fieldType: this[formName].fieldType,
                    fieldStatus: this[formName].fieldStatus,
                    remark: this[formName].remark
                })).then(res => {
                    if (res.data.code == 200) {
                        this.$alert(res.data.msg, "提示", {
                            type: "success",
                            confirmButtonText: "确定"
                        });

                        cancelForm(formName);
                        this.search();
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
        // checkModelName(formName) {
        //     this.$axios.post('/rateManage/modelNames', qs.stringify({
        //         modelName: this[formName].modelName,
        //     })).then(res => {
        //         // todo

        //     }).catch(error => {
        //         console.log(error);
        //     });
        // },
        // handleEdit(id) {
        //     let obj = {};
        //     obj.path = '/manager/modelManagement/detail/' + id;
        //     obj.name = '评级模型编辑';
        //     obj.act  = false;
        //     this.$router.push({path: obj.path});
        //     // 遍历循环看是否存在评级模型编辑，如果存在先删除在添加
        //     this.$store.state.tabsArr.map((one, index) =>{
        //         if (one.name === '评级模型编辑') {
        //             this.$store.dispatch('deltab',index);
        //             this.$store.dispatch('updateTabCache',index);
        //         }
        //     });
        //     this.$store.dispatch('addtab', obj);
        //     this.$store.dispatch('updateTabCache');
        // }
    },
    mounted() {
        this.search();
    }
};
</script>
<style lang="less" scoped>
@import '~@/less/search.less';
@import '~@/less/button.less';
.search-content .search-form-item {
    margin-bottom: 0;
}
.search-content-right {
    margin-top: -18px;
}
.dataTable {
    margin: 15px 10px 0;
}
</style>
