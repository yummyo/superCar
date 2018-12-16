<template>
  <div class="list" >
    <!-- 文章 -->
      <!-- <ul>
          <li @click="selectItem()" v-for="(item,index) in listData" v-if="(index+1)%4!=0" class="item">
            <div class="text">
              <h3 class="name">{{item.content}}</h3>
              <p class="desc">{{item.comment}}</p>
            </div>
            <div class="icon">
              <img width="100%" :src="item.images">
            </div>
          </li>
      </ul> -->
      <div class="item">
        <div class="text">
          <h3 class="comment-Title">{{listdata.contentTitle}}</h3>
          <div class="comment">
            <div>{{listdata.commentCount }}评论</div>
            <div>{{listdata.createUserId }}</div>
          </div>
        </div>
        <div class="icon">
          <img v-if="listdata.thumbnailResource && listdata.thumbnailResource.length > 0" v-lazy="listdata.thumbnailResource[0].thumbnailUrl" alt="">
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
          return {}
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .item
    display flex
    box-sizing border-box
    flex-direction row
    /* justify-content center
    align-items center */
    margin 0 .8rem
    padding .8rem 0
    border-bottom 1px solid #E1E1E1
    .icon
      padding-left 1rem
      height 4.5rem
      width 7rem
      border 1px solid #ddd
      img
        width 100%
        height 100%
    .text
      display flex
      flex-direction column
      justify-content space-between
      flex-grow 1
      width 80%
      .comment-Title
        font-weight 500
        color black 
      .desc
        text-align left
        color #B7B8BA
      .comment
        display flex
        font-size .8rem
        color #ccc
        align-items baseline
        div:first-child
          padding-right .5rem
</style>
