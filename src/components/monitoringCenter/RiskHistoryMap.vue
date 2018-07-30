<template>
    <div id="tradeandfraud"  style="width:100%;">
        <iframe id="iframe" :data='this.url' :src='this.url+"/static/map/RiskHisMap.html"' width="100%" height="640" frameborder="0" scrolling="auto" style="position：absolute;left:0;bottom:0;"></iframe>
    </div>
</template>
<script>
export default {
  name:'历史风险地图',
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
