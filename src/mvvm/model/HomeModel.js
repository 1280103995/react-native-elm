import Url from "../../api/Url";
import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class HomeModel{

  /**
   * 获取首页默认地址
   */
  static fetchCityGuess(){
    const params = {'type': 'guess'};
    return API.get(Url.Home.cityUrl, params)
  }

  /**
   * 获取msite页面食品分类列表
   */
  static fetchFoodTypes(geohash){
    const params = {
      'geohash': geohash,
      'group_type': '1',
      'flags[]': 'F'
    };
    return API.get(Url.Home.footType, params)
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

    const params = {
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
    return API.get(Url.Home.shopList, params)
  }

  static getWeather(cityName: string){
    const param = {
        'city': cityName
    };
    return API.get('http://wthrcdn.etouch.cn/weather_mini', param)
  }
}
