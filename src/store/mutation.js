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
}
export default mutations