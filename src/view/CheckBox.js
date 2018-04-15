'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {px2dp, px2sp} from "../utils/ScreenUtil";
import Color from "../app/Color";

export default class Checkbox extends TouchableOpacity {

  static propTypes = {
    ...TouchableOpacity.propTypes,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    largeSize: PropTypes.bool, // 30
    normalSize: PropTypes.bool, // 28 default
    mediumSize: PropTypes.bool, // 26
    smallSize: PropTypes.bool, // 24
    microSize: PropTypes.bool, // 22
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    titleStyle: Text.propTypes.style,
    tintColorEnable: PropTypes.bool,
    checkedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    checkedIconStyle: Image.propTypes.style,
    uncheckedIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({uri: PropTypes.string}), PropTypes.number]),
    uncheckedIconStyle: Image.propTypes.style,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    ...TouchableOpacity.defaultProps,
    defaultChecked: false,
    tintColorEnable: true,
    checkedIcon: require('../img/checked.png'),
    uncheckedIcon: require('../img/unchecked.png'),
    hitSlop: {top: 8, bottom: 8, left: 8, right: 8},
  };

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, {
      checked: props.checked === true || props.checked === false ? props.checked : props.defaultChecked,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked === true || nextProps.checked === false) {
      if (nextProps.checked !== this.state.checked) {
        this.setState({checked: nextProps.checked});
      }
    }
  }

  _buildProps() {
    let {style, size, title, checkedIcon, uncheckedIcon, titleStyle, tintColorEnable,
      checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others} = this.props;
    let {checked} = this.state;

    let iconSize = px2dp(34), textFontSize = px2sp(28), textPaddingLeft = px2dp(10);
    if (this.props.largeSize) {
      iconSize = px2dp(38);
      textFontSize = px2sp(30);
      textPaddingLeft = px2dp(12)
    } else if (this.props.mediumSize) {
      iconSize = px2dp(30);
      textFontSize = px2sp(26);
      textPaddingLeft = px2dp(8)
    } else if (this.props.smallSize) {
      iconSize = px2dp(26);
      textFontSize = px2sp(24);
      textPaddingLeft = px2dp(6)
    } else if (this.props.microSize) {
      iconSize = px2dp(22);
      textFontSize = px2sp(22);
      textPaddingLeft = px2dp(4)
    }

    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    }].concat(style);
    let iconStyle = [{
      tintColor: tintColorEnable ? checked ? Color.theme : Color.gray2 : null,
      width: iconSize,
      height: iconSize,
    }].concat(checked ? checkedIconStyle : uncheckedIconStyle);
    let textStyle = [{
      color: Color.black,
      fontSize: textFontSize,
      overflow: 'hidden',
      paddingLeft: textPaddingLeft,
    }].concat(titleStyle);

    if (React.isValidElement(checkedIcon)) {
      checkedIcon = React.cloneElement(checkedIcon, {key: 'icon'});
    } else if (checkedIcon || checkedIcon === 0) {
      checkedIcon = <Image key='icon' style={iconStyle} source={checkedIcon} />;
    }
    if (React.isValidElement(uncheckedIcon)) {
      uncheckedIcon = React.cloneElement(uncheckedIcon, {key: 'icon'});
    } else if (uncheckedIcon || uncheckedIcon === 0) {
      uncheckedIcon = <Image key='icon' style={iconStyle} source={uncheckedIcon} />;
    }
    if (React.isValidElement(title)) {
      title = React.cloneElement(title, {key: 'title'});
    } else if ((title || title === '' || title === 0)) {
      title = (
        <Text key='title' style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }

    children = [
      checked ? checkedIcon : uncheckedIcon,
      title ? title : null,
    ];

    onPress = () => {
      this.setState({checked: !checked});
      onChange && onChange(!checked);
    };

    this.props = {style, size, title, checkedIcon, uncheckedIcon, titleStyle,
      checkedIconStyle, uncheckedIconStyle, children, onPress, onChange, ...others};
  }

  render() {
    this._buildProps();

    if (this.props.disabled) {
      return (
        <View style={{opacity: 0.65}}>
          {super.render()}
        </View>
      );
    } else {
      return super.render();
    }
  }
}