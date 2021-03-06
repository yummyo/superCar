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
//     //查询经销商
// export  function defaultAppList(config){
//     let Obj = {
//         'url':URLROUTER+'/app/dealer/defaultAppList',
//         'method':"get"
//     }
//     return axiosConfig(Object.assign({},Obj,config))
// }
// // 经销商分页
// export  function appList(config){
//     let Obj = {
//         'url':URLROUTER+'/app/dealer/appList',
//         'method':"get"
//     }
//     return axiosConfig(Object.assign({},Obj,config))
// }
    //询底价，预约试驾经销商列表查询
export  function postDealersByModelId(config){
    let Obj = {
        'url':URLROUTER+'/app/dealerInfo/getDealersByModelId',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
// 点评里的经销商
export  function getByModelIdAndProvince(config){
    let Obj = {
        'url':URLROUTER+'/app/dealerInfo/getByModelIdAndProvince',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
// 经销商里面的经销商查询
export  function postBySeriesId(config){
    let Obj = {
        'url':URLROUTER+'/app/dealerInfo/getBySeriesId',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}

    //询底价提交接口
export  function postBuyCarIntention(config){
    let Obj = {
        'url':URLROUTER+'/app/buyCarIntention/batchInsert',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//预约试驾提交接口
export  function postBuyCarPredrive(config){
    let Obj = {
        'url':URLROUTER+'/app/buyCarPredrive/batchInsert',
        'method':"post"
    }
    return axiosConfig(Object.assign({},Obj,config))
}
//根据车系名称模糊查询获取车系表信息
export  function getBySeriesNameLike(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getBySeriesNameLike',
        'method':"get"
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
