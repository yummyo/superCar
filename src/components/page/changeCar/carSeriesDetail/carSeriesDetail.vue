<template>
  <div class="carSeriesDetail">
    <!-- 公共头部 -->
    <contentHeader :listdata='articleContent'></contentHeader>
    <div class="carSeriesTitle"  @click="toDO(3)">
      <img :src="detailImg" alt="">
      <span class="totalStyle">共{{ carData.imgSize }}张</span>
    </div>
    <div class="content">
       <div>
          <ul>
            <li class="redStyle">{{carData.minGuidePrice}}万起</li>
            <li class="Generation">指导价:{{ carData.minGuidePrice }}-{{ carData.maxGuidePrice }}万</li>
          </ul>
          <ul>
            <li class="typesStyle">级别:{{carData.seriesName || '中性轿车'}}</li>
            <li class="typesStyle">油耗:{{carData.minOilWear}}-{{carData.maxOilWear}}L</li>
          </ul>
       </div>
       <div class="btnList">
          <div class="book" @click="toDO(1)">预约试驾</div>
          <!-- <div class="book">置换</div> -->
          <div class="price" @click="toDO(2)">询底价</div>
       </div>
    </div>
    <div class="contentList">
        <ul>
          <li>降价</li>
          <li @click="toDO(7)">参配</li>
          <li @click="toDO(5)">点评</li>
          <li @click="toDO(6)">文章</li>
          <li @click="toDO(8)">经销商</li>
        </ul>
    </div>
    <div class="levelGroup">
      <!-- 待售 停售 -->
      <ul>
        <li :class="{levelGroup_li:true,active:nowChangeLi == index}"  v-for="(item,index) of carData.levelGroupList" :key="index" @click="levelGroupClick(item,index)">
          {{ setName(item.type) }}
        </li>
      </ul>
      <motorcycle-type v-if='carData.levelGroupList' :listData='nowChangeLiData'></motorcycle-type>
    </div>
    <div class="btn">
      <button @click="toDO(4)">我要点评</button>
    </div>
  </div>
</template>

<script> 
import contentHeader from '@/common/view/contentHeader';
import { getCarModelGroupListBySeries } from '@/api/changeCar/index'
import motorcycleType from './list/motorcycleType';
import { mapGetters } from 'vuex'
export default {
  data () {
    return{
      articleContent:{'content':this.$route.query.carSeriesName},
      carData: {},
      nowChangeLi:'0',
      nowChangeLiData:[]
    }
  },
  methods: {
    toDO(type){
      let _path = '',
          query = {
            brandCode : this.$route.query.brandCode,
            seriesCode : this.$route.query.seriesCode
          };
      switch(type){ 
        case 1:
          // 预约试驾
          _path = 'makeDriver'
        break;
        case 2:
          // 询底价
          _path = 'floorPrice'
        break;
        case 3:
          // 图片列表
          _path = 'modelPictures'
        break;
        case 4:
          // 车系评论
          _path = 'carSeriesComment'
        break;
        case 5:
          // 车系评论列表
          _path = 'carSeriesCommentList'
        break;
        case 6:
          // 资讯页面
          _path = 'carArticleList'
          query = {
            seriesName:this.$route.query.carSeriesName
          }
        break;
        case 7:
          // 参配页面
          _path = 'paramDeploy'
        break;
        case 8:
          // 经销商页面
          _path = 'dealer'
        break;
      }
      this.$router.push({
        path:_path,
        query
      })
    },
    setName(val){
      switch(val*1){
        case 1:
          return '在售'
        break;
        case 2:
          return '待售'
        break;
        case 3:
          return '停售'
        break;
      }
    },
    levelGroupClick(item,index){
      this.nowChangeLi = index
      this.nowChangeLiData = item['carYearGroupList']
    }
  },
  created(){
    getCarModelGroupListBySeries({
      data:{
        brandCode:this.$route.query.brandCode,
        seriesCode:this.$route.query.seriesCode
      }
    }).then(res => {
      console.log(res)
      this.carData = res.data
      this.nowChangeLi = '0'
      this.nowChangeLiData = res.data['levelGroupList'][0]['carYearGroupList']
    })
  },
  computed:{
    detailImg(){
      return  this.carDetailImg || this.carData.imgUrl || ''
    },
    ...mapGetters(['carDetailImg'])
  },
  components: {
    contentHeader,motorcycleType
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carSeriesDetail
    padding-bottom 3rem
  .carSeriesTitle
    position relative
    width 100%
    height 15rem
    img
      width 100%
      height 100%
    .totalStyle
      display inline-block
      padding .5rem 1rem
      background rgba(0,0,0,0.5)
      position absolute
      bottom 4px
      right 0
      color white 
      font-weight bold
  .content
    .btnList
      >div
        flex 1
        padding .5rem
    >div
      display flex
      justify-content space-between
      padding 0 1rem
      font-weight bold
      li
        padding .5rem 0
      .redStyle
        color red 
        text-align left
        font-size 1.2rem   
      .Generation
        color #949494
        font-size 1rem
      .typesStyle
        font-size 1.2rem
        color #656565
      .book
        border 2px solid #EFEFEF
        border-radius 5px
        color #1F71AD
        width 4rem
      .price
        border 2px solid #EFEFEF
        border-radius 5px
        color #fff
        background #FD9927
        width 4rem
 .contentList
    margin-top 1rem
    background #F8F8F8
    padding 1rem 0
    border-top 2px solid #EFEFEF
    ul
      display flex 
      justify-content space-between
      color #646464
      li
        width 20%
        border-left 2px solid #EFEFEF
      li:last-clild 
        border-right none
  .contentName
    text-align left
    font-size 1.8rem
    div:nth-child(1) 
      padding 1rem .8rem
      color #1F71AD
    div:nth-child(2)
      padding .5rem .5rem
      background #F8F8F8
      color #989898
  .levelGroup
    text-align left
    border 1px solid #ddd
    // 代售列表
    ul
      li
        padding .5rem 1rem
        display inline-block
        font-size 1.3rem
        color #ddd
        &.active
          color #000
  div.btn
    position fixed
    bottom 0
    left 0
    right 0
    height 2rem
    button
      width 90%
      height 100%
      border none
      background #FC9927
      color #fff
      border-radius 5px
</style>
