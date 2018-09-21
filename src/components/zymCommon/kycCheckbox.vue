<!--商户核查单管理-->
<template>
    <div id="kycCheckbox">
      <div class="search-form-item">
        <span class="form-item-label"></span>
        <div class="form-item-content" style="position:relative;cursor: pointer;">
            <el-autocomplete
                popper-class="my-autocomplete"
                v-model="select.kycCognizance"
                readonly
                :fetch-suggestions="querySearch"
                >
                <i class="el-icon-arrow-down el-input__icon" slot="suffix"> </i>

                <template slot-scope="item">
                    <el-tree
                        @check="selectedTag"
                        :data="kycList"
                        :default-checked-keys="select.childTag"
                        show-checkbox
                        default-expand-all
                        node-key="id">
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
            kycList:[{
                id: -1,
                label: '全部',
                children:[
                ]
            }]
        }
    },
     
   mounted(){
        this.getKYC()
   },
    methods: {
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
                                "label":ele.strategy_name
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
                                "label":ele.strategy_name
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
    //     id: -1,
    //     label: '全部',
    //     children: [{
    //         id: 11,
    //         label: '正常',
    //         children: [
    //             { 
    //                 id: 111,
    //                 label: '三级 1-2-1'
    //             },
    //             { 
    //                 id: 112,
    //                 label: '三级2 1-2-2'
    //             }
    //         ]
    //     },
    //     {
    //         id: 12,
    //         label: '风险',
    //         children: [
    //             { 
    //                 id: 121,
    //                 label: '三级 2-2-1'
    //             },
    //             { 
    //                 id: 122,
    //                 label: '三级2 2-2-2'
    //             },
    //             { 
    //                 id: 123,
    //                 label: '三级3 2-2-3'
    //             }
    //         ]
    //     }]
// }],
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
