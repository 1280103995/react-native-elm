import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Column from "../../../view/Column";
import {paddingLR, paddingTB, px2dp} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Input from "../../../view/Input";
import Button from "../../../view/Button";
import Row from "../../../view/Row";
import Text from "../../../view/Text";
import {observer} from "mobx-react";
import AddAddressViewModel from "../../../mvvm/viewmodel/AddAddressViewModel";

@observer
export default class AddAddressScreen extends BaseScreen {

  addressViewModel = new AddAddressViewModel();

  constructor(props) {
    super(props);
    this.setTitle('新增地址')
  }

  _onAddressClick = () => {
    this.toPage('SearchAddress',{callback:this._handleAddAddress})
  };

  _handleAddAddress = (address) => {
    // address:"地铁1号线(罗宝线),地铁5号线(环中线)等2条线路"
    // geohash:"22.554628,113.887171"
    // latitude:22.554628
    // longitude:113.887171
    // name:"宝安中心[地铁站]"
    this.addressViewModel.setItem2Value(true);
    this.addressViewModel.setGeohash(address.geohash);
    this.addressViewModel.setAddressName(address.name)
  };

  _onBtnClick = () => {
    this.addressViewModel.submitAddress(this.props.navigation, UserInfo.user_id)
  };

  renderView() {
    let addressViewModel = this.addressViewModel;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Column style={styles.contentStyle}>
          <Input
            style={styles.inputStyle}
            placeholder={'请填写您的姓名'}
            onChangeText={(text) => addressViewModel.setName(text)}
          />
          <TouchableOpacity onPress={this._onAddressClick} activeOpacity={1}>
            <Row style={styles.inputStyle}>
              <Text text={addressViewModel.getAddressName} style={{color:addressViewModel.getItem2Value ? Color.black: Color.gray3}}/>
            </Row>
          </TouchableOpacity>
          <Input
            style={styles.inputStyle}
            placeholder={'请填写详细送餐地址'}
            onChangeText={(text) => addressViewModel.setDetailAddress(text)}
          />
          <Input
            style={styles.inputStyle}
            keyboardType={'numeric'}
            placeholder={'请填写能够联系到您的手机号'}
            onChangeText={(text) => addressViewModel.setPhone(text)}
          />
          <Input
            style={[styles.inputStyle, {marginBottom: 0}]}
            keyboardType={'numeric'}
            placeholder={'备用联系电话（选填）'}
            onChangeText={(text) => addressViewModel.setPhone2(text)}
          />
        </Column>
        <Button title={'确定'} style={styles.btnStyle} onPress={this._onBtnClick}/>
      </KeyboardAwareScrollView>
    )
  }

}

const styles = StyleSheet.create({
  contentStyle: {
    padding: px2dp(20),
    marginTop: px2dp(20),
    backgroundColor: Color.white
  },
  inputStyle: {
    ...paddingLR(10),
    ...paddingTB(15),
    marginBottom: px2dp(20),
    borderWidth: px2dp(1),
    borderColor: Color.divider,
    borderRadius: px2dp(3),
    backgroundColor:Color.gray
  },
  btnStyle: {
    margin: px2dp(20),
    ...paddingTB(20),
    borderRadius: px2dp(5),
    backgroundColor: Color.reseda
  },
});
