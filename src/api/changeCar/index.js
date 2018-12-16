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
export  function getCarModelListBySeries(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelListBySeries',
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
//根据车型查询汽车参数配置
export  function getCarModelInfoByModel(config){
    let Obj = {
        'url':URLROUTER+'/app/carInfo/getCarModelInfoByModel',
        'method':"get"
    }
    return axiosConfig(Object.assign({},Obj,config))
}

