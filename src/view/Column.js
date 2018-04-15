'use strict';
import React, {PureComponent} from 'react';
import {View,StyleSheet} from 'react-native';

export default class Column extends PureComponent {

  render() {
    return (
      <View style={StyleSheet.flatten([styles.columnStyle, this.props.style])}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  columnStyle:{
    flexDirection: 'column'
  }
});
