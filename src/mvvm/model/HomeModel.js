import Url from "../../api/Url";
import {XFetch} from "react-native-xfetch";

export default class HomeModel{

  /**
   * 获取首页默认地址
   */
  static fetchCityGuess(){
    let params = {'type': 'guess'};
    return new XFetch().get(Url.Home.cityUrl).setParams(params).do()
  }

  /**
   * 获取msite页面食品分类列表
   */
  static fetchFoodTypes(geohash){
    let params = {
      'geohash': geohash,
      'group_type': '1',
      'flags[]': 'F'
    };
    return new XFetch().get(Url.Home.footType).do()
  }

  /**
   * 获取首页商家列表
   * @param latitude
   * @param longitude
   * @param offset
   * @param restaurant_category_id
   * @param restaurant_category_ids
   * @param order_by
   * @param delivery_mode
   * @param support_ids
   * @returns {返回Promise}
   */
  static fetchShopList(latitude,
                       longitude,
                       offset,
                       restaurant_category_id = '',
                       restaurant_category_ids = '',
                       order_by = '',
                       delivery_mode = '',
                       support_ids = []){
    let supportStr = '';
    support_ids.forEach(item => {
      if (item.status) {
        supportStr += '&support_ids[]=' + item.id;
      }
    });

    let params = {
      latitude,
      longitude,
      offset,
      limit: '20',
      'extras[]': 'activities',
      keyword: '',
      restaurant_category_id,
      'restaurant_category_ids[]': restaurant_category_ids,
      order_by,
      'delivery_mode[]': delivery_mode + supportStr
    };
    return new XFetch().get(Url.Home.shopList).setParams(params).do()
  }
}