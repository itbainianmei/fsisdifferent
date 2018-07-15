import * as types from './mutation-types'
export const kaiguan=function({commit},flag){
  commit(types.SET_DAOHANG,flag)
}
export const addtab=function({commit,state},arr){
  commit(types.SET_ZHUIJIA,arr); 
}
export const deltab=function({commit,state},del){
  commit(types.SET_SHANCHU,del);
}
export const hottab=function({commit,state},hot){
  commit(types.SET_BIANLI,hot);
}
export const cstab=function({commit,state}){
  commit(types.SET_CHUSHIDJ);
}
export const addMenu = function({commit,menuItems}){
  if (menuItems.length > 0) {  
      commit(types.ADD_MENU, menuItems)  
  }  
}
export const addIncludePageName = function({commit,state},str){
  commit(types.SET_ZHUIJIA,str)
}

export const addListData = function({commit,state},obj){
  commit(types.MEUN_LIST,obj)
}









