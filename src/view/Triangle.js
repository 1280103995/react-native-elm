import React,{Component} from "react";
import {ART} from 'react-native';
import PropTypes from 'prop-types';
const {Surface, Shape, Path} = ART;
const T_WIDTH = 7;
const T_HEIGHT = 4;

export default class Triangle extends Component {

  static propTypes = {
    selectColor: PropTypes.string,
    unSelectColor: PropTypes.string,
    selected: PropTypes.bool
  };

  static defaultProps = {
    selected: false
  };

  render() {
    let path;
    let fill;
    if (this.props.selected) {
      fill = this.props.selectColor;
      path = new Path()
        .moveTo(T_WIDTH / 2, 0)
        .lineTo(0, T_HEIGHT)
        .lineTo(T_WIDTH, T_HEIGHT)
        .close();
    } else {
      fill = this.props.unSelectColor;
      path = new Path()
        .moveTo(0, 0)
        .lineTo(T_WIDTH, 0)
        .lineTo(T_WIDTH / 2, T_HEIGHT)
        .close();
    }

    return (
      <Surface width={T_WIDTH} height={T_HEIGHT}>
        <Shape d={path} stroke="#00000000" fill={fill} strokeWidth={0}/>
      </Surface>
    )
  }
}