<template>
    <div>
    
    </div>
</template>
  
  <script>
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
       
        
      }
    }
  </script>
  <style scoped lang="stylus" rel="stylesheet/stylus">
     
  </style>
  