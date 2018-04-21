import React from 'react';
import BaseScreen from "../BaseScreen";
import {ScrollView, TouchableOpacity,StyleSheet} from "react-native";
import Column from "../../view/Column";
import {paddingLR, paddingTB, px2dp, px2sp, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Text from "../../view/Text";
import CountDownView from "../../view/CountDownView";
import Row from "../../view/Row";
import Image from "../../view/Image";
import CheckBox from "../../view/CheckBox";
import Divider from "../../view/Divider";
import Button from "../../view/Button";
import Images from "../../app/Images";

export default class PayOnLineScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('在线支付');
    this.state = {
      selectIndex:0
    };
    this.endTime = new Date().getTime() + 1000 * 60 * 15
  }

  _onItemClick = (index) => {
    this.setState({selectIndex:index})
  };

  renderView() {
    return (
      <ScrollView style={styles.container}>
        <Column
          style={{height: px2dp(200), justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white}}>
          <Text mediumSize text={'支付剩余时间'} style={{marginBottom: px2dp(20)}}/>
          <CountDownView
            endTime={this.endTime}
            daysStyle={styles.time}
            hoursStyle={styles.time}
            minsStyle={styles.time}
            secsStyle={styles.time}
            firstColonStyle={styles.colon}
            secondColonStyle={styles.colon}
            onEnd={()=>alert('支付超时')}/>
        </Column>
        <Text text={'选择支付方式'} style={{...paddingLR(25), ...paddingTB(20)}}/>
        {this._renderItem(Images.PayOnLine.alipay, '支付宝', 0)}
        <Divider/>
        {this._renderItem(Images.PayOnLine.wechat, '微信', 1)}
        <Button title={'确认支付'} style={styles.btnStyle}/>
      </ScrollView>
    )
  }

  _renderItem = (img, label, index) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={()=>this._onItemClick(index)}>
        <Row verticalCenter style={styles.itemStyle}>
          <Row verticalCenter>
            <Image source={img} style={{...wh(80),marginRight:px2dp(10)}}/>
            <Text text={label}/>
          </Row>
          <CheckBox disabled checked={this.state.selectIndex === index}/>
        </Row>
      </TouchableOpacity>
    )
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemStyle:{
    justifyContent: 'space-between',
    ...paddingLR(25),
    ...paddingTB(20),
    backgroundColor: Color.white
  },
  //时间文字
  time: {
    fontSize: px2sp(50),
    fontWeight:'500',
    color: Color.black,
    paddingHorizontal: px2dp(3),
    marginHorizontal: px2dp(3)
  },
  //冒号
  colon: {
    fontSize: px2sp(50),
    fontWeight:'500',
    color: Color.black
  },
  btnStyle:{
    margin: px2dp(25),
    height:px2dp(70),
    borderRadius: px2dp(5),
    backgroundColor:Color.reseda
  },
});