import {XFetch} from "react-native-xfetch";

export default class AuthModel{

  /**
   * 获取图片验证码
   * @returns {返回Promise}
   */
  static fetchCaptcha(){
    return new XFetch().post('/v1/captchas').do()
  }

  /**
   * 获取短信验证码
   * @param phone
   * @returns {返回Promise}
   */
  static fetchSms(phone){
    let params = {
      mobile: phone,
      scene: 'login',
      type: 'sms'
    };
    return new XFetch().post('/v4/mobile/verify_code/send').setParams(params).do()
  }

  /**
   * 检测帐号是否存在
   * @param checkNumber
   * @param type
   * @returns {返回Promise}
   */
  static fetchCheckExist(checkNumber, type){
    let params = {
      [type]: checkNumber,
      type
    };
    return new XFetch().post('/v1/users/exists').setParams(params).do()
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
    let params = {
      action: "send",
      captcha_code,
      [type]: sendData,
      type: "sms",
      way: type,
      password,
    };
    return new XFetch().post('/v1/mobile/verify_code/send').setParams(params).do()
  }

  /**
   * 获取用户信息
   * @param user_id
   * @returns {返回Promise}
   */
  static fetchUserInfo(user_id){
    let params = {
      user_id
    };
    return new XFetch().get('/v1/user').setParams(params).do()
  }

  /**
   * 手机号登录
   * @param code
   * @param mobile
   * @param validate_token
   * @returns {返回Promise}
   */
  static fetchMobileLogin(code, mobile, validate_token){
    let params = {
      code,
      mobile,
      validate_token
    };
    return new XFetch().post('/v1/login/app_mobile').setParams(params).do()
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
    let header = {
      'Accept': 'application/json',
      'Cookie': cookie !== null ? `${cookie}; cap=${captcha_code}` : 'cap=' + captcha_code
    };
    return new XFetch().post('/v2/login').setHeaders(header).setParams(formData).do()
  }

  /**
   * 退出登录
   * @returns {返回Promise}
   */
  static fetchLogout(){
    return new XFetch().get('/v2/signout').do()
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
    let params = {
      username,
      oldpassWord,
      newpassword,
      confirmpassword,
      captcha_code
    };
    return new XFetch().post('/v2/changepassword').setParams(params).do()
  }
}