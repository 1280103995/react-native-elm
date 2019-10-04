/**
 * 屏幕工具类 以及一些常用的工具类封装
 * ui设计基准,iphone 6
 * width:750px
 * height:1334px
 */
import React from 'react';
import {
  PixelRatio,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的 defaultWidth 和 defaultHeight 为对应尺寸即可.
const defaultWidth = 750;
const defaultHeight = 1334;
const w2 = defaultWidth / DEFAULT_DENSITY;
const h2 = defaultHeight / DEFAULT_DENSITY;

//缩放比例
const _scaleWidth = screenW / defaultWidth;
const _scaleHeight = screenH / defaultHeight;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneXMAX
const X_MAX_WIDTH = 414;
const X_MAX_HEIGHT = 896;

/**
 * 屏幕适配,缩放size
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function px2dp(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp ,会随系统缩放比例改变，如不需要请去掉 * fontScale
 */
export function px2sp(size: Number) {
  const scale = Math.min(_scaleWidth, _scaleHeight);
  return size * scale * fontScale;
}

/**
 * 同时设置宽高
 * @param width
 * @param height
 * @returns {{width: Number, height: Number}}
 */
export function wh(width: Number, height: Number = width) {
  return {
    width: px2dp(width),
    height: px2dp(height)
  }
}

/**
 * 同时设置垂直方向的padding
 * @param top
 * @param bottom
 * @returns {{paddingTop: Number, paddingBottom: Number}}
 */
export function paddingTB(top: Number, bottom: Number = top) {
  return {
    paddingTop: px2dp(top),
    paddingBottom: px2dp(bottom)
  }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function paddingLR(left: Number, right: Number = left) {
  return {
    paddingLeft: px2dp(left),
    paddingRight: px2dp(right)
  }
}

/**
 * 同时设置垂直方向的margin
 * @param top
 * @param bottom
 * @returns {{marginTop: Number, marginBottom: Number}}
 */
export function marginTB(top: Number, bottom: Number = top) {
  return {
    marginTop: px2dp(top),
    marginBottom: px2dp(bottom)
  }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function marginLR(left: Number, right: Number = left) {
  return {
    marginLeft: px2dp(left),
    marginRight: px2dp(right)
  }
}

/**
 * 同时设置垂直方向的边线宽度
 * @param top
 * @param bottom
 * @returns {{borderTopWidth: number, borderBottomWidth: number}}
 */
export function borderWidthTB(top: Number, bottom: Number = top) {
  return {
    borderTopWidth: px2dp(top),
    borderBottomWidth: px2dp(bottom)
  }
}

/**
 * 同时设置水平方向的边线宽度
 * @param left
 * @param right
 * @returns {{borderLeftWidth: number, borderRightWidth: number}}
 */
export function borderWidthLR(left: Number, right: Number = left) {
  return {
    borderLeftWidth: px2dp(left),
    borderRightWidth: px2dp(right)
  }
}

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT))
  )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  } else if (Platform.OS === 'ios') {
    return iosStyle
  } else {
    if (androidStyle) return androidStyle;
    return iosStyle
  }
}

export function isIphoneMAX() {
  return (
      Platform.OS === 'ios' &&
      (screenH === X_MAX_HEIGHT && screenW === X_MAX_WIDTH)
  )
}

export function getStatusBarHeight() {
  let height = 0;
  if (isIphoneMAX()) {
    height = px2dp(35)
  }else if(isIphoneX())  {
    height = px2dp(44)
  }else  {
    height = Platform.OS === 'ios' ? px2dp(18) : StatusBar.currentHeight
  }
  return height;
}


