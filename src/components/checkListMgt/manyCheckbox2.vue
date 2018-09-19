<!--商户核查单管理-->
<template>
    <div id="manyCheckbox">
      <div class="search-form-item">
        <span class="form-item-label"></span>
        <div class="form-item-content" style="position:relative;cursor: pointer;">
            <el-autocomplete
                popper-class="my-autocomplete"
                v-model="form.childTagName"
                placeholder="请选择二级维度"
                readonly
                :fetch-suggestions="querySearch"
                >
                <i class="el-icon-arrow-down el-input__icon" slot="suffix"> </i>
                <template slot-scope="item">
                     <el-tree
                        @check="selectedTag"
                        :data="kycList"
                        show-checkbox
                        default-expand-all
                        :default-checked-keys="form.childTag"
                        node-key="id" v-if="form.dataTag === 'kyc'">
                    </el-tree>
                    <el-tree
                        @check="selectedTag"
                        :data="hyList"
                        :default-checked-keys="form.childTag"
                        show-checkbox
                        default-expand-all
                        node-key="id" v-else>
                    </el-tree>
                </template>
            </el-autocomplete>
        </div>
    </div>
    </div>
</template>
<script>
import qs from "qs";
import {DATA_TAG, MERCHANT_COMPLAINT_SATISTICS_ENUM} from '@/constants';
export default {
    props:{
        form: Object
    },
    data () {
        return {
            ENUM_VAL: MERCHANT_COMPLAINT_SATISTICS_ENUM,
            tagList: DATA_TAG,
            hoverName: 'hover-input',
            isHover: false,
            selectedTagKey: [],
            kycList: [{
                id: MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL,
                label: '全部',
                children: [{
                    id: 11,
                    label: '正常',
                    children: [
                        { 
                            id: 111,
                            label: '三级 1-2-1'
                        }
                    ]
                },
                {
                    id: 12,
                    label: '风险',
                    children: [
                        { 
                            id: 121,
                            label: '三级 2-2-1'
                        }
                    ]
                }]
            }],
            hyList: [{
                id: MERCHANT_COMPLAINT_SATISTICS_ENUM.ALL,
                label: '全部'
            }]
        }
    },
    created() {
        if (this.form.dataTag === 'kyc') {
            this.getKYC()
        } else {
            this.getQueryEnum()
        }
    },
    watch: {
        'form.dataTag': function(){
            if (this.form.dataTag === 'kyc') {
                this.getKYC()
            } else {
                this.getQueryEnum()
            }
        }
    },
    methods: {
      getStatus(){
          var self = this
          this.$emit("isShow",{
            submitData: self.checkedOneproperty.join(','),
            onepropertySelectshow:false
          })
        },
        setStatus(){  //点取消
          this.$emit("isShow",{
            onepropertySelectshow:false,
            submitData:''
          })
        },
        getQueryEnum () {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: this.form.dataTag
                })
            ).then(res => {
                if (res.status * 1 === 200) {
                    this.hyList = [{
                        id: this.ENUM_VAL.ALL,
                        label: '全部',
                        children: res.data.map(one => {
                            let two = {
                                id: one.syscode,
                                label: one.sysname
                            }
                            return two
                        })
                    }]
                }
            });
        },
        getKYC(){
            this.kycList = [{
                id: this.ENUM_VAL.ALL,
                label: '全部',
                children: [{
                    id: 11,
                    label: '正常',
                    children: [
                        { 
                            id: 111,
                            label: '三级 1-2-1'
                        }
                    ]
                },
                {
                    id: 12,
                    label: '风险',
                    children: [
                        { 
                            id: 121,
                            label: '三级 2-2-1'
                        }
                    ]
                }]
            }]
        },
       
        selectedTag(data, selectedItem){
            this.$emit('selectedChange', selectedItem)
        },
        querySearch(queryString, cb) {
            cb([2])
        }
    },

}
</script>
<style lang="less" scoped>
.el-checkbox{margin-left: 10px;}
.el-checkbox-group{width:100px;}
 .onepropertySelect{
  width:180px;
  line-height: 28px;
  padding-left:10px;
  top:38px;
  background: #fff;
  border:1px solid #ddd;
  z-index:200;
}
.box{
  max-height: 400px;
  overflow-y: scroll;
}
.iconbox{
  right:34px;
  color:#3FAAF9;
}
// 。。。。
.search-content .hover-input .el-icon-arrow-down{
    transition: transform .3s,-webkit-transform .3s;
    transform: rotateZ(-180deg);
}
.search-content .el-icon-arrow-down:before {
    content: "\E603";
    color: #3FAAF9!important;
    font-weight: 800;
}
.el-autocomplete-suggestion li{
    padding: 0;
}
.el-tree-node__label{
    font-size: 12px;
}
</style>
