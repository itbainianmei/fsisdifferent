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
        // let idCardReg = /(^[1-9]\d{5}(15|18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        let idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
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
    if (tag === 'bankCardNo' || tag === 'creditAccountNo' || tag === 'bankCard') {
        return card(val)
    }
    // 手机号
    if (tag === 'userPhone' || tag === 'targetUserPhone' || tag === 'contactPhone' || tag === "phoneNo") {
        return phone(val)
    }
    // 身份证号
    if (tag === 'idNo' || tag === 'remitIdNo' || tag === 'legalIdNo' || tag === 'targetIdNo' || tag === "certifyId") {
        return idCard(val)
    }
    // 固定电话
    if (tag === 'linePhone' || tag === 'fixedLine') {
        return tel(val)
    }
    // 登陆邮箱
    if (tag === 'registMail') {
        return email(val)
    }
    return ''
}
// 获取当月季度，当月，当周，上月的开始时间和结束时间
export function getStartDateAndEndDate(date, type, day) {
    let para = new Date(date); //当前日期 
    let paraDayOfWeek = para.getDay(); //今天本周的第几天 
    let paraDay = para.getDate(); //当前日 
    let paraMonth = para.getMonth(); //当前月 
    let paraYear = para.getYear(); //当前年 
    paraYear += (paraYear < 2000) ? 1900 : 0; //
    let startDate = formatDate(date)
    let endDate = formatDate(date)
    // 0 日 1 周 2月
    switch(type){
        case 'day': {
            if (typeof day !== 'undefined'){
                startDate = getDay(-day);
                endDate = getDay(0);
            } else {
                // 取近7天的数据
                startDate = getDay(-7);
                endDate = getDay(0);
            }
            break;
        }
        case 'week': {
            startDate = getWeekStartDate(paraYear,paraMonth,paraDay,paraDayOfWeek)
            endDate = getWeekEndDate(paraYear,paraMonth,paraDay,paraDayOfWeek)
            break
        }
        case 'month': {
            startDate = getMonthStartDate(paraYear,paraMonth)
            endDate = getMonthEndDate(paraYear,paraMonth)
            break
        }
    }
    let result = {}
    result.startDate = startDate
    result.endDate = endDate
    return result
}
function getDay(day){  
    var today = new Date();  
      
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          

    today.setTime(targetday_milliseconds); //注意，这行是关键代码
      
    var tYear = today.getFullYear();  
    var tMonth = today.getMonth();  
    var tDate = today.getDate();  
    tMonth = doHandleMonth(tMonth + 1);  
    tDate = doHandleMonth(tDate);  
    return tYear+"-"+tMonth+"-"+tDate;  
}  
function doHandleMonth(month){  
    var m = month;  
    if(month.toString().length == 1){  
       m = "0" + month;  
    }  
    return m;  
}
//格式化日期：yyyy-MM-dd　　
function formatDate(date) {　　　
　 var myyear = date.getFullYear();　　
　 var mymonth = date.getMonth()+1;　　
　 var myweekday = date.getDate();　　　
　　　　
　 if(mymonth < 10){　　
　　　 mymonth = "0" + mymonth;　　
　 }　　　
　 if(myweekday < 10){　　
　　　 myweekday = "0" + myweekday;　　
　 }　　
　 return (myyear+"-"+mymonth + "-" + myweekday);　　　
}　　
//获得某月的天数　　
function getMonthDays(paraYear,paraMonth){　　
　 var monthStartDate = new Date(paraYear, paraMonth, 1);　　　
　 var monthEndDate = new Date(paraYear, paraMonth + 1, 1);　　　
　 var　 days　 =　 (monthEndDate　 -　 monthStartDate)/(1000　 *　 60　 *　 60　 *　 24);　　　
　 return　 days;　　　
}　　　
　　
//获得某周的开始日期　　
function getWeekStartDate(paraYear,paraMonth,paraDay,paraDayOfWeek) {　　　
　 var weekStartDate = new Date(paraYear, paraMonth, paraDay + 1 - paraDayOfWeek);　　　
　 return formatDate(weekStartDate);　　
}　　　
　　
//获得某周的结束日期　　
function getWeekEndDate(paraYear,paraMonth,paraDay,paraDayOfWeek) {　　　
　 var weekEndDate = new Date(paraYear, paraMonth, paraDay + (7 - paraDayOfWeek));　　　
　 return formatDate(weekEndDate);　　
}　　　
　　
//获得某月的开始日期　　
function getMonthStartDate(paraYear,paraMonth){　　
　 var monthStartDate = new Date(paraYear, paraMonth, 1);　　　
　 return formatDate(monthStartDate);　　
}　　
　　
//获得某月的结束日期　　
function getMonthEndDate(paraYear,paraMonth){
　 var monthEndDate = new Date(paraYear,paraMonth, getMonthDays(paraYear,paraMonth));　　　
　 return formatDate(monthEndDate);　　
}　　

//获得上月开始时间　
function getLastMonthStartDate(paraYear, lastMonth){　
　 var lastMonthStartDate = new Date(paraYear, lastMonth, 1);　
　 return formatDate(lastMonthStartDate);　　
}　

