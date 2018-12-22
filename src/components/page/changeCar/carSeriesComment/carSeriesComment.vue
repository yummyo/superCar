<template>
  <div class="commentAll">
    <contentHeader  :listdata="{'content':'发布点评'}"></contentHeader>

    <modal ref="mychildOne">
      <div class="changeCar">选择车型</div>
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
    <modal ref="mychildThree">
      <div class="changeCar">选择经销商</div>
      <div class="carSeries" @click="chooseDealerHide(item.id,item.dealerName)" v-for="(item,index) in dealerData">
          {{item.dealerName}}
      </div>
      <div class="carSeries" @click="chooseDealerHide(id='',dealerName='')">其它</div>
    </modal>
    <modal ref="mychildFour">
      <div class="changeCar">购车目的  <span @click="buyGoalHide">完成</span></div>
      <div class="carSeries">
        <input type="checkbox" />2018款黄金跑车
      </div>
    </modal>
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
      <div @click="chooseCarShow">
        <span>购买车型 ：</span><input type="text" v-model="carArrayList.modelName" placeholder="选择车型>">
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
      <div @click="chooseCityShow()">
        <span>购买地点 ：</span><input type="text" v-model="carArrayList.contactsRegion" placeholder="请选择城市>">
      </div>
      <div @click="chooseDealerShow">
        <span>购买经销商 ：</span><input type="text" v-model="carArrayList.dealerName" placeholder="请选择经销商>">
      </div>
      <div>
        <span>使用油耗 ：</span><input  type="text" v-model="carArrayList.useOil" ><span class="marginRight">L/百公里</span>
      </div>
      <div @click="buyGoalShow">
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
            <div>*最不满意</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*其他补充</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="titleInfo">给车评分和描述</div>
      <div class="infoList">
          <div>
            <div>*空间(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*动力(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
         <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*操控(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
         <div>
              <star></star>
          </div>
      </div>
      <div class="infoList">
          <div>
            <div>*油耗(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*舒适性(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*外观(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*内饰(必选)</div>
            <div>用车过程有什么满意地方(30字以内)</div>
          </div>
          <div>
              <star></star>
          </div>
      </div> 
      <div class="infoList">
          <div>
            <div>*性价比(必选)</div>
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
import {getFindAllProvince,findCitysByRroId,getCarModelListBySeries,defaultAppList,postBuyCarIntention,appList} from '@/api/changeCar/index';
export default {
  data() {
    return {
      provideJudge:true,
      cityJudge:false,
      provideCity:'',
      provideData:'',
      cityData:'',
      carData:'',
      dealerData:'',
      pickerValue:'',
      cityCode:'',
      carArrayList:{
        modelName:'',
        modelId:'',
        brandCode:'',
        seriesCode:'',
        emptyCar: "",
        travlledDistance: "",
        buyTime: "",
        contactsRegion:'',
        dealerId: "",
        dealerName:'',
        useOil: "",
        buyPurpose: "",
      },
    }
  },
  created() {
    getFindAllProvince({data:{}}).then((res) => {
        this.provideData=res.data
      }).catch(res=>{
      });
  },
  methods: {
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
    chooseCarHide(modelName,seriesCode,brandCode,modelId){
      this.carArrayList.modelName=modelName;
      this.carArrayList.seriesCode=seriesCode;
      this.carArrayList.brandCode=brandCode;
      this.carArrayList.modelId=modelId;
      this.$refs.mychildOne.modalHide();
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
      this.carArrayList.contactsRegion=this.provideCity+'-'+val;
      this.provideCity='';
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
      this.cityCode=code;
    },
    chooseCityShow(){
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    },
    // 购买经销商
    chooseDealerHide(id,dealerName){
      // this.changeCarList=true;
      this.carArrayList.dealerName=dealerName
      this.carArrayList.dealerId=id
      this.$refs.mychildThree.modalHide();
    },
    chooseDealerShow(){
       if(this.carArrayList.modelName==''){
        this.$toast('请选择车型')
        return
      }
      if(this.carArrayList.contactsRegion==''){
        this.$toast('请选择城市')
        return
      }
      appList({data:{cityId:this.cityCode,carModelId:this.carArrayList.modelId}}).then((res)=>{
        this.dealerData=res.data.records;
      })
      this.$refs.mychildThree.modalShow();
    },
    // 购买目的
    buyGoalShow(){
      this.$refs.mychildFour.modalShow();
    },
    buyGoalHide(){
       this.$refs.mychildFour.modalHide();
    },
    // // 控制购买地点的显示隐藏
    // chooseProvideHide(value){
    //   this.provideJudge=false;
    //   this.cityJudge=true;
    // },
    // buyCityShow(){
    //   this.$refs.mychildOne.modalShow();
    //   this.provideJudge=true;
    // },
    // chooseCityHide(value){
    //   this.$refs.mychildOne.modalHide();
    //   this.cityJudge=false;
    //   this.carArrayList.buySite=value;
    // },
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
  // .carTran-enter
  //   left 100% !important
  // .carTran-enter-to
  //   left 0 !important
  // .commentAll
  //   height 100%
  //   .alertContent
  //     transition all .5s 
  //     position fixed
  //     bottom 0
  //     left 0
  //     top 0
  //     right 0 
  //     z-index 10
  //     background rgba(0,0,0,.3)
  //     width 100%
  //     &.carTran-leave-to 
  //       .alertRight
  //         right -100%
  //     .alertRight
  //       transition all .5s 
  //       position absolute
  //       bottom 0
  //       top 0
  //       right 0 
  //       width 80%
  //       background #fff
    .showCity
      transition all .5s 
      position absolute
      bottom 0
      top 0
      right 0 
      width 100%
      background #fff
    .changeCar
      padding 2rem 0
      font-size 1.1rem
      span
        float right
        font-size 0.5rem
        padding-right 0.5rem
        color rgb(34, 130, 232)
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


