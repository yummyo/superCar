<template>
  <div class="searchList">
    <div class="content">
      <div>
        <span class="iconfont icon-sousuo"></span>
        <input type="text" v-model="searchText" @keydown.enter="toSearchList" placeholder="搜车、搜人、搜内容">
      </div>
      <span class="close" @click="backFun">取消</span>
    </div>
    <div class="bottom_box">
      <div v-if="articleData.length == 0 && resultList.length == 0">
        <!--  热门搜索 -->
        <div class="hotSearch">
          <p class="infoTitle">热门搜索</p>
          <span v-for="(item,index) of hotSearch" :key="index">
            <span @click="toSearchList(null,item['name'])">{{ item['name'] }}</span>
          </span>
        </div>
        <!-- 历史记录 -->
        <div class="historySearch">
          <p class="infoTitle">历史记录</p>
          <ul>
            <li v-for="(item,index) of historySearchData" :key="index" @click="toSearchList(null,item['content'])">
              <span class="iconfont icon-history"></span>
              <p class="historyContent">{{ item['content'] }}</p>
              <span class="iconfont icon-fanhui"></span>
            </li>
          </ul>
          <p class="text-center" @click="deleteHistory">
            <span class="clearHistory">清除历史记录</span>
          </p>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div v-else-if='articleData.length > 0'>
        <search-list :listdata='articleData'></search-list>
      </div>
      <div v-else-if="resultList">
        <ul class="resultList">
          <li v-for="(item,index) of resultList" :key="index" class="text-left" @click="todetail(item)">
            <span>{{ item.seriesName }}</span>
            <span class="fl-right money">
              <span v-if="item.minDealerCarOffer">
                {{ item.minDealerCarOffer }}~{{ item.maxDealerCarOffer }}万
              </span>
              <span v-else>暂无</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import searchList from '@/common/view/searchList';
import { getBySeriesNameLike } from '@/api/changeCar/index';
import { getBySearchLike } from '@/api/recommend/index';
import { mapMutations,mapGetters } from 'vuex'
export default {
  data(){
    return {
      searchText:'',
      pageNo:1,
      pageSize:10,
      hotSearch:[
        {'name':'骐达'},
        {'name':'迈腾'},
        {'name':'冠道'},
        {'name':'本田'},
      ],
      articleData:[],
      resultList:[],
      timer: null,
      isEnter: 0
    }
  },
  components:{
    searchList
  },
  computed:{
    ...mapGetters(['historySearchData'])
  },
  methods: {
    setStorage(val){
      // 设置搜索记录
      let history = JSON.parse(JSON.stringify(this.historySearchData))
      if(history.length > 10){
        history.pop(val)
      }
      history.unshift({
        content:val
      })
      window.localStorage.setItem("historySearchData",JSON.stringify(history))
      this.setHistory(history)
    },
    deleteHistory(){
      this.setHistory([])
    },
    backFun(){
      this.$router.go(-1)
    },
    toSearchList(e,key){
      this.isEnter = 1
      this.searchText = key
      this.setStorage(key)
      getBySearchLike({
        data:{
          "groupName": "",
          "name": key || '',
          "pageNo": this.pageNo,
          "pageSize": this.pageSize
        }
      }).then(res => {
        this.isEnter = 0
        this.articleData = res.articleSearchVOList || []
        this.resultList = []
      })
    },
    todetail(data){
      this.setImg(data.seriesLogo)
      this.$router.push({
        path:'/carSeriesDetail',
        query:{
          brandCode:data.brandCode,
          seriesCode:data.seriesCode,
          carSeriesName:data.seriesName,
        }
      })
    },
    ...mapMutations({
      'setImg':'SET_DETAILIMG',
      'setHistory':'SET_HISTORY',
    })
  },
  watch:{
    searchText(val){
      if(this.isEnter == 0){
        if(val == ''){
          this.articleData = []
          this.resultList = []
        }else{
          clearTimeout(this.timer)
          this.timer = setTimeout(()=>{
            getBySeriesNameLike({
              data:{
                "seriesName": this.searchText,
              }
            }).then(res => {
                this.resultList = res.data || []
                this.articleData = []
            })
          },500)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  // 提示字体
  .infoTitle
    font-size .8rem
    color #ddd
    text-align left
  .searchList
    // font-size 0
    height 100%
    .content
      height 3rem
      background #fff
      border-radius 5px
      display flex
      align-items center
      padding .5rem 1rem
      >div
        flex-grow 1
        background #efebeb
        display flex
        justify-content center
        align-items center
        .icon-sousuo
          padding 0 .5rem
        input
          text-align left
          padding .5rem .3rem
          box-sizing border-box
          background #efebeb
          flex-grow 1
          &:focus
            outline none
      input,span
        display inline-block
        border none
        font-size 1rem
      .close
        padding 0 1rem
  .bottom_box
    padding 0 1rem
    height calc(100% - 4rem)
    box-sizing border-box
    .hotSearch
      text-align left 
      >span
        min-width 20%
        display inline-block  
        text-align center
        padding 0 .5rem
        span 
          background #ddd
          display block
          padding .3rem 0
    .historySearch
      margin-top 1rem
      text-align left
      ul
        li
          display flex
          justify-content center
          align-items center
          line-height 2rem
          border-bottom 1px solid #ddd
          .historyContent
            flex-grow 1
            padding .5rem
      .clearHistory
        color #ddd
    .resultList
      li
        line-height 3rem
        span.money
          color red
      li+li
        border-top 1px solid #ddd
</style>  

