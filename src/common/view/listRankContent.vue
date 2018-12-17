<template>
  <div class="list" >
      <div class="item">
          <h3 class="name">{{listdata.contentTitle}}</h3>
          <div class="icon">
            <div v-if="listdata.thumbnailResource && listdata.thumbnailResource.length > 0" v-for='(item,index) of listdata.thumbnailResource' :key="index">
              <img :src="item['thumbnailUrl']" alt="">
            </div>
          </div>
          <p class="desc">{{listdata.describe}}</p>
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
    box-sizing border-box
    margin .5rem 1rem
    padding .5rem 0
    border-bottom 1px solid #E1E1E1
    .icon
      display flex
      div
        flex 1
        height 4.5rem
        border 1px solid #ddd
        img 
          width 100%
          height @width
      div:nth-child(2)
        margin:0 .2rem 
    .name
      text-align left
      color #474B4C
      padding-bottom 1rem
      font-weight 500
      color black 
    .desc
      text-align left
      color #B7B8BA
      line-height 3rem  
</style>
