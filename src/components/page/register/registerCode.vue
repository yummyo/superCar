<template>
  <div class="codeWrapper">
    <h3>请输入短信验证码</h3>
    <p>短信验证码已发送至+86189***89600</p>
    <div class="inputWrapper">
      <input @keyup.delete="deleteCode(1)"  ref="input1"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code1"/>
      <input @keyup.delete="deleteCode(2)"  ref="input2"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code2"/>
      <input @keyup.delete="deleteCode(3)"  ref="input3"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code3"/>
      <input @keyup.delete="deleteCode(4)"  ref="input4"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code4"/>
      <input @keyup.delete="deleteCode(5)"  ref="input5"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code5"/>
      <input @keyup.delete="deleteCode(6)"  ref="input6"  name='code[]' class='now' maxlength="1" type="number" v-model="codeForm.code6"/>
    </div>
    <div class="timeWrapper">
      <b>56</b><span>秒后重新获取</span>
    </div>
  </div>
</template>
<script>
import { verifyCodeCheck,loginRegister } from '@/api/login/index.js'
import {mapGetters,mapMutations} from 'vuex'
export default {
  data() {
    return {
      codeForm: {
        code1: null,
        code2: null,
        code3: null,
        code4: null,
        code5: null,
        code6: null
      },
      registerForm: {
        // password: this.$route.query.password,
        // phone: this.$route.query.phone,
        code: ""
      }
    };
  },
  computed:{
    ...mapGetters(['weChatUserInfo'])
  },
  watch: {
    "codeForm.code1": function code1Fun() {
      if (this.codeForm.code1.length >= 1) {
        this.codeForm.code1 = this.codeForm.code1.slice(0,1)
        this.$refs["input2"].focus();
      }
    },
    "codeForm.code2": function code1Fun() {
      if (this.codeForm.code2.length >= 1) {
        this.codeForm.code2 = this.codeForm.code2.slice(0,1)
        this.$refs["input3"].focus();
      }
    },
    "codeForm.code3": function code1Fun() {
      if (this.codeForm.code3.length == 1) {
        this.codeForm.code3 = this.codeForm.code3.slice(0,1)
        this.$refs["input4"].focus();
      }
    },
    "codeForm.code4": function code1Fun() {
      if (this.codeForm.code4.length == 1) {
        this.codeForm.code4 = this.codeForm.code4.slice(0,1)
        this.$refs["input5"].focus();
      }
    },
    "codeForm.code5": function code1Fun() {
      if (this.codeForm.code5.length == 1) {
        this.codeForm.code5 = this.codeForm.code5.slice(0,1)
        this.$refs["input6"].focus();
      }
      this.registerForm.code = parseInt(
        this.codeForm.code1 + this.codeForm.code2 + this.codeForm.code3 + this.codeForm.code4+this.codeForm.code5 + this.codeForm.code6
      );
    },
    "codeForm.code6": function code1Fun() {
      this.codeForm.code6 = this.codeForm.code6.slice(0,1)
      this.registerForm.code = parseInt(
        this.codeForm.code1 + this.codeForm.code2 + this.codeForm.code3 + this.codeForm.code4+this.codeForm.code5 + this.codeForm.code6
      );
      console.log((this.registerForm.code+"").length >= 6)
      if((this.registerForm.code+"").length >= 6){
        console.log(this.registerForm.code)
        this.validCode()
      }
    }
  },
  methods: {
    deleteCode(number){
      if(number>1){
         this.$refs["input"+(number-1)].focus();
      }else{
        return
      }
    },
    validCode(){
      verifyCodeCheck({
        data:{
          phoneNum: this.$route.query.phoneNum,
          verifyCode: this.registerForm.code,
          type: 'LOGIN' 
        }
      }).then(res => {
        console.log(res)
        if(res.data){
          this.loginRegister({
            data:{
              "authType": "WEIXIN",
              "headImgUrl": this.weChatUserInfo.uuid,
              "nickName": this.weChatUserInfo.uuid,
              "phone": this.$route.query.phoneNum,
              "uuid": this.weChatUserInfo.uuid
            }
          }).then(res =>{
            console.log(res)
            this.$toast({message: '注册成功',position: 'bottom',duration: 2000});
            window.localStorage.setItem('userInfo',JSON.stringify(res.data))
            this.$store.commit("SET_USERINFO",res.data)
            this.$router.push({path: "/"});
          })
        }
      })
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.codeWrapper * {
  box-sizing: border-box;
  text-align: left;
}

.codeWrapper {
  margin-top: 3rem;
  padding-left: 2rem;
  padding-right: 2rem;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  h3 {
    text-align: left;
    font-size: 1.5rem;
  }

  p {
    color: #C4C6C7;
    font-size: 1rem;
    line-height: 2rem;
  }
}

.inputWrapper {
  width: 100%;
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;

  input {
    display: inline-block;
    border: none;
    outline: none;
    width: 13%;
    border-bottom: 1px solid #EBECEF;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-size: 1rem;
    margin-top: 1.5rem;
    padding-bottom 5px;
  }
}

.timeWrapper {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  color: #EBECEF;
  font-size: 1rem;

  b {
    font-weight: normal;
  }
}
</style>