import React from 'react-native';
const {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  NativeModules: {
    UIManager,
  },
} = React;
import LinearGradient from 'react-native-linear-gradient';
import {
  ColorAnchor,
} from './';

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    flex: 1,
    position: 'relative',
    height: 50,
  },
  gradient: {
    flex: 1,
    marginLeft: 11,
    marginTop: 11,
    marginRight: 11,
    marginBottom: 11,
  },
});

const ColorGradient = React.createClass({
  propTypes: {
    colors: React.PropTypes.arrayOf(React.PropTypes.shape({
      color: React.PropTypes.string,
      location: React.PropTypes.number,
    })),
    onPress: React.PropTypes.func,
    onLocationChange: React.PropTypes.func,
    onLocationAdd: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      colors: [],
    };
  },
  handleLocationChange(index, location) {
    const { onLocationChange, colors } = this.props;
    if (!onLocationChange) return;
    let l = location;
    // do not allow location to be before previous color
    if (index > 0 && colors[index - 1].location > l) {
      l = colors[index - 1].location;
    }
    // do not allow location to be after next color
    if (index < (colors.length - 1) && colors[index + 1].location < l) {
      l = colors[index + 1].location;
    }
    onLocationChange(index, l);
  },

  /**
   * Add a new anchor
   */
  handleAdd(e) {
    const { onLocationAdd } = this.props;
    if (!onLocationAdd) return;
    const pageX = e.nativeEvent.pageX;
    UIManager.measureLayoutRelativeToParent(React.findNodeHandle(this.refs.root), () => {
      // TODO: do something with the error
    }, (x, y, width) => {
      const location = Math.min(1.0, Math.max(0, ((pageX - x) / width)));
      onLocationAdd(location);
    });
  },

  render() {
    const props = this.props;
    const colors = [];
    const locations = [];
    const anchors = [];
    // const sorted = props.colors.sort();
    props.colors.forEach((c, i) => {
      colors.push(c.color);
      locations.push(c.location);
      if (!this.props.onLocationChange) return;
      const anchor = <ColorAnchor key={i} index={i} location={c.location} color={c.color} canMove={i > 0 && i < (props.colors.length - 1)} onLocationChange={this.handleLocationChange} onPress={this.props.onPress} />;
      if (i === 0 || i === (props.colors.length - 1)) {
        anchors.splice(0, 0, anchor);
      } else {
        anchors.push(anchor);
      }
    });

    // make sure we have at least 2 colors
    while (colors.length < 2) {
      locations.push(colors.length);
      colors.push('#000');
    }

    const component = (
      <View ref="root" style={styles.root}>
        <LinearGradient colors={colors} locations={locations} start={[0.0, 0.0]} end={[1.0, 0.0]} style={styles.gradient} />
        { anchors }
      </View>
    );

    // need to omit Touchable because otherwise other click handlers will not be fired
    if (!this.props.onLocationAdd) return component;

    return (
      <TouchableWithoutFeedback onPress={this.handleAdd}>
        { component }
      </TouchableWithoutFeedback>
    );
  },
});

export default ColorGradient;
