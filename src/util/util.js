import axios from 'axios'
import qs from 'qs';
export default{
	install:function(Vue,opt){
		Vue.mixin({
			methods:{
				listQuery:function(url,flag) {  //查询
					var params = this.processParams(flag)//入参
					if(!params){
						return false
					}
					this.$axios.post(url,qs.stringify(params), {
						 headers: {
				            'Content-Type': 'application/x-www-form-urlencoded'
				        }
					}).then(res => {
				        var response = res.data
				        if(response.code == '200'){
				            this.lsstTable = response.data.returnList
				            this.length = response.data.total;
				        }else{
				        	this.resultData = []
                   			this.length = 0
				            this.$message.error({message:response.msg,center: true});
				        }

				    }) 
				},
				processParams:function(flag){   //根据参数，确定查询接口入参
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
							if(!result){
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
							if(!result){
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
							if(!result){
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
								"outBatchNo":params.outBatchNo
							}
							var result = this.oneofmust(validateObj)  //校验结果
							if(!result){
								this.$alert('易宝交易流水号、出款订单号、商户编号、收款账户号、出款批次号必填其中之一', '筛选项必填', {
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
							params = this.form
							params = this.formSenior //////////////问题！！！！！
							params.pageNumber = this.pageNumber
                    		params.pageRow = this.pageRow
							return params
						break;
						
					}
					
					
				},
				atleastOne(){
					// 至少一条数据弹框
					this.$alert('请选择至少一条需要分配的数据', '系统提示', {
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
				blackListTip(value){  //黑名单弹框
			        var self = this
			        if(self.idList.length < 1){
			            this.atleastOne()
			            return false
			        }
			        var text =''
		            if(value){
		                text = '确定加入黑名单吗'
		            }else {
		                 text = '确定从黑名单删除吗'
		            }
			        this.$confirm(text,'提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning',
			          callback:function(item){
			            if(item == 'confirm'){
			                self.blackList(value)
			            }
			            
			          }
			        })
			    },
			    postponeListTip(value,text,url) {//交易资金暂缓弹框 和商户资金暂缓弹框
			    	var self = this
			    	
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
				selectedItems(selection){  //返回表格中选中的行
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
							this.form.product= ''//产品
							this.form.markPerson= ''//标记人
							this.form.No= ''//商户编号
							this.form.name= ''//商户名称
							this.form.mobile= ''//
							this.form.card= ''//
							this.form.orderNo= ''//
							this.form.bankName= ''//
						break;
					}
				},
				allarea(ev){
			      var target = ev.target
			      this.$refs.list.classList.add('none')
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
					// function doHandleMonth(month){    
				           
					// } 
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
				       var targetday_milliseconds=today.getMonth() -1 + m;            
				       today.setMonth(targetday_milliseconds); //注意，这行是关键代码  
				       var tYear = today.getFullYear();    
				       var tMonth = today.getMonth();  
				       var tDate = today.getDate();   
				       tMonth = this.doHandleMonth(tMonth+2);  
				       tDate = this.doHandleMonth(tDate);
				       return {
				       	"tYear":tYear,
				       	"tMonth":tMonth,
				       	"tDate":self.getLastDateOfMonth(tYear,tMonth)
				       }
				       // return tYear+"-"+tMonth 
				},
				oneofmust(obj){  //其中一个必填
					for(var item in obj){
						if(obj[item] !== ''){
							return true
						}
					}
				},
				generateString(index){
				    return 'li'+index
				}
			}
		});
		 
		
	}	
}
