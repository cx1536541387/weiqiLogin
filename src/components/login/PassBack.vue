<template>
  <div id="passback">
    <div class="title-con">
      <p class="title"><img src="~assets/img/common/icon.jpg" alt="" width="30px" height="30px">欢迎使用密码找回</p>
    </div>
    <form action="" class="form-box" autocomplete="off">
      <div class="input-box">
        <span  :class="{focus:isFocus,warnSpan:index}" class="p1">账号</span>
        <input :class="{focus:isFocus,warnInput:index}" 
                @focus="isFocus=true" 
                @blur="check1()" 
                type="text" 
                name="username"
                id="username"
                v-model="username"
                onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"/>
        <p class="p2" v-show="index">{{errorMessage[index]}}</p>
      </div>
      <div class="input-box">
        <span  :class="{focus:isFocus1,warnSpan:index1}" class="p1">邮箱</span>
        <input :class="{focus:isFocus1,warnInput:index1}" 
                @focus="isFocus1=true" 
                @blur="check2()" 
                type="text" 
                name="email"
                id="email"
                title="请输入该账号绑定的邮箱"
                v-model="email"/>
        <p class="p2" v-show="index1">{{errorMessage[index1]}}</p>
      </div>
      <div class="input-box">
        <span  :class="{focus:isFocus2,warnSpan:index2}" class="p1">新密码</span>
        <input :class="{focus:isFocus2,warnInput:index2}"
                @focus="isFocus2=true" 
                @blur="check3()" 
                type="password" 
                name="password"
                id="pass"
                title="密码可包括数字字母下划线+-和.,7-12位"
                v-model="pass"
                />
        <p class="p2" v-show="index2">{{errorMessage[index2]}}</p>
      </div>
      <div class="input-box">
        <span  :class="{focus:isFocus3,warnSpan:index3}" class="p1">确认密码</span>
        <input :class="{focus:isFocus3,warnInput:index3}"
                @focus="isFocus3=true" 
                @blur="check4()" 
                type="password" 
                name="password2"
                id="pass2"
                v-model="pass2"/>
        <p class="p2" v-show="index3">{{errorMessage[index3]}}</p>
      </div>
      <div class="btn-box">
        <button type="button" class="btn" id="login" @click="open">修改</button>
        <button type="reset" class="btn" @click="reset">重置</button>
      </div>
    </form>
  </div>
</template>

<script>
import {checkUsername,checkEmail,checkPass,checkPass2} from 'common/validate'
import {changePass} from 'network/user/passback'

export default {
  name:'PassBack',
  data(){
    return {
      username:'',
      email:'',
      pass:'',
      pass2:'',
      index:false,
      index1:false,
      index2:false,
      index3:false,
      isFocus:false,
      isFocus1:false,
      isFocus2:false,
      isFocus3:false,
      errorMessage:[
        true,
        '请输入账号',
        '账号不存在或输入错误',
        '请输入邮箱',
        '邮箱输入错误',
        '请输入密码',
        '密码可包括数字字母下划线+-和.,7-12位',
        '请再次输入密码',
        '两次密码不一致'
      ],
    }
  },
  watch:{
    username(){
      this.username = this.username.replace(/[\u4E00-\u9FA5]/g, '')   
    },
    email(){
      this.email = this.email.replace(/[\u4E00-\u9FA5]/g, '')
    }
  },
  methods:{
    setData(val){
      this.index=val,
      this.index1=val,
      this.index2=val,
      this.index3=val,
      this.isFocus=val,
      this.isFocus1=val,
      this.isFocus2=val,
      this.isFocus3=val
    },
    open() {
      this.$confirm('确定修改密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.username && this.pass && this.pass2 && this.email){
          if(!this.index && !this.index1 && !this.index2 && !this.index3){
            changePass(this.username,this.pass)
            this.$message({
              type: 'success',
              message: '密码修改成功!',
            });
          }
        }
        else{
          this.$message.error('密码修改失败，请检查输入框是否有空项或错误!')
        }
      }).catch(() => {});
    },
    check1(){
      if(checkUsername(this.username) == '1'){
        this.index = '1'
      }else if(checkUsername(this.username)){
        checkUsername(this.username).then(res=>{
          if(res){
            this.index = res
          }else{
            this.index = '';
            this.isFocus=false
          }
        })
      }
      if(this.username && this.email){
        this.check2()
      }
    },
    check2(){
      if(this.index==''){
        if(checkEmail(this.username,this.email) == '3'){
          this.index1 = '3'
        }else if(checkEmail(this.username,this.email)){
          checkEmail(this.username,this.email).then(res=>{
            if(res){
              this.index1 = res
            }else{
              this.index1 = '';
              this.isFocus1=false
            }
          })        
        }
      }else{
        this.index1 = '';
        this.isFocus1=false
      }
    },
    check3(){
      if(checkPass(this.pass)){
        this.index2 = checkPass(this.pass)
      }else{
        this.index2 = ''
        this.isFocus2=false
      }
      if(this.pass && this.pass2){
        this.check4()
      }
    },
    check4(){
      if(checkPass2(this.pass2,this.pass)){
        this.index3 = checkPass2(this.pass2,this.pass)
      }else{
        this.index3 = ''
        this.isFocus3=false
      }
    },
    reset(){
      this.index=false,
      this.index1=false,
      this.index2=false,
      this.index3=false,
      this.isFocus=false,
      this.isFocus1=false,
      this.isFocus2=false,
      this.isFocus3=false,
      this.username='',
      this.email='',
      this.pass='',
      this.pass2=''
    }
  }
}
</script>

<style scoped>
/* 头标题 */
.title-con{
  height: 30px;
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}
.title-con img{
  position: relative;
  top: 7px;
  right: 10px;
}
.title{
  display: inline-block;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
}
/* 表单部分 */
.form-box{
  width: 260px;
  position: relative;
  margin: 0 auto;
}
.form-box .input-box{
  margin-bottom: 30px;
}
.form-box .input-box .p1{
	font-size: 10px;
  user-select:none;
  padding: 0px 2px;
  background-color: #fff;
  color:#8f8d8d;
  position: absolute;
  left: 10px;
  top: -5px;
}
.form-box .input-box:nth-of-type(2) .p1{
  left: 10px;
  top: 65px;
}
.form-box .input-box:nth-of-type(3) .p1{
  left: 10px;
  top: 135px;
}
.form-box .input-box:nth-of-type(4) .p1{
  left: 10px;
  top: 205px;
}
.form-box .input-box input{
	width:260px;
	height:40px;
	/* margin-bottom: 30px; */
	border:1px solid #c5c5c5;
	border-radius: 5px;
	font-size:16px;
	text-indent:10px;
  color: #757575;
  outline: none;
}
.form-box .input-box .p2{
  font-size: 10px;
  color: #f56c6c;
  position: absolute;
}

/* 输入框选中样式 */
.form-box .input-box span.focus{
  color:#409EFF ;
}
.form-box .input-box .focus{
  border-color: #409EFF;
}

/* 注册重置按钮 */
.btn-box{
  display: flex;
  justify-content: space-evenly;
}
.btn-box .btn{
  text-align: center;
	padding: 12px 20px;
	border-radius: 8px;
	cursor:pointer;
  transition: .1s;
  font-weight: 500;
  font-size: 14px;
  border:1px solid #b3d8ff;
  color: #409EFF;
  background: #ecf5ff;
}
.btn-box .btn:hover{
	background-color: #409EFF;
  color: #fff;
}

/* 报错样式 */
.warnSpan{
  color: #f56c6c !important;
}
.warnInput{
  border-color: #f56c6c !important;
}

</style>