import React from 'react-native';
const {
  StyleSheet,
  View,
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
    marginLeft: 11,
    marginTop: 11,
    marginRight: 11,
    marginBottom: 11,
  },
  gradient: {
    flex: 1,
  },
});

const ColorGradient = React.createClass({
  propTypes: {
    colors: React.PropTypes.arrayOf(React.PropTypes.shape({
      color: React.PropTypes.string,
      location: React.PropTypes.number,
    })),
    onLocationChange: React.PropTypes.func,
  },
  getDefaultProps() {
    return {
      colors: [{
        color: '#000', location: 0.0,
      }, {
        color: '#000', location: 1.0,
      }],
    };
  },
  handleLocationChange(index, location) {
    const { onLocationChange, colors } = this.props;
    let l = location;
    // do not allow location to be before previous color
    if (index > 0 && colors[index - 1].location > l) {
      l = colors[index - 1].location;
    }
    // do not allow location to be after next color
    if (index < (colors.length - 1) && colors[index + 1].location < l) {
      l = colors[index + 1].location;
    }
    if (onLocationChange) onLocationChange(index, l);
  },
  render() {
    const self = this;
    const props = this.props;
    const colors = [];
    const locations = [];
    const anchors = [];
    // const sorted = props.colors.sort();
    props.colors.forEach((c, i) => {
      colors.push(c.color);
      locations.push(c.location);
      const anchor = <ColorAnchor key={i} location={c.location} color={c.color} canMove={i > 0 && i < (props.colors.length - 1)} onLocationChange={this.handleLocationChange.bind(self, i)} />;
      if (i === 0 || i === (props.colors.length - 1)) {
        anchors.splice(0, 0, anchor);
      } else {
        anchors.push(anchor);
      }
    });

    return (
      <View style={styles.root}>
        <LinearGradient colors={colors} locations={locations} start={[0.0, 0.0]} end={[1, 0]} style={styles.gradient} />
        { anchors }
      </View>
    );
  },
});

export default ColorGradient;
