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
      <div class="carSeries" @click="chooseDealerHide(id='',dealerName='其它')">其它</div>
    </modal>
    <modal ref="mychildFour">
      <div class="changeCar">购车目的  <span @click="buyGoalHide">完成</span></div>
      <div v-for="item in buyPurposeData">
        <label >
          <div class="carSeries">
            <span :class= "checkedList.indexOf(item.id)!=-1 ? 'classActive' : 'classNone' "></span>{{item.name}}
            <input class="displayNone" v-model='checkedList' :value='item.id' type="checkbox">
          </div>
        </label>
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
        <span>购买车型 ：</span><input type="text" ref='valid-modelName' title='请输入购买车型'  v-model="carArrayList.modelName" placeholder="选择车型>">
      </div>
      <div>
        <span>裸车价格 ：</span><input  type="text" ref='valid-price' title='请输入裸车价格' v-model="carArrayList.price" ><span class="marginRight">万元</span>
      </div>
      <div>
        <span>行驶里程 ：</span><input  type="text" ref='valid-mileage' title='请输入行驶里程' v-model="carArrayList.mileage"><span class="marginRight">万公里</span>
      </div>
      <div @click="buyTime">
        <span>购买时间 ：</span><input type="text" ref='valid-buyDate' title='请选择日期' v-model="carArrayList.buyDate" placeholder="请选择日期>">
      </div>
      <div @click="chooseCityShow()">
        <span>购买地点 ：</span><input type="text" ref='valid-buyAddress' title='请选择城市' v-model="carArrayList.buyAddress" placeholder="请选择城市>">
      </div>
      <div @click="chooseDealerShow">
        <span>购买经销商 ：</span><input type="text" ref='valid-buyDealer' title='请选择经销商' v-model="carArrayList.buyDealer" placeholder="请选择经销商>">
      </div>
      <div>
        <span>使用油耗 ：</span><input  type="text" ref='valid-useOil' title='请输入油耗' v-model="carArrayList.useOil" ><span class="marginRight">L/百公里</span>
      </div>
      <div @click="buyGoalShow">
        <span>购车目的 ：</span><input type="text" ref='valid-buyPurpose' title='请选择购车目的' v-model="carArrayList.buyPurpose"  placeholder="请选择购车目的>">
      </div>
    </div>
    <div class="marginBottom"  v-for="item of commentList">    
      <div class="titleInfo">{{item.title}}</div>
      <div class="infoList" v-for="comment of item.list">
          <div class="infoListOne">
            <div class="commentTitle">{{comment.commentTitle}}</div>
            <input class="commentInput"  :ref='"valid-"+comment.star.slice(0,-3)+"valid"' :title='"请输入"+comment.commentTitle+"内容"' v-model="carArrayList[comment.star.slice(0,-3)]" :placeholder="comment.commentInput" />
          </div>
          <div class="infoListTwo">
              <star @starMarkChange="markChange" 
                    :outIndex="comment.star" >
              </star>
              <input v-show='false' :ref='"valid-"+comment.star' :title='"请选择"+comment.commentTitle+"评分"' :value='carArrayList[comment.star]'>
          </div>
      </div> 
    </div>   
    <div class="issue">
      <button @click="submit()">发布点评</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
