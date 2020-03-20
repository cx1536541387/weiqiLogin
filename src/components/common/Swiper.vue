<template>
  <div class="block" id="swiper">
    <el-carousel height="300px" :interval="4000" >
      <el-carousel-item v-for="item in imgs" :key="item.src">
        <img :src="item.src" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name:'Swiper',
  data(){
    return {
      imgs:[
        {src: require('assets/img/home/swiper/swiper4.png')},
        {src: require('assets/img/home/swiper/swiper1.png')},
        {src: require('assets/img/home/swiper/swiper2.jpg')},
        {src: require('assets/img/home/swiper/swiper3.jpg')}
      ],
    }
  }
}
</script>

<style>
  #swiper{
    margin-bottom: 15px;
  }

  #swiper .el-carousel__arrow{
    background-color: rgba(31,45,61,.4) !important;
  }
  
  #swiper .el-carousel__arrow:hover{
    background-color: rgba(31,45,61,.7) !important;
  }

  #swiper .el-carousel__button{
    width: 13px !important;
    height: 13px !important;
    background-color: rgba(178,190,195,.5) !important;
    opacity: 1 !important;
    border-radius: 50% !important;
  }
  
  #swiper .is-active .el-carousel__button{
    background-color: #fff !important;
  }
</style>