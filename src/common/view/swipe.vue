<template>
    <mt-swipe @change="handleChange" :auto="2000">
        <mt-swipe-item v-for="(item,index) in listdata" :key="index">
            <a :href="item.href">
                <img :src="item.contentUrl" class="img"/>
            </a>
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
  