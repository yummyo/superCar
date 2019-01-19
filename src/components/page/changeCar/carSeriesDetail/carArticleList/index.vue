<template>
  <div>
    <contentHeader ref='head' :listdata="{'content':$route.query.seriesName.substring(0,8)+'文章'}" ></contentHeader>
    <!-- 资讯页面
    <div class="tab" ref='tab'>
      <div v-for="item of testData" :class="{active : tabType==item.type,tab_item : true}" @click="changeActive(item.class,item.type)" :key="item.name">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="bodyBox">
      <div v-for="(item,index) of boxData" :key="index" @click="toDetail(item)">
        <listContent :listdata='item'></listContent>
      </div>
    </div> -->
    <search-list :listdata='boxData'></search-list>
  </div>
</template>

<script>
import contentHeader from '@/common/view/contentHeader';
import listContent from '@/common/view/listContent';
import searchList from '@/common/view/searchList';
import { getBySearchLike } from '@/api/recommend/index';
export default {
  components:{
    contentHeader,listContent,searchList
  },
  data(){
    return {
      testData:[
        {'name':"文章",class:'recommend',type:"1",'titleType':"ALL"},
      ],
      tabListHeight:'0px',
      tabType: '1',
      boxData:[]
    }
  },
  mounted(){
    // this.tabListHeight = 'calc(100% - '+(this.$refs.tab.clientHeight + this.$refs.head.$el.clientHeight)+'px)'
    // console.log(this.tabListHeight)
    getBySearchLike({
      data:{
        seriesName: this.$route.query.seriesName
      }
    }).then(res => {
      this.boxData = res.data
    })
  },
  methods:{
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

<style  scoped lang="stylus" rel="stylesheet/stylus">
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
  .bodyBox
    height calc(100% - 5rem)
</style>
