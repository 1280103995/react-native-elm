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
import {observer} from "mobx-react";
import AddressListViewModel from "../../../mvvm/viewmodel/AddressListViewModel";

@observer
export default class AddressScreen extends BaseScreen {

  addressListViewModel = new AddressListViewModel();

  constructor(props) {
    super(props);
    this.setTitle('收货地址');
  }

  componentDidMount() {
    this.addressListViewModel.fetchData(UserInfo.user_id)
  }

  _isChose(){
    return this.props.navigation.state.params.chose
  }

  _onMenuClick = () => {
    this.toPage('AddAddress',{callback:this._handleAddAddressSuccess})
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
    if (state) this.addressListViewModel.fetchData(UserInfo.user_id)
  };

  _fetchDeleteAddress(item){
    this.addressListViewModel.deleteItem(UserInfo.user_id, item);
  }

  renderNavRightView = () => {
    return(
      <TouchableOpacity onPress={this._onMenuClick}>
        <Text white text={'新增'} style={{margin:px2dp(10)}}/>
      </TouchableOpacity>
    )
  };

  renderView() {
    return (
      <FlatList
        data={this.addressListViewModel.getList}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        ListEmptyComponent={()=><Text text={'您还没有收货地址哦!'}/>}
        ItemSeparatorComponent={() => <Divider style={{height:px2dp(20)}}/>}
        contentContainerStyle={[{flex: 1}, this._contentStyle()]}
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

  _contentStyle(){
    return this.addressListViewModel.getList.length ? null : {justifyContent: 'center', alignItems:'center'}
  }
}

const styles = StyleSheet.create({
  itemStyle:{
    justifyContent:'space-between',
    padding:px2dp(20),
    backgroundColor:Color.white
  }
});
