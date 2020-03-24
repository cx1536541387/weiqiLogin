<template>
  <div id="home-content">
    <div class="liucheng">
      <img src="~assets/img/home/liuchengtu.png" alt="">
    </div>

    <!-- //考试公告 -->
    <div class="message">
      <game-box class="yule clip" :game-data="gameYule" :type="0">
        <span @click="ToSignUp" class="more">更多&gt;</span>
      </game-box>
      <div>
        <img src="~assets/img/home/duiyi.jpg" alt="" width="400px" height="300px">
      </div>
      <game-box class="duanwei clip" :game-data="gameDuanwei" :type="1">
        <span @click="ToSignUp" class="more">更多&gt;</span>
      </game-box>
    </div>

    <div class="bottom">
      <span>饱食终日，无所用心，难矣哉！不有博弈者乎，为之犹贤乎</span>
      <img src="~assets/img/home/bottom.jpg" alt="" height="200px" width="1140px">
    </div>
  </div>
</template>

<script>
import GameBox from 'components/common/GameBox'

import {getYule,getDuanwei} from 'network/common/getGameMsg'

export default {
  name:'HomeChild',
  data(){
    return {
      gameYule:[],
      gameDuanwei:[],
    }
  },
  components:{
    GameBox
  },
  methods:{
    ToSignUp(){
      this.$store.state.tabbar = 3;
      this.$router.push({path:'/signup'})
    }
  },
  created(){
    getYule().then(res=>{
      for(let i of res.data){
        this.gameYule = i
      }     
    })
    getDuanwei().then(res=>{
      for(let i of res.data){
        this.gameDuanwei = i
      }
    })
  }
}
</script>

<style scoped>
  .liucheng{
    height: 100px;
    margin-bottom: 15px;
  }
  .liucheng img{
    border-radius: 5px;
    background-color: #409eff
  }

  .more{
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    font-size: 15px;
  }
  .more:hover{
    color: #409eff;
    text-decoration: underline;
  }

  .message{
    display: flex;
    height: 300px;
    margin-bottom: 17px;
    justify-content: space-between;
  }
  .message img{
    border-radius:5px;
  }

  /* 底部 */
  .bottom{
    height: 200px;
    background-color: #000;
    position: relative;
    text-align: center;
    border-radius: 5px
  }
  .bottom span{
    color: rgba(255,255,255,.8);
    font-size: 28px;
    white-space: nowrap;
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .bottom img{
    opacity: .5;
    border-radius: 5px
  }
</style>