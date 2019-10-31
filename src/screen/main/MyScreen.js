import React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import BaseScreen from "../BaseScreen";
import Row from "../../view/Row";
import Image from "../../view/Image";
import {borderWidthLR, marginTB, paddingLR, paddingTB, px2dp, px2sp, screenW, wh} from "../../utils/ScreenUtil";
import Column from "../../view/Column";
import Text from "../../view/Text";
import Color from "../../app/Color";
import Images from "../../app/Images";
import Divider from "../../view/Divider";
import {toDecimal2} from "../../store/ShoppingCartStore";
import AuthModel from "../../mvvm/model/AuthModel";

export default class MyScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setTitle('我的');
    this.state = {
      avatar: '', //头像
      username: '', //用户名
      balance: 0, //余额
      gift_amount: 0, //优惠
      point: 0, //积分
    };
  }

  componentDidMount() {
    if (isLogin) this._fetchUserInfo()
  }

  renderNavLeftView = () => {
    return (
      <Image source={Images.My.notice} style={{...wh(40), marginLeft: px2dp(20)}}/>
    )
  };

  renderNavRightView = () => {
    return (
      <Image source={Images.My.setting} style={{...wh(40), marginRight: px2dp(20)}}/>
    )
  };

  _userInfoClick = () => {
    if (isLogin) this.toPage('UserInfo',{callback: this._handleLogoutSuccess});
    else this._toLogin()
  };

  _toLogin() {
    this.toPage('Login',{callback: this._handleLoginSuccess})
  }

  /*登录成功后回来刷新页面*/
  _handleLoginSuccess = () => {
    this.setState({
      avatar: UserInfo.avatar,
      username: UserInfo.username,
      balance: UserInfo.balance,
      gift_amount: UserInfo.gift_amount,
      point: UserInfo.point,
    })
  };

  /*退出登录成功后回来刷新页面*/
  _handleLogoutSuccess = () => {
    this.setState({
      avatar: '',
      username: '',
      balance: 0,
      gift_amount: 0,
      point: 0,
    })
  };

  _onItemCLick = (label) => {
    if (!isLogin) {
      this._toLogin();
      return
    }
    if (label === '我的订单') {
      this.toPage('Order')
    } else if (label === '积分商城') {
      this.toPage('PointMall')
    } else if (label === '饿了么会员卡') {
      this.toPage('ElmVIP')
    } else if (label === '服务中心') {
      this.toPage('ServiceCenter')
    }
  };

  _onBalanceItemClick = (label) => {
    if (!isLogin) {
      this._toLogin();
      return
    }
    if (label === '我的余额') {
      this.toPage('Balance')
    } else if (label === '我的优惠') {
      this.toPage('Discount')
    } else {
      this.toPage('Point')
    }
  };

  _fetchUserInfo() {
    AuthModel.fetchUserInfo(UserInfo.user_id).then((res) => {
      UserInfo = res
    })
  }

  renderView() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={this._userInfoClick} activeOpacity={0.8}>
          <Row verticalCenter style={styles.userInfoStyle}>
            {/*用户信息*/}
            <Row verticalCenter>
              <Image source={isLogin ? this.state.avatar : Images.My.head} style={styles.headStyle}/>
              <Column style={{justifyContent: 'space-between'}}>
                <Text largeSize white text={isLogin ? this.state.username : '登录/注册'}
                      style={{fontWeight: '600', marginBottom: px2dp(10)}}/>
                <Row verticalCenter>
                  <Image source={Images.My.phone} style={{...wh(25, 30)}}/>
                  <Text mediumSize white text={'暂无绑定手机号'}/>
                </Row>
              </Column>
            </Row>
            {/*前往登录*/}
            <Image source={Images.Common.arrowRight} style={{...wh(30)}}/>
          </Row>
        </TouchableOpacity>
        {/*三块数值*/}
        <Row verticalCenter style={{justifyContent: 'space-between', backgroundColor: Color.white}}>
          {this._renderBalanceItem(isLogin ? toDecimal2(this.state.balance) : '0.00', Color.theme, '元', '我的余额')}
          {this._renderBalanceItem(isLogin ? this.state.gift_amount : '0', Color.pink, '个', '我的优惠')}
          {this._renderBalanceItem(isLogin ? this.state.point : '0', Color.reseda, '分', '我的积分')}
        </Row>
        <Column style={{...marginTB(20), backgroundColor: Color.white}}>
          {this._renderItem(Images.My.order, '我的订单')}
          <Divider style={styles.dividerStyle}/>
          {this._renderItem(Images.My.point, '积分商城')}
          <Divider style={styles.dividerStyle}/>
          {this._renderItem(Images.My.vip, '饿了么会员卡')}
        </Column>
        <Column style={{marginBottom: px2dp(20), backgroundColor: Color.white}}>
          {this._renderItem(Images.My.service, '服务中心')}
        </Column>
      </ScrollView>
    )
  }

  _renderBalanceItem = (value, color, unit, label) => {
    let style = null;
    if (label === '我的优惠') {
      style = styles.balanceLineStyle
    }
    return (
      <TouchableOpacity onPress={() => this._onBalanceItemClick(label)}>
        <Column style={[styles.balanceStyle, style]}>
          <Row style={{alignItems: 'flex-end'}}>
            <Text theme text={value} style={{fontSize: px2sp(50), color: color}}/>
            <Text microSize text={unit} style={{marginBottom: px2dp(10)}}/>
          </Row>
          <Text text={label}/>
        </Column>
      </TouchableOpacity>
    )
  };

  _renderItem(img, label) {
    return (
      <TouchableOpacity onPress={() => this._onItemCLick(label)}>
        <Row verticalCenter style={styles.itemStyle}>
          <Row verticalCenter>
            <Image source={img} style={{...wh(30), marginRight: px2dp(10)}}/>
            <Text text={label}/>
          </Row>
          <Image source={Images.Common.arrowRight} style={{...wh(25), tintColor: Color.gray3}}/>
        </Row>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  userInfoStyle: {
    ...paddingLR(20),
    ...paddingTB(25),
    justifyContent: 'space-between',
    backgroundColor: Color.theme
  },
  headStyle: {
    ...wh(100),
    borderRadius: px2dp(50),
    marginRight: px2dp(10)
  },
  balanceStyle: {
    width: screenW / 3,
    justifyContent: 'center',
    alignItems: 'center',
    ...paddingTB(25)
  },
  balanceLineStyle: {
    borderColor: Color.divider,
    ...borderWidthLR(1),
  },
  dividerStyle: {
    marginLeft: px2dp(30)
  },
  itemStyle: {
    justifyContent: 'space-between',
    ...paddingTB(20),
    ...paddingLR(25)
  },
});
