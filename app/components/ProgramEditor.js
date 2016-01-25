import React from 'react-native';
const {
  StyleSheet,
  View,
  Text,
} = React;
import { Map } from 'immutable';
import { program as programActionCreators } from '../actions';
import Timeline from './Timeline';
import Button from './elements/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    programActions: React.PropTypes.object,
    navigator: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      program: Map(),
    };
  },
  render() {
    const program = this.props.program;
    const timelines = program.get('timelines');

    return (
      <View style={styles.root}>
        <Text>Number of LEDs: { timelines.size }</Text>
        <Text>LEDs</Text>
        { timelines.map((t, i) => <Timeline key={i} timeline={t} />) }
        <Button text="+" onClick={this.props.programActions.addTimeline} />
      </View>
    );
  },
});

export default connect(state => ({
  program: state.program,
}), dispatch => ({
  programActions: bindActionCreators(programActionCreators, dispatch),
}))(ProgramEditor);
