import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import { Map } from 'immutable';
import { program as programActionCreators } from '../../actions';
import {
  ColorGradient,
  ColorPicker,
} from '../elements';
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
  handleAdd(location) {
    const id = this.props.route && this.props.route.id;
    this.props.programActions.addAnchor(id, location);
  },
  handlePress(index) {
    const id = this.props.route && this.props.route.id;
    this.props.programActions.selectAnchor(id, index);
  },
  handleColorChange(color) {
    const id = this.props.route && this.props.route.id;
    const index = this.props.program.getIn(['editor', 'block', 'index']);
    this.props.programActions.setBlockColor(id, index, color);
  },
  render() {
    const id = this.props.route && this.props.route.id;
    const program = this.props.program;

    const block = program.getIn(['blocks', id]);
    const locationChange = this.props.programActions.setColorLocation.bind(this, id);

    const editor = program.getIn(['editor', 'block']);
    let colorPicker = null;
    if (editor.get('id') === id) {
      colorPicker = <ColorPicker color={editor.getIn(['color', 'color'])} onChange={this.handleColorChange} />;
    }

    return (
      <View style={styles.root}>
        <ColorGradient key={id} colors={block.get('colors').toJS()} onLocationAdd={this.handleAdd} onLocationChange={locationChange} onPress={this.handlePress} />
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
