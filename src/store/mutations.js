import * as types from './mutation-types'
const mutations={
  [types.SET_DAOHANG](state,flag){
    state.flag = flag;
  },
  [types.SET_ZHUIJIA](state,arr){
    
    if(!state.tabsArr.find(ele=>ele.path==arr.path)){
        state.tabsArr.push(arr);
        state.includePageNames.push(arr.name.toString())
        if (state.tabsArr.length > 0) {
          state.tabsArr.forEach(ele => (ele.act = false));
          state.tabsArr[(state.tabsArr.length-1)].act = true;
        }
    }else{
      let num='';
      for(let i=0;i<state.tabsArr.length;i++){
        if(state.tabsArr[i].path==arr.path){num=i;}
      }
      state.tabsArr.forEach(ele => (ele.act = false));
      state.tabsArr[num].act = true;
    }

  },
  [types.SET_SHANCHU](state,del){
    
    state.tabsArr.splice(del,1);
    state.includePageNames.splice(del,1)

  },
  [types.SET_BIANLI](state,hot){
    
    // if(state.tabsArr.length>0){
    //   state.tabsArr.forEach(ele => (ele));
      
    // }
    if(state.tabsArr.length>0){
      state.tabsArr.forEach(ele => (ele.act = false));
      state.tabsArr[hot].act = true;
    }
  },
  [types.SET_CHUSHIDJ](state){
    if (state.tabsArr.length > 0) {
      state.tabsArr.forEach(ele => (ele.act = false));
      state.tabsArr[(state.tabsArr.length-1)].act = true;
    }
  },
  [types.ADD_MENU](state,menuItems){
    if (menuItems.length === 0) {  
      state.items = []  
    } else {  
      state.items =  menuItems
    }  
  }
}
export default mutations
