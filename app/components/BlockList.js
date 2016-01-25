import React from 'react-native';
const {
  StyleSheet,
  View,
  Text,
  ListView,
} = React;
import I from 'immutable';
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
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

const BlockList = React.createClass({
  propTypes: {
    program: React.PropTypes.instanceOf(I.Map),
    programActions: React.PropTypes.object,
  },
  getDefaultProps() {
    return {
      program: I.Map(),
    };
  },
  getInitialState() {
    const blocks = this.props.program && this.props.program.get('blocks');
    const ds = new ListView.DataSource({
      rowHasChanged: (b1, b2) => !I.is(b1, b2),
    });
    return {
      ds: ds.cloneWithRows(!blocks ? [] : blocks.toArray()),
    };
  },
  componentWillReceiveProps(props) {
    const blocks = props.program.get('blocks');
    this.setState({
      ds: this.state.ds.cloneWithRows(!blocks ? [] : blocks.toArray()),
    });
  },
  renderRow(block) {
    const id = block.get('id');
    return <ColorGradient key={id} colors={block.get('colors').toJS()} />;
  },
  render() {
    return (
      <View style={styles.root}>
        <ListView dataSource={this.state.ds} renderRow={this.renderRow} />
        <Button text="+" onClick={this.props.programActions.addBlock} />
      </View>
    );
  },
});

export default connect(state => ({
  program: state.program,
}), dispatch => ({
  programActions: bindActionCreators(programActionCreators, dispatch),
}))(BlockList);
