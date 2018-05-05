import * as types from "../actions/types/FindType";

const initState = {
  hasHistory: false, //没有历史记录
  hasShop: true, //没有搜索到相关店铺
  hisList: [], //搜索历史记录
  shopList: [], //店铺列表
};

export function findReducer(state = initState, action) {
  switch (action.type){
    case types.FIND_HISTORY: // 清空完输入框，如果有历史记录，则显示历史记录
      return{
        ...state,
        hasHistory: state.hisList.length > 0,
        hisList: state.hisList ? state.hisList : [],
      };
    case types.FIND_HISTORY_ADD: //输入关键字搜索后没有相关店铺，则历史记录新增一条
      return{
        ...state,
        hisList: state.hisList.push(action.keyWord),
      };
    case types.FIND_SHOP: //搜索到相关店铺
      return{
        ...state,
        hasShop: action.hasShop,
        shopList: action.shopList ? action.shopList : [],
      };
    case types.FIND_CLEAR:
      return{
        ...state,
        hisList: []
      };
    case types.FIND_DELETE_ITEM:
      const index = state.hisList.findIndex(it => it.item === action.item);
      if (index !== -1) {
        state.hisList.splice(index, 1);
      }
      return{
        ...state,
        hisList: state.hisList
      };
    default:
        return state
  }
}