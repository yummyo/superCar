<template>
  <!-- 文章列表 -->
  <div class="articleContent">
    <!-- 最新 -->
    <div v-if='tabType == 1'>
      <!-- 最新 -->
      <!-- 推荐轮播位置 -->
      <swipe :listdata='swipeData'></swipe>
<<<<<<< HEAD
<<<<<<< HEAD
      <div v-for="item in 15" :key='item'>
          <!-- 文章 -->
          <listContent v-if='(item) % 4 != 0' :listdata='listData' @click.native="fun(listData.id)"></listContent>
=======
      <div :v-for="(item,index) in articleData" :key='item'>
>>>>>>> df3035ea9fa2ff1f8b80801c61ef8d86a4d1ba45
          <!-- 专题 -->
          <listRankContent v-if="index % 4 == 0"  :listdata='item' :id="listData.id" @click.native="fun(listData.id)"></listRankContent>
          <!-- 广告 -->
          <listAdvert v-else-if="index % 5 == 0"  :listdata='item' @click.native="fun(listData.id)"></listAdvert>
          <!-- 文章 -->
          <listContent v-else :listdata='item' @click.native="fun(listData)"></listContent>
        </div>
=======
      <div v-for="(item,index) of articleData" :key='item'> -->
        <!-- 专题 -->
        <listRankContent v-if="index % 4 == 0"  :listdata='item' :id="listData.id" @click.native="fun(listData.id)"></listRankContent>
        <!-- 广告 -->
        <listAdvert v-else-if="index % 5 == 0"  :listdata='item' @click.native="fun(listData.id)"></listAdvert>
        <!-- 文章 -->
        <listContent v-else :listdata='item' @click.native="fun(listData)"></listContent>
      </div>
>>>>>>> d9fb35df1fa33f97c3d9d48cf5d0835e8f401ccd
    </div>
    <div v-else-if='tabType == 2'>
      <!-- 视频 -->
      <div v-for="item in 9" :key='item'>
        <listVideo :listdata='listData3'></listVideo> 
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
</template>

<script>
  import listContent from '@/common/view/listContent';
  import listRankContent from '@/common/view/listRankContent.vue';
  import listVideo from '@/common/view/listVideo.vue';
  import swipe from '@/common/view/swipe.vue';
  import listAdvert from '@/common/view/listAdvert.vue';
  import contentHeader from '@/common/view/contentHeader.vue';
  import {getIndexLunbo,getadvert,getArticleList,axiosAll} from '@/api/articleList.js';
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
<<<<<<< HEAD
        swipeData : [],
=======
>>>>>>> df3035ea9fa2ff1f8b80801c61ef8d86a4d1ba45
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
        articleData : []
      }
    },
    props:['tabType'],
    created:function (){
      var that=this;
<<<<<<< HEAD
      getIndexLunbo({"method":"get"}).then(function(data){
        console.log(data)
        that.swipeData=data.data
        console.log(that.swipeData)
=======
      // 获取轮播数据
      axiosAll([getadvert(//广告分页
        {'data':{
          "pageNo": 1,
          "pageSize": 20
        }}
      ),getArticleList( // 文章分页
        {'data':{
            "pageNo": 1,
            "pageSize": 20
          }}
      )]).then((res)=>{
        // 组合数据 将广告和文章列表数据通过制定格式组合
        console.log(res)
        that.regroupData(res[0],res[1]);
      });
      getIndexLunbo({"method":"get"}).then(function(data){
        that.swipeData=data.data
>>>>>>> df3035ea9fa2ff1f8b80801c61ef8d86a4d1ba45
      })
    },
    mounted:function(){
      console.log(this.tabType)
    },
    methods:{
      fun : function(data){
        console.log('id:'+id)
        this.$router.push({
          name:"articleDetail",
          params:{
            id
          }
        })
      },
      regroupData : function(advertising,article){
        //  advertising 广告数据 article 文章数据
        // 后期需要在维护 目前的次数与格式不稳定，基本都是写死的格式  
        let arr = [];
        if(article.length > 0 && advertising.length > 0){
          //重组数据 
          for (var a = 1;a <= 3;a++){
            arr.push(...(article.slice((a-1)*4,4*a)));
            arr.push(...advertising.slice((a-1),a))
          }
          articleData.push(...arr);
        }
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

</style>
