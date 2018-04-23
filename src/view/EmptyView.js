import React,{PureComponent} from 'react';
import Column from "./Column";
import Image from "./Image";
import Images from "../app/Images";
import Text from "./Text";
import {px2dp} from "../utils/ScreenUtil";

export default class EmptyView extends PureComponent{
  render(){
    return(
      <Column style={{justifyContent:'center',alignItems:'center'}}>
        <Image source={Images.Common.empty} />
        <Text mediumSize text={'暂时木有内容呀~~'} style={{marginTop:px2dp(30)}}/>
      </Column>
    )
  }
}