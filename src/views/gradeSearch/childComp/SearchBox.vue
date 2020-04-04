<template>
  <div>
  <div class="search-box">
    <div class="box-left">
      <el-radio-group v-model="radio">
        <el-radio :label="1" class="select-item" @change="empty">比赛名</el-radio>
        <el-radio :label="2" class="select-item" @change="empty">用户昵称</el-radio>
      </el-radio-group>
    </div>
    <div class="box-right">
      <el-select v-model="gname" v-show="radio=='1'" placeholder="请选择比赛名" class="input" prefix-icon="el-icon-search" >
        <el-option
          v-for="item in options"
          :key="item.gname"
          :label="item.gname"
          :value="item.gname">
        </el-option>
      </el-select>
      <el-input v-model="name" 
                v-show="radio=='2'" 
                placeholder="请输入用户昵称" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-button type="primary" plain class="search-btn" @click="search">查询</el-button>
    </div>
  </div>

    <blue-title>查询结果</blue-title>

    <div class="search-result">
      <table cellspacing="0" class="table">
        <tr>
          <td>比赛名</td>
          <td>用户</td>
          <td>名次</td>
        </tr>
        <tr v-for="item in gradeData" :key="item.id">
          <td>{{item.gname}}</td>
          <td><img :src="item.imgurl" alt="" style="vertical-align:middle"><span>{{item.name}}</span></td>
          <td>{{item.rank}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {getGrade,getGname,searchName} from 'network/manage/gradeManage'

export default {
  name:'SearchBox',
  data () {
    return {
      radio: 1,
      options: [],
      gradeData:[],
      gname: '',
      name:''
    }
  },
  components:{
    BlueTitle
  },
  created(){
    getGname().then(res=>{
      this.options = res.data
    })
  },
  methods:{
    empty(){
      this.gname = ''
      this.name = ''
    },
    search(){
      if(!this.gname && !this.name){
        this.$message({
          message: '请先输入您要搜索的内容！',
          type: 'warning'
        });
      }else{
        switch(this.radio){
          case 1:
            getGrade(this.gname).then(res=>{
              this.gradeData = res.data
            });
            break;
          case 2:
            searchName(this.name).then(res=>{
              this.gradeData = res.data
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
    margin-left: 20px;
    float: right;
  }
  .search-box .box-right .input{
    width: 260px;
  }

  .search-btn{
    margin-left: 50px;
  }

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
    width: 200px;
  }
  .table td:nth-of-type(3n){
    width: 100px;
  }

  .table td img{
    width: 30px;
    height: 30px;
    border-radius: 50%;

    border: 1px solid #c5c5c5;
  }
  .table td span{
    margin-left: 10px;
  }
</style>