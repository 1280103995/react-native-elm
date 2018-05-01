import ShopAip from "../../api/ShopApi";
import * as types from "./types/FindType";

export function searchShop(geohash, keyWord) {
  return dispatch => {
    ShopAip.fethcSearchRestaurant(geohash, keyWord).then((res) => {
      if (res.length === 0) {
        dispatch(noResult())
      } else {
        dispatch({
          type: types.FIND_SHOP,
          hasShop: true,
          shopList: res
        })
      }
    }).catch((err) => {
      dispatch(noResult())
    }).finally(() => {
      dispatch({
        type: types.FIND_HISTORY_ADD,
        hasShop: false,
        keyWord,
      })
    })
  }
}

function noResult() {
  return {
    type: types.FIND_SHOP,
    hasShop: false,
    shopList: null
  }
}

//显示历史记录
export function noSearchResult() {
  return dispatch => {
    dispatch({
      type: types.FIND_HISTORY,
      hasHistory: true
    })
  }
}