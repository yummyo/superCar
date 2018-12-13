<template>
  <div>
    <contentHeader ref='head' :listdata="{'content':'资讯'}" ></contentHeader>
    <!-- 资讯页面 -->
    <div class="tab" ref='tab'>
      <div v-for="item of testData" :class="{active : tabType==item.type,tab_item : true}" @click="changeActive(item.class,item.type)" :key="item.name">
        <span>{{ item.name }}</span>
      </div>
    </div>
    <taberList class="dataList" :style="{heihgt : tabListHeight}"></taberList>
  </div>
</template>

<script>
import contentHeader from '@/common/view/contentHeader';
import taberList from './taberList';
export default {
  components:{
    contentHeader,taberList
  },
  data(){
    return {
      testData:[
        {'name':"最新",class:'recommend',type:"1",'titleType':"ALL"},
        {'name':"视频",class:'city',type:"2"},
        {'name':"上海",class:'movie',type:"3",'cityCode':""},
        {'name':"测评",class:'car',type:"4",'titleType':"PC"},
        {'name':"导购",class:'shop',type:"5",'titleType':"DG"},
      ],
      tabListHeight:'0px',
      tabType:this.$route.query.tabType || 1
    }
  },
  mounted(){
    // this.tabListHeight = 'calc(100% - '+(this.$refs.tab.clientHeight + this.$refs.head.$el.clientHeight)+'px)'
    // console.log(this.tabListHeight)
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
    }
  }
}
</script>

<style  scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    background #ddd
    .tab_item
      display inline-block
      width 20%
      box-sizing border-box
      color #fff
      padding .2em .5rem
      &.active
        color red
    .tab_item+.tab_item
      border-left 1px solid #000
</style>
