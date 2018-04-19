import React from 'react'
import BaseScreen from "../../BaseScreen";
import {FlatList, TouchableOpacity,StyleSheet} from "react-native";
import Divider from "../../../view/Divider";
import Text from "../../../view/Text";
import Row from "../../../view/Row";
import {px2dp, wh} from "../../../utils/ScreenUtil";
import Color from "../../../app/Color";
import Column from "../../../view/Column";
import Image from "../../../view/Image";
import Images from "../../../app/Images";

export default class AddressScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('收货地址');
    this.state = {
      address:[]
    };
  }

  _isChose(){
    return this.props.navigation.state.params.chose
  }

  _onMenuClick = () => {
    this.props.navigation.navigate('AddAddress')
  };

  _onItemClick = (item) => {
    const navigation = this.props.navigation;
    if (this._isChose()){
      navigation.state.params.callback(item);
      navigation.goBack()
    }
  };

  renderMenu(){
    return(
      <TouchableOpacity onPress={this._onMenuClick}>
        <Text white text={'新增'} style={{margin:px2dp(10)}}/>
      </TouchableOpacity>
    )
  }

  renderView() {
    return (
      <FlatList
        data={this.state.address}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        ItemSeparatorComponent={() => <Divider style={{height:px2dp(20)}}/>}
      />
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={this._isChose() ? 0.1 : 1} onPress={()=>this._onItemClick(item)}>
        <Row style={styles.itemStyle}>
          <Column style={{justifyContent:'space-between'}}>
            <Text mediumSize text={'新增'}/>
            <Text mediumSize text={'新增'}/>
          </Column>
          <TouchableOpacity onPress={()=>null}>
            <Image source={Images.Common.close} style={{...wh(30),margin:px2dp(10)}}/>
          </TouchableOpacity>
        </Row>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  itemStyle:{
    justifyContent:'space-between',
    margin:px2dp(20),
    backgroundColor:Color.white
  }
});