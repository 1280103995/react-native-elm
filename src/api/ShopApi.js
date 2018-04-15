import HttpUtils from "./HttpUtils";

export default class ShopAip{

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
    return HttpUtils.get(`/shopping/restaurant/${shopid}`,params)
  }

  /**
   * 获取shop页面菜单列表
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopGoodsList(shopid){
    return HttpUtils.get('/shopping/v2/menu',{'restaurant_id': shopid})
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
    return HttpUtils.get(`/ugc/v2/restaurants/${shopid}/ratings`,params)
  }

  /**
   * 获取商铺评价分数
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopScores(shopid){
    return HttpUtils.get(`/ugc/v2/restaurants/${shopid}/ratings/scores`)
  }

  /**
   * 获取商铺评价分类
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchShopRatingTags(shopid){
    return HttpUtils.get(`/ugc/v2/restaurants/${shopid}/ratings/tags`)
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
    return HttpUtils.get('/v4/restaurants',params)
  }
}