<template>
  <div class="list" >
      <div class="item">
          <div class="icon">
            <img :src="listdata.thumbnailUrl" alt="">
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
  .icon img
    height 12rem
    width 100%
    border 2px solid #D3D3D3
  .paddingStyle
    padding 1rem
    line-height 2rem
    .desc
      display flex
      text-align left
      justify-content space-between
      div:first-child
        width 50%
        color #B7B8BA
        overflow  hidden
        text-overflow ellipsis
        white-space  nowrap
</style>
