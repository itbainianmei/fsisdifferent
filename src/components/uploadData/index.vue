<template>
  <div>
    <h2 class="title">上传文件类型：</h2>
    <el-row class="btn_box">
      <el-col v-for="item in config" :key="item.id" :span="6">
        <el-button type="primary" @click="uploadHandler(item)">{{item.name}}</el-button>
      </el-col>
    </el-row>
    <import-dialog v-if="dialogConf.visiable" :dialogConf="dialogConf" @close="dialogConf.visiable = false;" @submit="dialogConf.visiable = false;"></import-dialog>
  </div>
</template>

<script>
import importDialog from './Partial/importDialog';
export default {
  data() {
    return {
      config: [
        {
          id: 1,
          name: '交易投诉数据',
          uploadUrl: '/transactionSomplaint/batchAddTransactionSomplaint',
          dwTemUrl: '/transactionSomplaint/downloadTransactionSomplaintTemplate'
        },
        {
          id: 2,
          name: '商户投诉数据',
          uploadUrl: '/merchantSomplaint/batchAddMerchantSomplaint',
          dwTemUrl: '/merchantSomplaint/downloadMerchantSomplaintTemplate'
        },
        {
          id: 3,
          name: '舆情数据',
          uploadUrl: '/publicSentiment/batchAddPublicSentiment',
          dwTemUrl: '/publicSentiment/downloadPublicSentimentTemplate'
        },
        {
          id: 4,
          name: '专项巡检数据',
          uploadUrl: '/uploadData/special', // 上传
          dwTemUrl: '/exportController/exporModel?name=special' // 下载模板
        },
        {
          id: 5,
          name: '巡检结果数据',
          uploadUrl: '/uploadData/result',
          dwTemUrl: '/exportController/exporModel?name=result'
        },
        {
          id: 6,
          name: '特批数据',
          uploadUrl: '/uploadData/approval',
          dwTemUrl: '/exportController/exporModel?name=approval'
        },
        {
          id: 7,
          name: '失信数据',
          uploadUrl: '/dataUpload/importDiscredit',
          dwTemUrl: '/exportController/exporModel?name=discredit'
        },
        {
          id: 8,
          name: '高风险商户报备数据',
          uploadUrl: '/uploadData/uploadHighRisk',
          dwTemUrl: '/exportController/exporModel?name=HighRisk'
        }
      ],
      dialogConf: {
        visiable: false,
        uploadUrl: '', //上传url
        dwTemUrl: '' // 下载模板url
      }
    };
  },
  components: { importDialog },
  methods: {
    uploadHandler(item) {
      this.dialogConf.visiable = true;
      this.dialogConf.uploadUrl = item.uploadUrl;
      this.dialogConf.dwTemUrl = item.dwTemUrl;
    }
  }
};
</script>
<style lang='less' scoped>
.title {
  font-size: 16px;
  margin: 20px;
}
.btn_box {
  margin: 0 20px;
}
.el-col {
  margin-top: 30px;
  text-align: center;
}
</style>