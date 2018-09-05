<!--tableDataSec-->
<template>
    <div id="tableSelect" @click="allarea($event)">
         <ul @click.stop>
             <li v-for="(key,value,index) in tableDataSec" :key="value">
              <input type="checkbox" :id="generateString(index)" :disabled="tableDataSecChange && key[0]" v-model="key[0]">
              <label :for="generateString(index)">{{key[1]}}</label>
            </li>
          </ul>
    </div>
</template>
<script>

export default {
  props:{
    tableDataSec:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  computed:{
     tableDataSecChange:function(){//深度监听
      var i = 0
      for(var item in this.tableDataSec){
        if(this.tableDataSec[item][0]){
          i++
        }
      }
      if(i==1){
        for(var item in this.tableDataSec){
          if(this.tableDataSec[item][0]){
            return true
          }
        }
      }else{
        return false
      }
    }
  },
  data(){
      return{
      }
  },
  methods:{

  }
}

</script>
<style scoped>


</style>
