<template>
  <!--商户评级详情-->
  <div style="border: 1px solid #E0E0E0;width:97%;margin:0 auto;margin-top:20px;height:auto;">
      <div class="divHead">
          <span class="rideus"></span>交易详细信息
          <div class="divContent">
              <div class="text">

                <div class="boxOnly" >
                  <div class="labelC">商户编号:</div>
                  <div class="text-box"> 
                    <el-input readonly="readonly" v-model="merchant_id" ></el-input>
                  </div>
                </div>
                
                <div class="boxOnly">
                  <div class="labelC">销售:</div>
                  <div class="text-box"> 
                    <el-input readonly v-model="merchant_saler"></el-input>
                  </div>
                </div>

                <div class="boxOnly">
                  <div class="labelC">商户自然属性二级:</div>
                  <div class="text-box"> 
                    <el-input readonly v-model="mer_secend_property"></el-input>
                  </div>
                </div>

                  <div class="boxOnly">
                    <div class="labelC">价值分级备注:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="value_comments"></el-input>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">循环保证金风险预存期:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">修改原因:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="change_reson"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">减分项:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">日结通状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">联系电话:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">银行卡号:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">是否限额限次特批:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="is_limit_spcl"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                      <div class="labelC">特批次数:</div>
                      <div class="text-box"> 
                        <el-input readonly v-model="spcl_num"></el-input>
                      </div>
                    </div>  
                  </div>

              <div class="text">

                  <div class="boxOnly">
                    <div class="labelC">商户名称:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="merchant_name"></el-input>
                    </div>
                  </div>

                  <!-- 没有 是不是入网时间  net_in_time ？ -->
                  <div class="boxOnly">
                    <div class="labelC">注册日期:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">商户签约类型:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">当前账户余额:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">固定保证金额度:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">行业分类:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">账户状态:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="account_status"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">日截通比例:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">联系手机号:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">生成日期:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">是否保证金特批:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="is_deposit_spcl"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">分公司:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="organization_id"></el-input>
                    </div>
                  </div>  
                </div>
              <div class="text">

                  <div class="boxOnly">
                    <div class="labelC">签约名称:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="merchant_sign_name"></el-input>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">商户绑定手机号:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">审核状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">保证金形式:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">保证金账户余额:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">签约主体:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="sign_primary"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">结算状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">结算风险预存期:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">客服电话:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">支付接口状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">是否入网特批:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="is_net_in_spcl"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">代理商编号:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="agent_id"></el-input>
                    </div>
                  </div>  
                </div>

              <div class="text">

                  <div class="boxOnly">
                    <div class="labelC">接入网址:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="refer"></el-input>
                    </div>
                  </div>

                  <div class="boxOnly">
                    <div class="labelC">商户自然属性一级:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="mer_first_property"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">价值分级:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="value_level"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">循环保证金比例:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">商户类型:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">加分项:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">委托结算状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">委托结算风险预存期:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">地址:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">客户状态:</div>
                    <div class="text-box"> 
                      <el-input readonly></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">是否评级特批:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="is_rate_spcl"></el-input>
                    </div>
                  </div>  

                  <div class="boxOnly">
                    <div class="labelC">代理商名称:</div>
                    <div class="text-box"> 
                      <el-input readonly v-model="agent_name"></el-input>
                    </div>
                  </div>  
                </div>
          </div>
      </div>
      <div class="clerrBoth"></div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
      data() {
        return {
          account_status:'',
          agent_id:'',
          agent_name:'',
          change_reson:'',
          comprehensive_rating:'',
          create_time:'',
          customer_status:'',
          follow_list:'',
          grid_show:'',
          id:'',
          industry_type:'',
          is_deposit_spcl:'',
          is_limit_spcl:'',
          is_net_in_spcl:'',
          is_rate_spcl:'',
          judgment_list:'',
          level:'',
          map:'',
          mer_first_property:'',
          mer_secend_property:'',
          merchant_achievement:'',
          merchant_id:'',
          merchant_name:'',
          merchant_saler:'',
          merchant_sign_name:'',
          mindustry_type:'',
          model_id:'',
          model_name:'',
          modifer:'',
          net_in_time:'',
          organization_id:'',
          pagenum:'',
          payapi_status:'',
          rating_list:'',
          refer:'',
          score:'',
          sign:'',
          sign_primary:'',
          spcl_num:'',
          startnum:'',
          update_time:'',
          value_comments:'',
          value_level:'',
        }
      },
      methods:{
            init(){
             let query = window.location.href.split('?')
             console.log(query[1])
             this.$axios.post('/RateMerchantController/queryMechmangListBymerchant_id',qs.stringify({
                    "sessionId":localStorage.getItem('SID'),
                    "merchant_id":query[1],
                }))
                .then( res => {
                    console.log(res.data)
                    this.account_status = res.data[0].account_status
                    this.agent_id = res.data[0].agent_id
                    this.agent_name = res.data[0].agent_name
                    this.change_reson = res.data[0].change_reson
                    this.comprehensive_rating = res.data[0].comprehensive_rating
                    this.create_time = res.data[0].create_time
                    this.customer_status = res.data[0].customer_status
                    this.follow_list = res.data[0].follow_list
                    this.grid_show = res.data[0].grid_show
                    this.id = res.data[0].id
                    this.industry_type = res.data[0].industry_type
                    this.is_deposit_spcl = res.data[0].is_deposit_spcl
                    this.is_limit_spcl = res.data[0].is_limit_spcl
                    this.is_net_in_spcl = res.data[0].is_net_in_spcl
                    this.is_rate_spcl = res.data[0].is_rate_spcl
                    this.judgment_list = res.data[0].judgment_list
                    this.level = res.data[0].level
                    this.map = res.data[0].map
                    this.mer_first_property = res.data[0].mer_first_property
                    this.mer_secend_property = res.data[0].mer_secend_property
                    this.merchant_achievement = res.data[0].merchant_achievement
                    this.merchant_id = res.data[0].merchant_id
                    this.merchant_name = res.data[0].merchant_name
                    this.merchant_saler = res.data[0].merchant_saler
                    this.merchant_sign_name = res.data[0].merchant_sign_name
                    this.mindustry_type = res.data[0].mindustry_type
                    this.model_id = res.data[0].model_id
                    this.model_name = res.data[0].model_name
                    this.modifer = res.data[0].modifer
                    this.net_in_time = res.data[0].net_in_time
                    this.organization_id = res.data[0].organization_id
                    this.pagenum = res.data[0].pagenum
                    this.payapi_status = res.data[0].payapi_status
                    this.rating_list = res.data[0].rating_list
                    this.refer = res.data[0].refer
                    this.score = res.data[0].score
                    this.sign = res.data[0].sign
                    this.sign_primary = res.data[0].sign_primary
                    this.spcl_num = res.data[0].spcl_num
                    this.startnum = res.data[0].startnum
                    this.update_time = res.data[0].update_time
                    this.value_comments = res.data[0].value_comments
                    this.value_level = res.data[0].value_level
                })
                .catch( error => {
                    console.log(error)
                })
            }
      },
      mounted(){
            this.init()
      },
    }
</script>
<style>
.clerrBoth{
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
.divContent{
  width:98%;
  overflow: hidden;
  margin-top:20px;
  margin-bottom:30px;
  height:100%;
  /* border: 1px solid #E0E0E0; */
  /* padding: 30px 20px 30px 20px; */
  padding-top: 15px;
}
.text{
  width:24%;
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
  width: 50%;
}
.boxOnly{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 40px;
}
/* .boxOnly input{
  border: none; 
}  */
</style>
