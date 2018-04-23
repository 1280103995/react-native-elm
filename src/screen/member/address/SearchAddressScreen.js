import React from 'react';
import BaseScreen from "../../BaseScreen";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import Divider from "../../../view/Divider";
import Row from "../../../view/Row";
import Color from "../../../app/Color";
import Column from "../../../view/Column";
import {paddingTB, px2dp, wh} from "../../../utils/ScreenUtil";
import Input from "../../../view/Input";
import Button from "../../../view/Button";
import Text from "../../../view/Text";
import Toast from "../../../view/Toast";
import AddressApi from "../../../api/AddressApi";

export default class SearchAddressScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('搜索地址');
    this.state = {
      address: []
    };
    this.keyWord = ''
  }

  _onSearchBtnClick = () => {
    if (this.keyWord === '') {
      Toast.show('请输入内容');
      return
    }
    AddressApi.fetchSearchNearby(this.keyWord).then((res) => {
      this.setState({address: res})
    })
  };

  _onItemClick = (item) => {
    const navigation = this.props.navigation;
    navigation.state.params.callback(item);
    navigation.goBack()
  };

  renderView() {
    return (
      <FlatList
        data={this.state.address}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index + ''}
        ListHeaderComponent={this._renderHeader}
        ItemSeparatorComponent={() => <Divider/>}
      />
    )
  }

  _renderHeader = () => {
    return (
      <Column>
        <Row verticalCenter style={styles.headStyle}>
          <Input
            style={styles.inputStyle}
            placeholder={'请输入小区/写字楼/学校等'}
            onChangeText={(text) => this.keyWord = text}/>
          <Button style={styles.searchBtnStyle} title={'确认'} onPress={this._onSearchBtnClick}/>
        </Row>
        <Row horizontalCenter verticalCenter style={{...paddingTB(5),backgroundColor: '#fce6c9'}}>
          <Text mediumSize text={'为了满足商家的送餐要求，建议您从列表中选择地址'} style={{color: '#faa460'}}/>
        </Row>
      </Column>
    )
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this._onItemClick(item)}>
        <Column style={styles.itemStyle}>
          <Text gray text={item.name}/>
          <Text gray text={item.address}/>
        </Column>
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  headStyle: {
    padding: px2dp(15),
    backgroundColor: Color.white
  },
  inputStyle: {
    height: px2dp(70),
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
  itemStyle: {
    padding: px2dp(15),
    justifyContent: 'space-between'
  },
});