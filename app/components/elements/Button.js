const React = require('react-native');
const {
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;
const { colors } = require('../../styles');

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#66a',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  buttonSmall: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddingBottom: 3,
    borderWidth: 1,
    borderColor: '#66a',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  text: {
    color: '#fff',
  },
});

const Button = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
    text: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'large']),
    onClick: React.PropTypes.func,
  },
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onClick}>
        <Text style={styles.text}>{ this.props.text }</Text>
      </TouchableOpacity>
    );
  },
});

module.exports = Button;
