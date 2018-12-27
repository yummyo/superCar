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
        <div class="carSeries" @click="clickShow(item.name,item.code)" v-for="(item,index) in cityData">
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
      <div class="dealerTitle"  v-if="dealerData">
        <div class="chooseDealer"><span>|</span>请选择经销商</div>
        <mt-navbar v-model="selected">
          <mt-tab-item id="stores">4S店</mt-tab-item>
          <mt-tab-item id="composite">综合</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="stores">
            <div class="compositeStores" v-for="item of dealerOne" v-if="dealerOne.length>0">
              <div>
                <input v-model='checkedList' :value='item.id' type="checkbox">
              </div>
              <div class="companyName">
                  <div>
                    {{item.dealerName}}
                  </div>
                  <div class="color">
                    {{item.companyDesc}} 
                  </div>
              </div>
              <div class="colorRed">
                {{item.minCarOffer}}万
              </div>
            </div>
            <div v-if="dealerOne&&dealerOne.length==0">暂无经销商</div>
            <div class="lodding" @click="loddingData(1)" v-if="dealerOne.length>=countOne">点击加载更多</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="composite">
           <div class="compositeStores" v-for="item of dealerData">
              <div>
                <input v-model='checkedList' :value='item.id' type="checkbox">
              </div>
              <div class="companyName">
                  <div>
                    {{item.dealerName}}
                  </div>
                  <div class="color">
                    {{item.companyDesc}} 
                  </div>
              </div>
              <div class="colorRed">
                {{item.minCarOffer}}万
              </div>
            </div>
            <div v-if="dealerData&&dealerData.length==0">暂无经销商</div>
            <div class="lodding" @click="loddingData(0)" v-if="dealerData.length>=countZreo">点击加载更多</div>
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
import {getFindAllProvince,findCitysByRroId,getCarModelListBySeries,defaultAppList,postBuyCarPredrive,appList} from '@/api/changeCar/index';
export default {
  data() {
    return {
       selected:'stores',
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
      dealerData:'',
      dealerOne:'',
      checkedList:[],
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
        console.log(this.provideData)
      }).catch(res=>{
        console.log(res)
      });
  },
  methods: {
    
     // 加载分页数据方法
    loddingData(type){
      // 零为综合，1为4s店
      if(type==0){
        this.pageZreo+=1
        this.countZreo+=5
        appList({
          data:{
            pageNo:this.pageZreo,
            pageSize:5
        }}).then((res) => {
          if(res.data&&res.data.records.length>0){
            this.loddingMore=res.data.records
            this.dealerData=this.dealerData.concat(this.loddingMore)
          }else{
          }
        })
      }else{
        this.pageOne+=1
        this.countOne+=5
        appList({
          data:{
            pageNo:this.pageOne,
            pageSize:5
        }}).then((res) => {
          if(res.data&&res.data.records.length>0){
            this.loddingMore=res.data.records
            this.dealerOne=this.dealerOne.concat(this.loddingMore)
          }else{
          }
        })
      }
    },
    chooseCarHide(modelName,seriesCode,brandCode,modelId){
      this.makeDriverList.modelName=modelName;
      this.makeDriverList.seriesCode=seriesCode;
      this.makeDriverList.brandCode=brandCode;
      this.makeDriverList.modelId=modelId;
      this.$refs.mychildOne.modalHide();
       // 查询经销商
      this.defaultSearch();
    },
    // 默认查询经销商方法
    defaultSearch(){
         defaultAppList({
          data:{
            carModelId: this.makeDriverList.modelId ? this.makeDriverList.modelId:null,
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
    clickShow(val,code){
      this.makeDriverList.contactsRegion=this.provideCity+'-'+val;
      this.provideCity='';
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
      this.cityCode=code;
      // 判断车型有没有选择
      if(this.makeDriverList.modelId&&this.makeDriverList.modelId!=''){
          this.defaultSearch()
      }
    },
    chooseCityShow(){
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    },
     // 提交方法
    submit(){
      if(this.makeDriverList.modelName==''){
        this.$toast('请选择车型')
        return
      }
      if(this.makeDriverList.contactsName==''){
        this.$toast('请输入姓名')
        return
      }
      if(this.makeDriverList.contactsPhone==''){
        this.$toast('请输入电话')
        return
      }
      if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.makeDriverList.contactsPhone)) {
        this.$toast('手机格式不正确')
        return
      }
      if(this.makeDriverList.contactsRegion==''){
        this.$toast('请选择城市')
        return
      }
      // 保存经销商的名称和id
      let arrId=[],arrName=[];
      var that = this
      if(this.selected="stores"){
        this.checkedList.forEach(function(value,i){
            that.dealerOne.forEach(function(dataVal,dataIndex){
              if(value==dataVal.id){
                  arrId.push(dataVal.id)
                  arrName.push(dataVal.name)
                }
            })
        }) 
      }else{
        this.checkedList.forEach(function(value,i){
            that.dealerData.forEach(function(dataVal,dataIndex){
              if(value==dataVal.id){
                  arrId.push(dataVal.id)
                  arrName.push(dataVal.declareName)  
                }
            })
        }) 
      }
      this.makeDriverList.declareId=arrId.toString()
      this.makeDriverList.declareName=arrName.toString()
      postBuyCarPredrive({data:this.makeDriverList}).
      then((res)=>{
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
  .compositeStores
    display flex
    justify-content flex-start
    font-size .8rem
    align-items center
    margin-top 0.5rem
    .companyName
      display flex
      flex-direction column
      justify-content space-between
      flex 1
      .color  
        color #ddd
        font-size 0.5rem
    .colorRed
      color red
  .lodding
    margin 0.3rem 0
    text-align center
  .mint-navbar
    width 5rem
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
      margin-bottom 2.5rem
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


