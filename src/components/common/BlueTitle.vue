<template>
  <div id="title">
    <h2><slot></slot></h2>
  </div>
</template>

<script>
export default {
  name:'BlueTitle'
}
</script>

<style scoped>
  #title{
    color: #fff;
    background-color: #409eff;
    padding: 12px 0px 12px 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    user-select: none;
  }
</style>