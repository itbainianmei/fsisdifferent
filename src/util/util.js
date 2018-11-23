import axios from 'axios'
import qs from 'qs';
import moment from 'moment';
export default{
	install:function(Vue,opt){
		Vue.mixin({
			methods:{
				selectedItemsid(selection){  //返回表格中选中的行id
			        var idList = []
			        for(var i=0,len = selection.length;i<len;i++){
			            idList.push(selection[i].id)
			        }

			        this.idList = idList
			        return this.idList
			    },
				atleastOne(){
					// 至少一条数据弹框
					this.$alert('请选择至少一条数据', '系统提示', {
						confirmButtonText: '确定',
						type: 'warning'
					});
				},
				successTip(text){  //成功提示框
					var self = this
			        this.$alert(text, '系统提示', {
			          showCancelButton:false,
			          confirmButtonText: '确定',
			          cancelButtonText: '',
			          type: 'success'
			        })
				},
				failTip(text){  //成功提示框
					var self = this
			        this.$alert(text, '系统提示', {
			          showCancelButton:false,
			          confirmButtonText: '确定',
			          cancelButtonText: '',
			          type: 'error'
			        })
				},
				 
			    companyRenderHeader(h, { column, $index }){
			      return h("span",[
			        h("span",column.label),
			        h("span",{
			          "class":{
			            "el-icon-arrow-down":true
			          },
			          "on":{
			            click:(ev) => {
			              this.$refs.list.classList.remove('none')
			              var w = this.$refs.list.offsetWidth
			              if(Number(document.body.clientWidth) -  Number(ev.clientX) < w ){
			                this.$refs.list.style.left = Number(document.body.clientWidth) - w - 20 + 'px'
			              }else{
			                this.$refs.list.style.left = ev.clientX + 'px'
			              }
			              this.$refs.list.style.top= ev.pageY + 10+ 'px'
			              ev.stopPropagation()  //阻止冒泡
			            }
			          }
			        }),
			      ])
			    },
			     
			}
		});
		 
		
	}	
}
