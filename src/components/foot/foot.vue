<template>
  <div class="foot">
    <!-- 底部导航 -->
    <mt-tabbar :value="pageShow" @input="changePageShow($event)">
      <mt-tab-item v-for="item in tobarList" :key="item.key" :id="item.key" >
        <img slot="icon" v-show="pageShow==item.key" :src="'/static/index/'+item.key+'_active.png'">
        <img slot="icon" v-show="!(pageShow==item.key)" :src="'/static/index/'+item.key+'.png'">
        {{item.name}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: 'foot',
    data () {
      return {
      }
    },
    computed:{
      ...mapGetters(['pageShow','tobarList'])
    },
    methods:{
      changePageShow : function(data){
        this.changePage(data);
        this.$router.push({path:"/index/"+data})
      },
      ...mapMutations({
        changePage:'CHANGE_PAGESHOW'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .test
    background-color:red
    height:3rem
</style>
