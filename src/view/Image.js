'use strict';
import React from 'react'
import {Image} from 'react-native'
import PropTypes from 'prop-types'

export default class ImageView extends Image {

  constructor(props) {
    super(props);
    this.baseUrl = 'http://cangdu.org:8001/img/'
  }

  static propTypes = {
    ...Image.propTypes,
    needBaseUrl: PropTypes.bool,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  };
  static defaultProps = {
    ...Image.defaultProps,
    needBaseUrl: true
  };

  render() {
    let {source, needBaseUrl, ...others} = this.props;

    if (typeof source !== 'number' && needBaseUrl) {
      source = {uri: this.baseUrl + source}
    } else if (typeof source !== 'number' && !needBaseUrl) {
      source = {uri: source}
    }
    this.props = {source, ...others};

    return super.render();
  }
}