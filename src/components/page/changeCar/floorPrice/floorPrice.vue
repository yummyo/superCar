<template>
  <div class="login">
    <contentHeader class="topTitle" :listdata="{'content':'询底价'}"></contentHeader>
    <div class="loginIpunt">
      <div>
        <input type="text" v-model="car" placeholder="选择车型">
        <input type="password" v-model="car" placeholder="姓名">
        <input type="password" v-model="car" placeholder="电话">
        <input type="password" v-model="car" placeholder="城市">
      </div>
      <div class="loginButton">
        <button>提交</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import contentHeader from '@/common/view/contentHeader';
export default {
  data() {
    return {
      car:''
    }
  },
  methods: {
  
  },
  components: {
    contentHeader
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    height 100%
    .topTitle
      height 10%
    .loginIpunt
      padding 0 1rem
      display flex
      flex-direction column
      height 90%
      justify-content: space-between;
      div>input 
        width 100%
        height 3rem
        border none
        border-bottom 2px solid #DDDDDD
        outline none
        font-size 1.2rem
      .loginButton>button
        width 95%
        background #3B5997
        height 3rem
        border-radius .3125rem
        color #ffffff
        font-size 1.5rem
        margin-bottom 2rem
        outline none 
        border none
</style>


