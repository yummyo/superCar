import axios from './config'
import {URLROUTER,} from './config'

function axiosConfig(config){
  console.log(config)
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
  const url=URLROUTER+'/api/articleList'
  return axiosConfig(Object.assign({url},config))
}
export  function getListContent(config){
  const url='/api/getListContent'
  return axiosConfig(Object.assign({url},config))
}
