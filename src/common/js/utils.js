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
        let DOM = that.$refs[item].length ? that.$refs[item][0] : that.$refs[item]
        if(!DOM.value){
          // 如果是原生dom 直接拿对应title
            // that.$toast(DOM.title)
            // 如果是vueDom 或者 数组DOM 拿到第一位再取Title
          console.log(DOM)
          that.$toast(DOM.$el ? DOM.$el.title : DOM.title)
          return false
        }
      }
    }
  }
  return true
}
// 判断lodding是否开启
function loddingOpen(url){
  if(url.indexOf("app/keep/removeKeep")==-1&&url.indexOf("app/keep/keepSource")==-1){
    return true
  }else{
    return false
  }
}
export { detectorLogin,validForm,loddingOpen}
