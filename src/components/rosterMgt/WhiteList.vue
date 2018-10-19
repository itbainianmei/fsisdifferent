<template>
<!--白名单-->
  <div>
    <div class="searchContent">
      <div class="searchContentLeft hideTimeRightIcon">
        <div class="beginTime">
          <span class="span">更新时间(开始):</span>
          <el-date-picker
            v-model="beginTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 50%;font-size:12px"
            id='beginTimeChoose'
            @focus="beginTimeFocus"
            :clearable="false"
            :editable="false"
          >
          </el-date-picker>
        </div>
        <div class="endTime">

          <span class="span">更新时间(结束):</span>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 50%;font-size:12px"
            id='endTimeChoose'
            @focus="endTimeFocus"
            :clearable="false"
            :editable="false"
          >
          </el-date-picker>
        </div>
        <div class="state">

          <span class="span">状态:</span>
          <el-select v-model="state" filterable placeholder="请选择"  class="editInput">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="payment">

          <span class="span">支付工具:</span>
          <el-select v-model="payment" filterable placeholder="请选择"  class="editInput" @focus='getList'>
            <el-option
              v-for="item in paymentOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="whiteListType">

          <span class="span">白名单类型:</span>
          <el-select v-model="whiteListType" filterable placeholder="请选择"  class="editInput" @focus='getList'>
            <el-option
              v-for="item in whiteListTypeOptions"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="merchantCode">
          <span class="span">
             <el-checkbox v-model="merchantCodeChecked"></el-checkbox>
            商户编号:
          </span>
          <el-input  clearable placeholder="请输入" id='busiNum'  v-model="merchantCode" class="editInput"></el-input>
        </div>
        <div class="IDCard">

          <span class="span">
             <el-checkbox v-model="IDCardChecked"></el-checkbox>
            身份证号:
            </span>
          <el-input  clearable placeholder="请输入" id='idCard' v-model="IDCard" class="editInput" ></el-input>
        </div>
        <div class="bankCard">
          <span class="span">
             <el-checkbox v-model="bankCardChecked"></el-checkbox>
            银行卡号:
          </span>
          <el-input  clearable placeholder="请输入"  id='bankCard' v-model="bankCard" class="editInput"></el-input>
        </div>
        <div class="phone">

          <span class="span">
              <el-checkbox v-model="phoneChecked"></el-checkbox>
            手机号:
          </span>
          <el-input  clearable placeholder="请输入" id='phone' v-model="phone" class="editInput"></el-input>
        </div>
        <div class="ip">

          <span class="span">
             <el-checkbox v-model="ipChecked"></el-checkbox>
            ip:
          </span>
          <el-input  clearable placeholder="请输入" id='ip' v-model="ip" class="editInput"></el-input>
        </div>
        <div class="tradingScene">

          <span class="span">
             <el-checkbox v-model="tradingSceneChecked"></el-checkbox>
            交易场景:
          </span>
          <el-input  clearable placeholder="请输入" id='tradingScene' v-model="tradingScene" class="editInput"></el-input>
        </div>
      </div>
      <div class="searchContentRight">
          <el-button type="primary" class="iconStyle" icon="el-icon-search" style="margin-left: 8px" @click='search' v-if='showSearchBtnWhite'></el-button>
          <el-button type="primary" class="iconStyle iconRefer" icon="el-icon-refresh"  @click='reset'></el-button>
      </div>
    </div>
    <div class="listContent">
      <div class="contentIcon">
        <div class="button">
          <div class="leftButton clear">
            <div class="BotoomBtn leftRadius" data-title='添加' @click="listAddWhiteOpen" v-if='showAddBtnWhite'>
              <div class="addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click='delClick' data-title='删除' v-if='showDelBtnWhite'>
              <div class="removIcon" ></div>
            </div>
            <div class="BotoomBtn" style="border: none" @click='importeWhite= true' data-title='导入' v-if='showImportBtnWhite'>
              <div class="refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius"  @click='downloadWhiteClick' data-title='下载' v-if='showUploadBtnWhite'>
              <div class="downloadIcon" style="margin-top: -1px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTable clear">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="selectDelUser">
          <el-table-column
            type="selection"
            width="50"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="id"
            width="100"
            sortable
            label="名单号"
            align='center'
          >
          </el-table-column>

          <el-table-column
            prop="merchentId"
            label="商户编号"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="bankCard"
            label="银行卡号"
            align='center'
          >
            <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
            {{ scope.row.bankCard }}
            <div slot="reference" >
            {{ scope.row.bankCardCopy }}
            </div>
            </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="手机号"
            align='center'
            >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
              {{ scope.row.phoneNo }}
              <div slot="reference" >
              {{ scope.row.phoneNoCopy }}
              </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="certifyId"
            label="身份证号"
            align='center'
            >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
              {{ scope.row.certifyId }}
              <div slot="reference" >
              {{ scope.row.certifyIdCopy }}
              </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="ip"
            label="ip"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="terminalId"
            label="交易场景"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="statusName"
            label="状态"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="effictiveDateShow"
            label="生效日期"
            width='150'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="expiryDateShow"
            label="到期日期"
            width='150'
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="bizProduct"
            label="业务产品"
            width="120"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="bankCardType"
            width="100px"
            label="银行卡类型"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="payTool"
            label="支付工具"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="createTimeShow"
            label="创建日期"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="updateTimeShow"
            label="更新时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="updateUser"
            label="操作员"
            align='center'
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
            <div class='pagination'>
              <span>每页显示</span>
              <select  class="evetotal"  @change="handleSizeChange">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
              </select>
          </div>
          <div class='paginationRight'>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size= pagenum
                :page-sizes="[10, 20, 30, 40]"
                layout="prev, pager, next"
                :page-count = pageTotalNum>
              </el-pagination>
          </div>
      </div>
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="sizes, prev, pager, next"
          :page-count=pageTotalNum>
        </el-pagination>
      </div> -->
      <!-- 添加白名单 -->
      <el-dialog title="添加白名单" :visible.sync="listAddWhite" width="700px" v-dialogDrag>
        <el-form ref="form" :model="form" :label-position="labelPosition" label-width="100px">
          <div style="width: 100%;height: auto">
          <div class="listAddLeftWhiteForm ">

                <el-form-item label="商户编号:" >
                  <el-input   clearable v-model="form.usercode" style="width: 80%;position:relative" @input="busiNoBlur"  @blur='busiNoBlurEvent' id='busiNoBlurText'></el-input>
                  <div class='busiNoList'>
                      <span class='busiNoListItem' v-for='(item,index) in busiNoListSearch' :key='index' @click='chooseBusiItem'>{{item}}</span>
                  </div>
                  <div class='busiNoErrorText'>
                      <span>该商户编号不存在,请重新输入 </span>
                  </div>
                </el-form-item>

                <el-form-item label="身份证号:">
                  <el-input id='IDCard'   clearable v-model="form.IDCard" style="width: 80%;" :disabled="idCardEnable"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号:">
                  <el-input id='bankCardNum'  v-model="form.bankCard" style="width: 80%;" :disabled="bankCardEnable"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                  <el-input id='phoneNum'  v-model="form.phone" style="width: 80%;" :disabled="phoneNumEnable"></el-input>
                </el-form-item>
                <el-form-item label="ip:">
                  <el-input id='ipNum' clearable v-model="form.ip" style="width: 80%;" :disabled="ipNumEnable"></el-input>
                </el-form-item>
                <el-form-item label="交易场景:">
                  <el-input  clearable v-model="form.tradingScene" style="width: 80%;" :disabled="tradingSceneEnable"></el-input>
                </el-form-item>

          </div>
          <div class="listAddRightWhiteForm">

            <el-form-item label="业务产品:">
              <el-select v-model="form.businessProduct" filterable placeholder="请选择"  class="editInput" @focus='getList' :disabled="businessProductEnable">
                <el-option
                  v-for="item in businessProductList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="银行卡类型:">
              <el-select v-model="form.bankCardType" filterable placeholder="请选择"  class="editInput" @focus='getList' :disabled="bankCardTypeEnable">
                <el-option
                  v-for="item in bankCardTypeList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付工具:">
              <el-select v-model="form.payTool" filterable placeholder="请选择"  class="editInput" @focus='getList' :disabled="payToolEnable">
                <el-option
                  v-for="item in paymentOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名单类型:">
              <el-select v-model="form.whiteListType" filterable placeholder="请选择"  class="editInput" @focus='getList' :disabled="whiteListTypeEnable">
                <el-option
                  v-for="item in whiteListTypeOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务线:">
              <el-select v-model="form.busiline" filterable placeholder="请选择"  class="editInput" @focus='getList' @change="changeEnable">
                <el-option
                  v-for="item in whiteListBusiline"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          </div>
          <div class="listAddBottomForm clear" >
            <!-- <div class="beginTime">
              <span class="span">生效日期(开始):</span>
              <el-date-picker
                v-model="form.beginTimeAdd"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 60%"
                :clearable="false"
                :editable="false"
              >
              </el-date-picker>
            </div> -->
            <div class="endTime hideTimeRightIcon">

              <span class="span">到期日期(结束):</span>
              <el-date-picker
                v-model="form.endTimeAdd"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 60%"
                id='addWhiteChoose'
                @focus="addWhiteFocus"
                :clearable="false"
                :editable="false"
              >
              </el-date-picker>
            </div>
            <el-form-item label="备注:">
              <el-input clearable id="formRemark" :maxlength="200" type="textarea" placeholder="最长长度不能超过200" v-model="form.remark" style="width: 93%"></el-input>
            </el-form-item>
          </div>

        </el-form>

        <div slot="footer">
          <el-button @click='listAddWhiteClose'>取 消</el-button>
          <el-button type="primary" @click='addWhiteList'>确 定</el-button>
        </div>
      </el-dialog>


      <el-dialog title="从Excel导入到白名单" :visible.sync="importeWhite" width="570px" v-dialogDrag>
            <div class="importe ipC"></div><span  class="fontC" style="float:left;margin-right:20px;" @click="uploadTemplet">下载模板</span>
            <div class="prompt ipC" ></div><span class="fontC" @click="helpTitleClick" style="vertical-align: top;">模板格式要求</span>
            <div style="margin-left: 50px;margin-top: 20px;">
                <span>本地文件：</span><el-input placeholder="点击帮助以查看具体格式要求" class="listValInp" v-model="inputFileName"></el-input>
                <label class="ui_button" for="filename">选择</label>
                <form enctype="multipart/form-data" id="formsubmit" style="display: inline-block;">
                    <input  class="formIpt" type="file" id="filename" style="position:absolute;clip:rect(0 0 0 0);" name="filename"  @change='fileUpload' accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'>
                </form>
            </div>
            <span slot="footer" class="dialog-footer" style="padding: 20px;">
                <el-button @click="importeWhiteClick">取 消</el-button>
                <el-button type="primary" @click="uploadFileBtn">导 入</el-button>

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


      <!-- <el-dialog title="从Excel导入到白名单" :visible.sync="importeWhite" width="570px" v-dialogDrag>
        <div>
            <span style='margin-left:15px'>本地文件：</span>
            <el-input placeholder="点击帮助以查看具体格式要求"  class="listValInp" v-model='inputFileName' ></el-input>
            <label class="ui_button" for="filename">选择</label>
            <form enctype="multipart/form-data" id="formsubmit">
               <input  class="formIpt" type="file" id="filename" name="filename" style="position:absolute;clip:rect(0 0 0 0);"  @change='fileUpload' accept='.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' >
            </form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" style="float:left;" @click='uploadTemplet'>下载模板</el-button>
          <el-button type="primary" @click='uploadFileBtn'>确 定</el-button>
          <el-button @click="importeWhite = false">取 消</el-button>
        </span>
        <el-dialog width="800px" title="导入的文件格式要求" :visible.sync="innerVisible" append-to-body v-dialogDrag>
              <table class="importData">


                  <tr>
                      <th></th>
                      <td>
                         </span>
                      </td>
                  </tr>
                  <tr>
                      <th>白名单类型</th>
                      <td>
                        <span></span>
                      </td>
                  </tr>
                  <tr>
                      <th>业务产品</th>
                      <td>
                        <span></span>
                      </td>
                  </tr>
                  <tr>
                      <th>银行卡类型</th>
                      <td>
                        <span></span>
                      </td>
                  </tr>
                  <tr>
                      <th>支付工具</th>
                      <td>
                        <span></span>
                      </td>
                  </tr>
                  <tr>
                      <th>业务线</th>
                      <td>

                      </td>
                  </tr>
                   <tr>
                      <th>生效日期</th>
                      <td>

                      </td>
                  </tr>
                   <tr>
                      <th>到期日期</th>
                      <td>
                        时间格式 xxxx-xx-xx xx:xx:xx,精确到秒
                      </td>
                  </tr>
                   <tr>
                      <th>备注</th>
                      <td>

                      </td>
                  </tr>
              </table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="innerVisible = false">已了解</el-button>
              </span>
        </el-dialog> -->
      <!-- </el-dialog> -->


      <el-dialog title="白名单查询：分页选择下载" :visible.sync="downloadWhite" width="30%" v-dialogDrag>
            <div style="text-align: center; margin-bottom:20px;">
              选择下载从
              <input type="number" min="0" class="downClass" v-model="startno" @input='startNumInp'>
              到
              <input type="number" min="0"  :max="this.pageTotalNum" class="downClass" v-model="endpageno" @input='endNumInp'>
              页的数据
            </div>
            <h4 style="text-align: center">当前共<span>{{this.pageTotalNum}}</span>页</h4>
        <span slot="footer" class="dialog-footer">
          <el-button @click="downloadWhiteClose">取 消</el-button>
          <el-button type="primary" @click='whiteDownLoad' v-show='showUploadBtnHide'>下 载</el-button>
        </span>
      </el-dialog>

      <el-dialog title="提示" :visible.sync="deltelDialog" width="30%" v-dialogDrag>
            <div style='width:100%;text-align:center'>
              <p><i class='el-icon-warning' style='color:#F1F2F5;font-size:25px;'></i></p>
              <p>确定删除文件吗?</p>
            </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deltelDialog = false">取 消</el-button>
          <el-button type="primary" @click='deltelSaveBtn'>确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { card, phone, idCard } from "../utils";
