import React from 'react'
import {FlatList, TouchableOpacity, StyleSheet, View} from "react-native";
import {inject, observer} from "mobx-react";
import BaseScreen from './BaseScreen';
import Column from '../view/Column';
import DropdownMenu from '../view/DropdownMenu';
import Row from '../view/Row';
import Color from '../app/Color';
import {marginLR, marginTB, px2dp, px2sp, screenW, wh} from '../utils/ScreenUtil';
import Divider from '../view/Divider';
import Text from '../view/Text';
import Button from '../view/Button';
import Image from '../view/Image';
import Images from '../app/Images';
import ShopListItem from '../view/ShopListItem';

@inject('categoryViewModel')
@observer
export default class CategoryScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.data = this.props.navigation.state.params.data;
    this.setTitle(this.data.title);
    this.latitude = this.props.navigation.state.params.latitude;
    this.longitude = this.props.navigation.state.params.longitude;
  }

  _onItemClick = (item, index) => {
    this.spinner.updateCurrentLabel(item);
    this.spinner.hide()
  };

  _onCategoryItemClick = (item, index) => {
    this.props.categoryViewModel.setCategoryChildDate(item.sub_categories)
  };

  componentDidMount() {
    this.props.categoryViewModel.getData(this.latitude, this.longitude)
  }

  renderView() {
    return (
      <Column style={{flex:1}}>
        <DropdownMenu
          ref={(s)=>this.spinner=s}
          tabSelectColor={Color.theme}
          tabData={[this.data.title, '排序', '筛选']}>
          <Row style={{width:screenW,backgroundColor: Color.white}}>
            <FlatList
              style={{width:screenW / 2}}
              data={this.props.categoryViewModel.getCategoryDate}
              bounces={false}
              renderItem={this._renderCategoryItem}
              keyExtractor={(item, index) => index + ''}/>
            <FlatList
              style={{width:screenW / 2}}
              data={this.props.categoryViewModel.getCategoryChildDate}
              bounces={false}
              renderItem={this._renderCategoryChildItem}
              keyExtractor={(item, index) => index + ''}
              ItemSeparatorComponent={() => <Divider/>}/>
          </Row>
          <FlatList
            style={{width:screenW, backgroundColor: Color.white}}
            data={this.props.categoryViewModel.sortList}
            bounces={false}
            numColumn={3}
            renderItem={this._renderItem2}
            keyExtractor={(item, index) => index + ''}
            ItemSeparatorComponent={() => <Divider/>}/>
          <Column style={{width:screenW,backgroundColor:Color.white}}>
            <Text text={'配送方式'} style={{margin:px2dp(10)}}/>
            <FlatList
              data={this.props.categoryViewModel.getDeliveryDate}
              bounces={false}
              numColumn={3}
              renderItem={(item, index)=> <Text microSize text={item.text}/>}
              keyExtractor={(item, index) => index + ''}/>
            <Text text={'商家属性（可以多选）'} style={{margin:px2dp(10)}}/>
            <FlatList
              data={this.props.categoryViewModel.getActivityDate}
              bounces={false}
              numColumn={3}
              renderItem={(item, index)=>
                <Row verticalCenter style={{width:screenW / 3}}>
                  <Text microSize text={item.icon_name} style={{color:item.icon_color}}/>
                  <Text microSize text={item.name}/>
                </Row>
              }
              keyExtractor={(item, index) => index + ''}/>
            <Row style={{backgroundColor:Color.background}}>
              <Button
                onPress={()=>null}
                title={'清空'}
                titleStyle={{fontSize:px2sp(26),color:Color.black}}
                style={{flex:1,height:px2dp(80),margin: px2dp(10),borderRadius:px2dp(10),backgroundColor:Color.white}}/>
              <Button
                onPress={()=>null}
                title={'确定'}
                titleStyle={{fontSize:px2sp(26),color:Color.white}}
                style={{flex:1,height:px2dp(80),margin: px2dp(10),borderRadius:px2dp(10),backgroundColor:Color.reseda}}/>
            </Row>
          </Column>
        </DropdownMenu>
        <FlatList
          style={{flex:1}}
          data={this.props.categoryViewModel.getShopListDate}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + item.name}
          ItemSeparatorComponent={() => <Divider/>}/>
      </Column>
    )
  }

  _renderCategoryItem = ({item, index}) => {
    return(
      <TouchableOpacity onPress={()=>this._onCategoryItemClick(item)}>
        <Row verticalCenter style={{...marginTB(10),justifyContent:'space-between'}}>
          <Row verticalCenter>
            <Image source={item.image_url} style={{...wh(20),marginLeft:px2dp(5)}}/>
            <Text text={item.name}/>
          </Row>

          <Row verticalCenter>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:Color.gray2,borderRadius:px2dp(14)}}>
              <Text text={item.count}/>
            </View>
            <Image source={Images.Common.arrowRight} style={{...wh(20),...marginLR(5)}}/>
          </Row>
        </Row>
      </TouchableOpacity>
    )
  };

  _renderCategoryChildItem = ({item, index}) => {
    return(
      <TouchableOpacity onPress={()=>this._onItemClick(item.name)}>
        <Row verticalCenter style={{justifyContent:'space-between',padding:px2dp(10)}}>
          <Text mediumSize text={item.name}/>
          <Text mediumSize text={item.count}/>
        </Row>
      </TouchableOpacity>
    )
  };

  _renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this._onItemClick(item, index)}>
        <Row verticalCenter style={{
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10}}>
          <Text text={item}/>
        </Row>
      </TouchableOpacity>
    )
  };

  _renderItem = ({item, index}) => {
    return (
      <ShopListItem data={item} onClick={() => this.toPage('ShopInfo', {id: item.id})}/>
    );
  }

}

const styles = StyleSheet.create({
  text: {
    fontSize:20,
    marginTop:100,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
