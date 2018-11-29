<template>
  <div>
    <contentHeader :listdata="{'content':'车系列表'}"></contentHeader>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">最热门</mt-tab-item>
      <mt-tab-item id="2">新上市</mt-tab-item>
      <mt-tab-item id="3">最便宜</mt-tab-item>
    </mt-navbar>
    <div v-for="(item,index) of listData" :key="index">
      <div class="item" @click="toDetail">
        <div>
          <img :src="item.src" alt="">
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="money">{{item.price}}</div>
          </div>
        </div>
        <div>></div>
      </div>
    </div>
  </div>
</template>

<script>
import contentHeader from '@/common/view/contentHeader';
export default {
  data(){
    return{
      selected:'1',
      testData : {
        'src':'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1732957859.png',
        'title':'本田飞跃1001',
        'price':'1.8万',
      },
      listData: []
    }
  },
  created(){
    this.randomData();
  },
  watch:{
    selected(){
      this.randomData()
    }
  },
  components:{
    contentHeader
  },
  methods:{
    randomData(){
      let num = parseInt(Math.random()*10)+10,arr = []
      console.log(num)
      for(let a = 0; a<num ; a++){
        arr.push(this.testData)
      }
      this.listData = arr
    },
    toDetail(){
      this.$router.push({
        path:'/carSeriesDetail'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .item
    display flex
    justify-content space-between
    align-items center
    margin-bottom .5rem
    >div:first-child
      width 90%
      display flex
      padding 1rem 0
      border-bottom 1px solid #ddd
      .text
        flex-grow 1 
        text-align left
        display flex
        flex-direction column
        justify-content space-between
        padding-left .5rem
        .money
          color red
      img
        width 6rem
        height 4.5rem
    >div:last-child
      width 5%
</style>
