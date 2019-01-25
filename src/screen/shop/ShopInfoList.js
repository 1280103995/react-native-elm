import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  SectionList,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import Color from "../../app/Color";
import Button from "../../view/Button";
import {marginLR, px2dp, px2sp, screenW, wh} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import ShopBar from "../../view/ShopBar";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Text from "../../view/Text";
import VisibleView from "../../view/VisibleView";
import CartBall from "../../view/CartBall";
import Image from "../../view/Image";

@inject('cartStore', 'shopInfoViewModel')
@observer
export default class ShopInfoList extends Component {

  constructor(props) {
    super(props);
    this.startPosition = null;
    this.endPosition = null
  }

  componentDidMount() {
    this.props.shopInfoViewModel.fetchFootList(this.props.shopID);
  };

  _add = (food) => {
    this.props.shopInfoViewModel.addFoodBuyNum(food);
    this.props.cartStore.addFood(food);

    this._measurePosition()
  };

  _sub = (food) => {
    this.props.shopInfoViewModel.subFoodBuyNum(food);
    this.props.cartStore.subFood(food)
  };

  async _measurePosition() {
    await this._measure();
    console.log('开始', this.startPosition, '结束', this.endPosition)
    this.cartBall.startAnim(this.startPosition, this.endPosition, this._doAnim);
  }

  _measure() {
    this._measureStart();
    if (this.endPosition === null) {
      this._measureEndPosition();
    }
  }

  /*
  * 测量按钮位置
  * */
  _measureStart() {
    const handle = findNodeHandle(this.addAction);
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      this.startPosition = {x: parseInt(pageX), y: parseInt(pageY)};
    });
  }

  /*
  * 测量小球结束位置
  * */
  _measureEndPosition() {
    const handle = findNodeHandle(this.cartElement);
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      this.endPosition = {x: parseInt(pageX), y: parseInt(pageY)};
    });
  }

  _doAnim = () => {
    this.shopBar.runAnimate()
  };

  _measureView(view) {
    return new Promise((resolve) => {
      view.measure((x, y, width, height, px, py) => resolve({x, y, width, height, px, py}))
    });
  }

  _chooseFootType = (index) => {
    this.props.shopInfoViewModel.setSelectIndex(index);
    this.sectionlist.scrollToLocation({animated: true, sectionIndex: index, itemIndex: 0, viewOffset: 30});
  };

  _itemChange = (info) => {
    const item = info.viewableItems[0].item;
    if (item) {
      let index = this.props.shopInfoViewModel.getFootList.indexOf(item);
      if (index >= 0) {
        this.props.shopInfoViewModel.setSelectIndex(index);
      }
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
            keyExtractor={(item, index) => item + index}
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
            keyExtractor={(item, index) => item._id + item.item_id}
            ItemSeparatorComponent={() => <Divider/>}
            onViewableItemsChanged={this._itemChange}
          />
        </Row>
        <CartBall ref={r => this.cartBall = r}/>
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
    const isSelect = index === this.props.shopInfoViewModel.getSelectIndex;
    return (
      <Button
        style={[styles.lItem,
          {
            borderBottomColor: index + 1 === length ? Color.divider : 'transparent',
            borderBottomWidth: index + 1 === length ? px2dp(1) : 0
          }]}
        title={item.key}
        titleStyle={{fontSize: px2sp(26), color: isSelect ? Color.theme : Color.black}}
        onPress={() => this._chooseFootType(index)}
      />
    )
  };

  _renderSectionHeader = (info) => {
    return (
      <View style={{height: 30, backgroundColor: '#DEDEDE', justifyContent: 'center', alignItems: 'center'}}>
        <Text>{info.section.key}</Text>
      </View>
    )
  };

  _renderRightItem = (info) => {
    let price = 0;
    if (info.item.specfoods !== undefined && info.item.specfoods.length > 0) {
      price = info.item.specfoods[0].price
    }
    console.log('buyNum', info.item.buyNum)
    let buyNum = 0;
    let index = this.props.cartStore.allFoods.indexOf(info.item);
    if (index >= 0) {
      let tempItem = this.props.cartStore.allFoods[index];
      buyNum = tempItem.buyNum;
    }
    return (
      <View style={styles.rItem}>
        <Row style={{flex: 1}}>
          <Image style={styles.icon} source={info.item.image_path}/>
          <Column style={styles.rItemDetail}>
            <Text mediumSize text={info.item.name} style={{fontWeight: '600'}}/>
            <Text microSize text={info.item.tips}/>
            <Text microSize orange text={`￥${price}`}/>
          </Column>
          {/*加减*/}
          <Row verticalCenter style={{position: 'absolute', right: px2dp(20), bottom: px2dp(20)}}>
            <VisibleView visible={info.item.buyNum > 0}>
              <Row verticalCenter>
                {/*减*/}
                <TouchableOpacity
                  style={[styles.itemActionStyle, styles.lItemActionBg]}
                  onPress={() => this._sub(info.item)}>
                  <Text largeSize theme text={'-'}/>
                </TouchableOpacity>
                {/*购买数量*/}
                <Text text={buyNum} style={{...marginLR(20)}}/>
              </Row>
            </VisibleView>
            {/*加*/}
            <TouchableOpacity
              ref={r => this.addAction = r}
              style={[styles.itemActionStyle, styles.rItemActionBg]}
              onPress={() => this._add(info.item)}>
              <Text largeSize white text={'+'}/>
            </TouchableOpacity>
          </Row>
        </Row>
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