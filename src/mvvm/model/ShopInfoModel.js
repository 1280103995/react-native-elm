import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class ShopInfoModel{

  /**
   * 获取店铺详情
   * @param shopid
   * @param latitude
   * @param longitude
   * @returns {返回Promise}
   */
  static fetchShopDetails(shopid,latitude,longitude){
    const params = {
      latitude,
      'longitude':longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics',
    };
    return API.get(`/shopping/restaurant/${shopid}`, params)
  }

  /**
   * 获取shop页面菜单列表
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopGoodsList(shopid){
    const params = {
      'restaurant_id': shopid
    };
    return API.get('/shopping/v2/menu', params)
  }

  /**
   * 获取商铺评价列表
   * @returns {返回Promise}
   */
  static fetchShopRatingList(shopid){
    const params = {
      'has_content': true,
      'offset':0,
      'limit': 10,
      'tag_name':''
    };
    return new API.get(`/ugc/v2/restaurants/${shopid}/ratings`, params)
  }

  /**
   * 获取商铺评价分数
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopScores(shopid){
    return API.get(`/ugc/v2/restaurants/${shopid}/ratings/scores`)
  }

  /**
   * 获取商铺评价分类
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopRatingTags(shopid){
    return API.get(`/ugc/v2/restaurants/${shopid}/ratings/tags`)
  }

  /**
   * 获取search页面搜索结果
   * @param geohash
   * @param keyword
   * @returns {返回Promise}
   */
  static fethcSearchRestaurant(geohash, keyword){
    const params = {
      'extras[]': 'restaurant_activity',
      geohash,
      keyword,
      type: 'search'
    };
    return API.get('/v4/restaurants', params)
  }

}
