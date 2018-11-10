<template>
    <mt-swipe @change="handleChange" :auto="2000">
      <!-- 轮播图 -->
        <mt-swipe-item v-if="listdata.length > 0" v-for="(item,index) in listdata" :key="index">
              <img v-if="item.thumbnailResource" v-lazy="item.thumbnailResource[0].thumbnailUrl" @click="swipeLink(item.thumbnailResource[0].thumbnailId,item.contentUrl)" class="img"/>
        </mt-swipe-item>
      </mt-swipe>
  </template>
  
  <script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import 'mint-ui/lib/style.css'
    export default {
      data () {
        return {
        
        }
      },
      created:function(){
        console.log("轮播",this.listdata)
      },
      props:{
        listdata:{
          type:Array,
          default:function(){
            return []
          }
        }
      },
      methods:{
        handleChange(index) {
    
        },
        swipeLink(id,url){
          var name = /^[www]+$/;
          if(name.test(url)){
            this.$router.push({
              name:"articleDetail",
              params:{
                id
              }
            })
          }else{
            window.location.href = url
          }
        }
      },
      components:{
        'mt-swipe': Swipe,
        'mt-swipe-item': SwipeItem
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
    img 
      width 100%
      height 13rem  
    .mint-swipe 
      height 13rem   
  </style>
  