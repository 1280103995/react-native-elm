/**
 *
 * TODO 数据重复问题未解决，造成key值重复，引发列表滚动异常，选择分类展示异常
 *
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  SectionList,
  UIManager,
  findNodeHandle,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import Color from "../../app/Color";
import Button from "../../view/Button";
import {px2dp, px2sp, screenW} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import ShopBar from "../../view/ShopBar";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Text from "../../view/Text";
import ShopFoodItem from '../../view/ShopFoodItem';

@inject('cartStore')
@observer
export default class ShopInfoList extends Component {

  constructor(props) {
    super(props);
    this.isManualSelect = false;
    this.startPosition = {x:0,y:0};
    this.endPosition = null
  }

  componentDidMount() {
    this.props.shopInfoViewModel.fetchFootList(this.props.shopID);
  };

  _measurePosition = async(pressEvent) => {
    this.startPosition.x = pressEvent.nativeEvent.pageX;
    this.startPosition.y = pressEvent.nativeEvent.pageY;

    if (this.endPosition === null) {
      this.endPosition = await this._measureEndPosition();
    }
    this.props.shopInfoViewModel.cartBall.startAnim(this.startPosition, this.endPosition, this._doAnim);
  };

  _doAnim = () => {
    this.shopBar.runAnimate()
  };

  _measureEndPosition() {
    const handle = findNodeHandle(this.cartElement);
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => resolve({x: pageX, y: pageY + height / 2}))
    });
  }

  _chooseFoodType = (index) => {
    //表示是手动选择
    this.isManualSelect = true;
    this.sectionlist.scrollToLocation({animated: false, sectionIndex: index, itemIndex: 0, viewOffset: 0});
    //直接点击左边第一项，_itemChange()不进判断，所以在这里设置选中第一项
    if (index === 0) this.props.shopInfoViewModel.setSelectIndex(index);
  };

  _itemChange = (info) => {
    if (info.viewableItems.length < 1) return;
    const item = info.viewableItems[0].item;
    if (!item) return;
    let index = item.category_index;
    //没有滑动顶部时，item是商品对象，滑动到顶部时，item是section对象
    if (!item.key && this.props.shopInfoViewModel.categoryIndex !== index) {
      if (this.isManualSelect){
        index++;
        this.isManualSelect= false
      }
      this.props.shopInfoViewModel.setSelectIndex(index);
    }
  };

  render() {
    return (
      <Column style={styles.container}>
        <Row style={{flex: 1}}>
          <FlatList
            style={styles.leftList}
            data={this.props.shopInfoViewModel.getFootList}
            renderItem={this._renderLeftItem}
            keyExtractor={(item, index) => item.id + item.index + item.key + item.restaurant_id}
            getItemLayout={(data, index) => (
              {length: px2dp(81), offset: px2dp(81) * index, index}
            )}
            ItemSeparatorComponent={() => <Divider/>}
          />
          <SectionList
            ref={(section) => this.sectionlist = section}
            style={styles.rightList}
            sections={this.props.shopInfoViewModel.getFootList}
            extraData={this.props.cartStore.allFoods}
            stickySectionHeadersEnabled={true}
            renderSectionHeader={this._renderSectionHeader}
            renderItem={this._renderRightItem}
            keyExtractor={(item, index) => {
              return item.category_index +'，'+ item.item_id
            }}
            getItemLayout={(data, index) => (
              {length: 81, offset: 81 * index, index}
            )}
            ItemSeparatorComponent={() => <Divider/>}
            onViewableItemsChanged={this._itemChange}
          />
        </Row>
        <ShopBar
          ref={(s) => this.shopBar = s}
          cartElement={(c) => this.cartElement = c}
          store={this.props.cartStore}
          navigation={this.props.navigation}/>

      </Column>
    );
  }

  _renderLeftItem = ({item, index}) => {
    const length = this.props.shopInfoViewModel.getFootList.length;
    const isSelect = item.isSelect;
    return (
      <Button
        style={[styles.lItem,
          {
            borderBottomColor: index + 1 === length ? Color.divider : 'transparent',
            borderBottomWidth: index + 1 === length ? px2dp(1) : 0
          }]}
        title={item.key}
        titleStyle={{fontSize: px2sp(26), color: isSelect ? Color.theme : Color.black}}
        onPress={() => this._chooseFoodType(index)}
      />
    )
  };

  _renderSectionHeader = (info) => {
    return (
      <View style={styles.sectionHeader}>
        <Text>{info.section.key}</Text>
      </View>
    )
  };

  _renderRightItem = ({item}) =>
    <ShopFoodItem
      item={item}
      addActionCallback={this._measurePosition}
      shopInfoViewModel={this.props.shopInfoViewModel}/>;
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
  sectionHeader:{
    height: 30,
    backgroundColor: '#DEDEDE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  saleFavorite: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  }
});
