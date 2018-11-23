import {axiosConfig} from '../articleList'
import {URLROUTER} from '../config'

//登录
export  function toLogin(config){
  let Obj = {
      'url':URLROUTER+'/login/validate',
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
