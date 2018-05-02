import React from 'react'
import {FlatList} from "react-native";
import BaseScreen from "../BaseScreen";
import {px2dp} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import Color from "../../app/Color";
import OrderItem from "../../view/OrderItem";
import OrderApi from "../../api/OrderApi";
import EmptyView from "../../view/EmptyView";

export default class OrderScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setTitle('订单列表');
    this.setGoBackVisible(false);
    this.state = {
      data:[],
      refreshState: false
    };
  }

  componentDidMount() {
    if (!isLogin) return;
    this._fetchData()
  }

  _fetchData = () => {
    if (!isLogin) return;
    this.setState({refreshState: true});
    OrderApi.fetchOrderList(UserInfo.user_id, 0).then((res)=>{
      this.setState({data:res})
    }).finally(()=>{
      this.setState({refreshState: false})
    })
  }

  renderView() {
    return(
      <FlatList
        onRefresh={this._fetchData}
        refreshing={this.state.refreshState}
        style={{flex:1}}
        data={this.state.data}
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
    return this.state.data.length ? null : {justifyContent: 'center', alignItems:'center'}
  }
}