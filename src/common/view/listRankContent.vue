<template>
  <div class="list" >
      <div class="item">
          <h3 class="name">{{listdata.contentTitle}}</h3>
          <div class="icon">
            <img v-for='item in listdata.thumbnailResource'  :src="item['thumbnailUrl']" alt="">
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
    mounted:function(){
      console.log(this.listdata.thumbnailResource)
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
      img:nth-child(2)
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
