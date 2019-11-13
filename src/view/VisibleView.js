'use strict';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class VisibleView extends PureComponent<Props> {

  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render() {
    return this.props.visible ? this.props.children : null
  }
}
