<template>
  <div id="home">
    <swiper/>
    <home-child/>
  </div>
</template>

<script>
import Swiper from 'components/common/Swiper'
import HomeChild from './childComp/HomeChild'

export default {
  name:'Home',
  created(){
    this.$store.state.tabbar = 1
  },
  components:{
    Swiper,
    HomeChild,
  }
}
</script>

<style scoped>
  #home{
    width: 1140px;
    margin: 0 auto;
    background-color: #fff;
  }
</style>