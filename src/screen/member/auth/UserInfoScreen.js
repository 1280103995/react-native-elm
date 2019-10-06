import React from 'react'
import BaseScreen from "../../BaseScreen";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {marginLR, marginTB, paddingLR, paddingTB, px2dp, wh} from "../../../utils/ScreenUtil";
import Row from "../../../view/Row";
import Color from "../../../app/Color";
import Text from "../../../view/Text";
import Image from "../../../view/Image";
import Images from "../../../app/Images";
import Divider from "../../../view/Divider";
import Button from "../../../view/Button";
import LogoutDialog from '../../../dialog/LogoutDialog';

export default class UserInfoScreen extends BaseScreen {

  // 构造
  constructor(props) {
    super(props);
    this.setTitle('账号信息');
    // 初始状态
    this.state = {
      userName:UserInfo.username
    };
  }

  _onItemClick = (label) => {
    const navigation = this.props.navigation;
    if (label === '用户名'){
      navigation.navigate('ModifyUserName',{callback:this._handleModifySuccess})
    }else if (label === '收货地址'){
      navigation.navigate('Address',{chose:false})
    }else if (label === '登录密码'){
      navigation.navigate('ModifyPwd',{name:this.state.userName})
    }
  };

  _handleModifySuccess = (name) => {
    this.setState({userName:name})
  };

  _logoutBtnClick = () => {
    this.dialog.show()
  };

  _handleRightBth = () => {
    isLogin = false;
    const navigation = this.props.navigation;
    navigation.state.params.callback();
    navigation.goBack()
  };

  renderView() {
    return (
      <ScrollView style={styles.contain}>
        <Divider style={styles.headDividerStyle}/>
        {this._renderItem(null, '头像', <Image source={UserInfo.avatar} style={styles.iconHeadStyle}/>)}
        <Divider/>
        {this._renderItem(null, '用户名', <Text text={this.state.userName}/>)}
        <Divider/>
        {this._renderItem(null, '收货地址', null)}
        <Divider/>
        {this._renderItemType2('账号绑定')}
        {this._renderItem(this._renderPhoneIcon(), '手机', <Text text={UserInfo.mobile}/>)}
        {this._renderItemType2('安全设置')}
        {this._renderItem(null, '登录密码', <Text gray text={'修改'}/>)}
        <Button style={styles.logoutBtnStyle} title={'退出登录'} onPress={this._logoutBtnClick}/>
        <LogoutDialog ref={(d)=>this.dialog=d} handleRightBth={this._handleRightBth}/>
      </ScrollView>
    )
  }

  _renderItem = (img = null, label, view: Element = null) => {
    return (
      <TouchableOpacity onPress={() => this._onItemClick(label)} activeOpacity={0.6}>
        <Row verticalCenter style={styles.itemStyle}>
          <Row verticalCenter>
            {img !== null ? img : null}
            <Text text={label}/>
          </Row>

          <Row verticalCenter>
            {view !== null ? view : null}
            <Image source={Images.Common.arrowRight}
                   style={{...wh(25), marginLeft: px2dp(10), tintColor: Color.gray2}}/>
          </Row>
        </Row>
      </TouchableOpacity>
    )
  };

  _renderItemType2 = (label) => {
    return (
      <Row verticalCenter style={[styles.itemStyle, {backgroundColor: Color.background}]}>
        <Text text={label}/>
      </Row>
    )
  };

  _renderPhoneIcon = () => <Image source={Images.My.phone} style={styles.iconPhoneStyle}/>
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headDividerStyle:{
    height:px2dp(20),
    backgroundColor:Color.background
  },
  itemStyle: {
    justifyContent: 'space-between',
    ...paddingTB(25),
    ...paddingLR(20),
    backgroundColor: Color.white
  },
  iconHeadStyle: {
    ...wh(80),
    borderRadius: px2dp(30)
  },
  iconPhoneStyle: {
    ...wh(35),
    marginRight: px2dp(10),
    tintColor: Color.theme
  },
  logoutBtnStyle:{
    ...marginTB(50),
    ...marginLR(20),
    borderRadius:px2dp(5),
    height:px2dp(80)
  }
});
