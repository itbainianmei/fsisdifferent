// 具有加减数、限制最大和最小数值的的input
<template>
    <div>
        <el-input class="elIconP" type="text" ref='sr1' auto-complete="off" @keyup="iptHeader"></el-input>
        <div class="elIconPosction el-icon-caret-top" @click="numberMax"></div>
        <div class="elIconPosction el-icon-caret-bottom" @click="numberMin"></div>
    </div>
    
</template>

<script>
export default {
    name:"asuIpt",
    data(){
        return{
            number:''
        }
    },
    props:{
        min:{
            type:Number,
            default:0
        }
    },
    methods:{
        numberMax(){
            this.number++;
        },
        numberMin(){
            if(this.number <= this.min){
                return;
            }
            this.number--;
        },
        iptHeader(){
            let fix
            if(typeof this.number === 'string'){
                // 不是数字的格式全部转化成空
                fix = Number(this.number.replace(/\D/g,''))
            }else{
                fix = this.number
            }
            this.number = fix
        }
    }
}
</script>

<style scoped>
.elIconP{
  position: relative;
}
.elIconPosction{
  position: absolute;
  font-size: 10px;
}
.el-icon-caret-top{
  top: 45px;
  right: 5px;
  font-size: 17px;
}
.el-icon-caret-bottom{
  top: 57px;
  right: 5px;
  font-size: 17px;
}
</style>
