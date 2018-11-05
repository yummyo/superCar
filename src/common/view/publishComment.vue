<template>
  <div class="publishComment">
    <!-- 发表评论 -->
      <input type="text" placeholder="发表评论">
      <div @click="toggleComment">
        <mt-badge class="badge" size="small" type="error">1</mt-badge>
        <span :class="{'iconfont':true,'icon-pinglun':!isComment,'icon-tubiaozhizuo-':isComment}" ></span>
      </div>
      <div @click="toggleCollect">
        <mt-badge class="badge" size="small" type="error">10</mt-badge>
        <span :class="{'iconfont':true,'icon-unie601':!isCollect,'icon-shoucang':isCollect}"></span>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'publishComment',
    data () {
      return {
        isComment:false,
        isCollect:false,
      }
    },
    methods:{
      toggleComment : function(){
        this.isComment = !this.isComment
      },
      toggleCollect : function(){
        this.isCollect = !this.isCollect
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .publishComment
    padding 10px 
    display flex
    height 40px
    background #F6F7FB
    position fixed
    bottom 0
    input 
      width 80%
      padding-left 2rem
      font-size 1.3rem
      border none
      &:focus
        outline none
    div 
      position relative
      flex-grow 1
      padding 0 1rem
      .badge
        position absolute
        top 0
        right 0
        transform translateX(-30%)
      span.iconfont
        font-size 2rem
    
</style>
