<template>
  <div class="message-box">
    <h2 class="game-title">{{type == 0 ? '娱乐赛' : '段位赛'}}</h2>
    <slot></slot>
    <div class="box">
      <h3>报名说明</h3>
      <p>报名时间：<span class="start-time">{{gameData.btime1}}</span>&nbsp;至&nbsp;<span class="end-time">{{gameData.btime2}}</span></p>
      <p>报名费用：<span>{{gameData.pay}}</span>元</p>
      <h3>比赛说明</h3>
      <p>比赛名：<span>{{gameData.gname}}</span></p>
      <p>段位限制：{{getLevel}}{{getLevel2}}</p>
      <p>比赛时间：<span>{{gameData.gtime}}</span></p>
      <p>比赛地点：<span :title="gameData.gplace">{{gameData.gplace}}</span></p>
      <el-button type="primary" plain class="btn" @click="open">点我报名</el-button>
    </div>
  </div>
</template>

<script>
import signMsg from './signMsg'

import {gameSignUp} from 'network/user/signup'

export default {
  name:'GameBox',
  components:{
    signMsg
  },
  props:{
    gameData:{},
    type:'',
  },
  data(){
    return {
      signMsg:{
        username:this.$store.state.username,
        uid:this.$store.state.uid,
        gname:this.gameData.gname,
        gtime:this.gameData.gtime,
        gplace:this.gameData.gplace,
      }
    }
  },
  computed:{
    getLevel(){
      switch(this.gameData.glevel){
        case '0': return '无限制';break;
        case '1': return '新手' + '---';break;
        case '2': return '业余' + '---';break;
        case '3': return '专业' + '---';break;
      }
    },
    getLevel2(){
      switch(this.gameData.glevel2){
        case '0': return '';break;
        case '1': return '新手';break;
        case '2': return '业余';break;
        case '3': return '专业';break;
      }
    }
  },
  methods:{
    open(){
      if(!this.$store.state.isLogin){
        this.$message.error("请先登录！");
        return false;
      }
      if(this.gameData.type == '1'){
        if(this.$store.state.level >= this.gameData.glevel && this.$store.state.level <= this.gameData.glevel2){
          this.signUp()
        }else{
          this.$message.error("请检查您的段位是否与报名要求一致！")
        }
      }else{
        this.signUp()
      }
    },
    signUp(){
      const h = this.$createElement;
      this.$msgbox({
        title: '报名确认',
        message: h(signMsg,{props:{data:this.gameData},key:this.gameData.gid}),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '提交中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        gameSignUp(this.signMsg).then(res=>{
          if(!res.data.key){
            this.$message.error(res.data.message)
          }else{
            this.$message({
              type: 'success',
              message: res.data.message
            });
          }
        })
      }).catch(err=>{
        this.$message({
          type: 'info',
          message: '提交已取消'
        });
      });
    }
  }
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