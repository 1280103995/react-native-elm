import React from 'react'
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Column from "../../../view/Column";
import {px2dp, wh} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Input from "../../../view/Input";
import Divider from "../../../view/Divider";
import {StyleSheet, TouchableOpacity} from "react-native";
import Button from "../../../view/Button";
import Image from "../../../view/Image";
import AuthApi from "../../../api/AuthApi";
import CheckBox from "../../../view/CheckBox";
import Images from "../../../app/Images";
import Toast from "../../../view/Toast";

export default class LoginScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('密码登录');
    this.state = {
      captcha:null
    };
    this.nameText = '';
    this.pwdText = '';
    this.codeText = ''
  }

  _passwordVisible = (state) => {
    this.pwd.setNativeProps({
      secureTextEntry: !state
    });
  };

  _onBtnLoginClick = () => {
    if(this.nameText === ''){
      Toast.show('请输入手机号/邮箱/用户名');
      return
    }
    if(this.pwdText === ''){
      Toast.show('请输入密码');
      return
    }
    if(this.codeText === ''){
      Toast.show('请输入验证码');
      return
    }
    this._fetchLogin()
  };

  componentDidMount() {
    this._fetchRefreshCaptcha()
  }
  _fetchRefreshCaptcha = () => {
    AuthApi.fetchCaptcha().then((res)=>{
      this.setState({captcha: res.code})
    })
  };

  _fetchLogin(){
    AuthApi.fetchAccountLogin(this.nameText,this.pwdText,this.codeText).then((res)=>{
      isLogin = true;
      UserInfo = res;
      const navigation = this.props.navigation;
      navigation.state.params.callback();
      navigation.goBack()
    })
  }

  renderView() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Column style={styles.content}>
          <Input
            bgViewStyle={styles.input}
            label={'账号'}
            placeholder={'请输入账号'}
            onChangeText={(text) => this.nameText = text}/>
          <Divider/>
          <Input
            id={(p)=>this.pwd=p}
            bgViewStyle={styles.input}
            label={'密码'}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            onChangeText={(text) => this.pwdText = text}>
            <CheckBox
              tintColorEnable={false}
              checkedIcon={Images.Login.hidePwd}
              uncheckedIcon={Images.Login.showPwd}
              onChange={this._passwordVisible}/>
          </Input>
          <Divider/>
          <Input
            bgViewStyle={styles.input}
            label={'验证码'}
            placeholder={'请输入验证码'}
            onChangeText={(text) => this.codeText = text}>
            <TouchableOpacity onPress={this._fetchRefreshCaptcha}>
              <Image
                source={decodeURIComponent(this.state.captcha)}
                style={styles.captchaImgStyle}
                needBaseUrl={false}/>
            </TouchableOpacity>
          </Input>
        </Column>
        <Button
          style={styles.btnStyle}
          title={'确定'}
          onPress={this._onBtnLoginClick}/>
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  content:{
    marginTop: px2dp(20),
    backgroundColor: Color.white
  },
  input:{
    padding: px2dp(20)
  },
  btnStyle:{
    height:px2dp(88),
    margin:px2dp(30),
    borderRadius:px2dp(10)
  },
  captchaImgStyle:{
    ...wh(170,70),
    resizeMode:'contain'
  },
});