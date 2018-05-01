import React from 'react'
import {View, Platform, StatusBar, TouchableWithoutFeedback, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from "react-native";
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
import RefreshListView from "../../view/RefreshListView";
import * as HomeAction from "../../redux/actions/HomeAction";
import {connect} from "react-redux";

class HomeScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setNavBarVisible(false);
    this.state = {
      curSelectPage: 0
    }
  }

  _onCategoryItemClick = (category) => {
    this.props.navigation.navigate('Category',{data:category,latitude:this.props.latitude,longitude:this.props.longitude})
  };

  componentDidMount() {
    this.props.getData();
  }

  componentDidUpdate() {
    Geohash = this.props.geohash
  }

  /*列表组件回调方法*/
  _onHeaderRefresh = () => {
    this.props.getData();
  };

  /*列表组件加载更多回调方法*/
  _onFooterRefresh = () => {
    if (this.props.noMoreData) return;
    this.props.loadMore(this.props.latitude, this.props.longitude)
  };

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

        <RefreshListView
          data={this.props.shopList}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + item.name}
          ItemSeparatorComponent={() => <Divider/>}
          ListHeaderComponent={this._renderHeader}
          refreshState={this.props.refreshState}
          onHeaderRefresh={this._onHeaderRefresh}
          onFooterRefresh={this._onFooterRefresh}
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
              <Text white text={this.props.cityName}/>
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
    const length = this.props.categoryList.length;
    if (length === 0) return null;
    return (
      <Column style={{backgroundColor:Color.white}}>
        <ScrollView
          contentContainerStyle={{width:screenW * length}}
          bounces={false}
          pagingEnabled={true}
          horizontal={true}
          //滑动完一贞
          onMomentumScrollEnd={(e)=>{this._onAnimationEnd(e)}}
          showsHorizontalScrollIndicator={false}>
          {this.props.categoryList.map((data, index) => this._renderPage(data, index))}
        </ScrollView>
        <Row horizontalCenter>
          {this._renderAllIndicator(length)}
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
  _renderAllIndicator(length) {
    let indicatorArr = [];
    let style;
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

const mapStateToProps = state => ({
  refreshState: state.homeReducer.refreshState,
  noMoreData: state.homeReducer.noMoreData,
  latitude: state.homeReducer.latitude,
  longitude: state.homeReducer.longitude,
  geohash: state.homeReducer.geohash,
  cityName: state.homeReducer.name,
  categoryList: state.homeReducer.categoryList,
  shopList: state.homeReducer.shopList
});

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(HomeAction.getHomeData()),
  loadMore: (latitude, longitude) => dispatch(HomeAction.loadMoreShopList(latitude, longitude))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);