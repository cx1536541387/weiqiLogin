<template>
  <div id="changeemail">
    <blue-title>修改邮箱</blue-title>
    <div class="title-con">
      <p class="title">
        <img src="~assets/img/common/icon.jpg" alt="" width="30px" height="30px">
        欢迎修改邮箱</p>
    </div>
    <div class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm">
        <el-form-item label="用户账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="原邮箱" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {validateEmail} from 'common/validate'

import {changeEmail} from 'network/user/changeEmail'

export default {
  name:'ChangeEmail',
  data(){
    return {
      ruleForm: {
        username:this.$store.state.username,
        email:'',
      },     
      rules: {
        email: [
          { required: true, message: '请输入原邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
      },
    }
  },
  components:{
    BlueTitle
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changeEmail(this.ruleForm.username,this.ruleForm.email)
          this.$message({
            message: '邮箱修改成功',
            type: 'success'
          });
          this.$store.state.email = this.ruleForm.email
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style>
/* 头标题 */
#changeemail .title-con{
  height: 30px;
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}
#changeemail .title-con img{
  position: relative;
  top: 7px;
  right: 10px;
}
#changeemail .title{
  display: inline-block;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
}
/* 输入框部分 */
#changeemail .el-form-item__label:before{
  content: ""
}
#changeemail .el-form-item__label{
  user-select: none;
}
#changeemail .box{
  width: 350px;
  margin: 0 auto
}
</style>