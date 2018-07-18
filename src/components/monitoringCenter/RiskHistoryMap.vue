<template>
    <div id="tradeandfraud"  style="width:100%;">
        <iframe id="frame1" ref="frame1" name="frame1" :src='this.url+"/static/map/RiskHisMap.html"' width="100%" height="640" frameborder="0" scrolling="auto" style="position：absolute;left:0;bottom:0;"></iframe>
    </div>
</template>
<script>
export default {
  name:'历史风险地图',
  data(){
    return{
    }
  },
  mounted(){ 
  },
  methods:{
   xx(){
    // this.$refs.box.contentWindow.document.innerHTML = ''
     // this.$refs.box.contentWindow.document.innerHTML= this.$refs.frame1.contentWindow.document.getElementById('boxhtml')
   }
  } 
}

                    
</script>
<style scoped>
 
</style>
