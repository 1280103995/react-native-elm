import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TabBarItem from "../view/TabBarItem";
import Images from "../app/Images";
import OrderScreen from "../screen/main/OrderScreen";
import MyScreen from "../screen/main/MyScreen";
import Color from "../app/Color";
import HomeScreen from '../screen/main/HomeScreen';
import FindScreen from '../screen/main/FindScreen';

export const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '外卖',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            // tintColor={tintColor}
            focused={focused}
            size={70}
            normalImage={Images.Main.homeTabNormal}
            selectedImage={Images.Main.homeTabClick}
          />
        )
      }),
    },
    Find: {
      screen: FindScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            // tintColor={tintColor}
            focused={focused}
            size={50}
            normalImage={Images.Main.findTabNormal}
            selectedImage={Images.Main.findTabClick}
          />
        )
      }),
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '订单',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            // tintColor={tintColor}
            focused={focused}
            normalImage={Images.Main.orderTabNormal}
            selectedImage={Images.Main.orderTabClick}
          />
        )
      }),
    },
    My: {
      screen: MyScreen,
      navigationOptions: ({navigation}) => ({
        tabBarLabel: '我的',
        tabBarIcon: ({focused, tintColor}) => (
          <TabBarItem
            // tintColor={tintColor}
            focused={focused}
            normalImage={Images.Main.myTabNormal}
            selectedImage={Images.Main.myTabClick}
          />
        ),
        //登录了才能到'我的'页面，否则先去登录
        // tabBarOnPress: (({navigation, defaultHandler}) => {
        //   if (isLogin) defaultHandler();
        //   else navigation.navigate('Login')
        // })
      }),
    },
  },
  {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    backBehavior: 'initialRoute', // 按 back 键是否跳转到第一个 Tab， none 为不跳转，默认为 initialRoute 的行为。
    lazy: true,//是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦
    tabBarOptions: {
      activeTintColor: Color.theme, // 文字和图片选中颜色
      inactiveTintColor: '#979797', // 文字和图片默认颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
      style: {
        backgroundColor: '#fff', // TabBar 背景色
      },
      labelStyle: {
        fontSize: 12, // 文字大小
      },
    }
  }
);
