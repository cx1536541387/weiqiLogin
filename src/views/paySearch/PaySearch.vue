<template>
  <div id="paysearch">
    <img src="~assets/img/common/00.jpg" alt="">
    <blue-title>缴费情况</blue-title>
    <pay-table/>
  </div>
</template>

<script>
import PayTable from './childComp/PayTable'

import BlueTitle from 'components/common/BlueTitle'

export default {
  name:'PaySearch',
  created(){
    this.$store.state.tabbar = 4
  },
  components:{
    BlueTitle,
    PayTable
  }
}
</script>

<style scoped>
#paysearch{
  width: 1140px;
  margin: 0 auto;
}
#paysearch img{
  width: 1140px;
  height: 200px;
  margin-bottom: 20px;
  border-radius: 5px
}
</style>