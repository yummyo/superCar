<template>
  <div class="changeCar">
    <div class="topBg">
        <!-- 搜索框 -->
        <CommonSearch></CommonSearch>  
    </div>
    <div class="brand">
        <!-- <div class="brandTitle">品牌</div> -->
        <div class="singer" ref="singer">
          <chooseCar @select="selectSinger"  :data="singers" ref="list"></chooseCar>
        </div>
    </div>
    <div class="motorcycleType" v-if="motorcycleTVisible">
      <motorcycleType @close='hideMotorcycle' :listData='testData'></motorcycleType>
    </div>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import chooseCar from './chooseCar/chooseCar.vue';
  import motorcycleType from './motorcycleType';
  import Singer from '@/common/js/singer'
  import {getHotBrand,getbrandGroup} from '@/api/changeCar/index'
  import {axiosAll} from '@/api/articleList'
  import {mapMutations} from 'vuex'
  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门品牌'
  export default {
    name: 'changeCar',
    data () {
      return {
        singers:[],
        motorcycleTVisible:false,
        testData:{
          'item':{'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
          listData:[
            {'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
            {'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
            {'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
            {'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
            {'name':'奥迪','moneyScope':'7.5-8.6w','src':'//iconfont.alicdn.com/t/1534822793431.jpg@100h_100w.jpg'},
          ]
        }
      }
    },
    created() {
      // this._getSingerList();
      axiosAll([getHotBrand(),getbrandGroup()]).then(res => {
        let hot= {
          initials: HOT_NAME,
          brands: []
        }
        res[0].data.forEach((item, index) => {
         console.log(item)
            hot.brands.push({
              "brandName":item.brandName,
              "offLogo":item.offLogo
            })
        // console.log(res)
      })
      this.singers=[hot].concat(res[1].data)
      // this.singers = hot.concat.(list)

    })},
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      hideMotorcycle(){
        this.motorcycleTVisible = false
      },
      selectSinger(singer) {
        this.motorcycleTVisible = true
        console.log(singer)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components:{
      CommonSearch,
      chooseCar,
      motorcycleType
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .topBg
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
    background #3B5997
    height 3.2rem
  .brand
    margin-top 3.2rem
    /* .brandTitle
      height 2rem */
      /* padding .5rem 0 */
      /* border-bottom 1px solid #999999
      color #070103
      font-size 1.4rem */
    .singer
      position fixed
      top 3.2rem
      bottom 55px
      width 100%
  // 车型列表
  .motorcycleType
    position fixed
    top 0 
    right 0 
    left 0 
    bottom 0
    z-index 1000
</style>
