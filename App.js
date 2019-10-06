import React, {Component} from 'react';
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";
import {XFetchConfig} from "react-native-xfetch";
import Toast from "./src/view/Toast";
import {AppNavigator} from "./src/navigation/AppNavigator";
import {createAppContainer} from "react-navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  constructor(props) {
    super(props);
    XFetchConfig.getInstance()
      .setBaseUrl('http://elm.cangdu.org')
      .setCommonHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .setResponseConfig(this.handleResponse)
  }

  handleResponse = async(response, resolve, reject, data, xfetch) => {
    if (response.ok) {
      if (data.status === 0) {
        throw new Error(JSON.stringify(data))
      } else {
        resolve(data);
        console.log('XFetch_success-->', response.url, data);
      }
    } else {
      reject(data);
      Toast.show(data.message);
      console.log('XFetch_error-->', response.url, data);
    }
  };

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

