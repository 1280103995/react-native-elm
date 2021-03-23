import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class ShopInfoEvaluationModel{

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
    return API.get(`/ugc/v2/restaurants/${shopid}/ratings`, params)
  }

}
