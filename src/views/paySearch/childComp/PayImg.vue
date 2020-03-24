<template>
  <div class="box">
    <img src="~assets/img/pay.png" alt="" width="200px">
    <h2>{{getPay}}</h2>
    <p>请扫描上面二维码支付费用，管理员确认后会为您分配赛场与座位号,您可以在报名号中查看。</p>
    <p class="p1">例：报名号：321A01</p>
    <p class="p1">比赛场地是A赛场,座位号为01.(前三位是防重复编号)</p>
  </div>
</template>

<script>
export default {
  name:'PayImg',
  props:{
    data:''
  },
  computed:{
    getPay(){
      return '￥' + this.data
    }
  }
}
</script>

<style scoped>
.box{
  width: 300px;
  margin: 0 auto;
  text-align: center;
}
.box img{
  margin-top: 10px;
}
.box h2{
  margin: 20px 0 20px 0;
}

.box p{
  text-align: left;
}
.box .p1{
  color: #409EFF;
  font-size: 10px;
}
.box p:nth-of-type(2){
  margin-top: 10px;
}
</style>