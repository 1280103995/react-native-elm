import {createStackNavigator} from "react-navigation-stack";
import StackNavigator from "./StackNavigator";
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";

const initial = __DEV__
  ? "Splash" // 调试用
  : "Splash"; // 正式打包初始路径

// 注册导航
export const AppNavigator = createStackNavigator(
  StackNavigator,
  {
    initialRouteName: initial, // 默认显示界面
    mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    headerLayoutPreset: 'center',//让标题居中
    defaultNavigationOptions:{
      header:null,
      gesturesEnabled: true
    },
    transitionConfig: () => ({
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,//让安卓实现push动画(右进右出)
    })
  }
);
