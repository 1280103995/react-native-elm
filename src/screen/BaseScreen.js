import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';
import NavigationBar from "../view/NavigationBar";
import {marginLR, marginTB, paddingLR, paddingTB, px2sp, wh} from '../utils/ScreenUtil';
import Color from "../app/Color";
import Images from "../app/Images";
import Text from '../view/Text';

export default class BaseScreen extends Component {
  _title:string;

  /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.background}}>

        <StatusBar
          animated={false}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={'light-content'}/>

        {this.renderNavBar()}

        {this.renderView()}

        <SafeAreaView style={{backgroundColor: Color.white}}/>
      </View>
    )
  }

  /**
   * 渲染导航栏
   * @returns {*}
   */
  renderNavBar = () => {
    return(
      <NavigationBar
        leftView={this.renderNavLeftView}
        centerView={this.renderNavCenterView}
        rightView={this.renderNavRightView}
      />
    )
  };

  /**
   * 渲染导航栏左边的组件
   * @returns {*}
   */
  renderNavLeftView = () => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <View style={{height:NavigationBar.height, ...marginLR(24),justifyContent: 'center'}}>
          <Image style={{
            ...wh(20, 30),
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'stretch'}}
                 source={Images.Common.goBack}/>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * 渲染导航栏中间的组件
   * @returns {*}
   */
  renderNavCenterView = () => {
    return (
      <Text white style={{fontSize:px2sp(34)}}>{!this._getTitle() ? this._title : this._getTitle()}</Text>
    );
  };

  /**
   * 渲染导航栏右边的组件
   * @returns {null}
   */
  renderNavRightView = () => {
    return null;
  };

  /**
   * 渲染主内容部分
   * @returns {null}
   */
  renderView() {
    return null
  }

  /**************************渲染UI部分结束**************************/

  /**
   * 设置标题
   * @param title
   */
  setTitle(title: string) {
    if (!this._title) {//首次设置标题时直接显示，防止首次显示标题过慢
      this._title = title;
    }else {//更新标题
      if (title !== this._getTitle()){//防止重复设置相同的标题
        this.props.navigation.setParams({ title })
      }
    }
  }

  _getTitle =() => this.props.navigation.getParam('title','');

  /**
   * 前往下一个页面
   * @param routerName
   * @param option
   */
  toPage(routerName: string, option: any){
    this.props.navigation.navigate(routerName, option)
  }
}