//获得上月结束时间　
function getLastMonthEndDate(paraYear, lastMonth){　
　 var lastMonthEndDate = new Date(paraYear, lastMonth, getMonthDays(lastMonth));　
　 return formatDate(lastMonthEndDate);　　
}　
　　
//获得某季度的开始日期　　
function getQuarterStartDate(paraYear,paraSeason){　　
　 switch (paraSeason){　　
　　　 case '1' : return paraYear+"-01-01";
　　　 case '2' : return paraYear+"-04-01";
　　　 case '3' : return paraYear+"-07-01";
　　　 case '4' : return paraYear+"-10-01";
　 }
}　　
　　
//获得某季度的结束日期　　
function getQuarterEndDate(paraYear,paraSeason){　　
　 switch (paraSeason){　　
　 case '1' : return paraYear+"-03-31";
　 case '2' : return paraYear+"-06-30";
　 case '3' : return paraYear+"-09-30";
　 case '4' : return paraYear+"-12-31";
　 }　
}

　　//获取某年某周的开始日期
function getBeginDateOfWeek(paraYear, weekIndex){
　 var firstDay = GetFirstWeekBegDay(paraYear);
　 //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
　 var time=(weekIndex-1)*7*24*3600000;
　 var beginDay = firstDay;
　 //为日期对象 date 重新设置成时间 time
　 beginDay.setTime(firstDay.valueOf()+time);
　 return formatDate(beginDay);
}

　　//获取某年某周的结束日期
function getEndDateOfWeek(paraYear, weekIndex){
　 var firstDay = GetFirstWeekBegDay(paraYear);
　 //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
　 var time=(weekIndex-1)*7*24*3600000;
　 var weekTime = 6*24*3600000;
　 var endDay = firstDay;
　 //为日期对象 date 重新设置成时间 time
　 endDay.setTime(firstDay.valueOf()+weekTime+time);
　 return formatDate(endDay);
}

　　//获取日期为某年的第几周
function GetWeekIndex(dateobj) {
　 var firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
　 if (dateobj < firstDay) {
　　 firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
　 }
　 d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
　 return Math.floor(d / 7) + 1;　
}

　　//获取某年的第一天
function GetFirstWeekBegDay(year) {
　 var tempdate = new Date(year, 0, 1);
　 var temp = tempdate.getDay();
　 if (temp == 1){
　　　 return tempdate;
　 }
　 temp = temp ==  7 ? 0 : temp;
　 tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
　 return new Date(tempdate);　
}

