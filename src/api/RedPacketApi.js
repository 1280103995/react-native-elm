import {XFetch} from "react-native-xfetch";

export default class RedPacketApi{

  /**
   * 获取服务中心信息
   * @returns {返回Promise}
   */
  static fetchGetSearch(){
    return new XFetch().get('/v3/profile/explain').do()
  }

  /**
   * 兑换会员卡
   * @param user_id
   * @param number
   * @param password
   * @returns {返回Promise}
   */
  static fetchVipCart(user_id, number, password){
    let params = {
      number,
      password
    };
    return new XFetch().post(`/member/v1/users/${user_id}/delivery_card/physical_card/bind`).setParams(params).do()
  }

  /**
   * 获取红包
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchGetRedPacketNum(user_id){
    return new XFetch().get(`/promotion/v2/users/${user_id}/hongbaos?limit=20&offset=0`).do()
  }

  /**
   * 获取过期红包
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchGetExired(user_id){
    return new XFetch().get(`/promotion/v2/users/${user_id}/expired_hongbaos?limit=20&offset=0`).do()
  }

  /**
   * 兑换红包
   * @param user_id
   * @param exchange_code
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchExChangeRedPacket(user_id, exchange_code, captcha_code){
    let params = {
      exchange_code,
      captcha_code,
    };
    return new XFetch().get(`/v1/users/${user_id}/hongbao/exchange`).do()
  }
}