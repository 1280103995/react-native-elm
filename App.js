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
      .setBaseUrl('https://elm.cangdu.org')
      .setResponseConfig(this.handleResponse)
  }

  handleResponse = (isResponseSuccess, response, resolve, reject, data) => {
    if (isResponseSuccess) {
      if (data.status === 0) {
        throw new Error(JSON.stringify(data))
      } else {
        resolve(data);
        console.log('XFetch_success-->', response.url, data);

        let headers = response.headers.get("set-cookie");
        if (headers && headers.indexOf('SID=') !== -1) {
          let header = headers.split(";");
          cookie = header[0]
        }

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
global.cookie = null;