import star from '@/common/view/star';
import modal from '@/common/view/modal';
import {validForm,detectorLogin} from '@/common/js/utils.js';
import {postModelComment,getFindDics,getFindAllProvince,findCitysByRroId,getCarModelListBySeries,defaultAppList,postBuyCarIntention,appList} from '@/api/changeCar/index';
export default {
  data() {
    return {
      buyPurposeData:'',
      commentList:[
        {title:"旧车信息",list:[
           {commentTitle:"*最满意",commentInput:"用车过程有什么满意的地方(30字以内)",star:'satisfyNum'},
           {commentTitle:"*最不满意",commentInput:"用车过程有什么不满意的地方(30字以内)",star:'unsatisfyNum'},
           {commentTitle:"其他补充", commentInput:"其他补充",star:'otherNum'},
        ]},
        {title:"给车评分和描述",list:[
           {commentTitle:"*空间(必选)",commentInput:"后备箱空间怎么样",star:'spaceNum'},
           {commentTitle:"*动力(必选)",commentInput:"动力怎么样",star:'powerNum'},
           {commentTitle:"*操控(必选)",commentInput:"操控怎么样",star:'manipulationNum'},
           {commentTitle:"*油耗(必选)",commentInput:"油耗怎么样",star:'oliNum'},
           {commentTitle:"*舒适性(必选)",commentInput:"舒适性怎么样",star:'comfortableNum'},
           {commentTitle:"*外观(必选)",commentInput:"外观怎么样",star:'appearanceNum'},
           {commentTitle:"*内饰(必选)",commentInput:"内饰怎么样",star:'trimNum'},
           {commentTitle:"*性价比(必选)",commentInput:"性价比怎么样",star:'costPerformanceNum'},
        ]},
      ],
      provideJudge:true,
      cityJudge:false,
      provideCity:'',
      provideData:'',
      cityData:'',
      carData:'',
      dealerData:'',
      pickerValue:'',
      cityCode:'',
      checkedList:[],
      carArrayList:{
        satisfy:'',
        satisfyNum:'',
        unsatisfy:'',
        unsatisfyNum:'',
        other:'',
        otherNum:'',
        space:'',
        spaceNum:'',
        power:'',
        powerNum:'',
        manipulation:'',
        manipulationNum:'',
        oli:'',
        oliNum:'',
        comfortable:'',
        comfortableNum:'',
        appearance:'',
        appearanceNum:'',
        trim:'',
        trimNum:'',
        costPerformance:'',
        costPerformanceNum:'',
        modelName:'',
        modelId:'',
        brandCode:'',
        seriesCode:'',
        price: "",
        mileage: "",
        buyDate: "",
        buyAddress:'',
        dealerId: "",
        buyDealer:'',
        useOil: "",
        buyPurpose: "",
        createUserId:"",
      },
    }
  },
   watch:{
    //  判断多选最多为五个
    checkedList(){
      for(var i in this.checkedList){
        console.log(this.checkedList)
        if(i==5){
          this.checkedList.pop()
          this.$toast('最多选中五项')
        }
      }
    }
  },
  created() {
    getFindAllProvince({data:{}}).then((res) => {
        this.provideData=res.data
      }).catch(res=>{
      });
  },
  methods: {
    // 提交事件
    submit(){
     detectorLogin(this,function(){
        console.log(window.localStorage.getItem('userInfo')) 
      if(validForm(this)){
        postModelComment({data:this.carArrayList}).then((res) => {
          console.log(res)
        })
      }
     });    
    },
    // 点击星星触发事件
    markChange(code,key){
      this.carArrayList[key] = code
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
      this.carArrayList.buyAddress=this.provideCity+'-'+val;
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
      this.carArrayList.buyDealer=dealerName
      this.carArrayList.dealerId=id
      this.$refs.mychildThree.modalHide();
    },
    chooseDealerShow(){
       if(this.carArrayList.modelName==''){
        this.$toast('请选择车型')
        return
      }
      if(this.carArrayList.buyAddress==''){
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
      getFindDics({data:{groupCode:'buyPurpose'}}).then((res) => {
          this.buyPurposeData=res.data
      })
    },
    buyGoalHide(){
      let arr=[]
      var that = this
      this.checkedList.forEach(function(value,i){
          that.buyPurposeData.forEach(function(dataVal,dataIndex){
             if(value==dataVal.id){
                arr.push(dataVal.name)
              }
          })
      }) 
      console.log(arr) 

       this.carArrayList.buyPurpose=arr.toString()
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
      this.carArrayList.buyDate=new Date(value).format("yyyy-MM-dd")
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
    .displayNone
      display none
    .classActive
        border 1px solid #ddd
        width 1rem
        height 1rem 
        border-radius 50%
        background #5BB0F3
        display inline-block
        vertical-align text-bottom
    .classNone
      border 1px solid #ddd
      width 1rem
      height 1rem 
      border-radius 50%
      display inline-block
      vertical-align text-bottom
    .commentAll   
      margin-bottom 3rem
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
      // margin-bottom 3rem
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
        .infoListOne
          flex-grow 1 
          input 
            width 95%
            font-size 0.5rem
            border none
            outline none
              
</style>


