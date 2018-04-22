import React from 'react'
import {FlatList} from "react-native";
import BaseScreen from "../BaseScreen";
import {px2dp} from "../../utils/ScreenUtil";
import Divider from "../../view/Divider";
import Color from "../../app/Color";
import OrderItem from "../../view/OrderItem";
import OrderApi from "../../api/OrderApi";
import Text from "../../view/Text";

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
      data:[]
    };
  }

  componentDidMount() {
    if (!isLogin) return;
    OrderApi.fetchOrderList(UserInfo.user_id, 0).then((res)=>{
        this.setState({data:res})
    })
  }

  renderView() {
    return(
      <FlatList
        style={{flex:1}}
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + item.restaurant_name}
        contentContainerStyle={[{flex: 1}, this._contentStyle()]}
        ListEmptyComponent={()=> <Text text={'没有数据'}/>}
        ItemSeparatorComponent={() => <Divider style={{height:px2dp(20),backgroundColor:Color.background}}/>}/>
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
  }

  _contentStyle(){
    return this.state.data.length ? null : {justifyContent: 'center', alignItems:'center'}
  }
}