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
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
export let pixelRatio = PixelRatio.get();
//像素密度
export const DEFAULT_DENSITY = 2;

//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 750 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 1334 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function px2sp(size: number) {
  let scaleWidth = screenW / w2;
  let scaleHeight = screenH / h2;
  let scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5));
  return size / DEFAULT_DENSITY;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {number}
 */
export function px2dp(size: number) {
  let scaleWidth = screenW / w2;
  let scaleHeight = screenH / h2;
  let scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round((size * scale + 0.5));
  return size / DEFAULT_DENSITY;
}

/**
 * 同时设置宽高
 * @param width
 * @param height
 * @returns {{width: Number, height: Number}}
 */
export function wh(width: number, height: number = width) {
  return {
    width: px2sp(width),
    height: px2sp(height)
  }
}

/**
 * 同时设置垂直方向的padding
 * @param top
 * @param bottom
 * @returns {{paddingTop: Number, paddingBottom: Number}}
 */
export function paddingTB(top: number, bottom: number = top) {
  return {
    paddingTop: px2sp(top),
    paddingBottom: px2sp(bottom)
  }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function paddingLR(left: number, right: number = left) {
  return {
    paddingLeft: px2sp(left),
    paddingRight: px2sp(right)
  }
}

/**
 * 同时设置垂直方向的margin
 * @param top
 * @param bottom
 * @returns {{marginTop: Number, marginBottom: Number}}
 */
export function marginTB(top: number, bottom: number = top) {
  return {
    marginTop: px2sp(top),
    marginBottom: px2sp(bottom)
  }
}

/**
 * 同时设置水平方向的padding
 * @param left
 * @param right
 * @returns {{paddingLeft: Number, paddingRight: Number}}
 */
export function marginLR(left: number, right: number = left) {
  return {
    marginLeft: px2sp(left),
    marginRight: px2sp(right)
  }
}

/**
 * 同时设置垂直方向的边线宽度
 * @param top
 * @param bottom
 * @returns {{borderTopWidth: number, borderBottomWidth: number}}
 */
export function borderWidthTB(top: number, bottom: number = top) {
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
export function borderWidthLR(left: number, right: number = left) {
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


