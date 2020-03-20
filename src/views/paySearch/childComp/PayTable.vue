<template>
  <div class="pay-table">
    <table cellspacing="0" class="table">
      <tr>
        <td>比赛名</td>
        <td>是否缴费</td>
        <td>操作</td>
      </tr>
      <tr>
        <td>弈林围棋第一届交流娱乐赛</td>
        <td>未缴费</td>
        <td>去缴费</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name:'PayTable'
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
</style>