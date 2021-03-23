import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class OrderModel{

  /**
   * 获取订单列表
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchOrderList(user_id){
    const params = {
      limit: 10,
      offset: 0,
    };
    return API.get(`/bos/v2/users/${user_id}/orders`, params)}

}
