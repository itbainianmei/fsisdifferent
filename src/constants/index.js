// 黑名单枚举值 各枚举值对应type值
export const BLOCK_ENUM = {
    TYPE: 107, // 生效场景
    TRADE_TAG: 108, // 维度-交易
    MERCHANT_TAG: 109, // 维度-商户
    REFER_CHECK_TAG: 110, // refer核验
    SOURCE: 111
};
// 灰名单枚举值 各枚举值对应type值
export const GRAY_ENUM = {
    TYPE: 113,
    TRADE_TAG: 114, // 维度-交易
    MERCHANT_TAG: 115, // 维度-商户
    REFER_CHECK_TAG: 110, // refer核验
    SOURCE: 116,
    KYC: 'kyc'
};
// 代理商画像枚举值 各枚举值对应type值
export const AGENT_PORTRAIT_ENUM = {
    INDUSTRYATTR: 92, // 行业业绩属性
    AGENCYATTR: 52 // 代理商自然属性一级
};
export const  SILENT_MERCHANT_DATA_ENUM = {
    INDUSTRYATTR: 92, // 行业业绩属性
    AGENCYATTR: 52, // 代理商自然属性一级
    METHOD: 129,
    RESULT: 130
};
// 商户投诉情况统计
export const MERCHANT_COMPLAINT_SATISTICS_ENUM = {
    TAG: 0,
    KYC: 0,
    INDUSTRYATTR: 92,
    ALL: -1
}
// 投诉明细查询
export const MERCHANT_COMPLAINT_DETAIL_ENUM = {
    SOURCE: 125,
    ALL: -1
}
// tx情况统计
export const TX_SATISTICS_ENUM = {
    SOURCE: 126,
}
// 特批事项
export const SPECIAL_SATISTICS_ENUM = {
    SPECIAL_OPTION: 127
}
// 关闭来源
export const CLOSE_SATISTICS_ENUM = {
    CLOSE_SOURCE: 128,
    SOURCE: 116,
    ALL: -1
}
export const DATA_TAG = [
    {syscode: 'kyc', sysname: '商户KYC'},
    {syscode: 92, sysname: '行业业绩属性'},
]
export const TOP_COMPLAINT_SATISTICS_ENUM = {
    INDUSTRYATTR: 92 // 行业业绩属性
}
export const SHOW_TAG_LIST = [
    {
        value: "收单交易金额（亿）/占比",
        label: "收单交易金额（亿）/占比",
        key: "0"
    }, {
        value: "日均收单金额（亿）/占比",
        label: "日均收单金额（亿）/占比",
        key: "1"
    }, {
        value: "出款交易金额（亿）/占比",
        label: "出款交易金额（亿）/占比",
        key: "2"
    },
    {
        value: "毛利(万)/占比",
        label: "毛利(万)/占比",
        key: "3"
    },
    {
        value: "收单交易失败率",
        label: "收单交易失败率",
        key: "4"
    },
    {
        value: "商户投诉金额/商户投诉率(金额)",
        label: "商户投诉金额/商户投诉率(金额)",
        key: "5"
    },
    {
        value: "商户投诉笔数/商户投诉率(笔数)",
        label: "商户投诉笔数/商户投诉率(笔数)",
        key: "6"
    },
    {
        value: "欺诈损失金额(万)",
        label: "欺诈损失金额(万)",
        key: "7"
    },{
        value: "欺诈损失率(0.01BP)",
        label: "欺诈损失率(0.01BP)",
        key: "8"
    },{
        value: "限额限次拦截率",
        label: "限额限次拦截率",
        key: "9"
    },{
        value: "黑名单拦截率",
        label: "黑名单拦截率",
        key: "10"
    },{
        value: "规则拦截率",
        label: "规则拦截率",
        key: "11"
    },{
        value: "风控拦截率",
        label: "风控拦截率",
        key: "12"
    },{
        value: "单笔限额拦截率",
        label: "单笔限额拦截率",
        key: "13"
    },{
        value: "单日限额拦截率",
        label: "单日限额拦截率",
        key: "14"
    },{
        value: "单日限次拦截率",
        label: "单日限次拦截率",
        key: "15"
    },{
        value: "单月限额拦截率",
        label: "单月限额拦截率",
        key: "16"
    },{
        value: "单月限次拦截率",
        label: "单月限次拦截率",
        key: "17"
    }
]
export const SHOW_OPTION_LIST =[
    {
        value: "TOP 10商户",
        label: "TOP 10商户",
        key: "0"
    }, {
        value: "TOP 20商户",
        label: "TOP 20商户",
        key: "1"
    }, {
        value: "TOP 50商户",
        label: "TOP 50商户",
        key: "2"
    },
]
// 枚举状态
export const STATUS = [
    {
        value: "全部",
        label: "全部",
        key: "all"
    }, {
        value: "生效",
        label: "生效",
        key: "1"
    }, {
        value: "未生效",
        label: "未生效",
        key: "0"
    }
]
//处理结果  101全部、102处理成功、103处理失败
export const PROCESS_RESULT_LIST = [
    {
        value: 101,
        label: "全部",
        key: 101
    }, {
        value: 102,
        label: "处理成功",
        key: 102
    }, {
        value: 103,
        label: "处理失败",
        key: 103
    }
]
//处理方式 108全部 104关闭支付接口、105冻结商户状态、106冻结账户状态、107加入黑名单
export const PROCESS_METHOD_LIST = [
    {
        value: 108,
        label: "全部",
        key: 108
    }, {
        value: 104,
        label: "关闭支付接口",
        key: 104
    }, {
        value: 105,
        label: "冻结商户状态",
        key: 105
    }, {
        value: 106,
        label: "冻结账户状态",
        key: 106
    }, {
        value: 107,
        label: "加入黑名单",
        key: 107
    }
]
// 灰名单导入模板
export const GRAY_IMPORT_TEMPLATE =  [
    {
        name: "生效场景",
        help: "交易灰名单、商户灰名单、refer灰名单"
    },
    {
        name: "维度",
        help: "场景为交易灰名单时：商户编号、银行卡号、手机号、IP、身份证号、终端号、经度、纬度、证件号(非身份证)、固定电话；场景为商户灰名单时：商户编号、银行卡号、业务产品、测试终端号、EPOS终端号、银行类型；场景为refer灰名单时：商户编号、网址"
    },
    {
        name: "名单值",
        help: "文本格式不能为空"
    },
    {
        name: "商户KYC",
        help: "文本格式不能为空"
    },
    {
        name: "备注",
        help: "文本格式，不超过200个字符"
    }
]
// 灰名单修改模板
export const GRAY_UPDATE_TEMPLATE =  [
    {
        name: "生效场景",
        help: "交易灰名单、商户灰名单、refer灰名单"
    },
    {
        name: "维度",
        help: "场景为交易灰名单时：商户编号、银行卡号、手机号、IP、身份证号、终端号、经度、纬度、证件号(非身份证)、固定电话；场景为商户灰名单时：商户编号、银行卡号、业务产品、测试终端号、EPOS终端号、银行类型；场景为refer灰名单时：商户编号、网址"
    },
    {
        name: "名单值",
        help: "文本格式不能为空"
    },
    {
        name: "原商户KYC",
        help: "文本格式不能为空"
    },
    {
        name: "修改后商户KYC",
        help: "文本格式不能为空"
    },
    {
        name: "备注",
        help: "文本格式，不超过200个字符"
    }
]
// 黑名单导入模板格式
export const BLACK_IMPORT_TEMPLATE = [
    {
        name: "生效场景",
        help: "交易灰名单、商户灰名单、refer灰名单"
    },
    {
        name: "维度",
        help: "场景为交易灰名单时：商户编号、银行卡号、手机号、IP、身份证号、终端号、经度、纬度、证件号(非身份证)、固定电话；场景为商户灰名单时：商户编号、银行卡号、业务产品、测试终端号、EPOS终端号、银行类型；场景为refer灰名单时：商户编号、网址"
    },
    {
        name: "名单值",
        help: "文本格式不能为空"
    },
    {
        name: "生效日期",
        help: "时间格式xxxx-xx-xx xx:xx:xx 精确到秒"
    },
    {
        name: "到期日期",
        help: "时间格式xxxx-xx-xx xx:xx:xx 精确到秒"
    },
    {
        name: "备注",
        help: "文本格式，不超过200个字符"
    }
]
// 黑名单表头
export const BLOCK_TABLE_HEAD = [
    { type: 'selection',width: '50', align: 'center',label: ''},
    { prop: 'typeName', width: '130px', align: 'center', label: '生效场景',sortable: true},
    { prop: 'tagName', width: '130px', align: 'center', label: '维度'},
    { prop: 'uniqueId', width: '150px', label: '名单值', align: 'center', slotScope: 'scope'},
    { prop: 'sourceName', label: '来源', align: 'center'},
    { prop: 'status', width: '130px', label: '状态', align: 'center'},
    { prop: 'activeDate', width: '170px', label: '生效日期', align: 'center'},
    { prop: 'expireDate', width: '170px', label: '到期日期', align: 'center'},
    { prop: 'remarks', label: '备注', align: 'center'},
    { prop: 'createTime', width: '170px', label: '创建日期', align: 'center'},
    { prop: 'updateTime', width: '170px', label: '更新日期', align: 'center'},
    { prop: 'updateBy', label: '操作员', width: '170px', align: 'center'}
]
// 灰名单表头
export const GRAY_TABLE_HEAD =  [
    { type: 'selection',width: '50', align: 'center',label: ''},
    { prop: 'typeName', width: '130px', align: 'center', label: '生效场景',sortable: true},
    { prop: 'tagName', width: '130px', align: 'center', label: '维度'},
    { prop: 'uniqueId', width: '150px', label: '名单值', align: 'center', slotScope: 'scope'},
    { prop: 'sourceName', label: '来源', align: 'center'},
    { prop: 'kycName', label: '商户KYC', align: 'center'},
    { prop: 'remark', label: '备注', align: 'center'},
    { prop: 'createTime', width: '170px', label: '创建日期', align: 'center'},
    { prop: 'updateTime', width: '170px', label: '更新日期', align: 'center'},
    { prop: 'updateBy', label: '操作员', width: '170px', align: 'center'}
]
// 代理商表头
export const AGENTPORTRAIT_TABLE_HEAD = [
    // { type: 'selection',width: '50', align: 'center',label: ''},
    { prop: 'agencyNo', width: '130px', align: 'center', label: '代理商编号'},
    { prop: 'agencyName', width: '130px', align: 'center', label: '代理商名称'},
    { prop: 'industryAttribute', width: '150px', label: '行业业绩属性', align: 'center'},
    { prop: 'agencyAttribute', width: '180px', label: '代理商自然属性一级', align: 'center'},
    { prop: 'sales', width: '130px', label: '销售', align: 'center'},
    { prop: 'branchCompany', width: '170px', label: '分公司', align: 'center'},
    { prop: 'activeMerchant', width: '170px', label: '活跃子商户数', align: 'center'},
    { prop: 'addedMerchant',  width: '170px', label: '新增子商户数', align: 'center'},
    { prop: 'riskMerchant',  width: '170px', label: '风险子商户数', align: 'center'},
    { prop: 'receiptMoney', width: '170px', label: '交易金额', align: 'center'},
    { prop: 'riskMerchantMoney', width: '170px', label: '风险商户交易金额', align: 'center'},
    { prop: 'normalMoney', label: '正常业务交易金额', width: '170px', align: 'center'},
    { prop: 'grossProfit', label: '总毛利', width: '170px', align: 'center'},
    { prop: 'cheatPercent', label: '欺诈损失率', width: '170px', align: 'center'},
    { prop: 'complaintMoneyRate', label: '商户投诉率(金额)', width: '170px', align: 'center'},
    { prop: 'complaintCountRate', label: '商户投诉率(笔数)', width: '170px', align: 'center'},
]
const GRADE_TABLE_HEAD = [
    { prop: 'rateDate', width: '130px', align: 'center', label: '评级日期'},
    { prop: 'rateResult', width: '130px', align: 'center', label: '评级结果'},
    { prop: 'rateFormulary', width: '130px', align: 'center', label: '计算公式(权重*欺诈金额/交易金额+权重*投诉金额/交易金额)'}
]
export const SALES_GRADE_TABLE_HEAD = GRADE_TABLE_HEAD
export const MERCHANT_COMPLAINT_SATISTICS_TABLE_HEAD = [
    { prop: 'time', width: '130px', align: 'center', label: '时间'},
    { prop: 'tagType', width: '130px', align: 'center', label: '数据维度一级'},
    { prop: 'tag', width: '150px', label: '数据维度二级', align: 'center'},
    { prop: 'money', width: '180px', label: '投诉金额(万)', align: 'center'},
    { prop: 'complaintRateMoney', width: '130px', label: '商户投诉率(万)', align: 'center'},
    { prop: 'number', width: '170px', label: '投诉笔数', align: 'center'},
    { prop: 'complaintRateNumber', width: '170px', label: '商户投诉率(笔数)', align: 'center'},
    { prop: 'merchant',  width: '170px', label: '投诉商户数', align: 'center'},
    { prop: 'merchantRate',  width: '170px', label: '投诉商户占比', align: 'center'}
]
export const MERCHANT_COMPLAINT_DETAIL_HEAD = [
    { prop: 'acceptanceTime', width: '130px', align: 'center', label: '受理日期'},
    { prop: 'somplaintSource', width: '130px', align: 'center', label: '投诉来源'},
    { prop: 'customerNumber', width: '150px', label: '商户编号', align: 'center'},
    { prop: 'signedName', width: '180px', label: '商户签约名', align: 'center'},
    { prop: 'kycResult', width: '130px', label: '商户KYC', align: 'center'},
    { prop: 'salesName', width: '170px', label: '销售', align: 'center'},
    { prop: 'yejishuxing', width: '170px', label: '分公司', align: 'center'},
    { prop: 'orderNo',  width: '170px', label: '商户订单号', align: 'center'},
    { prop: 'transactionAmount',  width: '170px', label: '交易金额', align: 'center'},
    { prop: 'payTime',  width: '170px', label: '交易时间', align: 'center'},
    { prop: 'somplaintWay',  width: '170px', label: '举报方式', align: 'center'},
    { prop: 'reportType',  width: '170px', label: '举报类型', align: 'center'},
    { prop: 'somplaintReason',  width: '170px', label: '投诉原因', align: 'center'},
    { prop: 'somplaintBy',  width: '170px', label: '投诉人', align: 'center'},
    { prop: 'contactWay',  width: '170px', label: '联系方式', align: 'center'}
]
export const ALARM_HANDING_HEDR = [
    { prop: 'time', align: 'center', label: '时间'},
    { prop: 'number', align: 'center', label: '报警数'},
    { prop: 'rate', label: '处理率%', align: 'center'}
]
export const KYC_RATE_TABLE_HEAD = [
    { prop: 'date', align: 'center', label: '时间'},
    { prop: 'KYCName', align: 'center', label: 'M7模型'},
    { prop: 'KYCName', align: 'center', label: 'M10模型'},
    { prop: 'KYCName', align: 'center', label: 'M30模型'},
    { prop: 'KYCRate', label: '处理率', align: '识别率'}
]

