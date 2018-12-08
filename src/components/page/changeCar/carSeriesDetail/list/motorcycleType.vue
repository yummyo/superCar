<template>
  <div>
    <!-- 车型列表 -->
    <div class="dateList">
        <div  v-for="(item,index) of listData" :key="'year'+index" :class="{active: nowShow == index}" @click="dataClick(item,index)">{{item['year']}}款</div>
    </div>
    <div class="Parameter">
      <div class="itemList" v-for="(val,idx) of nowShowData" :key="idx">
          <div>
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
    >div
      display inline-block
      padding .5rem 1rem
      font-size 1.3rem
      &.active
        border-bottom 1px solid blue
  .Parameter
    background #F8F8F8
    text-align left
    color #949494
    font-size 1.1rem
    .itemList
        padding 0 0.8rem
        margin-bottom 2rem
        background #fff
        div
          display flex 
          justify-content space-between
          .redStyle
            color red
            text-align right
          .guidePrice
            text-align right
</style>
