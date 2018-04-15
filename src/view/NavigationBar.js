/**
 * custom app NavigationBar
 */
'use strict';
import React, {PureComponent} from 'react';
import {
  View,
  Image,
  Platform,
  StatusBar, Text, SafeAreaView,
} from 'react-native';
import Color from "../app/Color";
import {px2dp, px2sp} from "../utils/ScreenUtil";

type Props = {
  goBackVisible: boolean,//隐藏返回按钮
  title: string,//标题
  titleColor: string,//标题颜色
  leftView: Object,
  centerView: Object,//如果不想要原来标题位置的样式，自定义一个View进来替换
  rightView: Object,
  navBarImage: number,//用图片替换导航栏的颜色
  dividerVisible: boolean//是否显示导航栏的分割线
};

export default class NavigationBar extends PureComponent<Props> {

  static defaultProps = {
    titleColor: Color.black,
    dividerVisible: false
  };

  // 构造
  constructor(props) {
    super(props);
    this.NAVIGATION_BAR_HEIGHT = px2dp(Platform.OS === 'ios' ? 100 : 144); //单位px 整个标题栏高度（包括状态栏）
    this.IOS_STATUSBAR = px2dp(0); //单位px ios状态栏高度
    this.ANDROID_STATUSBAR = px2dp(StatusBar.currentHeight * 2); //单位px Android状态栏高度
    this.TITLE_SIZE = px2sp(36); //单位px 标题字体大小
  }

  _renderDivider = () => {
    const divider = {
      borderBottomWidth: px2dp(1),
      borderBottomColor: Color.divider
    };
    return this.props.dividerVisible ? divider : null
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: Color.theme}}>
        <View style={{width: '100%', ...this._renderDivider()}}>

          {this.props.navBarImage ?
            <Image style={{
              resizeMode: 'stretch',
              width: '100%',
              height: this.NAVIGATION_BAR_HEIGHT
            }}
                   source={this.props.navBarImage}/>
            :
            <View style={{
              width: '100%',
              height: this.NAVIGATION_BAR_HEIGHT,
              backgroundColor: Color.theme
            }}/>
          }

          <View style={{
            width: '100%',
            height: Platform.OS === 'ios' ? (this.NAVIGATION_BAR_HEIGHT - this.IOS_STATUSBAR) : (this.NAVIGATION_BAR_HEIGHT - this.ANDROID_STATUSBAR),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: Platform.OS === 'ios' ? this.IOS_STATUSBAR : this.ANDROID_STATUSBAR
          }}>

            {/*导航栏中间组件*/}
            {this.props.title
              ? <Text style={{
                fontSize: this.TITLE_SIZE,
                color: this.props.titleColor,
                backgroundColor: 'transparent'
              }}>{this.props.title}</Text>
              : this.props.centerView
            }

            {/*导航栏左边组件*/}
            {this.props.goBackVisible ?
              <View style={{position: 'absolute', left: 0}}>{this.props.leftView}</View> : null
            }

            {/*导航栏右边组件*/}
            <View style={{position: 'absolute', right: 0}}>
              {this.props.rightView}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
