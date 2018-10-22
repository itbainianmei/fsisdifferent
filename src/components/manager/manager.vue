<template>
  <div>
      <el-row class="container">
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'" >
               <!-- :default-active="$route.path" -->
               <!-- 展开后的侧边栏 -->
              <el-menu  :default-active="$route.path" class="el-menu-vertical-demo menuList" unique-opened  v-if="!collapsed"  @select="handleselect">
                <div class="logo">
                 <img src="./logo.png" alt="" class='logoIcon'>
                </div>
                <div class="logopic">
                  <span @click='logoutDialog=true' title="登出"><img src="./loginOut.png"></span>
                  <span @click='toPersonal' title="个人中心"><img src="./user.png"></span>
                </div>
                <template  v-for="(item,index) in $router.options.routes" v-if="isPermission(item.id)">
                  <el-submenu :index="index+''" :key='index'>
                    <!-- 一级菜单 -->
                    <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                    <!-- 二级菜单 -->
                    <el-menu-item class="menu-list" v-for="child in item.children" :index="child.path" :key="child.path" v-if="isPermission(child.id)">{{child.name}}</el-menu-item>
                  </el-submenu>
                </template>
              </el-menu>
              <!-- 收缩后的侧边栏 -->
              <ul class="el-menu el-menu-vertical-demo collapsed" v-if="collapsed" ref="menuCollapsed">
                  <div class="logo" >
                    <img src="./logo.png" alt="" class='logoIcon'>
                      {{collapsed?'':sysName}}
                  </div>
                <li v-for="(item,index) in $router.options.routes" v-if="isPermission(item.id)" class="el-submenu item" :key='index'>
                  <template>
                    <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
                    <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                      <li v-for="child in item.children" v-if="isPermission(child.id)" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="selectClick(child)">{{child.name}}</li>
                    </ul>
                  </template>
                  </li>
              </ul>
            </aside>

          <el-container class='contentDataManager'>
            <!-- <el-header style='margin-bottom:15px'>
              <div class="head">
                  <img class="pic1" src="./xy.png" alt="" @click="collapse" id='collapseIcon'>
                  <img class="youfu pic3" src="./guanji.png" alt="" @click='logoutDialog = true'>
                  <div class="youfu user" @click="toPersonal">
                    <img class="pic4" src="./rentou.png" alt="" >
                    {{username}}
                  </div>
              </div>
            </el-header>-->
            <el-header style='height:34px;position:relative;z-index:666'>
              <navigation></navigation>
            </el-header>

            <el-main ref="neirong" class='mainContent' >
              <keep-alive :include="includePageNames">
                  <router-view></router-view>
              </keep-alive>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
      <el-dialog title="提示" :visible.sync="logoutDialog" width="30%" >
          <div style='width:100%;text-align:center'>
            <p>确定要退出登录吗？</p>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="logoutDialog = false">取 消</el-button>
          <el-button type="primary" @click='logoutClick'>确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
// import leftSide from '../leftSide/leftSide'
// import topSide from '../topSide/topSide'
import navigation from '../navigation/navigation'
import {mapGetters,mapActions, mapState} from 'vuex'
export default {
  data(){
    return {
       logoutDialog:false,
        keepAlive:false,
       "username":'',
        sysName:'运营管理后台',
        collapsed:false,
        sysUserName: '',
		    reload:this.reload,
        menuList : [],
        logoutFlag: false
    }
  },
  components:{
    // leftSide,
    // topSide,
    navigation
  },
  computed:{
    ...mapGetters([
      'tabsArr','includePageNames','menuListList'
      // 'permission_routers'
    ])
  },
  mounted(){
      //this.init();
      this.username = sessionStorage.getItem('testName')
      this.menulist = JSON.parse(localStorage.getItem('menustr'));
  },
  watch: {
    '$route': function() {
      console.log(this.includePageNames)
    }
  },
  methods:{
    ...mapActions([
        'addtab','addListData'
      ]),
    isPermission (id) {
      const asidePermissionIdList = localStorage.getItem('asidePermissionIdList') ? JSON.parse(localStorage.getItem('asidePermissionIdList')) : '';
      return asidePermissionIdList.indexOf(id) !== -1;
    },
    init(){
        let h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        this.$refs.caidan.$el.style.height=h+'px';
        let h2=h-73;
        this.$refs.neirong.$el.style.height=h2+'px';
    },
    toPersonal(){
      this.$router.push({path:'/manager/personal'})
      let obj = {}
        obj.path = '/manager/personal'
        obj.name = '个人中心'
        obj.act = false
      this.$store.dispatch('addtab', obj);
      this.$store.dispatch('updateTabCache');
    },
      handleOpen(key, keyPath) {
        //console.log(key,keyPath)
      },
      handleClose(key, keyPath) {
        //console.log(key,keyPath)
      },
      handleselect: function (a,b,data) {
        this.$router.push({path:data.index})
        let obj = {}
        obj.path = data.index
        obj.name = data.$el.innerText
        obj.act = false
        this.$store.dispatch('addtab', obj);
        this.$store.dispatch('updateTabCache');
      },

      selectClick(val){
        let tabObj = {}
        tabObj.path = val.path
        tabObj.name = val.name
        tabObj.act = false
        this.$store.dispatch('addtab', tabObj);
        this.$store.dispatch('updateTabCache');
        this.$router.push({path:val.path})
      },
      dianji(e){

      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
        if(this.collapsed === true){
            document.querySelector('#collapseIcon').style.transform = 'rotate(180deg)'
            document.querySelector('#collapseIcon').style.webkitTransform = 'rotate(180deg)'
            document.querySelector('#collapseIcon').style.msTransform = 'rotate(180deg)'
            document.querySelector('#collapseIcon').style.MozTransform = 'rotate(180deg)'
            document.querySelector('#collapseIcon').style.transition = '0.5s all'
        }else if(this.collapsed === false){
            document.querySelector('#collapseIcon').style.transform = 'rotate(0deg)'
            document.querySelector('#collapseIcon').style.webkitTransform = 'rotate(0deg)'
            document.querySelector('#collapseIcon').style.msTransform = 'rotate(0deg)'
            document.querySelector('#collapseIcon').style.MozTransform = 'rotate(0deg)'
            document.querySelector('#collapseIcon').style.transition = '0.5s all'
        }
      },
      showMenu(i,status){
         //console.log(i,status)
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      },
      logoutClick(){
        this.$axios.get('/logout').then(res => {
          if(res.data.status === 1){
            this.logoutDialog = false;
            this.$router.push({path:'/'})
            localStorage.clear()
            sessionStorage.clear()
            setTimeout(function() {
              window.location.reload()
            }, 500);
          }
        })
      }
  }
}
</script>
<style lang='less'>
*{margin:0;padding: 0;}
.el-header {
color: #333;
padding: 0;
}

