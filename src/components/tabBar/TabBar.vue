<template>
  <div id="tabbar">
    <h1 class="logo">
      <a @click="ToHome">
        <img src="~assets/img/logo.jpg" alt="">
      </a>
    </h1>
    <ul class="list">
      <li><a @click="ToHome" :class="{active:$store.state.tabbar==1}">首页</a></li>
      <li><a @click="ToGradeSearch" :class="{active:$store.state.tabbar==2}">成绩查询</a></li>
      <li><a @click="ToSign" :class="{active:$store.state.tabbar==3}">比赛报名</a></li>
      <li><a @click="ToPaySearch" :class="{active:$store.state.tabbar==4}">缴费查询</a></li>
    </ul>
    <el-row class="login"> 
      <div v-if="$store.state.isLogin">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img :src="imageUrl" alt="">
            <span>{{$store.state.name}}</span> 
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人空间</el-dropdown-item>
            <el-dropdown-item divided command="b">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <el-button plain @click="outerVisible=true">登录</el-button>
        <el-button plain @click="ToRegister">注册</el-button>
      </div>
    </el-row>
    <!-- 登录窗口 -->
    <el-dialog width="340px" :visible.sync="outerVisible" :before-close="handleClose">
      <login @childFn="childF" @closeLogin="closeLogin"/>
      <el-dialog width="340px" :visible.sync="innerVisible" :before-close="handleClose2" append-to-body>
        <pass-back ref="child"/>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import Login from 'components/login/Login'
import PassBack from 'components/login/PassBack'

export default {
  name:'TabBar',
  data(){
    return {
      tabbar:1,
      outerVisible: false,
      innerVisible: false,
      // 密码找回使用的参数
      setData:false,
      imageUrl:''
    }
  },
  created(){
    this.imageUrl = this.$store.state.imageUrl
  },
  computed:{
    f1(){
      return this.$store.state.imageUrl
    }
  },
  watch:{
    f1(newVal,oldVal){
      this.imageUrl = newVal
    }
  },
  components:{
    Login,
    PassBack
  },
  methods:{
    childF(val){
      this.innerVisible = val
    },
    closeLogin(val){
      this.outerVisible = val
    },
    open() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.state.isLogin=false;
        this.$store.state.username = ''
        this.$store.state.email = ''
        this.$store.state.sex = ''
        this.$store.state.age = ''
        this.$store.state.level = ''
        this.$store.state.tel = ''
        this.$store.state.times = ''
        this.$store.state.maxrank = ''
        this.$store.state.name = ''
        this.$router.push({path:'/home'});
        window.sessionStorage.setItem('isLogin', false);  
        this.$message({
          type: 'success',
          message: '已退出登录,已为您跳转到首页!'
        });
      }).catch(() => {});
    },
    open2() {
      this.$message({
        message: '请在登录之后再使用本功能！',
        type: 'warning'
      });
    },
    handleCommand(command) {
      if(command=='a'){
        this.$store.state.tabbar = false;
        this.$router.push({path:'/space', query:{name:this.$store.state.name}})
      }else{
        this.open()
      }
    },
    ToHome(){
      this.$router.push({path:'/home'})
    },
    ToGradeSearch(){
      this.$router.push({path:'/gradeSearch'})
    },
    ToSign(){
      this.$router.push({path:'/signUp'})
    },
    ToPaySearch(){
      if(this.$store.state.isLogin){
        this.$router.push({path:'/paySearch'})
      }else{
        this.open2()
      }
    },
    ToRegister(){
      this.$router.push({path:'/register'})
    },
    handleClose(done) {
      this.$confirm('确认关闭登录窗？','提示')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('取消修改密码？','提示')
        .then(_ => {
          done();
          this.$refs["child"].reset()
        })
        .catch(_ => {});
    },
  }
}
</script>

<style>
  #tabbar {
    width: 1140px;
    height: 100px;
    display: flex;
    margin: 0 auto;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 15px;
    background-color: #fff;
  }

  #tabbar .logo{
    flex: 1;
  }
  #tabbar .logo img{
    cursor: pointer;
    margin-top: -4px;
  }

  #tabbar .list{
    display: flex
  }
  #tabbar .list li a{
    padding: 0 25px;
    display:inline-block;
    line-height: 100px;
    color:#303133;
    transition: .1s;
    overflow: hidden;
    user-select:none;
    cursor: pointer;
  }
  #tabbar .list li a:after{
    transition: .1s;
    content: '';
    display: block;
    position: relative;
    bottom: -2px;
    border: 1px solid #409eff;
  }
  #tabbar .list li:hover a{
    color:#409eff;
  }
  #tabbar .list li:hover a:after{
    bottom: 2px;
  }
  #tabbar a.active{
    color:#409eff !important;
  }
  #tabbar a.active:after{
    bottom: 2px !important;
  }

  #tabbar .login{
    flex: .5;
    justify-content:space-evenly;
    align-items:center;
    display: flex;
  }
  #tabbar .login .el-dropdown-link {
    height: 36px;
    display: inline-block;
    line-height: 36px;
    position: relative;
    top: -8px;
    cursor: pointer;
    color: #303133;
    outline: none;
  }
  #tabbar .login .el-dropdown-link img{
    width: 36px;
    height: 36px;
    position: relative;
    top: 12px;
    border-radius: 50%;
    margin-right: 10px;
    border: 1px solid #c5c5c5;
  }
  #tabbar .login .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
    border-radius: 10px !important
   }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: hidden;
    padding: 0px 0px 30px 0px !important;
  }
</style>