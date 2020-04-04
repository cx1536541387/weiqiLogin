<template>
  <div id="newgame">
    <blue-title>添加比赛</blue-title>
    <div class="title-con">
      <p class="title">
        <img src="~assets/img/common/icon.jpg" alt="" width="30px" height="30px">
        添加一个新的比赛</p>
    </div>
    <div id="addgame">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm" autocomplete="off">
        <el-form-item label="比赛类型" prop="gtype">
          <el-select v-model="ruleForm.gtype" class="selectInput" @change="empty">
            <el-option label="娱乐赛" value="0"></el-option>
            <el-option label="段位赛" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛名" prop="gname">
          <el-input type="text" v-model="ruleForm.gname"></el-input>
        </el-form-item>
        <el-form-item label="报名时间">
          <el-col :span="11">
            <el-form-item prop="btime1">
              <el-date-picker type="date" 
                placeholder="选择日期" 
                v-model="ruleForm.btime1" 
                style="width: 100%;"
                :clearable="clearable"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="btime2">
              <el-date-picker type="date" 
                placeholder="选择日期" 
                v-model="ruleForm.btime2" 
                style="width: 100%;"
                :clearable="clearable"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="报名费" prop="pay">
          <el-input type="text" v-model="ruleForm.pay"></el-input>
        </el-form-item>
        <el-form-item label="段位限制">
          <el-col :span="11">
            <el-form-item prop="glevel">
              <el-select v-model="ruleForm.glevel" class="selectInput">
                <el-option label="无限制" value="0" :disabled="disable"></el-option>
                <el-option label="新手" value="1" :disabled="ruleForm.gtype == '0'"></el-option>
                <el-option label="业余" value="2" :disabled="(ruleForm.glevel2 != '' && !(ruleForm.glevel2 > '1'))"></el-option>
                <el-option label="专业" value="3" :disabled="(ruleForm.glevel2 != '' && !(ruleForm.glevel2 > '2'))"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-form-item prop="glevel2">
              <el-select v-model="ruleForm.glevel2" class="selectInput">
                <el-option label="无限制" value="0" :disabled="disable"></el-option>
                <el-option label="新手" value="1" :disabled="(ruleForm.gtype == '0' || (ruleForm.glevel != ''  && !(ruleForm.glevel < '2')))"></el-option>
                <el-option label="业余" value="2" :disabled="(ruleForm.gtype == '0' || (ruleForm.glevel != ''  && !(ruleForm.glevel < '3')))"></el-option>
                <el-option label="专业" value="3" :disabled="ruleForm.gtype == '0'"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="比赛时间" prop="gtime">
          <el-date-picker 
            v-model="ruleForm.gtime" 
            type="datetime" 
            placeholder="选择日期时间" 
            class="gametime"
            :clearable="clearable"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="比赛地点" prop="gplace">
          <el-input type="text" v-model="ruleForm.gplace"></el-input>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import BlueTitle from 'components/common/BlueTitle'

import {validateGname} from 'common/validate'

import {addGame} from 'network/manage/addGame'

export default {
  name:'addGame',
  components:{
    BlueTitle
  },
  data(){
    // 报名开始时间验证
    let validateBtime1 = (rule, btime1, callback)=> {
      let date = new Date(btime1)
      let now = (new Date()).getTime();
      if(date.getTime() < (now - 86400 * 1000)){
        callback(new Error('报名开始应大于当前日期'))
      }else if(this.ruleForm.btime2 && btime1 >= this.ruleForm.btime2){
        callback(new Error('报名开始应小于截止日期'))
        this.ruleForm.btime1 = ''
      }else{
        callback()
      }
    };
    // 报名截止时间验证
    let validateBtime2 = (rule, btime2, callback)=> {
      if(btime2 <= new Date()){
        callback(new Error('截止日期应大于当前日期'))
      }else if(btime2 <= this.ruleForm.btime1){
        callback(new Error('截止日期应大于开始日期'))
        this.ruleForm.btime2 = ''
      }else if(this.ruleForm.gtime && btime2 >= this.ruleForm.gtime){
        callback(new Error('截止日期应小于比赛日期'))
        this.ruleForm.btime2 = ''
      }else{
        callback()
      }
    };
    // 比赛时间验证
    let validateGtime = (rule, gtime, callback)=> {
      let date = new Date(this.ruleForm.btime2)
      let date2 = new Date(gtime)
      if(date2 <= date){
        callback(new Error('比赛日期应大于截止报名日期'))
        this.ruleForm.gtime = ''
      }else{
        callback()
      }
    };
    return {
      ruleForm: {
        gtype:'',
        gname: '',
        btime1:'',
        btime2:'',
        pay:'',
        glevel:'',
        glevel2:'',
        gtime:'',
        gplace:''
      },
      clearable:false,
      disable:true,
      rules: {
        gtype:[
          { required: true, message: '请选择比赛类型', trigger: 'blur' },
        ],
        gname:[
          { required: true, message: '请输入比赛名', trigger: 'blur' },
          { validator: validateGname, trigger: 'blur' }
        ],
        btime1:[
          { required: true, message: '请选择报名开始时间', trigger: 'blur' },
          { validator: validateBtime1, trigger: 'blur' }
        ],
        btime2:[
          { required: true, message: '请选择报名截止时间', trigger: 'blur' },
          { validator: validateBtime2, trigger: 'blur' }
        ],
        pay:[
          { required: true, message: '请输入报名费用', trigger: 'blur' },
        ],
        glevel1:[
          { required: true, message: '请选择最低段位', trigger: 'blur' },
        ],
        glevel2:[
          { required: true, message: '请选择最高段位', trigger: 'blur' },
        ],
        gtime:[
          { required: true, message: '请选择比赛时间', trigger: 'blur' },
          { validator: validateGtime, trigger: 'blur' }
        ],
        gplace:[
          { required: true, message: '请输入比赛地点', trigger: 'blur' },
        ],
      }
    }
  },
  watch:{
    ruleForm:{
      handler(val, oldVal){
        this.ruleForm.pay = this.ruleForm.pay.replace(/[^\d]/g,'')
        if(this.ruleForm.gtype == '0'){
          this.ruleForm.glevel = '0'
          this.ruleForm.glevel2 = '0'
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { 
          addGame(this.ruleForm).then(res=>{
            if(res.data.key){
              this.$message({
                message: res.data.message,
                type: 'success'
              });  
            }else{
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 验证码赋值给checkCode
    check(val){
      this.checkCode = val.toLowerCase();
      if(this.ruleForm.code){
        this.$refs.ruleForm.validateField('code');
      }
    },
    empty(){
      this.ruleForm.glevel = ''
      this.ruleForm.glevel2 = ''
    }
  }
}
</script>

<style>
#newgame .title-con{
  height: 30px;
  text-align: center;
  margin-bottom: 40px;
  color: #303133;
}
#newgame .title-con img{
  position: relative;
  top: 7px;
  right: 10px;
}
#newgame .title{
  display: inline-block;
  line-height: 35px;
  text-align: center;
  font-size: 20px;
}
#addgame{
  width: 400px;
  margin: 0 auto;
}
#addgame .el-form-item__label:before{
  content: ""
}
#addgame .el-form-item__label{
  user-select: none;
}

#addgame .line{
  line-height: 40px;
  text-align: center;
}
#addgame .selectInput,
#addgame .gametime{
  width: 100%;
}
</style>