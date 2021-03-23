import {action, computed, observable} from "mobx";
import AuthModel from "../model/AuthModel";
import Toast from "../../view/Toast";

export default class LoginViewModel{

  @observable captcha = null;
  @observable nameText = '';
  @observable pwdText = '';
  @observable captchaText = '';

  /**
   * 获取验证码
   */
  fetchRefreshCaptcha = () => {
    AuthModel.fetchCaptcha().then((res)=>{
      this.captcha = res.data.code
    })
  };

  /**
   * 登录
   * @param navigation
   * @param nameText
   * @param pwdText
   * @param codeText
   */
  fetchAccountLogin(navigation) {
    if (this._checkNull()) {
      AuthModel.fetchAccountLogin(this.nameText, this.pwdText, this.captchaText).then((res) => {
        isLogin = true;
        UserInfo = res.data;
        navigation.state.params.callback();
        navigation.goBack()
      })
    }
  }

  _checkNull(){
    if(this.nameText === ''){
      Toast.show('请输入手机号/邮箱/用户名');
      return false
    }
    if(this.pwdText === ''){
      Toast.show('请输入密码');
      return false
    }
    if(this.captchaText === ''){
      Toast.show('请输入验证码');
      return false
    }
    return true
  }

  @computed
  get getCaptcha(){
    return this.captcha
  }

  @action
  setNameText(name: string){
    this.nameText = name
  }

  @action
  setPwdText(pwd: string){
    this.pwdText = pwd
  }

  @action
  setCaptchaText(captcha: string){
    this.captchaText = captcha
  }
}
