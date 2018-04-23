import React,{Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

export default class TabBar extends Component{

  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    underlineStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    activeTextColor: '#0398ff',
    inactiveTextColor: '#666',
    backgroundColor: "#fff",
  };

  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle} = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <TouchableOpacity
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, fontSize: 13 }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      bottom: 6,
      justifyContent: "center",
      alignItems: "center"
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, {transform: [{translateX:left}]}, this.props.underlineStyle]} >
          <View style={{height: 2, width: 35, backgroundColor: '#0398ff'}}/>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor:'#f1f1f1',
    borderBottomWidth:1
  },
});
