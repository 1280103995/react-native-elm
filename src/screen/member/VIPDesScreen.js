import React from 'react'
import BaseScreen from "../BaseScreen";
import {ScrollView,StyleSheet} from "react-native";
import {marginLR, px2dp} from "../../utils/ScreenUtil";
import Color from "../../app/Color";
import Row from "../../view/Row";
import Text from "../../view/Text";

/*todo 可以用 SectionList 实现，这里偷懒下*/
export default class VIPDesScreen extends BaseScreen{

  constructor(props){
    super(props);
    this.setTitle('会员说明');

  }

  renderView(){
    return(
      <ScrollView style={styles.container}>
        <Row horizontalCenter style={{...marginLR(50)}}>
          {this._renderContentText('尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：\n' +
            '购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。\n' +
            '注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。')}
        </Row>

        {this._renderTitleText('Q1: 特权介绍')}
        {this._renderContentText('身份标识：饿了么会员服务有效期内，享有专属皇冠标识。')}
        {this._renderContentText('减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。')}
        {this._renderContentText('更多特权，敬请期待！')}

        {this._renderTitleText('Q2: 资费介绍')}
        {this._renderContentText('饿了么会员卡：20元')}

        {this._renderTitleText('Q3: 使用说明')}
        {this._renderContentText('当用户满足以下任一条件，会员服务自动失效：')}
        {this._renderContentText('自绑定之日起超过31天；')}
        {this._renderContentText('在31天内累计使用减免配送费的蜂鸟订单数量达到30单；')}

        {this._renderTitleText('Q4: 购卡说明')}
        {this._renderContentText('在线购买：饿了么App>我的>饿了么会员卡')}

        {this._renderTitleText('Q5: 温馨提示')}
        {this._renderContentText('用户在当前会员服务失效前，无法购买新卡。')}
        {this._renderContentText('请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。')}
      </ScrollView>
    )
  }

  _renderTitleText(text){
    return <Text largeSize text={text} style={styles.titleStyle}/>
  }

  _renderContentText(text){
    return <Text smallSize gray text={text} style={styles.contentStyle}/>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:px2dp(20),
    backgroundColor:Color.white
  },
  titleStyle:{
    fontWeight:'600',
    marginTop:px2dp(20)
  },
  contentStyle:{
    marginTop:px2dp(15)
  },
});