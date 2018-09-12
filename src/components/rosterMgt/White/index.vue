<!-- 白名单 -->
<template>
    <div>
        <search
            :searchParamsShow="searchParamsShow"
            :searchParamsChecked="searchParamsChecked"
            :searchTypeList="searchTypeList"
            :searchForm="searchForm"
            @searchData="searchData"
            @resetForm="resetForm"
            @getQueryEnum="getQueryEnum"
            @typeChange="typeChange"
        >
        </search>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addbtn" data-title='添加'>
                <div class="btn-icon addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click="removeData" data-title='删除'>
                <div class="btn-icon removIcon"></div>
            </div>
            <div class="BotoomBtn improt-btn" data-title='导入' @click="importeWhite=true">
                <div class="btn-icon refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载' @click="downloadWhite=true">
                <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="selectDelUser"
                @cell-dblclick="getDetail">
                <template v-for="item in titDatas">
                    <el-table-column v-if="item.prop !== 'bankCard' && item.prop !== 'phoneNo' && item.prop !== 'certifyId' && item.prop !== 'fixedLine'" :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center"></el-table-column>
                    <el-table-column v-else :type="item.type" :key="item.id" :label="item.label" :prop="item.prop" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                            {{ scope.row[item.prop] }}
                            <div slot="reference" >
                            {{ scope.row[item.prop + 'Copy'] }}
                            </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
        <Page :pageInfo="page"></Page>

        <!-- 添加白名单 -->
        <el-dialog title="添加白名单" :visible.sync="addFormDialog" width="35%" v-dialogDrag >
            <el-form ref="addForm" :model="form" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="100px" style="margin-left:13%; max-height: 450px; overflow-y: auto;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" @focus="getQueryEnum(117, 'typeList')" style="height: 36px;width: 74%" id="type">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户编号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.customerNumber"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1 || form.type * 1 === 3" label="银行卡号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.bankNumber"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="手机号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="IP:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.ip"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="身份证号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.idCard"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="终端号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.terminalNumber"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="经度:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.longitude"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="纬度:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.tag"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="证件号:" prop="paperNumber">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.paperNumber"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="固话:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                <el-form-item  v-show="form.type * 1 === 3" label="业务产品:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                <el-form-item  v-show="form.type * 1 === 3" label="银行类型:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 3" label="测试终端号:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 3" label="EPOS终端号:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                 <el-form-item v-show="form.type * 1 === 6" label="网址:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine"></el-input>
                </el-form-item>
                <el-form-item label="到期时间:" prop="expiryDate" class='hideTimeRightIcon'>
                    <el-date-picker
                    v-model="form.expiryDate"
                    type="datetime"
                    id="expiryDate"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;"
                    :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="生效时间:" prop="activeDate">
                    <el-date-picker
                    v-model="form.activeDate"
                    id="activeDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="form.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('addForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 修改白名单 -->
        <el-dialog title="修改白名单" :visible.sync="updateFormDialog" width="35%" v-dialogDrag >
            <el-form ref="updateForm" :model="updateForm" :rules="rules" class="demo-ruleForm" :label-position="'right'" label-width="100px" style="margin-left:13%; max-height: 450px; overflow-y: auto;">
                <el-form-item label="生效场景:" prop="type">
                    <el-select v-model="updateForm.type" placeholder="请选择" @focus="getQueryEnum(117, 'searchTypeList')" @change="typeChange" style="height: 36px;width: 74%">
                        <el-option
                            v-for="item in typeList"
                            :key="item.syscode"
                            :label="item.sysname"
                            :value="item.syscode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户编号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.customerNumber" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1 || form.type * 1 === 3" label="银行卡号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.bankNumber" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="手机号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.phoneNumber" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="IP:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.ip" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="身份证号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.idCard" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="终端号:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.terminalNumber" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="经度:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.longitude" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="纬度:">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.tag" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="证件号:" prop="paperNumber">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.paperNumber" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 1" label="固话:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                <el-form-item  v-show="form.type * 1 === 3" label="业务产品:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                <el-form-item  v-show="form.type * 1 === 3" label="银行类型:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 3" label="测试终端号:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                <el-form-item v-show="form.type * 1 === 3" label="EPOS终端号:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                 <el-form-item v-show="form.type * 1 === 6" label="网址:" prop="fixedLine">
                    <el-input  style="width: 74%;" clearable type="text" v-model="updateForm.fixedLine" diabled></el-input>
                </el-form-item>
                <el-form-item label="到期时间:" prop="expiryDate" class='hideTimeRightIcon'>
                    <el-date-picker
                    v-model="updateForm.expiryDate"
                    type="datetime"
                    id="updateExpiryDate"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;"
                    :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="生效时间:" prop="activeDate">
                    <el-date-picker
                    v-model="updateForm.activeDate"
                    id="updateActiveDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 74%;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input clearable type="textarea" :maxlength="200" placeholder="最长长度不能超过200位" v-model="updateForm.remark" style="width: 74%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="cancelForm('updateForm')">取 消</el-button>
                <el-button type="primary" @click="updateFormSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 导入白名单 -->
        <el-dialog title="从Excel导入到白名单" :visible.sync="importeWhite" width="570px" v-dialogDrag>
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="downTemplet">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="nameFormChange"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileChange' accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button @click="importeWhiteClick">取 消</el-button>
                <el-button type="primary" @click="upload">导 入</el-button>

                    <div class="promptText" v-show="helpTitle">
                        <span style="display: block;text-align: left;margin: 10px 9px;font-size: 13px;">导入格式要求</span>
                        <el-table
                        :data="titleData"
                        border
                        style="width: 100%;text-align:left;">
                        <el-table-column
                            width="140px"
                            prop="name"
                            label="第一行必须包含字段">
                        </el-table-column>
                        <el-table-column
                            prop="help"
                            label="字段格式要求">
                        </el-table-column>
                        </el-table>
                    </div>
            </span>
        </el-dialog>
        <!-- 导出白名单 -->
        <el-dialog title="白名单查询：分页选择下载" :visible.sync="downloadWhite" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">选择下载从
                <input type="number" min="0" class="downClass" v-model="startNum" @input='startNumInp'>到
                <input type="number" min="0"  :max="this.countNoPage" class="downClass" v-model="endNum" @input='endNumInp'>页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{this.countNoPage}}</span>页</h4>
            <span slot="footer" class="dialog-footer">
                <el-button @click="downloadWhiteClose">取 消</el-button>
                <el-button type="primary" @click='downloadList' v-show='showHideDownloadBtn'>下 载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from "qs";
