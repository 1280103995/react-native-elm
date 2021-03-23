import React, {Component} from 'react'
import Column from "../../../view/Column";
import {FlatList, StyleSheet} from "react-native";
import Row from "../../../view/Row";
import Button from "../../../view/Button";
import Color from "../../../app/Color";
import Divider from "../../../view/Divider";
import {marginLR, paddingTB, px2dp, screenW} from "../../../utils/ScreenUtil";
import RedPacketItem from "../../../view/RedPacketItem";
import RedPacketApi from "../../../api/RedPacketApi";
import Text from "../../../view/Text";
import ChangeRedPacketScreen from "../ChangeRedPacketScreen";

export default class RedPacket extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    RedPacketApi.fetchGetRedPacketNum(UserInfo.user_id).then((res) => {
      this.setState({data: res.data})
    })
  }

  render() {
    return (
      <Column style={{flex: 1}}>
        <FlatList
          style={{...marginLR(20)}}
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + item.name}
          ItemSeparatorComponent={() => <Divider height={20} color={'transparent'}/>}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
        />
        <Row style={{backgroundColor: Color.background}}>
          <Button
            onPress={()=>this.props.navigation.navigate('ChangeRedPacket')}
            title={'兑换红包'}
            titleStyle={{color: Color.black}}
            style={[styles.btnStyle, {marginRight: px2dp(1)}]}/>
          <Button
            title={'推荐有奖'}
            titleStyle={{color: Color.black}}
            style={styles.btnStyle}/>
        </Row>
      </Column>
    )
  }

  _renderHeader = () => {
    return (
      <Row verticalCenter style={styles.headerStyle}>
        <Text smallSize>{'有 '}
          <Text red >{this.state.data.length}
            <Text smallSize black>{' 个红包即将到期'}</Text>
          </Text>
        </Text>
        <Text smallSize theme text={'红包说明'}/>
      </Row>
    )
  };

  _renderItem = ({item, index}) => <RedPacketItem data={item}/>;

  _renderFooter = () => <Text smallSize gray text={'限品类： 快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理'} style={styles.footerStyle}/>;

}

const styles = StyleSheet.create({
  btnStyle: {
    width: screenW / 2,
    height: px2dp(70),
    backgroundColor: Color.white
  },
  headerStyle: {
    justifyContent: 'space-between',
    ...paddingTB(15)
  },
  footerStyle: {
    margin:px2dp(20)
  },
});
