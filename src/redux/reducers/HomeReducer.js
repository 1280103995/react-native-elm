import * as types from "../actions/types/HomeType";
import {RefreshState} from "../../view/RefreshListView";

const initState = {
  refreshState: RefreshState.Idle,
  noMoreData: false,
  latitude:0,
  longitude:0,
  geohash:null,
  name:'',
  categoryList: [],
  shopList: []
};

export function homeReducer(state = initState, action) {

  //模拟没有更多数据了
  if (state.shopList.length >= 60){
    return{
      ...state,
      refreshState: RefreshState.NoMoreData,
      noMoreData: true
    }
  }

  switch (action.type){
    case types.HOME_REFRESH_ING: //刷新中...
      return{
        ...state,
        refreshState: RefreshState.HeaderRefreshing
      };
    case types.HOME_REFRESH_SUCCESS: //刷新成功
      return{
        ...state,
        refreshState: RefreshState.Idle,
        noMoreData: false,
        latitude: action.latitude,
        longitude: action.longitude,
        geohash: action.geohash,
        name: action.name,
        categoryList: action.categoryList,
        shopList: action.shopList
      };
    case types.HOME_REFRESH_FAIL: //刷新失败
      return{
        ...state,
        refreshState: RefreshState.Idle,
      };
    case types.HOME_LOAD_MORE_ING: //加载更多中...
      return{
        ...state,
        refreshState: RefreshState.FooterRefreshing,
      };
    case types.HOME_LOAD_MORE_SUCCESS: //加载更多
      return{
        ...state,
        refreshState: RefreshState.Idle,
        shopList: state.shopList.concat(action.shopList)
      };
    case types.HOME_LOAD_MORE_FAIL: //加载更多失败
      return{
        ...state,
        refreshState: RefreshState.Idle,
      };
    default:
      return state
  }
}