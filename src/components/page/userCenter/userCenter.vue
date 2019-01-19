<template>
  <div class="changeCar">
    <!-- 登录状态 -->
    <div class="user">
      <!-- 已登录 -->
      <div v-if='isLogin' class="login">
        <div>
          <img :src=" userInfo ? userInfo['headimgurl'] : './static/index/notLogin.png'" alt="">
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
    <div>
      <!-- <button type="default" @click="authLogout">退出</button> -->
      <mt-button type="primary" size='large' @click="authLogout">退出</mt-button>
    </div>
  </div>
</template>

<script>
import {myCollectNum} from '@/api/userCenter/index';
import Cookies from 'js-cookie'
import {mapGetters} from 'vuex'
  export default {
    name: 'changeCar',
    data () {
      return {
        myAttention:'',
        myCollect:'',
        myCollectNums:'',
        auths: null
      }
    },
    mounted(){
      let that = this
      console.log("初始化完成")
      console.log(plus)
      this.$mui.plusReady(function() {  
        plus.oauth.getServices(function(services) {
            console.log(services)
            that.auths = services;
        }, function(e) {
            alert("获取登录服务列表失败：" + e.message + " - " + e.code);
        });
      })
    },
    created() {
      var loginId=JSON.parse(window.localStorage.getItem('userInfo'))
      //  this.myCollectId=loginId.id
      myCollectNum().then((res) => {
        this.myCollectNums=res.data
      }).catch(res=>{

      })
    },
    computed:{
      ...mapGetters(['userInfo']),
      isLogin(){
        console.log('ceshi' )
        console.log(this.userInfo )
        console.log(this.userInfo['nickname'] )
        if((this.userInfo && Object.keys(this.userInfo).length > 0 ) || window.localStorage.getItem('userInfo') != '{}'){
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
      },
      //注销
      authLogout() {
        let that = this
        window.localStorage.setItem("userInfo",'{}')
        Cookies.remove('token')
        this.$store.commit("SET_USERINFO",{})
        for (var i in that.auths) {
            var s = that.auths[i];
            if (s.authResult) {
                s.logout(function(e) {
                    console.log("注销登录认证成功！");
                }, function(e) {
                    console.log("注销登录认证失败！");
                });
            }
        }
      },
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
            border-radius 50%
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
