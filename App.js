import React, { Component } from 'react';
import {Navigator} from "./src/navigation/StackNavigator";
import {ShoppingCarStore} from "./src/store/ShoppingCartStore";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Navigator/>
    );
  }
}
global.isLogin = false;
global.UserInfo = {}; //用户信息
let store = new ShoppingCarStore();
global.CartStore = store;

global.Geohash = null;

