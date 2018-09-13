<!--评级模型管理-->
<template>
    <div>
        <div class='listHeader' >
            <div class="search-item">
                <span class="search-item-label">模型类别:</span>
                <div class="search-item-content">
                    <el-select v-model="type" placeholder="请选择" @change="">
                        <el-option
                            v-for="item in modelTypeList"
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
                    <el-select v-model="status" placeholder="请选择" @change="">
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
            <div class="BotoomBtn leftRadius" @click="" data-title='新建'>
                <div class="btn-icon addIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" @click="" data-title='删除'>
                <div class="btn-icon removIcon"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change=""
                @row-dblclick="">
                <el-table-column
                    align='center'
                    v-for='item in tableDataHeader'
                    :type="item.type"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :width="item.width">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data() {
        return {
            modelTypeList: [
                {
                    syscode: 'all',
                    sysname: '全部'
                },
                {
                    syscode: '1',
                    sysname: '商户评级模型'
                },
                {
                    syscode: '2',
                    sysname: '销售评级模型'
                },
                {
                    syscode: '3',
                    sysname: '分公司评级模型'
                },
            ],
            modelStatusList: [
                {
                    syscode: 'all',
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
            type: '',
            status: '',
            tableDataHeader: [
                { type: 'selection', label: '', width: '50' },
                { prop: '', label: '评级模型ID', width: '100'},
                { prop: '', label: '模型类别', width: '100'},
                { prop: '', label: '评级模型名称', width: '150'},
                { prop: '', label: '状态', width: '80'},
                { prop: '', label: '商户KYC', width: '150'},
                { prop: '', label: '备注', width: '180'},
                { prop: '', label: '创建日期', width: '150'},
                { prop: '', label: '更新日期', width: '150'},
                { prop: '', label: '操作人员', width: '130'},
                { prop: '', label: '操作', width: '80'},
            ],
            tableData: [],

        }
    },
    methods: {

    },
    mounted() {

    }
};
</script>
<style lang="less" scoped>
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
