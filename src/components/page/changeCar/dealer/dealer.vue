<template>
  <div>
    <div class="contentHeader" >
      <div class="desc">
          <div class="point textLeft" @click="returnTop()">
              <span class="iconfont icon-zuo"></span>
          </div>
          <div class="title">经销商</div>
          <div class="point">
            <span @click="gainCity()">{{this.provideCity}}</span>
          </div>
      </div>
    </div>
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
    <div class="dealerTitle">
        <mt-navbar v-model="selected">
          <mt-tab-item id="stores">4S店</mt-tab-item>
          <mt-tab-item id="composite">综合</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="stores">
            <div class="compositeStores">
              <div>sadasdasdasdasdas</div>
              <div>报价:<span>15.78万元</span></div>
              <div>sadasdasdasdasdas</div>
              <div class="flexStart">
                <div class="flexOne">13564665456</div>
                <div class="flexTwo">询底价</div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="composite">
           <div class="compositeStores">
              <div>sadasdasdasdasdas</div>
              <div>报价:<span>15.78万元</span></div>
              <div>sadasdasdasdasdas</div>
              <div class="flexStart">
                <div class="flexOne">13564665456</div>
                <div class="flexTwo">询底价</div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
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
      selected:'stores',
      provideJudge:true,
      cityJudge:false,
      provideCity:'地点不限',
      provideData:'',
      cityData:'',
      dealerData:''
    }
  },
  created() {
    
  },
  methods: {
    // 点击省份传值
    chooseCityHide(val,code){
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
      this.provideCity=val;
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
    },
    // 点击选择城市位置
    gainCity(){
      getFindAllProvince({data:{}}).then((res) => {
        this.provideData=res.data
      }).catch(res=>{
      });
      this.$refs.mychildTwo.modalShow();
       this.provideJudge=true;
    },
    returnTop(){
      this.$router.go(-1)
    }
  },
  components: {
    contentHeader,
    modal
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-navbar .mint-tab-item.is-selected
    border-bottom: 3px solid #E40112;
    color: #E40112;
    margin-bottom: -3px;
  .contentHeader
    width 100%
    border-bottom 1px solid #E5E5E5
    height 3rem
    .desc
      display flex
      justify-content space-between
      align-items center
      line-height 3rem
      height 100%
      .title
        font-size 1.5rem
        line-height 3
      .point
        padding .5rem .5rem
        text-align right
        width 6rem
        height 100%
        overflow hidden
      .textLeft
        text-align left
        padding 0 0.5rem
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
  .compositeStores
    text-align left 
    margin-top 1.5rem
    padding 0 1rem
    border-bottom 1px solid #ddd
    >div
      line-height 1.5rem
      span 
        color red
    .flexStart
      display flex
      justify-content flex-start
      margin 0.5rem 0
      .flexOne
        background #3B5997
        color #fff
        padding 0.5rem 0
        width 70%
        text-align center
      .flexTwo
        background #ED8A24
        color #fff
        padding 0.5rem 0
        width 30%
        text-align center
</style>


