import React from 'react'
import {View, Platform, StatusBar, TouchableWithoutFeedback, StyleSheet, SafeAreaView, FlatList,
  TouchableOpacity, ScrollView
} from "react-native";
import {isIphoneX, marginLR, marginTB, paddingTB, px2dp, screenW, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Divider from "../../view/Divider";
import Images from "../../app/Images";
import BaseScreen from "../BaseScreen";
import LocationApi from "../../api/LocationApi";
import Text from "../../view/Text";
import ShopListItem from "../../view/ShopListItem";
import Image from "../../view/Image";
import Column from "../../view/Column";
import {inject, observer} from "mobx-react";

@inject('homeStore')
@observer
export default class HomeScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setNavBarVisible(false);
    this.latitude = null;
    this.longitude = null;
    this.state = {
      curSelectPage: 0
    }
  }

  _onCategoryItemClick = (category) => {
    this.props.navigation.navigate('Category',{data:category,latitude:this.latitude,longitude:this.longitude})
  };

  componentDidMount() {
    LocationApi.fetchCityGuess().then((res) => {
      Geohash = res.latitude + ',' + res.longitude;
      this.props.homeStore.setLocation(res.name);
      this.latitude = res.latitude;
      this.longitude = res.longitude;

      LocationApi.fetchFoodTypes(res.geohash).then((res) => {
        let temp = [];
        const itemCount = 8;//一页8个分类
        const pageCount = res.length / itemCount;
        const last = res.length % 8; //余下的个数，不满一页8个的，如果=0则刚刚被整除
        for (let i = 0; i < pageCount; i++) {
          temp.push(res.slice(i * itemCount, (i + 1) * itemCount));
        }
        if (last > 0) {
          temp.push(res.slice(itemCount * pageCount, res.length))
        }
        this.props.homeStore.categoryAddAll(temp);
        temp = null
      });

      this._fetchShop(res.latitude, res.longitude);
    })
  }

  _fetchShop(latitude, longitude) {
    LocationApi.fetchShopList(latitude, longitude, 0).then((res) => {
      this.props.homeStore.shopAddAll(res)
    })
  }

  /**2.手动滑动分页实现 */
  _onAnimationEnd(e) {
    //求出偏移量
    let offsetX = e.nativeEvent.contentOffset.x;
    //求出当前页数
    let pageIndex = Math.floor(offsetX / screenW);
    this.setState({curSelectPage: pageIndex})
  }

  renderView() {
    return (
      <View style={{flex: 1}}>
        {this._renderNavBar()}
        <FlatList
          data={this.props.homeStore.getShopList}
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
              <Text white text={this.props.homeStore.getLocation}/>
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
      <Column style={{backgroundColor:Color.white}}>
        <ScrollView
          contentContainerStyle={{width:screenW * this.props.homeStore.getCategoryList.length}}
          bounces={false}
          pagingEnabled={true}
          horizontal={true}
          //滑动完一贞
          onMomentumScrollEnd={(e)=>{this._onAnimationEnd(e)}}
          showsHorizontalScrollIndicator={false}>
          {this.props.homeStore.getCategoryList.map((data, index) => this._renderPage(data, index))}
        </ScrollView>
        <Row horizontalCenter>
          {this._renderAllIndicator()}
        </Row>
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

  /**3.页面指针实现 */
  _renderAllIndicator() {
    let indicatorArr = [];
    let style;
    let length = this.props.homeStore.getCategoryList.length;
    for (let i = 0; i < length; i++) {
      style = (i===this.state.curSelectPage)?{backgroundColor:Color.theme}:{backgroundColor:Color.gray3};
      indicatorArr.push(<View key={i} style={[styles.bannerDotStyle,style]}/>);
    }
    return indicatorArr;
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
    ...wh(16),
    borderRadius:px2dp(8),
    ...marginTB(0,15),
    ...marginLR(6)
  },
  typesView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
});