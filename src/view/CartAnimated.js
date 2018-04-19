import React, {Component} from 'react'
import {Animated, Easing, View} from "react-native";
import {px2dp, wh} from "../utils/ScreenUtil";
import Color from "../app/Color";

export default class CartAnimated extends Component {

  constructor(props) {
    super(props);
    this.translate = new Animated.ValueXY(0, 0);
    this.state = {
      child: null,
      hide: true,
    }
  }

  /**
   * 开始动画
   * @param startPosition= {x: 0, y: 0}
   * @param endPosition= {x: 0, y: 0}
   * @param callBack
   */
  startAnim(startPosition, endPosition, callBack) {
    this.setState({hide: false});

    this.translate.setValue(startPosition);

    Animated.timing(this.translate, {
      toValue: endPosition,
      duration: 350,
      easing: Easing.linear,
    }).start(() => {
      callBack();
      this.setState({
        hide: true,
      })
    })
  }

  render() {
    return !this.state.hide ? <Animated.View
      style={{
        position: 'absolute',
        transform: [
          {
            translateY: this.translate.y,
          }, {
            translateX: this.translate.x,
          }]
      }}>
      <View style={{...wh(40), borderRadius: px2dp(20), backgroundColor: Color.theme}}/>
    </Animated.View> : null
  }
}