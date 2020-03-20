<template>
  <div class="search-result">
    <table cellspacing="0" class="table">
      <tr>
        <td>比赛名</td>
        <td>用户昵称</td>
        <td>名次</td>
      </tr>
      <tr>
        <td>弈林围棋第一届交流娱乐赛</td>
        <td>选手昵称</td>
        <td>名次</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name:'SearchResult',
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
    width: 150px;
  }
  .table td:nth-of-type(3n){
    width: 100px;
  }
</style>