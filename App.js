import React, { Component } from 'react';
import {Navigator} from "./src/navigation/StackNavigator";
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider {...RootStore}>
        <Navigator/>
      </Provider>
    );
  }
}
global.isLogin = false;
global.UserInfo = {}; //用户信息
global.Geohash = null;

