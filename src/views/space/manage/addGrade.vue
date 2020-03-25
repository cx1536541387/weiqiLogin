<template>
  <div>
    <blue-title>成绩录入</blue-title>
    <div class="search-box">
      请选择比赛：
      <el-select v-model="gname" placeholder="请选择比赛" class="input" prefix-icon="el-icon-search" @change="getData">
        <el-option
          v-for="item in options"
          :key="item.gname"
          :label="item.gname"
          :value="item.gname">
        </el-option>
      </el-select>
    </div>
    <div class="baoming">
      <table cellspacing="0" class="table">
        <tr>
          <td>用户昵称</td>
          <td>排名</td>
        </tr>
        <tr v-for="item in gradeData" :key="item.id">
          <td>{{item.name}}</td>
          <td><input type="text" id="item.id" class="rank" :value="item.rank"></td>
        </tr>
      </table>
    </div>
    <div class="btn-box">
      <el-button type="primary" @click="submitForm('ruleForm')">上传</el-button>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {getGrade,getGname} from 'network/manage/gradeManage'

export default {
  name:'addGrade',
  components:{
    BlueTitle
  },
  data(){
    return {
      options:[],
      gradeData:[],
      gname:'',
    }
  },
  created(){
    getGname().then(res=>{
      this.options = res.data
    })
  },
  methods:{
    getData(){
      getGrade(this.gname).then(res=>{
        this.gradeData = res.data
      })
    },
    change(id){

    }
  }
}
</script>

<style scoped>
.search-box{
  text-align: center;
  margin-bottom: 20px;
}

.search-box .input{
  width: 260px;
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
  width: 150px;
}
.baoming span{
  color: #409eff;
  cursor: pointer;
}

.btn-box{
  text-align: center;
  margin-top: 20px;
}
</style>