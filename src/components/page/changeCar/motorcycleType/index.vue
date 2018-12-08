<template>
  <div class="motorcycleType" @click.self="close">
      <div class="box">
        <div class="title">
            <img :src="listData.item.src" alt="">
            <span>{{listData.item.name}}</span>
        </div>
        <!--车系列表  -->
        <div>
          <div class="" v-for="(item,index) of listData.listData" :key="index">
            <div class="item">
              <img :src="item.src" alt="">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'motorcycleType',
  props:['listData'],
  data(){
    return {
    }
  },
  methods:{
    close(){
      this.$emit('close')
    }
  },
  commponents:{

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .box
    float right
    width 80%
    background #fff
    height 100%
    .title
      display flex
    img 
      width 4rem
      height 4rem
    .item
      display flex
      align-items center
</style>
