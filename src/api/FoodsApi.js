import HttpUtils from "./HttpUtils";

export default class FoodsApi{

  /**
   * 获取food页面的 category 种类列表
   */
  static fetchFoodCategory(latitude, longitude){
    let params = {
      latitude,
      longitude
    };
    return HttpUtils.get('/shopping/v2/restaurant/category',params)
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
    return HttpUtils.get('/shopping/v1/restaurants/delivery_modes',params)
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
    return HttpUtils.get('/shopping/v1/restaurants/activity_attributes',params)
  }
}