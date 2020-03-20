<template>
  <div id="search">
    <div class="content">
      <img src="~assets/img/common/00.jpg" alt="">
      <blue-title>查询条件</blue-title>
      <search-box/>
      <blue-title>查询结果</blue-title>
      <search-result class="s-result"/>
    </div>
  </div>
</template>

<script>
import SearchBox from './childComp/SearchBox'
import SearchResult from './childComp/SearchResult'

import BlueTitle from 'components/common/BlueTitle'

export default {
  name:'GradeSearch',
  created(){
    this.$store.state.tabbar = 2
  },
  components:{
    SearchBox,
    SearchResult,
    BlueTitle
  }
}
</script>

<style scoped>
  #search{
    width:1140px;
    margin: 0 auto;
    background-color: #fff;
  }

  .content img{
    width: 1140px;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .content h2{
    color: #fff;
    background-color: #409eff;
    padding: 12px 0px 12px 15px;
    margin-bottom: 20px;
    border-radius: 5px;
  }

  .s-result{
    margin: 0 auto;
  }
</style>