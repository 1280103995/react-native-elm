import React from 'react'
import {
  View, Platform, StatusBar, TouchableWithoutFeedback, StyleSheet, SafeAreaView, FlatList,
  TouchableOpacity
} from "react-native";
import {isIphoneX, marginLR, paddingTB, px2dp, screenW, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Divider from "../../view/Divider";
import Images from "../../app/Images";
import BaseScreen from "../BaseScreen";
import LocationApi from "../../api/LocationApi";
import Text from "../../view/Text";
import ShopListItem from "../../view/ShopListItem";
import Image from "../../view/Image";
import Swiper from 'react-native-swiper';
import Column from "../../view/Column";

export default class HomeScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  // 构造
  constructor(props) {
    super(props);
    this.setNavBarVisible(false);
    // 初始状态
    this.state = {
      location: '', //当前位置
      category: [],
      shop: [],
    };
    this.latitude = null;
    this.longitude = null
  }

  _onCategoryItemClick = (category) => {
    this.props.navigation.navigate('Category',{data:category,latitude:this.latitude,longitude:this.longitude})
  };

  componentDidMount() {
    LocationApi.fetchCityGuess().then((res) => {
      Geohash = res.geohash;
      this.state.location = res.name;
      this.latitude = res.latitude;
      this.longitude = res.longitude;

      LocationApi.fetchFoodTypes(res.geohash).then((res) => {
        const itemCount = 8;//一页8个分类
        const pageCount = res.length / itemCount;
        const last = res.length % 8; //余下的个数，不满一页8个的，如果=0则刚刚被整除
        for (let i = 0; i < pageCount; i++) {
          this.state.category.push(res.slice(i * itemCount, (i + 1) * itemCount));
        }
        if (last > 0) {
          this.state.category.push(res.slice(itemCount * pageCount, res.length))
        }
      });

      this._fetchShop(res.latitude, res.longitude);
    })
  }

  _fetchShop(latitude, longitude) {
    LocationApi.fetchShopList(latitude, longitude, 0).then((res) => {
      this.setState({shop: res})
    })
  }

  renderView() {
    return (
      <View style={{flex: 1}}>
        {this._renderNavBar()}
        <FlatList
          data={this.state.shop}
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
            <Row verticalCenter>
              <Image source={Images.Main.location} style={{...wh(30)}}/>
              <Text white text={this.state.location}/>
              <Image source={Images.Main.arrow} style={{...wh(18, 25)}}/>
            </Row>
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
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Find')}>
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
      <Swiper
        height={px2dp(330)}
        loop={true}         //每隔4秒切换
        horizontal={true}              //水平方向，为false可设置为竖直方向
        paginationStyle={{bottom: px2dp(30)}} //小圆点的位置：距离底部20px
        showsButtons={false}           //为false时不显示控制按钮
        showsPagination={true}       //为false不显示下方圆点
        dot={
          <View style={[styles.bannerDotStyle, {backgroundColor: Color.gray3}]}/>}//未选中的圆点样式
        activeDot={
          <View style={[styles.bannerDotStyle, {backgroundColor: Color.theme}]}/>}//选中的圆点样式
      >
        {this.state.category.map((data, index) => this._renderPage(data, index))}
      </Swiper>
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
            {/*<Image source={item.image_url} style={{...wh(80)}}/>*/}
            <View style={{...wh(80),backgroundColor:'pink'}}/>
            <Text mediumSize text={item.title}/>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <ShopListItem data={item} onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
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
    ...wh(12, 12),
    borderRadius: px2dp(6),
    marginHorizontal: px2dp(9)
  },
  typesView: {
    flex: 1,
    backgroundColor: Color.white,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: px2dp(20)
  },
});