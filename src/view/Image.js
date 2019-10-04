'use strict';
import React from 'react'
import {Image as RNImage} from 'react-native'
import PropTypes from 'prop-types'

export default class Image extends React.Component {

  static cdn = 'https://fuss10.elemecdn.com'; //分类的图片用这个域名，搞不懂原作为什么用两个图片基础域名

  constructor(props) {
    super(props);
    this.baseUrl = 'http://cangdu.org:8001/img/'
  }

  static propTypes = {
    ...RNImage.propTypes,
    needBaseUrl: PropTypes.bool,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };
  static defaultProps = {
    ...RNImage.defaultProps,
    needBaseUrl: true
  };

  render() {
    let {source, needBaseUrl, ...others} = this.props;

    if (typeof source !== 'number' && needBaseUrl) {
      source = {uri: this.baseUrl + source}
    } else if (typeof source !== 'number' && !needBaseUrl) {
      source = {uri: source}
    }

    return (
      <RNImage source={source} {...others}/>
    );
  }
}
