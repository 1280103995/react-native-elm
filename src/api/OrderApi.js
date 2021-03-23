import {CreateApi} from './CreateApi';

const API = CreateApi();

export default class OrderApi{

  /**
   * 确认订单
   * @param geohash
   * @param entities
   * @param shopid
   * @returns {返回Promise}
   */
  static fetchCheckout(geohash, entities, shopid){
    const params = {
      come_from: "web",
      geohash,
      entities,
      restaurant_id: shopid,
    };
    return API.post('/v1/carts/checkout', params)}

  /**
   * 获取快速备注列表
   * @returns {返回Promise}
   */
  static fetchGetRemark(id){
    return API.get(`/v1/carts/${id}/remarks`)
  }

  /**
   * 下订单
   * @param user_id
   * @param cart_id
   * @param address_id
   * @param description
   * @param entities
   * @param geohash
   * @param sig
   * @returns {返回Promise}
   */
  static fetchPlaceOrders(user_id, cart_id, address_id, description, entities, geohash, sig){
    const params = {
      address_id,
      'come_from': "mobile_web",
      'deliver_time': "",
      description,
      entities,
      geohash,
      'paymethod_id': 1,
      sig,
    };
    return API.get(`/v1/users/${user_id}/carts/${cart_id}/orders`, params)}

  /**
   * 重新发送订单验证码
   * @param cart_id
   * @param sig
   * @param type
   * @returns {返回Promise}
   */
  static fetchrePostVerify(cart_id, sig, type){
    const params = {
      sig,
      type,
    };
    return API.get(`/v1/carts/${cart_id}/verify_code`, params)
  }

  /**
   * 下订单
   * @param user_id
   * @param cart_id
   * @param address_id
   * @param description
   * @param entities
   * @param geohash
   * @param sig
   * @param validation_code
   * @param validation_token
   */
  static fetchValidateOrders(user_id,
                             cart_id,
                             address_id,
                             description,
                             entities,
                             geohash,
                             sig,
                             validation_code,
                             validation_token){
    const params = {
      address_id,
      'come_from': "mobile_web",
      'deliver_time': "",
      description,
      entities,
      geohash,
      'paymethod_id': 1,
      sig,
      validation_code,
      validation_token,
    };
    return API.get(`/v1/users/${user_id}/carts/${cart_id}/orders`, params)
  }

  /**
   * 重新发送订单验证码
   * @param merchantOrderNo
   * @param userId
   * @returns {返回Promise}
   */
  static fetchPayRequest(merchantOrderNo, userId){
    const params = {
      'merchantId': 5,
      merchantOrderNo,
      'source': 'MOBILE_WAP',
      userId,
      'version': '1.0.0',
    };
    return API.get('/payapi/payment/queryOrder', params)
  }

  /**
   * 获取订单列表
   * @param user_id
   * @param offset
   * @returns {返回Promise}
   */
  static fetchOrderList(user_id, offset){
    const params = {
      limit: 10,
      offset,
    };
    return API.get(`/bos/v2/users/${user_id}/orders`, params)
  }

  /**
   * 获取订单详情
   * @param user_id
   * @param orderid
   * @returns {返回Promise}
   */
  static fetchOrderInfo(user_id, orderid){
    return API.get(`/bos/v1/users/${user_id}/orders/${orderid}/snapshot`)
  }

}
