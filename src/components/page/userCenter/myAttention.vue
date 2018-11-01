<template>
  <div class="list" >
      <contentHeader :listdata="listContent"></contentHeader>
      <div class="item" v-for="item in 5">
        <div class="icon">
          <img src="/static/index/myAttention_1.jpg">
        </div>
        <div class="text">
          <h3 class="name">兰博基尼</h3>
          <p class="desc">价格：<span>1000万起</span></p>
        </div>
      </div>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  export default {
    name: 'myAttention',
    data () {
      return {
        listContent : {'content':"车系"}
      }
    },
    props:{
      listdata:{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
    components:{
      contentHeader
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
    padding .5rem 0
    border-bottom 1px solid #E1E1E1
    .icon
      img
        width 12rem
        height 8rem
    .text
      display flex
      flex-direction column
      justify-content space-between
      flex-grow 1
      padding 1rem 0
      .name
        text-align left
        color #474B4C
      .desc
        text-align left
        color #474B4C
        span
          color red
</style>
