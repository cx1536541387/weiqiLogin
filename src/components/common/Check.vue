<template>
  <div class="con-random" @click="checkCode" title="点击我可以刷新验证码">
    <span class="result">{{result}}</span>
  </div>
</template>

<script>
import {createCode} from 'common/check'

export default {
  name:'Check',
  data(){
    return {
      result:'',
    }
  },
  mounted(){
    this.result=createCode(4);
    this.$emit('getCode', this.result);
  },
  methods:{
    checkCode(){
      this.result=createCode(4);
      this.$emit('getCode', this.result);
    },
  }
}
</script>

<style scoped>
.con-random{
	width: 100px;
  height: 40px;
  position: absolute;
	background-color: rgb(197, 197, 197);
  display: inline-block;
  margin-left: 15px;
	border-radius: 5px;
	text-align: center;
	cursor: pointer;
}
.result{
	font-size:20px;
  padding: 0px 5px;
	line-height: 40px;
	letter-spacing: 8px;
	font-family: verdana;
  user-select:none;
}
</style>