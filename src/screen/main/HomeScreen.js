import React from 'react'
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler
} from "react-native";
import {isIphoneX, marginLR, marginTB, paddingTB, px2dp, screenW, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Divider from "../../view/Divider";
import Images from "../../app/Images";
import BaseScreen from "../BaseScreen";
import Text from "../../view/Text";
import ShopListItem from "../../view/ShopListItem";
import Image from "../../view/Image";
import Column from "../../view/Column";
import {inject, observer} from "mobx-react";
import Carousel from "../../view/Carousel";
import Toast from "../../view/Toast";

@inject('homeViewModel')
@observer
export default class HomeScreen extends BaseScreen {

  _didFocusSubscription;
  _willBlurSubscription;

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setNavBarVisible(false);

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this._onBackButtonPressAndroid)
    );
  }

  _onLocationChange = (changed) =>{
    if (changed) this.props.homeViewModel.getFootList()
  };

  _onCategoryItemClick = (category) => {
    let latitude = this.props.homeViewModel.getLatitude;
    let longitude = this.props.homeViewModel.getLongitude;
    this.toPage('Category',{data:category,latitude,longitude})
  };

  componentDidMount() {
    this.props.homeViewModel.getHomeData();

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this._onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  _onBackButtonPressAndroid = () => {
    if (this.props.navigation.state.routeName === 'Home') {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();
        return false;
      }
      this.lastBackPressed = Date.now();
      Toast.show('再按一次退出应用',{position: -50});
      return true;
    }
  };

  renderView() {
    return (
      <View style={{flex: 1}}>
        {this._renderNavBar()}
        <FlatList
          data={this.props.homeViewModel.getShopList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + item.name}
          ItemSeparatorComponent={() => <Divider/>}
          ListHeaderComponent={this._renderHeader}
        />
      </View>
    )
  }

  _renderNavBar() {
    const top = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
    const navHeight = isIphoneX() || Platform.OS === 'ios' ? 210 : 240;
    return (
      <SafeAreaView style={{backgroundColor: Color.theme}}>
        <View style={{height: px2dp(navHeight), backgroundColor: Color.theme, paddingTop: px2dp(30) + top}}>
          <Row verticalCenter style={{justifyContent: 'space-between', ...marginLR(20)}}>
            {/*定位城市*/}
            <TouchableOpacity activeOpacity={0.6} onPress={()=>this.toPage('LocationCity',{callback: this._onLocationChange})}>
              <Row verticalCenter>
                <Image source={Images.Main.location} style={{...wh(30)}}/>
                <Text white text={this.props.homeViewModel.getLocation}/>
                <Image source={Images.Main.arrow} style={{...wh(18, 25)}}/>
              </Row>
            </TouchableOpacity>
            {/*天气*/}
            <Row verticalCenter>
              <View style={{marginRight: 5}}>
                <Text microSize white style={{textAlign: "center"}} text={'3°'}/>
                <Text microSize white style={{textAlign: "center"}} text={'多云'}/>
              </View>
              <Image source={Images.Main.weather} style={{...wh(25)}}/>
            </Row>
          </Row>
          {/*搜索*/}
          <TouchableWithoutFeedback onPress={() => this.toPage('Find')}>
            <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
              <Image source={Images.Main.search} style={{...wh(30)}}/>
              <Text gray style={{marginLeft: 5}} text={'输入商家，商品名称'}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    )
  }

  /**
   * 分类
   * @private
   */
  _renderHeader = () => {
    return (
      <Column style={{backgroundColor:Color.white}}>
        <Carousel
          pageSize={screenW}
          loop={false}
          autoplay={false}>
          {this.props.homeViewModel.getCategoryList.map((data, index) => this._renderPage(data, index))}
        </Carousel>
        <Divider style={{height:px2dp(20),backgroundColor:Color.background}}/>
        <Text text={'附近商家'} style={{margin:px2dp(20)}}/>
      </Column>
    )
  };

  _renderPage(data, index) {
    return (
      <View key={index} style={styles.typesView}>
        {data.map((item, i) =>
          <TouchableOpacity
            key={i}
            onPress={() => this._onCategoryItemClick(item)}
            style={{
              width: screenW / 4,
              justifyContent: 'center',
              alignItems: 'center',
              ...paddingTB(20)
            }}>
            <Image source={Image.cdn + item.image_url} style={{...wh(80)}} needBaseUrl={false}/>
            <Text mediumSize text={item.title}/>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <ShopListItem data={item} onClick={() => this.toPage('ShopInfo', {id: item.id})}/>
    );
  }
}

const styles = StyleSheet.create({
  searchBtn: {
    margin: px2dp(20),
    borderRadius: px2dp(4),
    height: px2dp(60),
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  bannerDotStyle: {
    ...wh(16),
    borderRadius:px2dp(8),
    ...marginTB(0,15),
    ...marginLR(6)
  },
  typesView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom:10
  },
});