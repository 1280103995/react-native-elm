import HttpUtils from "./HttpUtils";

export default class AuthApi{

  /**
   * 获取图片验证码
   * @returns {返回Promise}
   */
  static fetchCaptcha(){
    return HttpUtils.post('/v1/captchas')
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
    return HttpUtils.post('/v4/mobile/verify_code/send',params)
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
    return HttpUtils.get('/v1/users/exists',params)
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
    return HttpUtils.post('/v1/mobile/verify_code/send',params)
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
    return HttpUtils.get('/v1/user',params)
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
    return HttpUtils.post('/v1/login/app_mobile',params)
  }

  /**
   * 账号密码登录
   * @param username
   * @param password
   * @param captcha_code
   * @returns {返回Promise}
   */
  static fetchAccountLogin(username, password, captcha_code){
    let formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
    formData.append("captcha_code",captcha_code);
    return HttpUtils.post('/v2/login',formData, true)
  }

  /**
   * 退出登录
   * @returns {返回Promise}
   */
  static fetchLogout(){
    return HttpUtils.get('/v2/signout')
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
    return HttpUtils.post('/v2/changepassword',params)
  }
}