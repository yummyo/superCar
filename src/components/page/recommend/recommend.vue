<template>
  <div class="recommend">
    <div class="topBg">
      <!-- 搜索框 -->
      <CommonSearch></CommonSearch>  
      <!-- 分类信息 -->
      <div class="tab">
        <div v-for="item of testData" :class="{active : nowActive==item.class,tab_item : true}" @click="changeActive(item.class)" :key="item.name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <articleContent :tabType='9'></articleContent>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import articleContent from './articleContent.vue';
  export default {
    name: 'recommend',
    data () {
      return {
        testData:[
          {'name':"推荐",class:'recommend'},
          {'name':"上海",class:'city'},
          {'name':"视频",class:'movie'},
          {'name':"新车",class:'car'},
          {'name':"导购",class:'shop'},
        ],
        nowActive : "recommend"
      }
    },
    methods:{
      changeActive:function(cla){
        this.nowActive = cla;
      }
    },
    components:{
      CommonSearch,
      articleContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .topBg
    background #3B5997
  .tab_item
    display inline-block
    min-width 10%
    color #fff
    padding .5rem
    font-size 1.3rem
    &:after
      content ""
      display block
      margin 0 auto
      width 0
      height 0
      border-bottom 2px solid #fff
      margin-top 3px
      transition width .3s 
    &.active:after
      width 80%

</style>
