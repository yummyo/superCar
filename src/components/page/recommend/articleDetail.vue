<template>
  
  <div> 
    <contentHeader :listdata='articleData.title'></contentHeader>
    <div class="articleDetail" v-if="pageType == 'article'">
      <!-- 文章列表 -->
      <div>{{articleData.title}}</div>
      <!-- 评论列表 -->
      <div class="descTitle">
        <div class="desc">
          <span class="user">{{articleData.createUserNickName }}</span>
          <span class="time">{{articleData.createTime }}</span>
        </div>
        <div>{{articleData.content}}</div>
      </div>
      <!-- 文章内容 -->
    </div>
    <div v-else class="">
      <!-- 视频列表 -->
        <div v-on:click="playVideo()" v-show="true">
          <video :src="videoData.videoUrl" controls id="videoPlay" v-show="true" class="video">您的浏览器不支持 video 视屏播放。</video> 
        </div>
        <!-- 视频基本信息 -->
        <div class="videoInfo">
          <!-- 视频标题 -->
          <div class="videoTitle">{{videoData.title}}</div>
          <div class="videoMessage">
            <!--  播放次数 -->
            <div>
              <span>120播放</span>
            </div>
            <!--  点赞数量 评论 -->
            <div>
              <span>
                <i class="iconfont iconfont-"></i>
              </span>
            </div>
          </div>
        </div>
    </div>
    <!-- 下方评论部分 -->
    <commentPublish ></commentPublish>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import commentPublish from '@/common/view/commentPublish';
  import {getArticleDetail,getVideo} from '@/api/articleList.js';
  export default {
    name: 'articleDetail',
    data () {
      return {
        articleContent:{'content':'视频列表'},
        detail : "",
        videoSrc: 'https://vdse.bdstatic.com//a819ba306b1d95d8d93e52c71d31635b?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F38bdd1bb8bfd3eaa5c633280bd1c4a6514812ea7224b7efa3ac20b5ab8eab126',
        videoData : {},
        articleData : {},
        pageType : ''
      }
    },
    created:function (){
      this.pageType = this.$route.params.type
      console.log(this.pageType)
      if(this.pageType == 'article'){
        console.log("文章")
         // 获取文章详情
        getArticleDetail({
          data:{
            id : this.$route.params.id
          }
        }).then((res)=>{
          console.log(res)
          this.articleData = res.data
        })
      }else{
         console.log("shipin")
        // 获取视频详情
        getVideo({
          data : {
            id:this.$route.params.id
          }
        }).then((res)=>{
          this.videoData = res.data
        })
      }
    },
    mounted:function(){
      console.log(this.$route.params.data)
    },
    methods:{
      playVideo(){
          var vdo = document.getElementById("videoPlay");
          vdo.play();
        }
    },
    components:{
      contentHeader,commentPublish
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 文章标题
   .descTitle
    padding 1rem
    line-height 2rem
    .name
      text-align left
      color #474B4C
    .desc
      display flex
      text-align left
      justify-content space-between
      color #B7B8BA
    .articleContent 
      img
        width 100%
      h3  
        margin 2rem 0
        text-align left
        span 
          display inline-block
          margin-left 2rem
    .upload
      display flex
      justify-content space-between
      overflow hidden
      >div
        width 23%
      .share
        border 1px solid #f3f3f3
        padding 15px 0 5px
        border-radius 50%
  // 视频部分
  .video
    width 100%
  .videoInfo
    display flex
    justify-content space-between
    align-items flex-end
    .videoTitle
      font-size 1.5rem
      text-align left
    .videoMessage
      display flex
</style>
