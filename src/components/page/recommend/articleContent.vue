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
        <div v-for="item in 9" :key='item'>
            <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
            <listRankContent v-else  :listdata='listData2'></listRankContent>
          </div>
      </div>
      <div v-else-if="tabType == 4">
        <!-- 测试 -->
        <contentHeader :listdata='listData6'></contentHeader> 
        <swipe :listdata='listData4'></swipe>
      </div>
      <div v-else-if="tabType == 5">
        <!-- 导购 -->
        <contentHeader :listdata='listData6'></contentHeader> 
        <swipe :listdata='listData4'></swipe>
        <div v-for="item in 9" :key='item'>
            <listVideo :listdata='listData3'></listVideo>   
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
  import {getIndexLunbo,getadvert,getVideoList,getArticleList} from '@/api/recommend/index';
  import Bscroll from 'better-scroll'
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData5 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
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
        state : 6
      }
    },
    props:['tabType'],
    created:function(){
      this.nowFun = getadvert
      // 文章列表
      this.nowFun({
        data:{
          "pageNo": this.nowPageIndex,
          "pageSize": 15
        }
      }).then((res) => {
        this.articleData = res['data'];
      });
      // 轮播列表
      getIndexLunbo().then((res) => {
        this.swipeData = res['data'];
      });
    },
    watch:{
      tabType:function(id){
        this.nowPageIndex = 1;
        let that = this;
        // 当tabType更新时重新调用接口查询数据
        switch (id*1) {
          case 1:
            // 文章列表
            this.nowFun = getadvert
            this.nowFunType = {'key':'titleType','value':"ALL"}
            // 轮播
            getIndexLunbo().then((res) => {
              that.swipeData = res['data'];
            });
            break;
          case 2:
            // 拿到视频列表
            this.nowFun = getVideoList
            this.nowFunType = {'key':'titleType','value':"ALL"}
            break;
          case 3:
            // 拿到本地列表
            this.nowFun = getVideoList
            this.nowFunType = {'key':'cityCode','value':"1"}
            break;
          default:
            break;
        }
        this.nowFun({
          data:{
            "pageNo": this.nowPageIndex,
            "pageSize": 15,
          }
        }).then((res) => {
          console.log(res)
          that.articleData = res['data'];
          console.log( that.articleData)
          that.toScroll();
        });
      }
    },
    mounted:function(){
      console.log(this.tabType)
    },
    methods:{
      toDetail : function(data,type){
        // 进入文章喜爱那个IQ那个页面
        this.$router.push({
          name:"articleDetail",
          params:{
            id:data,
            type:type
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
                console.log(that.nowPageIndex)
                 that.nowFun({
                  data:{
                    "pageNo": this.nowPageIndex,
                    "pageSize": 15
                  }
                }).then((res) => {
                  that.articleData = res['data'];
                  that.toScroll();
                });
              }
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                console.log("上拉加载更多")
                that.nowFun({
                  data:{
                    "pageNo": this.nowPageIndex,
                    "pageSize": 15
                  }
                }).then((res) => {
                  if(res.data.length > 0){
                    that.articleData = that.articleData.concat(res['data']);
                    that.nowPageIndex += 1;
                    that.toScroll();
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
        window.location.href = data.contentUrl
      }
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
