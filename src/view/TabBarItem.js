//自定义底下标签栏
import React, {PureComponent} from 'react';
import {Image} from 'react-native';
import {wh} from "../utils/ScreenUtil";

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
        <Image
          source={this.props.focused ? selectedImage : this.props.normalImage}
          style={{
            tintColor: this.props.tintColor,
            ...wh(this.props.size)
          }}
        />
    );
  }
}
