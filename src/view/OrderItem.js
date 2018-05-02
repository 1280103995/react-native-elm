import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Column from "./Column";
import Row from "./Row";
import Image from "./Image";
import {paddingTB, px2dp, wh} from "../utils/ScreenUtil";
import Text from "./Text";
import Color from "../app/Color";
import Divider from "./Divider";
import {TouchableOpacity} from "react-native";

export default class OrderItem extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    onItemClick: PropTypes.func,
    onAgainClick: PropTypes.func
  };

  render() {
    const item = this.props.data;
    return (
      <TouchableOpacity onPress={() => this.props.onItemClick()} style={{marginTop:px2dp(20)}}>
        <Column style={{padding: px2dp(20), backgroundColor: Color.white}}>
          <Row>
            <Image source={item.restaurant_image_url} style={{...wh(80), marginRight: px2dp(10)}}/>
            <Row style={{flex:1,justifyContent: 'space-between', borderBottomColor: Color.divider, borderBottomWidth: px2dp(1)}}>
              <Column>
                <Text text={item.restaurant_name}/>
                <Text mediumSize gray text={item.formatted_created_at}/>
              </Column>
              <Text mediumSize text={item.status_bar.title}/>
            </Row>
          </Row>
          <Row verticalCenter style={{justifyContent: 'space-between', ...paddingTB(25)}}>
            <Text mediumSize text={`食品名称  等${item.total_quantity}件商品`} style={{marginLeft: px2dp(60)}}/>
            <Text mediumSize text={`￥${item.total_amount}`}/>
          </Row>
          <Divider style={{marginLeft: px2dp(60)}}/>
          <Row verticalCenter style={{justifyContent: 'flex-end', ...paddingTB(20,0)}}>
            <Text theme mediumSize text={'再来一单'} onPress={() => this.props.onAgainClick()}/>
          </Row>
        </Column>
      </TouchableOpacity>
    )
  }
}