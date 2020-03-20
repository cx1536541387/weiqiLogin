<template>
  <div id="information">
    <blue-title>个人信息</blue-title>
    <div class="info-box">
      <div class="box-l">
        <p>账号：<span>{{$store.state.username}}</span></p>
        <p>个人邮箱：<span>{{email}}</span></p>
        <p>用户昵称：<span>{{$store.state.name}}</span></p>
        <p>性别：<span>{{$store.state.sex}}</span></p>
        <p>年龄：<span>{{$store.state.age}}</span></p>
        <p>电话：<span>{{$store.state.tel}}</span></p>
        <p>段位：<span>{{level}}</span></p>
        <p>比赛次数：<span>{{$store.state.times}}</span></p>
        <p>最好名次：<span>{{$store.state.maxrank}}</span></p>
        <el-button type="primary" plain class="btn" @click="dialogVisible=true">修改个人信息</el-button>
      </div>
      <div class="box-r">
        <img src="~assets/img/space/01.jpg" alt="">
      </div>
    </div>

    <el-dialog width="340px" :visible.sync="dialogVisible" :before-close="handleClose">
      <change-info ref="child"/>
    </el-dialog>
    
    <blue-title>报名情况</blue-title>
    <div class="baoming">
      <table cellspacing="0" class="table">
        <tr>
          <td>比赛名</td>
          <td>比赛时间</td>
          <td>比赛地点</td>
          <td>是否缴费</td>
          <td>报名号</td>
        </tr>
        <tr>
          <td>弈林围棋第一届交流娱乐赛</td>
          <td>时间</td>
          <td>地点</td>
          <td>是否缴费</td>
          <td>报名号</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import ChangeInfo from './ChangeInfo'
import BlueTitle from 'components/common/BlueTitle'

export default {
  name:'Information',
  data(){
    return {
      dialogVisible:false,
      level:'',
      email:''
    }
  },
  components:{
    BlueTitle,
    ChangeInfo
  },
  created(){
    switch(this.$store.state.level){
      case "1" : this.level = '新手'; break;
      case "2" : this.level = '业余'; break;
      case "3" : this.level = '专业'; break;
    }
    this.email = this.$store.state.email
  },
  computed:{
    f1(){
      return this.$store.state.level
    },
    f2(){
      return this.$store.state.email
    }
  },
  watch:{
    f1(newVal,oldVal){
      switch(newVal){
        case "1" : this.level = '新手'; break;
        case "2" : this.level = '业余'; break;
        case "3" : this.level = '专业'; break;
      }
    },
    f2(newVal,oldVal){
      console.log('change');
      
      this.email = newVal
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭本窗口？','提示')
        .then(_ => {
          this.$message({
          type: 'success',
          message: '已关闭修改信息窗口!',
        });
          done();
        })
        .catch(_ => {});
    },
  }
}
</script>

<style scoped>
.info-box{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between
}

.info-box .box-l p{
  font-size: 16px;
  margin-left: 20px;
  margin-bottom: 20px;
}

.info-box .box-r img{
  height: 360px;
}
.info-box .btn{
  margin-left: 20px;
}
.baoming .table{
  margin: 0 auto;
  font-size: 14px;
  color: #58595a;
  text-align: center;
  border: 1px solid #c5c5c5;
  border-right: none;
  border-bottom: none;
}
.baoming .table td{
  height: 40px;
  border: 1px solid #c5c5c5;
  border-top: none;
  border-left: none;
}
.baoming .table td:nth-of-type(1){
  width: 280px;
}
.baoming .table td:nth-of-type(2){
  width: 120px;
}
.baoming .table td:nth-of-type(3){
  width: 280px;
}
.baoming .table td:nth-of-type(4){
  width: 80px;
}
.baoming .table td:nth-of-type(5){
  width: 120px;
}

</style>