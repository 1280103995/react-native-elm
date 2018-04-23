import React from 'react'
import BaseScreen from "../BaseScreen";
import {FlatList} from "react-native";
import Divider from "../../view/Divider";
import EmptyView from "../../view/EmptyView";

export default class BuyRecordScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('购买记录');
    this.state = {
      record:[]
    };
  }

  renderView() {
    return (
      <FlatList
        data={this.state.record}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        contentContainerStyle={[{flex: 1}, this._contentStyle()]}
        ListEmptyComponent={()=> <EmptyView/>}
        ItemSeparatorComponent={() => <Divider/>}
      />
    )
  }

  _renderItem = ({item, index}) => {
    return null
  };

  _contentStyle(){
    return this.state.record.length ? null : {justifyContent: 'center', alignItems:'center'}
  }
}