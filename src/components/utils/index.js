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
