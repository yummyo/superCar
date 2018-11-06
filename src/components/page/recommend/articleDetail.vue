<template>
  <!-- 文章列表 -->
  <div> 
  <div class="articleDetail" v-show="false">
    <contentHeader :listdata='articleContent'></contentHeader>
    <div class="descTitle">
      <div>{{content}}</div>
      <!-- <h2 class="name">欧拉品牌正式发布 3年内将要推出4款产品</h2>
      <div class="desc">
          <div>孟子</div>
          <div>3小时前</div>
      </div>
      <h3>【欧拉品牌正式发布原创】</h3>
      <div class="articleContent">
        <h3>
          <span></span>
          作为新能源奥斯陆方尽快了手动阀撒打发斯了芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬
        </h3>
        <div>
          <img src="/static/index/articleContent.jpg" alt="">
        </div>
        <h3>
            <span></span>
            作为新能源奥斯陆方尽快了手动阀撒打发斯了芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬
        </h3>
        <div>
            <img  src="/static/index/articleContent.jpg" alt="">
        </div>
        <h3>
            <span></span>
            作为新能源奥斯陆方尽快了手动阀撒打发斯了芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬作为新能源奥斯陆方尽快了手动阀撒打发斯蒂芬
        </h3>
      </div>
      <div class="upload">
          <div>
            <div class="share">
              <img src="/static/index/weixin.png" alt="">
            </div>
            <div>微信好友</div>
          </div>
          <div>
            <div class="share">
              <img src="/static/index/pengyouquan.png" alt="">
            </div>
            <div>朋友圈</div>
          </div>
          <div>
            <div class="share">
              <img src="/static/index/weibo.png" alt="">
            </div>
            <div>微博</div>
          </div>
          <div>
            <div class="share">
              <img src="/static/index/qq.png" alt="">
            </div>
            <div>QQ好友</div>
          </div>
      </div> -->
    </div>
  </div>
  <div>
      <contentHeader :listdata='articleContent'></contentHeader>
    <div v-on:click="playVideo()" v-show="true">
      <video :src="videoSrc" controls id="videoPlay" v-show="true" class="video">您的浏览器不支持 video 视屏播放。</video> 
  </div>
</div>
</div>
</template>

<script>
  import contentHeader from '@/common/view/contentHeader';
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
        method:"GET",
        data:{
          id:'127130fed3574ca0b52632294d846ccb'
        }
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
      contentHeader
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
