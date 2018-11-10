<template>
  <div class="changeCar">
    <div class="topBg">
        <!-- 搜索框 -->
        <CommonSearch></CommonSearch>  
    </div>
    <div class="brand">
        <div class="brandTitle">品牌</div>
        <div class="singer" ref="singer">
          <chooseCar  :data="carData" @click.native="selectCar()"></chooseCar>
        </div>
    </div>
  </div>
</template>

<script>
  import CommonSearch from '@/common/view/search.vue';
  import chooseCar from '@/common/view/chooseCar.vue';
  export default {
    name: 'changeCar',
    data () {
      return {
        carData:[]
      }
    },
    methods:{
      selectCar(){
        this.$router.push({
          name:"carSeriesDetail",
          params:{
          }
        })
      }
    },
    components:{
      CommonSearch,
      chooseCar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .topBg
    position fixed
    top 0
    left 0
    width 100%
    z-index 999
    background #3B5997
    height 3.2rem
  .brand
    margin-top 3.2rem
    .brandTitle
      padding .5rem 0
      border-bottom 1px solid #999999
      color #070103
      font-size 1.4rem
</style>
