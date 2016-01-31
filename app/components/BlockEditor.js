import React from 'react-native';
const {
  StyleSheet,
  View,
  Alert,
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
  getInitialState() {
    return {
      currentColor: null,
    };
  },
  handlePress(index) {
    const id = this.props.route && this.props.route.id;
    const program = this.props.program;
    const color = program.getIn(['blocks', id, 'colors', index]);
    this.setState({
      currentColor: color,
    });
  },
  render() {
    const id = this.props.route && this.props.route.id;
    const program = this.props.program;

    const block = program.getIn(['blocks', id]);
    const locationAdd = this.props.programActions.addAnchor.bind(this, id);
    const locationChange = this.props.programActions.setColorLocation.bind(this, id);

    let colorPicker = null;
    if (this.state.currentColor) {
      colorPicker = <View style={{ width: 100, height: 50, backgroundColor: this.state.currentColor.get('color') }} />;
    }

    return (
      <View style={styles.root}>
        <ColorGradient key={id} colors={block.get('colors').toJS()} onLocationAdd={locationAdd} onLocationChange={locationChange} onPress={this.handlePress} />
        { colorPicker }
      </View>
    );
  },
});

export default connect(state => ({
  program: state.program,
}), dispatch => ({
  programActions: bindActionCreators(programActionCreators, dispatch),
}))(BlockEditor);
