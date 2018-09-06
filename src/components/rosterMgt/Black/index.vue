<template>
    <div>
        <search :serachForm="searchForm"  @searchData="searchData" @resetForm="resetForm"></search>
        <div class="button">
            <div class="BotoomBtn leftRadius" @click="addbtn" data-title='添加'>
            <div class="btn-icon addIcon" ></div>
            </div>
            <div class="BotoomBtn" @click="removeData" data-title='删除'>
            <div class="btn-icon removIcon"></div>
            </div>
            <div class="BotoomBtn improt-btn" data-title='导入' @click="importeBlack=true">
            <div class="btn-icon refreshIcon"></div>
            </div>
            <div class="BotoomBtn rightRadius" data-title='下载' @click="downloadBlack = true">
            <div class="btn-icon downloadIcon" style="margin-top: -1px;"></div>
            </div>
        </div>
        <div class="dataTable clear">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="selectDelUser">
                <el-table-column v-for="(item, i) in titDatas" :key="i"
                    :prop="typeof item.prop !== 'undefined' ? item.prop : ''"
                    :type="typeof item.type !== 'undefined' ? item.type : ''"
                    :width="typeof item.width !== 'undefined' ? item.width : ''"
                    :align='item.align'
                    :label='item.label'
                    :sortable="typeof item.sortable !== 'undefined' ? item.sortable : false"
                >
                    <template slot-scope="scope" v-if="item.slotScope === 'scope'">
                        <el-popover trigger="hover" placement="top">
                        {{ scope.row.uniqueId }}
                        <div slot="reference" >
                        {{ scope.row.uniqueIdCopy }}
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Page :pageInfo="page"></Page>
    </div>
