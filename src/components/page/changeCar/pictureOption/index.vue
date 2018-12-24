<template>
  <div class="pictureOption">
    <contentHeader class="header" blackBg noBorder :listdata="{'content':'车型图片'}"></contentHeader>
    <!-- 图片综合 -->
    <div class="tobar">
      <div>外观</div>
      <div>细节</div>
      <div>中控</div>
      <div>座椅</div>
      <div>其他</div>
    </div>
    <!-- 图片 -->
    <div class="box">
      <div class="wrapper" ref='wrapper'>
        <div  class="imgList">
          <div v-for="(item,index) of imgList" :key="index" class="item-img">
            <img v-lazy='item.imgUrl' alt="">
          </div>
        </div>
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
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      nowImgData:{
        guide:'12.5',
        title:'别克君威 自动先锋版'
      },
      nowSliderIndex:0,
      pageIndex:1,
      imgList:[]
    }
  },
  mounted() {
    this.imgList = this.carImgList
    setTimeout(() => {
      this.init()
      this.scroll.goToPage(this.$route.query.imgIndex,0,0)
    }, 20)
  },
  computed:{
    ...mapGetters(['carImgList'])
  },
  methods:{
    init(){
      let that = this
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 1,
        click: this.click,
        scrollX:true,
        scrollY: false,
        momentum: false,
        snap: {
          // 循环轮播配置
          // loop: true,
          threshold: 0.5
        },
        bounce: false,
      })
      this.scroll.on('scrollEnd', () => {
        that.nowSliderIndex = this.scroll.getCurrentPage().pageX
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
  },
  watch: {
    imgList() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  },
  components:{
    contentHeader
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .header 
    .contentHeader 
      background #000;
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
    .box
      position absolute
      top 50%
      left 0
      right 0
      transform translateY(-50%)
      .wrapper
        width 100%
      .imgList
        white-space nowrap
        display inline-block
        .item-img
          display inline-block
          width 100vw
          img
            height 15rem
            width 100%
      p
        margin 2rem 0
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
