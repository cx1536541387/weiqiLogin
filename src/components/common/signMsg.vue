<template>
  <div class="box">
    <h3>比赛说明</h3>
    <p>比赛名：<span>{{data.gname}}</span></p>
    <p>段位限制：{{getLevel}}{{getLevel2}}</p>
    <p>比赛时间：<span>{{data.gtime}}</span></p>
    <p>比赛地点：<span :title="data.gplace">{{data.gplace}}</span></p>
    <h3>比赛章程</h3>
    <p>1.凭借报名号入场(缴费完成后系统会分发报名号)</p>
    <p>2.入场后等待工作人员信号统一入座</p>
    <p>3.入座后禁止说话</p>
    <p>4.裁判员宣布比赛开始双方选手方可开始比赛。</p>
    <p>5.比赛期间一旦出现违规情况直接取消比赛资格</p>
    <p>ps:有问题请联系管理员：15323232332</p>
  </div>
</template>

<script>
export default {
  name:'signMsg',
  props:{
    data:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    getLevel(){
      switch(this.data.glevel){
        case '0': return '无限制';break;
        case '1': return '新手' + '---';break;
        case '2': return '业余' + '---';break;
        case '3': return '专业' + '---';break;
      }
    },
    getLevel2(){
      switch(this.data.glevel2){
        case '0': return '';break;
        case '1': return '新手';break;
        case '2': return '业余';break;
        case '3': return '专业';break;
      }
    }
  },
}
</script>

<style scoped>
  .box{
    font-size: 15px;
    margin: 10px 30px;
  }

  .box h3{
    text-align: center;
    margin: 10px auto;
  }
  .box h3:nth-child(1){
    margin: -15px 0 10px 0;
  }
  .box p{
    margin: 5px 0px;
  }
</style>