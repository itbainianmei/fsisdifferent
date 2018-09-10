<template>
    <div>
        <el-dialog :title="title" :visible.sync="showDialog" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">
                选择下载从
                <input type="number" v-model="startPage" min="0" class="downClass">到
                <input type="number" min="0"  class="downClass" :max="maxPageNum" v-model="endPage">页的数据
            </div>
            <h4 style="text-align: center">
                当前共<span>{{maxPage}}</span>页
            </h4>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <!-- 这里需要判断下什么时候对下载显示和隐藏 500页 一页显示20条 不允许下载超过10万条数据-->
                <el-button type="primary" @click="download" v-show='isShowDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        showDownloadDialog: Boolean,
        maxPage: {
            type: Number,
            default: 0
        },
        pageSize: Number
    },
    data () {
        return {
            startPage: 0,
            endPage: 0,
            isShowDownloadBtn: false,
            maxPageNum: 0,
            showDialog: false
        }
    },
    watch: {
        showDownloadDialog: function () {
            this.showDialog = this.showDownloadDialog
        },
        startPage: function(val) {
            if (val < 0) {
                this.startPage = 0
            }
        },
        endPage: function(val) {
            if (val < 0) {
                this.endPage = 0
            }
            if (val > 0 && val < this.maxPage) {
                this.isShowDownloadBtn = true
            }
        }
    },
    created () {
        this.maxPageNum = this.maxPage
    },
    methods: {
        closeDialog(){
            this.showDialog = false
            this.$emit('onClose', 'showDownloadDialog')
        },
        download(){
            if (this.startPage === 0 || this.endpagenum === 0) {
                this.$alert("输入值不能为0", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if (this.startPage > this.endPage) {
                this.$alert("起始页数需小于结束页数", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            if ((this.endPage * 10 - this.startPage * 10 + 1) / 10 * this.pageSize >  100000) {
                this.$alert("最多只能导出10万条数据", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                    callback: action => {}
                });
                return;
            }
            let pageDownInfo = {
                startPage: this.startPage,
                endPage: this.endPage
            }
            this.startPage = 0
            this.endPage = 0
            this.$emit('onDownloadPage', pageDownInfo)
        }

    }
}
</script>
<style scoped>
.downClass {
    width: 77px;
    height: 29px;
    line-height: 18px;
    margin: 5px;
    border-radius: 19px;
    border: 1px solid #ccc;
    padding: 4px 2px;
    box-sizing: border-box;
}
</style>
