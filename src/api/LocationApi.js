import {CreateApi} from './CreateApi';

const API = CreateApi();

export default class LocationApi{

  /**
   * 获取首页默认地址
   */
  static fetchCityGuess(){
    return API.get('/v1/cities/', {'type': 'guess'})
  }

  /**
   * 获取首页热门城市
   */
  static fetchHotCity(){
    return API.get('/v1/cities/', {'type': 'hot'})
  }

  /**
   * 获取首页所有城市
   */
  static fetchAllCtiy(){
    return API.get('/v1/cities/', {'type': 'group'})
  }

  /**
   * 获取当前所在城市
   */
  static fetchCurCtity(number){
    return API.get(`/v1/cities/${number}`)
  }

  /**
   * 获取搜索地址
   * @param city_id 城市ID
   * @param key_str 搜索关键字
   * @returns {返回Promise}
   */
  static fetchSearchPlace(city_id, key_str){
    const params = {
      'type': 'search',
      'city_id': city_id,
      'keyword': key_str
    };
    return API.get('/v1/pois', params)
  }

  /**
   * 获取msite页面地址
   * @param geohash 经纬 22.554773,113.880373
   * @returns {返回Promise}
   */
  static fetchMSiteAddress(geohash){
    return API.get(`/v2/pois/${geohash}`)
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
    return API.get('/v2/index_entry', params)
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
    return API.get('/shopping/restaurants', params)
  }
}
