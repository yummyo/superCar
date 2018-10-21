<template>
  <div class="index">
    <router-view></router-view>
    <foot></foot>  
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
</style>
