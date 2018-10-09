<template>
  <div>
    <el-dialog width="35%" :visible.sync="visiable" title="新建">
      <el-form ref="addForm" :model="addFormData" :rules="rules" label-width="100px">
        <el-form-item label="维度：" prop="tag">
          <el-select v-model="addFormData.tag" placeholder="请选择" style="width: 90%">
            <el-option v-for="option in queryEnumList" :key="option.syscode" :label="option.sysname" :value="option.syscode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名单值：" prop="uniqueId">
          <el-input v-model="addFormData.uniqueId" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remark">
          <el-input v-model="addFormData.remark" type="textarea" placeholder="不超过200个汉字" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const defaultFormData = {
  tag: '',
  remark: '',
  uniqueId: ''
};

export default {
  data() {
    return {
      addFormData: {
        tag: '',
        remark: '',
        uniqueId: ''
      },
      rules: {
        tag: [
          {required: true, message: '请选择维度', trigger: 'blur'},
        ],
        uniqueId: [
          {required: true, message: '请填写名单值', trigger: 'blur'},
        ],
        remark: [
          {max: 200, message: '最多请输入200个字', trigger: 'blur'},
        ],
      }
    };
  },
  props: {
    queryEnumList: {
      type: Array,
      required: true
    },
    visiable: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.addFormData = Object.assign({}, defaultFormData);
  },
  methods: {
    close() {
      this.$refs.addForm.resetFields();
      this.$emit('addClose');
    },
    submit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$emit('addSubmit', this.addFormData);
        }
      });
    }
  }
};
</script>