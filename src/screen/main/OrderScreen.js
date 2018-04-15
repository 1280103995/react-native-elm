import React from 'react'
import {Text} from "react-native";
import BaseScreen from "../BaseScreen";

export default class OrderScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  // 构造
  constructor(props) {
    super(props);
    this.setTitle('订单列表');
    this.setGoBackVisible(false);
    // 初始状态
    this.state = {};
  }

  renderView() {
    return null
  }
}