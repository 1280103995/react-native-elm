import {XFetch} from "react-native-xfetch";
import Url from "../../api/Url";

export default class CategoryModel{

  /**
   * 获取food页面的 category 种类列表
   */
  static fetchFoodCategory(latitude, longitude){
    let params = {
      latitude,
      longitude
    };
    return new XFetch().get(Url.Category.category).setParams(params).do()
  }

  /**
   * 获取food页面的配送方式
   */
  static fetchFoodDelivery(latitude, longitude){
    let params = {
      latitude,
      longitude,
      kw: ''
    };
    return new XFetch().get(Url.Category.delivery).setParams(params).do()
  }

  /**
   * 获取food页面的商家属性活动列表
   */
  static fetchFoodActivity(latitude, longitude){
    let params = {
      latitude,
      longitude,
      kw: ''
    };
    return new XFetch().get(Url.Category.activity).setParams(params).do()
  }
}