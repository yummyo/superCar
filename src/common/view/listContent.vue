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
          <h3 class="name">{{listdata.content}}</h3>
          <p class="desc">{{listdata.comment}}</p>
        </div>
        <div class="icon">
          <img :src="listdata.images">
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
    align-items center
    margin .5rem 1rem
    border-bottom 1px solid #E1E1E1
    .icon
      padding-left 1rem
      img
        width 100%
        height 4.5rem
    .text
      display flex
      flex-direction column
      line-height 2rem
      overflow hidden
      .name
        text-align left
        color #47484C
      .desc
        text-align left
        color #B7B8BA
</style>
