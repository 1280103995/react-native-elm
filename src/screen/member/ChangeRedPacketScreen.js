import React from 'react';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import {marginTB, px2dp, wh} from "../../utils/ScreenUtil";
import Input from "../../view/Input";
import Color from "../../app/Color";
import {StyleSheet, TouchableOpacity} from "react-native";
import Image from "../../view/Image";
import AuthModel from "../../mvvm/model/AuthModel";
import Button from "../../view/Button";
import Toast from "../../view/Toast";
import RedPacketApi from "../../api/RedPacketApi";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default class ChangeRedPacketScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('兑换红包');
    this.state = {
      captcha:null
    };
    this.codeText = '';
    this.captchaText = ''
  }

  componentDidMount() {
    this._fetchRefreshCaptcha()
  }

  _fetchRefreshCaptcha(){
    AuthModel.fetchCaptcha().then((res)=>{
      this.setState({captcha: res.code})
    })
  };

  _fetch(){
    RedPacketApi.fetchExChangeRedPacket(UserInfo.user_id, this.codeText, this.captchaText).then((res)=>{
      this.props.navigation.goBack();
      Toast.show(res.data.success);
    })
  }

  _onBtnClick = () => {
    if(this.codeText === ''){
      Toast.show('请输入兑换码');
      return
    }
    if(this.captchaText === ''){
      Toast.show('请输入验证码');
      return
    }
    this._fetch()
  };

  renderView() {
    return (
      <KeyboardAwareScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Column>
          <Input
            bgViewStyle={styles.input}
            keyboardType={'numeric'}
            placeholder={'请输入兑换码'}
            onChangeText={(text) => this.codeText = text}
          />
          <Input
            bgViewStyle={[styles.input,{...marginTB(20)}]}
            keyboardType={'numeric'}
            placeholder={'请输入验证码'}
            onChangeText={(text) => this.captchaText = text}>
            <TouchableOpacity onPress={this._fetchRefreshCaptcha}>
              <Image
                source={decodeURIComponent(this.state.captcha)}
                style={styles.captchaImgStyle}
                needBaseUrl={false}/>
            </TouchableOpacity>
          </Input>

          <Button
            style={styles.btnStyle}
            title={'兑换'}
            onPress={this._onBtnClick}
          />
        </Column>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    margin: px2dp(20)
  },
  input:{
    padding: px2dp(10),
    borderRadius:px2dp(8),
    backgroundColor: Color.white
  },
  captchaImgStyle:{
    ...wh(170,70),
    resizeMode:'contain'
  },
  btnStyle:{
    height:px2dp(70),
    borderRadius:px2dp(8)
  },
});
