import React, {Component} from 'react';
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";
import {AppNavigator} from "./src/navigation/AppNavigator";
import {createAppContainer} from "react-navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  render() {
    return (
      <Provider {...RootStore}>
        <AppContainer/>
      </Provider>
    );
  }
}
global.isLogin = false;
global.UserInfo = {}; //用户信息
global.Geohash = null;

