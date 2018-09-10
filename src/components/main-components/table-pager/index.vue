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
                <el-table-column v-for="(item, i) in headList" :key="i"
                    :prop="typeof item.prop !== 'undefined' ? item.prop : ''"
                    :type="typeof item.type !== 'undefined' ? item.type : ''"
                    :width="typeof item.width !== 'undefined' ? item.width : ''"
                    :align='item.align'
                    :label='item.label'
                    :sortable="typeof item.sortable !== 'undefined' ? item.sortable : false"
                >
                    <template slot-scope="scope" v-if="item.slotScope === 'scope'">
                        <el-popover trigger="hover" placement="top">
                        {{ scope.row.uniqueId }}
                        <div slot="reference" >
                        {{ scope.row.uniqueIdCopy }}
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="pageInfo" @onCurrentChange="onCurrentChange"></Page>
    </div>
</template>
<script>
export default {
    props:{
        dataList: Array,
        headList: Array,
        pageInfo: Object
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
