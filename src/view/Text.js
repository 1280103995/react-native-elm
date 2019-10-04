'use strict';
import React from 'react';
import {Text as RNText} from 'react-native';
import PropTypes from "prop-types";
import Color from "../app/Color";
import {px2sp} from "../utils/ScreenUtil";

export default class Text extends React.Component {

  static propTypes = {
    ...RNText.propTypes,
    // 字体大小
    largeSize: PropTypes.bool, // 30
    normalSize: PropTypes.bool, // 28 default
    mediumSize: PropTypes.bool, // 26
    smallSize: PropTypes.bool, // 24
    microSize: PropTypes.bool, // 22
    // 字体颜色
    theme: PropTypes.bool, // Color.theme
    white: PropTypes.bool, // Color.white
    gray: PropTypes.bool, // Color.gray2
    orange: PropTypes.bool, // Color.orange
    black: PropTypes.bool, // Color.black default
    red: PropTypes.bool,

    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultTypes = {
    ...RNText.defaultProps
  };

  _buildStyle(){
    let color = Color.black;
    if (this.props.theme) {
      color = Color.theme
    } else if (this.props.white) {
      color = Color.white
    } else if (this.props.gray) {
      color = Color.gray2
    } else if (this.props.orange){
      color = Color.orange
    } else if (this.props.red){
      color = Color.red
    }

    let fontSize = px2sp(28);
    if (this.props.largeSize) {
      fontSize = px2sp(30)
    } else if (this.props.mediumSize) {
      fontSize = px2sp(26)
    } else if (this.props.smallSize) {
      fontSize = px2sp(24)
    } else if (this.props.microSize) {
      fontSize = px2sp(22)
    }

    return {
      color: color,
      fontSize: fontSize,
      overflow: 'hidden',
      backgroundColor: 'transparent',
    };
  }

  render() {
    let {style, text, children, ...others} = this.props;
    return (
        <RNText style={[this._buildStyle(), style]} {...others}>
          {(text || text === '' || text === 0) ? text : children}
        </RNText>
    );
  }
}
