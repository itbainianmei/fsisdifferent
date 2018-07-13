<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo"
              :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleselect"
                 unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes"
                    v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf" :key='item.id'>
              <template slot="title">
                <i :class="item.iconCls"></i>
                {{item.name}}
              </template>
              <el-menu-item v-for="child in item.children"
                            :index="child.path"
                            :key="child.path"
                            v-if="!child.hidden" @click="dianji($event)">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0"
                          :index="item.children[0].path" :key='item.id'>
              <i :class="item.iconCls"></i>
              {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
        <ul class="el-menu el-menu-vertical-demo collapsed"
            v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes"
              v-if="!item.hidden"  :key='item.id'
              class="el-submenu item" @click="itemClick(i)">
            <template v-if="!item.leaf">
              <div class="el-submenu__title"
                   @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)"></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index"
                  @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="child in item.children"
                    v-if="!child.hidden"
                    :key="child.path"
                    class="el-menu-item" style="padding-left: 40px;"
                    :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">
                  {{child.name}}
                </li>
              </ul>
            </template>
            <template v-else>
              <ul>
                <li class="el-submenu">
                  <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                       :class="$route.path==item.children[0].path?'is-active':''"
                       @click="$router.push(item.children[0].path)">
                  </div>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </aside>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
export default {

    computed:{
      ...mapGetters([
        'tabsArr'
      ])
    },
    methods:{
      ...mapActions([
        'addtab'
      ]),
      handleOpen(key, keyPath) {
        //console.log(key,keyPath)
      },
      handleClose(key, keyPath) {
        //console.log(key,keyPath)
      },
      handleselect: function (a,b,data) {
      
        let obj = {}
        obj.path = data.index
        obj.name = data.$el.innerText
        obj.act = false
        //console.log(obj)
        
        this.$store.dispatch('addtab', obj);
        
      },
      dianji(e){

      },
      //折叠导航栏
      collapse:function(){
        //this.collapsed=!this.collapsed;
        //this.collapsed = this.$store.state.menu.isCollapse;
      },
      showMenu(i,status){
        console.log(i,status)
        //this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      },


    },
    data(){
      return{
          sysName:'运营管理平台',
          collapsed:false,
          sysUserName: '',
          isCollapse: true
      }
    }
}
</script>
<style scoped>

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
.el-menu{border-right: none}
  .logo{width: 100%;line-height: 42px;text-align: center;color: #ffffff;font-size: 16px}
.el-menu-item.is-active{color: #ffffff;background-color: #38e139}
  .container{width: 200px;}
/* aside {
    flex:0 0 200px;
    width: 200px;


  } */
  /* .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  } */
 
</style>


