import React from 'react-native';
const {
  StyleSheet,
  View,
  Text,
} = React;
import { Map } from 'immutable';
import { program as programActionCreators } from '../actions';
import {
  ColorGradient,
} from './';
import {
  Button,
} from './elements';
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
  },
  getDefaultProps() {
    return {
      program: Map(),
    };
  },
  render() {
    const program = this.props.program;
    const blocks = program.get('blocks');

    return (
      <View style={styles.root}>
        <Text>Number of Blocks: { blocks.size }</Text>
        { blocks.map(b => {
          const id = b.get('id');
          const locationAdd = this.props.programActions.addAnchor.bind(this, id);
          const locationChange = this.props.programActions.setColorLocation.bind(this, id);
          return <ColorGradient key={id} colors={b.get('colors').toJS()} onLocationAdd={locationAdd} onLocationChange={locationChange} />;
        }).toArray() }
        <Button text="+" onClick={this.props.programActions.addBlock} />
      </View>
    );
  },
});

export default connect(state => ({
  program: state.program,
}), dispatch => ({
  programActions: bindActionCreators(programActionCreators, dispatch),
}))(BlockEditor);
