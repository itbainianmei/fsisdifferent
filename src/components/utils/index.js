//身份证
export function idCard(str){
    //let str = '142354199202051403'
    str = str ? str.substr(0,6) + "********" + str.substr(-4) : '';
    return str
}
//手机
export function phone(str){
   // let str = '18235442859'
    str = str ? str.substr(0,3) + '****' + str.substr(-4) : '';
    return str
}
//银行卡
export function card(str){
    //let str = '4367421147620083682'
    str = str ? str.substr(0,6) + '*********' + str.substr(-4) : '';
    return str
}
//邮箱
export function email(str){
    //let str = '1150775680@qq.com'
    if (str) {
      str = str.split('@')
      let arr = str[0]
      arr = arr.substr(0,2) + '***' + arr.substr(-1)
      str = arr + '@' + str[1]
    }
    return str
}
//电话
export function tel(str){
    //let str = '0358321436'
    str = str ? str.substr(0,4) + '****' + str.substr(-4) : '';
    return str
}
// 验证名单值
export function validateFormID(tag, val) {
    if (val === "") {
        return "请输入名单值"
    }
    // 验证银行卡号
    if (tag === 'bankCardNo' || tag === 'creditAccountNo') {
        let bankNumReg = /^[1-9][0-9]{14,18}$/;
        if (!bankNumReg.test(val.split(" ").join(""))) {
            return "请输入正确的银行卡号"
        }
    }
    // 手机号
    if (tag === 'userPhone' || tag === 'targetUserPhone' || tag === 'contactPhone') {
        let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if (!phoneReg.test(val.split(" ").join(""))) {
            return "请输入正确的手机号"
        }
    }
    // 验证身份证号
    if (tag === 'idNo' || tag === 'remitIdNo' || tag === 'legalIdNo' || tag === 'targetIdNo') {
        let idCardReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        if (!idCardReg.test(val.split(" ").join(""))) {
            return "请输入正确的身份证号"
        }
    }
    // 固定电话
    if (tag === 'linePhone') {
        let telReg = /^(0\d{2}-\d{8}(-\d{1,4})?)|(0\d{3}-\d{7,8}(-\d{1,4})?)$/;
        if (!telReg.test(val.split(" ").join(""))) {
           return "请输入正确的电话"
        }
    }
    // 登陆邮箱
    if (tag === 'registMail') {
        let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (!emailReg.test(val.split(" ").join(""))) {
            return "请输入正确的邮箱"
        }
    }
    // ip
    if (tag === 'userIp') {
        let ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
        if (!ipReg.test(val.split(" ").join(""))) {
            return "请输入正确的ip"
        }
    }
    return ''
}
// 脱敏值总结
export function desensitizationVal(tag, val) {
    // 银行卡号
    if (tag === 'bankCardNo' || tag === 'creditAccountNo') {
        return card(val)
    }
    // 手机号
    if (tag === 'userPhone' || tag === 'targetUserPhone' || tag === 'contactPhone') {
        return phone(val)
    }
    // 身份证号
    if (tag === 'idNo' || tag === 'remitIdNo' || tag === 'legalIdNo' || tag === 'targetIdNo') {
        return idCard(val)
    }
    // 固定电话
    if (tag === 'idNo' || tag === 'remitIdNo' || tag === 'legalIdNo' || tag === 'targetIdNo') {
        return tel(val)
    }
    // 登陆邮箱
    if (tag === 'registMail') {
        return email(val)
    }
    return ''
}