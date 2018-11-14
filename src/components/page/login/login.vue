<template>
  <div class="login">
    <h2 class="loginName">用户名登录</h2>
    <div class="loginIpunt">
      <input type="text" placeholder="账户">
      <input type="password" placeholder="密码">
    </div>
    <div class="loginButton">
        <button>登录</button>
    </div>
    <div class="login-wrapper">
        <div class="links">
          <a href="" class="register">立即注册</a>
          <a href="" class="forget">忘记密码？</a>
        </div>
    </div>
    <div class="other">
        <div class="line"></div>
        <div class="txt">其他登录</div>
        <div class="line"></div>
    </div>
    <div class="otherLogin">
        <div><img src="/static/index/weixin.png" alt=""></div>
        <div><img src="/static/index/qq.png" alt=""></div>
        <div><img src="/static/index/weibo.png" alt=""></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      pwdVisable: false,
      userName: "",
      password: ""
    };
  },
  methods: {
    pwdVisableFn() {
      this.pwdVisable = !this.pwdVisable;
    },
    loginFn() {
      if (!this.userName || !this.password) {
      } else {
          this.$router.push({path: "recommend"});
      }
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
    justify-content space-between
    margin-top 4rem
    div 
      img
        width 100%
</style>


