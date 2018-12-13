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
    <transition name="carTran">
      <div class="carSeries" v-if="motorcycleTVisible">
          <car-series @close='hideMotorcycle' :nowChangeCar='nowChangeCar' :listData='listData' :loadingVisible='loadingVisible'></car-series>
      </div>
    </transition>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import Singer from '@/common/js/singer'
  import chooseCar from './chooseCar/chooseCar.vue';
  import carSeries from './carSeries';

  import {getHotBrand,getbrandGroup,getSeriesGroupByBrandCode} from '@/api/changeCar/index'
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
        listData:[],
        nowChangeCar:{},
        loadingVisible:false
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
        this.nowChangeCar = singer
        this.loadingVisible = true
        getSeriesGroupByBrandCode({
          data:{
            brandCode:singer.brandCode
          }
        }).then(res => {
          console.log(res)
          this.loadingVisible = false
          this.listData = res.data

        })
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components:{
      CommonSearch,
      chooseCar,
      carSeries
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
  // 车系列表
  .carSeries
    width 100%
    position fixed
    top 0 
    left 0 
    bottom 0
    z-index 1000
    transition all .5s 
  .carTran-enter
    left 100%
  .carTran-enter-to
    left 0
  .carTran-leave-to
    left 100%
</style>
