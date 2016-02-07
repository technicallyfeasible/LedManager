import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import Slider from 'react-native-slider';
import colorUtils from '../../utils/colors';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 11,
    paddingRight: 11,
    height: 120,
  },
  preview: {
    flex: 0.3,
    marginRight: 11,
  },
  sliders: {
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

const ColorPicker = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      color: '#000',
    };
  },
  handleColorChange(c, index, value) {
    if (!this.props.onChange) return;
    c[index] = Math.round(value);
    const color = '#' + c.map(colorUtils.toHex).join('');
    this.props.onChange(color);
  },
  render() {
    const c = colorUtils.parseColor(this.props.color);
    const sliderCommon = {
      minimumValue: 0,
      maximumValue: 255,
      minimumTrackTintColor: '#000',
    };
    return (
      <View style={styles.root}>
        <View style={[styles.preview, { backgroundColor: this.props.color }]} />
        <View style={styles.sliders}>
          <Slider {...sliderCommon} maximumTrackTintColor="#f00" value={c[0]} thumbTintColor={'#' + colorUtils.toHex(c[0]) + '0000'} onValueChange={this.handleColorChange.bind(this, c, 0)} />
          <Slider {...sliderCommon} maximumTrackTintColor="#0f0" value={c[1]} thumbTintColor={'#00' + colorUtils.toHex(c[1]) + '00'} onValueChange={this.handleColorChange.bind(this, c, 1)} />
          <Slider {...sliderCommon} maximumTrackTintColor="#00f" value={c[2]} thumbTintColor={'#0000' + colorUtils.toHex(c[2])} onValueChange={this.handleColorChange.bind(this, c, 2)} />
        </View>
      </View>
    );
  },
});

export default ColorPicker;
