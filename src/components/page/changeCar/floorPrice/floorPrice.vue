<template>
  <div class="login">
    <contentHeader class="topTitle" :listdata="{'content':'询底价'}"></contentHeader>
    <modal ref="mychildOne">
      <div class="carSeries" @click="chooseCarHide(item.provide)" v-for="(item,index) in listData">
          {{item.provide}}
      </div>
    </modal>
    <modal ref="mychildTwo">
      <div class="carSeries" v-show="provideJudge">
          选择省份
      </div>
      <div class="carSeries" @click="chooseCityHide(item.provide)" v-for="(item,index) in listData" v-show="provideJudge">
          {{item.provide}}
      </div>
      <div class="showCity" v-show="cityJudge">
        <div class="carSeries" @click="clickShow(item.provide)" v-for="(item,index) in listData1">
            {{item.provide}}
        </div>
      </div>
    </modal>
    <div class="loginIpunt">
      <div class="inputStyle">
        <div @click="chooseCarShow()">
          <span>选择车型</span><input type="text" v-model="floorPriceList.chooseCar" placeholder="选择车型>">
        </div>
        <div>
          <span>姓名</span><input type="text" v-model="floorPriceList.name" placeholder="您的中文姓名">
        </div>
        <div>
          <span>电话</span><input type="text" v-model="floorPriceList.tel" placeholder="您的电话">
        </div>
        <div  @click="chooseCityShow()">
          <span>城市</span><input type="text" v-model="floorPriceList.city" placeholder=">">
        </div>
      </div>
      <div class="loginButton">
        <button>提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
import modal from '@/common/view/modal';
export default {
  data() {
    return {
      listData : [{provide:'兰博基尼'},{provide:'凯迪拉克'},{provide:'英菲尼迪'},{provide:'雷克萨斯'},{provide:'劳斯莱斯'}],
      listData1 : [{provide:'兰博基尼1'},{provide:'凯迪拉克1'},{provide:'英菲尼迪1'},{provide:'雷克萨斯'},{provide:'劳斯莱斯'}],
      floorPriceList:{
        chooseCar:'',
        name:'',
        tel:'',
        city:''
      },
      provideJudge:true,
      cityJudge:false,
      provideCity:'',
    }
  },
  methods: {
    chooseCarHide(val){
      this.floorPriceList.chooseCar=val;
      this.$refs.mychildOne.modalHide();
    },
    chooseCarShow(){
      this.$refs.mychildOne.modalShow();
    },
    // 点击省份传值
    chooseCityHide(val){
      this.provideCity=val;
      // 隐藏省份显示城市
      this.provideJudge=false;
      this.cityJudge=true;
    },
    // 点击城市的显示传值
    clickShow(val){
      this.floorPriceList.city=this.provideCity+'-'+val;
      this.provideCity=''
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
    },
    chooseCityShow(){
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    }
  },
  components: {
    contentHeader,
    modal
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .showCity
      transition all .5s 
      position absolute
      bottom 0
      top 0
      right 0 
      width 100%
      background #fff
  .login
    height 100%
    .carSeries
      font-size 1.1rem
      padding 0.3rem 0 0.3rem 0.3rem
      text-align left
      border-bottom 1px solid #ddd
    .topTitle
      height 10%
    .loginIpunt
      padding 0 1rem
      display flex
      flex-direction column
      height 90%
      justify-content: space-between;
      .inputStyle>div
        border-bottom 2px solid #DDDDDD
        display flex
        justify-content space-between
        line-height 3rem
        height 3rem
        input 
          border none 
          outline none 
          text-align right 
      // div>input 
      //   width 100%
      //   height 3rem
      //   border none
      //   border-bottom 2px solid #DDDDDD
      //   outline none
      //   font-size 1.2rem
      .loginButton>button
        width 95%
        background #3B5997
        height 3rem
        border-radius .3125rem
        color #ffffff
        font-size 1.5rem
        margin-bottom 2rem
        outline none 
        border none
</style>


