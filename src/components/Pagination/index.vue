<template>
    <div class="block">
        <div class='pagination' v-if="pageInfo.isShowSizeChange">
            <span>每页显示</span>
            <select  class="evetotal" v-model="pageInfo.pageSize" @change="handleSizeChange">
                <option v-for="(item, i) in pageInfo.sizeList" :value="item" :key="i">{{item}}</option>
            </select>
        </div>
        <div class='paginationRight'>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageInfo.currentPage"
            :page-sizes="pageInfo.sizeList"
            :page-size="pageInfo.pageSize"
            layout="sizes, prev, pager, next"
            :page-count="pageInfo.totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        pageInfo: {
            type: Object
        }
    },
    methods: {
        handleSizeChange () {
            this.$emit('onSizeChage')
        },
        handleCurrentChange () {
            this.$emit('onCurrentChange')
        }
    }
}
</script>