</template>
<script>
    import qs from "qs";
    import search from './Partial/search.vue';
    export default {
        components: {
            search
        },
        data () {
            return {
                titDatas: [
                    {
                        type: 'selection',
                        width: '50',
                        align: 'center',
                        label: ''
                    },{
                        prop: 'id',
                        width: '130px',
                        align: 'center',
                        label: '生效场景',
                        sortable: true
                    },{
                        prop: 'tag',
                        width: '130px',
                        align: 'center',
                        label: '维度'
                    },{
                        prop: 'uniqueId',
                        width: '150px',
                        label: '名单值',
                        align: 'center'
                    },{
                        prop: 'source',
                        label: '来源',
                        align: 'center',
                        slotScope: 'scope'
                    },{
                        prop: 'statusName',
                        width: '130px',
                        label: '状态',
                        align: 'center'
                    },{
                        prop: 'activesDate',
                        width: '170px',
                        label: '生效时间',
                        align: 'center'
                    },{
                        prop: 'expireDate',
                        width: '170px',
                        label: '到期时间',
                        align: 'center'
                    },{
                        prop: 'createDate',
                        width: '170px',
                        label: '创建时间',
                        align: 'center'
                    },{
                        prop: 'updateDate',
                        width: '170px',
                        label: '更新时间',
                        align: 'center'
                    },{
                        prop: 'modifier',
                        label: '最后操作人员',
                        width: '170px',
                        align: 'center'
                    },{
                        prop: 'remark',
                        label: '备注',
                        align: 'center'
                    }
                ],
                tableData: [],
                isButtons:{
                    showAddBtn: false,
                    showDelBtn: false,
                    showImportBtn: false,
                    showDownloadBtn: false
                },
                searchForm:{
                    beginTime: "",
                    endTime: "", 
                    listVal: "", // 名单值
                    vvalue: "", // 维度
                    cvalue: "", // 状态
                    svalue: "", // 来源
                    effectiveScene: "" // 生效场景
                },
                page: {
                    isShowSizeChange: false,
                    count: 0,
                    currentPage: 1,
                    pageSize: 20,
                    sizeList: [10, 20, 30, 40]
                },
                mdNumber: "",
                startnum: "",
                pagenum: "",
            }
        },
        created() {
            // 按钮权限
            const idList = JSON.parse(localStorage.getItem("ARRLEVEL"));
            this.isButtons.showAddBtn = idList.indexOf(131) === -1 ? false : true;
            this.isButtons.showDelBtn = idList.indexOf(132) === -1 ? false : true;
            this.isButtons.showImportBtn = idList.indexOf(133) === -1 ? false : true;
            this.isButtons.showDownloadBtn = idList.indexOf(134) === -1 ? false : true;
        },
        methods: {
            searchData(form) {
                this.searchForm = form
                var maz = document.getElementById("mdz");
                if (mdz.value === "") {
                    maz.style.border = "1px solid #f56c6c";
                    this.$alert("请输入名单值", "提示", {
                        type: "warning",
                        confirmButtonText: "确定"
                    });
                } else {
                    this.mdNumber = maz.value;
                    maz.style.border = "1px solid #dcdfe6";
                    if (this.startnum == "" || this.startnum == undefined) {
                        this.startnum = this.currentPage;
                    }
                    if (this.pagenum == "" || this.pagenum == undefined) {
                        this.pagenum = 10;
                    }
                    this.$axios
                    .post(
                        "/NameListController/queryList",
                        qs.stringify({
                        sessionId: localStorage.getItem("SID"),
                        startDate: this.searchForm.beginTime,
                        endDate: this.searchForm.endTime,
                        unique: this.searchForm.listVal.split(" ").join(""),
                        tag: this.searchForm.vvalue,
                        status: this.searchForm.cvalue,
                        source: this.searchForm.svalue,
                        type: "black",
                        startnum: parseInt(this.startnum),
                        pagenum: parseInt(this.pagenum)
                        })
                    )
                    .then(res => {
                        this.tableData = JSON.parse(res.data.data);
                        this.countnum = parseInt(res.data.count);
                        this.tableData.forEach(ele => {
                        if (ele.tag == "线上-银行卡号") {
                            ele.uniqueIdCopy = card(ele.uniqueId);
                        } else if (ele.tag == "线上-手机号") {
                            ele.uniqueIdCopy = phone(ele.uniqueId);
                        } else if (ele.tag == "线上-身份证号") {
                            ele.uniqueIdCopy = idCard(ele.uniqueId);
                        } else if (
                            ele.tag !== "线上-银行卡号" ||
                            ele.tag !== "线上-手机号" ||
                            ele.tag !== "线上-身份证号"
                        ) {
                            ele.uniqueIdCopy = ele.uniqueId;
                        }
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            },
            initTimeSet() {
                let date = new Date();
                let y = date.getFullYear();
                let m = "0" + (date.getMonth() + 1);
                let d = "0" + date.getDate();
                this.searchForm.beginTime =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length) +
                    " " +
                    "00:00:00";
                this.searchForm.endTime =
                    y +
                    "-" +
                    m.substring(m.length - 2, m.length) +
                    "-" +
                    d.substring(d.length - 2, d.length) +
                    " " +
                    "23:59:59";
            },
            resetForm(){
                this.initTimeSet();
                this.searchForm.listVal = "";
                this.searchForm.vvalue = "";
                this.searchForm.cvalue = "";
                this.searchForm.svalue = "";
                this.searchForm.effectiveScene = "";
            },
            selectDelUser(val) {
                this.multipleSelection = val;
                this.removeArr = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.removeArr.push(this.multipleSelection[i].id);
                }
            },
            getQueryEnum (type, list) {
                this.$axios
                    .post(
                    "/SysConfigController/queryEnum",
                    qs.stringify({
                        sessionId: localStorage.getItem("SID"),
                        type: type
                    })
                )
                .then(res => {
                    this[list]
                    let obj = {};
                    obj.sysname = "全部";
                    obj.sysconid = "";
                    res.data.unshift(obj);
                    this.veidoos = [];
                    this.veidoos = this.veidoos.concat(res.data);
                });
            }
        },
        mounted() {
            this.initTimeSet();
        }
    }
</script>
<style lang="less" scoped>
    @import '../less/button.less';
    .dataTable {
        margin: 15px 10px 0;
    }
</style>