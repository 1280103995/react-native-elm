import React, {PureComponent} from 'react'
import {
  Text,
  View,
  Modal,
  Easing,
  Platform,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

export default class DropdownMenu extends PureComponent {

  static propTypes = {
    tabSelectColor: PropTypes.string,
    tabUnSelectColor: PropTypes.string,
    tabData: PropTypes.array,
    tabLabelSize: PropTypes.number,
    contentHeight: PropTypes.number,
    arrowImg: PropTypes.number
  };

  static defaultProps = {
    tabSelectColor: 'blue',
    tabUnSelectColor: 'black',
    tabData: [],
    tabLabelSize: 14,
    contentHeight: 200,
    arrowImg: require('../img/dropdown_arrow.png')
  };

  constructor(props) {
    super(props);
    this.tabData = this.props.tabData;
    this.state = {
      tabSelectIndex: null,
      contentVisible: false,
      contentAnimated: new Animated.Value(0),
      opacityAnimated: new Animated.Value(0),
      rotationAnims: this.tabData.map(() => new Animated.Value(0))
    };
    this.tabTop = 0;
  }

  async _onTabSelect(index) {
    if (this.tabTop === 0) {
      const location = await this._measureView(this.tab);

      let statusBarHeightOffset = 0;
      if (Platform.OS === 'android' && Platform.Version >= 19) {
        statusBarHeightOffset = StatusBar.currentHeight
      }

      this.tabTop = location.py + location.height - statusBarHeightOffset;
    }

    if (this.state.contentVisible) {
      this.hide();
    } else {
      this.state.tabSelectIndex = index;
      this._show();
    }
  };

  updateCurrentLabel(label) {
    this.tabData[this.state.tabSelectIndex] = label
  }

  hide = () => {
    Animated.parallel([this._createAnimation(0), this._createFade(0)]).start(() => {
      this.state.tabSelectIndex = null;
      this.state.contentAnimated.setValue(0);
      this.setState({contentVisible: false});
    });
    if (this.state.tabSelectIndex !== null) this._createArrowAnimation(0)
  };

  _show = () => {
    this.setState({contentVisible: true}, () => {
      Animated.parallel([this._createAnimation(this.props.contentHeight), this._createFade(1)]).start()
      this._createArrowAnimation(0.5)
    })
  };

  _createAnimation = (height) => {
    return Animated.timing(
      this.state.contentAnimated,
      {
        toValue: height,
        duration: 200
      }
    );
  };

  _createFade = (value) => {
    return Animated.timing(
      this.state.opacityAnimated,
      {
        toValue: value,
        duration: 200,
      }
    );
  };

  _createArrowAnimation = (value) => {
    return Animated.timing(
      this.state.rotationAnims[this.state.tabSelectIndex],
      {
        toValue: value,
        duration: 300,
        easing: Easing.linear
      }
    ).start();
  };

  _measureView(view) {
    return new Promise((resolve) => {
      view.measure((x, y, width, height, px, py) => resolve({x, y, width, height, px, py}))
    });
  }

  _computeSelectColor = (index) => {
    return this.state.tabSelectIndex === index ? this.props.tabSelectColor : this.props.tabUnSelectColor
  };

  render() {
    return (
      <View>
        {/*tab*/}
        <View ref={(tab) => this.tab = tab} style={styles.tabStyle}>
          {this.tabData.map((item, index) => {
            return this._renderTabItem(item, index);
          })}
        </View>
        {/*content bg*/}
        <Modal
          animationType={'none'}
          visible={this.state.contentVisible}
          transparent={true}
          onRequestClose={this.hide}>
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={styles.modal}>
              <Animated.View style={[styles.bg, {top: this.tabTop, opacity: this.state.opacityAnimated}]}/>
              <Animated.View style={{position: 'absolute', top: this.tabTop, height: this.state.contentAnimated}}>
                {/*content*/}
                {this.props.children && this.props.children[this.state.tabSelectIndex]}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    )
  }

  _renderTabItem(item, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.tabItemStyle, {width: width / this.tabData.length}]}
        activeOpacity={1}
        onPress={() => this._onTabSelect(index)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.tabTextStyle,
            {fontSize: this.props.tabLabelSize, color: this._computeSelectColor(index)}]}>{item}</Text>
          {this._renderArrow(index)}
        </View>
      </TouchableOpacity>
    );
  }

  _renderArrow(index) {
    let icon = this.props.arrowImg;
    return (
      <Animated.Image
        source={icon}
        style={{marginLeft: 4, tintColor: this._computeSelectColor(index),transform: [{
            rotateZ: this.state.rotationAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg']
            })
          }]}} />
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width,
    flexDirection: 'row',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1
  },
  tabItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white'
  },
  tabTextStyle: {
    marginRight: 5
  },
  modal: {
    flex: 1
  },
  bg: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.2)'
  },
});
