<!--商户核查单管理-->
<template>
    <div id="manyCheckbox">
      <div class="search-form-item">
        <span class="form-item-label"></span>
        <div class="form-item-content" style="position:relative;cursor: pointer;">
            <el-autocomplete 
                ref="auto"
                popper-class="my-autocomplete"
                v-model="select.kycCognizance"
                readonly
                style="width:none;"
                :fetch-suggestions="querySearch"
                >
                <i class="el-icon-arrow-down el-input__icon"  slot="suffix" @click="iconclick"> </i>
                <template slot-scope="item" >
                     <el-tree
                        @check="selectedTag"
                        :data="kycList"
                        show-checkbox
                        default-expand-all
                        :default-checked-keys="select.childTag"
                        node-key="id" v-if="select.dataTag === 'kyc'">
                    </el-tree>
                    <el-tree
                        @check="selectedTag"
                        :data="hyList"
                        :default-checked-keys="select.childTag"
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
export default {
    props:{
        select: Object
    },
    data () {
        return {
            hoverName: 'hover-input',
            isHover: false,
            selectedTagKey: [],
            kycList: [{
                id: -1,
                label: '全部',
                children: [],
            }],
            hyList: [{
                id: -1,
                label: '全部'
            }]
        }
    },
    mounted() {
        if (this.select.dataTag === 'kyc') {
            this.getKYC()
        } else {
            this.getQueryEnum()
        }

    },
    watch: {
        'select.dataTag': function(){
            if (this.select.dataTag === 'kyc') {
                this.getKYC()
            } else {
                this.getQueryEnum()
            }
        }
    },
    methods: {
       iconclick (){
        this.$refs.auto.focus()
       },
        getQueryEnum () {
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: this.select.dataTag
                })
            ).then(res => {
                if (res.status * 1 === 200) {
                    this.hyList = [{
                        id: -1,
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
            this.$axios.post( "/SysConfigController/queryKyc",
                qs.stringify({
                    type: this.select.dataTag
                })
            ).then(res => {
                if(res.data){
                    this.kycList[0].children = []  //清空
                    var kyc,kyc_risk
                    var kycArr = [],kyc_riskArr = []
                    res.data.map(ele => {
                        if(ele.strategy_cat == 'kyc'){  //正常
                            kyc = {
                                "id":1,
                                "label":'正常',
                                "chilren":[]
                            }
                            var item = {
                                "id":ele.strategy_code,
                                "label":ele.strategy_code
                            }
                          kycArr.push(item)
                          
                            
                        }else if(ele.strategy_cat == 'kyc_risk'){  //风险
                             kyc_risk = {
                                "id":2,
                                "label":'风险',
                                "chilren":[]
                            }
                            var item = {
                                "id":ele.strategy_code,
                                "label":ele.strategy_code
                            }
                              kyc_riskArr.push(item)
                        }

                    })
                    if(kyc){
                        kyc.children = kycArr
                    }
                    if(kyc_risk){
                        kyc_risk.children = kyc_riskArr
                    }

                    if(kyc && kyc_risk){
                        this.kycList[0].children[0] = kyc
                        this.kycList[0].children[1] = kyc_risk
                    }else if(kyc && !kyc_risk){
                        this.kycList[0].children[0] = kyc
                    }else if(!kyc && kyc_risk){
                        this.kycList[0].children[0] = kyc_risk
                    }else if(!kyc && !kyc_risk){
                        this.kycList[0].children = []
                    }
                }
                    

            });
        },
       
        selectedTag(data, selectedItem){
            this.$emit('selectedChange', selectedItem)
        },
        querySearch(queryString, cb) {
            cb([2])
        }
    },

}
// kycList: [{
//                 id: -1,
//                 label: '全部',
//                 children: [{
//                     id: 11,
//                     label: '正常',
//                     children: [
//                         { 
//                             id: 111,
//                             label: '三级 1-2-1'
//                         }
//                     ]
//                 },
//                 {
//                     id: 12,
//                     label: '风险',
//                     children: [
//                         { 
//                             id: 121,
//                             label: '三级 2-2-1'
//                         }
//                     ]
//                 }]
//             }],
</script>
<style lang="less" scoped>
.my-autocomplete{width:none;}
.el-checkbox{margin-left: 10px;}
.el-checkbox-group{width:100px;}
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
