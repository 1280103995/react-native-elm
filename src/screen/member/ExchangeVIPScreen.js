import React from 'react'
import BaseScreen from "../BaseScreen";
import {ScrollView, StyleSheet} from "react-native";
import Row from "../../view/Row";
import Text from "../../view/Text";
import {marginLR, paddingLR, paddingTB, px2dp} from "../../utils/ScreenUtil";
import Input from "../../view/Input";
import Divider from "../../view/Divider";
import Color from "../../app/Color";
import Button from "../../view/Button";
import Column from "../../view/Column";

export default class ExchangeVIPScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('兑换会员');
    this.state = {};
  }

  renderView() {
    return (
      <ScrollView style={styles.container}>
        <Row verticalCenter style={styles.rowStyle}>
          <Text gray text={'成功兑换后将关联到当前账号：'}/>
          <Text text={UserInfo.username} style={{fontWeight: '600'}}/>
        </Row>
        <Input
          bgViewStyle={[styles.rowStyle,{backgroundColor: Color.white}]}
          keyboardType={'numeric'}
          placeholder={'请输入与10位卡号'}
          onChangeText={(text) => null}/>
        <Divider/>
        <Input
          bgViewStyle={[styles.rowStyle,{backgroundColor: Color.white}]}
          keyboardType={'numeric'}
          placeholder={'请输入与6位卡密'}
          onChange={(text) => null}/>

        <Button title={'兑换'} style={styles.btnStyle}/>
        <Column style={styles.tipStyle}>
          <Text mediumSize gray text={'---温馨提示---'}/>
          <Column style={styles.tipContentStyle}>
            <Text mediumSize gray text={'新兑换的汇演服务，权益以"会员说明"为准。'}/>
            <Text mediumSize gray text={'月卡：30次减免配送费。'}/>
            <Text mediumSize gray text={'季卡：90次减免配送费。'}/>
            <Text mediumSize gray text={'年卡：360次减免配送费。'}/>
            <Text mediumSize gray text={'*仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）'}/>
          </Column>
        </Column>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowStyle:{
    ...paddingLR(25),
    ...paddingTB(20)
  },
  btnStyle:{
    height: px2dp(70),
    borderRadius: px2dp(5),
    margin: px2dp(25)
  },
  tipStyle:{
    marginTop: px2dp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  tipContentStyle:{
    flex: 1,
    ...marginLR(80,20),
    marginTop: px2dp(20)
  },
});
