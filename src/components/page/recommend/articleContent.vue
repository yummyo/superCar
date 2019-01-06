<template>
  <!-- 文章列表 -->
  <div class="articleContent" ref='wrapper'>
    <div>
      <!-- <div class="scroll-top" >
        <div v-if="aspect==2">
            <p v-if="state==6">
                下拉刷新
            </p>
            <p v-if="state==1">
                <i><img :src="Load"/></i>
                <br/>
                刷新中
            </p>
            <p v-if="state==2">松开刷新</p>
            <p v-if="state==3">
                <i><img :src="Load"/></i>
                <br/>
                刷新完成
            </p>
        </div>
      </div> -->
        <!-- 最新 -->
      <div v-if='tabType == 1'>
        <!-- 最新 -->
        <!-- 推荐轮播位置 -->
        <swipe :listdata='swipeData'></swipe>
        <div v-for="(item,index) of articleData" :key='index'>
          <!-- 专题 -->
          <listRankContent v-if="item.contentSourceType == 2"  :listdata='item'  @click.native="toDetail(item.id,'article')"></listRankContent>
          <!-- 广告 -->
          <listAdvert v-else-if="item.contentSourceType == 3"  :listdata='item' @click.native="toAdvert(item)"></listAdvert>
          <!-- 文章 -->
          <listContent v-else-if='item.contentSourceType == 1' :listdata='item' @click.native="toDetail(item.id,'article')"></listContent>
        </div>
      </div>
      <div v-else-if='tabType == 2'>
        <!-- 视频 -->
        <div v-for="(item,index) in articleData" :key='index'>
          <listVideo :listdata='item' @click.native="toDetail(item.id,'video')"></listVideo>
        </div>
        <!-- <div v-for="item in 9" :key='item'>
            <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
            <listRankContent v-else  :listdata='listData2'></listRankContent>
          </div> -->
      </div>
      <div v-else-if='tabType == 3'>
        <!-- 上海 -->
        <div v-for="(item,index) of articleData" :key='index'>
            <listContent v-if='item.contentSourceType == 1' :listdata='item' @click.native="toDetail(item.id,'article')"></listContent>
            <listRankContent v-if="item.contentSourceType == 2"  :listdata='item' @click.native="toDetail(item.id,'article')"></listRankContent>
          </div>
      </div>
      <div v-else-if="tabType == 4">
        <!-- 评测 -->
        <div v-for="(item,index) of articleData" :key='index'>
          <listContent v-if='item.contentSourceType == 1' :listdata='item' @click.native="toDetail(item.id,'article')"></listContent>
          <listRankContent v-if="item.contentSourceType == 2"  :listdata='item' @click.native="toDetail(item.id,'article')"></listRankContent>
        </div>
      </div>
      <div v-else-if="tabType == 5">
        <!-- 导购 -->
        <div v-for="(item,index) of articleData" :key='index'>
          <!-- 专题 -->
          <listRankContent v-if="item.contentSourceType == 2"  :listdata='item'  @click.native="toDetail(item.id,'article')"></listRankContent>
          <!-- 广告 -->
          <listAdvert v-else-if="item.contentSourceType == 3"  :listdata='item' @click.native="toAdvert(item)"></listAdvert>
          <!-- 文章 -->
          <listContent v-else-if='item.contentSourceType == 1' :listdata='item' @click.native="toDetail(item.id,'article')"></listContent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import listContent from '@/common/view/listContent';
  import listRankContent from '@/common/view/listRankContent.vue';
  import listVideo from '@/common/view/listVideo.vue';
  import swipe from '@/common/view/swipe.vue';
  import listAdvert from '@/common/view/listAdvert.vue';
  import contentHeader from '@/common/view/contentHeader.vue';
  import {getIndexLunbo,getadvert,getVideoList,getArticleList,findCityArticle} from '@/api/recommend/index';
  import { mapGetters,mapMutations } from 'vuex'
  import Bscroll from 'better-scroll'
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"./static/index/view.jpg"},
        listData2 : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"./static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"./static/index/playView.jpg"},
        listData5 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"./static/index/playView.jpg"},
        listData6 : {'content':"文章正文"},
        // 轮播图data 
        swipeData : [],
        // 当前页面的数据格式 
        nowDataFormat : {
          advertising : 1,//广告
          articleSpecial : 1,//文章专题
          article : 3,//文章
        },
        // 文章部分总数据 包含 文章 广告 专题
        // videoData : [],
        articleData:[],
        // 当前的pageNo
        nowPageIndex : 1,
        // 当前需要被调用的函数
        nowFun : null,
        nowFunType : {},
        aspect : 2,
        state : 6,
        tabType: '',
        cityInfo: {
          adcode : '310107',
          city : '上海'
        }
      }
    },
    created:function(){
      if(this.$route.path.indexOf('recommend') > -1){
        this.tabType = this.$route.query.tabType || 1
        this.nowFun = getadvert
      }
    },
    watch:{
      $route(){
        if(this.$route.path.indexOf('recommend') > -1){
          this.tabType = this.$route.query.tabType || 1
        }
      },
      userSite(){
        if(this.userSite['province']){
          this.cityInfo = {
            adcode : this.userSite['adcode'],
            city : this.userSite['province']
          }
        }else{
          this.cityInfo = {
            adcode : '310107',
            city : '上海'
          }
        }
      },
      tabType:function(id){
        this.nowPageIndex = 1;
        let that = this;
        // 当tabType更新时重新调用接口查询数据
        switch (id*1) {
          case 1:
            // 文章列表
            this.nowFun = getadvert
            this.nowFunType = {'k':'titleType','v':"ALL"}
            // 轮播
            getIndexLunbo().then((res) => {
              that.swipeData = res['data'];
            });
            break;
          case 2:
            // 拿到视频列表
            this.nowFun = getVideoList
            break;
          case 3:
            // 拿到本地列表
            this.nowFun = findCityArticle
            this.nowFunType = {'k':'cityCode','v':this.cityInfo['adcode']}
            // this.nowFunType = {'k':'cityCode','v':'410100'}
            break;
          case 4:
            // 拿到评测
            this.nowFun = getadvert
            this.nowFunType = {'k':'titleType','v':"PC"}
            break;
          case 5:
            // 拿到导购
            this.nowFun = getadvert
            this.nowFunType = {'k':'titleType','v':"DG"}
            break;
          default:
            break;
        }
        this.nowFun({
          data:{
            "pageNo": 1,
            "pageSize": 15,
            "operatorType":'default',
            [this.nowFunType.k]: this.nowFunType.v
          }
        }).then((res) => {
          that.articleData = res['data'];
          that.toScroll();
        });
      }
    },
    computed:{
      ...mapGetters(['userSite'])
    },
    methods:{
      toDetail : function(data,type){
        // 进入文章喜爱那个IQ那个页面
        this.$router.push({
          name:"articleDetail",
          query:{
            id:data,
            pageType:type
          }
        })
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
                that.nowPageIndex = 1;
                let  data = {
                  "pageNo": 1,
                  "pageSize": 15,
                  "operatorType":"down",
                  [that.nowFunType.k] : that.nowFunType.v
                }
                if(that.tabType+"" == '1' || that.tabType == '3' || that.tabType == '4' || that.tabType == '5'){
                  // 如果页面是最新 增加时间字段
                  if(that.articleData[0]){
                    data['articleDateTime'] = that.articleData[0]['createTime'];
                  }
                  if(that.articleData[4]){
                    data['pushDateTime'] =  that.articleData[4]['createTime']
                  }
                }else if(that.tabType+"" == '2'){
                  // 如果页面是 视频
                  data['dateTime'] = that.articleData[0]['createTime']
                }
                that.nowFun({data}).then((res) => {
                  if(res['data'] && res['data'].length > 0){
                    that.articleData =res['data'].concat(that.articleData || [])
                    that.$toast({
                      message: '更新成功',
                      position: 'bottom',
                      duration: 2000
                    });
                  }else{
                    that.$toast({
                      message: '暂无新数据！',
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                  that.toScroll();
                });
              }
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                let data = {
                  "pageNo": that.nowPageIndex,
                  "pageSize": 15,
                  "operatorType":"up",
                  [that.nowFunType.k] : that.nowFunType.v
                }
                // bug!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if(that.tabType+"" == '1' || that.tabType == '3' || that.tabType == '4' || that.tabType == '5'){
                  // 如果页面是最新 增加时间字段
                  if(that.articleData[that.articleData.length-1]){
                    data['articleDateTime'] = that.articleData[that.articleData.length-1]['createTime'];
                  }
                  if(that.articleData[that.articleData.length-3]){
                    data['pushDateTime'] =  that.articleData[that.articleData.length-3]['createTime']
                  }
                }else if(that.tabType+"" == '2'){
                  // 如果页面是 视频
                  data['dateTime'] = that.articleData[that.articleData.length-1].createTime
                }
                that.nowFun({data}).then((res) => {
                  if(res.data && res.data.length > 0){
                    that.articleData = that.articleData.concat(res['data']);
                    that.nowPageIndex += 1;
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
      toAdvert:function(data){
        this.iframeData({iframeState:true,iframeSrc:data.contentUrl})
      },
       ...mapMutations({
          iframeData:'SET_IFRAMEDATA'
      })
    },
    components:{
      listContent,
      listRankContent,
      listVideo,
      swipe,
      listAdvert,
      contentHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .articleContent
    height calc(100% - 5rem)
    margin-top 5rem
</style>
