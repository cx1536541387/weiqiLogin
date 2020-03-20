<template>
  <div id="register">
    <blue-title>账号注册</blue-title>
    <div class="form-box">
      <img src="~assets/img/register/left.png" alt="" class="left">
      <reg-form class="form-con"/>
      <img src="~assets/img/register/right.jpg" alt="" class="right">
    </div>
  </div>
</template>

<script>
import RegForm from './childComp/RegForm'

import BlueTitle from 'components/common/BlueTitle'

export default {
  name:'Register',
  created(){
    this.$store.state.tabbar = 0
  },
  components:{
    BlueTitle,
    RegForm,
  }
}
</script>

<style scoped>
#register{
  width: 1140px;
  margin: 0 auto;
}
#register .img1{
  width: 1140px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 5px
}
.form-box{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.form-box .form-con{
  width: 300px;
}
.form-box .left,
.form-box .right{
  width: 400px;
  height: 520px;
}
</style>