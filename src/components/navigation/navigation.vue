<template>
  <div class="tabs" >
    <div class="ht_left" @click="backleft"> <i class="el-icon-caret-left btn_icon"></i></div>
    <div class="zhongjiankuang" ref="ks_kd">
        <ul class="yidong" ref="yd_rq">
          <li :class="{actived:bt.act}"   class="lie" v-for="(bt , index) in tabsArr" :key="index" id='navItem'>
            <label @click="lyview(bt.path,index)">{{bt.name  }}</label>
            <!-- <i class="el-icon-refresh"></i> -->
            <i class="el-icon-error" @click="closeTab($event,index,bt.name)"></i>
          </li>
        </ul>
    </div>
    <div class="ht_right" @click='backright'>
      <i class="el-icon-caret-right btn_icon"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
export default {
    computed:{
      ...mapGetters([
        'tabsArr','includePageNames'
      ])
    },
    data(){
      return{
          dh_db:[

          ]
      }
    },
    created() {
      this.$store.state.tabsArr.length === 0 && this.$store.dispatch('initNabTab');
      console.log(this.$store.state.tabsArr);
    },
    methods:{
      ...mapActions([
        'deltab'
      ]),
      lyview(e , index,c){
        console.log(e,index,c)
        if(e !== '/manager/logDetails'){
          this.tabsArr.forEach((ele,index) => {
            if(ele.path === '/manager/logDetails'){
               this.$store.dispatch('deltab',index);
               this.$store.dispatch('updateTabCache',index);
            }
          })
        }
        if(this.tabsArr.length>0){
          this.$router.push({path:e});
          this.$store.dispatch('hottab',index);
        }
      },
      backleft(){

        let juzuo1=parseInt(window.getComputedStyle(this.$refs.yd_rq).marginLeft);
        if(juzuo1<0){
          juzuo1 +=180;
          if(juzuo1>0){
            juzuo1=0;
          }
          this.$refs.yd_rq.style.marginLeft=juzuo1+'px';
        }
      },
      backright(){
        let sub_kd=0;
        let gukuan=this.$refs.ks_kd.offsetWidth;
        let juzuo=parseInt(window.getComputedStyle(this.$refs.yd_rq).marginLeft);
        for(let i=0;i<this.$refs.yd_rq.children.length;i++){
            sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
        }
        if(sub_kd>gukuan){
          sub_kd -=gukuan;
          if(juzuo>(-sub_kd)){
            juzuo -=180;
            if(juzuo<(-sub_kd)){
              juzuo=(-sub_kd);
            }
            this.$refs.yd_rq.style.marginLeft=juzuo+'px';
          }
        }
      },
      closeTab(e,index,c){
        // console.log(e,index,c)
        this.$store.dispatch('deltab',index);
        this.$store.dispatch('updateTabCache',index);
        let self_p=e.target.parentNode.offsetWidth;
        let gd_kd=this.$refs.ks_kd.offsetWidth;
        let sub_kd=0;
        let fu_len=(this.$refs.yd_rq.children.length-2);
        let flag=0;
        if(fu_len>index){
          flag=index;
        }else if(fu_len<index){
          flag=fu_len;
        }
        if(flag==-1){
          this.$router.push({path:'/manager'})
        }else{
          this.$store.dispatch('hottab',flag);
          this.$router.push({path:this.tabsArr[flag].path});
        }
        for(let i=0;i<this.$refs.yd_rq.children.length;i++){
            sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
        }
        sub_kd -=self_p;
        if(sub_kd > gd_kd){
          let k=0;k=sub_kd-gd_kd;
          this.$refs.yd_rq.style.marginLeft=(-k)+'px';
        }else{
          this.$refs.yd_rq.style.marginLeft='0px';
        }
      },
      jiazai(){
          let gd_kd=this.$refs.ks_kd.offsetWidth;
          let sub_kd=0;
          if(this.$refs.yd_rq.children.length>0){
            for(let i=0;i<this.$refs.yd_rq.children.length;i++){
              sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
            }
            if(sub_kd>gd_kd){
              let k=0;k=sub_kd-gd_kd;
              this.$refs.yd_rq.style.marginLeft=(-k)+'px';
            }else{
              this.$refs.yd_rq.style.marginLeft='0px';
            }
          }
      },
      navItem(){
        //console.log(this.$route.path)
      }
    },
    mounted(){
      this.jiazai();
      //console.log(this.tabsArr)
      this.navItem()
    },
    watch:{
        tabsArr(newval,oldval){

          this.jiazai();

        },
      $route(to,form,next){
          //console.log(to,form,next)
      }
    }
}
</script>
<style>
ul{list-style-type: none;}
.tabs{
    position: relative;

    height: 54px;
    line-height: 54px;
    overflow: hidden;
    background-color: #F1F2F5;
  }
.zhongjiankuang{margin: 0 33px;}
.yidong{width:15000px;height:54px;}
.lie{
  cursor: pointer;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 180px;
  background-color: #CFE1F3;
  font-size: 14px;
  text-align: center;
  color: #333333;
  margin-right: 1px;
}
.lie label{
  cursor: pointer;margin-top: 0px;/* background-color: #ffffff; */
  display: inline-block;/* width: 170px; */
  height: 100%;
  width:97px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
.yidong li i{
    margin-left: 10px;
    color: #A6A5A5;
    font-size: 18px;
    cursor: pointer;
    vertical-align: top;
    position: relative;
    top: 50%;
    margin-top: -9px;
  }
.ht_left{cursor:pointer;
          text-align: center; position: absolute;top:0;left:0;
          background-color: #ffffff;width:32px;height:54px;
          /* z-index: 10; */
}
.ht_right{cursor:pointer;  text-align: center; position: absolute;right:0;top:0;background-color: #ffffff;width:32px;height:54px;}
.btn_icon{margin-top:16px;font-size: 23px;}
.actived{
    height: 54px;
    line-height: 54px;
    margin-top: 0;
    background-color: #ffffff;


  }

.el-icon-error:hover{color:red;}
</style>
