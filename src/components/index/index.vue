<template>
  <div class="index">
    <!-- 主体部分 -->
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive" class="topContent"></router-view>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive" class="topContent"></router-view>
    <!-- 下方四个按钮 -->
    <foot class="foot"></foot>  
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import foot from '../foot/foot'
  export default {
    name: 'index',
    data () {
      return {
      }
    },
    computed:{
      ...mapGetters(['pageShow','tobarList'])
    },
    methods:{
      changePageShow : function(data){
        console.log(data)
        this.changePage(data);
      },
      ...mapMutations({
        changePage:'CHANGE_PAGESHOW'
      })
    },
    components:{
      foot
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .index
    height 100%
    .topContent
      height calc(100% - 55px)
      overflow scroll
      box-sizing border-box
    .foot
      position fixed
      bottom 0
      left 0
      right 0
      height 55px
</style>
