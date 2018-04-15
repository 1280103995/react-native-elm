import React from 'react'
import BaseScreen from "../BaseScreen";
import {FlatList} from "react-native";
import Divider from "../../view/Divider";

export default class BuyRecordScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('购买记录');
    this.state = {};
  }

  renderView() {
    return (
      <FlatList
        data={[]}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        ItemSeparatorComponent={() => <Divider/>}
      />
    )
  }

  _renderItem = ({item, index}) => {
    return null
  };
}