.el-aside {
background-color: #0B142D;
text-align: center;
position: fixed;
left: 0;
top: 0;
bottom:0;
z-index: 111;
transition: all .28s ease-out;
overflow-x:hidden;
}
.logopic{
  color: #fff;
  font-size: 12px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  span{
    cursor: pointer;
    flex-shrink: 1;
    flex-basis: 50px;
    text-align: center;
  }
  img {
    width: 20px;
  }
}
.el-main {
    padding: 0;

}
.menuList{
  overflow-y: scroll;
}
.menuList .el-submenu__title i{color: #ffffff;}
.menuListSelf{
transform: translate(-162px);
}
.contentDataManager{

transition: all .28s ease-out;
min-height: 100%;
flex: 1;

}
.contentDataManagerSelf{
margin-left: 38px;
transition: all .28s ease-out
}
.containerSelf{transform:translate(148px)}
.menuList::-webkit-scrollbar {
width: 3px;
}
.menuList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
border-radius: 5px;
height:15px;
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: rgba(0,0,0,0.2);
}
.menuList::-webkit-scrollbar-track {/*滚动条里面轨道*/
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
border-radius: 0;
background: rgba(0,0,0,0.1);
}
.main {
display: flex;
position: absolute;
top: 0px;
bottom: 0px;
overflow: hidden;
}
.mainContent::-webkit-scrollbar{
width: 3px;
}
.mainContent::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
border-radius: 5px;
height:15px;
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
background: #3FAAF9;
}
.mainContent::-webkit-scrollbar-track {/*滚动条里面轨道*/
box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
border-radius: 0;
background: rgba(0,0,0,0.1);
}
.head{box-shadow: 0px 1px 50px #a2a2a2;height: 60px;margin-bottom: 15px;}
.fu{position:relative;width:100%;height:60px;}
.youfu{float:right;}
.pic1{margin-top: 17px;cursor:pointer;margin-bottom: 20px;margin-left: 20px;}
.pic4{vertical-align: middle;margin-right: 7px;cursor:pointer;}
.user{margin-right: 43px;margin-top:13px;cursor:pointer; }
.pic2{margin-right:48px;margin-top:16px;cursor:pointer;}
.pic3{margin-top:18px;cursor:pointer;margin-right: 20px;}

ul{list-style-type:none;}
.ht_bt{height:60px;font-size:22px;line-height: 60px;text-align: center;}
.yiji{cursor:pointer; color:#CBCBCB; font-size: 16px;line-height: 62px;text-align: left;text-indent: 52px;}
.erji{cursor:pointer; color:#CBCBCB; font-size:14px;line-height:50px;height:50px;text-align: left;text-indent: 60px;}
.yiji:hover{color:#38e139;}
.erji:hover{background-color:#38e139;color:#FFFFFF;}
.el-submenu__title{
  background-color: #0B142D;
}
.el-submenu{background-color: #0B142D;text-align: left;}
.el-menu{border-right: none;height:100%;background-color: #0B142D;}
  .logo{
    width: 100%;line-height: 42px;
    text-align: center;color: #ffffff;
    font-size: 16px;
    background-color: #0B142D;padding: 10px 0;}
.el-menu-item.is-active{color: #ffffff;background-color: #38e139}
  .container{width: 200px;}
  .logoIcon{width:36px;height:36px;vertical-align: middle;}
  .collapsed {	width: 60px;}
  .item {
  position: relative;
}
.submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}

.menu-expanded {
  flex: 0 0 200px;
  width: 200px;
  z-index: 10;
}
.menu-collapsed{
  z-index: 10;
}

.logo-collapse-width {
  width: 60px
}
.container {
position: absolute;
top: 0px;
bottom: 0px;
width: 100%;
height: 100%;}
/* .container .main .menu-expanded{
  flex: 0 0 230px;
  width: 230px;
}
.container .main aside{
    flex: 0 0 230px;
    width: 230px;
    height: 100%;
} */
/* navigation */
</style>
