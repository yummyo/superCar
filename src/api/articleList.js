import axios from './config'
import {URLROUTER,} from './config'

function axiosConfig(config){
  let Obj = {
    method: config.method.toUpperCase() || 'POST',
    url: config.url ,
    headers : config.headers || '',
  }
  // 区别get请求和其他请求 get请求传参数需要用params
  switch(Obj.method){
    case 'GET': 
      Obj['params'] = config.data || '';
      break;
    case 'DELETE': 
      Obj['url'] += '/'+config.data['id']
      break;
    default:
      Obj['data'] = config.data || '';
      break;
  }
  return axios(Obj).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
// *****************************主页********************************************
// 主页轮播图
export  function getIndexLunbo(config){
  let Obj = {
    'url':URLROUTER+'/app/pushPosition/advertisingRotation',
    'method':"GET"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//g广告分页查询接口
export  function getadvert(config){
  let Obj = {
    'url':URLROUTER+'/app/article/advertisement',
    'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//文章内容分页查询
export  function getArticleList(config){
  let Obj = {
    'url':URLROUTER+'/app/article/advertisement',
    'method':"GET"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//文章详情页面查询
export  function getArticleDetail(config){
  let Obj = {
    'url':URLROUTER+'/app/article/findById',
    'method':"GET"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//视频详情
export  function getVideo(config){
  let Obj = {
    'url':URLROUTER+'/app/video/findById',
    'method':"GET"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
//视频列表
export  function getVideoList(config){
  let Obj = {
    'url':URLROUTER+'/app/video/list',
    'method':"GET"
  }
  return axiosConfig(Object.assign({},Obj,config))
}

// 多并发axios请求
export function axiosAll(funs){
  return axios.all(funs)
}
// export  function getListContent(config){
//   const url='/api/getListContent'
//   return axiosConfig(Object.assign({url},config))
// }
