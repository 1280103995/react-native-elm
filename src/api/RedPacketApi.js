import {CreateApi} from './CreateApi';

const API = CreateApi();

export default class RedPacketApi{

  /**
   * 获取服务中心信息
   * @returns {返回Promise}
   */
  static fetchGetSearch(){
    return API.get('/v3/profile/explain')
  }

  /**
   * 兑换会员卡
   * @param user_id
   * @param number
   * @param password
   * @returns {返回Promise}
   */
  static fetchVipCart(user_id, number, password){
    const params = {
      number,
      password
    };
    return API.post(`/member/v1/users/${user_id}/delivery_card/physical_card/bind`, params)
  }

  /**
   * 获取红包
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchGetRedPacketNum(user_id){
    return API.get(`/promotion/v2/users/${user_id}/hongbaos?limit=20&offset=0`)
  }

  /**
   * 获取过期红包
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchGetExired(user_id){
    return API.get(`/promotion/v2/users/${user_id}/expired_hongbaos?limit=20&offset=0`)
  }

  /**
   * 兑换红包
   * @param user_id
   * @param exchange_code
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchExChangeRedPacket(user_id, exchange_code, captcha_code){
    const params = {
      exchange_code,
      captcha_code,
    };
    return API.get(`/v1/users/${user_id}/hongbao/exchange`, params)
  }
}
