<template>
  <div class="login">
    <h2 class="loginName">用户名登录</h2>
    <div class="loginIpunt">
      <input type="text" v-model="loginForm.userName" placeholder="账户">
      <input type="password" v-model="loginForm.password" placeholder="密码">
    </div>
    <div class="loginButton">
        <button @click="loginFn" :disabled="loginForm.userName&&loginForm.password?false:true" :class="{activeLogin:loginForm.userName&&loginForm.password}">登录</button>
    </div>
    <div class="login-wrapper">
        <div class="links">
          <span class="register" @click="register">手机号登录</span>
          <span class="forget" @click="register">忘记密码？</span>
        </div>
    </div>
    <!-- 微信登录部分 -->
    <!-- <div class="other">
        <div class="line"></div>
        <div class="txt">其他登录</div>
        <div class="line"></div>
    </div>
    <div class="otherLogin">
        <div @click="authLogin('weixin')"><img :src="'./static/index/weixin.png'" alt=""></div> -->
    <!-- </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Cookies from 'js-cookie'
import {toLogin ,weChatLogin,loginAuth,userCheck,loginRegister } from '@/api/login/index.js'
export default {
  data() {
    return {
      pwdVisable: false,
      loginForm:{
        userName: "",
        password: ""
      },
      auths:null
    };
  },
  mounted(){
    let that = this
    this.$mui.plusReady(function() {  
      plus.oauth.getServices(function(services) {
        console.log('getServices')
          console.log(services)
          that.auths = services;
      }, function(e) {
          alert("获取登录服务列表失败：" + e.message + " - " + e.code);
      });
    })
  },
  methods: {
    register(){
      this.$router.push({
        path:'/registerNumber'
      })
    },
     authLogin(type) {
       console.log(type)
      let that = this
      console.log(this)
      var s;
      for (var i = 0; i < that.auths.length; i++) {
          if (that.auths[i].id == type) {
              s = that.auths[i];
              break;
          }
      }
      if (!s.authResult) {
        // s.authorize(function(a,b,c){
        //   console.log("authorize")  
        //   // weChatLogin({
        //   //   'appid':'wxf9a039eb7d1c2312',
        //   //   'secret':'dc01f28f5ed2a943682ef89d32cacfcb',
        //   //   'code':a.code,
        //   // }).then(res => {
        //   //   console.log(res)
        //   // })
        //   console.log(a,b,c)
        //   console.log(a.target.getUserInfo)
        // })
        s.login(function(e,data) {
              that.$mui.toast("登录认证成功！");
              window.localStorage.setItem('weiChatInfo',JSON.stringify(e.target))
              that.$store.commit('SET_WECHATUSERINGO',e.target)
              loginAuth({
                data:{
                  token: e.target.authResult.access_token,
                  uuid: e.target.authResult.openid,
                  authType:'WEIXIN'
                }
              }).then(res => {
                console.log("fanhuizhi ")
                if(res.data){
                  userCheck({
                    data:{
                      uuid: e.target.authResult.openid,
                      authType:'WEIXIN'
                    }
                  }).then(ress => {
                    if(ress.data){
                      that.setUserInfo(ress)
                      that.$router.push({path: "/"});
                    }else{
                      that.$router.push({
                        path:"/registerNumber",
                      })
                    }
                  })
                }
              })
              // that.authUserInfo(type);
          }, function(e) {
              console.log(e)
              alert(JSON.stringify(e))
              that.$mui.toast("登录认证失败！");
          });
      } else {
          that.$mui.toast("已经登录认证！");
          that.authLogout();
      }
    },
    //注销
    authLogout() {
      let that = this
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
    // 微信登录认证信息
    // authUserInfo(type) {
    //   let that = this
    //   var s;
    //   for (var i = 0; i < that.auths.length; i++) {
    //       if (that.auths[i].id == type) {
    //           s = that.auths[i];
    //           break;
    //       }
    //   }
    //   if (!s.authResult) {
    //       that.$mui.toast("未授权登录！");
    //   } else {
    //       s.getUserInfo(function(e) {
    //           var josnStr = JSON.stringify(s.userInfo);
    //           var jsonObj = s.userInfo;
    //           jsonObj['nickName'] = jsonObj['nickname']
    //           jsonObj['loginType'] = '1'
    //           delete jsonObj['nickname']
    //           console.log("获取用户信息成功：" + josnStr);
    //           console.log(e);
    //           console.log(jsonObj);
    //           that.$toast('登录成功')
    //           window.localStorage.setItem('userInfo',JSON.stringify(jsonObj))
    //       }, function(e) {
    //           alert("获取用户信息失败：" + e.message + " - " + e.code);
    //       });
    //   }
    // },
    loginFn() {
      if (this.loginForm.userName && this.loginForm.password) {
        toLogin({data:this.loginForm}).then(res=>{
          if(res.code=='0'){
            this.$toast('登录成功')
            this.setUserInfo(res)
            this.$router.push({path: "/"});
          }else{
            this.$toast('用户名或者密码错误')
          }
        }).catch(err=>{
          this.$toast('用户名或者密码错误')
        })
      }else{
        this.$toast('请输入用户名或者密码')
      }
    },
    setUserInfo(res){
      Cookies.set('token', res.data.token)
      window.localStorage.setItem('userInfo',JSON.stringify(res.data))
      this.$store.commit("SET_USERINFO",res.data)
    }
  },
  components: {
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
    padding 4rem 2rem
  .loginButton
    padding 2rem 1rem 1.5rem
    button
      width 100%
      border none
      padding 0.8rem 0
      background #E7E8EC
      outline none
    .activeLogin
      background #007ACC
      color #fff
  .loginName
    text-align left
    margin-bottom 4rem
  .loginIpunt
    input 
      width 100%
      height 3rem
      border none
      border-bottom 2px solid #E9EAEC
      outline none
      font-size 1.2rem
  .login-wrapper
    .links
      display flex 
      justify-content space-between
      a
        color #4A669D 
  .other 
    display flex
    justify-content space-between
    margin-top 2rem 
    text-align center
    align-items: center
    color #C4C4C4
    .line 
      width 35%
      border-top 2px solid #E9EAEC
  .otherLogin
    display flex
    justify-content space-around
    margin-top 4rem
    div
      width 4rem
      height 4rem
      /* border 1px solid #ddd */
      padding 1rem
      padding .3rem
      border-radius 50%
      /* img */
        /* width 100% */
</style>


