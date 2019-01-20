import {axiosConfig} from '../articleList'
import {URLROUTER} from '../config'

//登录
export  function toLogin(config){
  let Obj = {
      'url':URLROUTER+'/app/login/validate',
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//weixin登录
export  function weChatLogin(config){
  let Obj = {
      'url':`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config['appid']}&secret=${config['secret']}&code=${config['code']}&grant_type=authorization_code`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
export  function getHomepageAds(config){
  let Obj = {
      'url':URLROUTER+`/app/pushPosition/getHomepageAds`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
// 用户登录鉴权
export  function loginAuth(config){
  let Obj = {
      'url':URLROUTER+`/app/login/auth`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
// 用户校验是否已注册
export  function userCheck(config){
  let Obj = {
      'url':URLROUTER+`/app/login/userCheck`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
// 用户注册
export  function loginRegister(config){
  let Obj = {
      'url':URLROUTER+`/app/login/register`,
      'method':"post"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
// 获取注册验证码
export  function getVerifyCode(config){
  let Obj = {
      'url':URLROUTER+`/app/sendSms/getVerifyCode`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
// 验证码校验
export  function verifyCodeCheck(config){
  let Obj = {
      'url':URLROUTER+`/app/sendSms/verifyCodeCheck`,
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}





// //热门品牌查询接口
// export  function getHotBrand(config){
//     let Obj = {
//         'url':URLROUTER+'/app/carInfo/listHotBrandAll',
//         'method':"get"
//     }
//     return axiosConfig(Object.assign({},Obj,config))
// }
// //品牌接口
// export  function getbrandGroup(config){
//     let Obj = {
//         'url':URLROUTER+'/app/carInfo/brandGroupList',
//         'method':"get"
//     }
//     return axiosConfig(Object.assign({},Obj,config))
// }
