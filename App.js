import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from "./src/navigation/AppWithNavigationState";
import {ReduxStore} from "./src/redux/stores/ReduxStore";

export default class App extends Component {
  render() {
    return (
      <Provider store={ReduxStore}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}
global.isLogin = false;
global.UserInfo = {}; //用户信息
global.Geohash = null;

