<template>
  <div class="commentAll">
    <contentHeader  :listdata="{'content':'发布点评'}"></contentHeader>

    <modal ref="mychild">
      <div class="changeCar">选择车型</div>
      <div class="carSeries" @click="changeCarHide">
        <input type="radio" />2018款黄金跑车
      </div>
    </modal>
    <transition 
    name="carTran">
      <div class="alertContent" v-show="buyCityList" @click.self="buyCityHide('1')">
          <div class="alertRight" v-show="buyProvince">
            <div class="carSeries" @click="buySite" v-for="(item,index) in listData">
                {{item.provide}}
            </div>
          </div>
          <div class="alertRight" v-show="buySiteShow">
            <div class="carSeries" @click="buyCityHide(item.provide)"  v-for="(item,index) in listData1">
                 {{item.provide}}
            </div>
          </div>
      </div>
    </transition>
    <mt-datetime-picker
    ref="picker"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    v-model="pickerValue"
     @confirm="handleConfirm">
  </mt-datetime-picker>
    <div class="inputStyle">
      <div @click="changeCarShow">
        <span>购买车型 ：</span><input type="text" v-model="carArrayList.buyCar" placeholder="选择车型>">
      </div>
      <div>
        <span>裸车价格 ：</span><input  type="text" v-model="carArrayList.emptyCar" ><span class="marginRight">万元</span>
      </div>
      <div>
        <span>行驶里程 ：</span><input  type="text" v-model="carArrayList.travlledDistance"><span class="marginRight">万公里</span>
      </div>
      <div @click="buyTime">
        <span>购买时间 ：</span><input type="text" v-model="carArrayList.buyTime" placeholder="请选择日期>">
      </div>
      <div @click="buyCityShow">
        <span>购买地点 ：</span><input type="text" v-model="carArrayList.buySite" placeholder="请选择城市>">
      </div>
      <div>
        <span>购买经销商 ：</span><input type="text" v-model="carArrayList.buyDealer" placeholder="请选择经销商>">
      </div>
      <div>
        <span>使用油耗 ：</span><input  type="text" v-model="carArrayList.useOil" ><span class="marginRight">L/百公里</span>
      </div>
      <div>
        <span>购车目的 ：</span><input type="text" v-model="carArrayList.buyPurpose" placeholder="请选择购车目的>">
      </div>
    </div>
    <div class="marginBottom">
      <div class="titleInfo">旧车信息</div>
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="titleInfo">给车评分和描述</div>
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
         <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
         <div>
              <star></star>
          </div>
      </div>
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*最满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div>
    </div>   
    <div class="issue">
      <button>发布点评</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
import star from '@/common/view/star';
import modal from '@/common/view/modal';
export default {
  data() {
    return {
      listData : [{provide:'山东'},{provide:'庐舍'},{provide:'黄色'},{provide:'搭理'},{provide:'江南'}],
      listData1 : [{provide:'山东1'},{provide:'庐舍2'},{provide:'黄色3'},{provide:'搭理4'},{provide:'江南5'}],
      buyCityList:false,
      buySiteShow:false,
      buyProvince:false,
      pickerValue:'',
      carArrayList:{
        buyCar: "",
        emptyCar: "",
        travlledDistance: "",
        buyTime: "",
        buySite: "",
        buyDealer: "",
        useOil: "",
        buyPurpose: "",
      },
    }
  },
  methods: {
    // 控制购买车型的显示隐藏
    changeCarShow(){
      // this.changeCarList=true;
      this.$refs.mychild.modalShow();
    },
    changeCarHide(){
       this.$refs.mychild.modalHide();
    },
    // 控制购买地点的显示隐藏
    buyCityHide(value){
      if(value==!1){
        this.carArrayList.buySite=value
      }
      this.buyCityList=false;
      this.buySiteShow=false;
    },
    buyCityShow(){
      this.buyCityList=true;
      this.buyProvince=true;
    },
    buySite(){
      this.buySiteShow=true;
      this.buyProvince=false;
    },
    // 打开时间的模态框
    buyTime(){
      this.$refs.picker.open();      
    },
    // 购买时间赋值
    handleConfirm(value){
      this.carArrayList.buyTime=new Date(value).format("yyyy-MM-dd")
    }
  },
  components: {
    contentHeader,
    star,
    modal
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carTran-enter
    left 100% !important
  .carTran-enter-to
    left 0 !important
  .commentAll
    height 100%
    .alertContent
      transition all .5s 
      position fixed
      bottom 0
      left 0
      top 0
      right 0 
      z-index 10
      background rgba(0,0,0,.3)
      width 100%
      &.carTran-leave-to 
        .alertRight
          right -100%
      .alertRight
        transition all .5s 
        position absolute
        bottom 0
        top 0
        right 0 
        width 80%
        background #fff
        .changeCar
          padding 2rem 0
          font-size 1.1rem
        .carSeries
          font-size 1.1rem
          padding 0.3rem 0 0.3rem 0.3rem
          text-align left
          border-bottom 1px solid #ddd
    .inputStyle>div
      border-bottom 2px solid #DDDDDD
      display flex
      justify-content space-between
      line-height 2rem
      height 2rem
      padding 0 0.5rem
      &:last-child 
        border-bottom none
      span 
        text-align left
      input 
        border none 
        outline none 
        text-align right 
        flex 1
    .issue
      text-align center
      position fixed
      bottom 0
      left 0
      width 100%
    .issue>button
      width 95%
      background #3B5997
      height 3rem
      border-radius .3125rem
      color #ffffff
      font-size 1.5rem
      outline none 
      border none
    .marginBottom
      margin-bottom 3rem
      .titleInfo
        text-align left
        padding 1rem 0.5rem
        font-size 1.2rem
        background #EDEEF0
      .infoList
        display flex
        justify-content space-between
        align-items center
        text-align left
        padding .5rem .5rem
        border-bottom 2px solid #DDDDDD
        &:last-child
          border-bottom none
</style>


