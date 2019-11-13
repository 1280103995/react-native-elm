'use strict';
import React, {Component} from 'react'
import {
  View,
  Easing,
  Animated,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {isIphoneX, px2dp, px2sp, screenW, wh} from "../utils/ScreenUtil";
import Text from "./Text";
import Image from "./Image";
import Images from "../app/Images";
import Row from "./Row";
import Color from "../app/Color";
import Column from "./Column";
import Button from "./Button";

@observer
export default class ShopBar extends Component{

  static propTypes = {
    cartElement: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.CartStore = props.store;
    this.state = {
      scale: new Animated.Value(0)
    };
    this.position = {}
  }

  runAnimate() {
    this.state.scale.setValue(0);
    Animated.timing(this.state.scale, {
      toValue: 2,
      duration: 320,
      easing: Easing.elastic(3)
    }).start()
  }

  _buy = () => {
    if (isLogin) this.props.navigation.navigate('OrderConfirm')
    else this.props.navigation.navigate('Login')
  };

  render() {
    return isIphoneX() ? <SafeAreaView>{this._renderUI()}</SafeAreaView>: this._renderUI()
  }

  _renderUI(){
    return(
      <View style={styles.cartView}>
        {/*各种满减*/}
        <Row verticalCenter horizontalCenter style={{height: px2dp(40), borderTopColor: '#EEC900', borderTopWidth:px2dp(1), backgroundColor: '#EEE9BF'}}>
          <Text microSize text={'满20减12，'}/>
          <Text microSize text={'满35减17，'}/>
          <Text microSize text={'满50减22'}/>
        </Row>
        <Row verticalCenter style={{height: px2dp(90), justifyContent: 'space-between',backgroundColor: Color.gray3}}>
          <Column style={{height:px2dp(90),marginLeft:px2dp(160),justifyContent:'center'}}>
            <Text white text={`￥${this.CartStore.totalPrice}`}/>
            <Text white text={'配送费￥3'} style={{fontSize: px2sp(18)}}/>
          </Column>
          <Button
            style={{...wh(160,90), backgroundColor: this.CartStore.totalCount > 0 && this.CartStore.totalPrice >= 20 ? Color.reseda : 'transparent'}}
            activeOpacity={this.CartStore.totalCount > 0 ? 0.8 : 1}
            onPress={this._buy}
            title={'￥20起送'}/>
        </Row>

        <Animated.View
          ref={(cart)=>this.props.cartElement(cart)}
          style={[styles.iconWrap, {
          transform: [
            {
              scale: this.state.scale.interpolate({
                inputRange: [0, 1, 2], outputRange: [1, 0.8, 1]
              })
            }
          ]
        }]}>
          {/*购物车图标*/}
          <View style={[styles.iconView, this.CartStore.totalCount > 0 ? {backgroundColor: Color.theme} : null]}>
            <Image source={Images.Shop.cart}
              style={{...wh(50), tintColor: this.CartStore.totalCount > 0 ? Color.white : Color.gray3}}/>
          </View>
          {/*数量*/}
          {this.CartStore.totalCount > 0 ?
            <View style={styles.count}>
              <Text white text={this.CartStore.totalCount} style={{fontSize: px2sp(18)}}/>
            </View> : null}
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartView: {
    width: screenW,
    height: px2dp(130)
  },
  count: {
    ...wh(30),
    backgroundColor: "#f00",
    borderRadius: px2dp(20),
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: "center",
    position: "absolute",
    top: px2dp(2),
    right: px2dp(2)
  },
  iconWrap: {
    position: "absolute",
    left: px2dp(30),
    top: px2dp(10),
    ...wh(100)
  },
  iconView: {
    backgroundColor: "#333",
    overflow: "hidden",
    borderRadius: px2dp(47),
    ...wh(94),
    borderWidth: px2dp(6),
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center"
  },

});
