import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import ImmutablePropTypes from 'react-immutable-proptypes';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

const TimelineBlock = React.createClass({
  propTypes: {
    colors: ImmutablePropTypes.listOf(React.PropTypes.string),
  },
  getDefaultProps() {
    return {
      colors: [],
    };
  },
  render() {
    const views = this.props.colors.map((c, i) => {
      const style = {
        flex: 1,
        backgroundColor: c,
      };
      return <View key={i} style={style}/>;
    });

    return (
      <View style={styles.root}>
        { views }
      </View>
    );
  },
});

export default TimelineBlock;
