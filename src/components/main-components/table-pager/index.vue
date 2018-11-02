<template>
    <div>
        <div class="dataTable clear">
            <el-table :style="styleCC" v-loading="loading"
                :data="dataList"
                border
                style="width: 100%"
                @selection-change="selectionChange"
                @row-dblclick="onDBClick">
                <template v-for="item in headList">
                    <el-table-column 
                        show-overflow-tooltip
                        v-if="item.label !== '' && item.isShow" 
                        :width="item.width" 
                        :type="item.type" 
                        :key="item.id" 
                        :label="item.label" 
                        :prop="item.prop" 
                        align="center" 
                        :formatter="formater"
                        sortable 
                        :render-header="renderHeader"
                    ></el-table-column>
                </template>
            </el-table>
            <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
            <div ref="list" class="table-select none">
                <!-- <TableSelect  :tableDataSec="tableDataSec" ></TableSelect> -->
                <div id="tableSelect" @click="allarea($event)">
                    <ul @click.stop>
                        <li v-for="(key,value,index) in tableDataSec" :key="value">
                        <input type="checkbox" :id="generateString(index)" :disabled="tableDataSecChange && key[0]" v-model="key[0]" @change="checkSelect(value, key[0])">
                        <label :for="generateString(index)">{{key[1]}}</label>
                        </li>
                    </ul>
                </div>
            </div>
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
    data () {
        return {
            tableDataSec: {},
            tableDataSecChange: false
        }
    },
    created () {
        this.headList.map(one => {
            one.isShow = true
            if (typeof one.prop !== 'undefined') {
                this.tableDataSec[one.prop] = [true]
                this.tableDataSec[one.prop].push(one.label)
            }
        })        
    },
    methods:{
        checkSelect(name, value) {
            var i = 0
            for(var item in this.tableDataSec){
                if(this.tableDataSec[item][0]){
                    i = i + 1
                }
            }
            if(i >= 1){
                if (i === 1) {
                    this.tableDataSecChange = true
                } else {
                    this.tableDataSecChange = false
                }
                this.$emit('checkSelect', {name: name, value: value})  
            }
        }, 
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
        },
        renderHeader(h, { column, $index }){
            return h("span",[
                h("span",column.label),
                h("span",{
                    "class":{
                    "el-icon-arrow-down":true
                    },
                    "on":{
                    click:(ev) => {
                        this.$refs.list.classList.remove('none')
                        var w = this.$refs.list.offsetWidth
                        if(Number(document.body.clientWidth) -  Number(ev.clientX) < w ){
                        this.$refs.list.style.left = Number(document.body.clientWidth) - w - 20 + 'px'
                        }else{
                        this.$refs.list.style.left = ev.clientX + 'px'
                        }
                        this.$refs.list.style.top= ev.pageY + 10 + 'px'
                        ev.stopPropagation()  //阻止冒泡
                    }
                    }
                }),
            ])
        }
    }
}
</script>
<style scoped  lang="less">
    .dataTable {
        // position: relative;
        z-index: 2222;
        margin: 5px 15px 0;
        .table-select{
            position: absolute;
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            line-height: 30px;
            z-index: 20;
            max-height: 250px;
            overflow: scroll;
            background: #f5f6fa;
            top: 0;
            left: 0;
        }
    }
    
</style>
