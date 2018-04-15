'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Color from "../app/Color";

export default class StarRating extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    maxStars: PropTypes.number,
    rating: PropTypes.number,
    onStarChange: PropTypes.func,
    style: ViewPropTypes.style,
    starSize: PropTypes.number,
  };

  static defaultProps = {
    disabled: true,
    maxStars: 5,
    rating: 0,
  };

  constructor(props) {
    super(props);
    const roundedRating = (Math.round(this.props.rating * 2) / 2);
    this.state = {
      maxStars: this.props.maxStars,
      rating: roundedRating
    }
  }

  pressStarButton (rating) {
    if (!this.props.disabled) {
      if (rating !== this.state.rating) {
        if (this.props.onStarChange) {
          this.props.onStarChange(rating);
        }
        this.setState({
          rating: rating,
        });
      }
    }
  }

  render() {
    const starsLeft = this.state.rating;
    const starButtons = [];
    for (let i = 0; i < this.state.maxStars; i++) {
      const starColor = (i + 1) <= starsLeft ? styles.selectedColor : styles.unSelectedColor;
      const starStr = '\u2605';
      starButtons.push(
        <TouchableOpacity
          activeOpacity={0.20}
          key={i + 1}
          onPress={this.pressStarButton.bind(this, (i + 1))}
        >
          <Text style={[starColor,{fontSize:this.props.starSize}]}>{starStr}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.starRatingContainer]}>
        {starButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedColor: {
    color:Color.orange
  },
  unSelectedColor:{
    color:'#999999'
  }
});