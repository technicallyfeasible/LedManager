import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import { Map } from 'immutable';
import { program as programActionCreators } from '../actions';
import {
  ColorGradient,
} from './';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    position: 'relative',
    height: 400,
  },
});

const BlockEditor = React.createClass({
  propTypes: {
    program: React.PropTypes.instanceOf(Map),
    programActions: React.PropTypes.object,
    route: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      program: Map(),
    };
  },
  render() {
    const id = this.props.route && this.props.route.id;
    const program = this.props.program;

    const block = program.getIn(['blocks', id]);
    const locationAdd = this.props.programActions.addAnchor.bind(this, id);
    const locationChange = this.props.programActions.setColorLocation.bind(this, id);

    return (
      <View style={styles.root}>
        <ColorGradient key={id} colors={block.get('colors').toJS()} onLocationAdd={locationAdd} onLocationChange={locationChange} />
      </View>
    );
  },
});

export default connect(state => ({
  program: state.program,
}), dispatch => ({
  programActions: bindActionCreators(programActionCreators, dispatch),
}))(BlockEditor);
