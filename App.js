import React, { Component } from 'react';
import {Navigator} from "./src/navigation/StackNavigator";
import {Provider} from 'mobx-react'
import RootStore from "./src/store/RootStore";
import {XFetchConfig} from "react-native-xfetch";
import Toast from "./src/view/Toast";

export default class App extends Component{

  constructor(props) {
    super(props);
    XFetchConfig.getInstance()
      .setBaseUrl('http://cangdu.org:8001')
      .setResponseConfig(this.handleResponse)
  }

  handleResponse = (isResponseSuccess, url, resolve, reject, data) =>{
    if (isResponseSuccess) {
      if (data.status === 0) {
        throw new Error(JSON.stringify(data))
      } else {
        resolve(data);
        console.log('XFetch_success-->', `url:${url}\n`, data);
      }
    }else {
      reject(data);
      console.log('XFetch_error-->', `url:${url}\n`, data);
      Toast.show(data.message)
    }
  };

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

