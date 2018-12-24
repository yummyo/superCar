<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="content">
      <span class="iconfont icon-sousuo"></span>
      <!-- <input type="text" v-model="data" placeholder="搜车、搜人、搜内容"> -->
      <div class="searchDiv" @click="toSearch">搜车、搜人、搜内容</div>
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
    methods:{
      toSearch(){
        console.log(123)
        this.$router.push({
          path:'/searchList'
        })
      }
    }
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
    .searchDiv,span
      display inline-block
      border none
      font-size 1rem
      width 80%
    .searchDiv
      text-align left
      padding .5rem .3rem
      box-sizing border-box
      &:focus
        outline none
    .iconfont
      width 10%
    
</style>
