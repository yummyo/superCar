import {axiosConfig} from '../articleList'
import {URLROUTER} from '../config'

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
  //查询视频评论列表
  export  function getVideoCommentList(config){
    let Obj = {
      'url':URLROUTER+'/app/comment/findComments',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 新增回复
  export  function saveComment(config){
    let Obj = {
      'url':URLROUTER+'/app/comment/save',
      'method':"PUT"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 新增
  export  function saveresponse(config){
    let Obj = {
      'url':URLROUTER+'/app/comment/saveresponse',
      'method':"PUT"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 查询相关推荐
  export  function similarArticles(config){
    let Obj = {
      'url':URLROUTER+'/app/article/findSimilarArticles',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 点赞
  export  function giveLike(config){
    let Obj = {
      'url':URLROUTER+'/app/userlike/giveLike',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 取消点赞
  export  function removeLike(config){
    let Obj = {
      'url':URLROUTER+'/app/userlike/removeLike',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  
  // export  function getListContent(config){
  //   const url='/api/getListContent'
  //   return axiosConfig(Object.assign({url},config))
  // }