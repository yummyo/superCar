<template>
  <div class="dealerAll">
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
        <div class="carSeries" @click="clickShow(item.name,item.code)" v-for="(item,index) in cityData">
            {{item.name}}
        </div>
      </div>
    </modal>
    <mt-navbar v-model="selected">
      <mt-tab-item id="stores">4S店</mt-tab-item>
      <mt-tab-item id="composite">综合</mt-tab-item>
    </mt-navbar>
    <div ref="wrapper" class="wrapperHeight">
      <div>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="stores">
            <div class="compositeStores" v-for="item of dealerOne">
              <div> {{item.dealerName}}</div>
              <div>报价:<span>{{item.minCarOffer}}万元</span></div>
              <div>{{item.companyDesc}}</div>
              <div class="flexStart">
                <div class="flexOne">{{item.salerTel}}</div>
                <div class="flexTwo" @click="clickRouter(item.id,item.dealerName,item.seriesCode,item.carModelId,item.regionName,item.carModelName)">询底价</div>
              </div>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="composite">
            <div class="compositeStores" v-for="item of dealerData">
              <div> {{item.dealerName}}</div>
              <div>报价:<span>{{item.minCarOffer}}万元</span></div>
              <div>{{item.companyDesc}}</div>
              <div class="flexStart">
                <div class="flexOne">{{item.salerTel}}</div>
                <div class="flexTwo" @click="clickRouter(item.id,item.dealerName,item.seriesCode,item.carModelId,item.regionName,item.carModelName)">询底价</div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
import modal from '@/common/view/modal';
import Bscroll from 'better-scroll'
import {getFindAllProvince,findCitysByRroId,getCarModelListBySeries,defaultAppList,postBuyCarPredrive,appList} from '@/api/changeCar/index';
export default {
  data() {
    return {
      selected:'stores',
      provideJudge:true,
      cityJudge:false,
      provideCity:'地点不限',
      provideData:'',
      cityData:'',
      dealerData:'',
      dealerOne:'',
      page:0,
      cityCode:'',
    }
  },
  created() {
     defaultAppList({
        data:{
          // carModelId: modelId,
      }}).then((res) => {
        if(res.data[0]&&res.data[1]){
          this.dealerData=res.data[0].records
          this.dealerOne=res.data[1].records
          this.toScroll();
        }else{
        }
      })
  },
  methods: {
    // 点击跳转到询底价页面
    clickRouter(id,dealerName,seriesCode,carModelId,regionName,carModelName){
        this.$router.push({
          path:"/dealerFloorPrice",
          query:{
              id:id,
              dealerName:dealerName,
              seriesCode:seriesCode,
              carModelId:carModelId,
              regionName:regionName,
              carModelName:carModelName
          }
        })
    },
    // 点击省份传值
    chooseCityHide(val,code){
      // 省份code
      findCitysByRroId({data:{proId:code}}).then((res)=>{
        this.cityData=res.data;
        console.log(this.cityData)
      })
      // 隐藏省份显示城市
      this.provideJudge=false;
      this.cityJudge=true;
    },
    // 点击城市的显示传值
    clickShow(val,code){
      this.provideCity=val;
      this.cityCode=code;
      this.cityJudge=false;
      this.$refs.mychildTwo.modalHide();
      this.cityData='';
      appList({data:{cityId:this.cityCode,shopType:this.selected=="composite"?1:0}}).then((res)=>{
        this.dealerData=res.data.records
      })
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
    },
    toScroll:function(){
        let that = this;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.wrapper, {
              probeType:1,
              click: true
            })
            this.scroll.on('touchEnd', (pos) => {
              // 下拉动作
              if (pos.y > 50) {
                console.log("下拉刷新")
              }
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                console.log("上拉加载更多")
                this.page+=1
                let data = {
                  "pageNo": this.page,
                  "pageSize": 15,
                  cityId:this.provideCity=='地点不限'?null:this.cityCode,
                  shopType:this.selected=="composite"?1:0,
                }
                appList({data}).then((res) => {
                  if(res.data.records && res.data.records.length > 0){
                    that.dealerData = that.dealerData.concat(res.data.records);
                    that.toScroll();
                  }else{
                    that.$toast({
                      message: '暂无新数据！',
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                });
              }
            })
          }else{
             this.scroll.refresh()
          }
        })
      },
  },
  components: {
    contentHeader,
    modal
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .dealerAll
    height calc(100% - 3rem)
    margin-top 3rem
  .mint-navbar
    background #fff
    position relative
    z-index 5
  .mint-navbar .mint-tab-item.is-selected
    border-bottom 3px solid #E40112
    color #E40112
    margin-bottom -3px
  .contentHeader
    width 100%
    border-bottom 1px solid #E5E5E5
    height 3rem
    position fixed
    top 0
    background #fff
    z-index 10
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
<style>
  .wrapperHeight{
    height:calc(100% - 46px) !important
  }
</style>


