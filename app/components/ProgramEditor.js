const React = require('react-native');
const {
  StyleSheet,
  View,
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
    flexDirection: 'column',
    position: 'relative',
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
        <View style={styles.row}>
          <Text value="Number of LEDs" />
          <TextInput value={timelines.size} />
        </View>
        { timelines.map(timeline => <Timeline />) }
      </View>
    );
  },
});

module.exports = connect(state => ({
  program: state.program,
}))(ProgramEditor);
