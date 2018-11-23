<template>
    <div class="list" >
        <div class="item" v-if="listdata">
            <h3 class="name">{{listdata.contentTitle}}</h3>
            <div class="icon">
              <img v-lazy="listdata.thumbnailResource[0].thumbnailUrl" alt="">
            </div>
            <div class="paddingStyle">
              <div class="desc">
                  <div>{{listdata.describe}}</div>
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
      .icon img
        height 12rem
        width 100%
      .name
        text-align left
        color #474B4C
        margin 4px 0
      .desc
        display flex
        text-align left
        justify-content flex-end
        color #B7B8BA
        div 
          border 1px solid #E1E1E1
          display inline-block
          padding 2px
  </style>
  