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
                    <el-table-column :width="item.width" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                </template>
            </el-table>
        </div>
        <Page v-if="showPager" :pageInfo="pageInfo" @onCurrentChange="onCurrentChange"></Page>
    </div>
</template>
<script>
export default {
    props:{
        dataList: Array,
        headList: Array,
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
        onCurrentChange(){
            this.$emit('onCurrentChange')
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
