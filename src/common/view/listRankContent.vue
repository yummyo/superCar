<template>
  <div class="list" >
      <div class="item">
          <h3 class="name">{{listdata.content}}</h3>
          <div class="icon">
            <img  :src="listdata.images" alt="">
            <img  :src="listdata.images" alt="">
            <img  :src="listdata.images" alt="">
          </div>
          <p class="desc">{{listdata.comment}}</p>
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
    border-bottom 1px solid #E1E1E1
    .icon
      img
        width 32%
        height 4.5rem
    .name
      text-align left
      color #47484C
    .desc
      text-align left
      color #B7B8BA
</style>
