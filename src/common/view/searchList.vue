<template>
  <div class="searchList">
    <!-- 资讯页面 -->
    <div class="tab" ref='tab'>
      <div v-for="item of testData" :class="{active : tabType==item.type,tab_item : true}" @click="changeActive(item.class,item.type)" :key="item.name">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="bodyBox">
      <div v-for="(item,index) of listdata" :key="index" @click="toDetail(item)">
        <listContent :listdata='item'></listContent>
      </div>
    </div>
  </div>
</template>

<script>
import listContent from '@/common/view/listContent';
export default {
  components:{
    listContent
  },
  data(){
    return {
      searchText:'',
      searchData:[],
      testData:[
        {'name':"文章",class:'recommend',type:"1",'titleType':"ALL"},
      ],
      tabType: '1',
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
  props:{
    listdata:{
      type:Array,
      default: () => {}
    }
  },
  methods: {
    changeActive:function(cla,type){
      this.nowActive = cla;
      this.tabType = type
      this.$router.push({
        path:'/carArticleList',
        query:{
          tabType:type
        }
      })
    },
    toDetail(item){
      // 文章详情
      this.$router.push({
        path:'/articleDetail',
        query:{
          id:item.id,
          pageType:'article'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    background #fff
    border-bottom 2px solid #ddd
    text-align left
    .tab_item
      display inline-block
      width 20%
      box-sizing border-box
      color #fff
      padding .2em 1rem
      position relative
      text-align center
      margin .5rem 0
      &.active
        color $color-model-color-blue
        &::after
          content ''
          position  absolute
          bottom 0
          left 50%
          transform translateX(-50%)
          display inline-block
          width 30%
          height 0
          border-bottom 2px solid $color-model-color-blue
    .tab_item+.tab_item
      border-left 1px solid #000
</style>  

