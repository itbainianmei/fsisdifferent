<template>
  <el-col :span="24" class="toolbar" >
    <el-form >
      <div class="personalTitle">账户信息</div>
      <el-form-item>
        <ul class="ul">
          <li class="li">
            <span class="contentLiText" >登录名 :</span>
            <span>{{userName}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >真实姓名 :</span>
            <span>{{realName}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >头衔 :</span>
            <span>{{title}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >所属角色 :</span>
            <span>{{roleName}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >电子邮件 :</span>
            <span>{{email}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >手机号码 :</span>
            <span>{{phone}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >创建时间 :</span>
            <span>{{createTime}}</span>
          </li>
          <li class="li">
            <span class="contentLiText" >更新时间 :</span>
            <span>{{lastUpdateTime}}</span>
          </li>
        </ul>
      </el-form-item>
      <!-- <div class="personalTitle">修改资料</div>
      <el-form-item> -->
        <!-- <ul class="ul">
          <li class="li">
            <span class="contentLiText"> 请输入原密码 :</span>
            <el-input class="editInput" v-model="oldpsd"></el-input>
          </li>
          <li class="li">
            <span class="contentLiText">请输入新密码 :</span>
            <el-input class="editInput" v-model="newpsd"></el-input>
          </li>
          <li class="li">
            <span class="contentLiText">请再次输入新密码 :</span>
            <el-input class="editInput " id="newPsd" v-model="cencelpsd"></el-input>
          </li>
          <li class="li">
            <span class="contentLiText">新手机号码 :</span>
            <el-input class="editInput" v-model="newPhone"></el-input>
          </li>
          <li class="li">
            <span class="contentLiText">新电子邮件 :</span>
            <el-input class="editInput" v-model="newEmail"></el-input>
          </li>
          <li class="li">
            <span class="contentLiText"></span>
            <el-button type="primary" class="editPersonInfoSubmit" @click="preserve_submit">保存</el-button>
            <el-button  class="editPersonInfoSubmit reset" @click="reset_submit">重置</el-button>
          </li>
        </ul> -->

      <!-- </el-form-item> -->


    </el-form>
  </el-col>
</template>
<script>
   import qs from "qs"
   export default {
     data(){
       return {
         userName:'',
         realName:'',
         title:'',
         roleName:'',
         email:'',
         phone:'',
         createTime:'',
         lastUpdateTime:'',
         oldpsd:'',
         newpsd:'',
         newPhone:'',
         newEmail:'',
         userid:'',
         cencelpsd:''
       }

     },
     methods:{
      //  preserve_submit(){
      //    if(this.oldpsd === ''){
      //      this.$alert('请输入原密码', '密码输入', {
      //        confirmButtonText: '确定',
      //        callback: action => {

      //        }
      //      })
      //      return
      //    }
      //    if(document.querySelector("#newPsd").value !== this.newpsd){
      //      this.$alert('两次输入密码不一致', '密码输入', {
      //        confirmButtonText: '确定',
      //        callback: action => {

      //        }
      //      })
      //      return
      //    }
      //    console.log(parseInt(this.userid))
      //    console.log(this.oldpsd)
      //    console.log(this.newpsd)
      //    console.log(this.newPhone)
      //    console.log(this.newEmail)
      //    this.$axios.post("/SysUserManageController/updateUserSimple",qs.stringify({
      //      "sessionId":localStorage.getItem('SID'),
      //      "userid":parseInt(this.userid),
      //      "usercode":this.oldpsd,
      //      "newusercode":this.newpsd,
      //      "phone":this.newPhone,
      //      "email":this.newEmail
      //    }))
      //      .then(res => {
      //        console.log(res.data)
      //        console.log(parseInt(this.userid))
      //        console.log(this.oldpsd)
      //        console.log(this.newpsd)
      //        console.log(this.newPhone)
      //        console.log(this.newEmail)
      //       //  if(res.data.code === '2'){
      //       //    this.$alert(res.data.message, '修改用户信息', {
      //       //      confirmButtonText: '确定',
      //       //      callback: action => {
      //       //      }
      //       //    })
      //       //  }
      //       //  if(res.data.code === '1'){
      //       //    this.$alert(res.data.message, '修改用户信息', {
      //       //      confirmButtonText: '确定',
      //       //      callback: action => {
      //       //        this.userid = ''
      //       //        this.oldpsd = ''
      //       //        this.newpsd = ''
      //       //        this.newPhone = ''
      //       //        this.newEmail = ''
      //       //        this.cencelpsd = ''
      //       //      }
      //       //    })
      //       //  }
      //      })
      //      .catch(error => {
      //        console.log('error')
      //        console.log(error)
      //      })

      //  },
      //  reset_submit(){
      //    this.oldpsd = ''
      //    this.newpsd = ''
      //    this.newPhone = ''
      //    this.newEmail = ''
      //    this.cencelpsd = ''

      //  }
     },
     mounted(){
       //console.log(localStorage.getItem("user"))
       this.$axios.post("/SysUserManageController/getInfoById",qs.stringify({
         "sessionId":localStorage.getItem('SID'),
         "loginname":localStorage.getItem('testName')
       }))
         .then(res => {
           let result = res.data;

           if(result.status == 1) {
              this.userName = result.data.userName
              this.realName = result.data.realName
              this.roleName = result.data.roleName
              this.title = result.data.title
              this.email = result.data.email
              this.phone = result.data.phone
              this.createTime = result.data.createTime
              this.lastUpdateTime = result.data.lastUpdateTime
              this.userid = result.data.id
           } else {
             this.$alert(result, '系统提示', {
                confirmButtonText:'确定',
                type:'warning'
             })
           }

         })
         .catch(error => {
           console.log(error)
         })
     }
   }

</script>
<style scoped>
  .toolbar{color: #333333}
.personalTitle{
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 4px 1px rgba(0,0,0,0.09);
  font-size: 14px;
  padding-left: 30px;
}
  .contentLiText{
    display:inline-block;width: 13%;text-align: right;
    padding-right: 10px;
  }
  .ul .li{line-height: normal;font-size: 13px;padding: 10px 0 10px 0}
  .ul{padding-top: 10px}
  .editInput{width: 30%;font-size: 12px}
  .editPersonInfoSubmit{width: 140px;height: 36px;font-size: 14px;}
  .reset{color: #5386E4;border: 1px solid #5386E4;margin-left: 50px}
</style>
