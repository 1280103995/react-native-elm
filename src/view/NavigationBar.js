import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {getStatusBarHeight, px2dp} from "../utils/ScreenUtil";
import Row from "./Row";
import Color from "../app/Color";

type Props = {
  leftView: Function,
  centerView: Function,//如果不想要原来标题位置的样式，自定义一个View进来替换
  rightView: Function
};

export default class NavigationBar extends React.Component<Props> {

  static height = px2dp(88);//导航栏高度，设置成静态值方便设置菜单按钮高度

  static defaultProps = {
    leftView: ()=>null,
    centerView: ()=>null,
    rightView: ()=>null
  };

  render() {
    return (
      <View style={styles.navigationBarStyle}>
        <View style={styles.statusBarStyle}/>

        <Row verticalCenter horizontalCenter style={styles.barStyle}>
          {/*导航栏左边组件*/}
          <View style={{position: 'absolute', left: 0}}>
            {this.props.leftView()}
          </View>

          {/*导航栏中间组件*/}
          {this.props.centerView()}

          {/*导航栏右边组件*/}
          <View style={{position: 'absolute', right: 0}}>
            {this.props.rightView()}
          </View>

        </Row>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: Color.theme
  },
  statusBarStyle: {
    height: getStatusBarHeight()
  },
  barStyle: {
    height: NavigationBar.height
  }
});
