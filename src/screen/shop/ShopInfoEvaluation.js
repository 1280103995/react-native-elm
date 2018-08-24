import React, {Component} from 'react'
import {FlatList, StyleSheet} from "react-native";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Divider from "../../view/Divider";
import Color from "../../app/Color";
import {paddingLR, paddingTB, px2dp, wh} from "../../utils/ScreenUtil";
import Text from "../../view/Text";
import StarRating from "../../view/StarRating";
import Image from "../../view/Image";
import Images from "../../app/Images";
import {inject, observer} from "mobx-react";

@inject('shopInfoEvaluationViewModel')
@observer
export default class ShopInfoEvaluation extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      overallScore: 0,//综合评价
      compareRating: '0.0%',//高于周边
      serviceScore: 0,//服务评价
      foodScore: 0,//菜品评价
      deliverTime: 0,//送达时间
      tags: [],
      list: []
    };
  }

  componentDidMount() {
    const id = this.props.shopID;
    this.props.shopInfoEvaluationViewModel.getEvaluationDate(id)
  }

  render() {
    let viewModel = this.props.shopInfoEvaluationViewModel;
    return (
      <FlatList
        data={viewModel.getList}
        renderItem={this._renderItem}
        keyExtractor={(item,index) => index + ''}
        ListHeaderComponent={this._renderHeader}
        ItemSeparatorComponent={() => <Divider/>}
      />
    )
  }

  _renderHeader = () => {
    let viewModel = this.props.shopInfoEvaluationViewModel;
    return (
      <Column style={{backgroundColor: Color.white}}>
        <Row verticalCenter style={{justifyContent: 'space-between', padding: px2dp(30)}}>
          <Column style={{alignItems: 'center'}}>
            <Row>
              <StarRating
                maxStars={5}
                disabled={true}
                rating={parseInt(viewModel.getOverallScore)}
                starSize={15}
              />
              <Text largeSize orange text={4.7} style={{marginBottom: px2dp(10)}}/>
            </Row>

            <Text mediumSize text={'综合评价'} style={{marginBottom: px2dp(10)}}/>
            <Text mediumSize gray text={`高于周边商家${viewModel.getCompareRating}`}/>
          </Column>
          <Column>
            <Row verticalCenter>
              <Text mediumSize text={'服务态度'} style={{marginRight: px2dp(15), marginBottom: px2dp(10)}}/>
              <StarRating
                maxStars={5}
                disabled={true}
                rating={parseInt(viewModel.getServiceScore)}
                starSize={15}
              />
              <Text mediumSize orange text={4.7}/>
            </Row>
            <Row verticalCenter>
              <Text mediumSize text={'菜品评价'} style={{marginRight: px2dp(15), marginBottom: px2dp(10)}}/>
              <StarRating
                maxStars={5}
                disabled={true}
                rating={parseInt(viewModel.getFoodScore)}
                starSize={15}
              />
              <Text mediumSize orange text={4.8}/>
            </Row>
            <Row verticalCenter>
              <Text mediumSize text={'送达时间'} style={{marginRight: px2dp(15)}}/>
              <Text mediumSize gray text={`${viewModel.getDeliverTime}分钟`}/>
            </Row>
          </Column>
        </Row>
        <Divider color={Color.background} height={20}/>

        <Row style={styles.typesView}>
          {viewModel.getTags.map((item, index)=> this._renderTypeItem(item, index))}
        </Row>
        <Divider/>
      </Column>
    )
  };

  _renderTypeItem = (item, index) =>{
    return(
      <Row
        key={index}
        verticalCenter
        horizontalCenter
        style={{...paddingTB(2),...paddingLR(4),borderRadius:px2dp(6),margin:px2dp(10),backgroundColor:'#CAE1FF'}}>
        <Text mediumSize text={`${item.name}(${item.count})`} style={{color:Color.gray4}}/>
      </Row>
    )
  };

  _renderItem = ({item, index}) => {
    return (
      <Row style={{justifyContent:'space-between',padding:px2dp(20),backgroundColor:Color.white}}>
        <Row>
          <Image
            source={Images.My.head}
            style={{...wh(50),marginRight:px2dp(15),tintColor:Color.black}}/>
          <Column>
            <Text mediumSize text={item.username}/>
            <Row verticalCenter>
              <StarRating
                maxStars={5}
                rating={item.rating_star}
                disabled={false}
                starSize={12}/>
              <Text mediumSize text={item.time_spent_desc}/>
            </Row>
            <Row style={styles.typesView}>
              {item.item_ratings.map((item, i)=>
                <Column key={i} style={{margin:px2dp(10)}}>
                  <Image source={Images.Common.shopBg} style={{...wh(80)}}/>
                  <Text microSize text={item.food_name} numberOfLines={1} style={{width:60}}/>
                </Column>
              )}
            </Row>

          </Column>

        </Row>
        <Text mediumSize text={item.rated_at}/>
      </Row>
    )
  };
}

const styles = StyleSheet.create({
  typesView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
});