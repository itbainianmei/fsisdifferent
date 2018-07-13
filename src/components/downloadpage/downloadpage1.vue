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
            prop="rolename"
            label="角色名"
          >
          </el-table-column>

          <el-table-column
            prop="busiline"
            label="业务线"
          >
          </el-table-column>
          <el-table-column
            prop="roledesc"
            label="角色描述"
          >
          </el-table-column>
          <el-table-column
            prop="rolestat"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="cretm"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="lastuptm"
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
          authstate:'',
          busiline:'',
          cretm:'',
          creuser:'',
          grantauth:'',
          handauth:'',
          lastuptm:'',
          mechid:'',
          mechname:'',
          roledesc:'',
          roleid:'',
          rolename:'',
          rolestat:'',
          themech:'',
          upuser:'',
        }],
      }
    },
    methods:{
        getParams(){
            this.rtabledata = this.$route.params.data
            // console.log( this.rtabledata);
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
          this.$router.push({path:'/manager/systemRole'})
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
 