import React from 'react'
import BaseScreen from "../BaseScreen";
import {FlatList, TouchableOpacity,StyleSheet,Linking} from "react-native";
import Divider from "../../view/Divider";
import Column from "../../view/Column";
import Color from "../../app/Color";
import Row from "../../view/Row";
import {marginLR, paddingTB, px2dp, screenW, wh} from "../../utils/ScreenUtil";
import Text from "../../view/Text";
import Image from "../../view/Image";
import Images from "../../app/Images";
import RedPacketApi from "../../api/RedPacketApi";

export default class ServiceCenterScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('服务中心');
    this.state = {
      data:[]
    };
  }

  componentDidMount() {
      RedPacketApi.fetchGetSearch().then((res)=>{
        let obj = res.data;
        let keys = Object.keys(obj);
        let arr = [];
        keys.forEach((key,index) => {
          if(key.indexOf('Caption')>-1) {
            arr.push(obj[key])
          }
        });
        this.setState({data:arr})
      })
  }

  _onHeaderItemClick = (index) => {
    if (index !== 1){
      alert('客服下班了');
      return;
    }
    Linking.openURL('tel: 10086')
  };

  renderView() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={this._renderHeader}
        ItemSeparatorComponent={() => <Divider/>}
      />
    )
  }

  _renderHeader = () => {
    return(
      <Column style={{backgroundColor:Color.white}}>
        <Row verticalCenter>
          {this._renderActionItem(Images.My.service, '在线客服', 0)}
          {this._renderActionItem(Images.ServiceCenter.phone, '在线客服', 1)}
        </Row>
        <Divider/>
        <Text text={'热门问题'} style={{...marginLR(25),...paddingTB(30)}}/>
        <Divider/>
      </Column>
    )
  };

  _renderActionItem = (img, label, index) => {
    let style = null;
    if (index === 0){
      style = {
        borderRightColor:Color.divider,
        borderRightWidth:px2dp(1)
      }
    }
    return(
      <TouchableOpacity style={[styles.headItemStyle,style]} onPress={()=>this._onHeaderItemClick(index)}>
        <Image source={img} style={{...wh(50),marginBottom:px2dp(10)}}/>
        <Text text={label}/>
      </TouchableOpacity>
    )
  };

  _renderItem = ({item, index}) => {
    return(
      <Row verticalCenter style={{justifyContent:'space-between',padding:px2dp(25),backgroundColor:Color.white}}>
        <Text text={item}/>
        <Image source={Images.Common.arrowRight} style={{...wh(25),tintColor:Color.gray3}}/>
      </Row>
    )
  };
}

const styles = StyleSheet.create({
  headItemStyle:{
    width:screenW / 2,
    ...paddingTB(30),
    justifyContent:'center',
    alignItems:'center'
  },
});
