import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import Row from './Row';
import Image from './Image';
import Column from './Column';
import Text from './Text';
import {marginLR, px2dp, wh} from '../utils/ScreenUtil';
import VisibleView from './VisibleView';
import {inject, observer} from 'mobx-react';
import Color from '../app/Color';

@inject('cartStore')
@observer
export default class ShopFoodItem extends React.Component {

  static propTypes = {
    item: PropTypes.any,
    addActionCallback: PropTypes.func
  };

  static defaultProps = {
    item: undefined,
    addActionCallback: ()=>null
  };

  /**
   * @param pressEvent 按压事件
   * @param food 商品
   * @private
   */
  _add = (pressEvent, food) => {
    this.props.cartStore.addFood(food);
    this.props.addActionCallback(pressEvent)
  };

  _sub = (food) => {
    this.props.cartStore.subFood(food);
  };

  render() {
    const {item} = this.props;

    let price = 0;
    if (item.specfoods !== undefined && item.specfoods.length > 0) {
      price = item.specfoods[0].price;
    }
    let buyNum = item.buyNum;//从列表中读取份数
    let food = this.props.cartStore.getFood(item);//查看这商品是否在购物车中
    if (food) {//如果在
      buyNum = food.buyNum;//读取它的已经加入的份数
    }

    return (
      <View style={styles.rItem}>
        <Row style={{flex: 1}}>
          <Image style={styles.icon} source={item.image_path}/>
          <Column style={styles.rItemDetail}>
            <Text mediumSize text={item.name} style={{fontWeight: '600'}}/>
            <Text microSize text={item.tips}/>
            <Text microSize orange text={`￥${price}`}/>
          </Column>
          {/*加减*/}
          <Row verticalCenter style={{position: 'absolute', right: px2dp(20), bottom: px2dp(20)}}>
            <VisibleView visible={buyNum > 0}>
              <Row verticalCenter>
                {/*减*/}
                <TouchableOpacity
                  style={[styles.itemActionStyle, styles.lItemActionBg]}
                  onPress={() => this._sub(item)}>
                  <Text largeSize theme text={'-'}/>
                </TouchableOpacity>
                {/*购买数量*/}
                <Text text={buyNum} style={{...marginLR(20)}}/>
              </Row>
            </VisibleView>
            {/*加*/}
            <TouchableOpacity
              style={[styles.itemActionStyle, styles.rItemActionBg]}
              onPress={(e) => this._add(e, item)}>
              <Text largeSize white text={'+'}/>
            </TouchableOpacity>
          </Row>
        </Row>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  rItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white,
  },
  rItemDetail: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 5, justifyContent: 'space-between',
  },
  icon: {
    height: 60,
    width: 60,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#999999',
  },
  itemActionStyle: {
    ...wh(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lItemActionBg: {
    borderRadius: px2dp(20),
    borderWidth: px2dp(1),
    borderColor: Color.theme,
    backgroundColor: Color.white,
  },
  rItemActionBg: {
    borderRadius: px2dp(20),
    backgroundColor: Color.theme,
  },
});
