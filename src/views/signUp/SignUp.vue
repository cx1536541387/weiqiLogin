<template>
  <div id="signup">
    <!-- <blue-title>比赛说明</blue-title>
    <ul>
      <ol>1.凭借报名号入场</ol>
  ​    <ol>2.入场后等待工作人员信号统一入座</ol>
  ​    <ol>3.入座后禁止说话</ol>
  ​    <ol>4.裁判员宣布比赛开始双方选手方可开始比赛。</ol>
  ​    <ol>5.比赛期间一旦出现违规情况直接取消比赛资格</ol>
    </ul> -->

    <blue-title>娱乐赛</blue-title>
    <div class="box yule">
      <game-box class="clip box-item"/>
      <game-box class="clip box-item"/>
      <game-box class="clip box-item"/>
    </div>

    <blue-title>段位赛</blue-title>
    <div class="box duanwei">
      <game-box class="clip box-item"/>
      <game-box class="clip box-item"/>
    </div>
    
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import GameBox from 'components/common/GameBox'

export default {
  name:'SignUp',
  created(){
    this.$store.state.tabbar = 3
  },
  components:{
    BlueTitle,
    GameBox
  }
}
</script>

<style scoped>
  #signup{
    width: 1140px;
    margin: 0 auto;
  }
  #signup ul ol{
    margin-left: 20px;
  }
  #signup ul ol:last-of-type{
    margin-bottom: 20px;
  }
  .box{
    display: flex;
    margin-bottom: 15px;
  }
  .box-item{
    margin-left: 22px
  }
</style>