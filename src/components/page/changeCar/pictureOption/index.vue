<template>
  <div class="pictureOption">
    <contentHeader :noBorder='true' :listdata="{'content':'车型图片'}"></contentHeader>
    <!-- 图片综合 -->
    <div class="tobar">
      <div>外观</div>
      <div>细节</div>
      <div>中控</div>
      <div>座椅</div>
      <div>其他</div>
    </div>
    <!-- 图片 -->
    <div class="imgList">
      <div>
        <img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1840527508,2735044619&fm=173&app=25&f=JPEG?w=218&h=146&s=85F25C81021001DE58317D18030080C0" alt="">
      </div>
      <!-- 图片标题 -->
      <p class="text-left">{{ nowImgData['title'] }}</p>
    </div>
    <!-- 底部信息 -->
    <div class="bottomInfo text-left">
      <div>
        <span>指导价:</span>
        <span>{{nowImgData['guide']}}万</span>
      </div>
      <button class="spuerCar_btn">询底价</button>
    </div>
  </div>
</template>

<script>
import contentHeader from '@/common/view/contentHeader';
export default {
  data(){
    return {
      nowImgData:{
        guide:'12.5',
        title:'别克君威 自动先锋版'
      }
    }
  },
  components:{
    contentHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .pictureOption
    background #000
    height 100%
    color #ffffff
    .tobar
      display flex
      >div
        flex 1
      div:first-child~div
        border-left 1px solid #ddd
    .imgList
      position absolute
      top 50%
      left 0
      right 0
      transform translateY(-50%)
      p
        margin 2rem 0
      img
        height 15rem
        width 100%
    .bottomInfo
      position absolute
      bottom 0
      left 0
      right 0 
      display flex
      justify-content space-between
      align-items center
      padding 0 1rem
      .spuerCar_btn
        background #C2761E
        color #ffffff
        border none
</style>
