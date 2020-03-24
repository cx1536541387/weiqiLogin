<template>
  <div id="signup">

    <blue-title>娱乐赛</blue-title>
    <div class="box yule">
      <game-box class="clip box-item" v-for="item in gameYule" :key="item.gid" :game-data="item" :type="0"/>
    </div>

    <blue-title>段位赛</blue-title>
    <div class="box duanwei">
      <game-box class="clip box-item" v-for="item in gameDuanwei" :key="item.gid" :game-data="item" :type="1"/>
    </div>
    
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import GameBox from 'components/common/GameBox'

import {getYule,getDuanwei} from 'network/common/getGameMsg'

export default {
  name:'SignUp',
  data(){
    return {
      gameYule:[],
      gameDuanwei:[]
    }
  },
  created(){
    this.$store.state.tabbar = 3,
    getYule().then(res=>{
        this.gameYule = res.data.reverse()   
    })
    getDuanwei().then(res=>{
        this.gameDuanwei = res.data.reverse()
    })
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