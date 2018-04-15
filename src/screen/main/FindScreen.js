import React from 'react'
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import Row from "../../view/Row";
import {TextInput, StyleSheet, FlatList, View, TouchableOpacity} from "react-native";
import Button from "../../view/Button";
import {paddingLR, paddingTB, px2dp, px2sp, screenW, wh} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Divider from "../../view/Divider";
import ShopListItem from "../../view/ShopListItem";
import ShopAip from "../../api/ShopApi";
import VisibleView from "../../view/VisibleView";
import Text from "../../view/Text";
import Image from "../../view/Image";
import Images from "../../app/Images";

export default class FindScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.setTitle('发现');
    this.setGoBackVisible(false);
    // 初始状态
    this.state = {
      keyWord: '',
      searchHis: [],
      noResult: false,
      shop: []
    };
  }

  _onInputChange = (text) => {
    this.setState({keyWord: text, noResult: text === '' ? !this.state.noResult : this.state.noResult});
  };

  _clear = () => {
    this.state.searchHis.length = 0;
    this.setState({searchHis: []})
  };

  _deleteHisItem = (item) => {
    const size = this.state.searchHis.length;
    let arr = this.state.searchHis;
    for (let i = 0; i < size; i++) {
      if (arr[i] === item) {
        arr.splice(i, 1);
        break;
      }
    }
    this.setState({noResult: this.state.noResult})
  };

  _onBtnClick = () => {
    if (this.state.keyWord !== '') {
      this.state.searchHis.push(this.state.keyWord);
      this._fetch()
    } else {
      console.log('请输入内容')
    }
  };

  _fetch() {
    ShopAip.fethcSearchRestaurant(Geohash, this.state.keyWord).then((res) => {
      this.state.shop.length = 0;
      this.setState({shop: res, noResult: false})
    }).catch((err) => {
      this.setState({noResult: true})
    })
  }

  renderView() {
    return (
      <Column style={styles.contain}>
        <Row verticalCenter style={styles.headStyle}>
          <TextInput
            style={styles.inputStyle}
            placeholder={'请输入商家或美食名称'}
            placeholderTextColor={Color.gray4}
            selectionColor={Color.theme}
            numberOfLines={1}
            autoFocus={false}
            underlineColorAndroid='transparent'
            value={this.state.keyWord}
            onChangeText={this._onInputChange}/>
          <Button style={styles.searchBtnStyle} title={'提交'} onPress={this._onBtnClick}/>
        </Row>

        <VisibleView visible={this.state.noResult && this.state.keyWord !== ''}>
          <Row horizontalCenter verticalCenter
               style={{height: px2dp(60), marginTop: px2dp(10), backgroundColor: Color.white}}>
            <Text text={'很抱歉！无搜索结果'}/>
          </Row>
        </VisibleView>

        <Column style={styles.contain}>

          <FlatList
            style={[styles.contain, {marginTop: px2dp(10)}]}
            data={this.state.shop}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index + ''}
            ItemSeparatorComponent={() => <Divider/>}/>

          <VisibleView visible={this.state.searchHis.length > 0 && !this.state.noResult}>
            <FlatList
              style={[styles.contain, {position: 'absolute'}]}
              data={this.state.searchHis}
              bounces={false}
              renderItem={({item, index}) =>
                <Row verticalCenter style={styles.hisItemStyle}>
                  <Text text={item}/>
                  <TouchableOpacity style={{padding: px2dp(10)}} onPress={()=>this._deleteHisItem(item)}>
                    <Image source={Images.Common.close} style={{...wh(50)}}/>
                  </TouchableOpacity>
                </Row>
              }
              keyExtractor={(item, index) => index + ''}
              ListHeaderComponent={() => <View style={{margin: px2dp(20)}}><Text text={'搜索历史'}/></View>}
              ListFooterComponent={() =>
                <Button
                  title={'清空历史记录'}
                  style={styles.clearBtnStyle}
                  titleStyle={{color: Color.theme}}
                  onPress={this._clear}/>
              }
              ItemSeparatorComponent={() => <Divider/>}/>
          </VisibleView>

        </Column>
      </Column>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <ShopListItem data={item} onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
    );
  }

}

const styles = StyleSheet.create({
  contain: {
    flex: 1
  },
  headStyle: {
    padding: px2dp(15),
    backgroundColor: Color.white
  },
  inputStyle: {
    flex: 1,
    height: px2dp(70),
    fontSize: px2sp(28),
    color: Color.gray4,
    backgroundColor: Color.gray,
    borderRadius: px2dp(2),
    padding: px2dp(5)
  },
  searchBtnStyle: {
    ...wh(120, 70),
    borderRadius: px2dp(5),
    marginLeft: px2dp(10)
  },
  hisItemStyle: {
    width: screenW,
    height: px2dp(70),
    justifyContent: 'space-between',
    padding: px2dp(15),
    marginVertical: px2dp(1),
    backgroundColor: Color.white
  },
  clearBtnStyle: {
    flex: 1,
    height: px2dp(60),
    backgroundColor: Color.white
  },
});