<template>
  <div class="search-box">
    
    <div class="box-left">
      <el-radio-group v-model="radio">
        <el-radio :label="1" class="select-item" @change="empty">比赛名</el-radio>
        <el-radio :label="2" class="select-item" @change="empty">报名号</el-radio>
        <el-radio :label="3" class="select-item" @change="empty">用户昵称</el-radio>
      </el-radio-group>
    </div>

    <div class="box-right">
      <el-select v-model="value" v-show="radio=='1'" placeholder="请选择比赛名" class="input" prefix-icon="el-icon-search" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="signNum" 
                v-show="radio=='2'" 
                placeholder="请输入报名号" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-input v-model="signName" 
                v-show="radio=='3'" 
                placeholder="请输入用户昵称" 
                prefix-icon="el-icon-search" 
                clearable
                class="input"></el-input>
      <el-button type="primary" plain class="search-btn">查询</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name:'SearchBox',
  data () {
    return {
      radio: 1,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      signNum: '',
      signName:''
    };
  },
  watch:{
    signNum(){
      this.signNum = this.signNum.replace(/[^\d|^a-zA-Z]/g,'')
    }
  },
  methods:{
    empty(){
      this.value = ''
      this.signNum = ''
      this.signName = ''
    }
  }
}
</script>

<style scoped>
  .search-box{
    display: flex;
    width: 800px;
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
    margin-left: 100px;
    float: right;
  }
  .search-box .box-right .input{
    width: 300px;
  }

  .search-btn{
    margin-left: 50px;
  }
</style>