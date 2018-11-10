<template>
  <!-- 文章列表 -->
  <div class="articleContent">
    <!-- 最新 -->
    <div v-if='tabType == 1'>
      <!-- 最新 -->
      <!-- 推荐轮播位置 -->
      <swipe :listdata='swipeData'></swipe>
      <div v-for="(item,index) of articleData" :key='index'>
        <!-- 专题 -->
        <listRankContent v-if="item.contentSourceType == 2"  :listdata='item'  @click.native="toDetail(item.id)"></listRankContent>
        <!-- 广告 -->
        <listAdvert v-else-if="item.contentSourceType == 3"  :listdata='item' @click.native="toDetail(item.id)"></listAdvert>
        <!-- 文章 -->
        <listContent v-else-if='item.contentSourceType == 1' :listdata='item' @click.native="toDetail(item.id,'article')"></listContent>
      </div>
    </div>
    <div v-else-if='tabType == 2'>
      <!-- 视频 -->
      <div v-for="(item,index) in videoData" :key='index'>
        <listVideo :listdata='item' @click.native="toDetail(item.id,'video')"></listVideo>
      </div>
      <!-- <div v-for="item in 9" :key='item'>
          <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div> -->
    </div>
    <div v-else-if='tabType == 3'>
      <!-- 上海 -->
      <div v-for="item in 9" :key='item'>
          <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div>
    </div>
    <div v-else-if="tabType == 4">
      <!-- 测试 -->
      <contentHeader :listdata='listData6'></contentHeader> 
      <swipe :listdata='listData4'></swipe>
    </div>
    <div v-else-if="tabType == 5">
      <!-- 导购 -->
      <contentHeader :listdata='listData6'></contentHeader> 
      <swipe :listdata='listData4'></swipe>
      <div v-for="item in 9" :key='item'>
          <listVideo :listdata='listData3'></listVideo>   
      </div>
    </div>
  </div>
</template>

<script>
  import listContent from '@/common/view/listContent';
  import listRankContent from '@/common/view/listRankContent.vue';
  import listVideo from '@/common/view/listVideo.vue';
  import swipe from '@/common/view/swipe.vue';
  import listAdvert from '@/common/view/listAdvert.vue';
  import contentHeader from '@/common/view/contentHeader.vue';
  import {getIndexLunbo,getadvert,getVideoList,getArticleList,axiosAll} from '@/api/articleList.js';
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData5 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData6 : {'content':"文章正文"},
        // 轮播图data 
        swipeData : [],
        // 当前页面的数据格式 
        nowDataFormat : {
          advertising : 1,//广告
          articleSpecial : 1,//文章专题
          article : 3,//文章
        },
        // 文章部分总数据 包含 文章 广告 专题
        videoData : [],
        articleData:[]
      }
    },
    props:['tabType'],
    created:function(){
      // 文章列表
            getadvert({
              data:{
                "pageNo": 1,
                "pageSize": 15
              }
            }).then((res) => {
              this.articleData = res['data'];
            });
            // 轮播列表
            getIndexLunbo().then((res) => {
              this.swipeData = res['data'];
            });
    },
    watch:{
      tabType:function(id){
        let that = this;
        // 当tabType更新时重新调用接口查询数据
        switch (id*1) {
          case 1:
            // 文章列表
            getadvert({
              data:{
                "pageNo": 1,
                "pageSize": 15
              }
            }).then((res) => {
              that.articleData = res['data'];
            });
            // 轮播
            getIndexLunbo().then((res) => {
              that.swipeData = res['data'];
            });
            break;
          case 2:
            // 拿到视频列表
            getVideoList({
              data:{
                "pageNo": 1,
                "pageSize": 15
              }
            }).then((res) => {
              that.videoData = res['data'];
            });
            break;
          default:
            break;
        }
      }
    },
    mounted:function(){
      console.log(this.tabType)
    },
    methods:{
      toDetail : function(data,type){
        // 进入文章喜爱那个IQ那个页面
        this.$router.push({
          name:"articleDetail",
          params:{
            id:data,
            type:type
          }
        })
      },
    },
    components:{
      listContent,
      listRankContent,
      listVideo,
      swipe,
      listAdvert,
      contentHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
