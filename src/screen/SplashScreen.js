/**
 *
 * 启动页
 *
 */
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import BaseScreen from './BaseScreen';
import NavigationUtil from '../utils/NavigationUtil';
import Images from '../app/Images';
import Storage from '../utils/DeviceStorage';

export default class SplashScreen extends BaseScreen {

  renderNavBar = () => null;

  render() {
    return (
      <Image source={Images.Splash.splash} style={{width: '100%', height: '100%', resizeMode: 'stretch'}}/>
    );
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.timer = setTimeout(() => {

      Storage.get('isInit')   //获取初次打开的标记位
        .then((isInit) => {
          if (!isInit) {  //如果为false,跳转到引导页
            // NavigationUtil.reset(navigation, 'Guide');
            NavigationUtil.reset(navigation, 'Home');
            Storage.save('isInit', true);  //同时把isInit存到本地数据库中
          } else {
            NavigationUtil.reset(navigation, 'Home');
          }
        });
    }, 1000);
  }
}
