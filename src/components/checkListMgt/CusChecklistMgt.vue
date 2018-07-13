<!--商户核查单管理-->
<template>
    <div>
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="134px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="jyStartTime">
                                    <el-date-picker  v-model="form.jyStartTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="jyEndTime">
                                    <el-date-picker  v-model="form.jyEndTime" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="yewuLine">
                                     <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="product">
                                    <el-input v-model="form.xxx" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="核查单号:" prop="merchantCode">
                                    <el-input v-model="form.merchantCode" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险定性:" prop="outbound">
                                    <el-select v-model="form.outbound" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="未定性" value="wdx"></el-option>
                                        <el-option label="确认有风险" value="yfx"></el-option>
                                        <el-option label="确认无风险" value="wfx"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="风险级别:" prop="ff">
                                    <el-select v-model="form.fxjb" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in fxjbArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="处理状态:" prop="dd">
                                    <el-select v-model="form.clzt" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in clztArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险处理:" prop="ww">
                                    <el-select v-model="form.fxcl" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in fxclArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            
                        </el-form>
                    </div>
                    <div class="rightContent">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" @click='listQuery("/riskgod/union/epos/getAll","cuscheck")'>查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheck")'>重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="seniorSearch">
            <div class="title">
                <i class="el-icon-arrow-down toggleIcon" @click="seniorSearchToggle = !seniorSearchToggle"></i>
                <span>高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent activeToggle" v-show="seniorSearchToggle"> 
                    <div class="leftContent" >
                        <el-form ref="formSenior" :model="formSenior" label-width="134px" :rules="rules" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户自然属性一级:" prop="dddd">
                                    <el-select v-model="form.dddd" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in zrsxyjArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="销售:">
                                    <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:">
                                    <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户业绩属性:" prop="hhhh">
                                    <el-select v-model="form.hhhh" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in yjsxArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商编号:">
                                    <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:">
                                    <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="核查单来源:" prop="personnel">
                                    <el-select v-model="form.personnel" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in hcdlyArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="触发规则:">
                                    <el-input v-model="form.MerchantsOrder" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1">
                        <el-button type="primary" class="serchbtn" icon="el-icon-search" style="margin-top: 17px;">查询</el-button>
                        <el-button type="primary" class="serchbtn" icon="el-icon-refresh">重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            
            <div class="onf"><span>视图切换:</span></div><div class="lsst" id="stIcon" @click="toggleSt"></div>
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" title="创建" @click="createformElementVisible = true">
                            <div class="cj"></div>
                        </div>
                        <div class="BotoomBtn" title="导入" @click="importe = true">
                            <div class="dr"></div>
                        </div>
                        <div class="BotoomBtn" title="派发" @click="dispatchformElementVisible = true">
                            <div class="pf"></div>
                        </div>
                         <div class="BotoomBtn" title="处理" @click="processElementVisible = true">
                            <div class="cl"></div>
                        </div>
                        <div class="BotoomBtn" title="审核" @click="auditformElementVisible = true">
                            <div class="sh"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" title="下载" @click="dispatchformElementVisible = true">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <el-table
                    :data="lsstTable"
                    border
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="核查单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户入网时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="b11"
                        label="分公司"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-table
                    @selection-change="selectedItems"
                    :data="ztstTable"
                    @setCurrentRow="setCurrentRow"
                    border
                    style="width: 100%"
                    v-if="ztstShow">
                     <el-table-column
                        type="expand"
                        width="50" class="kkkkk">
                        <template slot-scope="props">
                            
                            <ul class="ztstlist">

                                <li class="clear" v-for="item in props.row.children">
                                    <span class="checkbox">
                                         <el-checkbox v-model="item.now" size="14px"></el-checkbox>
                                    </span>
                                    <span class="text">{{item.channel}}通道编码通道编码通道编码通道编码通道编码通道编码</span>
                                    <span class="text">{{item.time}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.time}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.time}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.time}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.time}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.channel}}</span>
                                    <span class="text">{{item.channel}}</span>
                                </li>
                            </ul>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        width="50" >
                    </el-table-column>
                    <el-table-column
                        prop="channel"
                        label="核查单号"
                        width="150" >
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="商户入网时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardHolderName"
                        label="商户业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="cardHolderName"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="分公司"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        label="商户自然属性一级"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        label="商户自然属性二级"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        label="触发规则"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        label="风险级别"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="风险定性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="处理状态"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="风险处理"
                        width="150">
                    </el-table-column>

                    <el-table-column
                        prop="name"
                        label="核查单来源"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="核查单类型"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="最后操作人"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="最后操作时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="备注"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                        prop="children"
                        label="隐藏"
                        width="" 
                        v-if="ztstShowSec">
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange" v-model="currenteveryno" style="width: 25%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="prev, pager, next"
                    :page-sizes="[10,20,30,40,50]"
                    :page-size="10"
                    :total="length"
                    @current-change="handleCurrentChange">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <el-dialog title="从Excel导入到黑名单" :visible.sync="importe" width="570px">
            <div>
                本地文件：<el-input placeholder="点击帮助以查看具体格式要求" class="listValInp"></el-input>
                <form enctype="multipart/form-data" id="formsubmit">
                   <input  class="formIpt" type="file" id="filename" name="filename" @change='fileData'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" style="float:left;" @click="downloadModel">下载模板</el-button>
              <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
              <el-button type="primary" @click="upload">确 定</el-button>
              <el-button @click="importeBtn">取 消</el-button>
            </span>
              <!-- 帮助信息提示弹框 -->
              <el-dialog width="700px" title="导入的文件格式要求" :visible.sync="innerVisible" append-to-body>
                  <table class="importData tl ml20">
                      <thead>
                          <tr>
                              <th width="160">字段名</th>
                              <th width="160">字段格式要求</th>
                          </tr>
                      </thead>
                      <tr>
                          <th width="160">商户编号<i style="color:red;">(必填项)</i></th>
                          <td width="160">数字</td>
                      </tr>
                       
                      <tr>
                          <th width="160">核查单来源<i style="color:red;">(必填项)</i></th>
                          <td width="160">投诉、举报</td>
                      </tr>
                       <tr>
                          <th width="160">备注</th>
                          <td width="160">字数不能多于100个字</td>
                      </tr>
                  </table>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">已了解</el-button>
                  </span>
              </el-dialog>
        </el-dialog>
         
        <!-- 创建弹框 -->
        <el-dialog title="" :visible.sync="createformElementVisible" width="600px">  
          <el-form :model="createform" :rules="rules" ref="createformElement">
            <el-form-item label="商户编号" :label-width="formLabelWidth" prop="no">
              <el-input v-model="createform.no" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="核查单类型" :label-width="formLabelWidth" prop="region">
              <el-select v-model="createform.region">
                 <el-option
                    v-for="item in checkListtype"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
                 
              </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="createform.label" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="createformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='submitForm("createformElement",createform,"createformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 派发弹框 -->
        <el-dialog title="" :visible.sync="dispatchformElementVisible" width="600px">  
          <el-form :model="dispatchform" :rules="rules" ref="dispatchformElement">
            <el-form-item label="派发至" :label-width="formLabelWidth" prop="dispatchto">
              <el-select v-model="dispatchform.dispatchto" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in dispatchformArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="dispatchform.label" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dispatchformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='submitForm("dispatchformElement",dispatchform,"dispatchformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 商户核查单  处理弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible"  width="700px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <el-form-item label="风险定性:" :label-width="formLabelWidth" prop="riskType">
                <el-select v-model="processform.riskType" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in riskTypeArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="风险处理:" :label-width="formLabelWidth" prop="riskProcess">
              <el-select v-model="processform.riskProcess" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in riskProccssformArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则免疫周期:" :label-width="formLabelWidth">
                <el-date-picker  v-model="processform.start" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                <el-date-picker  v-model="processform.end" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
            </el-form-item>
                             
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.label" length="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='submitForm("processElement",processform,"processElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 审核弹框 -->
        <el-dialog title="" :visible.sync="auditformElementVisible" width="600px">  
          <el-form :model="auditform" :rules="rules" ref="auditformElement">
            <el-form-item label="审核结果:" :label-width="formLabelWidth" prop="auditresult">
              <el-select v-model="auditform.auditresult" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核拒绝" value="0"></el-option>
                </el-select>
            </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 start 额外做了判空 -->
                <el-form-item label="审核意见:(审核拒绝时必填)" :label-width="formLabelWidth" :prop="isneed" >
                  <el-input v-model="auditform.auditSuggestion" length="100" placeholder="请输入审核意见" auto-complete="off"></el-input>
                </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 end-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isdisable" @click='submitForm("auditformElement",auditform,"auditformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    computed:{
        isneed:function(){
            return this.auditform.auditresult == 0 ? 'auditSuggestion' : ''
        },
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditresult == 0 &&  this.auditform.auditSuggestion == '' ? true : false
        },
    },
  data(){
      return{
            currenteveryno:"10",
            processElementVisible:false,//处理弹框显示与隐藏
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            createformElementVisible:false,//创建核查单弹框显示与隐藏
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            formLabelWidth: '120px',
            importe:false,
            innerVisible:false,
            uploadDataF:'',
            uploadDataS:'',
            fileData:'',//本地文件：
            seniorSearchToggle:false,
            serchToggle:true,
            ztstShow:false,
            ztstShowSec:false,
            lsstShow:true,
            lsstTable:[{
              b11:'b11',
            }],
            
            ztstTable:[{
                "id":"222",
                "No":"222",//商户编号
                "select":true,
                "name":"商户名称",//商户名称
                "yeepayNo":"yeepayNo",
                "time":"time",
                "money":"money",
                "status":"交易状态",
                "channel":"通道编码通道编码通道编码通道编码通道编码通道编码",
                "bankName":"中国银行",
                "cardNo":"622848059****843811",
                "saleName":"saleName",
                "cardHolderName":"二月红",
                "cardHolderMobile":"cardHolderMobile",
                "cardHolderId":"cardHolderId",
                "reservationsMobile":"reservationsMobile",
                "passengerMobile":"passengerMobile",
                "passengerId":"passengerId",
                "contactMobile":"contactMobile",
                "hasSendCode":"hasSendCode",
                "terminal":"terminal",
                "faileReason":"faileReason",
                "isCardholderPassenger":"isCardholderPassenger",
                "member":"member",
                "children":[
                    {
                        "now":false,
                        "id":"322",
                        "No":"322",//商户编号
                        "name":"商户名称",//商户名称
                        "yeepayNo":"yeepayNo",
                        "time":"time",
                        "money":"money",
                        "status":"交易状态",
                        "channel":"通道编码",
                        "bankName":"中国银行",
                        "cardNo":"622848059****843811",
                        "saleName":"saleName",
                        "cardHolderName":"二月红",
                        "cardHolderMobile":"cardHolderMobile",
                        "cardHolderId":"cardHolderId",
                        "reservationsMobile":"reservationsMobile",
                        "passengerMobile":"passengerMobile",
                        "passengerId":"passengerId",
                        "contactMobile":"contactMobile",
                        "hasSendCode":"hasSendCode",
                        "terminal":"terminal",
                        "faileReason":"faileReason",
                        "isCardholderPassenger":"isCardholderPassenger",
                        "member":"member"
                  }
                ]
            },{
                "id":"333",
                "No":"222",//商户编号
                "name":"商户名称",//商户名称
                "yeepayNo":"yeepayNo",
                "time":"time",
                "money":"money",
                "status":"交易状态",
                "channel":"通道编码",
                "bankName":"中国银行",
                "cardNo":"622848059****843811",
                "saleName":"saleName",
                "cardHolderName":"二月红",
                "cardHolderMobile":"cardHolderMobile",
                "cardHolderId":"cardHolderId",
                "reservationsMobile":"reservationsMobile",
                "passengerMobile":"passengerMobile",
                "passengerId":"passengerId",
                "contactMobile":"contactMobile",
                "hasSendCode":"hasSendCode",
                "terminal":"terminal",
                "faileReason":"faileReason",
                "isCardholderPassenger":"isCardholderPassenger",
                "member":"member"
          }],
          form:{
            jyStartTime:'',
            jyEndTime:'',
            yewuLine:'',
            ccStartTime:'',
            ccEndTime:'',
            product:'',
            merchantCode:'',
            humNumber:'',
            creditCardNumbers:'',
            MerchantsOrder:'',
            outbound:'all',
            fxjb:"all",
            clzt:"all",
            fxcl:"all",
            dddd:'all',
            hhhh:'all',
            personnel:'all'
          },
          formSenior:{
            jyStartTime:'',
            jyEndTime:'',
            yewuLine:'',
            ccStartTime:'',
            ccEndTime:'',
            product:'',
            merchantCode:'',
            humNumber:'',
            creditCardNumbers:'',
            MerchantsOrder:'',
            outbound:'',
            personnel:'all',
          },
           createform:{  //创建商户核查单
             no:'',
             region:'请选择',
             label:''
           },
           dispatchform:{  //派发商户核查单
             dispatchto:'', 
             label:''
           },
           processform:{  //处理商户核查单
             riskType:'', 
             riskProcess:'',
             start:'',
             end:'',
             label:''
          },
          auditform:{
            auditresult:'',
            auditSuggestion:''
          },
          checkListtype:[],//核查单类型
          fxjbArray:[],//风险级别
          clztArray:[],//处理状态
          fxclArray:[],//风险处理
          zrsxyjArray:[],//商户自然属性一级
          yjsxArray:[],//商户业绩属性
          hcdlyArray:[],//核查单来源
          dispatchformArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//派发到哪哪
          riskTypeArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//风险定性
          riskProccssformArray:[{'label':'哈哈','value':'2'},{'label':'哈哈2','value':'0'}],//风险处理
          rules:{
            no: [
                {required: true, message: '请输入商户编号', trigger: 'blur'}
            ],
            region:[
                {required: true, message: '请选择核查单类型', trigger: 'change'}
            ],
            dispatchto:[
                {required: true, message: '请选择派发地', trigger: 'blur'}
            ],
            riskType:[
                {required: true, message: '请选择风险定性', trigger: 'change'}
            ],
            riskProcess:[
                {required: true, message: '请选择风险处理', trigger: 'change'}
            ],
            auditresult:[
                {required: true, message: '请选择审核结果', trigger: 'change'}
            ],
            auditSuggestion:[
                {required: true, message: ' ', trigger: 'blur'}
            ]
          },
          currentPage:1,// 分页
          pageNumber:1,
          pageRow:20,
          length:0    
      }
  },
  methods:{
    currentcol(row){
        alert(row)
    },
    handleSizeChange() {  //更改页数
        this.pageRow = this.currenteveryno
        this.listQuery("/riskgod/merchant/checklist/getAll","cuscheck")
    },
    handleCurrentChange(val) {  //处理当前页
         this.pageNumber = `${val}`  //当前页
         this.listQuery("/riskgod/merchant/checklist/getAll","cuscheck")
    },
    submitForm(formName,params,hiddenElement){
        /*
            formName: 表单id  string
            params: 传入参数  {}
            hiddenElement: 控制表单显示的数据  string
        */
        this.$refs[formName].validate((valid) => {
            if(valid){
                this[hiddenElement] = false 
                this.$axios.post('/riskgod/union/noepos/getParam',params).then(res => {
                    var response = res.data
                    if(response.code == '200'){
                    }else{
                        this.$message.error({message:response.msg,center: true});
                    }
                }) 
            }
        })
    },
      toggleSt(){
          var onOff = document.getElementById("stIcon");
          if(onOff.className == "lsst"){
              onOff.classList.remove("lsst")
              this.lsstShow = false;
              onOff.classList.add("ztst")
              this.ztstShow = true;
          }else if(onOff.className == "ztst"){
              onOff.classList.remove("ztst")
              this.ztstShow = false;
              onOff.classList.add("lsst")
              this.lsstShow = true;
          }
      },
      toggleOnOff(){
          var onOff = document.getElementById("onOff");
          if(onOff.className == "onOff"){
              onOff.classList.remove("onOff")
              onOff.classList.add("offOn")
          }else{
              onOff.classList.remove("offOn")
              onOff.classList.add("onOff")
          }
      },
      importeBtn(){  //点击取消
        this.importe = false
        this.fileData = ''
        this.file = ''        
      },
       downloadModel(){  //下载模版
        window.location=encodeURI("http://172.19.40.127:8080/BusinessSys/RateMerchantBatchUpdateController/exportMerchantModel")
      },
      fileChange(e){  //上传文件
        console.log(e.target.files[0])
        this.file = e.target.files[0]
        this.fileData = e.target.files[0].name
      },
      upload(){  //点击上传
          let formData = new FormData()
          formData.append('file',this.file)
          this.$axios.post('/RateMerchantBatchUpdateController/batchUpdateMerchant',formData)
          .then(res => {
            this.uploadDataF = res.data.fail_count
            this.uploadDataS = res.data.success_count
            this.errorData = res.data.fail_download_url

            if(this.file  == ''){
              this.$alert('不能上传空文件', '系统提示', {
                confirmButtonText: '确定',
              });
              return
            }
            if(this.uploadDataF == 0 ){
              this.$alert('上传成功', '系统提示', {
                confirmButtonText: '确定',
              });
              this.importe = false
              this.fileData = ''
              this.file = ''        
            }else{
              this.innerVisible = true
              this.fileData = ''
              this.file = ''        
            }
        })
        .catch(error => {
            console.log(error)
        })
      },
  },
}
</script>
<style lang="less" scoped>
.ztstlist{
    margin-top: -20px;
    .checkbox{
        padding:12px 20px 12px 14px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
         float: left;
    }
    .text{
        width:129px;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding:12px 10px;
        float: left;
        white-space:nowrap;
        overflow:hidden;
        -o-text-overflow:ellipsis;
        text-overflow:ellipsis;
    }
}
.checkbox{padding:12px 14px;}
.importData{line-height: 30px;}
.listValInp{width: 60%;height: 36px;}
.formIpt{
    padding: 0;
    width: 73px;
    height: 31px;
    float: right;
    margin-top: -37px;
    border: 0px;
}
.onf{
    display: inline;
    margin-left: 45px;
    font-size: 14px;
    color: #606266;
}
.lsst{
    margin-top: 15px;
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/lsst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
}
.ztst{
    margin-top: 15px;
    width: 84px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/ztst.png) no-repeat ;
    display: inline-block;
    margin-left: 15px;
}
.onOff{
    margin-top: 15px;
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/on.png) no-repeat;
     display: inline-block;
    margin-left: 15px;
}
.offOn{
    margin-top: 15px;
    width: 50px;
    height: 26px;
    cursor: pointer;
    background: url(../../images/off.png) no-repeat; 
    display: inline-block;
    margin-left: 15px;
}
.tableData{
    width: 100%;
    height: auto;
    border-top: 1px solid #E0E0E0;
}
.clear{
    clear: both;
}
.title{
    height: 50px;
    line-height: 50px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
}
.searchContentgray,.seniorSearchContent{
    height: auto;
    /* line-height: 76px; */
    padding-left: 3%;
    padding-top: 20px;
    -webkit-transition: all 1s;
    transition: all 1s;
}
.leftContent{
    width: 80%;
    height: auto;
    display: inline-block;
}

.rightContent1{
    color:white;
    display: inline-block;
    vertical-align: top;
    margin-top:20px;
    /*width: 18%;
    height: 118px;
    float: right;*/
}
.formConClass{
    display: inline-block;
    width: 32%;
}
.serchbtn{
    width: 100px;
    height:36px;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-left: 30%;
    display: block;
}
.contentBotoom {
    height: 60px;
    font-size: 13px;
    padding-top: 20px;
    margin-left: 45px;
}
.BotoomBtn {
    width: 44px;
    height: 30px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    float: left;
    cursor: pointer;
}
  .BotoomBtn:hover {
    background-color: #38e139;
  }
.leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
}
.rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}


.serch{
    float: right;
    width: 18%;
}
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.fontC{
    color: #3DC6B2;
    cursor: pointer;
    line-height: 17px;
  }
</style>
