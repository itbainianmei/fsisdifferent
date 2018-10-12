<template>
  <div class="tabs" >
    <div class="ht_left" @click="moveByDirection('left')" @mousedown="mouseDownToMove('left')" @mouseup="moveStop"><i class="el-icon-caret-left btn_icon"></i></div>
    <div class="zhongjiankuang" ref="ks_kd">
        <!-- <ul class="yidong" ref="yd_rq"> -->
          <scroll-pane class="yidong" ref="scrollPane">
            <div ref="tag" :path="bt.path" :class="{actived:bt.act}" class="lie" v-for="(bt , index) in tabsArr" :key="index" id='navItem' @click="lyview(bt.path,index)">
              {{bt.name}}
              <!-- <i class="el-icon-refresh"></i> -->
              <i class="el-icon-close" @click.stop="closeTab($event,index,bt.name)"></i>
            </div>
          </scroll-pane>
        <!-- </ul> -->
    </div>
    <div class="ht_right" @click="moveByDirection('right')" @mousedown="mouseDownToMove('right')" @mouseup="moveStop">
      <i class="el-icon-caret-right btn_icon"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {mapGetters,mapActions} from 'vuex'
import scrollPane from '../../oftenComponents/scrollPane'

export default {
    computed:{
      ...mapGetters([
        'tabsArr','includePageNames'
      ])
    },
    components: {
      scrollPane
    },
    data(){
      return{
          dh_db:[

          ],
          timer: null
      }
    },
    created() {
      this.$store.state.tabsArr.length === 0 && this.$store.dispatch('initNabTab');
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
      moveToCurrentTag() {
        const tags = this.$refs.tag;
        if (!tags) return;
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.getAttribute('path') == this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag);
              break;
            }
          }
        });
      },
      // backleft(){

      //   let juzuo1=parseInt(window.getComputedStyle(this.$refs.yd_rq).marginLeft);
      //   if(juzuo1<0){
      //     juzuo1 +=180;
      //     if(juzuo1>0){
      //       juzuo1=0;
      //     }
      //     this.$refs.yd_rq.style.marginLeft=juzuo1+'px';
      //   }
      // },
      // backright(){
      //   let sub_kd=0;
      //   let gukuan=this.$refs.ks_kd.offsetWidth;
      //   let juzuo=parseInt(window.getComputedStyle(this.$refs.yd_rq).marginLeft);
      //   for(let i=0;i<this.$refs.yd_rq.children.length;i++){
      //       sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
      //   }
      //   if(sub_kd>gukuan){
      //     sub_kd -=gukuan;
      //     if(juzuo>(-sub_kd)){
      //       juzuo -=180;
      //       if(juzuo<(-sub_kd)){
      //         juzuo=(-sub_kd);
      //       }
      //       this.$refs.yd_rq.style.marginLeft=juzuo+'px';
      //     }
      //   }
      // },
      closeTab(e,index,c){
        // console.log(e,index,c)
        this.$store.dispatch('deltab',index);
        this.$store.dispatch('updateTabCache',index);

        const latestView = this.tabsArr.slice(-1)[0];

        if (latestView) {
          this.$store.dispatch('hottab',this.tabsArr.length - 1);
          this.$router.push({path:latestView.path});
        } else {
          this.$router.push({path:'/manager'})
        }

        // let self_p=e.target.parentNode.offsetWidth;
        // let gd_kd=this.$refs.ks_kd.offsetWidth;
        // let sub_kd=0;
        // let fu_len=(this.$refs.yd_rq.children.length-2);
        // let flag=0;
        // if(fu_len>index){
        //   flag=index;
        // }else if(fu_len<index){
        //   flag=fu_len;
        // }
        // if(flag==-1){
        //   this.$router.push({path:'/manager'})
        // }else{
        //   this.$store.dispatch('hottab',flag);
        //   this.$router.push({path:this.tabsArr[flag].path});
        // }
        // for(let i=0;i<this.$refs.yd_rq.children.length;i++){
        //     sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
        // }
        // sub_kd -=self_p;
        // if(sub_kd > gd_kd){
        //   let k=0;k=sub_kd-gd_kd;
        //   this.$refs.yd_rq.style.marginLeft=(-k)+'px';
        // }else{
        //   this.$refs.yd_rq.style.marginLeft='0px';
        // }
      },
      hotInit() {
        for (let i = 0; i < this.tabsArr.length; i++) {
          if (this.tabsArr[i].path === this.$route.path) {
            this.$store.dispatch('hottab',i);
            break;
          }
        }
      },
      // jiazai(){
      //     let gd_kd=this.$refs.ks_kd.offsetWidth;
      //     let sub_kd=0;
      //     if(this.$refs.yd_rq.children.length>0){
      //       for(let i=0;i<this.$refs.yd_rq.children.length;i++){
      //         sub_kd +=this.$refs.yd_rq.children[i].offsetWidth;
      //       }
      //       if(sub_kd>gd_kd){
      //         let k=0;k=sub_kd-gd_kd;
      //         this.$refs.yd_rq.style.marginLeft=(-k)+'px';
      //       }else{
      //         this.$refs.yd_rq.style.marginLeft='0px';
      //       }
      //     }
      // },
      navItem(){
        //console.log(this.$route.path)
      },
      moveByDirection(dir) {
        this.$refs.scrollPane.moveBySteps(dir);
      },
      mouseDownToMove(dir) {
        this.timer = setInterval(() => {
          this.$refs.scrollPane.moveBySteps(dir);
        }, 150);
      },
      moveStop() {
        clearInterval(this.timer);
      }
    },
    mounted(){
      // this.jiazai();
      this.moveToCurrentTag();
      //console.log(this.tabsArr)
      this.hotInit();
    },
    watch:{
        tabsArr(newval,oldval){
          // this.jiazai();

        },
      $route(to,form,next){
          //console.log(to,form,next)
        this.moveToCurrentTag();
      }
    }
}
</script>
<style>
ul{list-style-type: none;}
.tabs{
    position: relative;
    height: 34px;
    /* line-height: 54px; */
    overflow: hidden;
    background-color: #ffffff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
.zhongjiankuang{margin: 0 20px;}
.yidong{
  /* width:15000px; */
  height:34px;
}
.lie{
  cursor: pointer;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  background: #fff;
  font-size: 12px;
  text-align: center;
  color: #495060;
  margin-right: 4px;
  padding: 0 8px;
  margin-top: 4px;
  border: 1px solid #d8dce5;
}
.lie label{
  cursor: pointer;margin-top: 0px;/* background-color: #ffffff; */
  display: inline-block;/* width: 170px; */
  height: 100%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
.zhongjiankuang li i{
    font-size: 12px;
    cursor: pointer;
  }
.ht_left{cursor:pointer;
          text-align: center; position: absolute;top:0;left:0;
          background-color: #ffffff;width:20px;height:36px;
          /* z-index: 10; */
}
.ht_right{cursor:pointer;  text-align: center; position: absolute;right:0;top:0;background-color: #ffffff;width:20px;height:36px;}
.btn_icon{margin-top:6px;font-size: 23px;color: #cccccc;transition: all 0.2s;}
.tabs:hover .btn_icon{
  color: #242C3C;
}
.actived{
  background-color: #242C3C;
  color: #fff;
  border-color: #242C3C;
}

.el-icon-error:hover{color:red;}
</style>
