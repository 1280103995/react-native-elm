import React, {PureComponent} from 'react';
import Row from "./Row";
import {paddingTB, px2dp, px2sp} from "../utils/ScreenUtil";
import Color from "../app/Color";
import Column from "./Column";
import Text from "./Text";
import {StyleSheet} from "react-native";

export default class RedPacketItem extends PureComponent {

  render() {
    const data = this.props.data;
    return (
      <Row style={styles.itemStyle}>
          <Column>
            <Row style={{alignItems:'flex-end'}}>
              <Text smallSize red text={'￥'} style={{...paddingTB(0,5)}}/>
              <Text red text={data.amount} style={{fontSize:px2sp(40)}}/>
            </Row>
            <Text mediumSize text={data.description_map.sum_condition} style={{marginTop:px2dp(15)}}/>
          </Column>
          <Column style={{marginLeft:px2dp(20)}}>
            <Text mediumSize text={data.name}/>
            <Text mediumSize gray text={data.description_map.validity_periods}/>
            <Text mediumSize gray text={data.description_map.phone}/>
          </Column>

        <Text mediumSize red text={data.description_map.validity_delta}/>
      </Row>
    )
  }
}

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent:'space-between',
    padding:px2dp(15),
    borderRadius:px2dp(8),
    backgroundColor:Color.white
  }
});