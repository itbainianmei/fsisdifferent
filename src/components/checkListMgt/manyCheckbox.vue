<!--商户核查单管理-->
<template>
    <div id="manyCheckbox">
         <div class="pa pt10 onepropertySelect" :onepropertySelectshow="onepropertySelectshow" :submitData="submitData">
            <div class="box">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedOneproperty" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="property in onepropertySelect" :label="property.label" :key="property.value">{{property.label}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="clear mt10 mb20">
              <el-button type="primary" @click="getStatus">确定</el-button>
              <el-button @click="setStatus">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        onepropertySelectshow:false,
        submitData:''
    },
    data(){
        return{
            onepropertySelect:[],
            checkedOneproperty:[],
            isIndeterminate: true,
            checkAll: false
        }
    },
    created(){
        this.getMerchantFirst()//商户自然属性一级
    },
    methods:{
        handleCheckAllChange(val) { //处理商户自然属性
          var checkedlist = []
          this.onepropertySelect.map(function(item){
            checkedlist.push(item.label)
          })
          this.checkedOneproperty = val ? checkedlist : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {  //处理商户自然属性
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.onepropertySelect.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.onepropertySelect.length;
        },
        getStatus(){
          var self = this
          this.$emit("isShow",{
            submitData: self.checkedOneproperty.join(','),
            onepropertySelectshow:false
          })
        },
        setStatus(){  //点取消
          this.$emit("isShow",{
            onepropertySelectshow:false,
            submitData:''
          })
        }
    }
   
}
</script>
<style lang="less" scoped>
.el-checkbox{margin-left: 10px;}
.el-checkbox-group{width:100px;}
 .onepropertySelect{
  width:180px;
  line-height: 28px;
  padding-left:10px;
  top:38px;
  background: #fff;
  border:1px solid #ddd;
  z-index:200;
}
.box{
  max-height: 400px;
  overflow-y: scroll;
}
.iconbox{
  right:34px;
  color:#3FAAF9;
}
</style>
