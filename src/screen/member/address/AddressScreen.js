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
import AddressApi from "../../../api/AddressApi";
import {inject, observer} from "mobx-react";
import Toast from "../../../view/Toast";

@inject('addressListStore')
@observer
export default class AddressScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('收货地址');
  }

  componentDidMount() {
    this._fetchAddressList()
  }

  _isChose(){
    return this.props.navigation.state.params.chose
  }

  _onMenuClick = () => {
    this.props.navigation.navigate('AddAddress',{callback:this._handleAddAddressSuccess})
  };

  /*下单的时候选择地址，回调*/
  _onItemClick = (item) => {
    const navigation = this.props.navigation;
    if (this._isChose()){
      navigation.state.params.callback(item);
      navigation.goBack()
    }
  };

  /*添加地址成功后回调，刷新页面*/
  _handleAddAddressSuccess = (state) => {
    if (state) this._fetchAddressList()
  };

  _fetchAddressList(){
    AddressApi.fetchGetAddressList(UserInfo.user_id).then((res)=>{
      this.props.addressListStore.addAll(res)
    })
  }

  _fetchDeleteAddress(item){
    AddressApi.fetchDeleteAddress(UserInfo.user_id, item.id).then((res)=>{
      // this.props.addressListStore.deleteItem(item); //为什么无法删除
      this._fetchAddressList();
      Toast.show(res.success)
    })
  }

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
        data={this.props.addressListStore.getList}
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
            <Text mediumSize text={item.address}/>
            <Text mediumSize text={item.phone}/>
          </Column>
          <TouchableOpacity onPress={()=>this._fetchDeleteAddress(item)}>
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
    padding:px2dp(20),
    backgroundColor:Color.white
  }
});