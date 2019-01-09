<template>
  <div class="changeCar">
    <!-- 登录状态 -->
    <div class="user">
      <!-- 已登录 -->
      <div v-if='isLogin' class="login">
        <div>
          <img :src="'./static/index/notLogin.png'" alt="">
          <span>{{userInfo ? userInfo['nickName'] : '' }}</span>
        </div>
      </div>
      <!-- 未登录 -->
      <div v-else class="notLogin">
        <div>
          <img :src="'./static/index/notLogin.png'" alt="">
          <span>未登录</span>
        </div>
        <div>
          <button @click="login" class="toLogin">登录</button>
        </div>
      </div>
    </div>
    <div class="setting">
      <!-- 我的关注 -->
      <div class="attention" @click="funAttention()">
        <span>我的关注：</span>
        <span>0</span>
      </div>
      <!-- 我的收藏 -->
      <div class="collect" @click="funCollect()">
        <span>我的收藏：</span>
        <span>{{myCollectNums}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {myCollectNum} from '@/api/userCenter/index';
import {mapGetters} from 'vuex'
  export default {
    name: 'changeCar',
    data () {
      return {
        myAttention:'',
        myCollect:'',
        myCollectNums:'',
      }
    },
    created() {
       var loginId=JSON.parse(window.localStorage.getItem('userInfo'))
       this.myCollectId=loginId.id
       myCollectNum({data:{userId:this.myCollectId}}).then((res) => {
          this.myCollectNums=res.data
        }).catch(res=>{
      });
    },
    computed:{
      ...mapGetters(['userInfo']),
      isLogin(){
        if((this.userInfo && Object.keys(this.userInfo).length > 0 ) || window.localStorage.getItem('userInfo') != ''){
          this.$store.commit("SET_USERINFO",JSON.parse(window.localStorage.getItem('userInfo')))
          return true
        }else{
          return false
        }
      },
    },
    methods:{
      funAttention : function(){
        this.$router.push({
          path:"/myAttention"
        })
      },
      funCollect : function(){
        this.$router.push({
          path:"/myCollect"
        })
      },
      login : function(){
        this.$router.push({path: "/login"})
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