export default {
  name: "白名单",
  data() {
    return {
      showSearchBtnWhite: true,
      showAddBtnWhite: true,
      showDelBtnWhite: true,
      showImportBtnWhite: true,
      showUploadBtnWhite: true,
      helpTitle: false,
      showUploadBtnHide: true,
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
          help:
            "线上名单专属 文本格式,只可输入数字、分隔符(点)!六个维度至少有一个不能为空"
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
          help:
            "线上名单专属 枚举:全部产品、一键支付、EPOS、收款宝、网银、投资通、掌柜通、余额支付、会员充值"
        },
        {
          name: "银行卡类型",
          help: "线上名单专属 枚举:全部银行卡类型、信用卡、借记卡"
        },
        {
          name: "支付工具",
          help:
            "线上名单专属 枚举:全部支付工具、信同步-ncpayapi、同步-首次API、同步-绑卡API、异步-首次API、异步绑卡API、协议扣款、无卡收银台"
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
      beginTimeAdd: "",
      endTimeAdd: "",
      beginTime: "",
      endTime: "",
      currentPage: 1,
      options: [
        { value: "全部", label: "全部" },
        { value: "生效", label: "生效" },
        { value: "未生效", label: "未生效" }
      ],
      state: "",
      paymentOptions: [],

      payment: "",
      whiteListTypeOptions: [],
      businessProductList: [],
      bankCardTypeList: [],
      whiteListBusiline: [
        { id: "online", value: "线上", label: "线上" },
        { id: "offline", value: "线下", label: "线下" }
      ],
      whiteListType: "",
      merchantCode: "",
      IDCard: "",
      bankCard: "",
      phone: "",
      ip: "",
      tradingScene: "",
      listAddWhite: false,
      tableData: [],
      delWhiteIDList: [],
      form: {
        usercode: "",
        IDCard: "",
        bankCard: "",
        phone: "",
        ip: "",
        tradingScene: "",
        endTimeAdd: ""
      },
      labelPosition: "right",
      // 商户编号
      merchantCodeChecked: true,
      // 身份证号
      IDCardChecked: true,
      // 银行卡号
      bankCardChecked: true,
      // 手机号
      phoneChecked: true,
      // ip
      ipChecked: true,
      // 交易场景
      tradingSceneChecked: true,
      startnum: "",
      pageTotalNum: 0,
      pageTotalCount: 0,
      importeWhite: false,
      innerVisible: false,
      inputFileName: "",
      file: "",
      downloadWhite: false,
      startno: 0,
      endpageno: 0,
      pagenum: 10,
      deltelDialog: false,
      busiNoListSearch: [],

      idCardEnable: false,
      bankCardEnable: false,
      phoneNumEnable: false,
      ipNumEnable: false,
      tradingSceneEnable: false,
      businessProductEnable: false,
      bankCardTypeEnable: false,
      payToolEnable: false,
      whiteListTypeEnable: false
    };
  },
  created() {
    // 按钮权限
    const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
    this.showSearchBtnWhite = idList.indexOf(142) === -1 ? false : true;
    this.showAddBtnWhite = idList.indexOf(145) === -1 ? false : true;
    this.showDelBtnWhite = idList.indexOf(146) === -1 ? false : true;
    this.showImportBtnWhite = idList.indexOf(147) === -1 ? false : true;
    this.showUploadBtnWhite = idList.indexOf(148) === -1 ? false : true;
  },
  watch: {
    listAddWhite() {
      // if(this.listAddWhite === false){
      //   this.form.usercode = ''
      //   this.form.IDCard = ''
      //   this.form.bankCard = ''
      //   this.form.phone = ''
      //   this.form.ip = ''
      //   this.form.tradingScene = ''
      //   this.form.businessProduct = ''
      //   this.form.bankCardType= ''
      //   this.form.payTool = ''
      //   this.form.whiteListType = ''
      //   this.form.busiline = ''
      //   this.form.beginTimeAdd = ''
      //   this.form.endTimeAdd = ''
      //   this.form.remark = ''
      // }
      if (this.listAddWhite === true) {
        var dates = new Date();
        var year = dates.getFullYear();
        var mon = "0" + (dates.getMonth() + 1);
        var da = "0" + dates.getDate();
        var day = dates.getDay();
        var hh = "0" + dates.getHours();
        var mm = "0" + dates.getMinutes();
        var ss = "0" + dates.getSeconds();

        this.form.beginTimeAdd =
          year +
          "-" +
          mon.substring(mon.length - 2, mon.length) +
          "-" +
          da.substring(da.length - 2, da.length) +
          " " +
          hh.substring(hh.length - 2, hh.length) +
          ":" +
          mm.substring(mm.length - 2, mm.length) +
          ":" +
          ss.substring(ss.length - 2, ss.length);
        var endyear = year + 3;
        this.form.endTimeAdd =
          endyear +
          "-" +
          mon.substring(mon.length - 2, mon.length) +
          "-" +
          da.substring(da.length - 2, da.length) +
          " " +
          hh.substring(hh.length - 2, hh.length) +
          ":" +
          mm.substring(mm.length - 2, mm.length) +
          ":" +
          ss.substring(ss.length - 2, ss.length);
      }
    },
    // 商户编号
    merchantCodeChecked(val) {
      if (!val) {
        document.querySelector("#busiNum").setAttribute("readOnly", "true");
        document.querySelector("#busiNum").value = "";
        this.merchantCode = "";
      } else {
        document.querySelector("#busiNum").removeAttribute("readOnly");
      }
    },
    // 身份证号
    IDCardChecked(val) {
      if (!val) {
        document.querySelector("#idCard").setAttribute("readOnly", "true");
        document.querySelector("#idCard").value = "";
        this.IDCard = "";
      } else {
        document.querySelector("#idCard").removeAttribute("readOnly");
      }
    },
    // 银行卡号
    bankCardChecked(val) {
      if (!val) {
        document.querySelector("#bankCard").setAttribute("readOnly", "true");
        document.querySelector("#bankCard").value = "";
        this.bankCard = "";
      } else {
        document.querySelector("#bankCard").removeAttribute("readOnly");
      }
    },
    // 手机号
    phoneChecked(val) {
      if (!val) {
        document.querySelector("#phone").setAttribute("readOnly", "true");
        document.querySelector("#phone").value = "";
        this.phone = "";
      } else {
        document.querySelector("#phone").removeAttribute("readOnly");
      }
    },
    // ip
    ipChecked(val) {
      if (!val) {
        document.querySelector("#ip").setAttribute("readOnly", "true");
        document.querySelector("#ip").value = "";
        this.ip = "";
      } else {
        document.querySelector("#ip").removeAttribute("readOnly");
      }
    },
    // 交易场景
    tradingSceneChecked(val) {
      if (!val) {
        document
          .querySelector("#tradingScene")
          .setAttribute("readOnly", "true");
        document.querySelector("#tradingScene").value = "";
        this.tradingScene = "";
      } else {
        document.querySelector("#tradingScene").removeAttribute("readOnly");
      }
    }
  },
  methods: {
    downloadWhiteClick() {
      this.downloadWhite = true;
      this.startno = 0;
      this.endpageno = this.pageTotalNum;
      // this.pageTotalCount = Math.ceil( this.pageTotalNum/this.pagenum)

      if (this.tableData.length === 0) {
        this.showUploadBtnHide = false;
      } else if (this.tableData.length !== 0) {
        this.startno = 1;
        this.showUploadBtnHide = true;
      }
    },
    // 商户编号验证
    busiNoBlur() {
      this.$axios
        .post(
          "/OfflineChecklistController/easyInquiry",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            merchantId: this.form.usercode
          })
        )
        .then(res => {
          this.importeWhite = false
          if(res.data.code === 1){
            this.$alert(res.data.message, '系统提示', {
              type: 'success',
              confirmButtonText:'确定',
              callback:action => {

              }
            })

          }else if(res.data.code !== 1){
            this.$alert(res.data.message, '系统提示', {
              type:'warning',
              confirmButtonText:'确定',
              callback:action=>{

              }
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    busiNoBlurEvent(e) {
      //  console.log(111)
      //  document.querySelector('.busiNoList').style.display = 'none'
      //  let ev = e || window.e
      //   ev.preventDefault()
      //   ev.stopPropagation()

      //   ev.cancelBubble  = true

      let arr = [];
      if (this.form.usercode !== "") {
        this.$axios
          .post(
            "/OfflineChecklistController/easyInquiry",
            qs.stringify({
              sessionId: localStorage.getItem("SID"),
              merchantId: this.form.usercode
            })
          )
          .then(res => {
            if (res.data.ids.length === 0) {
              document.querySelector(".busiNoErrorText").style.display =
                "block";
            } else if (res.data.ids.length !== 0) {
              res.data.ids.forEach(ele => {
                if (this.form.usercode === ele) {
                  arr.push(ele);
                }
              });
              if (arr.length !== 0) {
                document.querySelector(".busiNoErrorText").style.display =
                  "none";
              }
            }
          });
      } else if (this.form.usercode === "") {
        document.querySelector(".busiNoErrorText").style.display = "none";
      }
    },
    chooseBusiItem(e) {
      this.form.usercode = e.target.innerText;
      document.querySelector(".busiNoList").style.display = "none";
      document.querySelector(".busiNoErrorText").style.display = "none";
    },
    helpTitleClick() {
      this.helpTitle = !this.helpTitle;
    },
    handleSizeChange(val) {
      this.pagenum = parseInt(val.target.value);
      this.search();
    },
    handleCurrentChange(val) {
      this.startnum = val;
      this.search();
    },
    selectChange() {},
    selectDelUser(val) {
      this.delWhiteIDList = [];
      val.forEach(ele => {
        this.delWhiteIDList.push(ele.id);
      });
    },
    fileUpload(e) {
      // console.log(e.target.files[0])
      this.inputFileName = e.target.files[0].name;
      this.file = e.target.files[0];
    },
    importeWhiteClick() {
      document.getElementById('filename').value = '';
      this.importeWhite = false;
      this.file = "";
      this.inputFileName = "";
    },
    uploadFileBtn() {
      // console.log(this.file)
      if (this.file === "") {
        this.$alert("不能上传空文件", "提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }
      let formData = new FormData();
      formData.append("file", this.file);

      this.$axios
        .post(
          "/WhiteNameListController/importWhiteList?sessionId=" +
            localStorage.getItem("SID"),
          formData
        )
        .then(res => {
          if (res.data.code === 1) {
            this.$alert(res.data.message, "提示", {
              type: "success",
              confirmButtonText: "确定",
              callback: action => {
                document.getElementById('filename').value = '';
                this.importeWhite = false;
                this.file = "";
                this.inputFileName = "";
              }
            });
          } else if (res.data.code !== 1) {
            this.$alert(res.data.message, "提示", {
              type: "warning",
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadTemplet() {
      window.location = encodeURI(
        this.uploadBaseUrl + "/WhiteNameListController/exportWhiteModel"
      );
    },
    downloadWhiteClose() {
      this.downloadWhite = false;
      this.startno = 0;
      this.endpageno = 0;
    },
    whiteDownLoad() {
      //console.log(this.state)
      if (parseInt(this.startno) > parseInt(this.endpageno)) {
        this.$alert("起始值需小于等于结束值", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      if (
        parseInt(this.pagenum) *
          (parseInt(this.endpageno) - parseInt(this.startno) + 1) >
        100000
      ) {
        this.$alert("最多只能导出10万条数据", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      if (this.pagenum === undefined || this.pagenum === "") {
        this.pagenum = 10;
      }

      if (this.state === "") {
        let paramsStr = (this.urlEncode(this.searchForm())).slice(1)
        window.location = encodeURI(this.uploadBaseUrl + '/WhiteNameListController/exportWhiteList?startDate=' + paramsStr)
        // window.location = encodeURI(
        //   this.uploadBaseUrl +
        //     "/WhiteNameListController/exportWhiteList?startDate=" +
        //     this.beginTime +
        //     "&startnum=" +
        //     this.startno +
        //     "&endnum=" +
        //     this.endpageno +
        //     "&pagenum=" +
        //     this.pagenum +
        //     "&endDate=" +
        //     this.endTime +
        //     "&payTool=" +
        //     this.payment +
        //     "&type=" +
        //     this.whiteListType +
        //     "&merchentId=" +
        //     this.merchantCode +
        //     "&bankCard=" +
        //     this.bankCard +
        //     "&phoneNo=" +
        //     this.phone +
        //     "&certifyId=" +
        //     this.IDCard +
        //     "&Ip=" +
        //     this.ip +
        //     "&terminalId=" +
        //     this.tradingScene
        // );
        this.downloadWhite = false;
      } else if (this.state !== "") {
        if (this.state == "生效") {
          this.state = parseInt(1);
        } else if (this.state == "未生效") {
          this.state = parseInt(0);
        }

        let paramsStr = (this.urlEncode(this.searchForm())).slice(1)
        window.location = encodeURI(this.uploadBaseUrl + '/WhiteNameListController/exportWhiteList?startDate=' + paramsStr)
        // window.location = encodeURI(
        //   this.uploadBaseUrl +
        //     "/WhiteNameListController/exportWhiteList?startDate=" +
        //     this.beginTime +
        //     "&startnum=" +
        //     this.startno +
        //     "&endnum=" +
        //     this.endpageno +
        //     "&pagenum=" +
        //     this.pagenum +
        //     "&endDate=" +
        //     this.endTime +
        //     "&payTool=" +
        //     this.payment +
        //     "&type=" +
        //     this.whiteListType +
        //     "&status=" +
        //     this.state +
        //     "&merchentId=" +
        //     this.merchantCode +
        //     "&bankCard=" +
        //     this.bankCard +
        //     "&phoneNo=" +
        //     this.phone +
        //     "&certifyId=" +
        //     this.IDCard +
        //     "&Ip=" +
        //     this.ip +
        //     "&terminalId=" +
        //     this.tradingScene
        // );
        this.downloadWhite = false;
      }
    },
    urlEncode(param, key, encode) {
      if (param==null) return ''
      let paramStr = ''
      let t = typeof (param)
      if (t == 'string' || t == 'number' || t == 'boolean') {
          paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param)
      } else {
          for (var i in param) {
              var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
              paramStr += this.urlEncode(param[i], k, encode)
          }
      }
      return paramStr
    },
    searchForm() {
      if (this.merchantCodeChecked === true) {
        this.merchantCodeChecked = parseInt(1);
      } else if (this.merchantCodeChecked === false) {
        this.merchantCodeChecked = parseInt(0);
      }

      if (this.IDCardChecked === false) {
        this.IDCardChecked = parseInt(0);
      } else if (this.IDCardChecked === true) {
        this.IDCardChecked = parseInt(1);
      }

      if (this.bankCardChecked === false) {
        this.bankCardChecked = parseInt(0);
      } else if (this.bankCardChecked === true) {
        this.bankCardChecked = parseInt(1);
      }

      if (this.phoneChecked === false) {
        this.phoneChecked = parseInt(0);
      } else if (this.phoneChecked === true) {
        this.phoneChecked = parseInt(1);
      }

      if (this.ipChecked === false) {
        this.ipChecked = parseInt(0);
      } else if (this.ipChecked === true) {
        this.ipChecked = parseInt(1);
      }

      if (this.tradingSceneChecked === false) {
        this.tradingSceneChecked = parseInt(0);
      } else if (this.tradingSceneChecked === true) {
        this.tradingSceneChecked = parseInt(1);
      }

      if (this.startnum === "") {
        this.startnum = this.currentPage;
      }

      if (this.pagenum === undefined || this.pagenum === "") {
        this.pagenum = 10;
      }

      let searchForm = {};
      searchForm.startnum = this.startnum;
      searchForm.pagenum = this.pagenum;
      searchForm.startDate = this.beginTime;
      searchForm.endDate = this.endTime;
      searchForm.status = this.state;
      searchForm.payTool = this.payment;
      searchForm.type = this.whiteListType;
      searchForm.merchentId = this.merchantCode;
      searchForm.certifyId = this.IDCard;
      searchForm.bankCard = this.bankCard;
      searchForm.phoneNo = this.phone;
      searchForm.Ip = this.ip;
      searchForm.terminalId = this.tradingScene;
      searchForm.merchentIdCheck = this.merchantCodeChecked;
      searchForm.certifyIdCheck = this.IDCardChecked;
      searchForm.bankCardCheck = this.bankCardChecked;
      searchForm.phoneNoCheck = this.phoneChecked;
      searchForm.ipCheck = this.ipChecked;
      searchForm.terminalIdCheck = this.tradingSceneChecked;
      if (searchForm.status === "全部") {
        delete searchForm.status;
      } else if (searchForm.status === "生效") {
        searchForm.status = parseInt(1);
      } else if (searchForm.status === "未生效") {
        searchForm.status = parseInt(0);
      }

      if (searchForm.merchentIdCheck === 0) {
        delete searchForm.merchentIdCheck;
      }

      if (searchForm.certifyIdCheck === 0) {
        delete searchForm.certifyIdCheck;
      }

      if (searchForm.bankCardCheck === 0) {
        delete searchForm.bankCardCheck;
      }

      if (searchForm.phoneNoCheck === 0) {
        delete searchForm.phoneNoCheck;
      }

      if (searchForm.ipCheck === 0) {
        delete searchForm.ipCheck;
      }

      if (searchForm.terminalIdCheck === 0) {
        delete searchForm.terminalIdCheck;
      }

      searchForm.sessionId = localStorage.getItem("SID");
      return searchForm
    },
    search() {
      let searchForm = this.searchForm()

      this.$axios
        .post("/WhiteNameListController/query", qs.stringify(searchForm))
        .then(res => {
          // 商户编号
          if (this.merchantCodeChecked == 1) {
            this.merchantCodeChecked = true;
          } else if (this.merchantCodeChecked == 0) {
            this.merchantCodeChecked = false;
          }
          // 身份证号
          if (this.IDCardChecked === 1) {
            this.IDCardChecked = true;
          } else if (this.IDCardChecked === 0) {
            this.IDCardChecked = false;
          }
          // 银行卡号
          if (this.bankCardChecked === 1) {
            this.bankCardChecked = true;
          } else if (this.bankCardChecked === 0) {
            this.bankCardChecked = false;
          }
          // 手机号
          if (this.phoneChecked === 1) {
            this.phoneChecked = true;
          } else if (this.phoneChecked === 0) {
            this.phoneChecked = false;
          }
          // ip
          if (this.ipChecked === 1) {
            this.ipChecked = true;
          } else if (this.ipChecked === 0) {
            this.ipChecked = false;
          }
          // 交易场景
          if (this.tradingSceneChecked === 1) {
            this.tradingSceneChecked = true;
          } else if (this.tradingSceneChecked === 0) {
            this.tradingSceneChecked = false;
          }

          this.tableData = JSON.parse(res.data.data);
          this.pageTotalNum = parseInt(res.data.count);
          this.tableData.forEach(ele => {
            //console.log(ele.bizProduct)
            // if(ele.status === 0){
            //   ele.status = '未生效'
            // }else if(ele.status === 1){
            //   ele.status = '生效'
            // }
            ele.bankCardCopy = "";

            if (ele.bankCard === "") {
              ele.bankCardCopy = ele.bankCard;
            } else if (ele.bankCard !== "") {
              ele.bankCardCopy = card(ele.bankCard);
            }
            ele.phoneNoCopy = "";
            if (ele.phoneNo === "") {
              ele.phoneNoCopy = ele.phoneNo;
            } else if (ele.phoneNo !== "") {
              ele.phoneNoCopy = phone(ele.phoneNo);
            }
            ele.certifyIdCopy = "";
            if (ele.certifyId === "") {
              ele.certifyIdCopy = ele.certifyId;
            } else if (ele.certifyId !== "") {
              ele.certifyIdCopy = idCard(ele.certifyId);
            }

            this.businessProductList.forEach(item => {
              //console.log(item)
              if (item.key === ele.bizProduct) {
                //console.log(item.value)
                ele.bizProduct = item.value;
              }
            });

            this.bankCardTypeList.forEach(item => {
              if (item.key === ele.bankCardType) {
                ele.bankCardType = item.value;
              }
            });

            this.paymentOptions.forEach(item => {
              if (item.key === ele.payTool) {
                ele.payTool = item.value;
              }
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset() {
      this.initTimeSet();
      this.state = "";
      this.payment = "";
      this.whiteListType = "";
      this.merchantCode = "";
      this.IDCard = "";
      this.bankCard = "";
      this.phone = "";
      this.ip = "";
      this.tradingScene = "";
    },
    listAddWhiteClose() {
      this.listAddWhite = false;
      if (document.querySelector(".busiNoErrorText").style.display == "block") {
        document.querySelector(".busiNoErrorText").style.display = "none";
      }

      this.form.usercode = "";
      this.form.IDCard = "";
      this.form.bankCard = "";
      this.form.phone = "";
      this.form.ip = "";
      this.form.tradingScene = "";
      this.form.businessProduct = "";
      this.form.bankCardType = "";
      this.form.payTool = "";
      this.form.whiteListType = "";
      this.form.busiline = "";
      this.form.beginTimeAdd = "";
      this.form.endTimeAdd = "";
      this.form.remark = "";
      this.idCardEnable = false
      this.bankCardEnable = false
      this.phoneNumEnable = false
      this.ipNumEnable = false
      this.tradingSceneEnable = false
      this.businessProductEnable = false
      this.bankCardTypeEnable = false
      this.payToolEnable = false
      this.whiteListTypeEnable = false
    },

    addWhiteList() {
      var bankNumReg = /^[1-9][0-9]{14,18}$/;
      var idCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      var phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
      var TEL_REGEX = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
      var EMAIL_REGEX = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      var ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;

      if (this.form.usercode === undefined || this.form.usercode === "") {
        if (this.form.IDCard === undefined || this.form.IDCard === "") {
          if (this.form.bankCard === undefined || this.form.bankCard === "") {
            if (this.form.phone === undefined || this.form.phone === "") {
              if (this.form.ip === undefined || this.form.ip === "") {
                if (
                  this.form.tradingScene === undefined ||
                  this.form.tradingScene === ""
                ) {
                  this.$alert("请至少输入一项名单的值", "提示", {
                    type: "warning",
                    confirmButtonText: "确定",
                    callback: action => {}
                  });
                  return;
                }
              }
            }
          }
        }
      }
      if (document.querySelector("#IDCard").value !== "") {
        if (!idCardReg.test(this.form.IDCard)) {
          this.$alert("请输入正确的身份证号", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {}
          });
          return;
        }
      }
      if (document.querySelector("#bankCardNum").value !== "") {
        if (!bankNumReg.test(this.form.bankCard)) {
          this.$alert("请输入正确的银行卡号", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {}
          });
          return;
        }
      }

      if (document.querySelector("#phoneNum").value !== "") {
        if (!phoneReg.test(this.form.phone)) {
          this.$alert("请输入正确的手机号", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {}
          });
          return;
        }
      }
      if (document.querySelector("#ipNum").value !== "") {
        if (!ipReg.test(this.form.ip)) {
          this.$alert("请输入正确的ip", "提示", {
            confirmButtonText: "确定",
            type: "warning",
            callback: action => {}
          });
          return;
        }
      }

      if (
        this.form.usercode !== undefined ||
        this.form.usercode !== "" ||
        this.form.IDCard !== undefined ||
        this.form.IDCard !== "" ||
        this.form.bankCard !== undefined ||
        this.form.bankCard !== "" ||
        this.form.phone !== undefined ||
        this.form.phone !== "" ||
        this.form.ip !== undefined ||
        this.form.ip !== "" ||
        this.form.tradingScene !== undefined ||
        this.form.tradingScene !== ""
      ) {
        if (this.form.endTimeAdd === undefined || this.form.endTimeAdd === "") {
          this.$alert("请选择日期", "提示", {
            type: "warning",
            confirmButtonText: "确定",
            callback: action => {}
          });
          return;
        }
      }

      let dateStart = new Date().getTime();
      let endTime = this.form.endTimeAdd;
      let dateEnd = new Date(
        endTime
          .split(" ")[0]
          .split("-")
          .join("/") +
          " " +
          endTime.split(" ")[1]
      ).getTime();

      if (dateStart > dateEnd) {
        this.$alert("到期日期不能小于当前时间", "提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
        return;
      }

      if (document.querySelector(".busiNoErrorText").style.display == "block") {
        return;
      }

      this.$axios
        .post(
          "/WhiteNameListController/insert",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            merchentId: this.form.usercode,
            certifyId: this.form.IDCard,
            bankCard: this.form.bankCard,
            phoneNo: this.form.phone,
            ip: this.form.ip,
            terminalId: this.form.tradingScene,
            bizProduct: this.form.businessProduct,
            bankCardType: this.form.bankCardType,
            payTool: this.form.payTool,
            type: this.form.whiteListType,
            bizLine: this.form.busiline,
            effictiveDate: this.form.beginTimeAdd,
            expiryDate: this.form.endTimeAdd,
            remark: this.form.remark
          })
        )
        .then(res => {
          if (res.data.code === "1") {
            this.$alert(res.data.message, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.form = {};
                this.listAddWhite = false;
                this.idCardEnable = false
                this.bankCardEnable = false
                this.phoneNumEnable = false
                this.ipNumEnable = false
                this.tradingSceneEnable = false
                this.businessProductEnable = false
                this.bankCardTypeEnable = false
                this.payToolEnable = false
                this.whiteListTypeEnable = false
                this.search();
              }
            });
            return;
          }
          this.$alert(res.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        })
        .catch(error => {
          console.log(error);
        });

      // let merchentIdCheck = 0
      // let certifyIdCheck = 0
      // let bankCardCheck = 0
      // let phoneNoCheck = 0
      // let ipCheck = 0
      // let terminalIdCheck = 0
      // if(this.form.usercode === undefined){
      //     merchentIdCheck = parseInt(0)
      // }else if(this.form.usercode !== undefined){
      //     merchentIdCheck = parseInt(1)
      // }
      // console.log(merchentIdCheck)

      // if(this.form.IDCard === undefined){
      //   certifyIdCheck = parseInt(0)
      // }else if(this.form.IDCard !== undefined){
      //   certifyIdCheck = parseInt(1)
      // }
      // console.log(certifyIdCheck)

      // if(this.form.bankCard === undefined){
      //   bankCardCheck = parseInt(0)
      // }else if(this.form.bankCard !== undefined){
      //   bankCardCheck = parseInt(1)
      // }
      // console.log(bankCardCheck)

      // if(this.form.phone === undefined){
      //   phoneNoCheck = parseInt(0)
      // }else if(this.form.phone !== undefined){
      //   phoneNoCheck = parseInt(1)
      // }
      // console.log(phoneNoCheck)

      // if(this.form.ip === undefined){
      //   ipCheck = parseInt(0)
      // }else if(this.form.ip !== undefined){
      //   ipCheck = parseInt(1)
      // }
      // console.log(ipCheck)

      // if(this.form.tradingScene === undefined){
      //   terminalIdCheck = parseInt(0)
      // }else if(this.form.tradingScene !== undefined){
      //   terminalIdCheck = parseInt(1)
      // }
    },
    listAddWhiteOpen() {
      this.listAddWhite = true;
    },
    delClick() {
      if (this.delWhiteIDList.length === 0) {
        this.$alert("请至少选中一条需要处理的数据", "提示", {
          type: "warning",
          confirmButtonText: "确定",
          callback: action => {}
        });
      } else if (this.delWhiteIDList.length > 0) {
        this.deltelDialog = true;
        // this.$confirm('确定删除文件吗?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
      }
    },
    deltelSaveBtn() {
      this.$axios
        .post(
          "/WhiteNameListController/delete",
          qs.stringify({
            sessionId: localStorage.getItem("SID"),
            id: this.delWhiteIDList.join(",")
          })
        )
        .then(res => {
          this.$alert(res.data.message, "提示", {
            confirmButtonText: "确定",
            callback: action => {
              this.deltelDialog = false;
              this.search();
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 设置默认时间
    initTimeSet() {
      let date = new Date();
      let y = date.getFullYear();
      let m = "0" + (date.getMonth() + 1);
      let d = "0" + date.getDate();
      this.beginTime =
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        " " +
        "00:00:00";
      this.endTime =
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length) +
        " " +
        "23:59:59";
    },
    // 获取下拉框的值
    getList() {
      this.$axios
        .get(
          "/WhiteNameListController/formatMapInit?sessionId=" +
            localStorage.getItem("SID")
        )
        .then(res => {
          this.paymentOptions = res.data.PayTool;
          this.whiteListTypeOptions = res.data.Type;
          this.businessProductList = res.data.BizProduct;
          this.bankCardTypeList = res.data.BankCardType;
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeEnable(value) {
      if (value == 'offline') {
        this.idCardEnable = true
        this.bankCardEnable = true
        this.phoneNumEnable = true
        this.ipNumEnable = true
        this.tradingSceneEnable = true
        this.businessProductEnable = true
        this.bankCardTypeEnable = true
        this.payToolEnable = true
        this.whiteListTypeEnable = true
        this.form.IDCard = "";
        this.form.bankCard = "";
        this.form.phone = "";
        this.form.ip = "";
        this.form.tradingScene = "";
        this.form.businessProduct = "";
        this.form.bankCardType = "";
        this.form.payTool = "";
        this.form.whiteListType = "";
      } else {
        this.idCardEnable = false
        this.bankCardEnable = false
        this.phoneNumEnable = false
        this.ipNumEnable = false
        this.tradingSceneEnable = false
        this.businessProductEnable = false
        this.bankCardTypeEnable = false
        this.payToolEnable = false
        this.whiteListTypeEnable = false
      }
    },
    beginTimeFocus() {
      document.querySelector("#beginTimeChoose").setAttribute("readOnly", true);
    },
    endTimeFocus() {
      document.querySelector("#endTimeChoose").setAttribute("readOnly", true);
    },
    addWhiteFocus() {
      document.querySelector("#addWhiteChoose").setAttribute("readOnly", true);
    },
    startNumInp() {
      if (this.startno < 0) {
        this.startno = 0;
      }
    },
    endNumInp() {
      if (this.endpageno < 0) {
        this.endpageno = 0;
      }
    }
  },
  mounted() {
    this.initTimeSet();
  }
};
</script>
<style　scoped>
.prompt {
  width: 18px;
  height: 18px;
  background-image: url(../../images/prompt.png);
}
.listValInp {
  width: 60%;
  height: 36px;
}
.fontC {
  color: #3dc6b2;
  cursor: pointer;
  line-height: 17px;
}

.importe {
  width: 18px;
  height: 18px;
  background-image: url(../../images/importe.png);
}
.ipC {
  float: left;
  margin-left: 10px;
  margin-right: 5px;
}
.downClass {
  width: 77px;
  height: 29px;
  line-height: 18px;
  margin: 5px;
  border-radius: 19px;
  border: 1px solid #ccc;
  padding: 4px 2px;
  box-sizing: border-box;
}
.searchContent {
  font-size: 13px;
  color: #333333;
  width: 100%;
  padding-top: 30px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 20px;
  border-top: 1px solid #e0e0e0;
}
.searchContentLeft {
  width: 80%;
  /* border-right: 1px solid #e0e0e0; */
  padding-left: 15px;
  display: inline-block;
}
.beginTime,
.endTime,
.state,
.payment,
.whiteListType,
.merchantCode,
.IDCard,
.bankCard,
.phone,
.ip,
.tradingScene {
  display: inline-block;
  margin-bottom: 20px;
  width: 31%;
}
.ip,
.tradingScene {
  margin-bottom: 0;
}
.editInput {
  width: 50%;
}
.span {
  width: 110px;
  text-align: right;
  display: inline-block;
}
.searchContentRight {
  float: right;
  padding-right: 4%;
  padding-top: 45px;
}
.iconStyle {
  display: block;
  height: 36px;
  width: 100px;
  font-size: 20px;
}
.iconRefer {
  margin-top: 20px;
}
.contentIcon {
  height: 70px;
  line-height: 70px;
}
.addIpt {
  border-radius: 50px;
  width: 90%;
  height: 36px;
}
.BotoomBtn {
  width: 44px;
  height: 28px;
  margin: 0;
  margin-left: -1px;
  border: 1px solid #38e139;
  background-color: #fff;
  float: left;
  cursor: pointer;
  position: relative;
}

.BotoomBtn:hover {
  background-color: #38e139;
}

.BotoomBtn:hover::after{
  content: attr(data-title);
  position:absolute;
  top:35px;
  left:0;
  height:26px;
  line-height: 26px;
  width:46px;
  text-align: center;
  font-size:12px;
  color:#333333;
  border:1px solid #e0e0e0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
  z-index: 1;
}

.leftRadius {
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}
.rightRadius {
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
.contentData {
  background-color: #fff;
}
.leftButton {
  float: left;
  margin-left: 80px;
}
.leftButton {
  float: left;
  margin-left: 30px;
  margin-top: 14px;
}
.addIcon {
  background: url(../../images/icon.png) no-repeat 6px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.addIcon:hover {
  background: url(../../images/icon.png) no-repeat 6px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.amendIcon {
  background: url(../../images/icon.png) no-repeat -27px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.amendIcon:hover {
  background: url(../../images/icon.png) no-repeat -27px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.xgImg {
  background: url(../../images/icon.png) no-repeat -37px -7px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  margin-top: 5px;
  border: 1px solid #38e139;
  cursor: pointer;
  border-radius: 5px;
}
.xgImg:hover {
  background: url(../../images/icon.png) no-repeat -37px -32px;
  width: 25px;
  height: 25px;
  margin: 0 auto;
  background-color: #38e139;
  cursor: pointer;
  margin-top: 5px;
  border-radius: 5px;
}
.removIcon {
  background: url(../../images/icon.png) no-repeat -62px -9px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.removIcon:hover {
  background: url(../../images/icon.png) no-repeat -62px -32px;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  margin-top: 4px;
}
.refreshIcon {
  background: url(../../images/import.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.refreshIcon:hover {
  background: url(../../images/import_actived.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.downloadIcon {
  background: url(../../images/export.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
}
.downloadIcon:hover {
  background: url(../../images/export_actived.png) no-repeat;
  width: 44px;
  height: 30px;
  margin: 0 auto;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
}
.active {
  background-color: #38e139;
}
.clear:after {
  clear: both;
  content: ".";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
}
.listAddLeftWhiteForm {
  width: 48%;
  border-right: 1px solid #e0e0e0;
  float: left;
}
.listAddRightWhiteForm {
  width: 48%;
  float: left;
}
.listAddRightWhiteForm .editInput {
  width: 100%;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
.listAddBottomForm {
  border-top: 1px solid #e0e0e0;
  clear: both;
  width: 100%;
}
.listAddBottomForm .beginTime {
  width: 45%;
  margin-top: 20px;
  padding-left: 15px;
}
.listAddBottomForm .endTime {
  width: 46%;
  margin-top: 20px;
  padding-left: 15px;
}
.listAddBottomForm .span {
  width: 100px;
}
.importData {
  text-indent: 15px;
  border-spacing: inherit;
}
.importData tr:nth-child(even) {
  background-color: rgb(244, 244, 244);
}
.importData th {
  text-align: left;
  width: 111px;
}
.importData td {
  padding-left: 28px;
}
.formIpt {
  padding: 0;
  width: 73px;
  height: 31px;
  float: right;
  margin-top: -37px;
  border: 0px;
  margin-right: 30px;
}
.listValInp {
  width: 60%;
  height: 36px;
}
.dataTable {
  margin-left: 10px;
  margin-right: 10px;
}
.ui_button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #409eff;
  border-color: #409eff;
  color: #409eff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 23px;
  font-size: 14px;
  border-radius: 34px;
}
.ui_button:hover {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #409eff;
  border: 1px solid #409eff;
  border-color: #409eff;
  color: #fff;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 9px 23px;
  font-size: 14px;
  border-radius: 34px;
}
.busiNoList {
  width: 80%;
  max-height: 100px;
  position: absolute;
  left: 0;
  top: 38px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  z-index: 10;
  overflow-y: scroll;
  display: none;
}
.busiNoListItem {
  display: block;
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: left;
  text-indent: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #333333;
  cursor: pointer;
}
.busiNoListItem:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
.busiNoList::-webkit-scrollbar {
  display: none;
}
.busiNoErrorText {
  color: red;
  font-size: 12px;
  position: absolute;
  left: 15px;
  top: 25px;
  display: none;
}
</style>
