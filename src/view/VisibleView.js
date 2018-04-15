'use strict';
import React, {PureComponent} from 'react';

type Props = {
  visible: boolean
}

export default class VisibleView extends PureComponent<Props> {

  render() {
    return this.props.visible ? this.props.children : null
  }
}
