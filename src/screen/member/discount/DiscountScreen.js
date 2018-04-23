import React from 'react'
import BaseScreen from "../../BaseScreen";
import ScrollableTabView from "react-native-scrollable-tab-view";
import RedPacket from "./RedPacket";
import BusinessVouchers from "./BusinessVouchers";
import Column from "../../../view/Column";
import TabBar from "../../../view/TabBar";

export default class DiscountScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('我的优惠');
  }

  renderView() {
    return (
      <Column style={{flex:1}}>
        <ScrollableTabView renderTabBar={() => <TabBar/>}>
          <RedPacket tabLabel={'红包'} navigation={this.props.navigation}/>
          <BusinessVouchers tabLabel={'商家代金券'}/>
        </ScrollableTabView>
      </Column>
    )
  }
}