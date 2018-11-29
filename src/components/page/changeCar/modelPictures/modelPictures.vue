<template>
    <div>
        <contentHeader :listdata="{'content':'车型图片'}"></contentHeader>
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">外观</mt-tab-item>
          <mt-tab-item id="2">中控</mt-tab-item>
          <mt-tab-item id="3">细节</mt-tab-item>
          <mt-tab-item id="4">座椅</mt-tab-item>
          <mt-tab-item id="5">其他</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
          1
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            2
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
           3
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
           4
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
           5
          </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
  
  <script>
    import contentHeader from '@/common/view/contentHeader';
    export default {
      data () {
        return {
          selected:'1'  
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
       
        
      },
      components:{
        contentHeader
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
     
  </style>
  