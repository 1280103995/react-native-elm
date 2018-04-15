//自定义底下标签栏
import React, {PureComponent} from 'react';
import {Image, View} from 'react-native';
import {px2dp, wh} from "../utils/ScreenUtil";

type Props = {
  size:number,
  normalImage: number,
  selectedImage: number
}

export default class TabBarItem extends PureComponent<Props> {

  static defaultProps = {
    size:42
  };

  render() {
    let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage;
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', width: px2dp(75)}}>
        <Image
          source={this.props.focused ? selectedImage : this.props.normalImage}
          style={{
            tintColor: this.props.tintColor,
            ...wh(this.props.size)
          }}
        />
      </View>
    );
  }
}
