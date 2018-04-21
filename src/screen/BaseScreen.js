import React, {Component} from 'react';
import {View, Image, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native'
import VisibleView from "../view/VisibleView";
import NavigationBar from "../view/NavigationBar";
import {px2dp, wh} from "../utils/ScreenUtil";
import Color from "../app/Color";
import Images from "../app/Images";

export default class BaseScreen extends Component {

  /*支持手势返回，如果有页面不需要手势返回，则重写该方法，禁止掉手势 gesturesEnabled: false */
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  };

  // 构造
  constructor(props) {
    super(props);
    this.title = ''; //标题
    this.titleColor = Color.white; //标题颜色
    this.statusBarColor = 'light-content'; //状态栏字体颜色enum('default', 'light-content', 'dark-content')
    this.navBarVisible = true; //导航栏是否显示
    this.navBarImage = null;
    this.navBarDividerVisible = false;// 默认不显示导航栏底下的分割线
    this.goBackVisible = true; // 默认显示返回按钮
    this.goBackColor = null; //返回按钮颜色

    // 初始状态
    this.state = {
      netErrorVisible: false,
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: Color.background}}>

        <StatusBar
          animated={false}
          hidden={false}
          backgroundColor={'transparent'}
          translucent={true}
          barStyle={this.statusBarColor}/>

        <VisibleView visible={this.navBarVisible}>
          {this.renderNavigationBar()}
        </VisibleView>

        <VisibleView visible={!this.state.netErrorVisible}>
          {this.renderView()}
        </VisibleView>

        <SafeAreaView style={{backgroundColor: Color.white}}/>
      </View>
    )
  }

  /**
   * 渲染导航栏部分
   */
  renderNavigationBar() {
    return (
      <NavigationBar
        titleColor={this.titleColor}
        navBarImage={this.navBarImage}
        dividerVisible={this.navBarDividerVisible}
        title={this.title}
        goBackVisible={this.goBackVisible}
        leftView={this.renderGoBack()}
        centerView={this.renderTitle()}
        rightView={this.renderMenu()}/>
    )
  }

  /**
   * 渲染返回按钮
   * @returns {*}
   */
  renderGoBack() {
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.goBack()}}>
        <View style={{paddingHorizontal: px2dp(30), paddingVertical: px2dp(26)}}>
          <Image style={{
            ...wh(20, 30),
            tintColor: this.goBackColor,
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'stretch'}}
                 source={Images.Common.goBack}/>
        </View>
      </TouchableOpacity>
    )
  }

  /**
   * 渲染标题部分
   * @returns {null}
   */
  renderTitle() {
    return null
  }

  /**
   * 渲染菜单
   * @returns {null}
   */
  renderMenu() {
    return null
  }

  /**
   * 渲染主内容部分
   * @returns {null}
   */
  renderView() {
    return null
  }

  /**************************渲染UI部分结束**************************/


  /**
   * 设置状态栏颜色
   * enum('default', 'light-content', 'dark-content')
   * @param color
   */
  setStatusBarColor(color: string) {
    this.statusBarColor = color
  }

  /**
   * 设置是否显示导航栏
   * @param visible
   */
  setNavBarVisible(visible: boolean){
    this.navBarVisible = visible
  }
  /**
   * 设置导航栏背景为图片
   * 传入类似 require('.././img/title_bar_background.png')
   * @param image
   */
  setNavBarImage(image) {
    this.navBarImage = image
  }

  setNavBarDividerVisible(visible: boolean){
    this.navBarDividerVisible = visible
  }

  /*设置返回按钮显示隐藏*/
  setGoBackVisible(visible: boolean) {
    this.goBackVisible = visible
  }

  /**
   * 设置返回按钮颜色
   * @param color
   */
  setGoBackColor(color: string) {
    this.goBackColor = color
  }

  /**
   * 设置标题
   * @param title
   */
  setTitle(title: string) {
    this.title = title
  }

  /**
   * 设置标题颜色
   * @param color
   */
  setTitleColor(color: string) {
    this.titleColor = color
  }
}
