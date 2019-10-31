import React from 'react';
import {StyleSheet} from 'react-native';
import BaseScreen from "../../BaseScreen";
import Column from "../../../view/Column";
import Input from "../../../view/Input";
import {paddingLR, paddingTB, px2dp} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Text from "../../../view/Text";
import Button from "../../../view/Button";
import Toast from "../../../view/Toast";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AuthModel from "../../../mvvm/model/AuthModel";

export default class ModifyUserNameScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('修改用户名');
    this.name = ''
  }

  _onBtnClick = () => {
    if (this.name === ''){
      Toast.show('请输入用户名');
      return
    }
    UserInfo.username = this.name;
    const navigation = this.props.navigation;
    navigation.state.params.callback(this.name);
    navigation.goBack()
  };

  renderView() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Column style={styles.container}>
          <Input
            style={styles.inputStyle}
            placeholder={'输入用户名'}
            onChangeText={(text) => this.name = text}
          />
          <Text microSize gray text={'用户名智能修改一次（5-24字符之间）'}/>
          <Button style={styles.btnStyle} title={'确认修改'} onPress={this._onBtnClick}/>
        </Column>
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    margin: px2dp(20)
  },
  inputStyle: {
    flex:1,
    ...paddingLR(10),
    ...paddingTB(15),
    marginBottom: px2dp(20),
    borderColor: Color.gray,
    borderWidth: px2dp(1),
    borderRadius: px2dp(3)
  },
  btnStyle: {
    height:px2dp(80),
    marginTop:px2dp(30)
  },
});
