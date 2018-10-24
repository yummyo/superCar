import axios from 'axios'

export const URLROUTER="https://i.donzch.com"
export const DEVURLROUTER="http://meluyouxia.w3.luyouxia.net"
export const ERROK="0"
export const NOTLOGIN=301
export const AMOUNT=10
export const options = {
  param: 'jsonpCallback'
}
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let ajaxNum = 0,loadinginstace;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if(!config['url']) config['url'] = '';
  // 在发送请求之前做些什么
  ajaxNum++;
  if(ajaxNum == 1){
    // loadinginstace = Loading.service({ fullscreen: true })
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  ajaxNum--;
  if(ajaxNum == 0){
  } 
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default axios
