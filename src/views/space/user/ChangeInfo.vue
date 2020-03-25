<template>
  <div id="changeinfo">
    <div class="title-con">
      <p class="title">
        <img src="~assets/img/common/icon.jpg" alt="" width="30px" height="30px">
        欢迎修改个人信息</p>
    </div>
    <div class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" class="selectInput">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="隐藏" value="隐藏"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model="ruleForm.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel">
          <el-input type="tel" v-model="ruleForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="段位" prop="level" placeholder="请选择您的段位水平">
          <el-select v-model="ruleForm.level" class="selectInput">
            <el-option label="新手" value="1"></el-option>
            <el-option label="业余" value="2"></el-option>
            <el-option label="专业" value="3"></el-option>
          </el-select>
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
import {validateName,validateAge,validateTel} from 'common/validate'

import {changeInfo} from 'network/user/changeInfo'

export default {
  name:'ChangeInfo',
  data(){
    return {
      ruleForm: {
        username:'',
        name:'',
        sex:'',
        age:'',
        tel:'',
        level:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入用户年龄', trigger: 'blur' },
          { validator: validateAge, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入用户所使用的手机号', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择用户段位水平', trigger: 'blur' },
        ],
      }
    }
  },
  mounted(){
    this.ruleForm.username=this.$store.state.username,
    this.ruleForm.name=this.$store.state.name,
    this.ruleForm.sex=this.$store.state.sex,
    this.ruleForm.age=this.$store.state.age,
    this.ruleForm.tel=this.$store.state.tel,
    this.ruleForm.level=this.$store.state.level
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changeInfo(this.ruleForm).then(res=>{
            if(res.data.key){
              this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.$store.state.name = this.ruleForm.name,
              this.$store.state.sex = this.ruleForm.sex,
              this.$store.state.age = this.ruleForm.age,
              this.$store.state.tel = this.ruleForm.tel,
              this.$store.state.level = this.ruleForm.level
            }else{
              this.$message.error(res.data.message);
            } 
          })
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
#changeinfo .title-con{
  height: 30px;
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}
#changeinfo .title-con img{
  position: relative;
  top: 7px;
  right: 10px;
}
#changeinfo .title{
  display: inline-block;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
}
#changeinfo .el-input{
  width: 200px;
}
/* 输入框部分 */
#changeinfo .el-form-item__label:before{
  content: ""
}
#changeinfo .el-form-item__label{
  user-select: none;
}
#changeinfo .box{
  width: 260px;
  margin: 0 auto;
}
</style>