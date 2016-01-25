import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import I from 'immutable';
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
});

const Timeline = React.createClass({
  propTypes: {
    timeline: React.PropTypes.instanceOf(I.List),
    blocks: React.PropTypes.instanceOf(I.Map),
  },
  getDefaultProps() {
    return {
      timeline: I.List(),
      blocks: [],
    };
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
