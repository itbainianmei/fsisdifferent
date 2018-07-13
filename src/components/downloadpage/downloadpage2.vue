<template>
    <div>
       <div class="downLoadBtnBox">
            <div >
                <div >
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
              prop="mechid"
              min-width="100"
              label="机构ID"
            >
            </el-table-column>
            <el-table-column
              prop="mechname"
              label="机构名称"
            >
            </el-table-column>
            <el-table-column
              prop="mecharr"
              label="机构层次"
              >
            </el-table-column>
            <el-table-column
              prop="upmech"
              label="上级机构"
            >
            </el-table-column>
            <el-table-column
              prop="upmechid"
              label="上级机构ID"
              min-width="100"
            >
            </el-table-column>
            <el-table-column
              prop="percha"
              min-width="100"
              label="负责人姓名"
            >
            </el-table-column>
            <el-table-column
              prop="coninfo"
              label="联系方式"
            >
            </el-table-column>
            <el-table-column
              prop="descibe"
              label="机构描述"
            >
            </el-table-column>
            <el-table-column
              prop="curuser"
              label="创建人"
              v-if="false"
            >
            </el-table-column>
            <el-table-column
              prop="cretm"
              label="创建时间"
            >
            </el-table-column>
            <el-table-column
              prop="uptm"
              min-width="110"
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
          mechid: '',
          mechname: '',
          mecharr: '',
          upmechid:'',
          upmech:'',
          percha:'',
          coninfo:'',
          curuser:'',
          descibe:'',
          cretm:'',
          uptm:'',
          upuser:''
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
          this.$router.push({path:'/manager/systemOnline'})
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
 