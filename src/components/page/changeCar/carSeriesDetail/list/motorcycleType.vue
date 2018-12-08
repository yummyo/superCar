<template>
  <div>
    <!-- 车型列表 -->
    <div v-for="(item,index) of listData" :key="index">
       <div class="contentName">
          <div>2018款</div>
          <div>2.0T涡轮增压184马力</div>
      </div>
      <div class="Parameter">
          <div class="itemList" v-for="(item,index) in 5" :key="index">
              <div>
                E200运动型
              </div>
              <div> 
                <ul>
                  <li class="typesStyle">九档自动变速箱(AT)</li>
                  <li class="typesStyle">油耗:6.8(L/100公里)</li>
                </ul>
                <ul>
                  <li class="redStyle">42.28万起</li>
                  <li class="guidePrice">指导价:42.24-63.25万</li>
                </ul>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    listData:{
      type:Array,
      default:()=>[]
    }
  },
  created(){
    console.log(this.listData)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .contentName
    text-align left
    font-size 1.8rem
    div:nth-child(1) 
      padding 1rem .8rem
      color #1F71AD
    div:nth-child(2)
      padding .5rem .5rem
      background #F8F8F8
      color #989898
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
