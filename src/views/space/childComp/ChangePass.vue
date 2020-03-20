<template>
  <div id="ChangePass">
    <blue-title>修改密码</blue-title>
    <pass-back class="passback"/>
  </div>
</template>

<script>
import PassBack from 'components/login/PassBack'

import BlueTitle from 'components/common/BlueTitle'

export default {
  name:'ChangePass',
  components:{
    PassBack,
    BlueTitle,
  }
}
</script>

<style scoped>

</style>