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
export { detectorLogin }