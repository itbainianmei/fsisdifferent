<template>
  <!--线上核查单详情-->
  <div>
    <div class="htmlHead">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>核查单管理平台</el-breadcrumb-item>
        <el-breadcrumb-item>线下核查单详情</el-breadcrumb-item>
        <el-breadcrumb-item>商户风险管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <div class="btnBoxClass leftBtn">
           <el-button type="primary" round class="rightBtn" style="margin-right:10px;">交易信息</el-button>
      </div> -->
      <div class="clearBox"></div>
    </div>

    <div style="border: 1px solid #E0E0E0;width:97%;margin:20px auto 20px;height:auto;">
      <div class="leftContent">
          <div v-if="merchantsPortrait">
              <div class="divHead">
                  <span class="rideus"></span>核查单信息
                  <div class="divContent" style="border:0;">
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/fxsl.png" alt="">
                            <span class="spanTitlt">风险数量</span>
                            <h3>10</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/fxje.png" alt="">
                            <span class="spanTitlt">风险金额</span>
                            <h3>10000</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/ylxcsl.png" alt="">
                            <span class="spanTitlt">银联协查数量</span>
                            <h3>10000</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);">
                            <img src="../../images/gaxcsl.png" alt="">
                            <span class="spanTitlt">公安协查数量</span>
                            <h3>0</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/ddcs.png" alt="">
                            <span class="spanTitlt">调单次数</span>
                            <h3>1000</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/dqzhje.png" alt="">
                            <span class="spanTitlt">当前暂缓金额</span>
                            <h3>10000</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);">
                            <img src="../../images/ljzhje.png" alt="">
                            <span class="spanTitlt">累计暂缓金额</span>
                            <h3>99</h3>
                        </div>
                  </div>
              </div>
              <hr class="hr">
              <div class="divHead">
                  <span class="rideus"></span>过去24小时交易信息
                  <div class="divContent" style="border:0;">
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/jyzje.png" alt="">
                            <span class="spanTitlt">交易总金额</span>
                            <h3>99</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/sbbs.png" alt="">
                            <span class="spanTitlt">失败笔数</span>
                            <h3>99</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/gwfhm.png" alt="">
                            <span class="spanTitlt">高危返回码</span>
                            <h3>99</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);">
                            <img src="../../images/jyzbs.png" alt="">
                            <span class="spanTitlt">交易总笔数</span>
                            <h3>99</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);border-right: 1px solid #d4d4d4;">
                            <img src="../../images/cxbs.png" alt="">
                            <span class="spanTitlt">撤销笔数</span>
                            <h3>99</h3>
                        </div>
                        <div class="text"  style="width:24%;height:100px;background-color:rgb(245, 246, 250);">
                            <img src="../../images/yqsqbs.png" alt="">
                            <span class="spanTitlt">预期授权笔数</span>
                            <h3>99</h3>
                        </div>
                  </div>
              </div>
              <hr class="hr">
              <div class="divHead">
                  <span class="rideus"></span>基本信息
                  <div class="divContent">
                    <div class="text"  style="width:25%">
                        <div class="boxOnly" >
                            <div class="labelC textborder">商户编号:</div>
                            <div class="text-box">
                            <span>{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">银联MCC:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">终端数量:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">联系人:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">商户自然属性二级:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:25%">
                        <div class="boxOnly" >
                            <div class="labelC textborder">商户签约名称:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">银联行业分类:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">商户状态:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">联系电话:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">开户行:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:25%">
                        <div class="boxOnly" >
                            <div class="labelC textborder">法人姓名:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">分公司:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">结算账户名:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}
                            </span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">入网时间:</div>
                            <div class="text-box">
                            <span  >{{ceshi}}
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="text"  style="width:25%">
                        <div class="boxOnly" >
                            <div class="labelC textborder">法人证件号:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">销售:</div>
                            <div class="text-box">
                            <span >{{ceshi}}</span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">结算账号:</div>
                            <div class="text-box">
                            <span  >{{ceshi}} </span>
                            </div>
                        </div>
                        <div class="boxOnly" >
                            <div class="labelC textborder">商户自然属性一级:</div>
                            <div class="text-box">
                            <span  >{{ceshi}} </span>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
              <hr class="hr">
              <div class="divHead" style="height:580px;">
                  <div class="fl" style="width:48%;height:500px;">
                    <span class="rideus"></span>管控信息
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="fl" style="width:49%;height:500px;margin-left:20px;">
                    <span class="rideus"></span>风险类型信息
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="clearBox"></div>
              </div>
          </div>
          <div v-if="dataAnalysis">
              <div class="divHead">
                  <span class="rideus"></span>核查单总势
                  <div class="divContent" style="height:550px;">

                  </div>
              </div>
              <div class="divHead" style="height:580px;">
                  <div class="fl" style="width:48%;height:500px;">
                    <span class="rideus"></span>交易金额总量走势
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="fl" style="width:49%;height:500px;margin-left:20px;">
                    <span class="rideus"></span>日笔均交易金额走势
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="clearBox"></div>
              </div>
              <hr class="hr">
              <div class="divHead" style="height:580px;">
                  <div class="fl" style="width:48%;height:500px;">
                    <span class="rideus"></span>规则有效率
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="fl" style="width:49%;height:500px;margin-left:20px;">
                    <span class="rideus"></span>规则触发率
                    <div class="divContent" >
                    </div>
                  </div>
                  <div class="clearBox"></div>
              </div>
              <hr class="hr">

          </div>
          <div v-if="riskStatistics">
              <div class="divHead">
                  <span class="rideus"></span>查询条件
                  <div class="divContent" style="border:0;">
                      <div class="inlineBox"><span>开始时间：</span><el-date-picker type="datetime" placeholder="选择日期时间" style="width:65%;" :clearable="false" :editable="false"></el-date-picker></div>
                      <div class="inlineBox"><span>结束时间：</span><el-date-picker type="datetime" placeholder="选择日期时间" style="width:65%;" :clearable="false" :editable="false"></el-date-picker></div>
                      <div class="inlineBox"><span>卡类型：</span>  <el-input placeholder="请输入内容" style="width:73%"></el-input></div>
                      <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 40px;width: 100px;height: 35px;" ></el-button>
                  </div>
                  <el-table
                  :data="tableData"
                  border
                  style="width: 98%">
                  <el-table-column
                    prop=""
                    label="商户订单号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="商户号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="商户名称">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="业务产品">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="银行卡号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="身份证号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="交易金额（元）">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="交易IP">
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="sizes, prev, pager, next"
                  :total="100">
                </el-pagination>
              </div>
          </div>
          <div v-if="listDetails">
              <div class="divHead">
                  <span class="rideus"></span>查询条件
                  <div class="inlineBox" style="margin-left:40px;">
                        <span>案件类型</span>
                        <el-select  style="width:70%" v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                   </div>
                  <div class="divContent" style="border:0;">

                        <div style="width:98%;">
                            <div class="inlineBox"><span>开始时间：</span><el-date-picker type="datetime" placeholder="选择日期时间" style="width:70%" :clearable="false" :editable="false"></el-date-picker></div>
                            <div class="inlineBox"><span>结束时间：</span><el-date-picker type="datetime" placeholder="选择日期时间" style="width:70%" :clearable="false" :editable="false"></el-date-picker></div>
                            <div class="inlineBox">
                                <span>核查状态：</span>
                                <el-select  style="width:70%" v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 40px;width: 100px;height: 35px;" ></el-button>
                        </div>

                        <div style="width:98%;margin-top:20px;">
                            <div class="inlineBox">
                                <span>风险类型:</span>
                                <el-select style="width:70%;"  v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inlineBox">
                                <span>风险等级：</span>
                                <el-select  style="width:70%;" v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="inlineBox">
                                <span>风险定性：</span>
                                <el-select  style="width:70%;" v-model="value" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button type="primary" class="iconStyle" icon="el-icon-refresh" style="margin-left: 40px;width: 100px;height: 35px;" ></el-button>
                        </div>

                  </div>
                <el-table
                  :data="tableData"
                  border
                  style="width: 98%">
                  <el-table-column
                    prop=""
                    label="商户订单号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="商户号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="商户名称">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="业务产品">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="银行卡号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="手机号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="身份证号">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="交易金额（元）">
                  </el-table-column>
                  <el-table-column
                    prop=""
                    label="交易IP">
                  </el-table-column>
                </el-table>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="sizes, prev, pager, next"
                  :total="100">
                </el-pagination>
              </div>
          </div>
      </div>


      <div class="rightContent">
        <div class="tabDiv"  @click="PortraitBtn">
            <span>商</span>
            <span>户</span>
            <span>画</span>
            <span>像</span>
        </div>
        <div class="tabDiv" @click="AnalysisBtn">
            <span>数</span>
            <span>据</span>
            <span>分</span>
            <span>析</span>
        </div>
        <div class="tabDiv" @click="StatisticsBtn">
            <span>风</span>
            <span>险</span>
            <span>卡</span>
            <span>统</span>
            <span>计</span>
        </div>
        <div class="tabDiv" @click="listDetailsBtn">
            <span>核</span>
            <span>查</span>
            <span>单</span>
            <span>明</span>
            <span>细</span>
        </div>
      </div>
      <div class="clearBox"></div>



    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
      data() {
        return {
            listDetails:false,
            riskStatistics:false,
            dataAnalysis:false,
            merchantsPortrait:true,
            textarea:'',
            tableData:[],
            tableData2:[],
            ceshi:'测试数据测试数据',
            options:[{
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }],
            merchantsState:'',
            value:'',

        }
      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        listDetailsBtn(){
          this.listDetails = true;
          this.riskStatistics = false;
          this.dataAnalysis = false;
          this.merchantsPortrait = false;
        },
        StatisticsBtn(){
          this.riskStatistics = true;
          this.dataAnalysis = false;
          this.merchantsPortrait = false;
          this.listDetails = false;
        },
        PortraitBtn(){
          this.merchantsPortrait = true;
          this.dataAnalysis = false;
          this.listDetails = false;
          this.riskStatistics = false;
        },
        AnalysisBtn(){
          this.dataAnalysis = true;
          this.merchantsPortrait = false;
          this.listDetails = false;
          this.riskStatistics = false;
        },
      },
      mounted(){

},
    }
</script>
<style scoped>
.text-box span{
    font-size: 13px;
    text-align: left;
    color: #333;
}
.inlineBox{
  width: 25%;
  display: inline-block;
  margin-left: 15px;
}
.inlineBox span{
    font-size: 14px;
}
.leftContent{
    width:97%;
    float: left;
    border-right: 1px solid #E0E0E0;
}
.rightContent{
    width:27px;
    height: 100%;
    float: right;
}
.text h3{
    display: inline-block;
    margin-top: 48px;
    font-size: 22px;
    position: absolute;
    left: 109px;
}
.text .spanTitlt{
    position: absolute;
    font-size: 13px;
    left: 110px;
    top: 30px;
}
.text img{
    float: left;
    margin-top: 27px;
    margin-left: 42px;
}
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
  margin-bottom:20px;
  position: relative;
}
.text-box{
  margin-left: 13px;
  float: left;
}
.labelC{
  float: left;
  font-size: 13px;
  width: 40%;
  color: rgb(142, 142, 142)
}
.boxOnly{
    display: block;
    width: 100%;
    height: 20px;
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
.tabDiv{
    cursor: pointer;
    margin-top: 20px;
    height: 140px;
}
</style>
