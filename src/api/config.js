import axios from 'axios'
import router from '../router'
import { Indicator,Toast  } from 'mint-ui'
import {loddingOpen} from '@/common/js/utils.js'


// export const URLROUTER="http://192.168.1.41:8001"
export const URLROUTER="http://47.101.182.194:8001" //线上
// export const URLROUTER="http://192.168.1.125:8001" // 陈宇浩
// export const DEVURLROUTER="http://meluyouxia.w3.luyouxia.net"
export const ERROK="0"
export const NOTLOGIN=301
export const AMOUNT=10
export const options = {
  param: 'jsonpCallback'
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let _axios = axios.create({
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});
_axios.defaults.withCredentials = true

let ajaxNum = 0,loadinginstace;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if(!config['url']) config['url'] = '';
  // 在发送请求之前做些什么
  // if(!config.headers) config.headers = {}
  // config.headers['test'] = "token=12312312312312312"
  console.log(config)

  ajaxNum++;
  if(ajaxNum == 1&&loddingOpen(config.url)){
    Indicator.open();
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); 

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  if(response.data.code != '0'){
    Toast({
      message: response.data.message || "网络异常",
      position: 'bottom',
      duration: 2000
    })
    Indicator.close();
    return Promise.reject(response.data);
  }
  // 对响应数据做点什么
  ajaxNum--;
  if(ajaxNum == 0){
    Indicator.close();
  } 
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log("错误")
  console.log(error)
  return Promise.reject(error);
});
export default axios
