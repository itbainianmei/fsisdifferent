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
            prop="sysconid"
            label="系统配置ID"
          >
          </el-table-column>
          <el-table-column
            prop="systype"
            label="类型"
            v-if="false"
          >
          </el-table-column>
          <el-table-column
            prop="typename"
            label="类型名称"
          >
          </el-table-column>
          <el-table-column
            prop="syscode"
            label="代码"
          >
          </el-table-column>
          <el-table-column
            prop="sysname"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="sysrem"
            label="备注"
          >
          </el-table-column>
          <el-table-column
            prop="sys"
            label="排序"
          >
          </el-table-column>
          <el-table-column
            prop="syssta"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="curuser"
            label="创建人"
          >
          </el-table-column>
          <el-table-column
            prop="cretm"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="最后更新时间"
            label="uptm"
          >
          </el-table-column>
          <el-table-column
            prop="upuser"
            label="更改者"
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
            sysconid: '',
            systype: '',
            typename: '',
            syscode:'',
            sysrem:'',
            sys:'',
            syssta:'',
            curuser:'',
            uptm:'',
            upuser:''
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
          this.$router.push({path:"/manager/SysConfigMgt"})
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
 