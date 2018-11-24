<template>
  
  <div class="page"> 
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
              <span>
                <i class="iconfont icon-pinglun"></i>
                {{videoData.commentCount }}
                </span>
            </div>
          </div>
        </div>
    </div>
    <!-- 点赞 -->
    <div>
      <button class="spuerCar_btn" @click="star()">
        <span>
          <i :class="{iconfont:true,'icon-xihuan2':!this.isLike,'icon-xihuan':this.isLike}"></i>
          {{videoData.keepCount }}
        </span>
        </button>
    </div>
    <!-- 相关推荐 -->
    <div class="moreRecommend">
      <h5>相关推荐</h5>
      <div v-for="(item,index) of recommendData" :key="index">
          <listContent :listdata='item'></listContent>
      </div>
    </div>
    <!-- 下方评论部分 -->
    <commentPublish :id='pageId' :pageType='pageType'></commentPublish>
  </div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import commentPublish from './information/commentPublish.vue';
  import listContent from '@/common/view/listContent';
  import { getArticleDetail,getVideo,similarArticles,giveLike,removeLike,isLiked } from '@/api/recommend/index';
  export default {
    name: 'articleDetail',
    data () {
      return {
        detail : "",
        videoSrc: 'https://vdse.bdstatic.com//a819ba306b1d95d8d93e52c71d31635b?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F38bdd1bb8bfd3eaa5c633280bd1c4a6514812ea7224b7efa3ac20b5ab8eab126',
        videoData : {},
        videoData : {},
        pageType : 'article',
        ifPlay : false,
        pageId: 0,
        // 相关推荐
        recommendData:[],
        isLike:null
      }
    },
    created:function (){
      const that = this
      this.pageType = this.$route.query.type
      this.pageId = this.$route.query.id
      if(this.pageType == 'article'){
        console.log("文章")
         // 获取文章详情
        getArticleDetail({
          data:{
            id : this.$route.query.id
          }
        }).then((res)=>{
          this.videoData = res.data
        })
        similarArticles({
          data:{
            id : this.$route.query.id
          }
        }).then(res=>{
          that.recommendData = res.data.map(v => {
            console.log(v)
            v['contentTitle'] = v['title']
            v['thumbnailResource'] = v['thumbnailResource']
            return v
          })
          console.log(that.recommendData)
        })
      }else{
         console.log("shipin")
        // 获取视频详情
        getVideo({
          data : {
            id:this.$route.query.id
          }
        }).then((res)=>{
          this.videoData = res.data
        })
      }
      // 查询是否被点赞
      isLiked({
        data:{
          sourceId: this.$route.query.id,
          type: this.$route.query.type
        }
      }).then(res=>{
        if(!res.data){
          that.isLike = null
        }else{
          that.isLike = {
            id: res.data
          }
        }
      })
    },
    mounted:function(){
    },
    methods:{
      playVideo(){
        var vdo = document.getElementById("videoPlay");
        this.ifPlay = true;
        vdo.play();
      },
      htmlEnCode(text){
        var temp = document.createElement("div"); 
        temp.innerHTML = text; 
        var output = temp.innerText || temp.textContent; 
        temp = null; 
        output = output.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
        return output;
      },
      star(){
        const that = this
        if(that.isLike){
          removeLike({
            data:{
              id: that.isLike['id']
            }
          }).then(res => {
            that.isLike = null
          })
        }else{
          giveLike({
            data:{
              sourceId: this.$route.query.id,
              type: this.$route.query.type
            }
          }).then(res => {
            that.isLike = {
              id: res.data
            }
          })
        }
      }
    },
    components:{
      contentHeader,commentPublish,listContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  // 点赞按钮
  .spuerCar_btn
    background #fff
    outline none!important
  .page
    padding-bottom 60px
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
  .moreRecommend
    text-align left
    font-size 1.5rem
    border-top 5px solid #EFF3F6
    margin-top .5rem
    >h5
      border-bottom 1px solid #ddd
      padding .5rem .8rem
      background #FBFCFE
</style>
