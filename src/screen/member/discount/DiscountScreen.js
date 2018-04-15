import React from 'react'
import BaseScreen from "../../BaseScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import RedPacket from "./RedPacket";
import BusinessVouchers from "./BusinessVouchers";
import Column from "../../../view/Column";

export default class DiscountScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('我的优惠');
    this.state = {};
  }

  renderView() {
    return (
      <Column style={{flex:1}}>
        <ScrollableTabView>
          <RedPacket tabLabel={'红包'}/>
          <BusinessVouchers tabLabel={'商家代金券'}/>
        </ScrollableTabView>
      </Column>
    )
  }
}