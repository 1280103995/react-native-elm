'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types'

export default class Row extends PureComponent {

  static propTypes: {
    verticalCenter: PropTypes.bool,
    horizontalCenter: PropTypes.bool
  };

  render() {

    const {verticalCenter, horizontalCenter} = this.props;

    const style = {
      flexDirection: 'row',
      alignItems: verticalCenter ? 'center' : 'stretch',
      justifyContent: horizontalCenter ? 'center' : 'flex-start'
    };

    return (
      <View style={StyleSheet.flatten([style, this.props.style])}>
        {this.props.children}
      </View>
    );
  }
}
