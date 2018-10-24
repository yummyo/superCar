<template>
  <div class="list" >
      <div class="item">
          <div class="icon">
            <img :src="listdata.images" alt="">
          </div>
          <div class="paddingStyle">
            <h3 class="name">{{listdata.content}}</h3>
            <div class="desc">
                <div>{{listdata.comment}}</div>
                <div>{{listdata.desc}}</div>
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
  .icon img
    height 12rem
    width 100%
    border 2px solid #D3D3D3
  .paddingStyle
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
</style>
