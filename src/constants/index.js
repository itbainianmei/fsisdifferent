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
    { type: 'selection',width: '50', align: 'center',label: ''},
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
    { prop: 'complaintMoney', label: '商户投诉率(金额)', width: '170px', align: 'center'},
    { prop: 'complaintCount', label: '商户投诉率(笔数)', width: '170px', align: 'center'},
]
const GRADE_TABLE_HEAD = [
    { prop: 'date', width: '130px', align: 'center', label: '评级日期'},
    { prop: 'name', width: '130px', align: 'center', label: '评级结果'},
    { prop: 'address', width: '130px', align: 'center', label: '计算公式(权重*欺诈金额/交易金额+权重*投诉金额/交易金额)'}
]
export const SALES_GRADE_TABLE_HEAD = GRADE_TABLE_HEAD