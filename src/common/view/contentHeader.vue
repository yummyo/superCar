<template>
  <div> 
    <!-- 文章详情 -->
    <div class="contentHeader" >
      <div class="desc">
          <div class="point"></div>
          <div class="title">{{listdata.content}}</div>
          <div class="point">···</div>
      </div>
    </div>
    <div class="descTitle">
      <h2 class="name">欧拉品牌正式发布 3年内将要推出4款产品</h2>
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
            <div>tupiandizhi</div>
            <div>微信好友</div>
          </div>
          <div>
            <div>tupiandizhi</div>
            <div>朋友圈</div>
          </div>
          <div>
            <div>tupiandizhi</div>
            <div>微博</div>
          </div>
          <div>
            <div>tupiandizhi</div>
            <div>QQ好友</div>
          </div>
      </div>
    </div>
</div>
</template>

<script>
  // import '/static/index/articleContent.jpg';
  export default {
    data () {
      return {
      
      }
    },
    props:{
      listdata:{
        type:Object,
        default:function(){
          return {}
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .contentHeader
    padding 1rem
    border-bottom 1px solid #E5E5E5
    .desc
      display flex
      justify-content space-between
      line-height 2rem
      .title
        font-size 1.5rem
      .point
        font-size 2rem
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

</style>
