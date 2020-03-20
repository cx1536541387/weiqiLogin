<template>
  <div>
    <div class="title-con">
      <p class="title"><img src="~assets/img/common/icon.jpg" alt="" width="30px" height="30px">欢迎登录弈林围棋</p>
    </div>
    <form class="form-box" autocomplete="off" method="post">
      <span  :class="{focus:isFocus}" class="p1">账号</span>
      <input :class="{focus:isFocus}" 
              @focus="isFocus=true" 
              @blur="isFocus=false"
              v-model="username" 
              type="text" 
              name="username"/>
      <span :class="{focus:isFocus1}" class="p1">密码</span>
      <input :class="{focus:isFocus1}"
              @focus="isFocus1=true" 
              @blur="isFocus1=false"
              v-model="password"  
              type="password" 
              name="password"/>
      <span class="passback" @click="passback()">密码找回</span>
      <div class="identify">
        <el-radio v-model="radio" label="1">普通用户</el-radio>
        <el-radio v-model="radio" label="2">管理员</el-radio>
      </div>
      <div class="btn-box">
        <button type="button" class="btn" @click="login()">登录</button>
        <button type="button" class="btn" @click="open">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name:'Login',
  data(){
    return {
      username:'',
      password:'',
      isFocus:false,
      isFocus1:false,
      innerVisible:true,
      outerVisible:false,
      radio: '1',
      identify:''
    }
  },
  watch:{
    username(){
      this.username = this.username.replace(/[\u4E00-\u9FA5]/g, '')   
    }
  },
  methods:{
    open() {
      this.$confirm('此操作将进入注册页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '为您跳转至注册页面!',
        });
        this.$emit('closeLogin', this.outerVisible);
        this.$router.push({path:'/register'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      });
    },
    passback(){
      this.$emit('childFn', this.innerVisible);
    },
    login(){
      if(this.radio == '1'){
        this.identify = 'user';
      }else{
        this.identify = 'admin';
      }
      const data = this.$qs.stringify({
        username:this.username,
        password:this.password,
        identify:this.identify
      });
      this.$axios({
        method: "post",
        url: "http://localhost:3000/user/login.php",
        data: data
      }).then((res)=>{
        if(res.data.key){
          this.$message({
            message: res.data.message,
            type: 'success'
          });
          this.$store.state.isLogin = true
          window.sessionStorage.setItem('isLogin', true);  
          this.$emit('closeLogin', this.outerVisible);
          this.$store.state.username = res.data.username
          this.$store.state.email = res.data.email
          this.$store.state.sex = res.data.sex
          this.$store.state.age = res.data.age
          this.$store.state.level = res.data.level
          this.$store.state.tel = res.data.tel
          this.$store.state.times = res.data.times
          this.$store.state.maxrank = res.data.maxrank
          this.$store.state.name = res.data.name
          this.$store.state.imageUrl = res.data.imgurl
          this.username = ''
          this.password = ''
        }else{
          this.$message.error(res.data.message);
        }     
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
/* 头标题 */
.title-con{
  height: 30px;
  text-align: center;
  margin-top: 10px;
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
.form-box .p1{
	font-size: 10px;
  user-select:none;
  padding: 0px 2px;
  background-color: #fff;
  color:#8f8d8d;
  position: absolute;
  left: 10px;
  top: -5px;
}
.form-box .p1:nth-of-type(2){
  left: 10px;
  top: 65px;
}
.form-box input{
	width:260px;
	height:40px;
	margin-bottom: 30px;
	border:1px solid #c5c5c5;
	border-radius: 5px;
	font-size:16px;
	text-indent:10px;
  transition: .3s;
}
.form-box input:last-of-type{
  margin-bottom: 0px;
}
/* 密码找回 */
.form-box .passback{
  font-size: 12px;
  display: inline-block;
  position: relative;
  right: -212px;
  color: #8f8d8d;
  margin-bottom: 15px;
  cursor: pointer;
}

.form-box .passback:hover{
  color: #409EFF;
}
/* 身份选项 */
.form-box .identify{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
}
/* 输入框选中样式 */
.form-box span.focus{
  color:#409EFF ;
}
.form-box .focus{
  outline: none;
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
</style>