<template>
  <div>
    <!-- 车型列表 -->
    <div class="dateList">
        <div  v-for="(item,index) of listData" :key="'year'+index" :class="{active: nowShow == index}" @click="dataClick(item,index)">{{item['year']}}款</div>
    </div>
    <div class="Parameter">
      <div class="horsepower">2.0T涡轮增压184马力</div>
      <div class="itemList" v-for="(val,idx) of nowShowData" :key="idx">
          <div class="carSeriesName">
            {{ val['model']['carName'] }}
          </div>
          <div> 
            <ul>
              <li class="typesStyle">九档自动变速箱({{ val['model']['brandCode']}})</li>
              <li class="typesStyle">油耗:{{ val['model']['officalOilwear']}}(L/100公里)</li>
            </ul>
            <ul>
              <li class="redStyle">{{ val['model']['guidePrice'] }}万起</li>
              <li class="guidePrice">指导价:{{ val['model']['guidePrice'] }}万</li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      carData:{},
      nowShow: 0,
      nowShowData: []
    }
  },
  props:{
    listData:{
      type:Array,
      default:()=>[]
    }
  },
  created(){
    console.log('详情信息')
    console.log(this.listData)
    this.nowShowData = this.listData[0]['carModelInfoBOList']
    console.log(this.nowShowData)
  },
  watch:{
    listData(){
      this.nowShowData = this.listData[0]['carModelInfoBOList']
      this.nowShow = 0
      console.log(this.nowShow)
    }
  },
  methods:{
    dataClick(item,index){
      this.nowShowData = item['carModelInfoBOList']
      this.nowShow = index
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // 年份款型
  .dateList
    padding-bottom .5rem
    >div
      display inline-block
      padding .5rem 1rem
      font-size 1rem
      color #ddd
      &.active
        border-bottom 1px solid blue
        color #1f71ad
  .Parameter
    background #F8F8F8
    text-align left
    color #949494
    font-size 1.1rem
    .horsepower
      background #f8f8f8
      color #a3a2a2
      padding .3rem .8rem
    .itemList
        padding 0 0.8rem
        margin-bottom 1rem
        background #fff
        .carSeriesName
          color #000
          font-size 1.2rem
        div
          display flex 
          justify-content space-between
          .redStyle
            color red
            text-align right
          .guidePrice
            text-align right
        ul
          li
            font-size 1rem
            padding .3rem 0
</style>
