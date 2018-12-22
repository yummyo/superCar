function detectorLogin(that,fun){
  let _storage = window.localStorage.getItem('userInfo');
  if(_storage){
    fun();
  }else{
    that.$messageBox.confirm('当前未登录，点击确定去登陆！').then(action => {
      that.$router.push({
        path:"/login",
      })
    }).catch(res => {
      console.log(res)
    });
  }
}
function validForm(that){
  console.log(that.$refs)
  if(Object.keys(that.$refs).length > 0){
    for(let item in that.$refs){
      if(/^valid-/.test(item)){
        if(!that.$refs[item].value){
          that.$toast(that.$refs[item].title)
          console.log(that.$refs[item])
          console.log(that.$refs[item].value)
          return false
        }
      }
    }
  }
  return true
}
export { detectorLogin,validForm }
