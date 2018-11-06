<template>
  <!-- 文章列表 -->
  <div> 
  <div class="articleDetail" v-show="false">
    <contentHeader :listdata='articleContent'></contentHeader>
    <!-- 评论列表 -->
    <div></div>
    <div class="descTitle">
      <div>{{content}}</div>
    </div>
    <!-- 下方评论部分 -->
    <publishComment ></publishComment>
  </div>
  <div>
      <contentHeader :listdata='articleContent'></contentHeader>
    <div v-on:click="playVideo()" v-show="true">
      <video :src="videoSrc" controls id="videoPlay" v-show="true" class="video">您的浏览器不支持 video 视屏播放。</video> 
  </div>
  <!-- 下方评论部分 -->
  <publishComment ></publishComment>  
</div>
</div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
  import publishComment from '@/common/view/publishComment';
  import {getArticleDetail} from '@/api/articleList.js';
  export default {
    name: 'articleDetail',
    data () {
      return {
        articleContent:{'content':'文章正文'},
        articleContent:{'content':'视频列表'},
        detail : "",
        videoSrc: 'https://vdse.bdstatic.com//a819ba306b1d95d8d93e52c71d31635b?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F38bdd1bb8bfd3eaa5c633280bd1c4a6514812ea7224b7efa3ac20b5ab8eab126'
      }
    },
    created:function (){
      getArticleDetail({
        data:
          this.$route.params.data
        
      }).then((res)=>{
        console.log(res)
      })
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
      contentHeader,publishComment
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
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
  .video
    width 100%
</style>
