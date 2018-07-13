<template>
    <div>
        <div class="downLoadBtnBox">
            <div >
                <div>
                    <span  @click="down" id='download'></span>
                    <span  @click="reset" id='center'></span>
                  
                  
                </div>
              

            </div>
        </div>
        <div class="datatable">
           <el-table
          :data="rtabledata"
          border
          style="width: 100%">
          <el-table-column
                    prop="risklev"
                    label="风险等级"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="riskid"
                    label="风险编号"
                    v-if="false"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="minriskval"
                    label="最小风险值"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="maxriskval"
                    label="最大风险值"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="riskname"
                    label="风险名称"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="creattm"
                    label="创建时间"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="lasttm"
                    label="最后更新时间"
                   >
                  </el-table-column>
                  <el-table-column
                    prop="upuser"
                    label="更新者"
                   >
                  </el-table-column>
        </el-table>
        </div>
    </div>    
</template>

<script>
import qs from 'qs'
export default {
    
    data() {
      return {
        rtabledata:[{
            risklev: '',
            minriskval: '',
            maxriskval: '',
            riskname:'',
            curuser:'',
            creattm:'',
            lasttm:'',
            upuser:'',
            riskid:''
        }],
      }
    },
    methods:{
        getParams(){
            this.rtabledata = this.$route.params.data
            console.log( this.rtabledata);
        },
        down(){
             this.$axios.post('/SysUserManageController/print',qs.stringify({
                
            }))
            .then( res => {

            })
            .catch(error => {
                console.log(error)
            })
            window.print()
        },
        reset(){
          this.$router.push({path:"/manager/systemRisklevel"})
        }
    },
    mounted(){
        this.getParams()
    },
}
</script>

<style>
  .downLoadBtnBox{
      height:70px;
  }
  
  #download{
    display:inline-block;
    background: url('../../images/downLoad.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
  }
  #center{
    display:inline-block;
     background: url('../../images/close.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
  }


</style>
 