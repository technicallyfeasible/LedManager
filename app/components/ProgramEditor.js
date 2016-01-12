const React = require('react-native');
const {
  StyleSheet,
  View,
  Text,
  TextInput,
} = React;
const Timeline = require('./Timeline');
const { Map } = require('immutable');
const { connect } = require('react-redux');

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    position: 'relative',
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

const ProgramEditor = React.createClass({
  propTypes: {
    program: React.PropTypes.instanceOf(Map),
  },
  getDefaultProps() {
    return {
      program: Map(),
    };
  },
  render() {
    const program = this.props.program;
    const timelines = program.get('timelines');
    // const blocks = program.get('blocks');


    return (
      <View style={styles.root}>
        <Text>Number of LEDs: { timelines.size }</Text>
        <Text>LEDs</Text>
        { timelines.map(t => <Timeline timeline={t} />) }
      </View>
    );
  },
});

module.exports = connect(state => ({
  program: state.program,
}))(ProgramEditor);
