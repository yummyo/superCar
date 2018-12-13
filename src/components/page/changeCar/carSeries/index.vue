<template>
  <div class="motorcycleType" @click.self="close">
      <div class="box">
        <div class="title">
            <img :src="nowChangeCar.offLogo" alt="">
            <span>{{nowChangeCar.brandName}}</span>
        </div>
        <!--车系列表  -->
        <Scroll
          v-if="listData.length > 0"
          :data='listData'
          :listen-scroll="listenScroll"
          :click='true'
          class="listview"
          ref="listview">
          <div class="list">
            <div class="" v-for="(item,index) of listData" :key="index">
              <div class="itemTitle">{{ item.makeName }}</div>
              <div v-if="item.seriesList.length > 0" class="item" v-for="(vv,ii) of item.seriesList" @click="select(vv)" :key="ii">
                <div class="Logo">
                  <img :src="vv.seriesLogo" alt="">
                </div>
                <div class="carInfo">
                  <div>{{vv.seriesName}}</div>
                  <div>{{vv.maxDealerCarOffer || 0}}~{{vv.minDealerCarOffer || 0}}万</div>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
        <div v-else> 
          暂无数据
        </div>
        <div class="loading-container" v-if="loadingVisible"> 
          <Loading></Loading>
        </div>
      </div>
  </div>
</template>

<script>
import Scroll from '@/common/scroll/scroll'
import Loading from '@/common/loading/loading'
import {getHotBrand,getbrandGroup,getSeriesGroupByBrandCode} from '@/api/changeCar/index'
export default {
  name:'motorcycleType',
  props:{
    listData:{
      type:Array,
      default:()=>[]
    },
    nowChangeCar:{
      type:Object,
      default:()=>{}
    },
    loadingVisible:{
      default:false
    }
  },
  data(){
    return {
      listenScroll: true,
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    select(data){
      console.log(data)
      this.$router.push({
        path:'/carSeriesDetail',
        query:{
          brandCode:data.brandCode,
          seriesCode:data.seriesCode,
          carSeriesName:data.seriesName,
        }
      })
    } 
  },
  components: {
    Scroll,Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
  .motorcycleType
    height 100%
  .listview
    height (100% - 4rem)
    overflow hidden
  .box
    float right
    width 80%
    background #fff
    height 100%
    .title
      display flex
      align-items center
      img 
        width 3rem
        height @width
        padding .5rem
        border-radius 50%
    .list
      .itemTitle
        background #EDF1F4
        text-align left
      .item
        display flex
        align-items center
        .Logo
          width 6rem
          height 4rem
          padding .5rem
          img 
            width 100%
            height 100%
            border 1px solid #ddd
        .carInfo
          display flex
          flex-grow 1
          height 100%
          flex-direction column
          div
            text-align left 
</style>
