<template>
  <!-- 文章列表 -->
  <div class="articleDetail">
    <contentHeader :listdata='articleContent'></contentHeader>
    <!-- 评论列表 -->
    <div></div>
    <div class="descTitle">
      <div>{{content}}</div>
    </div>
    <!-- 下方评论部分 -->
    <publishComment ></publishComment>
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
        detail : "",
        content : ""
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
</style>
