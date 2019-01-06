import * as types from './mutation-types'
const mutations={
  [types.SHOW_TEXT](state,showText){
    state.showText=showText
  },
  [types.ADD_TODOLIST](state,data){
    state.toDoList.push(data);
  },
  [types.REMOVE_TODOLIST](state,index){
    state.toDoList.splice(index,1);
  },
  [types.CHANGE_TODOLIST](state,_data){
    state.toDoList.splice(_data.idnex,1,_data.value);
    
  },
  //当前显示页面
  [types.CHANGE_PAGESHOW](state,_data){
    state.pageShow = _data;
  },
  // 车辆logo大图
  [types.SET_DETAILIMG](state,imgUrl){
    state.carDetailImg = imgUrl;
  },
  // 用户定位信息
  [types.SET_USERSIZE](state,data){
    state.userSite = data;
  },
  // 车辆图片列表
  [types.SET_CARIMGLIST](state,data){
    state.carImgList = data;
  },
  [types.SET_USERINFO](state,data){
    state.userInfo = data;
  },
  //控制iframe状态
  [types.SET_IFRAMEDATA](state,data){
    state.iframeData = data;
  },
}
export default mutations