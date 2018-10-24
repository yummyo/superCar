<template>
  <!-- 文章列表 -->
  <div class="articleContent">
    <div v-if='tabType == 9'>
      <!-- 3文章 1专题 -->
      <!-- 推荐轮播位置 -->
      <div v-for="item in 15" :key='item'>
          <listContent v-if='(item) % 4 != 0' :listdata='listData'></listContent>
          <listRankContent v-else  :listdata='listData2'></listRankContent>
        </div>
    </div>
    <div v-else-if='tabType == 2'>
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
  </div>
</template>

<script>
  import listContent from '@/common/view/listContent';
  import listRankContent from '@/common/view/listRankContent.vue';
  export default {
    name: 'articleContent',
    data () {
      return {
        listData : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        listData2 : {'content':"上海大众飞腾 综合油耗仅仅1.2L",'comment':"156条评论",'images':"/static/index/view.jpg"},
        
      }
    },
    props:['tabType'],
    methods:{
    },
    components:{
      listContent,
      listRankContent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
