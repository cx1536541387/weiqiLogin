<template>
  <div>
    <blue-title>用户管理</blue-title>
    <div class="search-box">
    
    <div class="box-left">
      <el-radio-group v-model="radio">
        <el-radio :label="1" class="select-item" @change="empty">账号</el-radio>
        <el-radio :label="2" class="select-item" @change="empty">昵称</el-radio>
        <el-radio :label="3" class="select-item" @change="empty">段位</el-radio>
      </el-radio-group>
    </div>

    <div class="box-right">
      <el-input v-model="username" 
                v-show="radio=='1'" 
                placeholder="请输入账号" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-input v-model="name" 
                v-show="radio=='2'" 
                placeholder="请输入昵称" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-select v-model="level" v-show="radio=='3'" placeholder="请选择段位" class="input" prefix-icon="el-icon-search" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" plain class="search-btn" @click="search">查询</el-button>
    </div>

  </div>
    <div class="baoming">
      <table cellspacing="0" class="table">
        <tr>
          <td>账号</td>
          <td>密码</td>
          <td>邮箱</td>
          <td>昵称</td>
          <td>性别</td>
          <td>年龄</td>
          <td>手机号</td>
          <td>段位</td>
          <td>操作</td>
        </tr>
        <tr v-for="item in userData" :key="item.uid">
          <td>{{item.username}}</td>
          <td>{{item.password}}</td>
          <td>{{item.email}}</td>
          <td>{{item.name}}</td>
          <td>{{item.sex}}</td>
          <td>{{item.age}}</td>
          <td>{{item.tel}}</td>
          <td>{{getlevel(item.level)}}</td>
          <td><span @click="del(item.uid)">删除</span></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {getUser, delUser, searchUsername, searchName, searchLevel} from 'network/manage/userManage'

export default {
  name:'userManage',
  components:{
    BlueTitle
  },
  data () {
    return {
      radio: 1,
      options: [{
        value: '1',
        label: '新手'
      }, {
        value: '2',
        label: '业余'
      }, {
        value: '3',
        label: '专业'
      }],
      username: '',
      name: '',
      level:'',
      userData:[]
    };
  },
  computed:{
    getlevel(){
      return function(data){
        switch(data){
          case '1' : return '新手';break;
          case '2' : return '业余';break;
          case '3' : return '专业';break;
        }
      }
    }
  },
  created(){
    getUser().then(res=>{
      this.userData = res.data
    })
  },
  methods:{
    empty(){
      this.username = ''
      this.name = ''
      this.level = ''
    },
    search(){
      if(!this.username && !this.name && !this.level){
        this.$message({
          message: '请先输入您要搜索的内容！',
          type: 'warning'
        });
      }else{
        switch(this.radio){
          case 1:
            searchUsername(this.username).then(res=>{
              this.userData = res.data
            });
            break;
          case 2:
            searchName(this.name).then(res=>{
              this.userData = res.data
            });
            break;
          case 3:
            searchLevel(this.level).then(res=>{
              this.userData = res.data
            });
            break;
        }
      }
    },
    del(id){
      this.$confirm('此操作将永久删除该行数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id).then(res=>{
          this.userData = res.data
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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
    width: 200px;
  }

  .search-btn{
    margin-left: 50px;
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
  width: 60px;
  height: 40px;
  border: 1px solid #c5c5c5;
  border-top: none;
  border-left: none;
}
.baoming .table td:nth-of-type(1){
  width: 120px;
}
.baoming .table td:nth-of-type(2){
  width: 120px;
}
.baoming .table td:nth-of-type(3){
  width: 180px;
}
.baoming .table td:nth-of-type(4){
  width: 120px;
}
.baoming .table td:nth-of-type(7){
  width: 100px;
}

.baoming span{
  color: #409eff;
  cursor: pointer;
}
</style>