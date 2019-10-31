import React from 'react';
import {TextInput, StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';
import {inject, observer} from 'mobx-react';
import BaseScreen from '../BaseScreen';
import Column from '../../view/Column';
import Row from '../../view/Row';
import Color from '../../app/Color';
import Button from '../../view/Button';
import VisibleView from '../../view/VisibleView';
import {px2dp, px2sp, screenW, wh} from '../../utils/ScreenUtil';
import Text from '../../view/Text';
import Divider from '../../view/Divider';
import Image from '../../view/Image';
import Images from '../../app/Images';
import ShopListItem from '../../view/ShopListItem';
import Toast from '../../view/Toast';

@inject('findViewModel')
@observer
export default class FindScreen extends BaseScreen {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.setTitle('发现');

    this.state = {
      keyWord: '',
    };
  }

  renderNavLeftView = () => null;

  _onInputChange = (text) => {
    this.setState({keyWord: text});
    if (text !== '') {
      this.props.findViewModel.setSearchState(false);
    }
  };

  _clear = () => {
    this.props.findViewModel.clear();
  };

  _deleteHisItem = (item) => {
    this.props.findViewModel.deleteItem(item);
  };

  _onBtnClick = () => {
    if (this.state.keyWord !== '') {
      this.props.findViewModel.getSearchData(Geohash, this.state.keyWord);
    } else {
      Toast.show('请输入内容');
    }
  };

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

        <VisibleView visible={this.props.findViewModel.showNoResult}>
          <Row horizontalCenter verticalCenter
               style={{height: px2dp(60), marginTop: px2dp(10), backgroundColor: Color.white}}>
            <Text text={'很抱歉！无搜索结果'}/>
          </Row>
        </VisibleView>

        <Column style={styles.contain}>

          <FlatList
            style={[styles.contain, {marginTop: px2dp(10)}]}
            data={this.props.findViewModel.getShopList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index + ''}
            ItemSeparatorComponent={() => <Divider/>}/>

          <VisibleView visible={this.props.findViewModel.showHistory}>
            <FlatList
              style={[styles.contain, styles.historyStyle]}
              data={this.props.findViewModel.getList}
              bounces={false}
              renderItem={({item, index}) =>
                <Row verticalCenter style={styles.hisItemStyle}>
                  <Text text={item}/>
                  <TouchableOpacity style={{padding: px2dp(10)}}
                                    onPress={() => this._deleteHisItem(item)}>
                    <Image source={Images.Common.close} style={{...wh(50)}}/>
                  </TouchableOpacity>
                </Row>
              }
              keyExtractor={(item, index) => index + ''}
              ListHeaderComponent={this._renderHisHeader}
              ListFooterComponent={this._renderHisFooter}
              ItemSeparatorComponent={() => <Divider/>}/>
          </VisibleView>

        </Column>
      </Column>
    );
  }

  _renderItem = ({item, index}) => {
    return (
      <ShopListItem data={item} onClick={() => this.props.navigation.navigate('ShopInfo', {id: item.id})}/>
    );
  };

  _renderHisHeader = () => {
    return (
      <View>
        <Text text={'搜索历史'} style={{margin: px2dp(20)}}/>
        <Divider height={1}/>
      </View>
    );
  };

  _renderHisFooter = () => {
    return (
      <Column>
        <Divider height={1}/>
        <Button
          title={'清空历史记录'}
          style={styles.clearBtnStyle}
          titleStyle={{color: Color.theme}}
          onPress={this._clear}/>
      </Column>
    );
  };

}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  headStyle: {
    padding: px2dp(15),
    backgroundColor: Color.white,
  },
  inputStyle: {
    flex: 1,
    height: px2dp(70),
    fontSize: px2sp(28),
    color: Color.gray4,
    backgroundColor: Color.gray,
    borderRadius: px2dp(2),
    padding: px2dp(5),
  },
  searchBtnStyle: {
    ...wh(120, 70),
    borderRadius: px2dp(5),
    marginLeft: px2dp(10),
  },
  historyStyle: {
    marginTop: px2dp(10), position: 'absolute', backgroundColor: Color.white,
    elevation: 5,
    shadowOffset: {width: 10, height: 10},
    shadowColor: Color.gray2,
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  hisItemStyle: {
    width: screenW,
    height: px2dp(70),
    justifyContent: 'space-between',
    padding: px2dp(15),
    marginVertical: px2dp(1),
    backgroundColor: Color.white,
  },
  clearBtnStyle: {
    flex: 1,
    height: px2dp(60),
    backgroundColor: Color.white,
  },
});