import search from './Partial/search.vue';
import { desensitizationVal } from "@/components/utils";

export default {
    components: {
        search
    },
    data () {
        return {
            titDatas: [
                { type: 'selection', label: '', width: '50', align: 'center' },
                { prop: 'type', label: '生效场景', width: '130px', align: 'center', sortable: true},
                { prop: 'merchentId', label: '商户编号', width: '130px', align: 'center' },
                { prop: 'bankCard', label: '银行卡号', width: '150px', align: 'center' },
                { prop: 'phoneNo', label: '手机号', width: '130px', align: 'center' },
                { prop: 'certifyId', label: '身份证号', width: '130px', align: 'center' },
                { prop: 'ip', label: 'IP', width: '130px', align: 'center' },
                { prop: 'terminalNumber', label: '终端号', width: '130px', align: 'center' },
                { prop: 'longitude', label: '经度', width: '130px', align: 'center' },
                { prop: 'tag', label: '纬度', width: '130px', align: 'center' },
                { prop: 'paperNumber', label: '证件号', width: '130px', align: 'center' },
                { prop: 'fixedLine', label: '固话', width: '130px', align: 'center' },
                { prop: 'businessProducts', label: '业务产品', width: '130px', align: 'center' },
                { prop: 'bankType', label: '银行类型', width: '130px', align: 'center' },
                { prop: 'testTerminalNumber', label: '测试终端号', width: '130px', align: 'center' },
                { prop: 'eposTerminalNumber', label: 'EPOS终端号', width: '130px', align: 'center' },
                { prop: 'webUrl', label: '网址', width: '130px', align: 'center' },
                { prop: 'statusName', label: '状态', width: '130px', align: 'center' },
                { prop: 'activeDate', label: '生效时间', width: '170px', align: 'center' },
                { prop: 'expiryDate', label: '到期时间', width: '170px', align: 'center' },
                { prop: 'remarks', label: '备注', align: 'center' },
                { prop: 'createTime', label: '创建时间', width: '170px', align: 'center' },
                { prop: 'updateTime', label: '更新时间', width: '170px', align: 'center' },
                { prop: 'updateBy', label: '操作员', width: '170px', align: 'center' }
            ],
            tableData: [],
            isButtons:{
                showSearchBtn: false,
                showAddBtn: false,
                showDelBtn: false,
                showImportBtn: false,
                showDownloadBtn: false
            },

            searchForm:{
                startTime: '',
                endTime: '',
                effectiveScene: '', //生效场景
                status: '', //状态
                idCard: '', //身份证号
                bankNumber: '', //银行卡号
                phoneNumber: '', //手机号
                ip: '', //ip
                terminalNumber: '', //终端号
                customerNumber: '', //商户编号
                longitude: '', //经度
                dimension: '', // 纬度
                paperNumber: '', //证件号
                fixedLine: '', //固话

                businessProducts: '', //业务产品
                bankType: '', //银行类型
                testTerminalNumber: '', //测试终端号
                eposTerminalNumber: '', //EPOS终端号
                webUrl: '' //网址
            },
            searchParamsChecked: {
                IDCardChecked: true,
                bankNumberChecked: true,
                phoneNumberChecked: true,
                IPChecked: true,
                terminalNumberChecked: true,
                customerNumberChecked: true,
                longitudeChecked: true,
                dimensionChecked: true,
                paperNumberChecked: true,
                fixedLineChecked: true,
                businessProductsChecked: true,
                bankTypeChecked: true,
                testTerminalNumberChecked: true,
                eposTerminalNumberChecked: true,
                webUrlChecked: true
            },
            searchParamsShow: {
                idCard: false, //身份证号
                bankNumber: false, //银行卡号
                phoneNumber: false, //手机号
                ip: false, //ip
                terminalNumber: false, //终端号
                customerNumber: false, //商户编号
                longitude: false, //经度
                dimension: false, // 纬度
                paperNumber: false, //证件号
                fixedLine: false, //固话
                businessProducts: false, //业务产品
                bankType: false, //银行类型
                testTerminalNumber: false, //测试终端号
                eposTerminalNumber: false, //EPOS终端号
                webUrl: false //网址
            },
            searchTypeList: [],
            page: {
                isShowSizeChange: false,
                totalCount: 0,
                currentPage: 1,
                pageSize: 20,
                sizeList: [10, 20, 30, 40]
            },
            mdNumber: "",
            startNum: "",
            endNum: "",
            countNoPage: 0,
            totalPage: 0,
            pagenum: 0,
            multipleSelection: [],
            removeArr: [],
            importeWhite: false,
            downloadWhite: false,
            helpTitle: false,
            showHideDownloadBtn: false,
            addFormDialog: false,
            updFormDialog: false,
            updateFormDialog: false,
            form: {
                type: "", //生效场景
                customerNumber: "", //商户编号
                bankNumber: "", //银行卡号
                phoneNumber: "", //手机号
                ip: '', //ip
                idCard: '', //身份证号
                terminalNumber: '', //终端号
                longitude: '', //经度
                tag: '', // 纬度
                paperNumber: '', //证件号
                fixedLine: '', //固话
                expiryDate: '', //到期时间
                activeDate: '', //生效时间
                remark: '', //备注
            },
            rules: {
                type: [{ required: true, message: " ", trigger: "change" }],
                expiryDate: [{ required: true, message: " ", trigger: "change" }],
                activeDate: [{ required: true, message: " ", trigger: "change" }],
                remark: [{ max: 200, min: 0, message: " ", trigger: "blur" }]
            },
            updateForm: {
                type: "", //生效场景
                customerNumber: "", //商户编号
                bankNumber: "", //银行卡号
                phoneNumber: "", //手机号
                ip: '', //ip
                idCard: '', //身份证号
                terminalNumber: '', //终端号
                longitude: '', //经度
                tag: '', // 纬度
                paperNumber: '', //证件号
                fixedLine: '', //固话
                expiryDate: '', //到期时间
                activeDate: '', //生效时间
                remark: '', //备注
            },
            typeList: [],
            nameFormChange: '',
            titleData: [
                {
                    name: "商户编号",
                    help: "文本格式,六个维度至少有一个不能为空"
                },
                {
                    name: "身份证号",
                    help: "文本格式,六个维度至少有一个不能为空"
                },
                {
                    name: "银行卡号",
                    help: "文本格式,六个维度至少有一个不能为空"
                },
                {
                    name: "手机号",
                    help: "文本格式 选填"
                },
                {
                    name: "IP",
                    help: "线上名单专属 文本格式,只可输入数字、分隔符(点)!六个维度至少有一个不能为空"
                },
                {
                    name: "交易场景",
                    help: "线上名单专属 文本格式,最长100位,6个维度至少有一个不能为空"
                },
                {
                    name: "白名单类型",
                    help: "线上名单专属 枚举:全局白名单、限额限次白名单、规则白名单"
                },
                {
                    name: "业务产品",
                    help: "线上名单专属 枚举:全部产品、一键支付、EPOS、收款宝、网银、投资通、掌柜通、余额支付、会员充值"
                },
                {
                    name: "银行卡类型",
                    help: "线上名单专属 枚举:全部银行卡类型、信用卡、借记卡"
                },
                {
                    name: "支付工具",
                    help: "线上名单专属 枚举:全部支付工具、信同步-ncpayapi、同步-首次API、同步-绑卡API、异步-首次API、异步绑卡API、协议扣款、无卡收银台"
                },
                {
                    name: "业务线",
                    help: "文本格式,选填(默认为线上),枚举:线上、线下"
                },
                {
                    name: "生效日期",
                    help: "时间格式 xxxx-xx-xx xx:xx:xx,精确到秒"
                },
                {
                    name: "到期日期",
                    help: "时间格式 xxxx-xx-xx xx:xx:xx,精确到秒"
                },
                {
                    name: "备注",
                    help: "文本格式，最长200位"
                }
            ],
        }
    },
    created() {
        // 按钮权限
        const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
        this.showSearchBtn = idList.indexOf(142) === -1 ? false : true;
        this.isButtons.showAddBtn = idList.indexOf(145) === -1 ? false : true;
        this.isButtons.showDelBtn = idList.indexOf(146) === -1 ? false : true;
        this.isButtons.showImportBtn = idList.indexOf(147) === -1 ? false : true;
        this.isButtons.showDownloadBtn = idList.indexOf(148) === -1 ? false : true;
    },
    watch: {
        downloadWhite() {
            if (this.downloadWhite === true) {
                this.startNum = 0;
                this.endNum = Math.ceil(this.page.totalCount / this.page.pageSize);
                this.countNoPage = Math.ceil(this.page.totalCount / this.page.pageSize);

                if (this.tableData.length === 0) {
                    this.showHideDownloadBtn = false;
                } else {
                    this.startNum = 1;
                    this.showHideDownloadBtn = true;
                }
            } else {
                this.endNum = 0;
                this.countNoPage = 0;
            }
        }
    },
    methods: {
        searchData() {
            let isValidate = true;
            let required = {
                startTime: this.searchForm.startTime,
                endTime: this.searchForm.endTime,
                effectiveScene: this.searchForm.effectiveScene,
                status: this.searchForm.status
            };
            for (let key in required) {
                if (required[key] == '' || required[key] == null) {
                    document.querySelector(`#${key}`).style.border = "1px solid #f56c6c";
                    isValidate = false;
                } else {
                    document.querySelector(`#${key}`).style.border = "1px solid #dcdfe6";
                }
            }
            if (!isValidate) {
                return false;
            }

            let params = {
                sessionId: localStorage.getItem("SID"),
                startDate: this.searchForm.startTime,
                endDate: this.searchForm.endTime,
                type: this.searchForm.effectiveScene,
                status: this.searchForm.status,
                pageNum: this.page.currentPage,
                pageSize: this.page.pageSize
            };
            if (this.searchParamsShow.idCard) { params.certifyId = this.searchForm.idCard; }
            if (this.searchParamsShow.bankNumber) { params.bankCard = this.searchForm.bankNumber; }
            if (this.searchParamsShow.phoneNumber) { params.phoneNo = this.searchForm.phoneNumber; }
            if (this.searchParamsShow.ip) { params.ip = this.searchForm.ip; }
            if (this.searchParamsShow.terminalNumber) { params.terminalNumber = this.searchForm.terminalNumber; }
            if (this.searchParamsShow.customerNumber) { params.merchentId = this.searchForm.customerNumber; }
            if (this.searchParamsShow.longitude) { params.longitude = this.searchForm.longitude; }
            if (this.searchParamsShow.dimension) { params.tag = this.searchForm.dimension; }
            if (this.searchParamsShow.paperNumber) { params.paperNumber = this.searchForm.paperNumber; }
            if (this.searchParamsShow.fixedLine) { params.fixedLine = this.searchForm.fixedLine; }
            if (this.searchParamsShow.businessProducts) { params.businessProducts = this.searchForm.businessProducts; }
            if (this.searchParamsShow.bankType) { params.bankType = this.searchForm.bankType; }
            if (this.searchParamsShow.testTerminalNumber) { params.testTerminalNumber = this.searchForm.testTerminalNumber; }
            if (this.searchParamsShow.eposTerminalNumber) { params.eposTerminalNumber = this.searchForm.eposTerminalNumber; }
            if (this.searchParamsShow.webUrl) { params.webUrl = this.searchForm.webUrl; }

            this.$axios.post('/whiteName/queryWhiteName', qs.stringify(params))
            .then(res => {
                this.tableData = res.data.data.result;
                this.totalPage = res.data.data.pages;
                this.page.totalCount = parseInt(res.data.data.total);
                this.tableData.forEach((ele, i) => {
                    Object.keys(ele).forEach(v=>{
                        //  bankCard 银行卡号 phoneNo 手机号 certifyId 身份证号 fixedLine 固话
                        if (v === 'bankCard' || v === "phoneNo" || v === "certifyId" || v === 'fixedLine') {
                            let newVal = desensitizationVal(v, this.tableData[i][v])
                            let newColName = v + 'Copy'
                            if (newVal !== '') {
                                ele[newColName] = newVal
                            } else {
                                ele[newColName] = this.tableData[i][v];
                            }
                        }
                    })
                });
                console.log(JSON.stringify(this.tableData, null, 2))
            }).catch(error => {
                console.log(error);
            });
        },
        // 设置默认时间
        initSetTime() {
            let date = new Date();
            let y = date.getFullYear();
            let m = '0' + (date.getMonth() + 1);
            let d = '0' + date.getDate();
            this.searchForm.startTime = y + '-' + m.substring(m.length-2, m.length) + '-' + d.substring(d.length-2, d.length) + ' ' + '00:00:00';
            this.searchForm.endTime = y + '-' + m.substring(m.length-2, m.length) + '-' + d.substring(d.length-2, d.length) + ' ' + '23:59:59';
        },
        resetForm() {
            this.initSetTime();
            this.resetSearchData();
            this.searchParamsShow.idCard = false;
            this.searchParamsShow.bankNumber = false;
            this.searchParamsShow.phoneNumber = false;
            this.searchParamsShow.ip = false;
            this.searchParamsShow.terminalNumber = false;
            this.searchParamsShow.customerNumber = false;
            this.searchParamsShow.longitude = false;
            this.searchParamsShow.dimension = false;
            this.searchParamsShow.paperNumber = false;
            this.searchParamsShow.fixedLine = false;
            this.searchParamsShow.businessProducts = false;
            this.searchParamsShow.bankType = false;
            this.searchParamsShow.testTerminalNumber = false;
            this.searchParamsShow.eposTerminalNumber = false;
            this.searchParamsShow.webUrl = false;
        },
        resetSearchData() {
            this.searchForm.startTime = "";
            this.searchForm.endTime = "";
            this.searchForm.effectiveScene = "";
            this.searchForm.status = "";
            this.searchForm.idCard = "";
            this.searchForm.bankNumber = "";
            this.searchForm.phoneNumber = "";
            this.searchForm.ip = "";
            this.searchForm.terminalNumber = "";
            this.searchForm.customerNumber = "";
            this.searchForm.longitude = "";
            this.searchForm.dimension = "";
            this.searchForm.paperNumber = "";
            this.searchForm.fixedLine = "";
            this.searchForm.businessProducts = "";
            this.searchForm.bankType = "";
            this.searchForm.testTerminalNumber = "";
            this.searchForm.eposTerminalNumber = "";
            this.searchForm.webUrl = "";

            this.searchParamsChecked.IDCardChecked = true;
            this.searchParamsChecked.bankNumberChecked = true;
            this.searchParamsChecked.phoneNumberChecked = true;
            this.searchParamsChecked.IPChecked = true;
            this.searchParamsChecked.terminalNumberChecked = true;
            this.searchParamsChecked.customerNumberChecked = true;
            this.searchParamsChecked.longitudeChecked = true;
            this.searchParamsChecked.dimensionChecked = true;
            this.searchParamsChecked.paperNumberChecked = true;
            this.searchParamsChecked.fixedLineChecked = true;
            this.searchParamsChecked.businessProductsChecked = true;
            this.searchParamsChecked.bankTypeChecked = true;
            this.searchParamsChecked.testTerminalNumberChecked = true;
            this.searchParamsChecked.eposTerminalNumberChecked = true;
            this.searchParamsChecked.webUrlChecked = true;
        },
        getQueryEnum(param) {
            let type = ""
            let listName = ""
            if (arguments.length >= 2) {
                type = arguments[0]
                listName = arguments[1]
            } else {
                type = param.enumType
                listName = param.list
            }
            this.$axios.post( "/SysConfigController/queryEnum",
                qs.stringify({
                    sessionId: localStorage.getItem("SID"),
                    type: type
                })
            ).then(res => {
                this[listName] = res.data;
                this.searchForm.effectiveScene = res.data[0].syscode;
                if (listName === "searchTypeList") {
                    this.searchForm.effectiveScene = res.data[0].syscode
                    this.typeChange(this.searchForm.effectiveScene);
                }
                if (listName === "typeList") {
                    this.form.type = res.data[0].syscode
                }
            });
        },
        typeChange(val) {
            switch (val) {
                case '1':
                    this.searchParamsShow.idCard = true; //身份证号
                    this.searchParamsShow.bankNumber = true; //银行卡号
                    this.searchParamsShow.phoneNumber = true; //手机号
                    this.searchParamsShow.ip = true; //ip
                    this.searchParamsShow.terminalNumber = true; //终端号
                    this.searchParamsShow.customerNumber = true; //商户编号
                    this.searchParamsShow.longitude = true; //经度
                    this.searchParamsShow.dimension = true; // 纬度
                    this.searchParamsShow.paperNumber = true; //证件号
                    this.searchParamsShow.fixedLine = true; //固话
                    this.searchParamsShow.businessProducts = false; //业务产品
                    this.searchParamsShow.bankType = false; //银行类型
                    this.searchParamsShow.testTerminalNumber = false; //测试终端号
                    this.searchParamsShow.eposTerminalNumber = false; //EPOS终端号
                    this.searchParamsShow.webUrl = false; //网址
                    break;
                case '2':
                    this.searchParamsShow.idCard = false;
                    this.searchParamsShow.bankNumber = false;
                    this.searchParamsShow.phoneNumber = false;
                    this.searchParamsShow.ip = false;
                    this.searchParamsShow.terminalNumber = false;
                    this.searchParamsShow.customerNumber = true;
                    this.searchParamsShow.longitude = false;
                    this.searchParamsShow.dimension = false;
                    this.searchParamsShow.paperNumber = false;
                    this.searchParamsShow.fixedLine = false;
                    this.searchParamsShow.businessProducts = false;
                    this.searchParamsShow.bankType = false;
                    this.searchParamsShow.testTerminalNumber = false;
                    this.searchParamsShow.eposTerminalNumber = false;
                    this.searchParamsShow.webUrl = false;
                    break;
                case '3':
                    this.searchParamsShow.idCard = false;
                    this.searchParamsShow.bankNumber = true;
                    this.searchParamsShow.phoneNumber = false;
                    this.searchParamsShow.ip = false;
                    this.searchParamsShow.terminalNumber = false;
                    this.searchParamsShow.customerNumber = true;
                    this.searchParamsShow.longitude = false;
                    this.searchParamsShow.dimension = false;
                    this.searchParamsShow.paperNumber = false;
                    this.searchParamsShow.fixedLine = false;
                    this.searchParamsShow.businessProducts = true;
                    this.searchParamsShow.bankType = true;
                    this.searchParamsShow.testTerminalNumber = true;
                    this.searchParamsShow.eposTerminalNumber = true;
                    this.searchParamsShow.webUrl = false;
                    break;
                case '4':
                    this.searchParamsShow.idCard = false;
                    this.searchParamsShow.bankNumber = false;
                    this.searchParamsShow.phoneNumber = false;
                    this.searchParamsShow.ip = false;
                    this.searchParamsShow.terminalNumber = false;
                    this.searchParamsShow.customerNumber = true;
                    this.searchParamsShow.longitude = false;
                    this.searchParamsShow.dimension = false;
                    this.searchParamsShow.paperNumber = false;
                    this.searchParamsShow.fixedLine = false;
                    this.searchParamsShow.businessProducts = false;
                    this.searchParamsShow.bankType = false;
                    this.searchParamsShow.testTerminalNumber = false;
                    this.searchParamsShow.eposTerminalNumber = false;
                    this.searchParamsShow.webUrl = false;
                    break;
                case '5':
                    this.searchParamsShow.idCard = false;
                    this.searchParamsShow.bankNumber = false;
                    this.searchParamsShow.phoneNumber = false;
                    this.searchParamsShow.ip = false;
                    this.searchParamsShow.terminalNumber = false;
                    this.searchParamsShow.customerNumber = true;
                    this.searchParamsShow.longitude = false;
                    this.searchParamsShow.dimension = false;
                    this.searchParamsShow.paperNumber = false;
                    this.searchParamsShow.fixedLine = false;
                    this.searchParamsShow.businessProducts = false;
                    this.searchParamsShow.bankType = false;
                    this.searchParamsShow.testTerminalNumber = false;
                    this.searchParamsShow.eposTerminalNumber = false;
                    this.searchParamsShow.webUrl = false;
                    break;
                case '6':
                    this.searchParamsShow.idCard = false;
                    this.searchParamsShow.bankNumber = false;
                    this.searchParamsShow.phoneNumber = false;
                    this.searchParamsShow.ip = false;
                    this.searchParamsShow.terminalNumber = false;
                    this.searchParamsShow.customerNumber = true;
                    this.searchParamsShow.longitude = false;
                    this.searchParamsShow.dimension = false;
                    this.searchParamsShow.paperNumber = false;
                    this.searchParamsShow.fixedLine = false;
                    this.searchParamsShow.businessProducts = false;
                    this.searchParamsShow.bankType = false;
                    this.searchParamsShow.testTerminalNumber = false;
                    this.searchParamsShow.eposTerminalNumber = false;
                    this.searchParamsShow.webUrl = true;
                    break;
            }
        },
        // 添加
        addbtn() {
            this.addFormDialog = true;
            // 获取起始时间和结束时间
            var date = new Date();
            var year = date.getFullYear(); //获取当前年份
            var mon = "0" + (date.getMonth() + 1); //获取当前月份
            var da = "0" + date.getDate(); //获取当前日
            var day = date.getDay(); //获取当前星期几
            var h = "0" + date.getHours(); //获取小时
            var m = "0" + date.getMinutes(); //获取分钟
            var s = "0" + date.getSeconds(); //获取秒

            this.form.time = year + "-" + mon.substring(mon.length - 2, mon.length) + "-" +
                da.substring(da.length - 2, da.length) + " " + h.substring(h.length - 2, h.length) + ":" +
                m.substring(m.length - 2, m.length) + ":" + s.substring(s.length - 2, s.length);
            var endyear = year + 3;
            this.form.endTime = endyear + "-" + mon.substring(mon.length - 2, mon.length) + "-" +
                da.substring(da.length - 2, da.length) + " " + h.substring(h.length - 2, h.length) + ":" +
                m.substring(m.length - 2, m.length) + ":" + s.substring(s.length - 2, s.length);
            this.getQueryEnum(117, 'typeList')
        },
        //修改
        getDetail(row) {
            this.updateForm.type = row.type;
            this.updateForm.customerNumber = row.merchentId;
            this.updateForm.bankNumber = row.bankCard;
            this.updateForm.phoneNumber = row.phoneNo;
            this.updateForm.ip = row.ip;
            this.updateForm.idCard = row.certifyId;
            this.updateForm.terminalNumber = row.terminalNumber;
            this.updateForm.longitude = row.longitude;
            this.updateForm.tag = row.tag;
            this.updateForm.paperNumber = row.paperNumber;
            this.updateForm.fixedLine = row.fixedLine;
            this.updateForm.expiryDate = row.expiryDate;
            this.updateForm.activeDate = row.activeDate;
            this.updateForm.remark = row.remark;
            this.getQueryEnum(117, 'typeList');
            this.updFormDialog = true;
        },
        cancelForm(formName) {
            this.$refs[formName].resetFields();
            this[formName + 'Dialog'] = false;
        },
        updateFormSubmit() {
            let isValidate = true;
            let required = {
                updateExpiryDate: this.updateForm.expiryDate,
                updateActiveDate: this.updateForm.activeDate
            };
            for (let key in required) {
                if (required[key] == '') {
                    document.querySelector(`#${key}`).style.border = "1px solid #f56c6c";
                    isValidate = false;
                } else {
                    document.querySelector(`#${key}`).style.border = "1px solid #dcdfe6";
                }
            }
            if (!isValidate) {
                return false;
            }
            this.$axios.post("/whiteName/updateWhiteName", qs.stringify({
                effectiveScene: this.updateForm.type,
                merchentId: this.updateForm.customerNumber,
                bankCard: this.updateForm.bankNumber,
                phoneNo: this.updateForm.phoneNumber,
                ip: this.updateForm.ip,
                certifyId: this.updateForm.idCard,
                terminalNumber: this.updateForm.terminalNumber,
                longitude: this.updateForm.longitude,
                tag: this.updateForm.tag,
                paperNumber: this.updateForm.paperNumber,
                fixedLine: this.updateForm.fixedLine,
                effictiveDate: this.updateForm.activeDate,
                expiryDate: this.updateForm.expiryDate,
                remarks: this.updateForm.remark
            })).then(res => {
                if (res.data.code == 200) {
                    this.$alert(res.data.msg, "提示", {
                        type: "success",
                        confirmButtonText: "确定"
                    });
                    this.listUpdate = false;
                    this.$refs['updateForm'].resetFields();
                    return;
                }
                this.$alert(res.data.msg, "提示", {
                    type: "warning",
                    confirmButtonText: "确定"
                });
            });
        },
        submitForm(formName) {
            let isValidate = true;
            let required = {
                type: this.form.type,
                expiryDate: this.form.expiryDate,
                activeDate: this.form.activeDate
            };
            for (let key in required) {
                if (required[key] == '') {
                    document.querySelector(`#${key}`).style.border = "1px solid #f56c6c";
                    isValidate = false;
                } else {
                    document.querySelector(`#${key}`).style.border = "1px solid #dcdfe6";
                }
            }
            if (!isValidate) {
                return false;
            }
            let atLeastOneUserCode = (this.form.customerNumber == '' && this.form.bankNumber == '' && this.form.phoneNumber == '' &&
                this.form.ip == '' && this.form.idCard == '' && this.form.terminalNumber == '' && this.form.longitude == '' &&
                this.form.tag == '' && this.form.paperNumber == '' && this.form.fixedLine == '') ? false : true;
            if (!atLeastOneUserCode) {
                 this.$alert("请至少输入一项名单的值！", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                    callback: action => {}
                });
                return false;
            }

            var bankNumReg = /^[1-9][0-9]{14,18}$/;
            var idCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            var TEL_REGEX = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
            var EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            var ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;

            if (this.form.bankNumber != '') {
                if (!bankNumReg.test(this.form.bankNumber.split(" ").join(""))) {
                    this.$alert("请输入正确的银行卡号", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                    return;
                }
            }
            if (this.form.ip != '') {
                if (!ipReg.test(this.form.ip.split(" ").join(""))) {
                    this.$alert("请输入正确的ip", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                    return;
                }
            }
            if (this.form.phoneNumber != '') {
                if (!phoneReg.test(this.form.phoneNumber.split(" ").join(""))) {
                    this.$alert("请输入正确的手机号", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                    return;
                }
            }
            if (this.form.idCard != '') {
                if (!idCardReg.test(this.form.idCard.split(" ").join(""))) {
                    this.$alert("请输入正确的身份证号", "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                    return;
                }
            }

            var date = new Date().getTime();
            var endTime = this.form.endTime;

            var date1 = new Date(endTime.split(" ")[0].split("-").join("/") + " " + endTime.split(" ")[1]).getTime();
            if (date1 < date) {
                this.$alert("到期日期不能小于当前时间", "提示", {
                    type: "warning",
                    confirmButtonText: "确定",
                    callback: action => {}
                });
                return;
            }

            this.$refs[formName].validate(valid => {
                if (!valid) {
                    return false;
                }
                this.$axios.post("/whiteName/addWhiteName", qs.stringify({
                    effectiveScene: this.form.type,
                    merchentId: this.form.customerNumber,
                    bankCard: this.form.bankNumber,
                    phoneNo: this.form.phoneNumber,
                    ip: this.form.ip,
                    certifyId: this.form.idCard,
                    terminalNumber: this.form.terminalNumber,
                    longitude: this.form.longitude,
                    tag: this.form.tag,
                    paperNumber: this.form.paperNumber,
                    fixedLine: this.form.fixedLine,
                    effictiveDate: this.form.activeDate,
                    expiryDate: this.form.expiryDate,
                    remarks: this.form.remark
                })).then(res => {
                    if (res.data.code == 200) {
                        this.$alert(res.data.msg, "提示", {
                            type: "success",
                            confirmButtonText: "确定"
                        });
                        this.listAdd = false;
                        this.$refs[formName].resetFields();
                        return;
                    }
                    this.$alert(res.data.msg, "提示", {
                        type: "warning",
                        confirmButtonText: "确定"
                    });
                });
            });
        },
        selectDelUser(row) {
            this.multipleSelection = row;
            this.removeArr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                this.removeArr.push(this.multipleSelection[i].id);
            }
        },
        // 删除
        removeData() {
            if (this.removeArr.length === 0) {
                this.$alert("请至少选中一条需要处理的数据", "提示", {
                    type: "warning",
                    confirmButtonText: "确定"
                });
                return false;
            }

            this.delDialog = true;
            this.$confirm('确认将选中的名单值删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delSaveBtn()
            });
        },
        delSaveBtn() {
            this.$axios.post("/whiteName/deleteWhiteName",
                qs.stringify({
                    ids: this.removeArr.join(',')
                })
            ).then(res => {
                this.$alert(res.data.msg, "提示", {
                    confirmButtonText: "确定",
                });
                this.searchData();
            }).catch(error => {});
        },
        // 导入
        importeWhiteClick() {
            document.getElementById('filename').value = '';
            this.importeWhite = false;
            this.nameFormChange = '';
            this.file = '';
        },
        helpTitleClick() {
            this.helpTitle = !this.helpTitle;
        },
        downTemplet() {
            window.location = encodeURI(this.url + "/src/main/webapp/excel/nameList_white.xlsx");
        },
        fileChange(e) {
            this.file = e.target.files[0];
            this.nameFormChange = e.target.files[0].name;
        },
        upload() {
            if (this.file === "") {
                this.$alert("不能上传空文件", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                    callback: action => {}
                });
                return;
            }
            let formData = new FormData();
            formData.append("file", this.file);
            this.$axios.post("/whiteName/importWhiteName", formData)
            .then(res => {
                if (res.data.code == 200) {
                    this.$alert(res.data.msg, "提示", {
                        confirmButtonText: "确定",
                        type: "success",
                        callback: action => {
                            document.getElementById('filename').value = ''
                            this.importeWhite = false;
                            this.nameFormChange = '';
                            this.file = '';
                        }
                    });
                } else {
                    this.$alert(res.data.msg, "提示", {
                        confirmButtonText: "确定",
                        type: "warning",
                        callback: action => {}
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        },
        startNumInp() {
            if (this.startNum < 0) {
                this.startNum = 0;
            }
        },
        endNumInp() {
            if (this.endNum < 0) {
                this.endNum = 0;
            }
        },
        downloadWhiteClose() {
            this.downloadWhite = false;
            this.startNum = 0;
            this.endNum = 0;
        },
        // 下载
        downloadList() {
            if (this.startNum == 0 || this.endNum == 0) {
                this.$alert('值必须大于或等于1', '提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return false;
            }

            if (this.totalPage == 0 || this.startNum > this.totalPage || this.endNum > this.totalPage) {
                this.$alert('值必须小于或等于总页数，且不能为0', '提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return false;
            }

            if (parseInt(this.startNum)  > parseInt(this.endNum)) {
                this.$alert('起始值需小于等于结束值', '提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return false;
            }

            if (parseInt(this.pageSize) * ((parseInt(this.endNum) - parseInt(this.startNum) + 1)) > 100000) {
                this.$alert('最多只能导出10万条数据', '提示', {
                    type:'warning',
                    confirmButtonText: '确定',
                });
                return false;
            }

            this.$axios.post('/whiteName/checkWhiteNameDownloadParam', qs.stringify({
                startDate: this.searchForm.startTime,
                endDate: this.searchForm.endTime,
                type: this.searchForm.effectiveScene,
                status: this.searchForm.status,
                certifyId: this.searchForm.idCard,
                bankCard: this.searchForm.bankNumber,
                phoneNo: this.searchForm.phoneNumber,
                ip: this.searchForm.ip,
                terminalNumber: this.searchForm.terminalNumber,
                merchentId: this.searchForm.customerNumber,
                longitude: this.searchForm.longitude,
                tag: this.searchForm.dimension,
                paperNumber: this.searchForm.paperNumber,
                fixedLine: this.searchForm.fixedLine,
                pageNum: this.page.currentPage,
                pageSize: this.page.pageSize,
                startPage: this.startNum,
                endPage: this.endNum,
                sumPage: this.totalPage
            })).then(res => {
                if (res.data.code == 200) {
                    window.location = encodeURI(this.url + '/whiteName/exportList?startDate=' + this.searchForm.startTime +
                        '&endDate=' + this.searchForm.endTime + '&type=' + this.searchForm.effectiveScene +
                        '&status=' + this.searchForm.status +
                        '&certifyId=' + this.searchForm.idCard + '&bankCard=' + this.searchForm.bankNumber +
                        '&phoneNo=' + this.searchForm.phoneNumber + '&ip=' + this.searchForm.ip +
                        '&terminalNumber=' + this.searchForm.terminalNumber + '&merchentId=' + this.searchForm.customerNumber +
                        '&longitude=' + this.searchForm.longitude + '&tag=' + this.searchForm.dimension +
                        '&paperNumber=' + this.searchForm.paperNumber + '&fixedLine=' + this.searchForm.fixedLine +
                        '&startRow=' + res.data.data.startRow + '&sumRow=' + res.data.data.sumRow);
                    this.downloadWhite = false;
                    this.startNum = 0;
                    this.endNum = 0;
                } else {
                    this.$alert(res.data.msg, '提示', {
                        type:'warning',
                        confirmButtonText: '确定',
                    });
                }
            });

        }
    },
    mounted() {
        this.initSetTime();
        let searchTypeParam = {
            enumType: 117,
            list: 'searchTypeList'
        };
        this.getQueryEnum(searchTypeParam);
    }
}
</script>
<style lang="less" scoped>
    @import '~@/less/button.less';
    @import '../less/roster.less';
</style>