export const TX_SATISTICS_TABLE_HEAD = [
    { prop: 'date', align: 'center', label: '时间'},
    { prop: 'txSource', align: 'center', label: 'TX来源'},
    { prop: 'receiptAmount', align: 'center', label: '交易金额(亿)'},
    { prop: 'grossProfit', align: 'center', label: '毛利(万)'},
    { prop: 'activeMerchant', align: 'center', label: '活跃商户数'}
]
export const TOP_SATISTICS_TABLE_HEAD = [
    { prop: 'order', align: 'center', label: '排序'},
    { prop: 'customerSign', align: 'center', label: '商户唯一标识'},
    { prop: 'customernumber', align: 'center', label: '商户编号'},
    { prop: 'signedname', align: 'center', label: '商户签约名'},
    { prop: 'kycResult', align: 'center', label: '商户KYC'},
    { prop: 'productline', align: 'center', label: '行业业绩属性'},
    { prop: 'businesscat', align: 'center', label: '商户自然属性一级'},
    { prop: 'salesname', align: 'center', label: '销售'},
    { prop: 'branchname', align: 'center', label: '分公司'}
]
export const SILENT_MERCHANT_DATA_TABLE_HEAD = [
    { prop: 'processDate', align: 'center', label: '处理日期'},
    { prop: 'processModle', align: 'center', label: '处理方式'},
    { prop: 'processReslut', align: 'center', label: '处理结果'},
    { prop: 'failResult', align: 'center', label: '失败原因'},
    { prop: 'customerSign', align: 'center', label: '商户唯一标识', width: '170'},
    { prop: 'customerNumber', align: 'center', label: '商户编号'},
    { prop: 'signedName', align: 'center', label: '商户签约名', width: '170' },
    { prop: 'kycResult', align: 'center', label: '商户KYC'},
    { prop: 'productLine', align: 'center', label: '行业业绩属性', width: '170'},
    { prop: 'businesscat', align: 'center', label: '商户自然属性一级', width: '170'},
    { prop: 'createDate', align: 'center', label: '商户入网日期', width: '170'},
    { prop: 'salesName', align: 'center', label: '销售'},
    { prop: 'yejishuxing', align: 'center', label: '分公司'}
]
export const SPECIAL_TABLE_HEAD = [
    { prop: 'order', align: 'center', label: '时间'},
    { prop: 'customerSign', align: 'center', label: '特批事项'},
    { prop: 'customernumber', align: 'center', label: '特批商户数'}
]
export const CLOSE_TABLE_HEAD= [
    { prop: 'order', align: 'center', label: '时间'},
    { prop: 'customerSign', align: 'center', label: '关闭来源'},
    { prop: 'customernumber', align: 'center', label: '关闭商户数'}
]
export const MERCHANT_COM_SOURCE_TABLE_HEAD = [
    { prop: 'time', align: 'center', label: '时间'},
    { prop: 'source', align: 'center', label: '投诉来源'},
    { prop: 'number', align: 'center', label: '投诉商户'}
]
export const SALES_RATING_TABLE_HEAD = [
    { prop: 'ratingdate', align: 'center', label: '评级日期'},
    { prop: 'salesname', align: 'center', label: '销售'},
    { prop: 'rateStatueAndScore', align: 'center', label: '评级结果'},
    { prop: 'leader', align: 'center', label: '直属上级'},
    { prop: 'branchCompany', align: 'center', label: '分公司'},
    { prop: 'entryDate', align: 'center', label: '入职日期'},
    { prop: 'customerCount', align: 'center', label: '名下总商户数'},
    { prop: 'monthActiveCustomerCount', align: 'center', label: '月活商户数'},
    { prop: 'remark', align: 'center', label: '备注'}
]
export const BRANCHCOM_RATING_TABLE_HEAD = [
    { prop: 'ratingdate', align: 'center', label: '评级日期'},
    { prop: 'branchcompany', align: 'center', label: '分公司'},
    { prop: 'rateStatueAndScore', align: 'center', label: '评级结果'},
    { prop: 'remark', align: 'center', label: '备注'}
]
export const KYC = {
    ALL: -1,
    ALL_NAME: '全部',
    NORMAL: 'kyc',
    RISK: 'kyc_risk',
    NORMAL_NAME: '正常',
    RISK_NAME: '风险'
}
//商户巡检明细表头
export const MERCHANT_INSPECTION_DATA_TABLE_HEAD = [
    { prop: 'inspectMonth', align: 'center', label: '应巡检月份', width: '100'},
    { prop: 'type', align: 'center', label: '巡检类型', width: '100'},
    { prop: 'customerNumber', align: 'center', label: '商户编号', width: '150'},
    { prop: 'signName', align: 'center', label: '商户签约名', width: '150'},
    { prop: 'mchName', align: 'center', label: '商户名称', width: '150'},
    { prop: 'saler', align: 'center', label: '销售', width: '100'},
    { prop: 'branchComp', align: 'center', label: '分公司', width: '150'},
    { prop: 'bizCatCode', align: 'center', label: '商户自然属性一级', width: '150'},
    { prop: 'subBizCatCode', align: 'center', label: '商户自然属性二级', width: '150'},
    { prop: 'productLine', align: 'center', label: '行业业绩属性', width: '150'},
    { prop: 'registerTime', align: 'center', label: '注册时间', width: '150'},
    { prop: 'refer', align: 'center', label: '报备网址', width: '150'},
    { prop: 'softName', align: 'center', label: 'APP名称', width: '150'},
    { prop: 'pubName', align: 'center', label: '公众号名称', width: '150'},
    { prop: 'content', align: 'center', label: '巡检内容', width: '100'},
    { prop: 'result', align: 'center', label: '巡检结果', width: '100'},
    { prop: 'isOpen', align: 'center', label: '网址/APP是否能打开or下载', width: '120'},
    { prop: 'isUse', align: 'center', label: '网址/APP是否能正常使用', width: '120'},
    { prop: 'isYeepay', align: 'center', label: '是否有易宝支付通道', width: '150'},
    { prop: 'appName', align: 'center', label: 'APP/公众号开发者名称', width: '180'},
    { prop: 'isTemplate', align: 'center', label: '是否为模板', width: '100'},
    { prop: 'isAgreement', align: 'center', label: '商户业务是否与一二级分类一致', width: '150'},
    { prop: 'noAgreeContent', align: 'center', label: '不一致业务内容', width: '120'},
    { prop: 'registerType', align: 'center', label: '用户拓展模式(邀请注册或自主注册)', width: '150'},
    { prop: 'registerType', align: 'center', label: '是否收加盟费', width: '120'},
    { prop: 'isConduct', align: 'center', label: '是否有敏感宣传', width: '120'},
    { prop: 'describe', align: 'center', label: '商户经营业务描述', width: '150'},
    { prop: 'testLogin', align: 'center', label: '测试账号/密码', width: '150'},
    { prop: 'inspectDate', align: 'center', label: '巡检日期', width: '150'},
    { prop: 'inspectMan', align: 'center', label: '巡检人', width: '120'},
    { prop: 'remark', align: 'center', label: '备注', width: '150'},
]
//商户巡检覆盖情况表头
export const MERCHANT_INSPECTION_COVERAGE_DATA_TABLE_HEAD = [
    { prop: 'date', align: 'center', label: '时间'},
    { prop: 'type', align: 'center', label: '巡检类型'},
    { prop: 'needInspect', width: '170px', align: 'center', label: '应巡检商户数'},
    { prop: 'compInspect', width: '170px', align: 'center', label: '已巡检商户数'},
    { prop: 'inspectRate', width: '170px', align: 'center', label: '巡检覆盖率'},
    { prop: 'passCount', width: '170px', align: 'center', label: '巡检通过商户数'},
    { prop: 'rejectCount', width: '170px', align: 'center', label: '巡检不通过商户数'}
]
export const DataHeader=[
  { type: 'selection', label: '', width: '50' },
  { prop: 'id', label: '评级子项ID', width: '100' },
  {
    prop: 'fieldtype',
    label: '评级子项类别',
    width: '100',
    formatter: this.fieldtype
  },
  { prop: 'fieldname', label: '评级子项名称', width: '150' },
  {
    prop: 'fieldstatus',
    label: '状态',
    width: '80',
    formatter: this.fieldstatus
  },
  { prop: 'remark', label: '备注', width: '180' },
  { prop: 'createtime', label: '创建日期', width: '150' },
  { prop: 'updatetime', label: '更新日期', width: '150' },
  { prop: 'updateby', label: '操作人员', width: '130' }
]