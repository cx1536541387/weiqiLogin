<template>
  <div>
    <blue-title>报名管理</blue-title>
    <div class="search-box">
    
    <div class="box-left">
      <el-radio-group v-model="radio">
        <el-radio :label="1" class="select-item" @change="empty">账号</el-radio>
        <el-radio :label="2" class="select-item" @change="empty">比赛名</el-radio>
      </el-radio-group>
    </div>

    <div class="box-right">
      <el-input v-model="username" 
                v-show="radio=='1'" 
                placeholder="请输入账号" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-select v-model="gname" v-show="radio=='2'" placeholder="请选择比赛" class="input" prefix-icon="el-icon-search" >
        <el-option
          v-for="item in options"
          :key="item.gname"
          :label="item.gname"
          :value="item.gname">
        </el-option>
      </el-select>
      <el-button type="primary" plain class="search-btn" @click="search">查询</el-button>
      <el-button type="primary" plain class="search-btn" @click="getPay">未缴费</el-button>
    </div>

  </div>
    <div class="baoming">
      <table cellspacing="0" class="table">
        <tr>
          <td>账号</td>
          <td>比赛名</td>
          <td>比赛时间</td>
          <td>比赛地点</td>
          <td>是否缴费</td>
          <td>报名号</td>
          <td>操作</td>
        </tr>
        <tr v-for="item in signData" :key="item.id">
          <td>{{item.username}}</td>
          <td>{{item.gname}}</td>
          <td>{{item.gtime}}</td>
          <td>{{item.gplace}}</td>
          <td>{{item.ispay == '0' ? '未缴费' : '已缴费'}}</td>
          <td>{{item.gamecode}}</td>
          <td><span @click="toSign(item.uid,item.gname)" class="p1" v-if="item.ispay == '0'">确认缴费</span>
          <span v-else>无</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {getSign,getNopay,searchUsername,searchGname,getGname,sign} from 'network/manage/signManage'

export default {
  name:'signManage',
  components:{
    BlueTitle
  },
  data () {
    return {
      radio: 1,
      options: [],
      signData:[],
      username: '',
      gname:''
    };
  },
  created(){
    getSign().then(res=>{
      this.signData = res.data
    }),
    getGname().then(res=>{
      this.options = res.data
    })
  },
  watch:{
    username(){
      this.username = this.username.replace(/[\u4E00-\u9FA5]/g, '')
    }
  },
  methods:{
    empty(){
      this.username = ''
      this.gname = ''
    },
    toSign(uid,gname){
      this.$confirm('此操作将更改该用户的缴费状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sign(uid,gname).then(res=>{
          this.signData = res.data
        })
        this.$message({
          type: 'success',
          message: '缴费状态更改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消更改'
        });          
      });
      
    },
    getPay(){
      getNopay().then(res=>{
        this.signData = res.data
      })
    },
    search(){
      if(!this.username && !this.gname){
        this.$message({
          message: '请先输入您要搜索的内容！',
          type: 'warning'
        });
      }else{
        switch(this.radio){
          case 1:
            searchUsername(this.username).then(res=>{
              this.signData = res.data
            });
            break;
          case 2:
            searchGname(this.gname).then(res=>{
              this.signData = res.data
            });
            break;
        }
      }
    }
  }
}
</script>

<style scoped>
.search-box{
  display: flex;
  width: 600px;
  margin: 0 auto;
  margin-bottom: 20px;
}

.search-box .box-left{
  flex: 1
}
.search-box .box-left .select-item{
  line-height: 40px;
}
.search-box .box-right{
  /* margin-left: 100px; */
  float: right;
}
.search-box .box-right .input{
  width: 230px;
}

.search-btn{
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
  width: 80px;
  height: 40px;
  border: 1px solid #c5c5c5;
  border-top: none;
  border-left: none;
}
.baoming .table td:nth-of-type(1){
  width: 120px;
}
.baoming .table td:nth-of-type(2){
  width: 200px;
}
.baoming .table td:nth-of-type(3){
  width: 150px;
}
.baoming .table td:nth-of-type(4){
  width: 200px;
}
.baoming span.p1{
  color: #409eff;
  cursor: pointer;
}
</style>