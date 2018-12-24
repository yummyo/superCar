<template>
  <div class="searchList">
    <div class="content">
      <div>
        <span class="iconfont icon-sousuo"></span>
        <input type="text" v-model="searchText" placeholder="搜车、搜人、搜内容">
      </div>
      <span class="close">取消</span>
    </div>
   <div v-if="searchData.length == 0">
      <!--  热门搜索 -->
    <div class="hotSearch">
      <p class="infoTitle">热门搜索</p>
      <span v-for="(item,index) of hotSearch" :key="index">
        <span>{{ item['name'] }}</span>
      </span>
    </div>
    <!-- 历史记录 -->
    <div class="historySearch">
      <p class="infoTitle">历史记录</p>
      <ul>
        <li v-for="(item,index) of historySearchData" :key="index">
          <span class="iconfont icon-history"></span>
          <p class="content">{{ item['content'] }}</p>
          <span class="iconfont icon-fanhui"></span>
        </li>
      </ul>
      <p class="text-center">
        <span class="clearHistory">清除历史记录</span>
      </p>
    </div>
   </div>
    <!-- 搜索结果 -->
    <div v-else>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchText:'',
      searchData:[],
      hotSearch:[
        {'name':'骐达'},
        {'name':'迈腾'},
        {'name':'冠道'},
        {'name':'本田'},
      ],
      historySearchData:[
        {'content':'腾'},
        {'content':'迈腾'},
        {'content':'111111'}
      ]
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 提示字体
  .infoTitle
    font-size .8rem
    color #ddd
    text-align left
  .searchList
    // font-size 0
    padding .5rem 1rem 0
    .content
      background #fff
      border-radius 5px
      display flex
      align-items center
      >div
        flex-grow 1
        background #efebeb
        display flex
        justify-content center
        align-items center
        .icon-sousuo
          padding 0 .5rem
        input
          text-align left
          padding .5rem .3rem
          box-sizing border-box
          background #efebeb
          flex-grow 1
          &:focus
            outline none
      input,span
        display inline-block
        border none
        font-size 1rem
      .close
        padding 0 1rem
  .hotSearch
    text-align left 
    >span
      min-width 20%
      display inline-block  
      text-align center
      padding 0 .5rem
      span 
        background #ddd
        display block
        padding .3rem 0 
  .historySearch
    margin-top 1rem
    ul
      li
        display flex
        justify-content center
        align-items center
        line-height 2rem
        border-bottom 1px solid #ddd
        .content
          flex-grow 1
          padding .5rem
    .clearHistory
      color #ddd
</style>  

