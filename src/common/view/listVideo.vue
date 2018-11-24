<template>
  <div class="list" >
      <div class="item">
          <div class="icon">
            <img :src="listdata.thumbnailUrl" alt="">
            <div class="playIcon">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="paddingStyle">
            <h3 class="comment-Title">{{listdata.title}}</h3>
            <div class="desc">
                <!-- 文章简介 -->
                <div>{{listdata.describe}}</div>
                <!-- 评论数量 -->
                <div>{{listdata.commentCount}}评论</div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      
      }
    },
    props:{
      listdata:{
        type:Object,
        default:function(){
          return []
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .icon 
    position relative
    .playIcon
      position absolute
      top 50%
      left 50%
      transform  translate(-50%,-50%)
      i
        font-size 2rem
        color #C6C6C4
        padding 1rem 1rem 1rem 1.2rem
        border 2px solid #C6C6C4
        border-radius 50%
    img
      height 12rem
      width 100%
      border 2px solid #D3D3D3
  .paddingStyle
    padding 0rem 1rem 1rem 1rem
    line-height 2rem
    .comment-Title
      font-weight 500
      color black 
    .desc
      display flex
      text-align left
      justify-content space-between
      font-size 0.8rem
      color #B7B8BA
      div:first-child
        width 50%
        color #B7B8BA
        overflow  hidden
        text-overflow ellipsis
        white-space  nowrap
</style>
