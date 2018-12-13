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
         tobarList:[
          {
            'name':'推荐',
            'key':'recommend'
          },
          {
            'name':'选车',
            'key':'changeCar'
          },
          {
            'name':'商城',
            'key':'market'
          },
          {
            'name':'我的',
            'key':'userCenter'
          },
        ],
        'pageShow' : window.localStorage.getItem('tobarList') || "recommend"
      }
    },
    watch:{
      $route(){
        let _path = this.$route.path
        this.changeTobar(_path)
      }
    },
    computed:{
      // ...mapGetters(['pageShow','tobarList']),
    },
    created(){
      this.changeTobar(this.$route.path)
    },
    methods:{
      changeTobar(_path){
        let toBarChange = 'recommend';
        if(_path.indexOf('changeCar') > -1){
          toBarChange = 'changeCar';
        }else if(_path.indexOf('market') > -1){
          toBarChange = 'market';
        }else if(_path.indexOf('userCenter') > -1){
          toBarChange = 'userCenter';
        }
        this.pageShow = toBarChange
        window.localStorage.setItem('tobarList',toBarChange)
      },
      changePageShow : function(data){
        // this.changePage(data);
        // this.pageShow = data;
        // window.localStorage.setItem('tobarList',data);
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
