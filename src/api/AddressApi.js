import HttpUtils from "./HttpUtils";

export default class AddressApi{

  /**
   * 获取地址列表
   * @param id
   * @param sig
   * @returns {返回Promise}
   */
  static fetchGetAddress(id, sig){
    let params = {
      sig
    };
    return HttpUtils.get(`/v1/carts/${id}/addresses`,params)
  }

  /**
   * 搜索地址
   * @param keyword
   * @returns {返回Promise}
   */
  static fetchSearchNearby(keyword){
    let params = {
      'type': 'nearby',
      keyword
    };
    return HttpUtils.get('/v1/pois',params)
  }

  /**
   * 添加地址
   * @param userId
   * @param address
   * @param address_detail
   * @param geohash
   * @param name
   * @param phone
   * @param phone_bk
   * @param poi_type
   * @param sex
   * @param tag
   * @param tag_type
   * @returns {返回Promise}
   */
  static fetchAddAddress(userId, address, address_detail, geohash, name, phone, phone_bk,
                         poi_type = 0, sex = 1, tag = '公司', tag_type = 4){
    let params = {
      address,
      address_detail,
      geohash,
      name,
      phone,
      phone_bk,
      poi_type,
      sex,
      tag,
      tag_type,
    };
    return HttpUtils.post(`/v1/users/${userId}/addresses`,params)
  }

  /**
   * 个人中心里编辑地址
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchGetAddressList(user_id){
    return HttpUtils.get(`/v1/users/${user_id}/addresses`)
  }

  /**
   * 个人中心里搜索地址
   * @returns {返回Promise}
   */
  static fetchGetSearchAddress(){
    let params = {
      keyword:keyword,
      type:'nearby'
    };
    return HttpUtils.get('v1/pois',params)
  }

  /**
   * 删除地址
   * @param userid
   * @param addressid
   * @returns {返回Promise}
   */
  static fetchDeleteAddress(userid, addressid){
    return HttpUtils.delete(`/v1/users/${userid}/addresses/${addressid}`)
  }
}