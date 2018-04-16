import React from 'react';
import BaseScreen from "../BaseScreen";
import {ScrollView} from "react-native";
import Color from "../../app/Color";
import {marginTB, px2dp} from "../../utils/ScreenUtil";
import Text from "../../view/Text";

export default class BalanceQuestionScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('余额问题')
  }

  renderView() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: Color.white, padding: px2dp(20)}}>
        <Text text={'Q1: 使用余额的条件'}/>
        <Text mediumSize gray text={'为了保护账户安全，使用余额前必须先绑定手机号。'} style={{...marginTB(10)}}/>
        <Text text={'Q2: 余额可以怎么用？'}/>
        <Text mediumSize gray text={'余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。'}
              style={{...marginTB(10)}}/>
        <Text text={'Q3:我要如何提现？'}/>
        <Text mediumSize gray
              text={'为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。'}
              style={{...marginTB(10)}}/>
        <Text text={'Q4:为什么会提现失败？'}/>
        <Text mediumSize gray text={'可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。'}
              style={{...marginTB(10)}}/>
      </ScrollView>
    )
  }
}