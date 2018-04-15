import React from 'react';
import BaseScreen from "../BaseScreen";
import Column from "../../view/Column";
import Color from "../../app/Color";
import {px2dp, px2sp, wh} from "../../utils/ScreenUtil";
import Row from "../../view/Row";
import Text from "../../view/Text";
import Image from "../../view/Image";
import Button from "../../view/Button";
import {FlatList,StyleSheet} from "react-native";
import Divider from "../../view/Divider";
import Images from "../../app/Images";

export default class BalanceScreen extends BaseScreen {

  constructor(props) {
    super(props);
    this.setTitle('我的余额');
    this.state = {
      record:[]
    };
  }

  renderView() {
    return (
      <Column style={styles.container}>
        <Column style={{backgroundColor: Color.theme}}>
          <Column style={{margin: px2dp(10), padding: px2dp(10), borderRadius: px2dp(5), backgroundColor: Color.white}}>
            <Row verticalCenter style={{justifyContent: 'space-between'}}>
              <Text mediumSize gray text={'当前余额'}/>
              <Row verticalCenter>
                <Image source={Images.My.phone} style={{...wh(25)}}/>
                <Text mediumSize theme text={'余额说明'}/>
              </Row>
            </Row>
            <Row style={{alignItems: 'flex-end'}}>
              <Text text={'0.00'} style={{fontSize: px2sp(50)}}/>
              <Text microSize text={'元'} style={{marginBottom: px2dp(10),marginLeft:px2dp(10)}}/>
            </Row>
            <Button title={'提现'} style={{height: px2dp(70), marginTop: px2dp(40), backgroundColor: Color.gray}}/>
          </Column>
        </Column>
        <FlatList
          data={this.state.record}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index + ''}
          ItemSeparatorComponent={() => <Divider/>}
          ListHeaderComponent={() => <Text microSize gray text={'交易明细'}/>}
        />
      </Column>
    )
  }

  _renderItem = ({item, index}) => {
    return null
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});