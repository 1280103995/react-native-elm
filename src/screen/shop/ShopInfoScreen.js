import React from 'react'
import {
  Platform,
  View,
  StyleSheet,
  Animated,
  findNodeHandle,
  TouchableOpacity
} from 'react-native'
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import {BlurView} from "@react-native-community/blur";
import {
  getStatusBarHeight,
  marginTB,
  paddingLR,
  paddingTB,
  px2dp,
  screenW,
  wh,
} from '../../utils/ScreenUtil';
import Images from "../../app/Images";
import Image from "../../view/Image";
import Text from "../../view/Text";
import Row from "../../view/Row";
import Color from "../../app/Color";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ShopInfoList from "./ShopInfoList";
import ShopInfoEvaluation from "./ShopInfoEvaluation";
import TabBar from "../../view/TabBar";
import {inject, observer} from "mobx-react";
import NavigationBar from '../../view/NavigationBar';
import ShopInfoViewModel from '../../mvvm/viewmodel/ShopInfoViewModel';
import CartBall from '../../view/CartBall';

@inject('homeViewModel')
@observer
export default class ShopInfoScreen extends BaseScreen {

  shopInfoViewModel = new ShopInfoViewModel();

  constructor(props) {
    super(props);
    this.state = {
      viewRef: 0
    };
  }

  renderNavBar = () => null;

  _shopID() {
    return this.props.navigation.state.params.id
  }

  componentDidMount() {
    let latitude = this.props.homeViewModel.getLatitude;
    let longitude = this.props.homeViewModel.getLongitude;
    this.shopInfoViewModel.getShopData(this._shopID(), latitude, longitude)
  }

  _imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.backgroundImage)});
  }

  _goBack = () => this.props.navigation.goBack();

  renderView() {
    const props = Platform.select({
      ios:{
        blurType: "light",
        blurAmount: 25
      },
      android:{
        viewRef: this.state.viewRef,
        downsampleFactor: 10,
        overlayColor: 'rgba(255,255,255,.1)'
      }
    });

    return (
      <Column style={{flex: 1}}>
        {/*模糊层*/}
        <View>
          <Image
            source={Images.Shop.shopBg}
            style={styles.bg}
            ref={(r)=>this.backgroundImage=r}
            onLoadEnd={this._imageLoaded.bind(this)}/>
          <BlurView {...props} style={styles.blur}/>
        </View>

        <View style={styles.head}>
          {/*返回*/}
          <TouchableOpacity style={{width: px2dp(70), height:NavigationBar.height}} onPress={this._goBack}>
            <Image source={Images.Common.goBack} style={{...wh(20, 30), margin: px2dp(25)}}/>
          </TouchableOpacity>
          {/*模糊层上的*/}
          <Animated.View style={{flexDirection: "row", ...paddingLR(20)}}>
            <Image source={this.shopInfoViewModel.getShopImgPath} style={styles.logo}/>
            <Column style={{height:px2dp(100), marginLeft: 14}}>
              <Column>
                <Text white text={this.shopInfoViewModel.getShopName} style={{marginTop: Platform.OS === 'ios'? 0 : -3}}/>
                <Row verticalCenter>
                  <View style={{...paddingTB(2), ...paddingLR(4), ...marginTB(4), backgroundColor: Color.theme}}>
                    <Text white microSize text={'蜂鸟专送'}/>
                  </View>
                  <Text white microSize text={'30分钟送达'}/>
                </Row>
              </Column>
              <Text white microSize numberOfLines={1} text={this.shopInfoViewModel.getShopPromotion}/>
            </Column>
          </Animated.View>
          {/*活动*/}
          {this._renderActivitiesItem()}
        </View>
        <ScrollableTabView renderTabBar={() => <TabBar/>}>
          <ShopInfoList
            tabLabel="商品"
            shopID={this._shopID()}
            shopInfoViewModel={this.shopInfoViewModel}
            navigation={this.props.navigation}/>
          <ShopInfoEvaluation
            tabLabel="评价"
            shopID={this._shopID()}/>
        </ScrollableTabView>
        {/*购物车小球*/}
        <CartBall ref={r => this.shopInfoViewModel.cartBall = r}/>
      </Column>
    )
  }

  _renderActivitiesItem() {
    return (
      <Column style={styles.activityView}>
        <Row verticalCenter>
          <View style={styles.activityText}>
            <Text white microSize text={'减'}/>
          </View>
          <Text white microSize text={'满20减2，满30减3，满40减4（不与美食活动同享）'}/>
        </Row>
        <Row verticalCenter style={{marginTop: px2dp(10)}}>
          <View style={styles.activityText}>
            <Text white microSize text={'特'}/>
          </View>
          <Text white microSize text={'双人餐特惠'}/>
        </Row>
      </Column>
    )
  };
}

const styles = StyleSheet.create({
  head: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: getStatusBarHeight(),
    backgroundColor: "rgba(0,0,0,.3)"
  },
  bg: {
    width: screenW,
    height: getStatusBarHeight() + px2dp(70) + px2dp(100) + px2dp(80) + px2dp(20) * 2
  },
  blur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: screenW,
    height: getStatusBarHeight() + px2dp(70) + px2dp(100) + px2dp(80) + px2dp(20) * 2
  },
  logo: {
    ...wh(100),
    resizeMode: "cover"
  },
  activityView:{
    height:px2dp(80),
    margin: px2dp(20)
  },
  activityText:{
    padding: px2dp(2),
    marginRight: px2dp(5),
    backgroundColor: '#f07373'
  }
});

