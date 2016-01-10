const React = require('react-native');
const {
  StyleSheet,
  View,
} = React;
const ColorGradient = require('./ColorGradient');
const { connect } = require('react-redux');

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    height: 100,
    position: 'relative',
  },
  gradient: {
    flex: 1,
  },
});

const Timeline = React.createClass({
  propTypes: {
    program: React.PropTypes.arrayOf(React.PropTypes.shape({
      // time offset in ms
      time: React.PropTypes.number,
      blockId: React.PropTypes.number,
      colors: React.PropTypes.arrayOf(React.PropTypes.string),
    })),
    blocks: React.PropTypes.arrayOf(React.PropTypes.shape({
      // id of the block
      id: React.PropTypes.number,
      // length in ms
      duration: React.PropTypes.number,
      // list of colors and locations
      colors: React.PropTypes.arrayOf(React.PropTypes.shape({
        color: React.PropTypes.string,
        location: React.PropTypes.number,
      })),
    })),
  },
  getDefaultProps() {
    return {
      program: [],
      blocks: [],
    };
  },
  render() {
    return (
      <View style={styles.root}>
      </View>
    );
  },
});

module.exports = connect(state => ({
  program: state.program.get('program'),
  blocks: state.program.get('blocks'),
}))(Timeline);
