export const BLOCK_ENUM = {
    TYPE: 107, // 生效场景
    TRADE_TAG: 108, // 维度-交易
    MERCHANT_TAG: 109, // 维度-商户
    REFER_CHECK_TAG: 110, // refer核验
    SOURCE: 111,

};
export const GRAY_ENUM = {
    TYPE: 113,
    TRADE_TAG: 114, // 维度-交易
    MERCHANT_TAG: 115, // 维度-商户
    REFER_CHECK_TAG: 110, // refer核验
    SOURCE: 116,
    KYC: 116,
};
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
export const GRAY_DOWNLOAD_TEMPLATE =  [
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
export const BLACK_DOWNLOAD_TEMPLATE = [
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