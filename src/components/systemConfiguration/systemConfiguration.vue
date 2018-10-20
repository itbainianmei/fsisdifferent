<!--系统配置管理-->
<template>
  <div class="dataContent">
    <div class="contentTop clear">
      <div class="serBtn">菜单项:
        <template>
          <el-select v-model="sysrem" placeholder="请选择" style='width:55%'>
            <el-option
              v-for="(value,key) in menuList"
              :key="key"
              :label="key"
              :value="key">
            </el-option>
          </el-select>
        </template>
      </div>
      <div class="serBtn" >类型名称:
        <template>
          <el-select v-model="value" placeholder="请选择" style='width:55%'>
            <el-option
              v-for="item in sslxmc"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </template>
      </div>
      <!-- <div class="serBtn">代码:  <el-input placeholder="请输入内容" clearable class="ipt" ref="getdm" v-model="codeGetdm"></el-input></div> -->
      <div class="serBtn">枚举值:  <el-input placeholder="请输入内容"  clearable class="ipt" ref="getlx" v-model="getType"></el-input></div>
      <div class="serchImg" @click="Serch(1)" v-if="searchPermission">
        <img src="../../images/fdj.png" alt="" >
      </div>
    </div>
    <div class="contentBotoom">
      <div class="button">
        <div class="leftButton clear">
          <div class="BotoomBtn leftRadius" v-if="addPermission">
            <div class="addIcon" @click="dataAdd = true"></div>
          </div>
          <div class="BotoomBtn" v-if="delPermission">
            <div class="removIcon"  @click="removData"></div>
          </div>
          <div class="BotoomBtn" v-if="refreshPermission">
            <div class="refreshIcon" @click="refreshData"></div>
          </div>
          <div class="BotoomBtn rightRadius" @click="downloadData" v-if="printPermission">
            <div class="downloadIcon"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <!--修改对话框-->
      <div class="hiddeBox">
        <el-dialog title="系统配置修改" :visible.sync="dataAmend" width="400px" v-dialogDrag>
          <el-form ref="form" :model="editForm" label-width="100px" size="small" style="margin-right: 15px;" :rules='editRule'>

            <el-form-item label="菜单项:" prop='sysrem'>

              <el-select v-model="editForm.sysrem" id='editType' placeholder="请选择" @change='changeSysRemData' style='width:200px'>
                <el-option
                  v-for="item in sysRemData"
                  :key="item.sysconid"
                  :label="item.sysrem"
                  :value="item.sysrem">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型名称:" prop='typename'>

              <el-select v-model="editForm.typename" id='editTypeName' placeholder="请选择" @change='changeVal' style='width:200px'>
                <el-option
                  v-for="item in sysTypeNameList"
                  :key="item.id"
                  :label="item.typename"
                  :value="item.typename">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="代码:" prop='syscode'>
              <el-input id='editTypeCode' clearable  v-model="editForm.syscode" class='iptOnline'></el-input>
            </el-form-item>
            <el-form-item label="枚举值:" prop='sysname'>
              <el-input id='editUserType' clearable v-model="editForm.sysname" class='iptOnline'></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop='sys'>
             <!-- <el-input-number v-model="editForm.sys" controls-position="right" @change="handleChange" :min="1" ></el-input-number>-->
             <el-input id='editPaixu' clearable type="number" min="0" v-model="editForm.sys" class='iptOnline' ></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop='syssta'>
              <el-checkbox-group v-model="editForm.syssta">
                <el-checkbox label="是否启用" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- <el-form-item label="备注:">
              <el-input type="textarea" v-model="editForm.sysrem"></el-input>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dataAmend = false">取 消</el-button>
            <el-button type="primary" @click="amendMsg">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!--新建对话框-->
      <div class="hiddeBox">
        <el-dialog title="新建系统配置" :visible.sync="dataAdd" width="400px" v-dialogDrag>
          <el-form ref="form" :model="form" label-width="100px" size="small" style="margin-right: 15px;"  :rules='addRule'>
            <!-- <el-form-item label="类型:" prop='type'>
              <input type="number" min="0" v-model="form.systype" style="height: 36px;border-radius: 19px" id='type'>
            </el-form-item> -->
             <el-form-item label="菜单项:"  prop='sysrem'>

              <el-select v-model="form.sysrem" id='type' placeholder="请选择" @change='changeSysRemData' style='width:200px'>
                <el-option
                  v-for="item in sysRemData"
                  :key="item.sysconid"
                  :label="item.sysrem"
                  :value="item.sysrem">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型名称:" prop='typename'>
              <!-- <el-input v-model="form.typename" id='typename'></el-input> -->
              <el-select v-model="form.typename" id='typename' placeholder="请选择" @change='changeVal' style='width:200px'>
                <el-option
                  v-for="item in EditsysTypeNameList"
                  :key="item.id"
                  :label="item.typename"
                  :value="item.typename">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="代码:" prop='syscode'>
              <el-input v-model="form.syscode" clearable id='code' class='iptOnline'></el-input>
            </el-form-item>
            <el-form-item label="枚举值:" prop='sysname'>
              <el-input v-model="form.sysname" clearable id='name' class='iptOnline'></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop='sys' >

             <!-- <el-input-number  controls-position="right" @change="handleChange" :min="1" ></el-input-number>-->
              <el-input type="number" id='paixun' clearable v-model="form.sys" min="0" class='iptOnline'></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop='syssta'>
              <el-checkbox-group v-model="form.syssta">
                <el-checkbox label="是否启用" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dataAddClose">取 消</el-button>
            <el-button type="primary" @click="addMsg">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-dialog v-dialogDrag title="删除" :visible.sync="delDialog" width="30%" style="text-align:center">
        <span>确定要删除以下系统配置吗？</span>
        <p v-for="(item,index) in multipleSelection" :key="index">系统配置ID={{item.sysconid}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialog = false">取 消</el-button>
          <el-button type="primary" @click="delSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="contentData">
      <div class="dataTable clear">
        <el-table
          fixed
          max-height="600"
          :data="tableData"
          border
          style="width:98%;margin:0 auto;"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="sysconid"
            label="系统配置ID"
             sortable
             width="130"
             align='center'
          >
          </el-table-column>
           <el-table-column
            prop="sysrem"
            label="菜单项"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="systype"
            label="类型"
            v-if="false"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="typename"
            label="类型名称"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="syscode"
            label="代码"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="sysname"
            label="枚举值"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="sys"
            label="排序"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="syssta"
            label="状态"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="curuser"
            label="创建人"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="cretm"
            label="创建时间"
            align='center'
          >
          </el-table-column>
          <el-table-column
            label="最后更新时间"
            width="100px"
            prop="uptm"
            align='center'
          >
          </el-table-column>
          <el-table-column
            prop="upuser"
            label="更改者"
            align='center'
          >
          </el-table-column>
          <el-table-column label="修改" align='center'>
            <template slot-scope="scope" v-if="editPermission">
              <div class="xgImg" @click="handleClick(scope.row,scope.$index)">
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <div class='pagination'>
          <span>每页显示</span>
          <select  class="evetotal"  @change="handleSizeChange">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
        <div class='paginationRight'>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size = pageNum
            layout="total, prev, pager, next"
            :total = pageCount>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name:'系统配置管理',
    data() {
      return {
        searchPermission: true,//搜索权限
        addPermission: true,//新建权限
        delPermission: true,//删除
        refreshPermission: true,//刷新
        printPermission: true,//打印
        editPermission: true,//修改
        getType:'',
        codeGetdm:'',
        delDialog:false,
        currentPage2: 1,
        editForm:{
          "sysconid":'',
          "sysname":'',
          "systype":'',
          "typename":'',
          "syscode":'',
          "sysrem":'',
          "sys":'',
          "syssta":''
        },
        tableData: [],

        // select内容
        menuList: [],
        sslxmc: [],
        sysrem: '', //菜单项
        value: '',

        // form表单
        form:{
         "sysname":'',
         "systype":'',
         "typename":'',
         "syscode":'',
         "sysrem":'',
         "sys":'',
         "syssta":'',

        },

        // 弹框开关控制
        dataAdd:false,
        dataAmend:false,

        multipleSelection: [],
        pageNum:10,
        startNum:'',
        numStart:'',
        select:[],
        rtabledata:[],
        totalNum:0,
        addSysType:[],

        sysRemData:[],
        sysTypeNameList:[],
        EditsysTypeNameList:[],
        menuListItem:'',
        selectValue:'',
        addRule:{
          sysrem:[
            {required:true,message: "菜单项为必选项", trigger: "change"}
          ],
          typename:[
            {required:true,message: "类型名称为必选项", trigger: "change"}
          ],
          syscode:[
            {required:true,message: "代码为必填项", trigger: "change"}
          ],
          sysname:[
            {required:true,message: "枚举值为必填项", trigger: "change"}
          ],
          sys:[
            {required:true,message: "排序为必填项", trigger: "change"}
          ],
          syssta:[
            {required:true,message: "状态为必选项", trigger: "change"}
          ]
        },
        editRule:{
          sysrem:[
            {required:true,message: "菜单项为必选项", trigger: "change"}
          ],
          typename:[
            {required:true,message: "类型名称为必选项", trigger: "change"}
          ],
          syscode:[
            {required:true,message: "代码为必填项", trigger: "change"}
          ],
          sysname:[
            {required:true,message: "枚举值为必填项", trigger: "change"}
          ],
          sys:[
            {required:true,message: "排序为必填项", trigger: "change"}
          ],
          syssta:[
            {required:true,message: "状态为必选项", trigger: "change"}
          ]
        },
        pageCount:0
      }
    },
    created (){
      // 按钮权限
      const idList = JSON.parse(localStorage.getItem('ARRLEVEL'));
      this.searchPermission = idList.indexOf(272) === -1 ? false : true;
      this.addPermission = idList.indexOf(273) === -1 ? false : true;
      this.delPermission = idList.indexOf(275) === -1 ? false : true;
      this.refreshPermission = idList.indexOf(272) === -1 ? false : true;
      this.printPermission = idList.indexOf(314) === -1 ? false : true;
      this.editPermission = idList.indexOf(274) === -1 ? false : true;
    },
    methods: {
      // 获取搜索条件中的菜单项和类型名称，二者是联动的
      getMenuList () {
        this.menuList;
        this.$axios.get('/SysConfigController/getSelectInfo').then(res => {
          const data = res.data;
          if (data.status == 1) {
            this.menuList = data.data;
          }
        }).catch(error => {
          console.log(error);
        });
      },
      handleChange(){},
      onSubmit() {
        console.log('submit!');
      },
      changeSysRemData(val){
        //console.log(val)
        this.editForm.typename = ''
        this.form.typename = ''
        this.menuListItem = val
        this.$axios.post("/SysConfigController/selectBySysRem",qs.stringify({
          "sessionId":localStorage.getItem('SID'),
          "sysRem":val
        }))
        .then(res => {
          //console.log(res.data)
          this.sysTypeNameList = res.data
          this.EditsysTypeNameList = res.data
        })
        .catch(error => {
          console.log(error)
        })

      },
      changeVal(val){
        //console.log(val)
        this.selectValue = val

        this.addSysType.forEach(ele => {

        })

        this.$axios.post("/SysConfigController/getInitBySys",qs.stringify({
          "sessionId":localStorage.getItem('SID'),
          "sysRem":this.menuListItem,
          "typeName":val
        }))
        .then(res => {
          console.log(res.data)
          this.form.systype = res.data[0].systype
          this.editForm.systype = res.data[0].systype
        })
        .catch(error => {
          console.log(error)
        })
      },
      // getTypename(){
      //   this.$axios.get("/SysConfigController/getSysNameAndType?sessionId=" + localStorage.getItem('SID'))
      //     .then(res => {
      //       //console.log(res.data);
      //       // this.selectedData=[];
      //       //res.data.forEach(ele=>this.selectedData.push(ele));
      //       this.sslxmc = this.sslxmc.concat(res.data)
      //     })
      //     .catch( error => {
      //       console.log(error);
      //     })
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        this.select = [];
        for(let i = 0;i<this.multipleSelection.length;i++){
          this.select.push(this.multipleSelection[i].sysconid);
        }
        console.log(this.select)
      },
      handleClick(row,index) {
        this.dataAmend = true;
        this.editForm = row
        if(row.syssta == "启用" ){
          this.editForm.syssta = true
        }else if(row.syssta == "未启用"){
          this.editForm.syssta = false
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      refreshData(){
        this.Serch(1)
      },
      downloadData(){
        //this.$router.push({name:'系统配置数据下载',params:{data:this.rtabledata}});
        if(this.numStart === '' || this.numStart === undefined){
          this.numStart = this.currentPage2
        }
        if(this.pageNum === ''){
          this.pageNum = 10
        }
         let startNum = this.numStart
        if(this.tableData.length > 0){
          let obj = {}
              obj.type = 'XT_PZ'
              obj.startnum = parseInt(this.numStart)
              obj.pagenum = parseInt(this.pageNum)
              obj.sysName = this.getType
              obj.typeName = this.value
              obj.sysRem = this.sysrem
            localStorage.setItem('OBJ',JSON.stringify(obj))
            window.open(window.location.href.split('#')[0] + '#/downloadpage0')
        }
      },
      Serch(current = 1){
        this.currentPage2 = current;
        if (this.searchPermission === false) return;
        if(this.numStart === '' || this.numStart === undefined){
          this.numStart = this.currentPage2
        }
        if(this.pageNum === ''){
          this.pageNum = 10
        }
        let params = {}
            params.sysRem = this.sysrem
            params.typeName = this.value
            // params.sysCode = this.codeGetdm
            params.sysName = this.getType
            // params.sysType = this.getType
            params.pageNum = current
            params.pageSize = parseInt(this.pageNum)

        this.$axios.post('/SysConfigController/query',qs.stringify(params))
        .then(res => {
          console.log(res.data)
          if(res.data.status === 1){
            this.tableData = []
            this.tableData = this.tableData.concat(res.data.data.list)
            this.pageCount = res.data.data.pageCount

            this.tableData.forEach(ele => {
              if(ele.syssta === 0){
                  ele.syssta = '未启用'
              }else if(ele.syssta === 1){
                  ele.syssta = '启用'
              }
            })
          }
        })
      },
      dataAddClose(){
        this.dataAdd = false
        this.form.sys = ''
        this.form.sysrem = ''
        this.form.typename = ''
        this.form.syssta = false
        this.form.syscode = ''
        this.form.sysname = ''
      },
      addMsg(){
        if(document.querySelector('#type').value === ''){
            document.querySelector('#type').style.border = "1px solid #f56c6c"
              this.$alert('菜单项不能为空',"系统提示",{
                type:'warning',
                confirmButtonText: '确定',
              })
            return
        }else if(document.querySelector('#type').value !== ''){
             document.querySelector('#type').style.border = "1px solid #dcdfe6"
             if(document.querySelector("#typename").value === ''){
                  document.querySelector("#typename").style.border = "1px solid #f56c6c"
                  this.$alert('类型名称不能为空',"系统提示",{
                    type:'warning',
                    confirmButtonText: '确定',
                  })
                  return
              }else if(document.querySelector("#typename").value !== ''){
                document.querySelector("#typename").style.border = "1px solid #dcdfe6"
                if(document.querySelector("#code").value === ''){
                    document.querySelector("#code").style.border = "1px solid #f56c6c"
                    this.$alert('代码不能为空',"系统提示",{
                      type:'warning',
                      confirmButtonText: '确定',
                    })
                    return
                }else if(document.querySelector("#code").value !== ''){
                    document.querySelector("#code").style.border = "1px solid #dcdfe6"
                    if(document.querySelector("#name").value === ''){
                        document.querySelector("#name").style.border = "1px solid #f56c6c"
                        this.$alert('枚举值不能为空',"系统提示",{
                          type:'warning',
                          confirmButtonText: '确定',
                        })
                        return
                    }else if(document.querySelector("#name").value !== ''){
                        document.querySelector("#name").style.border = "1px solid #dcdfe6"
                        if(document.querySelector("#paixun").value === '' || document.querySelector("#paixun").value === null){
                              document.querySelector("#paixun").style.border = "1px solid #f56c6c"
                              this.$alert('排序不能为空',"系统提示",{
                                type:'warning',
                                confirmButtonText: '确定',
                              })
                              return
                        }else if(document.querySelector("#paixun").value !== '' || document.querySelector("#paixun").value !== null){
                              document.querySelector("#paixun").style.border = "1px solid #dcdfe6"
                        }
                    }
                }
              }
        }

        if(this.form.syssta === ""){
          this.form.syssta = 0
        }else if(this.form.syssta !== ""){
          if(this.form.syssta === true){
            this.form.syssta = 1
          }else if(this.form.syssta === false){
            this.form.syssta = 0
          }
        }

        this.form.sys = this.form.sys.toString()
        this.form.sysrem = this.menuListItem
        this.form.typename = this.selectValue
        this.form.sessionId = localStorage.getItem('SID')

        console.log( typeof (this.form.sys.toString()))
        console.log( this.form)

        this.$axios.post("/SysConfigController/addSysConfig",qs.stringify(this.form))
          .then( res => {
            console.log(res.data)
            if(res.data.code === "1"){
              this.$alert('新建' + res.data.message,"提示",{
                type:'success',
                confirmButtonText: '确定',
                callback: action => {
                    this.dataAdd = false
                    this.form.sys = ''
                    this.form.sysrem = ''
                    this.form.typename = ''
                    this.form.syssta = false
                    this.form.syscode = ''
                    this.form.sysname = ''
                    // this.form = {}
                    this.Serch(1)
                }
              })

            }else if(res.data.code !== "1"){
              this.$alert('新建' + res.data.message,"提示",{
                type:'warning',
                confirmButtonText: '确定',
                callback: action => {

                }
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      delSubmit(){

        console.log()
         this.$axios.post("/SysConfigController/deteleSysConfig",qs.stringify({
           "sessionId":localStorage.getItem('SID'),
           'sysconid':this.select.join(',')
           }))
           .then(res => {
              console.log(res.data)
             if(res.data.code === "1"){
                this.$alert('删除' + res.data.message,"提示",{
                  confirmButtonText: '确定',
                  type:'success',
                  callback: action => {
                      this.delDialog = false
                    this.Serch(1)
                  }
                })
             }
           })
           .catch( error => {
              console.log(error);
            })
      },
      amendMsg(){
        // console.log(this.editForm)
          if(document.querySelector('#editType').value === ''){
            document.querySelector('#editType').style.border = '1px solid #f56c6c'
            this.$alert('菜单项不能为空',"系统提示",{
                type:'warning',
                confirmButtonText: '确定',
            })
            return
          }else if(document.querySelector('#editType').value !== ''){
             document.querySelector('#editType').style.border = '1px solid #dcdfe6'
             if(document.querySelector("#editTypeName").value === ''){
                document.querySelector("#editTypeName").style.border = "1px solid #f56c6c"
                this.$alert('类型名称不能为空',"系统提示",{
                  type:'warning',
                  confirmButtonText: '确定',
                })
                return
             }else if(document.querySelector("#editTypeName").value !== ''){
                document.querySelector("#editTypeName").style.border = "1px solid #dcdfe6"
                if(document.querySelector("#editTypeCode").value === ''){
                    document.querySelector("#editTypeCode").style.border = "1px solid #f56c6c"
                    this.$alert('代码不能为空',"系统提示",{
                      type:'warning',
                      confirmButtonText: '确定',
                    })
                    return
                }else if(document.querySelector("#editTypeCode").value !== ''){
                    document.querySelector("#editTypeCode").style.border = "1px solid #dcdfe6"
                    if(document.querySelector("#editUserType").value === ''){
                        document.querySelector("#editUserType").style.border = "1px solid #f56c6c"
                        this.$alert('枚举值不能为空',"系统提示",{
                          type:'warning',
                          confirmButtonText: '确定',
                        })
                        return
                    }else if(document.querySelector("#editUserType").value !== ''){
                        document.querySelector("#editUserType").style.border = "1px solid #dcdfe6"
                        if(document.querySelector("#editPaixu").value === ''){
                              document.querySelector("#editPaixu").style.border = "1px solid #f56c6c"
                              this.$alert('排序不能为空',"系统提示",{
                                type:'warning',
                                confirmButtonText: '确定',
                              })
                              return
                        }else if(document.querySelector("#editPaixu").value !== ''){
                               document.querySelector("#editPaixu").style.border = "1px solid #dcdfe6"
                        }
                    }
                }
             }

          }


        if(this.editForm.syssta === "启用" || this.editForm.syssta === true){
          this.editForm.syssta = parseInt(1)
        }else if(this.editForm.syssta === "未启用" || this.editForm.syssta === false){
          this.editForm.syssta = parseInt(0)
        }

        // this.editForm.sysrem = this.menuListItem
        // this.editForm.typename = this.selectValue
        this.editForm.sessionId = localStorage.getItem('SID')

        this.$axios.post("/SysConfigController/updateSysConfig",qs.stringify(this.editForm))
          .then( res => {
            if(res.data.code * 1 === 1) {
              this.$alert(res.data.message,"修改",{
                confirmButtonText: '确定',
                type: 'success',
                callback: action => {
                  this.dataAmend = false;
                }
              })
              this.Serch(1)
            }
          })
          .catch( error => {
            console.log(error);
          })
      },
      removData(){
        if(this.select.length === 0){
          this.$alert('请选择记录',"出错提示",{
            confirmButtonText: '确定',
            type:'warning',
            callback: action => {
            }
          })
          return
        }else if(this.select.length !== 0){
          this.delDialog = true
        }
      },
      handleSizeChange(val) {
        this.pageNum = parseInt(val.target.value)
        this.Serch(1)
      },
      handleCurrentChange(val) {
        this.startNum = val
        this.numStart = val
        this.Serch(parseInt(val))
      },
      getSysMenu(){
        this.$axios.get("/SysConfigController/getSysRem?sessionId=" + localStorage.getItem('SID'))
        .then(res => {
          //console.log(res.data)
          this.sysRemData = res.data
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    mounted(){
      // this.getTypename()
      this.getMenuList();
      this.getSysMenu()
    },
    watch:{
      dataAdd(){
        if(this.dataAdd == false){
            this.Serch(1)
        }
      },
      dataAmend(){
        if(this.dataAmend == false){
            this.Serch(1)
        }
      },
      sysrem(curVal,oldVal){// 菜单项和类型名称进行联动
        if (curVal != oldVal) {
          this.sslxmc = this.menuList[curVal];
        }
      }
    }
  }
</script>
<style scoped>
  .el-dialog__body {
    padding-left: 30px;
  }
  .dialog-footer{background-color: #F1F2F5;border: none}
  .clear:after {
    clear: both;
    content: ".";
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  .dataContent {
    width: 100%;
    background-color: #fff;
    font-size: 13px;
  }
  .ipt {
    width: 55%;
    height: 39px;
    margin-right: 40px;
    margin-left: 10px;
    border-radius: 24px;
  }
  .contentTop {
    padding: 30px;
    border-bottom: 1px solid #e0e0e0;
    border-top:1px solid #e0e0e0;
    display: flex;
    justify-content: space-around;
  }
  .contentBotoom {
    height: 60px;
    width: 100%;
    background-color: #fff;
    font-size: 13px;
    padding-top: 25px;
  }
  .BotoomBtn {
    width: 44px;
    height: 30px;
    margin: 0;
    margin-left: -1px;
    border: 1px solid #38e139;
    background-color: #fff;
    float: left;
    cursor: pointer;
  }
  .BotoomBtn:hover {
    background-color: #38e139;
  }

  .leftRadius {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  .rightRadius {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .leftButton {
    float: left;
    margin-left: 80px;
  }
  .contentData {
    background-color: #fff;border-right: 10px solid #ffffff;
    border-right:0;

  }
  .addIcon {
    background: url(../../images/icon.png) no-repeat 6px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .addIcon:hover {
    background: url(../../images/icon.png) no-repeat 6px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .amendIcon {
    background: url(../../images/icon.png) no-repeat -27px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .amendIcon:hover {
    background: url(../../images/icon.png) no-repeat -27px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .xgImg{
    background: url(../../images/icon.png) no-repeat -37px -7px;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    margin-top: 5px;
    border: 1px solid #38E139;
    cursor: pointer;
    border-radius: 5px;
  }
  .xgImg:hover{
    background: url(../../images/icon.png) no-repeat -37px -32px;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    background-color: #38E139;
    cursor: pointer;
    margin-top: 5px;
    border-radius: 5px;

  }
  .removIcon {
    background: url(../../images/icon.png) no-repeat -62px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .removIcon:hover {
    background: url(../../images/icon.png) no-repeat -62px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .refreshIcon {
    background: url(../../images/icon.png) no-repeat -93px -9px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .refreshIcon:hover {
    background: url(../../images/icon.png) no-repeat -93px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .downloadIcon {
    background: url(../../images/icon.png) no-repeat -127px -8px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .downloadIcon:hover {
    background: url(../../images/icon.png) no-repeat -127px -32px;
    width: 44px;
    height: 30px;
    margin: 0 auto;
    margin-top: 5px;
  }
  .active {
    background-color: #38e139;
  }
  .serchImg {
    width: 10%;
    height: 36px;
    border-radius: 100px;
    background-color: #3faaf9;
    display: -webkit-inline-box;
    position: relative;
    cursor: pointer;
  }
  .serchImg img {
    width: 37px;
    position: absolute;
    left: 50%;
    margin-left:-17px;
  }
  .serBtn {
    float: left;
  }
  .block {
    margin-top: 25px;
    margin-left: 25px;
  }
  .el-table th > .cell {
    color: #353535;
    font-weight: 400;
  }
  .block{
    float: right;
    margin-right: 20px;
  }
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
  input{
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding-left: 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  input:focus{
    border: 1px solid #3FAAF9;
  }
  .disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .serBtn{width:30%}
  .iptOnline{
  margin-right:15px;
  height: 36px;
  line-height: 36px;
  width: 200px;
}
.block{margin-top:34px;width:100%}
  .evetotal{
    margin-left: 3px; padding-left: 10px;
    background:url(../../images/xxjt.png) no-repeat;
    background-position: 34px 8px; background-size:7px 5px;
    outline: none;
    appearance:none;-moz-appearance:none;
    -webkit-appearance:none;width:50px;height:22px;
    border: 1px solid #E0E0E0;
    border-radius: 100px;
    font-family: PingFangSC-Regular;
    font-size: 12px;  color: #333333;
  }
  .paginationRight{display:inline-block;float: right;}


</style>

