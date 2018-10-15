<!--商户核查单管理-->
<template>
    <div id="cuschecklist" @click="allarea($event)">
        <div class="searchBasic">
            
            <el-collapse-transition>
                <div class="searchContentgray" id="searchContentgray">
                    <div class="leftContent">
                        <el-form ref="form" :model="form" label-width="140px" class="demo-ruleForm">
                            <div class="formConClass">
                                <el-form-item label="开始时间:" prop="startTime">
                                    <el-date-picker  v-model="form.startTime" value-format="yyyy-MM-dd HH:mm:ss"
                                        type="datetime" placeholder="选择日期时间" style="width:122%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="结束时间:" prop="endTime">
                                    <el-date-picker  v-model="form.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期时间" style="width:122%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户唯一标识:" prop="merchantOnlyId">
                                     <el-input v-model="form.merchantOnlyId" placeholder=""></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="商户编号:" prop="merchantNo">
                                     <el-input v-model="form.merchantNo" placeholder=""></el-input>
                                </el-form-item>
                            </div>
                           
                            <div class="formConClass">
                                <el-form-item label="商户签约名:" prop="merchantContractName">
                                    <el-input v-model="form.merchantContractName" placeholder="" ></el-input>
                                </el-form-item>
                            </div>
                             <div class="formConClass">
                                <el-form-item label="商户KYC:" prop="kycCognizance">
                                    <!-- 多选框 -->
                                    <KycCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </KycCheckbox>
                                </el-form-item>
                            </div>
                             
                            <div class="formConClass">
                                <el-form-item label="核查单来源:" prop="checkListSource">
                                   <ManyCheckbox :select="select"
                                        @selectedChange="selectedChange">
                                    </ManyCheckbox>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="风险处理:" prop="riskDeal">
                                    <el-select v-model="form.riskDeal" placeholder="请选择" >
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
                            <div class="formConClass">
                                <el-form-item label="处理状态:" prop="dealStatus">
                                    <el-select v-model="form.dealStatus" placeholder="请选择" >
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
            <div class="title2">
                <i class="el-icon-arrow-down toggleIcon" @click="seniorSearchToggle = !seniorSearchToggle"></i>
                <span>高级查询</span>
            </div>
            <el-collapse-transition>
                <div class="seniorSearchContent activeToggle clear" v-show="seniorSearchToggle"> 
                    <div class="leftContent fl">
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
                                <el-form-item label="行业业绩属性:" prop="achievementProperty">
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
                                <el-form-item label="销售:" prop="sale">
                                    <el-input v-model="formSenior.sale" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="分公司:" prop="subCompany">
                                    <el-input v-model="formSenior.subCompany" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            
                            <div class="formConClass">
                                <el-form-item label="代理商编号:" prop="agentNo">
                                    <el-input v-model="formSenior.agentNo" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                            <div class="formConClass">
                                <el-form-item label="代理商名称:" prop="agentName">
                                    <el-input v-model="formSenior.agentName" placeholder="" style="width: 90%;max-width:225px;"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <div class="rightContent1 fl">
                            <el-button type="primary" v-if="lsstShow && authsearch2" class="serchbtn" icon="el-icon-search" @click='listQuery("/checklist/getAll","cuscheck")'>查询</el-button>
                         <el-button type="primary" v-if="ztstShow && authsearch2" class="serchbtn" icon="el-icon-search" @click='mainQuery'>查询</el-button>
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
                        <div class="BotoomBtn leftRadius" v-show="addCase" title="生成商户案件" @click="addCaseevent">
                            <div class="scshaj"></div>
                        </div>
                        <div class="BotoomBtn" v-show="ahthpf"  title="派发" @click="pf">
                            <div class="pf"></div>
                        </div>
                        <!--  <div class="BotoomBtn" v-show="ahthcl"  title="处理" @click="cl">
                            <div class="cl"></div>
                        </div> -->
                        <div class="BotoomBtn" v-show="ahthsh"  title="审核" @click="sh">
                            <div class="sh"></div>
                        </div>
                        <div class="BotoomBtn rightRadius" v-show="ahthdown"  title="下载" @click="downList">
                            <div class="xz"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
            <!-- 流水视图 -->
                <el-table
                    v-loading="loading"
                    fixed 
                    max-height="600"
                    @selection-change="selectedItemsid"
                    @row-dblclick="gotoDetail"
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
                    v-if="tableDataSec0.merchantOnlyId[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantOnlyId"
                        label="商户唯一标识"
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
                    v-if="tableDataSec0.merchantContractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantKyc[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantKyc"
                        label="商户KYC"
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
                     v-if="tableDataSec0.time[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.expiryTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="expiryTime"
                        label="过期时间"
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
                     v-if="tableDataSec0.riskDeal[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.investigationInfo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="investigationInfo"
                        label="调查信息"
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
                    v-if="tableDataSec0.achievementProperty[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNetTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网日期"
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
                             <tr @dblclick="gotoDetail(item)" v-for='(item,index) in props.row.children' :key='index'>
                                 <td class='tableExpandIcon'></td>
                                 <td class='tableExpandCheckzym'>
                                    <el-checkbox :label='item.id' :value='item.id' @change.native.stop="changeChildren(props.row)" v-model='chackboxChoose'></el-checkbox>
                                 </td>
                                 <td class='tableExpandTd' >{{item.checkList}}</td>
                                 <td class='tableExpandTd'>{{item.merchantOnlyId}}</td>
                                 <td class='tableExpandTd' >{{item.merchantNo}}</td>
                                 <td class='tableExpandTd' >{{item.merchantContractName}}</td>
                                 <td class='tableExpandTd' >{{item.merchantKyc}}</td>
                                 <td class='tableExpandTd2' >{{item.naturalPropertyOne}}</td>
                                 <td class='tableExpandTd' >{{item.time}}</td>
                                 <td class='tableExpandTd' >{{item.time}}</td>
                                 <td class='tableExpandTd' >{{item.dealStatus}}</td>
                                 <td class='tableExpandTd' >{{item.riskDeal}}</td>
                                 <td class='tableExpandTd'>{{item.investigationInfo}}</td>
                                 <td class='tableExpandTd' >{{item.checkListSource}}</td>
                                 <td class='tableExpandTd'>{{item.sale}}</td>
                                 <td class='tableExpandTd' >{{item.subCompany}}</td>
                                 <td class='tableExpandTd' >{{item.achievementProperty}}</td>
                                 <td class='tableExpandTd' >{{item.merchantNetTime}}</td>
                                 <td class='tableExpandTd' >{{item.agentNo}}</td>
                                  <td class='tableExpandTd' >{{item.agentName}}</td>
                                 <td class='tableExpandTd'>{{item.lastModifiedBy}}</td>
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
                    v-if="tableDataSec0.merchantOnlyId[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantOnlyId"
                        label="商户唯一标识"
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
                    v-if="tableDataSec0.merchantContractName[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantContractName"
                        label="商户签约名"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantKyc[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantKyc"
                        label="商户KYC"
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
                     v-if="tableDataSec0.time[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="time"
                        label="生成时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.expiryTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="expiryTime"
                        label="过期时间"
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
                     v-if="tableDataSec0.riskDeal[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="riskDeal"
                        label="风险处理"
                        width="150">
                    </el-table-column>
                    <el-table-column
                     v-if="tableDataSec0.investigationInfo[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="investigationInfo"
                        label="调查信息"
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
                    v-if="tableDataSec0.achievementProperty[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="achievementProperty"
                        label="行业业绩属性"
                        width="150">
                    </el-table-column>
                    <el-table-column
                    v-if="tableDataSec0.merchantNetTime[0]"
                        sortable
                        show-overflow-tooltip
                        :render-header="companyRenderHeader"
                        prop="merchantNetTime"
                        label="商户入网日期"
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
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
                    :page-size="Number(currenteveryno0)"
                    :total="length"
                    @current-change="handleCurrentChange0">
                   </el-pagination>
                   
                </div>
            </div>
            <div class="block mb20" v-if="ztstShow">
                 
                <div class='paginationRight'>
                   <el-pagination
                    layout="total,prev, pager, next"
                    :page-sizes="[20]"
                    :page-size="Number(currenteveryno1)"
                    :total="length"
                    @current-change="handleCurrentChange1">
                   </el-pagination>
                   
                </div>
            </div>
        </div>
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
                   
                  <el-input v-model="auditform.auditOpinion" maxlength="100" placeholder="审核意见" auto-complete="off"></el-input>
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
import KycCheckbox from '../zymCommon/kycCheckbox.vue'
import ManyCheckbox from '../zymCommon/manyCheckbox.vue'
export default {
    name:'商户核查单管理平台',
    computed:{
        isdisable:function(){  //审核拒绝才能确定
            return this.auditform.auditResult == 0 &&  this.auditform.auditOpinion == '' ? true : false
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
    data(){
        return{
            isprtypetext:'请至少选择一种产品类型',
            authsearch1:false,
            authsearch2:false,
            addCase:true,
            authreset:false,
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
            dispatchformElementVisible:false,//派发弹框显示与隐藏
            auditformElementVisible:false,//审核核查单弹框显示与隐藏
            formLabelWidth: '150px',
            seniorSearchToggle:false,
            ztstShow:false,
            ztstShowSec:false,
            lsstShow:true,
            lsstTable:[],
            chackboxChoose:[],
            chackboxChooseLen:0,
            rowCheckList:[],
            tableDataSec0:{
              checkList:[true,'核查单号'],
              merchantOnlyId:[true,'商户唯一标识'],
              merchantNo:[true,'商户编号'],
              merchantContractName:[true,'商户签约名'],
              merchantKyc:[true,'商户KYC'],
              naturalPropertyOne:[true,'商户自然属性一级'],
              time:[true,'过期时间'],
              expiryTime:[true,'生成时间'],
              dealStatus:[true,'处理状态'],
              riskDeal:[true,'风险处理'],
              investigationInfo:[true,'调查信息'],
              checkListSource:[true,'核查单来源'],
              sale:[true,'销售'],
              subCompany:[true,'分公司'],
              achievementProperty:[true,'行业业绩属性'],
              merchantNetTime:[true,'商户入网日期'],
              agentNo:[true,'代理商编号'],
              agentName:[true,'代理商名称'],
              lastModifiedBy:[true,'最后操作人'],
              lastModifiedTime:[true,'最后操作时间'],
              remark:[true,'备注']   //23
            },
            ztstTable:[],
          form:{
            startTime:'',
            endTime:'',
            merchantOnlyId:'',
            merchantNo:'',
            merchantContractName:'',
            kycCognizance:'',
            checkListSource:'all',
            riskDeal:'all',
            dealStatus:'all'
          },
          select:{
            kycCognizance: "全部",
            childTag: [-1],
          },
          kycshow:false,
          formSenior:{
            naturalPropertyOne:"all",
            achievementProperty:"all",
            sale:"",
            subCompany:"",
            agentNo:"",
            agentName:""
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
          auditform:{
            auditResult:'',
            auditOpinion:''
          },
          clztArray:[],//处理状态
          fxclArray:[],//风险处理
          fxclArray2:[],//风险处理
          onepropertySelect:[],//商户自然属性一级
          worktypeArray:[],//商户业绩属性
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
                {required: true, message: '人工识别商户KYC', trigger: 'blur'}
            ],
            riskDeal:[
                {required: true, message: '调查信息', trigger: 'blur'}
            ],
            type: [
                { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            prtype: [
                { type: 'array', required: true, message: ' ', trigger: 'change' }
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
   created(){
    this.form.startTime = this.getdiffTime(-7) +" 00:"+"00:"+"00"
    this.form.endTime = this.getdiffTime(0) +" 23:"+"59:"+"59"
    this.getRiskDeal()//风险处理
    this.getRiskDeal2()//弹框中的  风险处理
    this.getMerchantFirst()//商户自然属性一级
    this.getIndustryAchievementProperty()//商户业绩属性
    this.getDealStatus()//处理状态查询
    this.getCheckListSource2()//弹框中的 核查单来源
    this.getSubCompany()//派发至 分公司
    this.listQuery("/checklist/getAll","cuscheck")
    this.queryAuthList()
   },
  methods:{
    hasOne(){
        if(this.processform.prtype != ''){
            this.prtype = false
        }else{
            this.prtype = true
        }
    },
    addproperty(){//增加商户自然一级属性
        this.kycshow = true
    },
    isShow(val){
        this.form.KYC= val.submitData
        this.kycshow = val.onepropertySelectshow
    },
    gotoDetail(row){ //进入详情页
        var id = row.id ? row.id : ' '
        var time = row.times ? row.times : ' '
        var autoKyc = row.autoKyc ? row.autoKyc : false
        var merchantContractName = row.merchantContractName ? row.merchantContractName : null
        window.open('#/CusChecklistMgtDetail/'+ id + '/'+ row.checkListType+ '/'+ row.merchantNo+ '/'+ time+ '/'+ autoKyc+'/'+merchantContractName)
    },
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
            }else{
                this.processElementVisible1 = true
            }
        }else if(self.ztstShow){
            if(self.chackboxChoose.length < 1){
                this.atleastOne()
                return false
            }else{
                this.processElementVisible1 = true
            }

        }
         // 
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
    changeChildren(fatherrow){  //每个子行
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
                     self.flag = new Date().getTime();//必须有！
                }
            })
        }else{
             row.children.map(function(ele){
                 if(self.chackboxChoose.indexOf(ele.id) > -1){
                    var index=self.chackboxChoose.indexOf(ele.id) 
                    self.chackboxChoose.splice(index,1)
                     self.flag = new Date().getTime();//必须有！
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
    addCaseevent(){ // 生成案件   
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
        var params = {}
        if(self.lsstShow){
            params.id=self.idList.join(',')
        }else if(self.ztstShow){
            params.id=self.chackboxChoose.join(',')
        }
        this.$axios.post("/checklist/addCase",qs.stringify(params)).then(res => {
            var response = res.data
            if(response.code == '200'){
                this.successTip(response.msg)
            }else{
                this.failTip(response.msg);
            }
        })
    },
    mainQuery(isCheck,number){ // 商户核查单主体视图查询
        var self = this
        var params = this.processParams('cuscheck')
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
            this.$axios.post('/checklist/examine',qs.stringify(subParam)).then(res => {
              var response = res.data
              if(response.code == '200'){
                this.listQuery("/checklist/getAll","cuscheck")
                this.auditform={
                    auditResult:'请选择',
                    auditOpinion:''
                }
                this.successTip(response.msg)
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
        this.hasOne()
        this.$refs[formName].validate((valid) => {
            if(valid){
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
        })
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
                // this.failTip(response.msg)
              }
          }) 
        }
     }, 
     query(){
        this.listQuery("/checklist/getAll","cuscheck")
         this.mainQuery(true,1)//主体视图
     },

    handleCurrentChange0(val) {  //处理当前页
         this.pageNumber0 = `${val}`  //当前页
         this.listQuery("/checklist/getAll","cuscheck",true,val)
    },
    handleCurrentChange1(val) {  //处理当前页
        this.pageNumber1 = `${val}`  //当前页
        
        this.mainQuery(true,val)//主体视图
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
          this.mainQuery(true,1)
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
   
  },
  components:{
    TableSelect,KycCheckbox,ManyCheckbox
  }
}
</script>
<style lang="less" scoped>
.iconbox{
  right:13%;
    .blue{
        color:#3FAAF9;
        font-weight: 800;
    }
}
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
.title2{
    height: 34px;
    line-height: 34px;
    padding-left: 27px;
    font-size: 14px;
    color: #333333;
    box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
}
.searchContentgray,.seniorSearchContent{
    height: auto;
    /* line-height: 76px; */
    padding-left: 3%;
    padding-top: 8px;
    padding-bottom: 6px;
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
    height: 44px;
    font-size: 13px;
    padding-top: 14px;
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
    overflow:hidden;
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

  <!--{
                "id": 116,
                "checkList": "000115",
                "sale": "销售2号",
                "time": "2018-07-10 18:04:19",
                "riskLevel": "中风险",
                "riskQualitativeAnalysis": "未定性",
                "dealStatus": "待处理",
                "riskDeal": "未处理",
                "companyId": "1",
                "merchantNetTime": "2018-07-10",
                "achievementProperty": "电信行业线",
                "merchantNo": "100400501",
                "merchantName": "测试商户有限公司",
                "merchantContractName": "签约测试2",
                "agentNo": "100400500",
                "agentName": "代理商名称1",
                "naturalPropertyOne": "一级行业测试2",
                "naturalPropertyTwo": "二级行业测试2",
                "lastModifiedBy": "",
                "lastModifiedTime": "2018-07-10 18:04:18",
                "businessTime": "2018-07-10 18:04:19",
                "createTime": "2018-07-10 18:04:19",
                "subCompanyId": "23",
                "subCompany": "线下机构(北京一分公司)",
                "pageNumber": 0,
                "pageRow": 0,
                "pageIndex": 0
               } -->