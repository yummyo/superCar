<template>
  <div class="carSeriesDetail">
    <!-- 公共头部 -->
    <contentHeader :listdata='articleContent'></contentHeader>
    <div class="carSeriesTitle">
      <img src="/static/index/carSeriesDetail_02.jpg" alt="">
      <span class="totalStyle">共12345张</span>
    </div>
    <div class="content">
       <div>
          <ul>
            <li class="redStyle">42.28万起</li>
            <li class="Generation">指导价:42.24-63.25万</li>
          </ul>
          <ul>
            <li class="typesStyle">级别:中大型车</li>
            <li class="typesStyle">油耗:6.1-13.1L</li>
          </ul>
       </div>
       <div>
          <div class="book">预约试驾</div>
          <div class="book">置换</div>
          <div class="price">询底价</div>
       </div>
    </div>
    <div class="contentList">
        <ul>
          <li>评价</li>
          <li>参配</li>
          <li>点评</li>
          <li>资讯</li>
          <li>经销商</li>
        </ul>
    </div>
    <div class="contentName">
        <div>2018款</div>
        <div>2.0T涡轮增压184马力</div>
    </div>
    <div class="Parameter"> 
        <div class="itemList" v-for="item in 5">
            <div>
               E200运动型
            </div>
            <div> 
              <ul>
                <li class="typesStyle">九档自动变速箱(AT)</li>
                <li class="typesStyle">油耗:6.8(L/100公里)</li>
              </ul>
              <ul>
                <li class="redStyle">42.28万起</li>
                <li class="guidePrice">指导价:42.24-63.25万</li>
              </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script> 
import contentHeader from '@/common/view/contentHeader';
export default {
  data () {
    return{
      articleContent:{'content':'奔驰E系'},
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    contentHeader,
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carSeriesTitle
    position relative
    img
      width 100%
    .totalStyle
      display inline-block
      padding .5rem 1rem
      background rgba(0,0,0,0.5)
      position absolute
      bottom 4px
      right 0
      color white 
      font-weight bold
  .content
    >div
      display flex
      justify-content space-between
      padding 0 1rem
      font-weight bold
      li
        padding .5rem 0
      .redStyle
        color red 
        text-align left
        font-size 1.2rem   
      .Generation
        color #949494
        font-size 1rem
      .typesStyle
        font-size 1.2rem
        color #656565
      .book
        border 2px solid #EFEFEF
        padding .2rem .5rem
        border-radius 5px
        color #1F71AD
        width 4rem
      .price
        border 2px solid #EFEFEF
        padding .2rem .5rem
        border-radius 5px
        color #fff
        background #FD9927
        width 4rem
 .contentList
    margin-top 1rem
    background #F8F8F8
    padding 1rem 0
    border-top 2px solid #EFEFEF
    ul
      display flex 
      justify-content space-between
      color #646464
      li
        width 20%
        border-left 2px solid #EFEFEF
      li:last-clild 
        border-right none
  .contentName
    text-align left
    font-size 1.8rem
    div:nth-child(1) 
      padding 1rem .8rem
      color #1F71AD
    div:nth-child(2)
      padding .5rem .5rem
      background #F8F8F8
      color #989898
.Parameter
   background #F8F8F8
   text-align left
   color #949494
   font-size 1.1rem
   .itemList
      padding 0 0.8rem
      margin-bottom 2rem
      background #fff
      div
        display flex 
        justify-content space-between
        .redStyle
          color red
          text-align right
        .guidePrice
          text-align right
</style>
