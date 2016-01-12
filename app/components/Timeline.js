const React = require('react-native');
const {
  StyleSheet,
  View,
} = React;
const ColorGradient = require('./ColorGradient');
const { List, Map } = require('immutable');
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
    timeline: React.PropTypes.instanceOf(List),
    blocks: React.PropTypes.instanceOf(Map),
  },
  getInitialState() {
    return {
      colors: [{
        color: '#000', location: 0.0,
      }, {
        color: '#f00', location: 0.1,
      }, {
        color: '#0f0', location: 0.4,
      }, {
        color: '#00f', location: 0.8,
      }, {
        color: '#000', location: 1.0,
      }],
    };
  },
  getDefaultProps() {
    return {
      program: [],
      blocks: [],
    };
  },
  handleLocationChange(index, location) {
    this.state.colors[index].location = location;
    this.forceUpdate();
  },
  render() {
    const timeline = this.props.timeline;
    const data = timeline.get(0).toJS();
    const colors = this.props.blocks.getIn([data.blockId, 'colors']).toJS();
    return (
      <View style={styles.root}>
        <ColorGradient colors={colors} onLocationChange={this.handleLocationChange} />
      </View>
    );
  },
});

module.exports = connect(state => ({
  blocks: state.program.get('blocks'),
}))(Timeline);
