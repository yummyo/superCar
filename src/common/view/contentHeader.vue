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
            <span class="iconfont icon-more" @click="share()"></span>
          </div>
      </div>
    </div>
    <div class="share" v-show="shareList" >
        <div>
            aaaa
        </div>
    </div>
</div>
</template>

<script>
  // import '/static/index/articleContent.jpg';
  export default {
    data () {
      return {
        shareList:false
      }
    },
    created:function(){
    },
    // props:['listdata'],
    props:{
      listdata:{
        type:Object,
        default:function(){
          return {}
        }
      },
      backFun:{
        type:Object,
        default:function(){
          let that = this
          return {
            'backFun' : function(){
              that.$router.go(-1)
            }
          }
        }
      }
    },
    methods:{
      returnTop:function(){
        this.backFun['backFun']()
      },
      share:function(){
        // this.shareList=true;
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
  .share
    position fixed
    bottom 0
    width 100%
    z-index 100
    background #fff
    transition height 2s 
    height 45%
</style>
