<template>
  <div class="recommend">
    <div class="topBg">
      <!-- 搜索框 -->
      <CommonSearch></CommonSearch>  
      <!-- 分类信息 -->
      <div class="tab">
        <div v-for="item of testData" :class="{active : nowActive==item.class,tab_item : true}" @click="changeActive(item.class,item.type)" :key="item.name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <articleContent class="articleList" :tabType='tabType'></articleContent>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import {getIndexLunbo} from '@/api/articleList';


  import articleContent from './articleContent.vue';
  export default {
    name: 'recommend',
    data () {
      return {
        testData:[
          {'name':"最新",class:'recommend',type:"1",'titleType':"ALL"},
          {'name':"视频",class:'city',type:"2"},
          {'name':"上海",class:'movie',type:"3",'cityCode':""},
          {'name':"测评",class:'car',type:"4",'titleType':"PC"},
          {'name':"导购",class:'shop',type:"5",'titleType':"DG"},
        ],
        nowActive : "recommend",
        tabType:1
      }
    },
    mounted:function(){
      // getArticleList({
      //   data:{
      //     pageSize:10,
      //     pageNum:1,
      //     categoryId:'',
      //   }
      // }).then(res=>{
      //   if(res.data){
      //     this.textDataList = res.msgBody.data;
      //   }
      // })
    },
    methods:{
      changeActive:function(cla,type){
        this.nowActive = cla;
        this.tabType = type
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
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
    background #3B5997
    // tab切换组件
    height 5rem
  .tab_item
    display inline-block
    width 20%
    box-sizing border-box
    color #fff
    padding .2em .5rem
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
