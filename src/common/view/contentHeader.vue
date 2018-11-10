<template>
  <div> 
    <!-- 文章公共头部信息 可返回 -->
    <div class="contentHeader" >
      <div class="desc">
          <div class="point" @click="returnTop()">
              <span class="iconfont icon-zuo"></span>
          </div>
          <div class="title">{{listdata ? listdata.content : ""}}</div>
          <div class="point">
            <span class="iconfont icon-more"></span>
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
    created:function(){
      console.log(this.$route)
      console.log(this.$router)
    },
    // props:['listdata'],
    props:{
      listdata:{
        type:Object,
        default:function(){
          return {}
        }
      }
    },
    methods:{
      returnTop:function(){
        this.$router.go(-1);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .contentHeader
    width 100%
    border-bottom 1px solid #E5E5E5
    .desc
      display flex
      justify-content space-between
      align-items center
      line-height 2rem
      .title
        font-size 1.5rem
        line-height 2
      .point
        padding .5rem 1.5rem
        font-size 2rem
</style>
