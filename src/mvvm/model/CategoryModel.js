import Url from "../../api/Url";
import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class CategoryModel{

  /**
   * 获取food页面的 category 种类列表
   */
  static fetchFoodCategory(latitude, longitude){
    const params = {
      latitude,
      longitude
    };
    return API.get(Url.Category.category, params)
  }

  /**
   * 获取food页面的配送方式
   */
  static fetchFoodDelivery(latitude, longitude){
    const params = {
      latitude,
      longitude,
      kw: ''
    };
    return API.get(Url.Category.delivery, params)
  }

  /**
   * 获取food页面的商家属性活动列表
   */
  static fetchFoodActivity(latitude, longitude){
    const params = {
      latitude,
      longitude,
      kw: ''
    };
    return API.get(Url.Category.activity, params)
  }
}
