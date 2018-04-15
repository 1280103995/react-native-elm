import HttpUtils from "./HttpUtils";

export default class RedPacketApi{

  /**
   * 获取服务中心信息
   * @returns {返回Promise}
   */
  static fetchGetSearch(){
    return HttpUtils.get('/v3/profile/explain')
  }

  /**
   * 兑换会员卡
   * @param id
   * @param number
   * @param password
   * @returns {返回Promise}
   */
  static fetchVipCart(id, number, password){
    let params = {
      number,
      password
    };
    return HttpUtils.post(`/member/v1/users/${id}/delivery_card/physical_card/bind`,params)
  }

  /**
   * 获取红包
   * @param id
   * @returns {返回Promise}
   */
  static fetchGetRedPacketNum(id){
    return HttpUtils.get(`/promotion/v2/users/${id}/hongbaos?limit=20&offset=0`)
  }

  /**
   * 获取过期红包
   * @param id
   * @returns {返回Promise}
   */
  static fetchGetExired(id){
    return HttpUtils.get(`/promotion/v2/users/${id}/expired_hongbaos?limit=20&offset=0`)
  }

  /**
   * 兑换红包
   * @param id
   * @param exchange_code
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchExChangeRedPacket(id, exchange_code, captcha_code){
    let params = {
      exchange_code,
      captcha_code,
    };
    return HttpUtils.post(`/v1/users/${id}/hongbao/exchange`)
  }
}