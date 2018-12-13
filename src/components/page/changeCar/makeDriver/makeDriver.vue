<template>
  <div class="login">
    <contentHeader class="topTitle" :listdata="{'content':'预约试驾'}"></contentHeader>
    <modal ref="mychild">
      <div class="carSeries" @click="chooseCarHide(item.provide)" v-for="(item,index) in listData">
          {{item.provide}}
      </div>
    </modal>
    <div class="loginIpunt">
      <div class="inputStyle">
        <div @click="chooseCarShow()">
          <span>选择车型</span><input type="text" v-model="makeDriverList.chooseCar" placeholder="选择车型>">
        </div>
        <div>
          <span>姓名</span><input type="text" v-model="makeDriverList.name" placeholder="您的中文姓名">
        </div>
        <div>
          <span>电话</span><input type="text" v-model="makeDriverList.tel" placeholder="您的电话">
        </div>
        <div>
          <span>城市</span><input type="text" v-model="makeDriverList.city" placeholder=">">
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
      listData : [{provide:'山东'},{provide:'庐舍'},{provide:'黄色'},{provide:'搭理'},{provide:'江南'}],
      makeDriverList:{
        chooseCar:'',
        name:'',
        tel:'',
        city:''
      }
    }
  },
  methods: {
    chooseCarHide(val){
      console.log(val)
      this.$refs.mychild.modalHide();
    },
    chooseCarShow(){
      this.$refs.mychild.modalShow();
    }
  },
  components: {
    contentHeader,
    modal
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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


