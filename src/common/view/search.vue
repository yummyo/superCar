<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="content">
      <span class="iconfont icon-sousuo"></span>
      <input type="text" v-model="data" placeholder="搜车、搜人、搜内容">
      <span class="iconfont icon-shuaxin"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data () {
      return {
        data : ""
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .search
    font-size 0
    padding .5rem 1rem 0
    .content
      background #fff
      border-radius 5px
    input,span
      display inline-block
      border none
      font-size 1rem
      width 80%
    input
      font 1.5rem
      padding .5rem .3rem
      box-sizing border-box
      &:focus
        outline none
    .iconfont
      width 10%
    
</style>
