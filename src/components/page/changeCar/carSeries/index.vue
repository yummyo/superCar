<template>
  <div class="motorcycleType" @click.self="close">
      <div class="box">
        <div class="title">
            <img :src="nowChangeCar.offLogo" alt="">
            <span>{{nowChangeCar.brandName}}</span>
        </div>
        <!--车系列表  -->
        <Scroll
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
      </div>
  </div>
</template>

<script>
import Scroll from '@/common/scroll/scroll'
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
    }
  },
  data(){
    return {
      listenScroll: true
    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    select(data){
      this.$router.push({
        path:'/carSeriesDetail',
        query:{
          brandCode:data.brandCode,
          seriesCode:data.seriesCode,
        }
      })
    } 
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
