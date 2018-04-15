import React,{Component} from 'react'
import Column from "../../../view/Column";
import {FlatList,StyleSheet} from "react-native";
import Row from "../../../view/Row";
import Button from "../../../view/Button";
import Color from "../../../app/Color";
import Divider from "../../../view/Divider";
import {px2dp, screenW} from "../../../utils/ScreenUtil";

export default class RedPacket extends Component{

  render(){
    return(
      <Column style={{flex:1}}>
        <FlatList
          data={[]}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + ''}
          ItemSeparatorComponent={() => <Divider/>}/>
        <Row style={{backgroundColor:Color.background}}>
          <Button
            title={'兑换红包'}
            titleStyle={{color:Color.black}}
            style={[styles.btnStyle,{marginRight:px2dp(1)}]}/>
          <Button
            title={'推荐有奖'}
            titleStyle={{color:Color.black}}
            style={styles.btnStyle}/>
        </Row>
      </Column>
    )
  }

  _renderItem = ({item, index}) => {
    return null
  };
}

const styles = StyleSheet.create({
  btnStyle:{
    width:screenW/2,
    height:px2dp(70),
    backgroundColor:Color.white
  },

});