export function compareValFun(value, compareVal) {
    let flag = false
    if (compareVal !== '' &&　compareVal !== null && value !== ''　&& value  !== null) {
        let compare = compareVal.replace(/-/g, '').replace(/\s/g, '').replace(/:/g, '')
        let val = value.replace(/-/g, '').replace(/\s/g, '').replace(/:/g, '')
        if (compare > val) {
            flag = true
        }
    }
    return flag
}
export function formatterMoney(num){  //每三位分隔符
    return formatterRate(num, ',')
}
export function formatterRate(num, type){  //每三位分隔符
    if (typeof type === 'undefined'){
        type = ''
    }
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    let sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    let cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+type+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}
export function formatterChartDialog(toolTipType, params, chartList, units){
    let unit = []
    if (typeof units === 'String') {
        unit.push(units)
    } else {
        unit = units
    }
    let arrLineStr = ''
    if (toolTipType === 'item') {
        arrLineStr = params.name + '<br/>';
        // if (params.series.type === 'line') {
            // let currDataIndex = params.dataIndex
            // let t = '<br/>'
            // chartList._option.series.map((one, i) => {
            //     if (one.type === 'line' && params.value === one.data[currDataIndex]) {
            //         let u = unit[0]
            //         if (one.name === '欺诈损失率') {
            //             u = '0.01BP'
            //         } else {
            //             u = unit[0] 
            //         }
            //         let v = one.data[currDataIndex]
            //         if (u === '%') {
            //             v = formatterRate(one.data[currDataIndex])
            //         }
            //         arrLineStr = arrLineStr +  one.name  + '(' + u + ')：' + v + t;
            //     }
            // })
        // } else {
        let v = params.value
        if (params.seriesName.indexOf('null') < 0) {
            if (params.seriesName.indexOf('元') >= 0) {
                v = formatterMoney(params.value)
            }
            arrLineStr = arrLineStr + params.seriesName + '：' + v + '<br/>'
        } else {
            arrLineStr = arrLineStr + params.seriesName.split('-')[0] + '：' + v + '<br/>'
        }
        // }
    } else if (toolTipType === 'axis') {
        arrLineStr = params[0].name + '<br/>';
        let ui01 =  typeof unit[0] !== 'undefined' ? '(' + unit[0] + ')' : ''
        let ui02 =  typeof unit[1] !== 'undefined' ? '(' + unit[1] + ')' : ''
        let t = '<br/>'
        params.map((one, i) => {
            if (one.series.yAxisIndex === 0) {
                let val = getVal(ui01, one.value)
                arrLineStr = arrLineStr +  one.seriesName + ui01 + '：' + val + t;
            } else {
                let val = getVal(ui02, one.value)
                arrLineStr = arrLineStr +  one.seriesName + ui02 + '：' + val + t;
            }
        })
    }
    return arrLineStr
}
function getVal (unit, val){
    if (unit.indexOf('元') >= 0) {
        val = formatterMoney(val)
    } else if (unit.indexOf('%') >= 0) {
        val = formatterRate(val)
    }
    return val
}
export function specialFormatChart(params){
    console.log(params)
    let arr = params
    // params.map((one, i) => {
    //     if (one.seriesName !== '投诉率(金额)' && one.seriesName !== '投诉率(笔数)' && one.seriesName !== '投诉商户占比') {
    //         arr.push(one)
    //     }
    // })
    if (arr.length > 0) {
        let t = '<br/>'
        let arrStr = arr[0].name + '<br/>';
        arr.map((one, i) => {
            if (arr.length > 15) {
                if ((i + 1) % 3 === 0){
                    t = '<br/>'
                } else {
                    t = '&nbsp;&nbsp;'
                }
            } else {
                t = '<br/>'
            }
            let v = formatterRate(one.value)
            let symbol = one.series.symbol
            let color = one.series.itemStyle.normal.color
            arrStr = arrStr + drawShape(symbol, color, one.series.childName, v) + t
        })
        return arrStr + ''
    } else {
        return ''
    }
}
function drawShape(symbol, color, name, value) {
    let s = ''
    if (symbol === "circle") {
        s = 'border-radius:100%;'
    } else if (symbol === "diamond") {
        s = 'transform:rotate(45deg);border-width: 4px'
    } else if (symbol === "triangle") {
        color = 'transparent transparent ' +　color + ' transparent'
        s = 'border-width:8px;border-right-width: 4px;border-left-width: 4px;'
    }
    let html = '<span><i style="display:inline-block;margin-right:3px;width:0;height:0;border-width:4px;border-style:solid;margin-top:-3px;border-color:'
    + color + ';'+ s + '"></i>' + name + '(%)：' + value + '</span>'
    return html
}
export function initChartOption (yTtile, toolTipType, chart , chartObj, unit, pageName) {
    return {
        title : {
            text: '',
            x: 'center',
            textStyle: {
                color: '#409EFF',
                fontSize: '14px',
                fontWeight: 'normal',
                top : '-20px'
            }
        },
        tooltip: {
            trigger: toolTipType,
            // textStyle: {
            //     fontSize: 12
            // },
            formatter: function (params, ticket, callback) {
                if (pageName === 'kyc') {
                    if (chart !== 'timeChart') {
                        return formatterChartDialog(toolTipType, params, chartObj, unit) 
                    } else {
                        let arrLineStr = ''
                        let t = '<br/>'
                        params.map((one, i) => {
                            let val = formatterRate(one.value)
                            arrLineStr = arrLineStr +  one.name + '(%)' + '：' + val + t;
                            
                        })
                        return arrLineStr
                    }
                } else {
                    if (chart === 'chart6') {
                        return specialFormatChart(params)
                    } else {
                        return formatterChartDialog(toolTipType, params, chartObj, unit)
                    }
                } 
            },
            position: function (point, params, dom, rect, size) {
                return [point[0], point[1] + 40];
            }
        },
        toolbox: {
            show : true,
            feature : {
                saveAsImage : {show: true}
            }
        },
        grid:{
            x2: 45,
        },
        legend: {
            y:'10px',
            x:'center',
            data: []
        },
        xAxis: [
            {
            splitLine:{show: false},//去除网格线
            type: 'category',
            data: [],
            axisLabel:{
                rotate: 30,
                show: true,
                interval: 0,
                textStyle:{
                    fontSize:12,
                    color:'black',
                    fontWeight:700

                }
            },
            axisTick: {
                    show: true,     //设置x轴上标点显示
                    length: 2,    // 设置x轴上标点显示长度
                    lineStyle: {     //设置x轴上标点显示样式
                        color: '#ddd',
                        width: 1,
                        type: 'solid'
                    }
            }
            }
        ],
        yAxis: [
            {
                show: (typeof  yTtile[0] !== 'undefined' || yTtile[0] !== '') ? true : false,    
                type: 'value',
                name: yTtile[0],
                splitNumber:5,
                axisLabel: {
                    formatter: '{value}'
                },
                min: 0,
                max: 100,        // 计算最大值
                interval: Math.ceil(100 / 5),  
            },
            {
                show: (typeof  yTtile[1] !== 'undefined' || yTtile[1] !== '') ? true : false,    
                type: 'value',
                name: yTtile[1],
                splitNumber:5,
                axisLabel: {
                    formatter: '{value}',
                },
                min: 0,
                max: 100,        // 计算最大值
                interval: Math.ceil(100 / 5),  
            }
        ],
        series: []
    };
}
