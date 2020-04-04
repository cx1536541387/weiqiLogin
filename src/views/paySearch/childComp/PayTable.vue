<template>
  <div class="pay-table">
    <table cellspacing="0" class="table">
      <tr>
        <td>比赛名</td>
        <td>是否缴费</td>
        <td>操作</td>
      </tr>
      <tr v-for="item in payMsg" :key="item.id">
        <td>{{item.gname}}</td>
        <td>{{item.ispay == '0'? '未缴费' : '已缴费'}}</td>
        <td>
          <span @click="open(item.pay,item.id)" v-if="item.ispay == '0'" class="p1">去缴费</span>
          <span v-else>无</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import PayImg from './PayImg'

export default {
  name:'PayTable',
  components:{
    PayImg
  },
  props:{
    payMsg:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    open(pay,id){
      const h = this.$createElement;
      this.$msgbox({
        title: '缴费',
        message: h(PayImg,{props:{data:pay},key:id}),
        showConfirmButton:false
      }).then(action => {
        console.log(action);     
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
  .table{
    margin: 0 auto;
    font-size: 14px;
    color: #58595a;
    text-align: center;
    border: 1px solid #c5c5c5;
    border-right: none;
    border-bottom: none;
  }
  .table td{
    height: 40px;
    border: 1px solid #c5c5c5;
    border-top: none;
    border-left: none;
  }
  .table td:nth-of-type(n){
    width: 280px;
  }
  .table td:nth-of-type(2n){
    width: 100px;
  }
  .table td:nth-of-type(3n){
    width: 100px;
  }

  .table span.p1{
    color: #409eff;
    cursor: pointer;
  }
</style>