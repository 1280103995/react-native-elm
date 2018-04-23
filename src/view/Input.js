'use strict';
import React, {Component} from 'react'
import {TextInput, StyleSheet, ViewPropTypes} from 'react-native'
import PropTypes from 'prop-types'
import Row from "./Row";
import Color from "../app/Color";
import {px2dp, px2sp} from "../utils/ScreenUtil";
import Text from "./Text";

export default class Input extends Component {

  static propTypes = {
    ...TextInput.propTypes,
    id: PropTypes.func,
    bgViewStyle: ViewPropTypes.style,
    label: PropTypes.string,
    labelStyle: Text.propTypes.style,
    selectionColor: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      'default', 'numeric', 'email-address',
      "ascii-capable", 'numbers-and-punctuation',
      'url', 'number-pad', 'phone-pad',
      'name-phone-pad', 'decimal-pad',
      'twitter', 'web-search']),
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    onFocus: PropTypes.func,
    onEndEditing: PropTypes.func,
    onChangeText: PropTypes.func, //接收数据
    numberOfLines: PropTypes.number
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    selectionColor: Color.theme,
    secureTextEntry: false,
    keyboardType: 'default',
    placeholder: null,
    placeholderTextColor: Color.gray3,
    value: null,
    numberOfLines: 1
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value
    }
  }

  _onChang = (text) => {
    this.setState({text});
    this.props.onChangeText(text)
  };

  render() {
    return (
      <Row verticalCenter style={StyleSheet.flatten([{flex: 1},this.props.bgViewStyle])}>

        {this.props.label ?
          <Text text={this.props.label} style={StyleSheet.flatten([{marginRight: px2dp(20)}, this.props.labelStyle])}/>
          : null}

        <TextInput
          ref={this.props.id}
          style={StyleSheet.flatten([styles.inputStyle, this.props.style])}
          selectionColor={this.props.selectionColor} //光标颜色
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          numberOfLines={this.props.numberOfLines}
          autoFocus={false} //自动获得焦点
          underlineColorAndroid='transparent'// Android下划线的颜色
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor} //设置提示文字的颜色
          value={this.state.text}
          onChangeText={this._onChang}/>

        {this.props.children}

      </Row>
    )
  }
}

const styles = StyleSheet.create({
  inputStyle:{
    flex: 1,
    fontSize: px2sp(28),
    color:Color.black,
    paddingVertical: 0
  },
});