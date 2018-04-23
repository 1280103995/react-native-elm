import React from 'react'
import {
  Platform,
  View,
  StyleSheet,
  Animated,
  findNodeHandle,
  ImageBackground,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import {BlurView} from "react-native-blur";
import {isIphoneX, marginTB, paddingLR, paddingTB, px2dp, px2sp, screenW, wh} from "../../utils/ScreenUtil";
import Images from "../../app/Images";
import Image from "../../view/Image";
import Text from "../../view/Text";
import Row from "../../view/Row";
import Color from "../../app/Color";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ShopInfoList from "./ShopInfoList";
import ShopInfoEvaluation from "./ShopInfoEvaluation";
import LocationApi from "../../api/LocationApi";
import ShopAip from "../../api/ShopApi";
import TabBar from "../../view/TabBar";

export default class ShopInfoScreen extends BaseScreen {

  // 构造
  constructor(props) {
    super(props);
    this.setNavBarVisible(false);
    // 初始状态
    this.state = {
      headOpacity: 1,
      bgY: 0,
      bgScale: 1,
      //店铺信息
      shopImg: '',
      shopName: '',
      shopPromotion: '',
      viewRef: 0
    };
  }

  _shopID() {
    return this.props.navigation.state.params.id
  }

  componentDidMount() {
    LocationApi.fetchCityGuess().then((res) => {
      ShopAip.fetchShopDetails(this._shopID(), res.latitude, res.longitude).then((res) => {
        this.setState({
          shopImg: res.image_path,
          shopName: res.name,
          shopPromotion: res.promotion_info
        })
      });
    })
  }

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)});
  }

  renderView() {
    let props = Platform.OS === 'ios' ? {
      blurType: "light",
      blurAmount: 25
    } : {
      viewRef: this.state.viewRef,
      downsampleFactor: 10,
      overlayColor: 'rgba(255,255,255,.1)'
    };
    return (
      <Column style={{flex: 1}}>
        {/*模糊层*/}
        <Animated.View style={{
          transform: [{
            translateY: this.state.bgY
          }, {
            scale: this.state.bgScale
          }
          ]
        }}>
          <ImageBackground
            source={Images.Common.shopBg}
            style={styles.bg}
            ref={'backgroundImage'}
            onLoadEnd={this.imageLoaded.bind(this)}/>
          <BlurView {...props} style={styles.blur}/>
        </Animated.View>

        <View style={styles.head}>
          <TouchableOpacity style={{width: px2dp(70)}} onPress={() => this.props.navigation.goBack()}>
            <Image source={Images.Common.goBack} style={{...wh(20, 30), margin: px2dp(25)}}/>
          </TouchableOpacity>
          {/*模糊层上的*/}
          <Animated.View style={{flexDirection: "row", paddingHorizontal: 16, opacity: this.state.headOpacity}}>
            <Image source={this.state.shopImg} style={styles.logo}/>
            <Column style={{marginLeft: 14, flex: 1}}>
              <Column>
                <Text white text={this.state.shopName}/>
                <Row verticalCenter>
                  <View style={{...paddingTB(2), ...paddingLR(4), ...marginTB(4), backgroundColor: Color.theme}}>
                    <Text white microSize text={'蜂鸟专送'}/>
                  </View>
                  <Text white microSize text={'30分钟送达'}/>
                </Row>
              </Column>
              <Text white microSize numberOfLines={1} text={this.state.shopPromotion}/>
            </Column>
          </Animated.View>
          {/*活动*/}
          {this._renderActivitiesItem()}
        </View>
        <ScrollableTabView renderTabBar={() => <TabBar/>}>
          <ShopInfoList shopID={this._shopID()} tabLabel="商品" navigation={this.props.navigation}/>
          <ShopInfoEvaluation shopID={this._shopID()} tabLabel="评价"/>
        </ScrollableTabView>

      </Column>
    )
  }

  _renderActivitiesItem() {
    return (
      <Column style={{margin: px2dp(30)}}>
        <Row verticalCenter>
          <View style={{padding: px2dp(2), marginRight: px2dp(5), backgroundColor: '#f07373'}}>
            <Text white microSize text={'减'}/>
          </View>
          <Text white microSize text={'满20减2，满30减3，满40减4（不与美食活动同享）'}/>
        </Row>
        <Row verticalCenter style={{marginTop: px2dp(10)}}>
          <View style={{padding: px2dp(2), marginRight: px2dp(5), backgroundColor: '#f07373'}}>
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
    paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 30: 20 : StatusBar.currentHeight,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  bg: {
    width: screenW,
    height: screenW / 2,
    resizeMode: "stretch"
  },
  blur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: screenW,
    height: screenW / 2,
  },
  logo: {
    ...wh(100),
    resizeMode: "cover"
  },
});

