<template>
  
  <div> 
    <div class="articleDetail" v-if="pageType == 'article'">
      <contentHeader :listdata="{'content':'文章正文'}"></contentHeader>
      <!-- 文章列表 -->
      <div class="articleTitle">{{videoData.title}}</div>
      <!-- 评论列表 -->
      <div class="descTitle">
        <div class="desc">
          <span class="user">{{videoData.createUserNickName }}</span>
          <span class="time">{{videoData.createTime }}</span>
        </div>
        <div class="articleContent" v-html='this.htmlEnCode(videoData.content)'></div>
      </div>
      <!-- 文章内容 -->
    </div>
    <div v-else class="">
        <contentHeader :listdata="{'content':'视频'}"></contentHeader>
      <!-- 视频列表 -->
        <div v-on:click="playVideo()" v-show="true"  class="video">
          <img v-show="!ifPlay" :src="videoData.thumbnailUrl" alt="">
          <div class="playIcon">
            <i class="iconfont icon-bofang"></i>
          </div>
          <video v-show="ifPlay" :src="videoData.videoUrl" controls id="videoPlay" class="video">您的浏览器不支持 video 视屏播放。</video> 
        </div>
        <!-- 视频基本信息 -->
        <div class="videoInfo">
          <!-- 视频标题 -->
          <div class="videoTitle">{{videoData.title}}</div>
          <div class="videoMessage">
            <!--  播放次数 -->
            <div>
              <span>
                {{videoData.borwseCount}}播放
              </span>
            </div>
            <!--  点赞数量 评论 -->
            <div>
              <span @click="changeXihuan">
                <i :class="{iconfont:true,'icon-xihuan2':this.xihuan,'icon-xihuan':!(this.xihuan)}"></i>
                {{videoData.keepCount }}
                </span>
              <span>
                <i class="iconfont icon-pinglun"></i>
                {{videoData.commentCount }}
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
  import commentPublish from './information/commentPublish.vue';
  import {getArticleDetail,getVideo} from '@/api/recommend/index';
  export default {
    name: 'articleDetail',
    data () {
      return {
        detail : "",
        videoSrc: 'https://vdse.bdstatic.com//a819ba306b1d95d8d93e52c71d31635b?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F38bdd1bb8bfd3eaa5c633280bd1c4a6514812ea7224b7efa3ac20b5ab8eab126',
        videoData : {},
        videoData : {},
        pageType : 'article',
        xihuan : false,
        ifPlay : false
      }
    },
    created:function (){
      this.pageType = this.$route.params.type
      if(this.pageType == 'article'){
        console.log("文章")
         // 获取文章详情
        getArticleDetail({
          data:{
            id : '6fbd4b4567394826967c9988c606d822'
            // id : this.$route.params.id
          }
        }).then((res)=>{
          console.log(this.htmlEnCode(res.data.content))
          this.videoData = res.data
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
        this.ifPlay = true;
        vdo.play();
      },
      changeXihuan(){
        this.xihuan = !(this.xihuan)
      },
      htmlEnCode(text){
        var temp = document.createElement("div"); 
        temp.innerHTML = text; 
        var output = temp.innerText || temp.textContent; 
        temp = null; 
        output = output.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        return output;
      }
    },
    components:{
      contentHeader,commentPublish
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    .articleTitle
      font-size 2rem
      text-align left
      padding .5rem
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
      // 文章内容
    .articleContent
      overflow hidden
      img
        width 100%
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
    position relative
    .playIcon
      position absolute
      top 50%
      left 50%
      transform  translate(-50%,-50%)
      i
        font-size 2rem
    video,img
      width 100%
      height 13rem
  .videoInfo
      padding 0 1rem
    .videoTitle
      font-size 1.5rem
      text-align left
    .videoMessage
      display flex
      justify-content space-between
      align-items flex-end
</style>
