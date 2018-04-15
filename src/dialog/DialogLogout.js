import React from 'react';
import {View} from "react-native";
import Text from "../view/Text";
import Row from "../view/Row";
import Button from "../view/Button";
import Color from "../app/Color";
import {px2dp, px2sp, wh} from "../utils/ScreenUtil";
import PropTypes from 'prop-types';
import DialogBase from "./DialogBase";

export default class DialogLogout extends DialogBase {

  // 根据需要设置默认属性
  // static defaultProps = {
  //   type: 'zoomOut',
  //   modal: true,
  // };

  static propTypes = {
    handleRightBth: PropTypes.func
  };

  renderContent() {
    return (
      <View style={{
        backgroundColor: 'white',
        minWidth: 260,
        minHeight: 180,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text text={'确定退出吗？'} style={{fontSize: px2sp(40), marginBottom: px2dp(60)}}/>
        <Row verticalCenter>
          <Button style={{...wh(150, 65), backgroundColor: Color.gray2}} title={'再等等'} onPress={() => this.hide()}/>
          <Button style={{...wh(150, 65), backgroundColor: Color.orange, marginLeft: px2dp(30)}} title={'退出登录'}
                  onPress={this._onRightBtnClick}/>
        </Row>
      </View>
    )
  }

  _onRightBtnClick = () => {
    this.hide();
    this.props.handleRightBth()
  }
}