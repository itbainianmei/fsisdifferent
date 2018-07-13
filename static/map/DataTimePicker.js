/**
 * Created by meng on 2017/1/9.
 */
if (Ext.Date) {
  Ext.Date.monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ];

  Ext.Date.dayNames = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];

  Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')";
  Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')";

  parseCodes = {
    g : 1,
    c : "if (/(上午)/i.test(results[{0}])) {\n" + "if (!h || h == 12) { h = 0; }\n" + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
    s : "(上午|下午)",
    calcAtEnd : true
  };

  Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
}
Ext.define('Ext.ux.datetime.DateTimePicker', {
    extend: 'Ext.picker.Date',//继承于 Ext.picker.Date
    alias: 'widget.dateTimePicker',//添加xtype dateTimePicker
    okText:'确定',//确认按钮文字描述
    okTip:'确定',//确认按钮提示内容
    renderType:'now',//可设置默认时分秒，start=0：0：0 end=23:59:59
    renderTpl: [
      '<div id="{id}-innerEl" role="grid">',
      '<div role="presentation" class="{baseCls}-header">',
      '<a id="{id}-prevEl" class="{baseCls}-prev {baseCls}-arrow" href="#" role="button" title="{prevText}" hidefocus="on" ></a>',
      '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
      '<a id="{id}-nextEl" class="{baseCls}-next {baseCls}-arrow" href="#" role="button" title="{nextText}" hidefocus="on" ></a>',
      '</div>',
      '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
      '<thead role="presentation"><tr role="presentation">',
      '<tpl for="dayNames">',
      '<th role="columnheader" class="{parent.baseCls}-column-header" title="{.}">',
      '<div class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
      '</th>',
      '</tpl>',
      '</tr></thead>',
      '<tbody role="presentation"><tr role="presentation">',
      '<tpl for="days">',
      '{#:this.isEndOfWeek}',
      '<td role="gridcell" id="{[Ext.id()]}">',
      '<a role="presentation" hidefocus="on" class="{parent.baseCls}-date" href="#"></a>',
      '</td>',
      '</tpl>',
      '</tr></tbody>',
      '</table>',

      //指定时分秒渲染框架
      '<table id="{id}-timeEl" style="table-layout:auto;width:auto;margin:0 3px;" class="x-datepicker-inner" cellspacing="0">',
      '<tbody><tr>',
      '<td>{%this.renderHourBtn(values,out)%}</td>',
      '<td>:0</td>',
      '<td>:0</td>',
      '</tr></tbody>',
      '</table>',

      '<tpl if="showToday">',
      //添加一个确认按钮渲染
      '<div id="{id}-footerEl" role="presentation" class="{baseCls}-footer">{%this.renderOkBtn(values, out)%}{%this.renderTodayBtn(values, out)%}</div>',
      '</tpl>',
      '</div>',
      {
        firstInitial: function(value) {
          return Ext.picker.Date.prototype.getDayInitial(value);
        },
        isEndOfWeek: function(value) {
          // convert from 1 based index to 0 based
          // by decrementing value once.
          value--;
          var end = value % 7 === 0 && value !== 0;
          return end ? '</tr><tr role="row">' : '';
        },
        renderTodayBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
        },
        renderMonthBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
        },

        //指定渲染方法调用
        renderHourBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.hourBtn.getRenderTree(), out);//根据组件获得组件的html输出
        },
        renderMinuteBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.minuteBtn.getRenderTree(), out);
        },
        renderSecondBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.secondBtn.getRenderTree(), out);
        },
        renderOkBtn: function(values, out) {
          Ext.DomHelper.generateMarkup(values.$comp.okBtn.getRenderTree(), out);
        }
      }
    ],

    beforeRender: function () {
      var me = this,_$Number=Ext.form.field.Number;
      //在组件渲染之前，将自定义添加的时、分、秒和确认按钮进行初始化
      //组件宽度可能需要调整下，根据使用的theme不同，宽度需要调整
      me.hourBtn=new _$Number({
        minValue:0,
        maxValue:23,
        step:1,
        width:55,
        listeners:{
          change:function(hourBtn, newValue, oldValue){
            if(newValue>23 || newValue<0
              ||(!/^[0-9]\d*$/.test(newValue) && newValue != null)){
              hourBtn.setValue(oldValue);
            }
          }
        }
      });
      /* me.minuteBtn=new _$Number({
       minValue:0,
       maxValue:59,
       step:1,
       width:70,
       labelWidth:10,
       fieldLabel:'&nbsp;',
       listeners:{
       change:function(minuteBtn, newValue, oldValue){
       console.log(oldValue);
       if(newValue>59 || newValue<0
       ||(!/^[0-9]\d*$/.test(newValue) && newValue != null)){
       minuteBtn.setValue(oldValue);
       }
       }
       }
       });
       me.secondBtn=new _$Number({
       minValue:0,
       maxValue:59,
       step:1,
       width:70,
       labelWidth:10,
       fieldLabel:'&nbsp;',//在组件之前渲染 ':'
       listeners:{
       change:function(secondBtn, newValue, oldValue){
       if(newValue>59 || newValue<0
       ||(!/^[0-9]\d*$/.test(newValue) && newValue != null)){
       secondBtn.setValue(oldValue);
       }
       }
       }
       });*/

      me.okBtn = new Ext.button.Button({
        ownerCt: me,
        ownerLayout: me.getComponentLayout(),
        text: me.okText,
        tooltip: me.okTip,
        tooltipType:'title',
        handler:me.okHandler,//确认按钮的事件委托
        scope: me
      });
      me.callParent();
    },

    finishRenderChildren: function () {
      var me = this;
      //组件渲染完成后，需要调用子元素的finishRender，从而获得事件绑定
      me.hourBtn.finishRender();
      // me.minuteBtn.finishRender();
      //me.secondBtn.finishRender();
      me.okBtn.finishRender();
      me.callParent();
    },

    /**
     * 确认 按钮触发的调用
     */
    okHandler : function(){
      var me = this,
        btn = me.okBtn;

      if(btn && !btn.disabled){
        me.setValue(this.getValue());
        me.fireEvent('select', me, me.value);
        me.onSelect();
      }
      return me;
    },

    /**
     * 覆盖了父类的方法，因为父类中是根据时间的getTime判断的，因此需要对时、分、秒分别值为0才能保证当前值的日期选择
     * @private
     * @param {Date} date The new date
     */
    selectedUpdate: function(date){
      this.callParent([Ext.Date.clearTime(date,true)]);
    },

    /**
     * 更新picker的显示内容，需要同时更新时、分、秒输入框的值
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update : function(date, forceRefresh){
      var me = this;
      me.hourBtn.setValue(date.getHours());
      //me.minuteBtn.setValue(date.getMinutes());
      //me.secondBtn.setValue(date.getSeconds());

      return this.callParent(arguments);
    },

    /**
     * 从picker选中后，赋值时，需要从时、分、秒也获得当前值
     * datetimefield也会调用这个方法对picker初始化，因此添加一个isfixed参数。
     * @param {Date} date The new date
     * @param {Boolean} isfixed True 时，忽略从时分秒中获取值
     */
    setValue : function(date, isfixed){
      var me = this;
      if(isfixed!==true){
        date.setHours(me.hourBtn.getValue());
        //date.setMinutes(me.minuteBtn.getValue());
        //date.setSeconds(me.secondBtn.getValue());
      }else{
        if(me.renderType=='start' && me.hourBtn.getValue()===0 && me.minuteBtn.getValue()===0 && me.secondBtn.getValue()===0){
          date.setHours('0');
          //date.setMinutes('0');
          // date.setSeconds('0');
        }
        if(me.renderType=='end' && (me.hourBtn.getValue()===23 || me.hourBtn.getValue()===0) && (me.minuteBtn.getValue()===0 || me.minuteBtn.getValue()===59) && (me.secondBtn.getValue()===59 || me.secondBtn.getValue()===0)){
          date.setHours('23');
          //date.setMinutes('59');
          //date.setSeconds('59');
        }
      }
      me.value=date;
      me.update(me.value);
      return me;
    },

    // @private
    // @inheritdoc
    beforeDestroy : function() {
      var me = this;

      if (me.rendered) {
        //销毁组件时，也需要销毁自定义的控件
        Ext.destroy(
          me.hourBtn,
          // me.minuteBtn,
          //me.secondBtn,
          me.okBtn
        );
      }
      me.callParent();
    }
  },
  function() {
    var proto = this.prototype,
      date = Ext.Date;

    proto.monthNames = date.monthNames;
    proto.dayNames   = date.dayNames;
    proto.format     = date.defaultFormat;
  });