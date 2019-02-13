"use strict";
import React from 'react';
import {ViewPropTypes, Animated, PanResponder, View, ScrollView, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class Carousel extends React.Component {

  static propTypes = {
    pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    loop: PropTypes.bool,
    index: PropTypes.number,
    autoplay: PropTypes.bool,
    autoplayTimeout: PropTypes.number,
    slipFactor: PropTypes.number, //滑动速率
    animation: PropTypes.func,
    onPageChanged: PropTypes.func,
    showsPageIndicator: PropTypes.bool,
    renderPageIndicator: PropTypes.bool,
    pageIndicatorContainerStyle: ViewPropTypes.style,
    activePageIndicatorStyle: ViewPropTypes.style,
    pageIndicatorStyle: ViewPropTypes.style,
    pageIndicatorOffset: PropTypes.number
  };

  static defaultProps = {
    pageSize: '100%',
    index: 0,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    slipFactor: 1,
    showsPageIndicator: true,
    pageIndicatorOffset: 16,
    animation: (animate, toValue) => {
      return Animated.spring(animate, {
        toValue: toValue,
        friction: 10, //摩擦力
        tension: 50, //张力
      });
    }
  };

  constructor(props) {
    super(props);
    this.autoPlayTimer = 0;
    this.currentIndex = 0;
    this.panStartIndex = 0;
    this.panOffsetFactor = 0;
    this.state = {
      scrollValue: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      // 当返回true的时候则可以进行之后的事件传递。
      onStartShouldSetPanResponder: () => {
        this.startPanResponder();
        return true;
      },
      //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          this.startPanResponder();
          return true;
        } else {
          return false;
        }
      },
      // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      onPanResponderGrant: (e, gestureState) => {
        this.startPanResponder();
      },
      //手势开始
      onPanResponderStart: (e, gestureState) => {
        this.startPanResponder();
      },
      // 最近一次的移动距离
      onPanResponderMove: (e, gestureState) => {
        this.panOffsetFactor = this.computePanOffset(gestureState);
        this.gotoPage(this.panStartIndex + this.panOffsetFactor, false);
      },
      //手势结束
      onPanResponderEnd: (e, gestureState) => {
        this.endPanResponder(gestureState);
        this.scrollView.scrollTo({x: 0, animated: true});
      },
      //其他的东西想成为响应器。这种视图应该释放应答吗？返回 true 就是允许释放
      onPanResponderTerminationRequest: () => {
        return false;
      },
    });
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.startAutoPlay();
    }
    this.gotoPage(this.props.index + (this.props.loop ? 1 : 0), false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.autoplay) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    if (!this.autoPlayTimer) {
      this.autoPlayTimer = setInterval(() => {
        this.gotoNextPage();
      }, this.props.autoplayTimeout);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = 0;
    }
  }

  computePanOffset(gestureState) {
    let offset = -gestureState.dx / (this.props.pageSize / this.props.slipFactor);
    if (Math.abs(offset) > 1) {
      offset = offset > 1 ? 1 : -1;
    }
    return offset;
  }

  startPanResponder() {
    this.stopAutoPlay();
    this.panStartIndex = this.currentIndex;
    this.panOffsetFactor = 0;
    if (this.pageAnimation) {
      const index = this.currentIndex;
      this.pageAnimation.stop();
      this.gotoPage(index);
    }
  }

  endPanResponder(gestureState) {
    if (this.props.autoplay) {
      this.startAutoPlay();
    }
    let newIndex = this.currentIndex;
    this.panOffsetFactor = this.computePanOffset(gestureState);
    if (this.panOffsetFactor > 0.5 || (this.panOffsetFactor > 0 && gestureState.vx <= -0.1)) {
      newIndex = Math.floor(this.currentIndex + 1);
    } else if (this.panOffsetFactor < -0.5 || (this.panOffsetFactor < 0 && gestureState.vx >= 0.1)) {
      newIndex = Math.ceil(this.currentIndex - 1);
    } else {
      newIndex = Math.round(this.currentIndex);
    }
    if (this.currentIndex === newIndex) {
      return;
    }
    this.gotoPage(newIndex);
  }

  gotoNextPage(animated = true) {
    const childrenNum = this.getChildrenNum();
    if (!this.props.loop) {
      if (this.currentIndex === childrenNum - 1) {
        return;
      }
    }
    this.gotoPage(Math.floor(this.currentIndex) + 1);
  }

  gotoPage(index, animated = true, cb = () => {
  }) {
    const childrenNum = this.getChildrenNum();
    if (childrenNum <= 1) {
      return cb();
    }
    if (index < 0) {
      index = 0;
    }
    if (index > childrenNum - 1) {
      index = childrenNum - 1;
    }
    const setIndex = (index) => {
      this.currentIndex = index;
      if (this.props.onPageChanged && Number.isInteger(this.currentIndex)) {
        this.props.onPageChanged(this.getCurrentPage());
      }
    };
    if (animated) {
      this.pageAnimation = this.props.animation(this.state.scrollValue, index);
      const animationId = this.state.scrollValue.addListener((state) => {
        setIndex(state.value);
      });
      this.pageAnimation.start(() => {
        this.state.scrollValue.removeListener(animationId);
        setIndex(index);
        this.pageAnimation = null;
        this.loopJump();
        cb();
      });
    } else {
      this.state.scrollValue.setValue(index);
      setIndex(index);
      this.loopJump();
      cb();
    }
  }

  /**
   * -0.5 <= pageIndex <= (pages.length - 1 + 0.5)
   */
  getCurrentPage() {
    const childrenNum = this.getChildrenNum();
    if (childrenNum <= 1) {
      return childrenNum;
    }
    const index = this.currentIndex;
    if (this.props.loop) {
      if (index < 0.5) {
        return index + childrenNum - 2 - 1;
      } else if (index > childrenNum - 2 + 0.5) {
        return index - childrenNum + 1;
      } else {
        return index - 1;
      }
    } else {
      return index;
    }
  }

  loopJump() {
    if (!this.props.loop) {
      return;
    }
    const childrenNum = this.getChildrenNum();
    if (childrenNum <= 1) {
      return;
    }
    if (this.currentIndex === 0) {
      this.gotoPage(childrenNum - 2, false);
    } else if (this.currentIndex === (childrenNum - 1)) {
      this.gotoPage(1, false);
    }
  }

  getChildrenNum() {
    const {children, loop} = this.props;
    let pages = React.Children.toArray(children);
    if (pages.length < 2) {
      return 1;
    }
    if (loop) {
      return pages.length + 2;
    } else {
      return pages.length;
    }
  }

  _renderIndicator(config) {
    if (!this.props.showsPageIndicator) {
      return null;
    }
    if (this.props.renderPageIndicator) {
      return this.props.renderPageIndicator(config);
    }
    const {childrenNum, pageNum, loop, scrollValue} = config;
    if (pageNum <= 1) {
      return null;
    }
    const indicators = [];
    for (let i = 0; i < pageNum; i++) {
      indicators.push(<View key={i} style={[styles.pageIndicatorStyle, this.props.pageIndicatorStyle]}/>)
    }
    const offset = this.props.pageIndicatorOffset;
    let left;
    if (pageNum === 1) {
      left = this.state.scrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0]
      });
    } else if (!loop) {
      left = this.state.scrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, offset]
      });
    } else {
      left = this.state.scrollValue.interpolate({
        inputRange: [0, 1, 2, childrenNum - 2, childrenNum - 1],
        outputRange: [0, 0, offset, offset * (childrenNum - 3), offset * (childrenNum - 3)]
      });
    }
    return (
      <View style={[styles.pageIndicatorContainerStyle, this.props.pageIndicatorContainerStyle]}>
        {indicators}
        <Animated.View style={[
          styles.pageIndicatorStyle, styles.activePageIndicatorStyle,
          this.props.pageIndicatorStyle, this.props.activePageIndicatorStyle,
          {left: left}
        ]}/>
      </View>
    )
  }

  render() {
    const {children, pageSize, loop} = this.props;
    const {scrollValue} = this.state;
    let pages = React.Children.toArray(children);
    const pageNum = pages.length;
    if (loop && pages.length > 1) {
      pages.unshift(pages[pages.length - 1]);
      pages.push(pages[1]);
    }
    pages = pages.map((page, index) => {
      return <View key={index} style={{width: pageSize}}>{page}</View>
    });
    const childrenNum = pages.length;
    let content;
    if (childrenNum < 1) {
      content = null;
    } else {
      const translateX = scrollValue.interpolate({
        inputRange: [0, 1, childrenNum],
        outputRange: [0, -pageSize, -childrenNum * pageSize]
      });
      content =
        <Animated.View
          style={{flexDirection: 'row', width: pageSize * childrenNum, transform: [{translateX}]}}
          {...this.panResponder.panHandlers}>
          {pages}
        </Animated.View>
    }
    return (
      <View>
        <ScrollView
          ref={ref => this.scrollView = ref}
          style={{width: pageSize}}
          contentContainerStyle={{width: pageSize + 1}}
          horizontal={true}
          pagingEnabled={true}
          directionalLockEnabled={true}
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={Platform.OS === 'ios'}
        >
          {content}
        </ScrollView>
        {this._renderIndicator({childrenNum, pageNum, loop, scrollValue})}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageIndicatorStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  activePageIndicatorStyle: {
    position: 'absolute',
    backgroundColor: 'blue',
  },
  pageIndicatorContainerStyle: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    bottom: 10
  }
});
