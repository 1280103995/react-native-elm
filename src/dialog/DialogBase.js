import React,{PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "teaset";

export default class DialogBase extends PureComponent{

  static propTypes = {
    type: PropTypes.oneOf(['zoomOut', 'zoomIn', 'custom']),
    modal: PropTypes.bool,
  };

  static defaultProps = {
    type: 'zoomIn',
    modal: false,
  };

  render(){
    return null
  }

  _renderView(){
    return(
      <Overlay.PopView
        style={{alignItems: 'center', justifyContent: 'center'}}
        type={this.props.type}
        modal={this.props.modal}
        ref={v => this.overlayPopView = v}>
        {this.renderContent()}
      </Overlay.PopView>
    )
  }

  renderContent(){
    return null
  }

  show() {
    Overlay.show(this._renderView())
  }

  hide() {
    this.overlayPopView.close()
  }
}