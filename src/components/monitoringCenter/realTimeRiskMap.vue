<template>
    <div id="tradeandfraud" style="width:100%;">
         <iframe :src='this.url+"/static/map/RiskMap.html"' width="100%" height="620" frameborder="0" scrolling="auto" style="position：absolute;left:0;bottom:0;"></iframe>
    </div>
</template>
<script>
export default {
 name:'实时风险地图',  
  data(){
      return{
        currenteveryno:20,//每页10条
        serchToggle:true,
        currentPage:1,// 分页
        pageNumber:1,
        pageRow:20,
        length:0    
      }
  },
  mounted(){
  },
  methods:{
   
  } 
}

                    
</script>
<style scoped>
 
</style>
