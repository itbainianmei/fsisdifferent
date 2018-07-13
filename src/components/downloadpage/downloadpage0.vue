<template>
    <div>
        <div class="downLoadBtnBox">
            <div>
                <div >
                    <span  @click="down" id='downloadIcon'></span>
                    <span  @click="reset" id='centerIcon'></span>                  
                </div>
            </div>
        </div>
        
        <div class="datatable">
           <el-table
           
          :data="rtabledata"
          border
          style="width: 100%">
          <el-table-column
            v-for='item in arrList'
            :prop="item.value"
            :label="item.prop"
            :key="item.id"
          >
          </el-table-column>
         
          <!-- <el-table-column
            prop="loginname"
            label="登录名"
          >
          </el-table-column>

          <el-table-column
            prop="username"
            label="真实姓名"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="头衔"
          >
          </el-table-column>
          <el-table-column
            prop="busline"
            label="业务线"
          >
          </el-table-column>
          <el-table-column
            prop="onlinemech"
            label="线上机构"
          >
          </el-table-column>
          <el-table-column
            prop="linemech"
            label="线下机构"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮件"
          >
          </el-table-column>
          <el-table-column
            prop="userstate"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            prop="cretm"
            label="创建时间"
          >
          </el-table-column>
          <el-table-column
            prop="uptm"
            label="最后更新时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="upuser"
            label="更新者"
          >
          </el-table-column> -->
        </el-table>
        </div>
    </div>    
</template>

<script>
import qs from 'qs'
export default {
    
    data() {
      return {
        arr:[],
        arrList:[],
        rtabledata:[{
            usline:'',
            cretm:'',
            creuser:'',
            email:'',
            linemech:'',
            loginname:'',
            onlinemech:'',
            phone:'',
            roleid:'',
            rolename:'',
            title:'',
            uptm:'',
            upuser:'',
            usercode:'',
            userid:'',
            username:'',
            userrole:'',
            userstate:'',
        }],
      }
    },
    methods:{
        getParams(){
         
            this.rtabledata = this.$route.params.rdata
            // console.log( this.rtabledata);

        },
        down(){
             this.$axios.post('/SysUserManageController/print',qs.stringify({
                'sessionId':localStorage.getItem('SID'),
            }))
            .then( res => {

            })
            .catch(error => {
                console.log(error)
            })

            window.print()
        },
        reset(){
          //this.$router.push({path:'/manager/systemUsers'})
          window.close()
        }
    },
    mounted(){
        this.getParams()
        //console.log(window.location.href)
        //console.log(window.location.href.split('?')[1].split('&'))
        window.location.href.split('?')[1].split('&').forEach(ele => {
          //console.log(ele.indexOf('type'))
          
        })
        this.$axios.get("/PrintController/print?"+window.location.href.split('?')[1],qs.string)
        .then(res => {
          console.log(res.data)
          //console.log(res.data.sort)
          //console.log( JSON.parse(res.data.data) )
          this.rtabledata = JSON.parse(res.data.data)
          this.arr = JSON.parse(res.data.sort)
          this.arrList = []
          //console.log(this.arr)
          JSON.parse(this.arr).forEach(ele => {
            //console.log(ele)
            //console.log(ele.value)
            //console.log(ele.prop)
            this.arrList.push(ele)
          })
          //this.arr.push(JSON.parse(res.data.sort)[1])
          //console.log(this.arrList)
           

        })
        .catch(error =>{
          console.log(error)
        })
         
    },
}
</script>
<style>
  .downLoadBtnBox{
      height:70px;
  }

  #centerIcon{
    display:inline-block;
    background: url('../../images/close.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
    cursor: pointer;
  }
  #centerIcon:hover{
    display:inline-block;
    background: url('../../images/close_actived.png') no-repeat;
    width:44px;
    height:30px;
    float: left;
    margin-top:20px;
    cursor: pointer;
  }
  #downloadIcon {
    display:inline-block;
    background: url(../../images/icon.png) no-repeat -127px -4px;
    width: 44px;
    height: 28px;
    margin: 0 auto;
    margin-top: 20px;
    border:1px solid #38E139;
    float: left;
    cursor: pointer;
  }
  #downloadIcon:hover {
    display:inline-block;
    background: url(../../images/icon.png) no-repeat -127px -28px;
    width: 44px;
    height: 28px;
    margin: 0 auto;
    margin-top: 20px;
    border:1px solid #38E139;
    background-color:#38E139;
    float: left;
    cursor: pointer;
  }
  

</style>
 