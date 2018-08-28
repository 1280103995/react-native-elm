import {XFetch} from "react-native-xfetch";

export default class FoodsApi{

  /**
   * 获取food页面的 category 种类列表
   */
  static fetchFoodCategory(latitude, longitude){
    let params = {
      latitude,
      longitude
    };
    return new XFetch().get('/shopping/v2/restaurant/category').setParams(params).do()
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
    return new XFetch().get('/shopping/v1/restaurants/delivery_modes').setParams(params).do()
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
    return new XFetch().get('/shopping/v1/restaurants/activity_attributes').setParams(params).do()
  }
}