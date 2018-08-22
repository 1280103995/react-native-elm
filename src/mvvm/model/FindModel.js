import {XFetch} from "react-native-xfetch";
import Url from "../../api/Url";

export default class FindModel{

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
    return new XFetch().get(Url.Find.search).setParams(params).do()
  }

}