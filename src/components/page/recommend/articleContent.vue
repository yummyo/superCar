<template>
  <!-- 文章列表 -->
  <div class="articleContent">
    <div v-if='tabType == 1'>
      <!-- 3文章 1专题 -->
      <!-- 推荐轮播位置 -->
      <div v-for="item in 15" :key='item'>
          <listContent v-if='(item) % 4 != 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div>
    </div>
    <div v-else-if='tabType == 8'>
      <!-- 全文章 -->
      <div v-for="item in 9" :key='item'>
          <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div>
    </div>
    <div v-else-if='tabType == 3'>
      <!-- 带广告 -->
      <div v-for="item in 9" :key='item'>
          <listContent v-if='(item+1) % 3 == 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div>
    </div>
    <div v-else-if="tabType == 9">
      <!-- 视频列表 -->
      <swipe :listdata='listData4'></swipe>
      <div v-for="item in 9" :key='item'>
          <listVideo :listdata='listData3'></listVideo> 
      </div>
      <listAdvert :listdata='listData5'></listAdvert>
    </div>
  </div>
</template>

<script>
  import listContent from '@/common/view/listContent';
  import listRankContent from '@/common/view/listRankContent.vue';
  import listVideo from '@/common/view/listVideo.vue';
  import swipe from '@/common/view/swipe.vue';
  import listAdvert from '@/common/view/listAdvert.vue';
  import {getListContent} from '@/api/articleList.js';
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData4 : [{'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        {'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        {'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
                    ],
        listData5 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"}
      }
    },
    props:['tabType'],
    created:function (){
      getListContent().then(function(data){
        console.log(data)
      })
    },
    mounted:function(){
      console.log(this.tabType)
    },
    methods:{
    },
    components:{
      listContent,
      listRankContent,
      listVideo,
      swipe,
      listAdvert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
