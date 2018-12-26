import {axiosConfig} from '../articleList'
import {URLROUTER} from '../config'

//热门品牌查询接口
export  function getHotBrand(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/listHotBrandAll',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//品牌接口
export  function getbrandGroup(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/brandGroupList',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据品牌查询车系
export  function getSeriesGroupByBrandCode(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getSeriesGroupByBrandCode',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据车系查询车型分组列表
export  function getCarModelGroupListBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelGroupListBySeries',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据车型查询汽车图片
export  function getModelImgBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getModelImgBySeries',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据车系查询汽车参数配置
export  function getCarModelInfoBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelInfoBySeries',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//询底价
    // 查询省
export  function getFindAllProvince(config){
    let Obj = {
        'url':URLROUTER+'/app/baseArea/findAllProvince',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据车型查询汽车参数配置
export  function getCarModelInfoByModel(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelInfoByModel',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
    // 查询城市
export  function findCitysByRroId(config){
    let Obj = {
        'url':URLROUTER+'/app/baseArea/findCitysByRroId',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
    // 查询车系
export  function getCarModelListBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelListBySeries',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
    //查询经销商
export  function defaultAppList(config){
    let Obj = {
        'url':URLROUTER+'/app/dealer/defaultAppList',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
// 经销商分页
export  function appList(config){
    let Obj = {
        'url':URLROUTER+'/app/dealer/appList',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
    //询底价提交接口
export  function postBuyCarIntention(config){
    let Obj = {
        'url':URLROUTER+'/app/buyCarIntention',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
    //预约试驾提交接口
export  function postBuyCarPredrive(config){
    let Obj = {
        'url':URLROUTER+'/app/buyCarPredrive',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//车主点评
export  function postModelComment(config){
    let Obj = {
        'url':URLROUTER+'/app/modelComment',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//车主点评查询
export  function getSeachComment(config){
    let Obj = {
        'url':URLROUTER+'/app/modelComment/search',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
// 购车目的
export  function getFindDics(config){
    let Obj = {
        'url':URLROUTER+'/app/dataDic/findDics',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}