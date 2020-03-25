<template>
  <div id="adminspace">
    <div class="left">
      <div class="user-img">
        <el-upload
          class="avatar-uploader"
          name="image"
          action="http://localhost:3000/saveimg.php"
          :data="{username,identify}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" title="点我上传头像">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="user-box" @click="tabIndex=1">
        <p class="user-p clip2"><span>用户管理</span></p>
      </div>
      <div class="user-box" @click="tabIndex=2">
        <p class="user-p clip2"><span>报名管理</span></p>
      </div>
      <div class="user-box" @click="tabIndex=3">
        <p class="user-p clip2"><span>添加比赛</span></p>
      </div>
      <!-- <div class="user-box" @click="tabIndex=4">
        <p class="user-p clip2"><span>成绩录入</span></p>
      </div> -->
    </div>
    <div class="right">
      <user-manage v-if="tabIndex==1"/>
      <sign-manage v-if="tabIndex==2"/>
      <add-game v-if="tabIndex==3"/>
      <!-- <add-grade v-if="tabIndex==4"/>   -->
    </div>
  </div>
</template>

<script>
import addGame from './manage/addGame'
import addGrade from './manage/addGrade'
import signManage from './manage/signManage'
import userManage from './manage/userManage'

export default {
  name:'adminSpace',
  created(){
    this.$store.state.tabbar = 0
  },
  data(){
    return {
      tabIndex:1,
      imageUrl: this.$store.state.imageUrl,
      username:this.$store.state.username,
      identify:this.$store.state.isAdmin
    }
  },
  components:{
    addGame,
    addGrade,
    signManage,
    userManage
  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message({
        message: res.message,
        type: 'success'
      });
      this.$store.state.imageUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {
      // 传多个格式 ['image/jpeg','image/png','image/gif'].includes(file.type)
      // const isImg = file.type === 'image/jpeg';
      const isImg = ['image/jpeg','image/png','image/gif'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error('上传头像图片只能是jpg,gif,png格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImg && isLt2M;
    },
  }
}
</script>

<style scoped>
#adminspace{
  width: 1140px;
  display: flex;
  margin: 0 auto;
}
.left{
  width: 200px;
  border-radius: 5px;
  margin-right: 15px;
}
.user-img img{
  width: 200px;
  height: 200px;
  background-color: #fff;
}
.user-box{
  position: relative;
  margin: 15px 0px 0 0;
}
.user-box .user-p{
  width: 200px;
  height: 60px;
  font-size: 20px;
  line-height: 55px;
  text-align: center;
  color: #fff;
  box-sizing: border-box;
  background-color: #409eff;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: .2s;
  position: relative;
  cursor: pointer;
}
.user-box .user-p:hover{
  color: #409eff;
  background-color: #fff;
}
.right{
  flex: 1;
  background-color: #f5f6f7;
  border-radius: 5px;
}
/* 图片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>