import {XFetch} from "react-native-xfetch";

export default class OrderModel{

  /**
   * 获取订单列表
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchOrderList(user_id){
    let params = {
      limit: 10,
      offset: 0,
    };
    return new XFetch().get(`/bos/v2/users/${user_id}/orders`).setParams(params).do()
  }

}