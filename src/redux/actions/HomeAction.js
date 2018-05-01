import LocationApi from "../../api/LocationApi";
import * as types from "./types/HomeType";

export function getHomeData() {
  return dispatch => {
    dispatch({type: types.HOME_REFRESH_ING});
    LocationApi.fetchCityGuess().then((res) => {
      getList(dispatch, res);
    }).catch((error)=>{
      dispatch({type: types.HOME_REFRESH_FAIL});
    })
  }
}

async function getList(dispatch, res){
  let categoryList = await LocationApi.fetchFoodTypes(res.geohash);
  let shopList = await LocationApi.fetchShopList(res.latitude, res.longitude, 0);
  dispatch(mergeData(res, categoryList, shopList));
}

function mergeData(cityInfo, cList, shopList) {
  let categoryList = computeCategory(cList);
  return {
    type: types.HOME_REFRESH_SUCCESS,
    latitude: cityInfo.latitude,
    longitude: cityInfo.longitude,
    geohash: cityInfo.latitude + ',' + cityInfo.longitude,
    name: cityInfo.name,
    categoryList,
    shopList
  }
}
/*把分类分成两页*/
function computeCategory(list) {
  let temp = [];
  const itemCount = 8;//一页8个分类
  const pageCount = list.length / itemCount;
  const last = list.length % 8; //余下的个数，不满一页8个的，如果=0则刚刚被整除
  for (let i = 0; i < pageCount; i++) {
    temp.push(list.slice(i * itemCount, (i + 1) * itemCount));
  }
  if (last > 0) {
    temp.push(list.slice(itemCount * pageCount, list.length))
  }
  return  temp
}

/*假设有加载更多*/
export function loadMoreShopList(latitude, longitude) {
  return dispatch => {
    dispatch({type: types.HOME_LOAD_MORE_ING});
    LocationApi.fetchShopList(latitude, longitude, 10).then((res)=>{
      dispatch({
        type: types.HOME_LOAD_MORE_SUCCESS,
        shopList:res
      })
    }).catch((error)=>{
      dispatch({type: types.HOME_LOAD_MORE_FAIL});
    })
  }
}

