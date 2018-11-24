<template>
  
  <div class="page"> 
    <div class="articleDetail" v-if="pageType == 'article'">
      <contentHeader :listdata="{'content':'文章正文'}" :backFun="{'backFun':backFun}"></contentHeader>
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
          {{likeCount}}
        </span>
        </button>
    </div>
    <!-- 相关推荐 -->
    <div class="moreRecommend">
      <h5>相关推荐</h5>
      <div v-for="(item,index) of recommendData" :key="index" @click="toDetail(item,'article')">
          <listContent :listdata='item' ></listContent>
      </div>
    </div>
    <!-- 下方评论部分 -->
    <commentPublish :commentBrage='videoData.commentCount' :id='pageId' :pageType='pageType'></commentPublish>
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
        isLike:null,
        likeCount: 0,
        backFun: {}
      }
    },
    created:function (){
      this.pageInit();
      //  this.$toast({
      //   message: '提示',
      //   position: 'bottom',
      //   duration: 5000
      // });
    },
    watch: {
      $route:function(){
        this.pageInit();
      }
    },
    mounted:function(){
    },
    methods:{
      // 相关推荐点击
      toDetail(data){
        this.$router.push({
          name:"articleDetail",
          query:{
            id:data.id,
            pageType:'article'
          }
        })
      },
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
          // 暂时注释  禁止取消点赞
          // removeLike({
          //   data:{
          //     id: that.isLike['id']
          //   }
          // }).then(res => {
          //   that.isLike = null
          //   that.likeCount--
          // })
        }else{
          giveLike({
            data:{
              sourceId: this.$route.query.id,
              type: this.$route.query.pageType
            }
          }).then(res => {
            that.likeCount++
            that.isLike = {
              id: res.data
            }
          })
        }
      },
      pageInit(){
        // 页面初始化到顶部
        document.documentElement.scrollTop=0
        const that = this
        this.pageType = this.$route.query.pageType
        this.pageId = this.$route.query.id
        this.backFun = function(){
          that.$router.push({
            path:"/index/recommend",
          })
        }
        if(this.pageType == 'article'){
          // 获取文章详情
          getArticleDetail({
            data:{
              id : this.$route.query.id
            }
          }).then((res)=>{
            that.videoData = res.data
            that.likeCount  = res.data.likeCount
          })
          // 获取相关推荐
          similarArticles({
            data:{
              id : this.$route.query.id
            }
          }).then(res=>{
            that.recommendData = res.data.map(v => {
              v['contentTitle'] = v['title']
              let data = []
              // 缩略图格式重组
              if(v['thumbnailResource'] && v['thumbnailResource'].length >0){
                v['thumbnailResource'].map(vv=>{
                  data.push(Object.assign(vv,{'thumbnailUrl':vv['resourceImgUrl']}))
                })
              }
              v['thumbnailResource'] = data
              return v
            })
          })
        }else{
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
            type: this.$route.query.pageType
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
        color #C6C6C4
        padding 1rem 1rem 1rem 1.2rem
        border 2px solid #C6C6C4
        border-radius 50%
    video,img
      width 100%
      height 13rem
  .videoInfo
      padding 0 1rem
    .videoTitle
      font-size 1.2rem
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
