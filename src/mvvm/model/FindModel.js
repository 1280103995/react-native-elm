import Url from "../../api/Url";
import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class FindModel{

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
    return API.get(Url.Find.search, params)
  }

}
