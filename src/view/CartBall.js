import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native';
import {px2dp, wh} from '../utils/ScreenUtil';
import Color from "../app/Color";

export default class CartBall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isVisible: false
    }
  }

  /**
   * 开始动画
   * @param startPosition= {x: 0, y: 0}
   * @param endPosition= {x: 0, y: 0}
   * @param callBack
   */
  startAnim(startPosition, endPosition, callBack) {

    const config = {
      startX:startPosition.x,
      startY:startPosition.y,
      endX:endPosition.x,
      endY:endPosition.y,
      handleAnimated: (x, y) => {
        this.setState({
          x,
          y,
          isVisible: true,
        })
      },
      finish: () => {
        callBack();
        this.setState({
          isVisible: false
        })
      }
    };

    this._parabola(config);
  }

  _parabola(config) {
    const {
      startX,
      startY,
      endX,
      endY,
      time = 600,
      a = 0.006,//如果开始和结束点的差值为正：0.008，否则：0.02，不准确，慢慢调试
      handleAnimated,
      finish,
    } =
    config || {};

    const diffX = endX - startX;
    const diffY = endY - startY;
    const speed = diffX / time;

    const b = (diffY - a * diffX * diffX) / diffX;

    const startTime = new Date().getTime();

    const timer = setInterval(() => {
      if (new Date().getTime() - startTime > time) {
        finish && finish();
        clearInterval(timer);
        return;
      }

      const x = speed * (new Date().getTime() - startTime);
      const y = a * x * x + b * x;//抛物线 y=ax^2+bx

      handleAnimated && handleAnimated(startX + x, startY + y);
    }, 14);
  }

  render() {
    return <View style={[styles.ball,{left: this.state.x, top: this.state.y,opacity: this.state.isVisible ? 1 : 0}]}/>
  }

}

const styles = StyleSheet.create({
  ball: {
    ...wh(40),
    borderRadius: px2dp(20),
    position: 'absolute',
    backgroundColor: Color.theme
  }
});
