import React from 'react-native';
const {
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;
import { colors } from '../../styles';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0,
    borderColor: colors.primary,
    borderRadius: 0,
    backgroundColor: colors.primary,
  },
  buttonSmall: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 0,
    borderColor: colors.primary,
    borderRadius: 0,
    backgroundColor: colors.primary,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
  },
  textTransparent: {
    color: colors.secondary,
  },
});

const Button = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    text: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'large']),
    transparent: React.PropTypes.bool,
    onClick: React.PropTypes.func,
  },
  render() {
    const style = [];
    style.push(this.props.size === 'small' ? styles.buttonSmall : styles.button);
    const textStyle = [];
    textStyle.push(styles.text);

    if (this.props.transparent) {
      style.push(styles.transparent);
      textStyle.push(styles.textTransparent);
    }

    return (
      <TouchableOpacity style={style} onPress={this.props.onClick}>
        <Text style={textStyle}>{ this.props.text }</Text>
      </TouchableOpacity>
    );
  },
});

export default Button;
