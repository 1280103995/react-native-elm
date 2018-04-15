'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Color from "../app/Color";

export default class Button extends TouchableOpacity {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      let opacity = 1;
      if (!nextProps.disabled) {
        let fs = StyleSheet.flatten(nextProps.style);
        opacity = fs && (fs.opacity || fs.opacity === 0) ? fs.opacity : 1;
      }
      this.state.anim.setValue(opacity);
    }
  }

  _buildProps() {
    let {style, title, titleStyle, activeOpacity, disabled, children, ...others} = this.props;

    let backgroundColor, borderColor, borderWidth, borderRadius, paddingVertical, paddingHorizontal;
    let textColor, textFontSize;
    //button default props
    activeOpacity = 0.8;
    borderWidth = 0;
    borderRadius = 0;
    borderColor = Color.theme;
    paddingVertical = 0;
    paddingHorizontal = 0;
    backgroundColor = Color.theme;
    //title default props
    textColor = Color.white;
    textFontSize = 14;

    style = [{
      backgroundColor,
      borderColor,
      borderWidth,
      borderRadius,
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }].concat(style);
    style = StyleSheet.flatten(style);
    if (disabled) {
      style.opacity = 0.4;
    }

    this.state.anim._value = style.opacity === undefined ? 1 : style.opacity;

    if (!React.isValidElement(title) && (title || title === '' || title === 0)) {
      titleStyle = [{
        color: textColor,
        fontSize: textFontSize,
        overflow: 'hidden',
      }].concat(titleStyle);
      title = <Text style={titleStyle} numberOfLines={1}>{title}</Text>;
    }
    if (title) children = title;

    this.props = {style, title, titleStyle, activeOpacity, disabled, children, ...others};
  }

  render() {
    this._buildProps();
    return super.render();
  }
}