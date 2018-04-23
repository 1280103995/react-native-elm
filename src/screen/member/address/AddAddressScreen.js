import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import BaseScreen from "../../BaseScreen";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Column from "../../../view/Column";
import {paddingLR, paddingTB, px2dp, px2sp} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Input from "../../../view/Input";
import Button from "../../../view/Button";
import Row from "../../../view/Row";
import Text from "../../../view/Text";
import AddressApi from "../../../api/AddressApi";
import Toast from "../../../view/Toast";

export default class AddAddressScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('新增地址');
    this.state = {
      item2HasValue:false, //用来判断小区那一栏是否有值，有则更新字体颜色
      addressName:'小区/写字楼/学校等',
    };
    this.address = null; //回调回来的地址对象
    this.name = '';
    this.detailAddress = '';
    this.phone = '';
    this.phone2 = '';
  }

  _onAddressClick = () => {
    const navigation = this.props.navigation;
    navigation.navigate('SearchAddress',{callback:this._handleAddAddress})
  };

  _handleAddAddress = (address) => {
    // address:"地铁1号线(罗宝线),地铁5号线(环中线)等2条线路"
    // geohash:"22.554628,113.887171"
    // latitude:22.554628
    // longitude:113.887171
    // name:"宝安中心[地铁站]"
    this.address = address;
    this.setState({
      item2HasValue: true,
      addressName: address.name
    })
  };

  _onBtnClick = () => {
    if (this.name === ''){
      Toast.show('请输入您的姓名');
      return
    }
    if (this.state.addressName === ''){
      Toast.show('请选择地址');
      return
    }
    if (this.detailAddress === ''){
      Toast.show('请填写详细送餐地址');
      return
    }
    if (this.phone === ''){
      Toast.show('请输入手机号');
      return
    }
    this._fetchAddress()
  };

  _fetchAddress(){
    AddressApi.fetchAddAddress(UserInfo.user_id,this.state.addressName,
      this.detailAddress,this.address.geohash,this.name,this.phone,this.phone2,).then((res)=>{
      Toast.show(res.success);
      const navigation = this.props.navigation;
      navigation.state.params.callback(true);
      navigation.goBack()
    })
  }

  renderView() {
    return (
      <KeyboardAwareScrollView>
        <Column style={styles.contentStyle}>
          <Input
            style={styles.inputStyle}
            placeholder={'请填写您的姓名'}
            onChangeText={(text) => this.name = text}
          />
          <TouchableOpacity onPress={this._onAddressClick} activeOpacity={1}>
            <Row style={styles.inputStyle}>
              <Text text={this.state.addressName} style={{color:this.state.item2HasValue ? Color.black: Color.gray3}}/>
            </Row>
          </TouchableOpacity>
          <Input
            style={styles.inputStyle}
            placeholder={'请填写详细送餐地址'}
            onChangeText={(text) => this.detailAddress = text}
          />
          <Input
            style={styles.inputStyle}
            placeholder={'请填写能够联系到您的手机号'}
            onChangeText={(text) => this.phone = text}
          />
          <Input
            style={[styles.inputStyle, {marginBottom: 0}]}
            placeholder={'备用联系电话（选填）'}
            onChangeText={(text) => this.phone2 = text}
          />
        </Column>
        <Button title={'新增地址'} style={styles.btnStyle} onPress={this._onBtnClick}/>
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