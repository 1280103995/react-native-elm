import {CreateApi} from "../../api/CreateApi";

const API = CreateApi();

export default class AuthModel{

  /**
   * 获取图片验证码
   * @returns {返回Promise}
   */
  static fetchCaptcha(){
    // return API.post('/v1/captchas').useCookie(true).do()
    return API.post('/v1/captchas')
  }

  /**
   * 获取短信验证码
   * @param phone
   * @returns {返回Promise}
   */
  static fetchSms(phone){
    const params = {
      mobile: phone,
      scene: 'login',
      type: 'sms'
    };
    return API.post('/v4/mobile/verify_code/send', params)
  }

  /**
   * 检测帐号是否存在
   * @param checkNumber
   * @param type
   * @returns {返回Promise}
   */
  static fetchCheckExist(checkNumber, type){
    const params = {
      [type]: checkNumber,
      type
    };
    return API.post('/v1/users/exists', params)
  }

  /**
   * 发送帐号
   * @param sendData
   * @param captcha_code
   * @param type
   * @param password
   * @returns {返回Promise}
   */
  static fetchSendMobile(sendData, captcha_code, type, password){
    const params = {
      action: "send",
      captcha_code,
      [type]: sendData,
      type: "sms",
      way: type,
      password,
    };
    return API.post('/v1/mobile/verify_code/send',params)
  }

  /**
   * 获取用户信息
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchUserInfo(user_id){
    const params = {
      user_id
    };
    return API.get('/v1/user',params)
  }

  /**
   * 手机号登录
   * @param code
   * @param mobile
   * @param validate_token
   * @returns {返回Promise}
   */
  static fetchMobileLogin(code, mobile, validate_token){
    const params = {
      code,
      mobile,
      validate_token
    };
    return API.post('/v1/login/app_mobile',params)
  }

  /**
   * 账号密码登录
   * @param username
   * @param password
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchAccountLogin(username, password, captcha_code){
    let formData = {username,password,captcha_code};
    // return API.post('/v2/login', formData).useCookie(true).do()
    return API.post('/v2/login', formData)
  }

  /**
   * 退出登录
   * @returns {返回Promise}
   */
  static fetchLogout(){
    return API.get('/v2/signout')
  }

  /**
   * 改密码
   * @param username
   * @param oldpassWord
   * @param newpassword
   * @param confirmpassword
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchUpdatePwd(username, oldpassWord, newpassword, confirmpassword, captcha_code){
    const params = {
      username,
      oldpassWord,
      newpassword,
      confirmpassword,
      captcha_code
    };
    return API.post('/v2/changepassword', params)
  }
}
