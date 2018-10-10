<template>
    <div>
        <div class="dataTable clear">
            <el-table
                :data="dataList"
                border
                style="width: 100%"
                @selection-change="selectionChange"
                @row-dblclick="onDBClick"
            >
                <template v-for="item in headList">
                    <!-- <el-table-column :width="item.width" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center" v-if="typeof tableDataSec !== 'undefined' && tableDataSec[item.prop][0]"></el-table-column> -->
                    <el-table-column v-if="item.label !== ''" :width="item.width" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                </template>
            </el-table>
        </div>
        <Page v-if="showPager" v-show="dataList.length" :pageInfo="pageInfo" @onCurrentChange="onCurrentChange"></Page>
    </div>
</template>
<script>
export default {
    props:{
        dataList: Array,
        headList: Array,
        tableDataSec: Object,
        pageInfo: Object,
        showPager: {
            type: Boolean,
            default: true
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
        }
    }
}
</script>
<style scoped>
    .dataTable {
        margin: 15px 10px 0;
    }
</style>
