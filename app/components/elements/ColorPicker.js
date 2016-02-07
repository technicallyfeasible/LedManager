import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import Slider from 'react-native-slider';

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

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
    const color = '#' + c.map(this.toHex).join('');
    console.log(color);
    this.props.onChange(color);
  },
  toHex(col) {
    return hex[(col >> 4) & 15] + hex[col & 15];
  },
  parseColor() {
    const color = this.props.color.substring(1);
    const components = [0, 0, 0];
    if (color.length === 3) {
      components[0] = parseInt(color[0] + color[0], 16);
      components[1] = parseInt(color[1] + color[1], 16);
      components[2] = parseInt(color[2] + color[2], 16);
    } else if (color.length === 6) {
      components[0] = parseInt(color[0] + color[1], 16);
      components[1] = parseInt(color[2] + color[3], 16);
      components[2] = parseInt(color[4] + color[5], 16);
    }
    return components;
  },
  render() {
    const c = this.parseColor();
    console.log(c);
    return (
      <View style={styles.root}>
        <View style={[styles.preview, { backgroundColor: this.props.color }]} />
        <View style={styles.sliders}>
          <Slider minimumValue={0} maximumValue={255} value={c[0]} thumbTintColor={'#' + this.toHex(c[0]) + '0000'} onValueChange={this.handleColorChange.bind(this, c, 0)} />
          <Slider minimumValue={0} maximumValue={255} value={c[1]} thumbTintColor={'#00' + this.toHex(c[1]) + '00'} onValueChange={this.handleColorChange.bind(this, c, 1)} />
          <Slider minimumValue={0} maximumValue={255} value={c[2]} thumbTintColor={'#0000' + this.toHex(c[2])} onValueChange={this.handleColorChange.bind(this, c, 2)} />
        </View>
      </View>
    );
  },
});

export default ColorPicker;
