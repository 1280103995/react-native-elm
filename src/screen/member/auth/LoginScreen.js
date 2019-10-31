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
import CheckBox from "../../../view/CheckBox";
import Images from "../../../app/Images";
import LoginViewModel from "../../../mvvm/viewmodel/LoginViewModel";
import {observer} from "mobx-react";

@observer
export default class LoginScreen extends BaseScreen {

  loginViewModel = new LoginViewModel();

  constructor(props) {
    super(props);
    this.setTitle('密码登录');
    //写死账号信息，不用填写了
    this.loginViewModel.setNameText('布丁');
    this.loginViewModel.setPwdText('123456');
  }

  _passwordVisible = (state) => {
    this.pwd.setNativeProps({
      secureTextEntry: !state
    })
  };

  componentDidMount() {
    this._fetchCaptcha()
  }

  _fetchCaptcha = () => {
    //获取验证码
    this.loginViewModel.fetchRefreshCaptcha()
  };

  _fetchLogin = () =>{
    //请求登录
    this.loginViewModel.fetchAccountLogin(this.props.navigation)
  };

  renderView() {
    return (
      <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Column style={styles.content}>
          <Input
            bgViewStyle={styles.input}
            label={'账号'}
            value={'布丁'}
            placeholder={'请输入账号'}
            onChangeText={(text) => this.loginViewModel.setNameText(text)}/>
          <Divider/>
          <Input
            id={(p)=>this.pwd=p}
            bgViewStyle={styles.input}
            label={'密码'}
            value={'123456'}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            onChangeText={(text) => this.loginViewModel.setPwdText(text)}>
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
            keyboardType={'numeric'}
            onChangeText={(text) => this.loginViewModel.setCaptchaText(text)}>
            <TouchableOpacity onPress={this._fetchCaptcha}>
              <Image
                source={decodeURIComponent(this.loginViewModel.getCaptcha)}
                style={styles.captchaImgStyle}
                needBaseUrl={false}/>
            </TouchableOpacity>
          </Input>
        </Column>
        <Button
          style={styles.btnStyle}
          title={'确定'}
          onPress={this._fetchLogin}/>
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
