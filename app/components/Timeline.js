import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import { List, Map } from 'immutable';
import { connect } from 'react-redux';

import {
  TimelineBlock,
} from './';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'row',
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
  getDefaultProps() {
    return {
      program: [],
      blocks: [],
    };
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
  handleLocationChange(index, location) {
    this.state.colors[index].location = location;
    this.forceUpdate();
  },
  _getColors(timeline) {
    let colors = timeline.get('colors');
    if (!colors) {
      colors = ((this.props.blocks && this.props.blocks.getIn([timeline.get('blockId'), 'colors'])) || []).map(c => c.get('color'));
    }
    return colors;
  },
  render() {
    const timeline = this.props.timeline;
    const blockElements = timeline.map((b, i) => {
      return <TimelineBlock key={i} colors={this._getColors(b)}/>;
    });
    return (
      <View style={styles.root}>
        { blockElements }
      </View>
    );
  },
});

export default connect(state => ({
  blocks: state.program.get('blocks'),
}))(Timeline);
