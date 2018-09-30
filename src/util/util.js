import axios from 'axios'
import qs from 'qs';
import moment from 'moment';
export default{
	install:function(Vue,opt){
		Vue.mixin({
			methods:{
				listQuery:function(url,flag,isCheck) {  //查询
					var check = isCheck ? isCheck : false;
					var params = this.processParams(flag,check)//入参
					if(!params){
						return false
					}
					this.loading = true
					this.$axios.post(url,qs.stringify(params)).then(res => {
						this.loading = false
				        var response = res.data
				        if(response.code == '200' || response.code == '1'){
				        	if(response.data){
				        		this.lsstTable = response.data.returnList
				            	this.length = response.data.total;
				            	this.totalSize = response.data.pages;
				        	}
				        }else{
				        	this.resultData = []
                   			this.length = 0
				            this.$message.error({message:response.msg,center: true});
				        }
				    }) 
				},
				showsecret(row, column, cell, event){
			        if(cell.querySelector('.secret')){
			            if(cell.querySelector('.cell').innerText.trim() != ''){
			                cell.querySelector('.secret').classList.remove('none')
			                var timer = null
			                timer=setTimeout(() => {
			                   cell.querySelector('.secret').classList.add('none')
			                }, 4000)
			            }
			        }
			    },
				processParams:function(flag,isCheck){   //根据参数，确定查询接口入参
					var self = this
					
					var params = {}
					switch(flag){
						case 'noneEpos':   //非epos查询
							params = this.form
							var validateObj = {
								"orderNo":params.orderNo,
								"mobile":params.mobile,
								"number":params.number,
								"cardNo":params.cardNo,
								"terminal":params.terminal,
								"IDNo":params.IDNo,
								"userId":params.userId
							}
							var result = this.oneofmust(validateObj)  //校验结果
							if(!result && !isCheck){
								this.$alert('商户订单号、手机号、商户编号、银行卡号、终端号、身份证号、用户id必填其中之一', '筛选项必填', {
							          confirmButtonText: '确定'
							        });
								return false
							}else{
								params.pageNumber = this.pageNumber
                    			params.pageRow = this.pageRow
								return params
							}
						break;
						case 'epos': //epos查询
							params = this.form
							var validateObj = {
								"number":params.number,
								"orderNo":params.orderNo,
								"mobile":params.mobile,
								"cardNo":params.cardNo,
								"IDNo":params.IDNo,
								"terminal":params.terminal
							}
							var result = this.oneofmust(validateObj)  //校验结果
							if(!result && !isCheck){
								this.$alert('商户编号、商户订单号、手机号、银行卡号、身份证号、终端号必填其中之一', '筛选项必填', {
							          confirmButtonText: '确定'
							        });
								return false
							}else{
								params.pageNumber = this.pageNumber
                    			params.pageRow = this.pageRow
								return params
							}
						break;
						case 'offlinetransaction'://线下交易查询
							params = this.form
							var validateObj = {
								"yeepayNo":params.yeepayNo,
								"terminal":params.terminal,
								"cardNo":params.cardNo,
								"number":params.number,
								"orderNo":params.orderNo
							}
							var result = this.oneofmust(validateObj)  //校验结果
							if(!result && !isCheck){
								this.$alert('易宝交易流水号、pos终端号、银行卡号、商户编号、商户订单号必填其中之一', '筛选项必填', {
							          confirmButtonText: '确定'
							        });
								return false
							}else{
								params.pageNumber = this.pageNumber
                    			params.pageRow = this.pageRow
								return params
							}
						break;
						case 'outPay'://出款交易查询
							params = this.form
							var validateObj = {
								"yeepayNo":params.yeepayNo,
								"orderNo":params.orderNo,
								"merchantNo":params.merchantNo,
								"receiveCardNo":params.receiveCardNo,
								"outBatchNo":params.outBatchNo,
								"remitNo":params.remitNo//出款订单号
							}
							var result = this.oneofmust(validateObj)  //校验结果
							if(!result && !isCheck){
								this.$alert('易宝交易流水号、商户订单号、出款订单号、商户编号、收款账户号、出款批次号必填其中之一', '筛选项必填', {
							          confirmButtonText: '确定'
							        });
								return false
							}else{
								params.pageNumber = this.pageNumber
                    			params.pageRow = this.pageRow
								return params
							}
						break;
						case 'highrisk'://高危交易查询
							params = this.form
							params.pageNumber = this.pageNumber
                    		params.pageRow = this.pageRow
							return params
						break;
						case 'cuscheck'://商户核查单管理平台
							params = this.toJson(self.form,self.formSenior)
							if(this.lsstShow){
								params.pageNumber = this.pageNumber0
                    			params.pageRow = this.pageRow0
							}else{
								params.pageNumber = this.pageNumber1
                    			params.pageRow = this.pageRow1
							}
							params.kycCognizance = this.select.kycCognizance == '全部' ? 'all' : this.select.kycCognizance
							return params
						break;
						case 'cuscheckimmune'://商户核查单免疫管理平台
							params = this.form
							params.pageNumber = this.pageNumber
                    		params.pageRow = this.pageRow
							return params
						break;
						case 'case'://案件
							params = this.toJson(self.form,self.formSenior)
							params.pageNumber = this.pageNumber
                    		params.pageRow = this.pageRow
                    		params.kycCognizance = this.select.kycCognizance
							return params
						break;
						case 'CustomerUniqueMarker'://商户唯一标识
							params = this.form
							var check = this.inputlimit(params)  //100个限制
							if(check){
								params.pageNumber = this.pageNumber
                				params.pageRow = this.pageRow
								return params
							}
						break;
						case 'merchantPhoto'://商户画像
							params = this.form
							var check = this.inputlimit(params)  //100个限制
							if(check){
								params.pageNumber = this.pageNumber
                				params.pageRow = this.pageRow
                				params.kycCognizance = this.select.kycCognizance == '全部' ?  'all' : this.select.kycCognizance
								return params
							}
						break;
					}
				},
				selectedChange(item){  //商户kyc复选框  下拉层级
	                let ids = item.checkedKeys
	                if (ids.length > 0) {
	                    let names = []
	                    item.checkedNodes.map(one => {
	                        names.push(one.label)
	                    })
	                    for (let i = 0; i< names.length; i++) {
	                        if (names[i] === '全部' || names[i] === '正常' || names[i] === '风险') {
	                            ids[i] = ''
	                        }
	                    }
	                    let filterName = names.join(',')
	                    if (filterName.indexOf('全部') >= 0) {
	                        this.select.kycCognizance = '全部'
	                    } else if (filterName.indexOf('正常') >= 0) {
	                        this.select.kycCognizance = filterName.replace('正常,', '')
	                    } else  if (filterName.indexOf('风险') >= 0) {
	                        this.select.kycCognizance = filterName.replace('风险,', '')
	                    } else {
	                        this.select.kycCognizance = filterName
	                    }
	                    let filterID = []
	                    ids.map(one => {
	                        if (one !== '') {
	                            filterID.push(one)
	                        }
	                    })
	                    this.ids = filterID
	                    this.select.childTag = item.checkedKeys
	                } else {
	                    this.select.childTag = [-2]
	                    this.select.kycCognizance = ''
	                }
	            },
				inputlimit(params){
					var customerSignArr = this.stringToArray(params.customerSignArr)
					var customerNumberArr = this.stringToArray(params.customerNumberArr)
					if(customerSignArr.length > 100){
						this.$alert('商户唯一标识最多支持100个', ' ', {
					          confirmButtonText: '确定'
					        });
						return false
					} 
					if(customerNumberArr.length > 100){
						this.$alert('商户编号最多支持100个', ' ', {
					          confirmButtonText: '确定'
					        });
						return false
					}
					return true
				},
				stringToArray(str){  //字符串->数组
					var temp = ''
					if(str instanceof Array){
						temp = str.join(',')
					}else{
						temp = str
					}
					return temp.split(',')
				},
				checkMerchantNo(no){  //校验商编
					var self = this
					var param = this.addSessionId({"merchantNo":no})
			        this.$axios.post("/checklist/merchant",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code != '200'){
			            	this.merchantnoisok =false
			            	this.merchant=true
			            	this.merchanttext=response.msg
			            }else{
			            	this.merchant=false
			            	this.merchantnoisok =true
			            }
			        })
				},
				checkMerchantRule(rule){  //校验商户规则
					var self = this
					var param = this.addSessionId({"rules":rule})
			        this.$axios.post("/checklist/rules",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code != '200'){
			            	this.merchantruleisok = false
			            	this.rule=true
			            	this.ruletext=response.msg
			            }else{
			            	this.rule=false
			            	this.merchantruleisok = true
			            }
			        })
				},
				getCode(array){  //获取产品码
			      var self = this
			      var temparr  = []
			      array.map(function(item,index){
			        self.product.split(',').map(function(items,indexs){
			          if(items == item.label){
			            temparr.push(item.value)
			          }
			        })
			      })
			       this.checkedProductCode = temparr 
			       return Array.from(this.checkedProductCode).join(',')
			    },
			    getBank(){ //获取 银行
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getBank" ,qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.bankArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getIndustryAchievementProperty(){ //获取 行业业绩属性  商户业绩归属  商户业绩属性
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getIndustryAchievementProperty" ,qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.worktypeArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getweidu(){  //获取 统计维度
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getTag",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.weiduArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getMerchantSort(){//获取 商户排序
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getMerchantSort",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.merchantorderArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getMerchantFirst(){//获取商户自然属性一级
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getMerchantFirst",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.onepropertySelect = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },

			    getRuletype(){//获取规则类型
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getRuleType",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.ruleTypeArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getyewufang(){//获取业务方
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getBizType",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.ywftArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getProductsec(businessline){//获取业务线关联得产品
			    	var self = this
			    	self.oneProductSelect=[]
			    	self.checkedProductCode=[]
			    	self.checkedProduct=[]
			    	self.product=''
			    	var param = this.addSessionId({"businessLine":businessline})
			        this.$axios.post("/param/getProduct",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.oneProductSelect = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getProduct(){  //获取产品
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getProduct",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.productArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getProduct2(){  //获取产品
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getProduct",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.oneProductSelect = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getTransitionType(){  //交易类型
			    	var self = this
			    	var param = this.addSessionId({})
			        this.$axios.post("/param/getOrderType",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                self.transactionTypetArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
			    },
			    getRiskDeal(){ //风险处理
			    	var param = this.addSessionId({})
			    	this.$axios.post("/param/getRiskDeal",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.fxclArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				},
				getDealStatus(){ //处理状态查询
					var param = this.addSessionId({})
			    	this.$axios.post("/param/getDealStatus",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.clztArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				},
				getRiskLevel(){ //风险级别查询
					var param = this.addSessionId({})
			    	this.$axios.post("/param/getRiskLevel",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.fxjbArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				}, 
				getCheckListSource(){ //核查单来源
					var param = this.addSessionId({})
			    	this.$axios.post("/param/getCheckListSource",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.hcdlyArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				}, 
				getSubCompany(){ //派发至 分公司
					var param = this.addSessionId({})
			    	this.$axios.post("/checklist/getSubCompany",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.dispatchformArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				}, 
				getImmuneStatus(){ //状态
					var param = this.addSessionId({})
			    	this.$axios.post("/param/getImmuneStatus",qs.stringify(param)).then(res => {
			            var response = res.data
			            if(response.code == '200'){
			                this.statusArray = response.data.returnList
			            }else{
			                this.$message.error({message:response.msg,center: true});
			            }
			        })
				}, 
			    toJson(json1,json2){
			    	var temp = {}
			    	for(var item in json1){
			    		temp[item] = json1[item]
			    	}
			    	for(var item2 in json2){
			    		temp[item2] = json2[item2]
			    	}
			    	return temp
			    },
				atleastOne(){
					// 至少一条数据弹框
					this.$alert('请选择至少一条数据', '系统提示', {
						confirmButtonText: '确定',
						type: 'warning'
					});
				},
				onlyOne(){
					// 至少一条数据弹框
					this.$alert('请选择并且只能选择一条数据', '系统提示', {
						confirmButtonText: '确定',
						type: 'warning'
					});
				},
				highRiskListTip(text){ //高危交易弹框
					var self = this
					this.$alert(text,'提示',{
			          confirmButtonText: '确定'
			        });
				},
				successTip(text){  //成功提示框
					var self = this
			        this.$alert(text, '系统提示', {
			          showCancelButton:false,
			          confirmButtonText: '确定',
			          cancelButtonText: '',
			          type: 'success'
			        })
				},
				failTip(text){  //成功提示框
					var self = this
			        this.$alert(text, '系统提示', {
			          showCancelButton:false,
			          confirmButtonText: '确定',
			          cancelButtonText: '',
			          type: 'error'
			        })
				},
				paramCheck(label){  ////黑名单 入参返回
					var self = this
					var pageParams = []
			        self.items.map(function(item){
			        	if(label == 'epos'){
			        		var temp ={
				        		"offline_merchantId":item.No,
				        		"paramMerchantId":item.No,
				        		"offline_corporateName":'',
				        		"offline_corporateNo":'',
				        		"offline_settlementAcct":'',
				        		"offline_settlementAcctName":'',
				        		"offline_businessId":'',
				        		"offline_merchantGuid":'',
				        		"online_bankCardNoBl":item.cardNoSI,
				        		"online_imeiBl":'',
				        		"online_terminalIdBl":item.terminal,
				        		"online_loginNameBl":'',
				        		"online_userIpBl":item.ip,
				        		"online_userPhoneBl":item.cardHolderMobileSI,
				        		"online_idNoBl":item.cardHolderIdSI,
				        		"online_referBl":'',
				        		"paramMerchantOrder":item.orderNo
				        	}
			        	}else if(label == 'noneepos'){
			        		var temp ={
				        		"offline_merchantId":item.No,
				        		"paramMerchantId":item.No,
				        		"offline_corporateName":'',
				        		"offline_corporateNo":'',
				        		"offline_settlementAcct":'',
				        		"offline_settlementAcctName":'',
				        		"offline_businessId":'',
				        		"offline_merchantGuid":'',
				        		"online_bankCardNoBl":item.cardNoSI,
				        		"online_imeiBl":'',
				        		"online_terminalIdBl":item.terminal,
				        		"online_loginNameBl":'',
				        		"online_userIpBl":item.ip,
				        		"online_userPhoneBl":item.cardHolderMobileSI,
				        		"online_idNoBl":item.idNoSI,
				        		"online_referBl":'',
				        		"paramMerchantOrder":item.orderNo
				        	}
			        	}else if(label == 'offline'){
			        		var temp ={
				        		"offline_merchantId":item.No,
				        		"paramMerchantId":item.No,
				        		"offline_corporateName":'',
				        		"offline_corporateNo":'',
				        		"offline_settlementAcct":'',
				        		"offline_settlementAcctName":'',
				        		"offline_businessId":'',
				        		"offline_merchantGuid":'',
				        		"online_bankCardNoBl":'',
				        		"online_imeiBl":'',
				        		"online_terminalIdBl":'',
				        		"online_loginNameBl":'',
				        		"online_userIpBl":'',
				        		"online_userPhoneBl":'',
				        		"online_idNoBl":'',
				        		"online_referBl":'',
				        		"paramMerchantOrder":item.orderNo
				        	}
			        	}
			        		
			        	pageParams.push(temp)
			        }) 
			        return JSON.stringify(pageParams)
				},
				blackListTip(url,value,label){  //黑名单弹框
			        var self = this
			        if(self.idList.length < 1){
			            this.atleastOne()
			            return false
			        }
			        var buttonType= ''
			        
			        var text =''
		            if(value){  //加黑
		            	if(label == 'epos'){
				        	buttonType = 'epos_black'
				        }else if(label == 'noneepos'){
				        	buttonType = 'one_key_black'
				        }
		                text = '确定加入黑名单吗'
		            }else {  ///删黑
		            	if(label == 'epos'){
				        	buttonType = 'epos_delBlack'
				        }else if(label == 'noneepos'){
				        	buttonType = 'one_key_delBlack'
				        }
		                text = '确定从黑名单删除吗'
		            }
			        var param={
				            'sessionId':localStorage.getItem('SID') ? localStorage.getItem('SID'):'',
				            'source':'753',
				            'type':'black',
				            'bizLine':'online',
				            'comments':'',
				            'buttonType':buttonType,
				            'data':self.paramCheck(label),
				            'loginPerson':sessionStorage.getItem('testName') ? sessionStorage.getItem('testName'):''
				        }
			       
			        this.$confirm(text,'提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          callback:function(item){
			            if(item == 'confirm'){
			                self.blackList(url,param,value)
			            }
			            
			          }
			        })
			    },
			    manyBlackFailtip(text){ //批量黑名单失败
			    	var html = '<div class="tc" style="max-height:350px;overflow-y:scroll;">'+
			    	text +
					'</div>' 
			    	this.$confirm(html, '提示', {
			          confirmButtonText: '确定',
			          showClose: false,
			          dangerouslyUseHTMLString: true,
			          callback:function(item){
			          	if(item == 'confirm'){
			                self.postponeList(value,url)
			            }
			               
			          }
			        }) 
			    },
			    postponeListTip(value,text,url) {//交易资金暂缓弹框 和商户资金暂缓弹框
			    	var self = this
			    	if(self.idList.length != 1){
			            this.onlyOne()
			            return false
			        }
			    	var html = '<div class="tc">'+
					'        <div class="clear">'+
					'                <div class="el-icon-warning fl fs20" style="color:#e6a23c;margin-top:2px;margin-left:15px;margin-right:4px;"></div><p class="fs20 fl">'+text+'</p>'+
					'        </div>'+
					'        <textarea name="textarea" id="textarea" style="width:90%;height:60px;padding:5px;margin-top:20px;resize: none;" placeholder="最多输入50个字" cols="30" rows="2" length="50"></textarea>'+
					'</div>' 
			    	this.$confirm(html, '', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          showClose: false,
			          dangerouslyUseHTMLString: true,
			          callback:function(item){
			          	if(item == 'confirm'){
			                self.postponeList(value,url)
			            }
			               
			          }
			        }) 
			    },
			    selectedcheckIds(selection){  //get核查单号
			        var idList = []
			        for(var i=0,len = selection.length;i<len;i++){
			            idList.push(selection[i].yeepayNo)
			        }
			        this.idList = idList
			        return this.idList
			    },
				selectedItems(selection){  //返回表格中选中的行
			        var idList = []
			        this.items = []
			        for(var i=0,len = selection.length;i<len;i++){
			            idList.push(selection[i].yeepayNo)
			            this.items.push(selection[i])
			             if(this.cardParam ==''){
				        	this.cardParam = selection[i].cardNo
				        }
			        }
			        this.idList = idList
			       
			        return this.idList
			    },
			    selectedItemsid(selection){  //返回表格中选中的行
			        var idList = []
			        for(var i=0,len = selection.length;i<len;i++){
			            idList.push(selection[i].id)
			        }

			        this.idList = idList
			        return this.idList
			    },
			    reset:function(flag) {  //重置
			    	switch(flag){
						case 'noneEpos':   //非epos查询
							this.form.mobile= ''
							this.form.number= '' //商户编号
							this.form.orderNo= ''//商户订单号
							this.form.terminal= ''//终端号
							this.form.cardNo= ''
							this.form.IDNo= ''//身份证号
							this.form.userId= ''//用户id
							this.form.channel= ''//通道编码
						break;
						case 'epos': //epos查询
							this.form.number= ''//商户编号
							this.form.orderNo= ''//商户订单号
							this.form.mobile= ''
							this.form.cardNo= ''
							this.form.IDNo= ''
							this.form.terminal= ''
						break;
						case 'offlinetransaction'://线下交易查询
							this.form.yeepayNo= ''//易宝流水帐号
							this.form.terminal= ''//pos终端号
							this.form.cardNo= ''//银行卡号
							this.form.number= ''//商户编号
							this.form.orderNo= ''//商户订单号
							this.form.bankCode= ''//bankCode
						break;
						case 'outPay'://出款交易查询
							this.form.yeepayNo= ''//易宝流水帐号
							this.form.orderNo= ''//出款订单号
							this.form.remitNo= ''//出款订单号
							this.form.merchantNo= ''//
							this.form.receiveCardNo= ''//收款账户号
							this.form.outBatchNo= ''//出款批次号
						break;
						case 'highrisk'://高危交易查询
							this.form.product= ''//产品
							this.form.markPerson= ''//标记人
							this.form.No= ''//商户编号
							this.form.name= ''//商户名称
							this.form.mobile= ''//
							this.form.card= ''//
							this.form.orderNo= ''//
							this.form.bankName= ''//
						break;
						case 'cuscheck'://商户核查单管理平台
							this.form.merchantNo= ''//商户编号
							this.form.merchantContractName= ''//商户签约名
							this.form.checkList= ''//商户编号
							this.form.name= ''//核查单号
							this.formSenior.sale= ''//销售
							this.formSenior.subCompany= ''//分公司
							this.formSenior.agentNo= ''//代理商编号
							this.formSenior.agentName= ''//代理商名称
							this.formSenior.triggerRules= ''//触发规则
						break;
						case 'cuscheckimmune'://商户核查单免疫管理平台
							this.form.merchantNo= ''//商户编号
							this.form.merchantRule= ''//规则
							this.form.operator= ''//操作员
						break;
						case 'case'://案件
							this.form.merchantNo= ''//商户编号
							this.form.merchantContractName= ''//商户签约名
							this.form.caseNumber= ''//案件号

							this.formSenior.sale= ''//销售
							this.formSenior.agentNo= ''//代理商编号
							this.formSenior.agentName= ''//代理商名称
						break;
						case 'CustomerUniqueMarker'://商户唯一标识  
							this.form.customerSignArr = ''
							this.form.customerNumberArr = ''
							this.form.signedname = ''
						break;
						case 'merchantPhoto'://商户画像
							this.form.customerSignArr = ''
							this.form.customerNumberArr = ''
							this.form.signedname = ''
							this.form.branchname = ''
							this.form.agentcode = ''
							this.form.agentname = ''
						break;
					}
				},
				allarea(ev){
			      var target = ev.target
			      this.$refs.list.classList.add('none')
			      if(this.$refs.list2){
					this.$refs.list2.classList.add('none')
			      }
			      ev.stopPropagation()
			    },
			    companyRenderHeader(h, { column, $index }){
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
			              this.$refs.list.style.top= ev.pageY + 10+ 'px'
			              ev.stopPropagation()  //阻止冒泡
			            }
			          }
			        }),
			      ])
			    },
			    companyRenderHeader2(h, { column, $index }){
			      return h("span",[
			        h("span",column.label),
			        h("span",{
			          "class":{
			            "el-icon-arrow-down":true
			          },
			          "on":{
			            click:(ev) => {
			              this.$refs.list2.classList.remove('none')
			              var w = this.$refs.list2.offsetWidth
			              if(Number(document.body.clientWidth) -  Number(ev.clientX) < w ){
			                this.$refs.list2.style.left = Number(document.body.clientWidth) - w - 20 + 'px'
			              }else{
			                this.$refs.list2.style.left = ev.clientX + 'px'
			              }
			              this.$refs.list2.style.top = ev.pageY + 10 + 'px'

			              ev.stopPropagation()  //阻止冒泡
			            }
			          }
			        }),
			      ])
			    },
			    doHandleMonth(month){
			    	var m = month;    
			       if(month.toString().length == 1){    
			          m = "0" + month;    
			       }    
			       return m;
			    },
			    getLastDateOfMonth(year, month) {  
			    	var day = new Date(year,month,0);
			    	var lastdate = day.getDate();
				    return lastdate  
				},
				getdiffTime(day){  //获取日期
					/*
					yyyy-mm-dd
					day 为 0 表示当天
					    为负数代表今天之前  
					    为正数代表今天之后
					*/
				       var today = new Date();    
				       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;            
				       today.setTime(targetday_milliseconds); //注意，这行是关键代码  
				       var tYear = today.getFullYear();    
				       var tMonth = today.getMonth();    
				       var tDate = today.getDate();    
				       tMonth = this.doHandleMonth(tMonth + 1);    
				       tDate = this.doHandleMonth(tDate);    
				       return tYear+"-"+tMonth+"-"+tDate;    
				},
				getNaturalMonth(m){
					//获取自然月   给报表用
					/*
					yyyy-mm
					m 为 0 表示当月
					    为负数代表前几个月 
					    为正数代表后几个月
					*/
					var self = this
					 var today = new Date();    
				       var targetday_milliseconds=today.getMonth() + m;            
				       today.setMonth(targetday_milliseconds); //注意，这行是关键代码  
				       var tYear = today.getFullYear();    
				       var tMonth = today.getMonth();  
				       var tDate = today.getDate();   
				       tMonth = this.doHandleMonth(tMonth+1);  
				       tDate = this.doHandleMonth(tDate);
				       return {
				       	"tYear":tYear,
				       	"tMonth":tMonth,
				       	"tDate":self.getLastDateOfMonth(tYear,tMonth)
				       }
				       // return tYear+"-"+tMonth 
				},
				getThreeYear(){
					var date=new Date(); 
					var year=date.getFullYear(); //获取当前年份 
					var mon="0"+(date.getMonth()+1); //获取当前月份 
					var da= '0' + date.getDate(); //获取当前日 
					var day=date.getDay(); //获取当前星期几 
					var h=date.getHours(); //获取小时 
					var m='0' + date.getMinutes(); //获取分钟 
					var s= '0'+ date.getSeconds(); //获取秒 
					var d=document.getElementById('Date'); 
					let time = year+'-'+mon.substring(mon.length-2,mon.length)+'-'+da.substring(da.length-2,da.length)+' '+h+':'+m.substring(m.length-2,m.length)+':'+s.substring(s.length-2,s.length); 
					var endyear = year + 3;
					let endTime = endyear+'-'+mon.substring(mon.length-2,mon.length)+'-'+da.substring(da.length-2,da.length)+' '+h+':'+m.substring(m.length-2,m.length)+':'+s.substring(s.length-2,s.length);
					return {
						time:time,
						endTime:endTime
					}
				},
				formatDate(date) {
				    var myyear = date.getFullYear();
				    var mymonth = date.getMonth() + 1;
				    var myweekday = date.getDate();
				    if (mymonth < 10) {
				        mymonth = "0" + mymonth;
				    }
				    if (myweekday < 10) {
				        myweekday = "0" + myweekday;
				    }
				    return (myyear + "-" + mymonth + "-" + myweekday);
				},
				getWeek(){
					//获取自然周
					var now = new Date(); //当前日期
					var nowDayOfWeek = now.getDay(); //今天本周的第几天
					var nowDay = now.getDate(); //当前日
					var nowMonth = now.getMonth(); //当前月
					var nowYear = now.getFullYear(); //当前年
					var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
					var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    				return {
    					"start":this.formatDate(weekStartDate),
    					"end":this.formatDate(weekEndDate)
    				};
				},
				dostr(arr){//数组中数据逗号干掉
					var temp =[]
					arr.map(function(ele,inx){
						temp.push(ele.toString().replace(",",""))
					})
					return temp
				},
				oneofmust(obj){  //其中一个必填
					for(var item in obj){
						if(obj[item] !== ''){
							return true
						}
					}
				},
				addCommas(nStr){  //每三位分隔符
				     nStr += '';
				     var x = nStr.split('.');
				     var x1 = x[0];
				     var x2 = x.length > 1 ? '.' + x[1] : '';
				     var rgx = /(\d+)(\d{3})/;
				     while (rgx.test(x1)) {
				      x1 = x1.replace(rgx, '$1' + ',' + '$2');
				     }
				     return x1 + x2;
			    },
				generateString(index){
				    return 'li'+index
				},
				addSessionId(obj){ //+sessionId
					var sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
					obj.sessionId  = sessionId
					return obj
				},
				// el-table中时间戳格式化，2018-09-30 12:00:23
				dateTimeFormat(row, column, cellValue, index) {
					const date = row[column.property];
					if (date === undefined) return '';
					return moment(date).format('YYYY-MM-DD HH:mm:ss');
				},
				// el-table中时间戳格式化，2018-09-30
				dateFormat(row, column, cellValue, index) {
					const date = row[column.property];
					if (date === undefined) return '';
					return moment(date).format('YYYY-MM-DD');
				}
			}
		});
		 
		
	}	
}
