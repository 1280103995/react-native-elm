import React from 'react';
import BaseScreen from "../../BaseScreen";
import Color from "../../../app/Color";
import {px2dp, wh} from "../../../utils/ScreenUtil";
import {StyleSheet, TouchableOpacity} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Column from "../../../view/Column";
import Input from "../../../view/Input";
import Divider from "../../../view/Divider";
import Image from "../../../view/Image";
import Button from "../../../view/Button";
import Toast from "../../../view/Toast";
import AuthModel from "../../../mvvm/model/AuthModel";

export default class ModifyPwdScreen extends BaseScreen{

  constructor(props) {
    super(props);
    this.setTitle('重置密码');
    this.state = {
      captcha:null
    };
    this.userName = props.navigation.state.params.userName;
    this.nameText = '';
    this.oldPwdText = '';
    this.pwdText = '';
    this.confirmPwdText = '';
    this.codeText = ''
  }

  componentDidMount() {
    this._fetchRefreshCaptcha()
  }

  _onBtnLoginClick = () => {
    if(this.nameText === ''){
      Toast.show('请输入手机号/邮箱/用户名');
      return
    }
    if(this.oldPwdText === ''){
      Toast.show('请输入旧密码');
      return
    }
    if(this.pwdText === ''){
      Toast.show('请输入新密码');
      return
    }
    if(this.confirmPwdText === ''){
      Toast.show('请输入确认密码');
      return
    }
    if(this.codeText === ''){
      Toast.show('请输入验证码');
      return
    }
    this._fetch()
  };

  _fetch = () => {
    AuthModel.fetchUpdatePwd(this.userName, this.nameText, this.oldPwdText,
      this.pwdText, this.confirmPwdText, this.codeText).then((res)=>{
      this.props.navigation.goBack();
      alert('修改密码成功')
    })
  };

  _fetchRefreshCaptcha = () => {
    AuthModel.fetchCaptcha().then((res)=>{
      this.setState({captcha: res.code})
    })
  };

  renderView(){
    return(
      <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Column style={styles.content}>
          <Input
            bgViewStyle={styles.input}
            label={'账号'}
            placeholder={'请输入账号'}
            onChangeText={(text) => this.nameText = text}/>
          <Divider/>
          <Input
            bgViewStyle={styles.input}
            label={'旧密码'}
            placeholder={'请输入旧密码'}
            secureTextEntry={true}
            onChangeText={(text) => this.oldPwdText = text}/>
          <Divider/>
          <Input
            bgViewStyle={styles.input}
            label={'新密码'}
            placeholder={'请输入新密码'}
            secureTextEntry={true}
            onChangeText={(text) => this.pwdText = text}/>
          <Divider/>
          <Input
            bgViewStyle={styles.input}
            label={'确认密码'}
            placeholder={'请输入确认密码'}
            secureTextEntry={true}
            onChangeText={(text) => this.confirmPwdText = text}/>
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
    borderRadius:px2dp(15)
  },
  captchaImgStyle:{
    ...wh(170,70),
    resizeMode:'contain'
  },
});
