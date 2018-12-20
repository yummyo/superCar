<template>
  <div>
    <contentHeader class="topTitle" :listdata="{'content':'询最底价'}"></contentHeader>
    <div class="subhead">向询最低价</div>
    <modal ref="mychildOne">
      <div class="carSeries" @click="chooseCarHide(item.carName,item.seriesCode,item.brandCode,item.id)" v-for="(item,index) in carData">
          {{item.carName}}
      </div>
    </modal>
    <modal ref="mychildTwo">
      <div class="carSeries" v-show="provideJudge">
          选择省份
      </div>
      <div class="carSeries" @click="chooseCityHide(item.name,item.code)" v-for="(item,index) of provideData" v-show="provideJudge">
          {{item.name}}
      </div>
      <div class="showCity" v-show="cityJudge">
        <div class="carSeries" @click="clickShow(item.name,item.code)" v-for="(item,index) in cityData">
            {{item.name}}
        </div>
      </div>
    </modal>
    <div class="loginIpunt">
      <div class="inputStyle">
        <div @click="chooseCarShow()">
          <span>选择车型</span><input type="text" v-model="floorPriceList.modelName" placeholder="选择车型>">
        </div>
        <div>
          <span>姓名</span><input type="text" v-model="floorPriceList.contactsName" placeholder="您的中文姓名">
        </div>
        <div>
          <span>电话</span><input type="text" v-model="floorPriceList.contactsPhone" placeholder="您的电话">
        </div>
        <div  @click="chooseCityShow()">
          <span>城市</span><input type="text" v-model="floorPriceList.contactsRegion" placeholder=">">
        </div>
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
import {getFindAllProvince,findCitysByRroId,getCarModelListBySeries,defaultAppList,postBuyCarIntention,appList} from '@/api/changeCar/index';
export default {
  data() {
    return {
      selected:'stores',
      floorPriceList:{
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
      dealerData:'',
      dealerOne:'',
      checkedList:'',
      loddingMore:'',
      pageZreo:0,
      pageOne:0,
      countZreo:5,
      countOne:5,
      cityCode:''
    }
  },
  created() {
    getFindAllProvince({data:{}}).then((res) => {
        this.provideData=res.data
      }).catch(res=>{
      });
      this.floorPriceList.modelName=this.route.query.carModelName;
      this.floorPriceList.contactsRegion=this.route.query.regionName;
      this.floorPriceList.modelId=this.route.query.carModelId;
      this.floorPriceList.declareId=this.route.query.id;
      this.floorPriceList.declareName=this.route.query.dealerName;
      this.floorPriceList.seriesCode=this.route.query.seriesCode;
  },
  methods: {
    chooseCarHide(modelName,seriesCode,brandCode,modelId){
      this.floorPriceList.modelName=modelName;
      this.floorPriceList.seriesCode=seriesCode;
      this.floorPriceList.brandCode=brandCode;
      this.floorPriceList.modelId=modelId;
      this.$refs.mychildOne.modalHide();
       // 查询经销商
      this.defaultSearch();
    },
    // 默认查询经销商方法
    defaultSearch(){
         defaultAppList({
          data:{
            carModelId: this.floorPriceList.modelId ? this.floorPriceList.modelId:null,
            cityId: this.cityCode ? this.cityCode:null
        }}).then((res) => {
          if(res.data[0]&&res.data[1]){
            this.dealerData=res.data[0].records
            this.dealerOne=res.data[1].records
          }else{
              
          }
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
      // brandCode: this.$route.query.brandCode,
      //     seriesCode: this.$route.query.seriesCode,
    },
    // 点击省份传值
    chooseCityHide(val,code){
      // 省名称
      this.provideCity=val;
      // 省份code
      findCitysByRroId({data:{proId:code}}).then((res)=>{
        this.cityData=res.data;
      })
      // 隐藏省份显示城市
      this.provideJudge=false;
      this.cityJudge=true;
    },
    // 点击城市的显示传值
    clickShow(val,code){
      this.floorPriceList.contactsRegion=this.provideCity+'-'+val;
      this.provideCity='';
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
      this.cityCode=code;
      // 判断车型有没有选择
      if(this.floorPriceList.modelId&&this.floorPriceList.modelId!=''){
          this.defaultSearch()
      }
    },
    chooseCityShow(){
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    },
    // 提交方法
    submit(){
      if(this.floorPriceList.modelName==''){
        this.$toast('请选择车型')
        return
      }
      if(this.floorPriceList.contactsName==''){
        this.$toast('请输入姓名')
        return
      }
      if(this.floorPriceList.contactsPhone==''){
        this.$toast('请输入电话')
        return
      }
      if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.floorPriceList.contactsPhone)) {
        this.$toast('手机格式不正确')
        return
      }
      if(this.floorPriceList.contactsRegion==''){
        this.$toast('请选择城市')
        return
      }
      postBuyCarIntention({data:this.floorPriceList}).
      then((res)=>{
        console.log(res)
        this.$toast('提交成功')
        this.$router.push({
            path:"/carSeriesDetail",
          })
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
    .carSeries
      font-size 1.1rem
      padding 0.3rem 0 0.3rem 0.3rem
      text-align left
      border-bottom 1px solid #ddd
    .subhead
      text-align center
      padding .8rem
      background #ddd
    .loginIpunt
      margin-bottom 2.5rem
      padding 0 1rem
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


