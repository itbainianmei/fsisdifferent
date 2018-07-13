<template>
  <div class="head">
      <img class="pic1" src="./xy.png" alt="" @click="collapse">
      <img class="youfu pic3" src="./guanji.png" alt="" >
      <div class="youfu user" @click="toPersonal">
        <img class="pic4" src="./rentou.png" alt="">
        {{username}}
      </div>
      <!-- <img class="youfu pic2"  src="./xiaoxi.png" alt=""> -->
  </div>
</template>
<script >
export default {
    data(){
      return {
        "username":'admin'
      }
    },
  methods:{
    toPersonal(){
      this.$router.push({path:'/manager/personal'})
    },
    collapse(){
        //console.log(document.querySelector('.menuList').className)
        //console.log(document.querySelector(".container").className)
        //console.log(document.querySelector(".contentData").className)
        if(document.querySelector('.menuList').className == 'el-aside menuList'){
          document.querySelector('.menuList').className = 'el-aside menuList menuListSelf'
          
        }else if(document.querySelector('.menuList').className == 'el-aside menuList menuListSelf'){
            document.querySelector('.menuList').className = 'el-aside menuList'
        }

        if(document.querySelector(".container").className === 'container container el-row'){
          document.querySelector(".container").className = 'container container el-row containerSelf'
        }else if(document.querySelector(".container").className == 'container container el-row containerSelf'){
            document.querySelector(".container").className = 'container container el-row'
        }

        if(document.querySelector(".contentDataManager").className === 'el-container contentDataManager is-vertical'){
            document.querySelector(".contentDataManager").className = 'el-container contentDataManager is-vertical contentDataManagerSelf'
        }else if(document.querySelector(".contentDataManager").className == 'el-container contentDataManager is-vertical contentDataManagerSelf'){
            document.querySelector(".contentDataManager").className = 'el-container contentDataManager is-vertical'
        }
    }
  }
}
</script>
<style scoped>
.head{box-shadow: 0px 1px 50px #a2a2a2;height: 60px;}
.fu{position:relative;width:100%;height:60px;}
.youfu{float:right;}
.pic1{margin-top: 17px;cursor:pointer;margin-bottom: 20px;margin-left: 20px;}
.pic4{vertical-align: middle;margin-right: 7px;cursor:pointer;}
.user{margin-right: 43px;margin-top:13px;cursor:pointer; }
.pic2{margin-right:48px;margin-top:16px;cursor:pointer;}
.pic3{margin-top:18px;cursor:pointer;margin-right: 20px;}
</style>

