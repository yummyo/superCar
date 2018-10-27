<template>
  <!-- 文章列表 -->
  <div class="articleContent">
    <!-- 最新 -->
    <div v-if='tabType == 1'>
      <!-- 最新 -->
      <!-- 推荐轮播位置 -->
      <swipe :listdata='listData4'></swipe>
      <div v-for="item in 15" :key='item'>
          <!-- 文章 -->
          <listContent v-if='(item) % 4 != 0' :listdata='listData' @click.native="fun(listData.id)"></listContent>
          <!-- 专题 -->
          <listRankContent v-else  :listdata='listData2' :id="listData.id" @click.native="fun(listData.id)"></listRankContent>
          <!-- 广告 -->
          <listAdvert v-if='item % 4==0' :listdata='listData5' @click.native="fun(listData.id)"></listAdvert>
        </div>
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
  import {getListContent} from '@/api/articleList.js';
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'id':'1','content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData3 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData4 : [{'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        {'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        {'content':"上海大众飞腾 综合油耗仅仅1.2L",'href':"www.baidu.com",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
                    ],
        listData5 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'desc':'上车吧,老铁','images':"/static/index/playView.jpg"},
        listData6 : {'content':"文章正文"},
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
      fun : function(id){
        console.log('id:'+id)
        this.$router.push({
          name:"articleDetail",
          params:{
            id
          }
        })
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
