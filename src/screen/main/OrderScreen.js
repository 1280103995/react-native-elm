import React from 'react'
import {FlatList} from "react-native";
import BaseScreen from "../BaseScreen";
import OrderItem from "../../view/OrderItem";
import EmptyView from "../../view/EmptyView";
import {inject, observer} from "mobx-react";

@inject('orderViewModel')
@observer
export default class OrderScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setTitle('订单列表');
  }

  renderNavLeftView = () => null;

  componentDidMount() {
    this._fetchData()
  }

  _fetchData = () => {
    if (!isLogin) return;
    this.props.orderViewModel.setRefreshState(true);
    this.props.orderViewModel.getOrderData(UserInfo.user_id);
  };

  renderView() {
    return(
      <FlatList
        onRefresh={this._fetchData}
        refreshing={this.props.orderViewModel.getRefreshState}
        style={{flex:1}}
        data={this.props.orderViewModel.getOrderList}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + item.restaurant_name}
        contentContainerStyle={[{flex: 1}, this._contentStyle()]}
        ListEmptyComponent={()=>  <EmptyView/>}/>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <OrderItem
        data={item}
        onItemClick={() => null}
        onAgainClick={()=>this.props.navigation.navigate('ShopInfo', {id: item.restaurant_id})}
      />
    );
  };

  _contentStyle(){
    return this.props.orderViewModel.getOrderList.length ? null : {justifyContent: 'center', alignItems:'center'}
  }
}
