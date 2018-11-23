<template>
  <div class="commentPublish">
    <!-- 发表评论 -->
      <input type="text" placeholder="发表评论">
      <div @click="toggleComment">
        <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
        <span :class="{'iconfont':true,'icon-pinglun':!isComment,'icon-tubiaozhizuo-':isComment}" ></span>
      </div>
      <div @click="toggleCollect">
        <mt-badge class="badge" v-if="commentBrage>0" size="small" type="error">{{commentBrage}}</mt-badge>
        <span :class="{'iconfont':true,'icon-unie601':!isCollect,'icon-shoucang':isCollect}"></span>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'commentPublish',
    data () {
      return {
        isComment:false,
        isCollect:false,
      }
    },
    props:{
      commentBrage : 0,
      collectBrage : 0,
      id:{
        default:0
      },
      pageType:{
        default:'article'
      }
    },
    methods:{
      toggleComment : function(){
        // this.isComment = !this.isComment
        console.log("文章id"+this.id)
        this.$router.push({
          "path":"/commentList",
          'query' : {
            'id':this.id,
            'pageType':this.pageType
          }
        });
      },
      toggleCollect : function(){
        this.isCollect = !this.isCollect
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .commentPublish
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
        display inline-block
        width 2rem
        height 2rem
    
</style>
