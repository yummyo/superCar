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
//根绝品牌查询车系
export  function getSeriesGroupByBrandCode(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getSeriesGroupByBrandCode',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根绝品牌查询车系
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
//询底价
    // 查询省
export  function getFindAllProvince(config){
    let Obj = {
        'url':URLROUTER+'/app/baseArea/findAllProvince',
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
export  function getDealersBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/dealer/getDealersBySeries',
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

