<template>
    <div class="list" >
        <div class="item" v-if="listdata">
            <h3 class="comment-Title">{{listdata.contentTitle}}</h3>
            <div class="icon">
              <img v-lazy="listdata.thumbnailResource[0].thumbnailUrl" alt="">
            </div>
            <div class="paddingStyle">
              <div class="desc">
                  <div>{{analysisText(listdata.pushType)}}</div>
                  <!-- <div>广告</div> -->
              </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
    export default {
      data () {
        return {
        }
      },
      methods:{
        analysisText(type){
          switch(type){
            // 广告、图片、图集、视频
            case 1:
              return '广告'
            break;
            case 2:
              return '图片'
            break;
            case 3:
              return '图集'
            break;
            case 4:
              return '视频'
            break;
            default:
            return '广告'
          }
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
    .item
      padding 1rem
      .comment-Title
        font-weight 500
        color black 
        padding-bottom 1.1rem
      .icon img
        height 12rem
        width 100%
      .desc
        display flex
        text-align left
        justify-content flex-end
        color #B7B8BA
        div 
          border 1px solid #E1E1E1
          display inline-block
          padding 2px
          font-size .8rem
  </style>
  