<template>
  <!--添加新案件-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>案件中心</el-breadcrumb-item>
        <el-breadcrumb-item>案件查询</el-breadcrumb-item>
        <el-breadcrumb-item>新增案件</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="btnBoxClass leftBtn" v-if="createPermission">
           <el-button @click="caseAdd" type="primary" round class="rightBtn" style="margin-right:10px;">完成创建</el-button>
      </div>
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;height:auto;">
        <div class="divHead">
            <span class="rideus"></span>案件信息
            <div class="divContent">
                <el-form   :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="来源" prop="come">
                            <el-select v-model="ruleForm.come" placeholder="请选择" id='selectReadonly' v-bind:disabled="disabledInput">
                                <el-option v-for="item in this.ly" :key="item.id" :label="item.sysname" :value="item.sysconid" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="案件类型" prop="type">
                            <el-select v-model="ruleForm.type" placeholder="请选择" @focus="getajlx" id="ruleFormType">
                                <el-option v-for="item in this.ajlx" :key="item.id" :label="item.sysname" :value="item.sysconid"></el-option>
                            </el-select>
                        </el-form-item>
                </el-form>
            </div>
        </div>
        <hr class="hr">
        <div class="divHead">
            <span class="rideus"></span>关联交易
            <div class="divContent">
                <span style="margin-left: 31px;margin-bottom: 10px;display: block;">新建关联交易</span>
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商户编号"  prop="ruleFormId" class='ruleformIdIcon'>
                        <el-input v-model="ruleForm.id" id="ruleFormId"></el-input>
                    </el-form-item>
                    <el-form-item label="商户订单号" prop="MerchantOrderNumber">
                        <el-input v-model="ruleForm.MerchantOrderNumber" id="MerchantOrderNumber" ></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="newCaseSerch"  icon="el-icon-search" style="margin-left: 8px;margin-top:3px;width:110px;" v-if="searchPermission"></el-button>
                </el-form>
                <div class="divContent" style="border:0;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                  <el-table
                    :data="state2TableOne"
                    border
                    style="width: 100%"
                      @selection-change="handleSelectionChange">
                    <el-table-column
                       type="selection"
                      width='50'
                      align='center'>
                    </el-table-column>
                          <el-table-column
                            prop="merchantOrder"
                            label="商户订单号"
                            width='120px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="merchantId"
                            label="商户号"
                            width='120px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="merchantName"
                            label="商户名称"
                            width='120px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="product"
                            label="业务产品"
                            width='120px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="bankNum"
                            width='150px'
                            label="银行卡号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.bankNum}}
                                    <div slot="reference" >
                                        {{ scope.row.bankNumCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            width='150px'
                            label="手机号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.phone}}
                                    <div slot="reference" >
                                        {{ scope.row.phoneCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="idCard"
                            width='120px'
                            label="身份证号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.idCard}}
                                    <div slot="reference" >
                                        {{ scope.row.idCardCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            width="150px;"
                            prop="transactionMoney"
                            label="交易金额（元）"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="transactionIp"
                            label="交易IP"
                            width='130px'
                            align='center'>
                            </el-table-column>
                  </el-table>
                    <el-button @click="addChose"  round style="float:left;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);">添加选中交易</el-button>
                    <el-button @click="addAllChose" round style="float:left;margin-top:10px;border: 1px solid rgb(63, 170, 249);color: rgb(63, 170, 249);">添加全部交易</el-button>
                    <el-pagination
                        layout="prev, pager, next"
                        :total=totalSize
                        style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                    </el-pagination>
                </div>

                <span style="margin-left: 31px;margin-bottom: 10px;display: block;">已关联交易</span>
                <div class="divContent" style="border:0;padding-top:0px;margin-left: 20px;margin-right: -20px;width:97%;">
                  <el-table
                        :data="state2TableTwo"
                        @selection-change="handleSelection"
                        border
                        style="width: 100%">
                        <el-table-column
                        type="selection"
                        width="50"
                        align='center'>
                        </el-table-column>
                       
                        <el-table-column
                            prop="merchantOrder"
                            label="商户订单号"
                            witdh='150px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="merchantId"
                            label="商户号"
                            width='150px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="merchantName"
                            label="商户名称"
                            width='150px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="product"
                            label="业务产品"
                            width='150px'
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="bankNum"
                            width='150px'
                            label="银行卡号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.bankNum}}
                                    <div slot="reference" >
                                        {{ scope.row.bankNumCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            width='150px'
                            label="手机号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.phone}}
                                    <div slot="reference" >
                                        {{ scope.row.phoneCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="idCard"
                            width='150px'
                            label="身份证号">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                        {{ scope.row.idCard}}
                                    <div slot="reference" >
                                        {{ scope.row.idCardCopy }}
                                    </div>
                                    </el-popover>
                                </template>
                            </el-table-column>
                            <el-table-column
                            width="150px;"
                            prop="transactionMoney"
                            label="交易金额（元）"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="transactionIp"
                            width='150px'
                            label="交易IP"
                            align='center'>
                            </el-table-column>
                            <!-- <el-table-column
                            prop="ceshi"
                            width="150px;"
                            label="交易IP归属地">
                            </el-table-column>
                            <el-table-column
                            prop="ceshi"
                            label="交易时间">
                            </el-table-column> -->
                            <el-table-column
                            prop="ceshi"
                            width="190px;"
                            label="商户和易宝承担金额（元）"
                            align='center'>
                            </el-table-column>
                            <el-table-column
                            prop="ceshi"
                            width="190px;"
                            label="易宝实际赔付金额（元）"
                            align='center'>
                            </el-table-column>
                    </el-table>
                   <el-button round @click="remouveChose" style="float:left;margin-top:10px;border: 1px solid rgb(226, 34, 72);color: rgb(226, 34, 72);">删除选中交易</el-button>
                    <el-button round @click="remouveAllChose" style="float:left;margin-top:10px;border: 1px solid rgb(226, 34, 72);color: rgb(226, 34, 72);">删除全部交易</el-button>
                    <el-pagination
                        layout="prev, pager, next"
                        :total=totalSizePage
                        style="display: inline-block;float: right;margin-bottom: 15px;margin-top: 15px;">
                    </el-pagination>
                </div>

            </div>
        </div>
        <hr class="hr">
        <div class="divHead">
            <span class="rideus"></span>用户备注
            <div class="divContent" style="border:0;">

                <div class="textareaIpt">
                  <el-input
                    id="UserNote"
                    type="textarea"
                    :rows="5"
                    :maxlength="200"
                    placeholder="请输入备注，最大内容不超过200"
                    v-model="UserNote">
                  </el-input>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
import {card,phone,idCard} from '../utils'

export default {
      data() {
        return {
            createPermission: true,//创建权限
            searchPermission: true,//创建权限
            disabledInput:false,
            UserNote:'',
            tableData:[],
            state2TableOne:[],
            state2TableTwo:[],
            ceshi:'测试数据咩咩咩喵喵喵',
            options:[{  
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            merchantsState:'',
            value:'',
            ruleForm:{
                type:'',
                come:'',
                id:'',
                MerchantOrderNumber:'',
            },

            ly:'',
            ajlx:'',


            rules: {
                type: [
                    { required: true, message: ' ', trigger: 'blur' },
                ],
                come: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                MerchantOrderNumber: [
                    { required: true, message: ' ', trigger: 'change' }
                ],
                ruleFormId:[
                    { required: true, message: ' ', trigger: 'change' }
                ]
            },
            pageSize:10,
            pageNum:1,
              totalSize:0,
            totalSizePage:0,
            lySysconid:'',
            chooseItemArr:[],
            transactionTime:'',
            lineType:''
        }
      },
      created(){
          // 判断按钮的权限
          const idList = localStorage.getItem('ARRLEVEL') ? JSON.parse(localStorage.getItem('ARRLEVEL')) : [];
          this.createPermission = idList.indexOf(270) === -1 ? false : true;
          this.searchPermission = idList.indexOf(271) === -1 ? false : true;
      },
      methods:{
          getly(){ 

                // console.log("来源" + localStorage.getItem('SID'))

              this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                  "sessionId":localStorage.getItem('SID'),
                  "type":'74',
              }))
              .then(res => {
                this.ly = res.data
              //   console.log(res)
                // console.log(this.ly)
                res.data.forEach(ele => {
                    if(ele.sysname === '规则触发'){
                        console.log(ele.sysconid)
                        this.lySysconid = ele.sysconid
                    }
                });
                 if(window.location.href.split('?')[1].split('=')[1] == 2){
                    this.ly.forEach((ele,index) => {
                         if(ele.sysname === '全部'){
                             this.ly.splice(index,1)
                         }
                     })
                 }
              })
              .catch(error => {
                  console.log(error)
              })
          },
          getajlx(){ 
                // console.log("案件类型" + localStorage.getItem('SID'))

              this.$axios.post('/SysConfigController/queryEnum',qs.stringify({
                  "sessionId":localStorage.getItem('SID'),
                  "type":'73',
              }))
              .then(res => {
                this.ajlx = res.data
              //   console.log(res)
                // console.log(this.ajlx)
                if(window.location.href.split('?')[1].split('=')[1] == 1){
                   
                    this.ajlx.forEach((ele,index) => {
                        if(ele.sysname === '全部'){
                            this.ajlx.splice(index,1)
                        }
                    })
                }
                if(window.location.href.split('?')[1].split('=')[1] == 2){
                    this.ajlx.forEach((ele,index) => {
                         if(ele.sysname === '全部'){
                             this.ajlx.splice(index,1)
                         }
                     })
                 }
              })
              .catch(error => {
                  console.log(error)
              })
          },
            // 添加新案件
            caseAdd(){
              if(this.ruleForm.come == ''){
                  document.querySelector("#selectReadonly").style.border = "1px solid #f56c6c"
                  return
              }else{
                  document.querySelector("#selectReadonly").style.border = "1px solid #c0c4cc"
                  if(this.ruleForm.type == ''){
                    document.querySelector("#ruleFormType").style.border = "1px solid #f56c6c"
                    return
                  }else{
                    document.querySelector("#ruleFormType").style.border = "1px solid #c0c4cc"
                  }
              }

              if(this.UserNote.length > 200){
                  document.querySelector("#UserNote").style.border = "1px solid #f56c6c"
                  // this.$alert('备注最大内容不能超过200', '提示', {
                  //   confirmButtonText: '确定',
                  //   type:'warning',
                  // });
                  // return
              }else{
                  document.querySelector("#UserNote").style.border = "1px solid #dcdfe6"

                  let arr = []
                  if(this.state2TableTwo.length !== 0){
                        this.state2TableTwo.forEach(ele => {
                            arr.push(ele.orderId)
                        });
                  }
                   
                    let str = ''
                    let strBankNum = ''
                    if(this.state2TableTwo.length !== 0){
                        if(this.ruleForm.id === ''){
                            str = this.state2TableTwo[0].merchantId
                        }else if(this.ruleForm.id !== ''){
                            str = this.ruleForm.id
                        }
                        strBankNum = this.state2TableTwo[0].bankNum

                    }else if(this.state2TableTwo.length === 0){
                        str = ''
                        strBankNum = ''
                        this.$alert('已关联交易不能为空', '提示', {
                            confirmButtonText: '确定',
                            type:'warning',
                        });
                        return
                    }
                   
                   
                   if(this.ruleForm.come == '规则触发'){
                       this.ruleForm.come = this.lySysconid
                   }
                    console.log(this.lySysconid)
                    console.log(this.ruleForm.come)
                    console.log(this.ruleForm.type)
                    console.log(arr)
                    console.log(this.ruleForm.id)
                    console.log(this.ruleForm.MerchantOrderNumber)
                    console.log(strBankNum)
                   
                    

                  this.$axios.post('/CaseInquiryController/addCase',qs.stringify({
                      "sessionId":localStorage.getItem('SID'),
                      "source":this.ruleForm.come,
                      "caseType":this.ruleForm.type,
                      "ids":arr.join(','),  // 关联交易中的交易记录ID
                      "merchantId":str, // 该用户的商户编号
                      "merchantOrder":this.ruleForm.MerchantOrderNumber,// 该用户的商户订单号
                      "remark":this.UserNote,
                      'userId':localStorage.getItem('USERID'),
                      'stolenCardNumber':strBankNum,
                      'transactionTime':this.state2TableTwo[0].transactionTime,
                      'businessLine':this.lineType,
                      
                  }))
                  .then(res => {
                      console.log(res)
                      if(res.data.code === 1){
                        this.$alert('创建案件成功','提示',{
                          confirmButtonText:'确定',
                          type:'success',
                          callback:action => {
                            window.close()
                          }
                        })

                      }
                  })
                  .catch(error => {
                      console.log(error)
                  })
              }
            },
            // 关联交易查询
            newCaseSerch(){
                if(this.ruleForm.id == ''){
                    document.querySelector("#ruleFormId").style.border = "1px solid #f56c6c"
                    this.$alert('商户编号不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                    });
                    return
                }else if(this.ruleForm.id !== ''){
                  document.querySelector("#ruleFormId").style.border = "1px solid #dcdfe6"
                }


              if(this.ruleForm.MerchantOrderNumber === ''){
                  document.querySelector("#MerchantOrderNumber").style.border = "1px solid #f56c6c"
                  this.$alert('商户订单号不能为空', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                  });
                  return
              }else if(this.ruleForm.MerchantOrderNumber !== ''){
                  document.querySelector("#MerchantOrderNumber").style.border = "1px solid #dcdfe6"

                 
                  this.$axios.post('/CaseInquiryController/queryInnerTransaction',qs.stringify({
                      "sessionId":localStorage.getItem('SID'),
                      "merchantId":this.ruleForm.id,
                      "merchantOrder":this.ruleForm.MerchantOrderNumber,
                      "pageSize": parseInt(this.pageSize) ,
                      "pageNum":parseInt(this.pageNum) ,
                  }))
                  .then(res => {
                       console.log(res.data)
                       if(res.data.recordList !== ''){
                          this.state2TableOne = []
                          this.state2TableOne = this.state2TableOne.concat(res.data.recordList)
                          this.totalSize = res.data.totalSize
                          this.lineType = res.data.lineType
                          this.state2TableOne.forEach(ele => {
                                ele.bankNumCopy = ''
                                if(ele.bankNum === ''){
                                    ele.bankNumCopy = ele.bankNum
                                }else if(ele.bankNum !== ''){
                                    ele.bankNumCopy = card(ele.bankNum)
                                }

                                ele.phoneCopy = ''
                                if(ele.phone === ''){
                                    ele.phoneCopy = ele.phone
                                }else if(ele.phone !== ''){
                                    ele.phoneCopy = phone(ele.phone)
                                }

                                ele.phoneCopy = ''
                                if(ele.idCard === ''){
                                    ele.idCardCopy = ele.idCard
                                }else if(ele.idCard !== ''){
                                    ele.idCardCopy = idCard(ele.idCard)
                                }

                            }) 


                       }else if(res.data.recordList === ''){
                          this.state2TableOne = []
                       }
                     

                  })
                  .catch(error => {
                      console.log(error)
                  })
                  
              }
            },
        // 初审时关联交易 添加所有数据到已关联
        addAllChose(){
            
            

            if(this.state2TableOne.length == 0){
                this.$alert('没有任何数据', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }

            
            let arr = []
            for(let i = 0; i < this.state2TableOne.length; i++){
               for(let j = 0; j < this.state2TableOne.length; j++){
                   if(this.state2TableOne[i].bankNum !== this.state2TableOne[j].bankNum){
                       arr.push(this.state2TableOne[i])
                   }
               }
            }
            if(arr.length !== 0){
                this.$alert('交易中有不同卡号', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
            }else if(arr.length === 0){
                this.state2TableTwo = JSON.parse(JSON.stringify(this.state2TableOne)) 
                this.totalSizePage  = this.state2TableOne.length
                 this.state2TableTwo.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }
                }) 
            }
        },
        // 初审时关联交易 添加选中到已关联
        addChose(){
            var _this = this
            if(this.state2TableOne == ''){
                this.$alert('没有任何数据', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }
            // if(_this.state2TableOne.length !== 0){
            //     if(_this.newDeal.length ==  0){
            //         _this.$alert('没有选择需添加的数据', '提示', {
            //             confirmButtonText: '确定',
            //             type:'warning',
            //         });
            //     }
            //     return
            // }
            // if(this.newDeal.length !== 0){
            //     this.state2TableTwo  = []
            //     this.state2TableTwo = this.state2TableTwo.concat(this.newDeal) 
            //     this.totalSizePage =  this.newDeal.length
            // }
         
             let arr = []
            for(let i = 0; i < this.newDeal.length; i++){
               for(let j = 0; j < this.newDeal.length; j++){
                   if(this.newDeal[i].bankNum !== this.newDeal[j].bankNum){
                       arr.push(this.newDeal[i])
                   }
               }
            }
            if(arr.length !== 0){
                this.$alert('交易中有不同卡号', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }else if(arr.length === 0){
                this.state2TableTwo = JSON.parse(JSON.stringify(this.newDeal)) 
                this.totalSizePage  = this.newDeal.length
                 this.state2TableTwo.forEach(ele => {
                    ele.bankNumCopy = ''
                    if(ele.bankNum === ''){
                        ele.bankNumCopy = ele.bankNum
                    }else if(ele.bankNum !== ''){
                        ele.bankNumCopy = card(ele.bankNum)
                    }

                    ele.phoneCopy = ''
                    if(ele.phone === ''){
                        ele.phoneCopy = ele.phone
                    }else if(ele.phone !== ''){
                        ele.phoneCopy = phone(ele.phone)
                    }

                    ele.phoneCopy = ''
                    if(ele.idCard === ''){
                        ele.idCardCopy = ele.idCard
                    }else if(ele.idCard !== ''){
                        ele.idCardCopy = idCard(ele.idCard)
                    }

                }) 
            }           
        },
        // 初审时关联交易 删除所有选中到已关联的数据
        remouveAllChose(){
            if(this.state2TableTwo == ''){
                this.$alert('没有任何数据,无需删除', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }
            this.state2TableTwo = []
            this.totalSizePage = 0
        },

        // 删除所选中的关联交易
        remouveChose(){
            if(this.state2TableTwo == ''){
                this.$alert('没有任何数据,无需删除', '提示', {
                    confirmButtonText: '确定',
                    type:'warning',
                });
                return
            }

            let arr = []
            this.chooseItemArr.forEach(ele => {arr.push(ele.orderId)})

            for(let i=0;i<arr.length;i++){
                for(let j=0;j<this.state2TableTwo.length;j++){
                    if(arr[i] === this.state2TableTwo[j].orderId){
                        console.log(this.state2TableTwo[j])
                        this.state2TableTwo.splice(j,1)
                    }
                }
            }
        },
        handleSelectionChange(val) {
            this.newDeal = JSON.parse(JSON.stringify(val)) ;
            console.log(this.newDeal)
        },
        handleSelection(row){
            this.chooseItemArr = JSON.parse(JSON.stringify(row)) ;
        },
        getBusiNum(){
            console.log(localStorage.getItem('MERID'))
            console.log(window.location.href.split('?')[1].split('=')[1])
            
            if(window.location.href.split('?')[1].split('=')[1] == 1){
                this.ruleForm.come = '规则触发'
                this.disabledInput = true
                console.log(this.disabledInput)
                
                this.ruleForm.MerchantOrderNumber = localStorage.getItem('MERID')
                document.querySelector('#MerchantOrderNumber').value = localStorage.getItem('MERID')
                this.newCaseSerch()           
            }
        }
      },
      mounted(){
        this.getly()        
        this.getBusiNum()
      },
    }
</script>
<style scoped>
.inline-box{
    display: inline-block;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.hr{
    margin-top: 25px;
    margin-bottom: 25px;
    border: none;
    height: 1px;
    background-color: #E0E0E0;
}
.flootText{
  width: 98%;
  height: 51px;
  overflow: hidden;
  border: 1px solid #E0E0E0;
  margin: -32px 10px 20px 0px;
  border-top: 0;
  padding-top: 17px;
}
.leftBtn{
  float: left;
}
.rightBtn{
  float: right;
}
.blackAddBtn{
  margin-left: 20px;
}
.btnBoxClass{
  width: 98%;
  background-color: rgb(245, 246, 250);
  height: 54px;
  margin-top: 14px;
  padding-top: 14px;
}
.clearBox{
  clear:both
}
.divHead{
  margin-top:20px;
  margin-left:20px;
}
.rideus{
  display:block;
  width:10px;
  height:10px;
  background-color:#000;
  border-radius:5px;
  float:left;
  margin-top: 7px;
  margin-right: 15px;  
}
.htmlHead{
  width:98%;
  margin-top:20px;
  margin-left:20px;
}
.divContent{
  width:98%;
  overflow: hidden;
  margin-top:20px;
  margin-bottom:30px;
  height:100%;
  border: 1px solid #E0E0E0;
  /* padding: 30px 20px 30px 20px; */
  padding-top: 15px;
}
.divContent .text input{
  border:0;
}
.text{
  width:40%;
  float:left;
  text-align: right;
}
.text-box{
  width: 50%;
  float: left;
}
.labelC{
  float: left;
  font-size: 13px;
  width: 20%;
  color: rgb(142, 142, 142)
}
.boxOnly{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 40px;
}
.divContent p {
  font-size: 13px;
  color:#606266;
  padding: 10px;
  line-height: 26px;
}
.textareaIpt input{
    border-radius: 30px;
}
/* .boxOnly input{
  border: none; 
}  */
</style>
