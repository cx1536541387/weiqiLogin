<template>
  <div class="message-box">
    <h2 class="game-title">娱乐赛</h2>
    <slot></slot>
    <div class="box">
      <h3>报名说明</h3>
      <p>报名时间：<span class="start-time">2020-2-21</span>至<span class="end-time">2020-3-1</span></p>
      <p>报名费用：<span>80</span>元</p>
      <h3>比赛说明</h3>
      <p>比赛名：<span>弈林围棋娱乐赛</span></p>
      <p>段位要求：无</p>
      <p>比赛时间：<span>2020-3-5 10:00</span></p>
      <p>比赛地点：<span>武汉市华夏理工学院体育馆111111111111111111</span></p>
      <el-button type="primary" plain class="btn">点我报名</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'GameBox'
}
</script>

<style scoped>
  .message-box{
    color:#303133;
    width: 350px;
    height: 300px;
    position: relative;
    border-radius: 5px;
    border: 2px solid transparent;
  }

  .message-box .game-title{
    text-align: center;
    margin-top: 10px;
  }

  .box{
    font-size: 15px;
    margin: 10px 30px;
  }

  .box h3,.box p{
    width: 286px;
    margin: 10px 0px;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis
  }
  .btn{
    position: relative;
    display: block;
    margin: 0 auto;
  }
</style>