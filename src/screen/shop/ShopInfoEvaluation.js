import React, {Component} from 'react'
import {FlatList} from "react-native";
import Row from "../../view/Row";
import Column from "../../view/Column";
import Divider from "../../view/Divider";
import Color from "../../app/Color";
import {px2dp} from "../../utils/ScreenUtil";
import Text from "../../view/Text";
import StarRating from "../../view/StarRating";

export default class ShopInfoEvaluation extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      list:[]
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.list}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        ItemSeparatorComponent={()=><Divider/>}
      />
    )
  }

  _renderHeader = () => {
    return (
      <Column style={{backgroundColor:Color.white}}>
       <Row verticalCenter style={{justifyContent:'space-between',padding:px2dp(30)}}>
         <Column style={{alignItems:'center'}} >
           <Row>
             <StarRating
               maxStars={5}
               rating={3}
               disabled={true}
               starSize={15}
             />
             <Text largeSize orange text={4.7} style={{marginBottom:px2dp(10)}}/>
           </Row>

           <Text mediumSize text={'综合评价'} style={{marginBottom:px2dp(10)}}/>
           <Text mediumSize gray text={'高于周边商家76.9%'}/>
         </Column>
         <Column>
           <Row verticalCenter>
             <Text mediumSize text={'服务态度'} style={{marginRight:px2dp(15),marginBottom:px2dp(10)}}/>
             <StarRating
               maxStars={5}
               rating={3}
               disabled={true}
               starSize={15}
             />
             <Text mediumSize orange text={4.7}/>
           </Row>
           <Row verticalCenter>
             <Text mediumSize text={'菜品评价'} style={{marginRight:px2dp(15),marginBottom:px2dp(10)}}/>
             <StarRating
               maxStars={5}
               rating={4}
               disabled={true}
               starSize={15}
             />
             <Text mediumSize orange text={4.8}/>
           </Row>
           <Row verticalCenter>
             <Text mediumSize text={'送达时间'} style={{marginRight:px2dp(15)}}/>
             <Text mediumSize gray text={`${30}分钟`}/>
           </Row>
         </Column>
       </Row>
        <Divider color={Color.background} height={20}/>
        <Column style={{height:50}}>
          <Text text={'各种满意，味道好'}/>
        </Column>
        <Divider/>
      </Column>
    )
  };

  _renderItem = ({item, index}) => {
    return (
      <Row>

      </Row>
    )
  };
}