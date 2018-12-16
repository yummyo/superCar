<template>
  <div class="login">
    <contentHeader class="topTitle" :listdata="{'content':'预约试驾'}"></contentHeader>
    <modal ref="mychildOne">
      <div class="carSeries" @click="chooseCarHide(item.carName,item.seriesCode,item.brandCode,item.id)" v-for="(item,index) in carData">
          {{item.carName}}
      </div>
    </modal>
    <modal ref="mychildTwo">
      <div class="carSeries" v-show="provideJudge">
          选择省份
      </div>
      <div class="carSeries" @click="chooseCityHide(item.name,item.code)" v-for="(item,index) in provideData" v-show="provideJudge">
          {{item.name}}
      </div>
      <div class="showCity" v-show="cityJudge">
        <div class="carSeries" @click="clickShow(item.name)" v-for="(item,index) in cityData">
            {{item.name}}
        </div>
      </div>
    </modal>
    <div class="loginIpunt">
      <div class="inputStyle">
        <div @click="chooseCarShow()">
          <span>选择车型</span><input type="text" v-model="makeDriverList.modelName" placeholder="选择车型>">
        </div>
        <div>
          <span>姓名</span><input type="text" v-model="makeDriverList.contactsName" placeholder="您的中文姓名">
        </div>
        <div>
          <span>电话</span><input type="text" v-model="makeDriverList.contactsPhone" placeholder="您的电话">
        </div>
        <div  @click="chooseCityShow()">
          <span>城市</span><input type="text" v-model="makeDriverList.contactsRegion" placeholder=">">
        </div>
      </div>
      <div class="dealerTitle" v-if="dealerData.lenght>0">
        <div class="chooseDealer"><span>|</span>请选择经销商</div>
        <mt-navbar v-model="selected">
          <mt-tab-item id="stores">4S店</mt-tab-item>
          <mt-tab-item id="composite">综合</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="stores">
            <div class="compositeStores">
              <div v-for="item in dealerData">
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="composite">
           <div class="compositeStores">
              <div v-for="item in dealerData">
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div class="loginButton">
        <button @click="submit()">提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
import modal from '@/common/view/modal';
import {getFindAllProvince,findCitysByRroId,getCarModelListBySeries,getDealersBySeries,postBuyCarPredrive} from '@/api/changeCar/index';
export default {
  data() {
    return {
      makeDriverList:{
        modelName:'',
        contactsName:'',
        contactsPhone:'',
        contactsRegion:'',
        brandCode:'',
        seriesCode:'',
        modelId:'',
        declareId:'',
        declareName:'',
        contactsUserId:''
      },
      provideJudge:true,
      cityJudge:false,
      provideCity:'',
      provideData:'',
      cityData:'',
      carData:'',
      dealerData:''
    }
  },
  created() {
    getFindAllProvince({data:{}}).then((res) => {
        this.provideData=res.data
        console.log(this.provideData)
      }).catch(res=>{
        console.log(res)
      });
  },
  methods: {
    chooseCarHide(modelName,seriesCode,brandCode,modelId){
      this.makeDriverList.modelName=modelName;
      this.makeDriverList.seriesCode=seriesCode;
      this.makeDriverList.brandCode=brandCode;
      this.makeDriverList.modelId=modelId;
      this.makeDriverList.modelName=modelName;
      this.$refs.mychildOne.modalHide();
       // 查询经销商
      getDealersBySeries({
        data:{
          seriesCode: seriesCode,
      }}).then((res) => {
        this.dealerData=res.data
      })
    },
    chooseCarShow(){
      // 查询车系
      getCarModelListBySeries({
        data:{
          brandCode: 33,
          seriesCode: 3170,
      }}).then((res) => {
        this.carData=res.data
      })
      this.$refs.mychildOne.modalShow();
    },
    // 点击省份传值
    chooseCityHide(val,code){
      // 省名称
      this.provideCity=val;
      // 省份code
      findCitysByRroId({data:{proId:code}}).then((res)=>{
        console.log(res)
        this.cityData=res.data;
      })
      // 隐藏省份显示城市
      this.provideJudge=false;
      this.cityJudge=true;
    },
    // 点击城市的显示传值
    clickShow(val){
      this.makeDriverList.contactsRegion=this.provideCity+'-'+val;
      this.provideCity='';
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
    },
    chooseCityShow(){
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    },
     // 提交方法
    submit(){
      postBuyCarPredrive({data:this.makeDriverList}).
      then((res)=>{
        console.log(res)
        this.$toast('提交成功')
      })
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
      // height 10%
    .loginIpunt
      padding 0 1rem
      // display flex
      // flex-direction column
      // height 90%
      // justify-content: space-between;
      .dealerTitle
        text-align left
        .chooseDealer>span
          font-weight 1000
          font-size 1.2rem
          color #26a2ff
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
      .loginButton
        position fixed
        bottom 0
        left 0
        width 100%
      .loginButton>button
        width 95%
        background #3B5997
        height 2rem
        border-radius .3125rem
        color #ffffff
        font-size 1.2rem
        margin-bottom 0.5rem
        border-radius 1rem
        outline none 
        border none
</style>


