<template>
<div class="bg">
  <vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="2"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="160"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
  <div class="denglu">
    <div class="tp"><img src="./imgs/fslogo.png" alt=""></div>
    <p class="wenzi1">运营管理系统</p>
    <div class="srk">
      <div class="bsk">
        <p class="lo_ic">LOGIN</p>
        <div class="usern "><img src="./imgs/ren.png" alt=""><input ref="yh"  type="text" placeholder="USER ID" ></div>
        <div class="userp"><img class="suo" src="./imgs/suo.png" alt=""><input ref="mm"  type="password" placeholder="PASSWORD" @keyup.enter = 'loging'> <img class="yanjing" src="./imgs/haixiu.png" alt=""></div>
        <p class="wramtips" v-show="tishi"><i class="el-icon-warning warmicon"></i><span class="warmtext">您输入的账户信息有误，请重新输入</span></p>
      </div>
      <div class="lsk" @click="loging" >
        <img src="./imgs/yaoshi.png" alt=""><span>登录</span>
      </div>
    </div>
  </div>
</div>
</template>
<script >
import qs from 'qs'
export default{
  data(){
    return{
        tishi:false
    }
  },
  mounted(){
      //this.init();
  },
  methods:{
    loging(){
        let a=this.$refs.yh.value,b=this.$refs.mm.value;
        if(!a){
        this.tishi=true;
        }else if(!b){
        this.tishi=true;
        }else if(a!=''&& b!=''){
         
            this.$axios.post('/login',qs.stringify({
              'username':a,
              'password':b
            }))
            .then(res => {
              console.log(res.data)
              if(res.data.status === 1){
                  this.$router.push({path:'/manager'})
                  localStorage.setItem('SID',res.data.data.sessionId) 
                  localStorage.setItem('testName',res.data.data.sysUser.userName)
                  localStorage.setItem('USERID',res.data.data.sysUser.id)
                  var menustr = localStorage.getItem('menustr');
                  var menuArray = JSON.parse(menustr);
                  var sourceMenuArray =  res.data.data.urlMapArray;

                  let arrLevel = []
                  for(var i=0;i<sourceMenuArray.length;i++){
                    for(var j=0;j<sourceMenuArray[i].list.length;j++){
                      for(var k=0;k<sourceMenuArray[i].list[j].list.length;k++){
                        if(sourceMenuArray[i].list[j].list[k].level === 3 || sourceMenuArray[i].list[j].list[k].level === 4){
                          arrLevel.push(sourceMenuArray[i].list[j].list[k].id)
                        }
                      }
                    }
                  }
                  localStorage.setItem('ARRLEVEL',JSON.stringify(arrLevel))
                  

                  for(var i=0 ;i <menuArray.length;i++){
                		var menu = menuArray[i];
                		//判断1级菜单是否有权限
                		for(var j=0 ;sourceMenuArray && j<sourceMenuArray.length;j++){
                			var sourceMenu = sourceMenuArray[j];
                			if(menu.id && menu.id == sourceMenu.id){//1级存在
                				menu.hidden = false;
                				var menuList = menu.children;
                				var sourcelist = sourceMenu.list;
                				//2级菜单判断
                				for(var k=0 ; k < menuList.length ; k++){
                					for(var f=0 ; f < sourcelist.length ; f++){
                						if(menuList[k].id == sourcelist[f].id || menuList[k].id == 999){
                							menuList[k].hidden = false;
                						}
                					}
                				}
                			}
                		}
                	};
                	let menustr = JSON.stringify(menuArray);
                	localStorage.setItem('menustr',menustr);
                  
              }else if(res.data.status !== 1){
                this.tishi = true
              }


            
            })
            .catch(error => {
              // console.log(res.data)
            })
            
        }
    },
    jinru(){
        let a=this.$refs.yh.value,b=this.$refs.mm.value;
        /*if(!a){
            this.tishi=true;
        }else if(!b){
            this.tishi=true;
        }else if(a!=''&& b!=''){
            this.$router.push({path:'/admin'})

        }*/

      this.$router.push({path:'/manager'})
    },
    init(){

    }
  }
}
</script>
<style >
*{margin:0;padding:0;}
.bg{background-color:#1D283A;}
.denglu{position: absolute;
  z-index: 10;
  width:624px;
  height:454px;
  margin-left:-312px;
  top:50%;
  left:50%;
  margin-top: -227px;
}
.tp{width:290px;height:48px;margin: 0 auto;}
.tp img{width:290px;height:48px;}
.wenzi1{
  font-family: PingFangHK-Regular;
  margin-top: 26px;
  margin-bottom:52px;
  font-size: 14px;
  color: #FFFFFF;
  height:20px;
  letter-spacing: 25px;
  text-align: center;
  width: 100%;
}
.srk{width:624px;height:308px;background:pink;}
.bsk{width:624px;height:246px;background-color:#FFFFFF ;border:1px solid transparent;}
.lsk{cursor:pointer; width:624px;height:62px;background-color:#002888 ;text-align: center;font-family: PingFangTC-Medium;  font-size: 16px;line-height: 62px;  color: #FFFFFF;  letter-spacing: 3.2px;}
.lsk img{width:19px;margin-right: 5px;}
.lo_ic{border-right:4px solid #FF7200;margin-top: 26px;margin-left: 81px; width:539px;height:20px;font-family: PingFangTC-Semibold;  font-size: 14px;  color: #4A4A4A;  letter-spacing: 1px;}
.usern{border-bottom: 1px solid #EBEBEB; width:454px;height:39px;margin-top:34px;margin-left: 89px;}
.usn_act{border-bottom: 1px solid #4A4A4A; }
.userp{position:relative; border:1px solid transparent; border-bottom: 1px solid #EBEBEB; width:454px;height:39px;margin-top:23px;margin-left: 89px;}
.usern input{border:none;outline: none; width:400px;height:38px; font-family: PingFangTC-Medium;line-height: 20px;  font-size: 14px;  color: #4A4A4A;  letter-spacing: 1px;}
.userp input{border:none;outline: none; width:400px;height:38px;font-family: PingFangTC-Light;  font-size: 14px;  color: #666666;  letter-spacing: 1px;}
.usern img{width:26px;height:26px;vertical-align: middle;margin-right: 22.5px;}
.suo{width:26px;height:26px;vertical-align: middle;margin-right: 22.5px;}
.yanjing{position:absolute;top:12px;right:30px;width:21px;}
.wramtips{height:53px;line-height: 50px; width:360px;  margin-left: 140px;}
.warmicon{font-family: MaterialIcons-Regular; margin-right: 10px; font-size: 20px;vertical-align: middle;    color: #FF7200;  letter-spacing: 1px;}
.warmtext{font-family: PingFangTC-Medium;  font-size: 12px;  color: #FF7200;  letter-spacing: 1px;}
</style>
