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
  // 新增评论
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
  // 查询文章或者视频是否被点赞
  export  function isLiked(config){
    let Obj = {
      'url':URLROUTER+'/app/userlike/isLiked',
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

  // 收藏
  export  function keepSource(config){
    let Obj = {
      'url':URLROUTER+'/app/keep/keepSource',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  // 取消收藏
  export  function removeKeep(config){
    let Obj = {
      'url':URLROUTER+'/app/keep/removeKeep',
      'method':"GET"
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
   // 查询文章或者视频是否被收藏
   export  function isKeeped(config){
    let Obj = {
      'url':URLROUTER+'/app/keep/isKeeped',
      'method':"GET",
      'test':'true'
    }
    return axiosConfig(Object.assign({},Obj,config))
  }
  //查询播放量
export  function getUpdatePlayCount(config){
  let Obj = {
      'url':URLROUTER+'/app/video/updatePlayCount',
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
  //地方站文章
export  function findCityArticle(config){
  let Obj = {
      'url':URLROUTER+'/app/article/findCityArticle',
      'method':"get"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
  //按搜索条件搜索文章数据
export  function getBySearchLike(config){
  let Obj = {
      'url':URLROUTER+'/app/article/getBySearchLike',
      'method':"POST"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
  //按搜索条件搜索及Tab页分页查询文章数据
export  function getBySearchLikeTabName(config){
  let Obj = {
      'url':URLROUTER+'/app/article/getBySearchLikeTabName',
      'method':"POST"
  }
  return axiosConfig(Object.assign({},Obj,config))
}
  // export  function getListContent(config){
  //   const url='/api/getListContent'
  //   return axiosConfig(Object.assign({url},config))
  // }