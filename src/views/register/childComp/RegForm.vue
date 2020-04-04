<template>
  <div id="regform">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm" autocomplete="off">
      <el-form-item label="用户账号" prop="username">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForm.sex" class="selectInput">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="隐藏" value="隐藏"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input type="text" v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input type="tel" v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="段位" prop="level" placeholder="请选择您的段位水平">
        <el-select v-model="ruleForm.level" class="selectInput">
          <el-option label="新手" value="1"></el-option>
          <el-option label="业余" value="2"></el-option>
          <el-option label="专业" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input type="text" v-model="ruleForm.code"class="codeInput"></el-input>
        <check @getCode="check"/>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  
</template>

<script>
import Check from 'components/common/Check'

import {register} from 'network/user/register'

import {validateUsername,
        validatePass,
        validateName,
        validateAge,
        validateTel,
        validateEmail,} from 'common/validate'

export default {
  name:'RegForm',
  components:{
    Check
  },
  data(){
    // 密码验证函数
    let validatePass2 = (rule, checkPass, callback)=> {
      if (checkPass !== this.ruleForm.pass) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };
    // 验证码验证函数
    let validateCode = (rule, code, callback)=>{
      if (code.toLowerCase() !== this.checkCode){
        callback(new Error('验证码输入错误'))
      } else {
        callback()
      }
    };
    return {
      ruleForm: {
        username:'',
        pass: '',
        checkPass: '',
        name: '',
        sex:'男',
        age:'',
        tel:'',
        level:'1',
        email:'',
        code:'',
        checkCode:''
      },
      rules: {
        username:[
          { required: true, message: '请输入账号', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
      }
    }
  },
  // 监听输入框 禁止输入框输入中文  账号 邮箱 手机
  watch:{
    ruleForm:{
      handler(val, oldVal){
        this.ruleForm.username = this.ruleForm.username.replace(/[\u4E00-\u9FA5]/g, '')
        this.ruleForm.age = this.ruleForm.age.replace(/[^\d]/g,'')
        this.ruleForm.tel = this.ruleForm.tel.replace(/[^\d]/g,'')
        this.ruleForm.email = this.ruleForm.email.replace(/[\u4E00-\u9FA5]/g, '')
        this.ruleForm.code = this.ruleForm.code.replace(/[\u4E00-\u9FA5]/g, '')
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {         
          register(this.ruleForm).then(res=>{
            if(res.data.key){
              this.$message({
                message: '恭喜你，账号注册成功',
                type: 'success'
              });   
            }else{
              this.$message('账号注册失败,请稍后再试！')
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
    // 验证码赋值给checkCode
    check(val){
      this.checkCode = val.toLowerCase();
      if(this.ruleForm.code){
        this.$refs.ruleForm.validateField('code');
      }
    }
  }
}
</script>

<style>
#regform{
  width: 300px;
  margin: 0 auto
}

#regform .el-form-item__label:before{
  content: ""
}
#regform .el-form-item__label{
  user-select: none;
}
/* 验证码输入框长度 */
.selectInput{
  width: 225px;
}
.codeInput{
  width: 110px;
}
</style>