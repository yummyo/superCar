<template>
  <div class="codeWrapper">
    <h3>请输入短信验证码</h3>
    <p>短信验证码已发送至+86189***89600</p>
    <div class="inputWrapper">
      <input type="number" v-model="codeForm.code1"/>
      <input type="number" v-model="codeForm.code2"/>
      <input type="number" v-model="codeForm.code3"/>
      <input type="number" v-model="codeForm.code4"/>
      <input type="number" v-model="codeForm.code5"/>
      <input type="number" v-model="codeForm.code6"/>
    </div>
    <div class="timeWrapper">
      <b>56</b><span>秒后重新获取</span>
    </div>
  </div>
</template>
<script>
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
      }
    };
  },
  methods: {}
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.codeWrapper * 
  box-sizing border-box
  text-align left 
.codeWrapper
  margin-top 3rem
  padding-left 2rem 
  padding-right 2rem
  position fixed
  top 0
  right 0 
  left 0 
  bottom 0
  h3 
    text-align left 
    font-size 1.5rem
  p 
    color #C4C6C7
    font-size 1rem 
    line-height 2rem 
.inputWrapper
 width 100%
 display flex
 margin-top 1.5rem
 justify-content space-between
 input 
  display inline-block   
  border none 
  outline none  
  width 13%
  border-bottom 1px solid #EBECEF 
  height 1rem
  line-height 1rem
  text-align center
  font-size 1rem 
  margin-top 1.5rem
.timeWrapper 
  width 100%
  text-align center
  margin-top 2rem  
  color #EBECEF
  font-size 1rem
  b 
    font-weight normal
</style>