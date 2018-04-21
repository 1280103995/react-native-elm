import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  SectionList,
  Image, TouchableOpacity,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import ParcelData from './ParcelData.json'
import Color from "../../app/Color";
import Button from "../../view/Button";
import {marginLR, px2dp, px2sp, screenW, wh} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import ShopBar from "../../view/ShopBar";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Text from "../../view/Text";
import VisibleView from "../../view/VisibleView";
import CartAnimated from "../../view/CartAnimated";

let Headers = [];

@inject(['cartStore'])
@observer
export default class ShopInfoList extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      selectIndex: 0, //左边列表选中的位置
    };
    this.startPosition = {x: 200, y:200};
    this.endPosition = null
  }

  componentDidMount() {
    ParcelData.map((item, i) => {
      Headers.push(item.section);
    });
  };

  _add = (data) => {
    this.props.cartStore.addFood(data.item);

    this.cartElement.measure((x, y, width, height, px, py) => {
      this.endPosition = {x: px, y: py};
      this.refs.cart.startAnim(this.startPosition,this.endPosition,this._doAnim)
    });
  };

  _doAnim = () => {
    this.shopBar.runAnimate()
  };

  _sub = (data) => {
    this.props.cartStore.subFood(data.item)
  };

  _measureView(view) {
    return new Promise((resolve) => {
      view.measure((x, y, width, height, px, py) => resolve({x, y, width, height, px, py}))
    });
  }

  _cellAction = (item) => {
    if (item.index <= ParcelData.length) {
      // this.setState({selectIndex: item.index});
      this.section.scrollToLocation({animated: false, itemIndex: item.index})
    }
  };

  itemChange = (info) => {
    let section = info.viewableItems[0].item.section;
    if (section) {
      let index = Headers.indexOf(section);
      if (index < 0) {
        index = 0;
      }
      this.setState({selectIndex: index});
    }
  };

  render() {
    return (
      <Column style={styles.container}>
        <Row style={{flex: 1}}>
          <FlatList
            ref={(flat) => this.flat = flat}
            style={styles.leftList}
            data={ParcelData}
            renderItem={(item) => this.renderLRow(item)}
            ItemSeparatorComponent={() => <Divider/>}
            keyExtractor={(item) => item.section}
          />
          <SectionList
            ref={(section) => this.section = section}
            style={styles.rightList}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={(section) => this.sectionComp(section)}
            renderItem={(item) => this.renderRRow(item)}
            sections={ParcelData}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => <Divider/>}
            onViewableItemsChanged={(info) => this.itemChange(info)}
          />
        </Row>
        <CartAnimated ref={'cart'}/>
        <ShopBar
          ref={(s) => this.shopBar = s}
          cartElement={(c) => this.cartElement = c}
          store={this.props.cartStore}
          navigation={this.props.navigation}/>
      </Column>
    );
  }

  renderLRow = (item) => {
    return (
      <Button
        style={[styles.lItem,
          {
            borderBottomColor: item.index + 1 === ParcelData.length ? Color.divider : 'transparent',
            borderBottomWidth: item.index + 1 === ParcelData.length ? px2dp(1) : 0
          }]}
        title={item.item.section}
        titleStyle={{fontSize: px2sp(26), color: item.index === this.state.selectIndex ? Color.theme : Color.black}}
        onPress={() => this._cellAction(item)}
      />
    )
  };

  renderRRow = (item) => {
    return (
      <View style={styles.rItem}>
        <Row style={{flex: 1}}>
          <Image style={styles.icon} source={{uri: item.item.img}}/>
          <Column style={styles.rItemDetail}>
            <Text mediumSize text={item.item.name} style={{fontWeight: '600'}}/>
            <Row verticalCenter>
              <Text microSize text={item.item.sale}/>
              <Text microSize text={item.item.favorite} style={{marginLeft: 15}}/>
            </Row>
            <Text microSize orange text={`￥${item.item.money}`}/>
          </Column>
          {/*加减*/}
          <Row verticalCenter style={{position: 'absolute', right: px2dp(20), bottom: px2dp(20)}}>
            <VisibleView visible={this.props.cartStore.getFoodBuyNum(item.item) > 0}>
              <Row verticalCenter>
                <TouchableOpacity style={[styles.itemActionStyle, styles.lItemActionBg]}
                                  onPress={() => this._sub(item)}>
                  <Text largeSize theme text={'-'}/>
                </TouchableOpacity>
                <Text text={this.props.cartStore.getFoodBuyNum(item.item)} style={{...marginLR(20)}}/>
              </Row>
            </VisibleView>
            <TouchableOpacity
              ref={(t) => this.addAction = t}
              style={[styles.itemActionStyle, styles.rItemActionBg]} onPress={() => this._add(item)}>
              <Text largeSize white text={'+'}/>
            </TouchableOpacity>
          </Row>
        </Row>
      </View>
    )
  };

  sectionComp = (section) => {
    return (
      <View style={{height: 30, backgroundColor: '#DEDEDE', justifyContent: 'center', alignItems: 'center'}}>
        <Text>{section.section.section}</Text>
      </View>
    )
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background
  },
  leftList: {
    width: 1 * screenW / 4,
  },
  lItem: {
    minHeight: px2dp(80),
    justifyContent: 'center',
    backgroundColor: Color.white,
  },
  lText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
  },
  rightList: {
    width: 3 * screenW / 4
  },
  rItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white
  },
  rItemDetail: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 5, justifyContent: 'space-between'
  },
  icon: {
    height: 60,
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#999999'
  },
  saleFavorite: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  itemActionStyle: {
    ...wh(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  lItemActionBg: {
    borderRadius: px2dp(20),
    borderWidth: px2dp(1),
    borderColor: Color.theme,
    backgroundColor: Color.white
  },
  rItemActionBg: {
    borderRadius: px2dp(20),
    backgroundColor: Color.theme
  },
});