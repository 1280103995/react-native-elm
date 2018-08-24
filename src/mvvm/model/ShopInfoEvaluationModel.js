import {XFetch} from "react-native-xfetch";

export default class ShopInfoEvaluationModel{

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

}