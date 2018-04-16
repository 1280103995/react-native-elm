import React from 'react';
import BaseScreen from "../BaseScreen";
import {ScrollView} from "react-native";
import Color from "../../app/Color";
import {marginTB, px2dp} from "../../utils/ScreenUtil";
import Text from "../../view/Text";

export default class PointQuestionScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('积分问题')
  }

  renderView() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: Color.white, padding: px2dp(20)}}>
        <Text text={'Q1: 怎么获得积分？'}/>
        <Text mediumSize gray text={'在线支付的订单将获得订单积分奖励：'} style={{...marginTB(10)}}/>
        <Text mediumSize gray text={'积分将在用户完成评价后获得。'} style={{...marginTB(10)}}/>
        <Text mediumSize gray text={'可获得积分=订单金额×10（即1元=10点积分）。：'} style={{...marginTB(10)}}/>
        <Text mediumSize gray text={'订单金额指实际付款金额，不包含活动优惠金额。'} style={{...marginTB(10)}}/>
        <Text mediumSize gray text={'每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。'} style={{...marginTB(10)}}/>
        <Text text={'Q2: 积分用来做什么？'}/>
        <Text mediumSize gray text={'可以在积分商城兑换各种礼品。'}
              style={{...marginTB(10)}}/>
        <Text text={'Q3: 礼品兑换很多天了还没有收到，该怎么办？'}/>
        <Text mediumSize gray
              text={'礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。'}
              style={{...marginTB(10)}}/>
        <Text text={'Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？'}/>
        <Text mediumSize gray text={'不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。'}
              style={{...marginTB(10)}}/>
      </ScrollView>
    )
  }
}