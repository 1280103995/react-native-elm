import {XFetch} from "react-native-xfetch";

export default class LocationApi{

  /**
   * 获取首页默认地址
   */
  static fetchCityGuess(){
    return new XFetch().get('/v1/cities/').setParams({'type': 'guess'}).do()
  }

  /**
   * 获取首页热门城市
   */
  static fetchHotCity(){
    return new XFetch().get('/v1/cities/').setParams({'type': 'hot'}).do()
  }

  /**
   * 获取首页所有城市
   */
  static fetchAllCtiy(){
    return new XFetch().get('/v1/cities/').setParams({'type': 'group'}).do()
  }

  /**
   * 获取当前所在城市
   */
  static fetchCurCtity(number){
    return new XFetch().get(`/v1/cities/${number}`).do()
  }

  /**
   * 获取搜索地址
   * @param city_id 城市ID
   * @param key_str 搜索关键字
   * @returns {返回Promise}
   */
  static fetchSearchPlace(city_id, key_str){
    let params = {
      'type': 'search',
      'city_id': city_id,
      'keyword': key_str
    };
    return new XFetch().get('/v1/pois').setParams(params).do()
  }

  /**
   * 获取msite页面地址
   * @param geohash 经纬 22.554773,113.880373
   * @returns {返回Promise}
   */
  static fetchMSiteAddress(geohash){
    return new XFetch().get(`/v2/pois/${geohash}`).do()
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
    return new XFetch().get('/v2/index_entry').setParams(params).do()
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
    return new XFetch().get('/shopping/restaurants').setParams(params).do()
  }
}