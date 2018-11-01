<template>
  <div class="changeCar">
    <!-- 登录状态 -->
    <div class="user">
      <!-- 已登录 -->
      <div v-if='isLogin' class="login">

      </div>
      <!-- 未登录 -->
      <div v-else class="notLogin">
        <div>
          <img src="/static/index/notLogin.png" alt="">
          <span>未登录</span>
        </div>
        <div>
          <button class="toLogin">登录</button>
        </div>
      </div>
    </div>
    <div class="setting">
      <!-- 我的关注 -->
      <div class="attention" @click="fun('1')">
        <span>我的关注：</span>
        <span>0</span>
      </div>
      <!-- 我的收藏 -->
      <div class="collect" @click="fun('2')">
        <span>我的收藏：</span>
        <span>0</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'changeCar',
    data () {
      return {
        isLogin:false
      }
    },
    methods:{
      fun : function(id){
        console.log('id:'+id)
        this.$router.push({
          name:"myAttention",
          params:{
            id
          }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .changeCar
    .user
      background #dddddd
      padding-bottom 1rem
      >div
        background #fff
      // 未登录
      .notLogin
        padding 2rem 0
        display flex
        justify-content space-around
        align-items center
        div:first-child
          display flex
          align-items center
          img
            width 5rem
            height 5rem
          span
            margin-left 1rem
        .toLogin
          border-radius 3px 
          background #404040
          padding .2rem 1rem
          border none
          color #fff
    .setting
      >div
        display flex
        justify-content space-between
        padding 2rem 3rem
        border-bottom 1px solid #ddd
</style>
