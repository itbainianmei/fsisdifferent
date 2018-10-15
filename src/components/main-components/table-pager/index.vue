<template>
    <div>
        <div class="dataTable clear" >
            <el-table :style="styleCC" v-loading="loading"
                :data="dataList"
                border
                style="width: 100%"
                @selection-change="selectionChange"
                @row-dblclick="onDBClick"
            >
                <template v-for="item in headList">
                    <!-- <el-table-column :width="item.width" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center" v-if="typeof tableDataSec !== 'undefined' && tableDataSec[item.prop][0]"></el-table-column> -->
                    <el-table-column v-if="item.label !== ''" :width="item.width" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center" :formatter="formater"></el-table-column>
                </template>
            </el-table>
        </div>
        <Page v-if="showPager" v-show="dataList.length" :pageInfo="pageInfo" @onCurrentChange="onCurrentChange"></Page>
    </div>
</template>
<script>
import {formatterMoney, formatterRate} from "@/components/utils";
export default {
    props:{
        dataList: Array,
        headList: Array,
        tableDataSec: Object,
        pageInfo: Object,
        showPager: {
            type: Boolean,
            default: true
        },
        styleCC: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        selectionChange (val) {
            this.$emit('onSelect', val)
        },
        onCurrentChange(val){
            this.$emit('onCurrentChange', val)
        },
        onDBClick (val) {
            this.$emit('onDBClick', val)
        },
        formater(row, column, cellValue, index){
            if (column.label === '交易金额') {
                return formatterMoney(cellValue)
            } else {
                return cellValue
            }
        }
    }
}
</script>
<style scoped>
    .dataTable {
        margin: 5px 15px 0;
    }
</style>
