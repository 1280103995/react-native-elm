import React from 'react';
import BaseScreen from "../BaseScreen";
import RNWebView from "../../view/RNWebView";

export default class PointMallScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('积分商城')
  }

  renderView() {
    return (
      <RNWebView
        source={{uri: 'https://www.duiba.com.cn/chome/index?spm=14695.1.1.1'}}
        domStorageEnabled={true}
        javaScriptEnabled={true}
      />
    )
  }
}
