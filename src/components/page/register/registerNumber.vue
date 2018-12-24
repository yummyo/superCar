<template>
  <div class="registerWrapper">
    <h2 class="loginName">手机号注册/登录</h2>
    <div class="loginIpunt">
      <span>+86</span>
      <input type="text" v-model="loginForm.userName" placeholder="请输入手机号">
    
    </div>
    <div class="loginButton">
        <button @click="loginFn" :disabled=loginForm.userName&&loginForm.password?false:true :class={activeLogin:loginForm.userName&&loginForm.password}>发送验证码</button>
    </div>
    <div class="login-wrapper">
        <div class="links">
          <router-link to="">用户名登录</router-link>
          <!-- <a href="" class="forget">忘记密码？</a> -->
        </div>
    </div>
    <div class="other">
        <div class="line"></div>
        <div class="txt">其他登录</div>
        <div class="line"></div>
    </div>
    <div class="otherLogin">
        <div><img :src="'./static/index/weixin.png'" alt=""></div>
        <div><img :src="'./static/index/qq.png'" alt=""></div>
        <div><img :src="'./static/index/weibo.png'" alt=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {toLogin} from '@/api/login/index.js'
export default {
  data() {
    return {
      pwdVisable: false,
      loginForm:{
        userName: "",
        password: ""
      },
     
    };
  },
 
  methods: {
    loginFn() {
      if (this.loginForm.userName && this.loginForm.password) {
        toLogin({data:this.loginForm}).then(res=>{
          console.log(res)
         if(res.code=='0'){
          this.$toast('登录成功')
          this.$router.push({path: "/"});
         }else{
          this.$toast('用户名或者密码错误')
         }
        }).catch(err=>{
          console.log(err,'err')
          this.$toast('用户名或者密码错误')
        })
      
      }else{
        this.$toast('请输入用户名或者密码')
      }
      } 
    },
  components: {
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .registerWrapper
    padding 4rem 2rem
  .loginButton
    padding 2rem 0rem 1.5rem
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
    display flex 
    width 100%
    justify-content space-between
    height 3rem 
    line-height 3rem
    border-bottom 2px solid #E9EAEC
    span 
      width 40px
      display inline-block 
      height 3rem 
      line-height 3rem
    input 
      flex 1
      height 3rem
      border none
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
    justify-content space-between
    margin-top 4rem
    div
      width 4rem
      height 4rem
      /* border 1px solid #ddd */
      pdding 1rem
      padding .3rem
      border-radius 50%
      /* img */
        /* width 100% */
</style>


