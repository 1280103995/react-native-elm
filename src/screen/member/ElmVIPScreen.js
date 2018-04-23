import React from 'react'
import BaseScreen from "../BaseScreen";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import Text from "../../view/Text";
import {marginLR, marginTB, paddingLR, paddingTB, px2dp, wh} from "../../utils/ScreenUtil";
import Column from "../../view/Column";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Image from "../../view/Image";
import Images from "../../app/Images";
import Divider from "../../view/Divider";
import VIPDesScreen from "./VIPDesScreen";

export default class ElmVIPScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('会员中心');
    this.state = {};
  }

  _buyClick = () => {
    this.props.navigation.navigate('PayOnLine')
  };

  _onVipDes = () => {
    this.props.navigation.navigate('VIPDes')
  };

  _onItemClick = (label) => {
    if (label === '兑换会员'){
      this.props.navigation.navigate('ExchangeVIP')
    } else {
      this.props.navigation.navigate('BuyRecord')
    }
  };

  renderView() {
    return (
      <ScrollView>
        <Row verticalCenter>
          <Text gray text={'为账号'} style={{...marginLR(25,0),...marginTB(20)}}/>
          <Text text={UserInfo.username} style={{fontWeight: '600',...marginLR(6)}}/>
          <Text gray text={'购买会员'}/>
        </Row>

        <Column style={{...paddingLR(25,20),...paddingTB(20), backgroundColor: Color.white}}>
          <Row verticalCenter style={{justifyContent: 'space-between'}}>
            <Text largeSize text={'会员特权'}/>
            <TouchableOpacity onPress={this._onVipDes}>
              <Row verticalCenter>
                <Text text={'会员说明'}/>
                <Image source={Images.Common.arrowRight} style={styles.arrowStyle}/>
              </Row>
            </TouchableOpacity>
          </Row>
          <Divider style={{marginTop:px2dp(25)}}/>
          {this._renderActivity()}
          <Divider/>
          {this._renderActivity()}
        </Column>

        <Column style={{marginTop: px2dp(20), backgroundColor: Color.white}}>
          <Text text={'开通会员'} style={{margin: px2dp(25)}}/>
          <Divider style={{marginLeft: px2dp(25)}}/>
          <Row verticalCenter style={{justifyContent: 'space-between', ...paddingLR(25),...paddingTB(20)}}>
            <Row verticalCenter>
              <Text text={'1个月'}/>
              <Text orange text={`￥${20}`} style={{fontWeight: '600'}}/>
            </Row>

            <TouchableOpacity onPress={this._buyClick}>
              <Text orange text={'购买'}/>
            </TouchableOpacity>
          </Row>
        </Column>

        {this._renderItem('兑换会员', '使用卡号卡密')}
        {this._renderItem('购买记录', '开发票')}
        <Divider style={{height: px2dp(20), backgroundColor: Color.background}}/>
      </ScrollView>
    )
  }

  _renderActivity = () => {
    return(
      <Row style={{padding: px2dp(25)}}>
        <Image source={Images.Main.homeTabClick} style={{...wh(100), marginRight: px2dp(15)}}/>
        <Column style={{flex:1}}>
          <Text text={'减免配送费'}/>
          <Text mediumSize gray text={'每月减免30单，每日可减免3单，每单最高减4元'}/>
          <Text mediumSize gray text={'蜂鸟专送专享'}/>
        </Column>
      </Row>
    )
  };

  _renderItem = (label, text) => {
    return (
      <TouchableOpacity onPress={()=>this._onItemClick(label)}>
        <Row verticalCenter style={styles.itemStyle}>
          <Text text={label}/>
          <Row verticalCenter>
            <Text mediumSize gray text={text}/>
            <Image source={Images.Common.arrowRight} style={styles.arrowStyle}/>
          </Row>
        </Row>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  arrowStyle:{
    ...wh(20),
    marginLeft: px2dp(10),
    tintColor:Color.gray2
  },
  itemStyle:{
    justifyContent: 'space-between',
    marginTop: px2dp(20),
    ...paddingLR(25),
    ...paddingTB(20),
    backgroundColor: Color.white
  },
});