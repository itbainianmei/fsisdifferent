<!--商户核查单管理-->
<template>
    <div id="cuschecklist" @click="allarea($event)">
        <div class="searchBasic">
            <div class="title" >
                <i class="el-icon-arrow-down toggleIcon" @click="serchToggle = !serchToggle"></i>
                <span>基础查询</span>
            </div>
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray" v-show="serchToggle">
                    <div class="leftContent" >
                        <el-form ref="form" :model="form" label-width="100px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"
                                        type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                     <el-input v-model="form.merchantNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="merchantContractName">
                                    <el-input v-model="form.merchantContractName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="核查单号:" prop="checkList">
                                    <el-input v-model="form.checkList" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险定性:" prop="riskQualitativeAnalysis">
                                    <el-select v-model="form.riskQualitativeAnalysis" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option label="未定性" value="未定性"></el-option>
                                        <el-option label="确认有风险" value="确认有风险"></el-option>
                                        <el-option label="确认无风险" value="确认无风险"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="风险级别:" prop="riskLevel">
                                    <el-select v-model="form.riskLevel" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                                <el-form-item label="处理状态:" prop="dealStatus">
                                    <el-select v-model="form.dealStatus" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                                <el-form-item label="风险处理:" prop="riskDeal">
                                    <el-select v-model="form.riskDeal" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                    <div class="rightContent" v-show="!seniorSearchToggle">
                        <el-button type="primary" v-if="lsstShow && authsearch1" class="serchbtn" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                         <el-button type="primary" v-if="ztstShow && authsearch1" class="serchbtn" icon="el-icon-search" @click='mainQuery'>查询</el-button>
                        <el-button type="primary" v-show="authreset" class="serchbtn" icon="el-icon-refresh" @click='reset("cuscheck")'>重置</el-button>
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
                        <el-form ref="formSenior" :model="formSenior" label-width="144px"  class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="商户自然属性一级:" prop="naturalPropertyOne">
                                    <el-select v-model="formSenior.naturalPropertyOne" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in onepropertySelect"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="销售:" prop="sale">
                                    <el-input v-model="formSenior.sale" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="subCompany">
                                    <el-input v-model="formSenior.subCompany" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户业绩属性:" prop="achievementProperty">
                                    <el-select v-model="formSenior.achievementProperty" placeholder="请选择" style="width: 90%;max-width:225px;">
                                        <el-option label="全部" value="all"></el-option>
                                        <el-option
                                            v-for="item in worktypeArray"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentNo">
                                    <el-input v-model="formSenior.agentNo" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentName">
                                    <el-input v-model="formSenior.agentName" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="核查单来源:" prop="checkListSource">
                                    <el-select v-model="formSenior.checkListSource" placeholder="请选择" style="width: 90%;max-width:225px;">
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
                                <el-form-item label="触发规则:" prop="triggerRules">
                                    <el-input v-model="formSenior.triggerRules" placeholder="请输入" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1" >
                            <el-button type="primary" v-if="lsstShow && authsearch2" class="serchbtn" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                         <el-button type="primary" v-if="ztstShow && authsearch2" class="serchbtn" icon="el-icon-search" @click='mainQuery'>查询</el-button>
                           <!-- <el-button type="primary"  class="serchbtn" icon="el-icon-search" @click='mainQuery'>查询</el-button> -->
                        <el-button type="primary" class="serchbtn" v-show="authreset" icon="el-icon-refresh">重置</el-button>
                    </div>
                </div>
            </el-collapse-transition>
        </div>
        <div class="tableData">
            <div class="onf" v-show="liushui"><span>视图切换:</span></div><div class="lsst" id="stIcon" v-show="liushui" @click="toggleSt"></div>
            <div class="contentBotoom clear">
                <div class="button fl">
                    <div class="leftButton clear ">
                        <div class="BotoomBtn leftRadius" v-show="ahthcj" title="创建" @click="cj">
                            <div class="cj"></div>
                        </div>
                        <div class="BotoomBtn" title="导入" v-show="ahthdr" @click="importe = true">
                            <div class="dr"></div>
                        </div>
                        <div class="BotoomBtn" v-show="ahthpf"  title="派发" @click="pf">
                            <div class="pf"></div>
                        </div>
                         <div class="BotoomBtn" v-show="ahthcl"  title="处理" @click="cl">
                            <div class="cl"></div>
                        </div>
                        <div class="BotoomBtn" v-show="ahthsh"  title="审核" @click="sh">
                            <div class="sh"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="ahthdown"  title="下载" @click="downList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <!-- 流水视图 -->
                <el-table
                    v-loading="loading"
                    fixed 
                    max-height="600"
                    @selection-change="selectedItemsid"
                    :data="lsstTable"
                    border
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%"
                    v-if="lsstShow"
                    >
                    <el-table-column
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.checkList[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkList"
                        label="核查单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNetTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.achievementProperty[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="商户业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantName"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantContractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.sale[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.subCompany[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.naturalPropertyOne[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyOne"
                        label="商户自然属性一级"
                        width="180">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.naturalPropertyTwo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyTwo"
                        label="商户自然属性二级"
                        width="180">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.time[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.triggerRules[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="triggerRules"
                        label="触发规则"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="riskLevel"
                        label="风险级别"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.riskQualitativeAnalysis[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskQualitativeAnalysis"
                        label="风险定性"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                    v-if="tableDataSec0.dealStatus[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="dealStatus"
                        label="处理状态"
                        width="150">
                    </el-table-column> 
                   <!-- //// -->
                    <el-table-column
                    v-if="tableDataSec0.auditOpinion[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="auditOpinion"
                        label="审核意见"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.riskDeal[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.checkListSource[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListSource"
                        label="核查单来源"
                        width="150">
                    </el-table-column>
                    <!--  <el-table-column
                     v-if="tableDataSec0.checkListType[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListType"
                        label="核查单类型"
                        width="150">
                    </el-table-column> -->
                     <el-table-column
                     v-if="tableDataSec0.lastModifiedBy[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedBy"
                        label="最后操作人"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec0.lastModifiedTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedTime"
                        label="最后操作时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.remark[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remark"
                        label="备注"
                        width="150">
                    </el-table-column>
                </el-table>
            </div>
            <div>
            <div>
                 <!-- 主体视图 -->
                <el-table
                    :data="ztstTable"
                     v-loading="loading"
                    border
                    center
                    fixed 
                    max-height="600"
                    :default-sort = "{prop: 'time', order: 'descending'}"
                    style="width: 100%;position:relative"
                    v-if="ztstShow"
                    @selection-change="selectedItemsid"
                    >
                     <el-table-column type="expand">
                         <template slot-scope="props" >
                             <tr  v-for='(item,index) in props.row.children' :key='index'>
                                 <td class='tableExpandIcon'></td>
                                 <td class='tableExpandCheckzym'>
                                    <el-checkbox :label='item.id' :value='item.id' @change.native.stop="changeChildren(props.row,$event)" v-model='chackboxChoose'></el-checkbox>
                                 </td>
                                 <td class='tableExpandTd' >{{item.checkList}}</td>
                                 <td class='tableExpandTd'>{{item.merchantNetTime}}</td>
                                 <td class='tableExpandTd' >{{item.achievementProperty}}</td>
                                 <td class='tableExpandTd' >{{item.merchantNo}}</td>
                                 <td class='tableExpandTd' >{{item.merchantName}}</td>
                                 <td class='tableExpandTd' >{{item.merchantContractName}}</td>
                                 <td class='tableExpandTd' >{{item.agentNo}}</td>
                                 <td class='tableExpandTd' >{{item.agentName}}</td>
                                 <td class='tableExpandTd' >{{item.sale}}</td>
                                 <td class='tableExpandTd'>{{item.subCompany}}</td>
                                 <td class='tableExpandTd2' >{{item.naturalPropertyOne}}</td>
                                 <td class='tableExpandTd2'>{{item.naturalPropertyTwo}}</td>
                                 <td class='tableExpandTd' >{{item.time}}</td>
                                 <td class='tableExpandTd' >{{item.triggerRules}}</td>
                                 <td class='tableExpandTd' >{{item.riskLevel}}</td>
                                 <td class='tableExpandTd' >{{item.riskQualitativeAnalysis}}</td>  
                                 <td class='tableExpandTd' >{{item.dealStatus}}</td>
                                  <td class='tableExpandTd' >{{item.auditOpinion}}</td>
                                 <td class='tableExpandTd'>{{item.riskDeal}}</td>
                                 <td class='tableExpandTd' >{{item.checkListSource}}</td>     
                                 <!-- <td class='tableExpandTd'>{{item.checkListType}}</td> -->
                                 <td class='tableExpandTd' >{{item.lastModifiedBy}}</td>     
                                 <td class='tableExpandTd' >{{item.lastModifiedTime}}</td>     
                                 <td class='tableExpandTd' >{{item.remark}}</td>     
                             </tr>
                         </template>
                     </el-table-column>
                    <el-table-column
                        align='center'
                        width="50"
                        prop="id"
                        :render-header="renderHeader"
                        > 
                        <template slot-scope="scope">
                            <input type="hidden" name="flag" v-model="flag"> <!-- ！！！ 强制刷新   解决了半天！！！ -->
                            <el-checkbox @change.native.stop="changefather(scope.row)" v-model="scope.row.id[1]" ></el-checkbox>
                        </template>
                    </el-table-column>
                   <el-table-column
                    v-if="tableDataSec0.checkList[0]"
                        sortable
                         prop="checkList"
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        label="核查单号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNetTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.achievementProperty[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="商户业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNo"
                        label="商户编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantName"
                        label="商户名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantContractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentNo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentNo"
                        label="代理商编号"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.agentName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="agentName"
                        label="代理商名称"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.sale[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="sale"
                        label="销售"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.subCompany[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="subCompany"
                        label="分公司"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.naturalPropertyOne[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyOne"
                        label="商户自然属性一级"
                        width="180">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.naturalPropertyTwo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="naturalPropertyTwo"
                        label="商户自然属性二级"
                        width="180">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.time[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.triggerRules[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="triggerRules"
                        label="触发规则"
                        width="150">
                    </el-table-column>
                     <el-table-column
                        prop="riskLevel"
                        label="风险级别"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.riskQualitativeAnalysis[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskQualitativeAnalysis"
                        label="风险定性"
                        width="150">
                    </el-table-column> 
                    <el-table-column
                    v-if="tableDataSec0.dealStatus[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="dealStatus"
                        label="处理状态"
                        width="150">
                    </el-table-column>
                     <el-table-column
                    v-if="tableDataSec0.auditOpinion[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="auditOpinion"
                        label="审核意见"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.riskDeal[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.checkListSource[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListSource"
                        label="核查单来源"
                        width="150">
                    </el-table-column>
                    <!--  <el-table-column
                     v-if="tableDataSec0.checkListType[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="checkListType"
                        label="核查单类型"
                        width="150">
                    </el-table-column> -->
                     <el-table-column
                     v-if="tableDataSec0.lastModifiedBy[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedBy"
                        label="最后操作人"
                        width="150">
                    </el-table-column>
                     <el-table-column
                      v-if="tableDataSec0.lastModifiedTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="lastModifiedTime"
                        label="最后操作时间"
                        width="150">
                    </el-table-column>
                     <el-table-column
                     v-if="tableDataSec0.remark[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="remark"
                        label="备注"
                        width="150">
                    </el-table-column>
                   <el-table-column
                       v-if="showid"
                        sortable
                        show-overflow-tooltip
                        prop="id"
                        label=""
                        width="">
                    </el-table-column>
                </el-table>
            </div>
            
            </div>
            <div class="block mb20" v-if="lsstShow">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange0" v-model="currenteveryno0" style="width: 28%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[10,20,30,40]"
                    :page-size="Number(currenteveryno0)"
                    :total="length"
                    @current-change="handleCurrentChange0">
                   </el-pagination>
                   
                </div>
            </div>
            <div class="block mb20" v-if="ztstShow">
                <div class='pagination'>
                    <span>每页显示</span> 
                     <el-select @change="handleSizeChange1" v-model="currenteveryno1" style="width: 28%;">
                        <el-option label="10" value="10"></el-option>
                        <el-option label="20" value="20"></el-option>
                        <el-option label="30" value="30"></el-option>
                        <el-option label="40" value="40"></el-option>
                    </el-select>
                </div>
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[10,20,30,40]"
                    :page-size="Number(currenteveryno1)"
                    :total="length"
                    @current-change="handleCurrentChange1">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
        <!-- 上传文件弹框 -->
        <el-dialog title="导入" :visible.sync="importe" width="570px">
            <div>
                本地文件：<el-input placeholder="点击帮助以查看具体格式要求" v-model="fileData" class="listValInp"></el-input>
                <label for="filename">
                    <button class="fr mr10">选择文件</button>
                    <form enctype="multipart/form-data" id="formsubmit" >
                       <input  class="formIpt" type="file" id="filename" style="opacity:0;" name="filename" @click="fileChangeClick" @change="fileChange($event)" :value="valueText">
                    </form>
                </label>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" style="float:left;" @click="downloadModel">下载模板</el-button>
              <el-button type="primary" @click="innerVisible = true">帮 助</el-button>
              <el-button type="primary" @click="upload" :disabled="checksuccessupload">确 定</el-button>
              <el-button @click="importeBtn" :disabled="checksuccessupload">取 消</el-button>
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
            <el-form-item label="商户编号" :show-message="false" :label-width="formLabelWidth" prop="merchantNo">
              <el-input v-model="createform.merchantNo" auto-complete="off" @blur='checkMerchantNo(createform.merchantNo)'></el-input>
               <span class="errorbox" v-show="merchant" v-html="merchanttext"></span>
            </el-form-item>
            <el-form-item label="核查单来源" :show-message="false" :label-width="formLabelWidth" prop="checkListSource">
              <el-select v-model="createform.checkListSource" @change="isCheckListSourceError">
                 <el-option
                    v-for="item in hcdlyArray2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <span class="errorbox" v-show="checkListSource" v-html="checkListSourcetext"></span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="createform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="createformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='addForm("createformElement",createform,"createformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 派发弹框 -->
        <el-dialog title="" :visible.sync="dispatchformElementVisible" width="600px">  
          <el-form :model="dispatchform" :rules="rules" ref="dispatchformElement">
            <el-form-item label="派发至" :label-width="formLabelWidth" prop="companyId">
              <el-select v-model="dispatchform.companyId" @change="isDispatchErro" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in dispatchformArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                 <span class="errorbox" v-show="companyId" v-html="companyIdtext"></span>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" >
              <el-input v-model="dispatchform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dispatchformElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='dispatchForm("dispatchformElement",dispatchform,"dispatchformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 商户核查单  处理弹框 -->
        <el-dialog title="" :visible.sync="processElementVisible"  width="700px">  
          <el-form :model="processform" :rules="rules" ref="processElement">
            <el-form-item label="风险定性:" :label-width="formLabelWidth" prop="riskQualitativeAnalysis">
                <el-select v-model="processform.riskQualitativeAnalysis" @change="isRiskQualitativeAnalysisErro" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="确认有风险" value="确认有风险"></el-option>
                    <el-option label="确认无风险" value="确认无风险"></el-option>
                </el-select>
                <span class="errorbox" v-show="riskQualitativeAnalysis" v-html="riskQualitativeAnalysistext"></span>
            </el-form-item>
            <el-form-item label="风险处理:" :label-width="formLabelWidth" prop="riskDeal">
              <el-select v-model="processform.riskDeal"  @change="isRiskDealErro" placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option
                        v-for="item in fxclArray2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span class="errorbox" v-show="riskDeal" v-html="riskDealtext"></span>
            </el-form-item>
            <el-form-item label="规则免疫周期:" :label-width="formLabelWidth">
                <el-date-picker  v-model="processform.immuneStart" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>&nbsp;&nbsp; - &nbsp;&nbsp;
                <el-date-picker  v-model="processform.immuneEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width: 90%;max-width:225px;"></el-date-picker>
            </el-form-item>
                             
            <el-form-item label="备注:" :label-width="formLabelWidth" >
              <el-input v-model="processform.remark" maxlength="100" placeholder="请填写备注" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="processElementVisible = false">取 消</el-button>
            <el-button type="primary" @click='processForm("processElement",processform,"processElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
        <!-- 审核弹框 -->
        <el-dialog title="" :visible.sync="auditformElementVisible" width="600px">  
          <el-form :model="auditform" :rules="rules" ref="auditformElement">
            <el-form-item label="审核结果:" :label-width="formLabelWidth" prop="auditResult">
              <el-select v-model="auditform.auditResult" @change="isauditResultErro"  placeholder="请选择" style="width: 80%;max-width:225px;">
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="审核拒绝" value="0"></el-option>
                </el-select>
                <span class="errorbox" v-show="auditResult" v-html="auditResulttext"></span>
            </el-form-item>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 start 额外做了判空 -->
                <el-form-item label="审核意见:" :label-width="formLabelWidth" prop="auditOpinion" >
                   
                  <el-input v-model="auditform.auditOpinion" maxlength="100" placeholder="请输入审核意见" auto-complete="off"></el-input>
                </el-form-item>
                 <div style="position:relative;top:-30px;font-size:10px;width:120px;text-align:right;color:#666;">(审核拒绝时必填)</div>
                <!--！！！！ 审核结果为拒绝时，审核意见为必填项 end-->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="auditformElementVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isdisable" @click='doauditForm("auditformElement",auditform,"auditformElementVisible")'>确 定</el-button>
          </div>
        </el-dialog>
         <!-- 表格每列的列选择 注意：每页都需要手动改变top值-->
        <div ref="list" class="list pa none bgccc" style="top:860px;">
          <TableSelect  :tableDataSec="tableDataSec0" ></TableSelect>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import TableSelect from '../tableSelect/tableSelect.vue'
export default {
    name:'商户核查单管理平台',
    computed:{
        isneed:function(){
            return this.auditform.auditResult == 0 ? 'auditOpinion' : ''
        },
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
        },
        checksuccessupload:function(){
          if(this.isokupload){
            return false
          }else{
            return true
          }
        }
    },
    data(){
        return{
            authsearch1:false,
            authsearch2:false,
            authreset:false,
            ahthcj:false,
            ahthdr:false,
            ahthpf:false,
            ahthcl:false,
            ahthsh:false,
            ahthdown:false,
            liushui:false,

            showid:false,
            loading:true,
            isChoose:false,//弹框状态计算
            merchant:false,
            merchanttext:'',
            flag:0,
            areaall:false,
            currenteveryno0:20,
            currenteveryno1:20,
            merchantnoisok:false,
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
            lsstTable:[],
            chackboxChoose:[],
            chackboxChooseLen:0,
            rowCheckList:[],
            tableDataSec0:{
              checkList:[true,'核查单号'],
              merchantNo:[true,'商户编号'],
              merchantName:[true,'商户名称'],
              merchantNetTime:[true,'商户入网时'],
              achievementProperty:[true,'商户业绩属性'],
              merchantContractName:[true,'商户签约名'],
              agentNo:[true,'代理商编'],
              agentName:[true,'代理商名称'],
              sale:[true,'销售'],
              subCompany:[true,'分公司'],
              naturalPropertyOne:[true,'商户自然属性一级'],
              naturalPropertyTwo:[true,'商户自然属性二级'],
              time:[true,'生成时间'],
              triggerRules:[true,'触发规则'],
              riskLevel:[true,'风险级别'],
              riskQualitativeAnalysis:[true,'风险定性'],
              dealStatus:[true,'处理状态'],
              auditOpinion:[true,'审核意见'],
              riskDeal:[true,'风险处理'],
              checkListSource:[true,'核查单来源'],
              // checkListType:[true,'核查单类型'],
               lastModifiedBy:[true,'最后操作人'],
              lastModifiedTime:[true,'最后操作时间'],
              remark:[true,'备注']   //23
            },
            ztstTable:[],
          form:{
            startTime:'',
            endTime:'',
            merchantNo:'',
            merchantContractName:'',
            checkList:'',
            riskQualitativeAnalysis:'all',
            riskLevel:'all',
            dealStatus:'all',
            riskDeal:'all' 
          },
          formSenior:{
           naturalPropertyOne:"all",
           sale:"",
           subCompany:"",
           achievementProperty:"all",
           agentNo:"",
           agentName:"",
           checkListSource:"all",
           triggerRules:"",
          },
           createform:{  //创建商户核查单
             merchantNo:'',
             checkListSource:'',
             remark:''
           },
           dispatchform:{  //派发商户核查单
             companyId:'', 
             remark:''
           },
           processform:{  //处理商户核查单
             riskQualitativeAnalysis:'', 
             riskDeal:'',
             immuneStart:'',
             immuneEnd:'',
             remark:''
          },
          auditform:{
            auditResult:'',
            auditOpinion:''
          },
          fxjbArray:[],//风险级别
          clztArray:[],//处理状态
          fxclArray:[],//风险处理
          fxclArray2:[],//风险处理
          onepropertySelect:[],//商户自然属性一级
          worktypeArray:[],//商户业绩属性
          hcdlyArray:[],//核查单来源
          hcdlyArray2:[],//核查单来源
          dispatchformArray:[],//派发到哪哪
          rules:{
            checkListSource:[
                {required: true, message: '请选择核查单来源', trigger: 'change'}
            ],
            merchantNo:[
                {required: true, message: ' ', trigger: 'blur'}
            ],
            riskQualitativeAnalysis:[
                {required: true, message: '请选择风险定性', trigger: 'change'}
            ],
            riskDeal:[
                {required: true, message: '请选择风险处理', trigger: 'change'}
            ],
            auditResult:[
                {required: true, message: '请选择审核结果', trigger: 'change'}
            ],
            auditOpinion:[
                {required: true, message: ' ', trigger: 'blur'}
            ],
            companyId:[
                {required: true, message: '请选择分公司', trigger: 'change'}
            ]
          },
          checkListSource:false, //核查单
          checkListSourcetext:'',
          companyId:false,  //派发
          companyIdtext:'',
          riskQualitativeAnalysis:false,  //风险定性
          riskQualitativeAnalysistext:'',
          riskDeal:false,  //风险处理
          riskDealtext:'',
          auditResult:false,  //审核结果
          auditResulttext:'',
          idList:[],//表格中选中的行idlist
          pageNumber0:1,
          pageRow0:20,
          pageNumber1:1,
          pageRow1:20,
          length:0 ,
          valueText:'',
          isokupload:true
      }
  },
  watch:{
    chackboxChoose:{  //深度监听全部选项
        deep:true,
        handler:function(val, oldVal){
            if(val.length != this.chackboxChooseLen){
               this.areaall = false
            }else{

                this.areaall = true
            }
        }
    } 
   },
   created(){
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getRiskDeal()//风险处理
    this.getRiskDeal2()//弹框中的  风险处理
    this.getMerchantFirst()//商户自然属性一级
    this.getIndustryAchievementProperty()//商户业绩属性
    this.getDealStatus()//处理状态查询
    this.getRiskLevel()//风险级别查询
    this.getCheckListSource()//核查单来源
    this.getCheckListSource2()//弹框中的 核查单来源
    this.getSubCompany()//派发至 分公司
    this.listQuery("/checklist/getAll","cuscheck")
    this.queryAuthList()
   },
  
  methods:{
    fileChangeClick(){this.valueText = ''},
queryAuthList(){  //权限管理
       var self = this
        var arr = localStorage.getItem('ARRLEVEL')?localStorage.getItem('ARRLEVEL'):[]
    JSON.parse(arr).map(function(ele){
        switch(ele){
            case 84 || 232:
                self.authsearch1= true
            break;
            case 85 || 233:
                self.authsearch2= true
            break;
            case 86:
                self.authreset= true
            break;
            case 88:
                self.ahthcj= true
            break;
            case 89:
                self.ahthdr= true
            break;
            case 91:
                self.ahthcl= true
            break;
            case 92:
                self.ahthsh= true
            break;
            case 90:
                self.ahthpf= true
            break;
            case 93:
                self.ahthdown = true
            break;
             case 87:
                self.liushui= true
            break;
        }
    })
    },
   renderHeader(h, {column, $index }) {
    var self = this
        return h('span', [
            h('el-checkbox',
                {
                   attrs: {
                        value:self.areaall
                      },
                    style: 'margin-left: 5px;',
                    on: {
                        change: (value)=>{
                            self.areaall = value
                            self.changeAll()
                        }
                    }
                }
            ),
        ]);
    },
    getCheckListSource2(){ //核查单来源
        var param = this.addSessionId({})
        this.$axios.post("/param/getCheckListSourceAdd",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.hcdlyArray2 = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    }, 
     getRiskDeal2(){ //风险处理
        var param = this.addSessionId({})
        this.$axios.post("/param//getRiskDealFrame",qs.stringify(param)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.fxclArray2 = response.data.returnList
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },

    pf(){  //怕发
        var self = this
        if(self.lsstShow){
            if(self.idList.length < 1){
                this.atleastOne()
                return false
            }
        }else if(self.ztstShow){
            if(self.chackboxChoose.length < 1){
                this.atleastOne()
                return false
            }
        }
        
        this.dispatchformElementVisible = true
    },
    cl(){  //处理
        var self = this
       if(self.lsstShow){
            if(self.idList.length < 1){
                this.atleastOne()
                return false
            }
        }else if(self.ztstShow){
            if(self.chackboxChoose.length < 1){
                this.atleastOne()
                return false
            }
        }
         this.processElementVisible = true
    },
    sh(){  //审核
        var self = this
       if(self.lsstShow){
            if(self.idList.length < 1){
                this.atleastOne()
                return false
            }
        }else if(self.ztstShow){
            if(self.chackboxChoose.length < 1){
                this.atleastOne()
                return false
            }
        }
        this.auditformElementVisible = true
    },
    downList(){ //下载
        var self = this
        var params = this.processParams('cuscheck')//入参
        if(!params){
            return false
        } 
        if(self.lsstShow){
            params.id=self.idList.join(',')
        }else if(self.ztstShow){
            params.id=self.chackboxChoose.join(',')
        }
        params.sessionId =localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        this.$axios.post("/checklist/downLoadCheck",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code == '200'){
                window.location = this.url+"/checklist/downLoad?" + qs.stringify(params)
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
        
    },
     // 主体视图选择框 
    changeChildren(fatherrow,thisrow){  //每个子行
        var self = this
        fatherrow.children.every(function(ele){
            if(self.chackboxChoose.indexOf(ele.id) > -1){
                return fatherrow.id[1]=true
            }else{
                return fatherrow.id[1]=false
            }
        })
    }, 
    changefather(row){  //汇总行
        var self = this
        if(row.id[1]){
            row.children.map(function(ele){
                if(self.chackboxChoose.indexOf(ele.id) == -1){
                    self.chackboxChoose.push(ele.id)
                }
            })
        }else{
             row.children.map(function(ele){
                 if(self.chackboxChoose.indexOf(ele.id) > -1){
                    var index=self.chackboxChoose.indexOf(ele.id) 
                    self.chackboxChoose.splice(index,1)
                }
            })
        }
    },
    changeAll(){   //表头行
        var self = this
        this.chackboxChoose = []
        self.len=[]
        if(this.areaall){
            this.areaalllength = this.ztstTable.length;
            this.ztstTable.map(function(ele,index){
                ele.id[1]=true
                self.flag = new Date().getTime();//必须有！
                ele.children.map(function(item){
                    self.chackboxChoose.push(item.id)
                })
            })
            self.chackboxChooseLen = self.chackboxChoose.length
        }else{
            this.ztstTable.map(function(ele,index){
                ele.id[1]=false
                self.flag = new Date().getTime();//必须有！
                self.chackboxChoose=[]
            })
        }
        
    },
    mainQuery(){ // 商户核查单主体视图查询
        var self = this
        var params = this.processParams('cuscheck')
         params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
         this.loading = true
        this.$axios.post("/checklist/getMain",qs.stringify(params)).then(res => {
            var response = res.data
            var arrlen=[]
            this.loading = false
            if(response.code == '200'){
                this.ztstTable=response.data.returnList
                this.length = response.data.total
                this.addIdentity(self.ztstTable)

                 this.ztstTable.map(function(ele,index){
                    ele.children.map(function(item){
                        arrlen.push(item.id)
                    })
                    self.flag = 1;//必须有！！
                })
            self.chackboxChooseLen = arrlen.length
            }else{
                this.$message.error({message:response.msg,center: true});
            }
        })
    },
    addIdentity(arr){
        if(arr.length > 0 ){
            arr.map(function(ele,index){
                ele.id=[]
                ele.id[0]= 'id'+index
                ele.id[1]=false
            })
        }
    },
    cj(){
        this.createformElementVisible = true
    },
    isCheckListSourceError(){  //核查单来源
        if(this.createform.checkListSource == '请选择' || this.createform.checkListSource == ''){
            this.checkListSource=true
            this.checkListSourcetext='请选择核查单来源'
            return false
        }else{
            this.checkListSource=false
            return true
        }  
    },
    isDispatchErro(){
       if(this.dispatchform.companyId == '请选择' || this.dispatchform.companyId == ''){
            this.companyId=true
            this.companyIdtext='请选择分公司'
            return false
        }else{
            this.companyId=false
            return true
        }   
    },
     isRiskQualitativeAnalysisErro(){  
       if(this.processform.riskQualitativeAnalysis == '请选择' || this.processform.riskQualitativeAnalysis == ''){
            this.riskQualitativeAnalysis=true
            this.riskQualitativeAnalysistext='请选择风险定性'
            return false
        }else{
            this.riskQualitativeAnalysis=false
            return true
        }   
    },
     isRiskDealErro(){  
       if(this.processform.riskDeal == '请选择' || this.processform.riskDeal == ''){
            this.riskDeal=true
            this.riskDealtext='请选择风险处理'
            return false
        }else{
            this.riskDeal=false
            return true
        }   
    },
    isauditResultErro(){  
       if(this.auditform.auditResult == '请选择' || this.auditform.auditResult == ''){
            this.auditResult=true
            this.auditResulttext='请选择审核结果'
            return false
        }else{
            this.auditResult=false
            return true
        }   
    },
    doauditForm(formName,params,hiddenElement){
        /*  审核
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var flag = this.isauditResultErro()
        if(flag){
            var subParam = params
            subParam.id= this.idList.concat(this.chackboxChoose).join(',')
            this[hiddenElement] = false 
             subParam.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/checklist/examine',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.listQuery("/checklist/getAll","cuscheck")
                this.auditform={
                    auditResult:'请选择',
                    auditOpinion:''
                }
                this.successTip(response.msg)
              }else{
                this.failTip(response.msg)
              }
            }) 
        }
     },
    processForm(formName,params,hiddenElement){
        /*  处理
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var self = this
        var flag = this.isRiskQualitativeAnalysisErro() && this.isRiskDealErro()
        if(flag){
            var subParam = params
            subParam.id= this.idList.concat(this.chackboxChoose).join(',')
            this[hiddenElement] = false 
            subParam.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/checklist/handle',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code == '200'){
                 this.listQuery("/checklist/getAll","cuscheck")
                 this.processform = {  //处理商户核查单
                     riskQualitativeAnalysis:'请选择', 
                     riskDeal:'请选择',
                     immuneStart:'',
                     immuneEnd:'',
                     remark:''
                  }
                  self.successTip(response.msg)
              }else{
                self.failTip(response.msg)
              }
          }) 
        }
     },  
    dispatchForm(formName,params,hiddenElement){    
        /* 派发
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
        var flag = this.isDispatchErro()
        if(flag){
            var subParam = params
            subParam.id= this.idList.concat(this.chackboxChoose).join(',')
            this[hiddenElement] = false 
            subParam.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
            this.$axios.post('/checklist/send',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code =='200'){
               
                this.dispatchform = {  //派发商户核查单
                     companyId:'请选择',
                     remark:''
                }
                 this.query()   
                 this.successTip(response.msg)
              }else{
                this.failTip(response.msg)
              }
          }) 
        }
     }, 
    addForm(formName,params,hiddenElement){
        /*
          formName: 表单id  string
          params: 传入参数  {}
          hiddenElement: 控制表单显示的数据  string
        */
      var flag = this.isCheckListSourceError()  //判断核查单来源
      if(!this.merchantnoisok){
        this.merchant=true
        this.merchanttext='请输入商户编号'
      }
      if(flag && this.merchantnoisok){
        this[hiddenElement] = false 
        params.sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
        this.$axios.post('/checklist/addCheckList',qs.stringify(params)).then(res => {
          var response = res.data
          if(response.code == '200'){
            this.createform = {  //创建商户核查单
                 merchantNo:'',
                 checkListSource:'请选择',
                 remark:''
            }
            this.successTip(response.msg)
            this.query()
          }else{
            this.failTip(response.msg)
          }
        }) 
      }
     },  
     query(){
        this.listQuery("/checklist/getAll","cuscheck")
         this.mainQuery()//主体视图
     },
     handleSizeChange0() {  //更改页数
        this.pageRow0 = this.currenteveryno0
        this.listQuery("/checklist/getAll","cuscheck",true)
    },
    handleCurrentChange0(val) {  //处理当前页
         this.pageNumber0 = `${val}`  //当前页
         this.listQuery("/checklist/getAll","cuscheck",true)
    },
    handleSizeChange1() {  //更改页数
        this.pageRow1 = this.currenteveryno1
        this.mainQuery()//主体视图
    },
    handleCurrentChange1(val) {  //处理当前页
        this.pageNumber1 = `${val}`  //当前页
        this.mainQuery()//主体视图
    },
    toggleSt(){
        var onOff = document.getElementById("stIcon");
        if(onOff.className == "lsst"){  //切换到主体视图
          onOff.classList.remove("lsst")
          this.lsstShow = false;
          onOff.classList.add("ztst")
          this.idList=[] //清空
          this.addIdentity(this.ztstTable)//重置
          this.areaall=false
          this.mainQuery()
          this.ztstShow = true;

        }else if(onOff.className == "ztst"){   //切换到流水视图
          this.chackboxChoose=[] //清空
          onOff.classList.remove("ztst")
          this.ztstShow = false;
          onOff.classList.add("lsst")
          this.listQuery("/checklist/getAll","cuscheck")
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
  
  importeBtn(){  //点击取消x
    this.importe = false
    this.fileData = ''
    this.file = ''        
  },
   downloadModel(){  //下载模版
    var param = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
    window.location=encodeURI(this.url+"/DownLoadCheckListController/downloadCheckListTemplate?sessionId="+param)
  },
  fileChange(e){  //上传文件
    if(e.target.files[0]){
        this.file = e.target.files[0]
        this.fileData = e.target.files[0].name
    }
    
  },
  upload(){  //点击上传
        var self = this
        if(!this.file){
          this.$alert('不能上传空文件', '系统提示', {
            confirmButtonText: '确定'
          });
          return
        }
     self.isokupload=false
       let formData = new FormData()
       formData.append('file',this.file)
       var sessionId = localStorage.getItem('SID') ? localStorage.getItem('SID'):''
       formData.append('sessionId',sessionId)
      this.$axios.post('/CheckListUpController/batchAddCheckList',formData)
      .then(res => {
        this.uploadDataF = res.data.code
        this.uploadDataS = res.data.success_count
        this.errorData = res.data.fail_download_url
        
        self.isokupload = true
        if(this.uploadDataF == '200' ){ //成功
          this.$alert(res.data.msg, '系统提示', {
            confirmButtonText: '确定',
            callback:function(item){
              if(item == 'confirm'){
                if(self.lsstShow){
                    self.listQuery("/checklist/getAll","cuscheck")
                }else if(self.ztstShow){
                    self.mainQuery()
                }
              }
            }
          });
          this.importe = false
          this.fileData = ''
          this.file = ''        
        }else{  //失败 download
            var str = res.data.download ? '<a href="'+this.url+'/CheckListUpController/downloadCheckListData" style="color:#409EFF;">下载</a>':'';

            var html = res.data.msg + str
          this.$confirm(html, '', {
                      confirmButtonText: '确定',
                      dangerouslyUseHTMLString: true
                    }) 
          // this.fileData = ''
          // this.file = ''        
        }
    })
    .catch(error => {
        console.log(error)
    })
  },
  },
  components:{
    TableSelect
  }
}
</script>
<style lang="less" scoped>
.errorbox{
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    }
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
.tableExpandIcon{
    min-width:48px !important;text-align:center;overflow: hidden;
}
.tableExpandCheckzym{
    min-width:50px !important;text-align:center;overflow: hidden;
}
.tableExpandTd{
min-width:150px !important;max-width:150px !important;text-align:left;padding-left:10px;overflow: hidden;
}
.tableExpandTd2{
min-width:180px !important;max-width:180px !important;text-align:left;padding-left:10px;overflow: hidden;
}

.checkbox{padding:12px 14px;}
.importData{line-height: 30px;}
.listValInp{width: 60%;height: 36px;}
.formIpt{
    padding: 0;
    width: 14%;
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
