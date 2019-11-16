import React from 'react';
import {StyleSheet} from 'react-native';
import Modal, {ModalButton, ModalFooter, ModalTitle, ScaleAnimation} from 'react-native-modals';
import {px2dp, px2sp, wh} from '../utils/ScreenUtil';
import Color from '../app/Color';

type Props = {
  handleRightBth: Function
}

export default class LogoutDialog extends React.PureComponent<Props> {

  static defaultProps = {
    handleRightBth: () => null,
  };

  constructor() {
    super();
    this.state = {
      visible: false,
    };
  }

  show = () => {
    this.setState({
      visible: true,
    });
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };


  render() {
    return (
      <Modal
        visible={this.state.visible}
        onTouchOutside={this.hide}
        onHardwareBackPress={() => { this.hide(); return true }}
        modalAnimation={new ScaleAnimation({
          initialValue: 0, // optional
          useNativeDriver: true, // optional
        })}
        modalStyle={styles.contentStyle}
        modalTitle={<ModalTitle style={{backgroundColor: 'white'}} title="确定退出吗？" textStyle={styles.titleStyle}/>}
        footer={
          <ModalFooter>
            <ModalButton
              text="再等等"
              textStyle={{color: 'gray'}}
              onPress={this.hide}
            />
            <ModalButton
              text="退出登录"
              onPress={this._onRightBtnClick}
            />
          </ModalFooter>
        }
      >
      </Modal>
    );
  }

  _onRightBtnClick = () => {
    this.hide();
    this.props.handleRightBth();
  };
}

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: 'white',
    minWidth: 260,
    minHeight: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: px2sp(40),
  },
  leftBtnStyle: {
    ...wh(150, 65),
    backgroundColor: Color.gray2,
  },
  rightStyle: {
    ...wh(150, 65),
    backgroundColor: Color.orange,
    marginLeft: px2dp(30),
  },
});
