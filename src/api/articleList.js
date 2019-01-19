import _axios from './config'
import { URLROUTER } from './config'

export function axiosConfig(config){
  let Obj = {
    method: config.method.toUpperCase() || 'POST',
    url: config.url ,
  }
  // 区别get请求和其他请求 get请求传参数需要用params
  switch(Obj.method){
    case 'GET': 
    // case 'PUT': 
      Obj['params'] = config.data || '';
      break;
    case 'DELETE': 
      Obj['url'] += '/'+config.data['id']
      break;
    default:
      Obj['data'] = config.data || '';
      break;
  }
  return _axios(Obj).then((res)=>{
    return Promise.resolve(res.data)
  }).catch((error)=>{
    return Promise.reject(error)
  })
}
 // 多并发axios请求
export function axiosAll(funs){
  return _axios.all(funs)
}