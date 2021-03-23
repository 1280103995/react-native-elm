import {CreateApi} from './CreateApi';

const API = CreateApi();

export default class FoodsApi {

  /**
   * 获取food页面的 category 种类列表
   */
  static fetchFoodCategory(latitude, longitude) {
    const params = {
      latitude,
      longitude
    };
    return API.get('/shopping/v2/restaurant/category', params)
  }

  /**
   * 获取food页面的配送方式
   */
  static fetchFoodDelivery(latitude, longitude) {
    const params = {
      latitude,
      longitude,
      kw: ''
    };
    return API.get('/shopping/v1/restaurants/delivery_modes', params)
  }

  /**
   * 获取food页面的商家属性活动列表
   */
  static fetchFoodActivity(latitude, longitude) {
    const params = {
      latitude,
      longitude,
      kw: ''
    };
    return API.get('/shopping/v1/restaurants/activity_attributes', params)
  }
}
