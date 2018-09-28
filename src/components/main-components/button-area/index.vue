<template>
    <div>
        <div class="button">
            <!-- item.type 值定义 添加add  删除remove 导入 import 下载download-->
            <div v-for="(item,i) in buttonList" :key="i" class="BotoomBtn" :class="classRadius(i)"
                @click="registerMethod(item)" 
                :data-title='item.btnTit'>
                <div class="btn-icon" :class="item.type + 'Icon'" :style="item.type === 'download' ? 'margin-top: -1px': ''"></div>
            </div>
        </div>
        <!-- <download-dialog 
            :title="downloadTitle"
            :maxPage="maxPage"
            :pageSize="pageSize"
            :showDownloadDialog="showDownloadDialog"
            @onClose="closeDialog"
            @onDownloadPage="onDownloadPage"
        ></download-dialog> -->
        <!-- <download-dialog 
            :title="importTitle"
            :showDownloadDialog="importTitle"
        ></download-dialog> -->
    </div>
</template>
<script>
import DownloadDialog from '../dialog/download/index.vue';
export default {
    components:{
        DownloadDialog
    },
    props:{
        buttonList: Array,
        maxPage: Number,
        pageSize: Number
    },
    data () {
        return {
            downloadTitle: '',
            showDownloadDialog: false,
            importTitle: '',
            showImportDialog: false,
        }
    },
    methods: {
        registerMethod(item) {
            switch(item.type) {
                // case 'download': {
                //     this.downloadTitle = item.dialogTitle
                //     this.showDownloadDialog = true
                //     break;
                // }
                case 'import': {
                    this.importTitle = item.dialogTitle
                    this.showImportDialog = true
                    break;
                }
                default: {
                    this.$emit(item.type)
                }
            }
        },
        classRadius(i){
            if (i === 0 && this.buttonList.length !== 1) {
                return 'leftRadius'
            }
            if (i === this.buttonList.length - 1 &&　this.buttonList.length !== 1){
                return 'rightRadius'　
            } 
            if (i === 0 && this.buttonList.length === 1) {
                return 'leftRadius rightRadius'
            }
        },
        closeDialog(dialogFlag){
            this[dialogFlag] = false
        },
        onDownloadPage(info){
            this.showDownloadDialog = false
            this.$emit('onDownloadPage', info)
        }
    }
}
</script>
<style lang="less" scoped>
    @import '~@/less/button.less';
</style>
