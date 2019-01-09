import {axiosConfig} from '../articleList'
import {URLROUTER} from '../config'

//关注
export  function myAttention(config){
  let Obj = {
      'url':URLROUTER+'/app/concern/findConcernUsers',
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//收藏
export  function myCollect(config){
  let Obj = {
      'url':URLROUTER+'/app/keep/findKeepArticles',
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//收藏数量
export  function myCollectNum(config){
  let Obj = {
      'url':URLROUTER+'/app/keep/findKeepNum',
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
