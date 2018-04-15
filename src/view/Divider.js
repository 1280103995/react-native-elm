'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types'
import Color from "../app/Color";
import {px2dp, wh} from "../utils/ScreenUtil";

export default class Divider extends PureComponent {
  static propTypes = {
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    color: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    horizontal: true,
    vertical: false,
    color: Color.divider,
    width: 1,
    height: 1,
  };

  render() {
    let {horizontal, vertical, color, width, height} = this.props;

    let style;
    if(horizontal && !vertical && width !== 1 || vertical){
        style = {
          ...wh(width,height),
          backgroundColor:color
        }
    }else{
      style = {
        flex:1,
        height: px2dp(height),
        backgroundColor:color
      }
    }

    return (
      <View style={StyleSheet.flatten([style, this.props.style])}/>
    )
  }
}
