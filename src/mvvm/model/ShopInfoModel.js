import {XFetch} from "react-native-xfetch";

export default class ShopInfoModel{

  /**
   * 获取店铺详情
   * @param shopid
   * @param latitude
   * @param longitude
   * @returns {返回Promise}
   */
  static fetchShopDetails(shopid,latitude,longitude){
    let params = {
      latitude,
      'longitude':longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics',
    };
    return new XFetch().get(`/shopping/restaurant/${shopid}`).setParams(params).do()
  }

  /**
   * 获取shop页面菜单列表
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopGoodsList(shopid){
    let params = {
      'restaurant_id': shopid
    };
    return new XFetch().get('/shopping/v2/menu').setParams(params).do()
  }

  /**
   * 获取商铺评价列表
   * @returns {返回Promise}
   */
  static fetchShopRatingList(shopid){
    let params = {
      'has_content': true,
      'offset':0,
      'limit': 10,
      'tag_name':''
    };
    return new XFetch().get(`/ugc/v2/restaurants/${shopid}/ratings`).setParams(params).do()
  }

  /**
   * 获取商铺评价分数
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopScores(shopid){
    return new XFetch().get(`/ugc/v2/restaurants/${shopid}/ratings/scores`).do()
  }

  /**
   * 获取商铺评价分类
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopRatingTags(shopid){
    return new XFetch().get(`/ugc/v2/restaurants/${shopid}/ratings/tags`).do()
  }

  /**
   * 获取search页面搜索结果
   * @param geohash
   * @param keyword
   * @returns {返回Promise}
   */
  static fethcSearchRestaurant(geohash, keyword){
    let params = {
      'extras[]': 'restaurant_activity',
      geohash,
      keyword,
      type: 'search'
    };
    return new XFetch().get('/v4/restaurants').setParams(params).do()
  }

}