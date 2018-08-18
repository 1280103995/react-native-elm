import React, {PureComponent} from 'react'
import Row from "./Row";
import Color from "../app/Color";
import {TouchableOpacity, StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import Image from "./Image";
import {paddingLR, paddingTB, px2dp, wh} from "../utils/ScreenUtil";
import Column from "./Column";
import Text from "./Text";
import StarRating from "./StarRating";

export default class ShopListItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const data = this.props.data;
    return (
      <TouchableOpacity onPress={() => this.props.onClick()}>
        <Row verticalCenter style={{
          justifyContent: 'space-between', ...paddingLR(20), ...paddingTB(30),
          backgroundColor: Color.white
        }}>
          {/*左边*/}
          <Row verticalCenter style={{flex:1}}>
            <Image source={data.image_path} style={{...wh(100)}}/>
            <Column style={{justifyContent: 'space-between', marginLeft: px2dp(20)}}>
              {/*标题*/}
              <Row verticalCenter>
                <Text microSize style={{backgroundColor: Color.yellow}} text={'品牌'}/>
                <Text style={styles.titleStyle} text={data.name} numberOfLines={1}/>
              </Row>
              {/*得分，销量*/}
              <Row verticalCenter>
                <StarRating
                  maxStars={5}
                  rating={parseInt(data.rating)}
                  disabled={true}
                  starSize={13}
                />
                <Text microSize orange text={data.rating}/>
                <Text microSize text={data.recent_order_num}/>
              </Row>
              <Text microSize text={`￥${data.float_minimum_order_amount}起送 / 配送费约￥${data.float_delivery_fee}`}/>
            </Column>
          </Row>
          {/*右边*/}
          <Column style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Row verticalCenter>
              {this._renderIcon(data)}
            </Row>
            <Row verticalCenter>
              <View style={[styles.icon, {borderColor: Color.theme, backgroundColor: Color.theme}]}>
                <Text microSize white text={'蜂鸟专送'}/>
              </View>
              <View style={[styles.icon, {borderColor: Color.theme, marginLeft: px2dp(10)}]}>
                <Text microSize theme text={'准时达'}/>
              </View>
            </Row>
            <Row verticalCenter>
              <Text microSize gray text={`${data.distance} / `}/>
              <Text microSize theme text={data.order_lead_time}/>
            </Row>
          </Column>
        </Row>
      </TouchableOpacity>
    )
  }

  _renderIcon(data) {
    let icon = [];
    {
      data.supports.map((item, index) =>
        icon.push(
          <View style={[styles.icon, {margin: px2dp(2)}]} key={index}>
            <Text microSize gray text={item.icon_name}/>
          </View>
        ))
    }
    return icon
  }
}

const styles = StyleSheet.create({
  icon: {
    padding: px2dp(2),
    borderRadius: px2dp(2),
    borderWidth: px2dp(1),
    borderColor: Color.divider
  },
  titleStyle: {
    flex:1,
    fontWeight: '600',
    marginLeft: px2dp(10)
  },
});