import React from "react";
import {SectionList, FlatList, View} from "react-native";
import {inject, observer} from "mobx-react";
import BaseScreen from './BaseScreen';
import LocationCityViewModel from '../mvvm/viewmodel/LocationCityViewModel';
import {paddingTB, px2dp, px2sp} from '../utils/ScreenUtil';
import Color from '../app/Color';
import Text from '../view/Text';
import Divider from '../view/Divider';

@inject('homeViewModel')
@observer
export default class LocationCityScreen extends BaseScreen {

  locationCityViewModel = new LocationCityViewModel();

  constructor(props) {
    super(props);
    this.setTitle('定位城市')
  }

  componentDidMount() {
    this.locationCityViewModel.fetchCityData()
  }

  _onItemClick = (item) =>{
    this.props.homeViewModel.latitude = item.latitude;
    this.props.homeViewModel.longitude = item.longitude;
    this.props.homeViewModel.location = item.name;
    const navigation = this.props.navigation;
    navigation.state.params.callback(true);
    navigation.goBack()
  };

  renderView() {
    return (
      <SectionList
        sections={this.locationCityViewModel.getCityList}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={this._renderSectionHeader}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={this._renderHeader}
      />
    )
  }

  _renderSectionHeader = (info) => {
    return (
      <Text largeSize text={info.section.key} style={{
        ...paddingTB(25),
        paddingLeft: px2dp(20),
        textAlignVertical: 'center',
        backgroundColor: Color.gray
      }}/>
    )
  };

  _renderItem = (info) => {
    return (
      <Text
        onPress={()=>this._onItemClick(info.item)}
        text={info.item.name}
        style={{...paddingTB(20), paddingLeft: px2dp(40), textAlignVertical: 'center'}}/>
    )
  };

  _renderHeader = () => {
    return (
      <View>
        <Text style={{paddingLeft: px2dp(20), ...paddingTB(15)}}>{'当前定位城市：'}
          <Text gray text={'定位不准时，请在城市列表中选择'}/>
        </Text>
        {/*定位城市*/}
        <Text
          text={this.props.homeViewModel.getLocation}
          style={{paddingLeft: px2dp(20), marginBottom: px2dp(15), color: Color.theme, fontSize: px2sp(50)}}/>
        <Divider height={10}/>
        {/*热门城市*/}
        <FlatList
          style={{flex:1}}
          data={this.locationCityViewModel.getHotList}
          numColumns={4}
          renderItem={this._renderHotItem}
          keyExtractor={(item, index) => index + item}
          contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}
        />
      </View>
    )
  };

  _renderHotItem = ({item, index}) => {
    return (
      <Text text={item.name} style={{
        flex:1,
        ...paddingTB(15),
        textAlign:'center',
        borderWidth: px2dp(1),
        borderColor: Color.divider
      }} onPress={()=>this._onItemClick(item)}/>
    )
  };
}
