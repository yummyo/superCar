import axios from './config'
import {URLROUTER,} from './config'

function axiosConfig(config){
  return axios({
    method: config.method || 'POST',
    url: config.url ,
    data: config.data || '',
    headers : config.headers || '',
  }).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.resolve(error)
  })
}
// *****************************主页********************************************
// 主页轮播图
export  function getIndexLunbo(config){
  const url=URLROUTER+'/app/pushPosition/advertisingRotation'
  return axiosConfig(Object.assign({url},config))
}
//g广告分页查询接口
export  function getadvert(config){
  const url=URLROUTER+'/app/article/advertisement'
  return axiosConfig(Object.assign({url},config))
}
//文章内容分页查询
export  function getArticleList(config){
  const url=URLROUTER+'/app/article/advertisement'
  return axiosConfig(Object.assign({url},config))
}
//文章详情页面查询
export  function getArticleDetail(config){
  const url=URLROUTER+'/app/article/findById';
  return axiosConfig(Object.assign({url},config))
}

// 多并发axios请求
export function axiosAll(funs){
  return axios.all(funs)
}
// export  function getListContent(config){
//   const url='/api/getListContent'
//   return axiosConfig(Object.assign({url},config))
// }
