<template>
  <div id="paysearch">
    <img src="~assets/img/common/00.jpg" alt="">
    <blue-title>缴费情况</blue-title>
    <pay-table :pay-msg="payMsg"/>
  </div>
</template>

<script>
import PayTable from './childComp/PayTable'

import BlueTitle from 'components/common/BlueTitle'

import {getSignMsg} from 'network/common/getSignMsg'

export default {
  name:'PaySearch',
  data(){
    return {
      payMsg:[]
    }
  },
  created(){
    this.$store.state.tabbar = 4
    getSignMsg(this.$store.state.username).then(res=>{
      this.payMsg = res.data
    })
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