import React from 'react-native';
const {
  StyleSheet,
  View,
  Image,
  NativeModules: {
    UIManager,
  },
} = React;
import anchorImage from '../img/anchor.png';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
  },
  anchor: {
    width: 22,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

const ColorAnchor = React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    canMove: React.PropTypes.bool,
    color: React.PropTypes.string,
    location: React.PropTypes.number,
    onLocationChange: React.PropTypes.func,
    onPress: React.PropTypes.func,
  },
  getInitialState() {
    return {
      isMoving: false,
    };
  },
  handleStartShouldSetResponder(e) {
    if (!this.props.canMove) return false;
    this.setState({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
      t: e.nativeEvent.timeStamp,
    });
    return true;
  },
  handleMoveShouldSetResponder() {
    return !!this.props.canMove;
  },
  handleResponderMove(e) {
    const self = this;
    if (this.props.onLocationChange) {
      const dx = e.nativeEvent.pageX - this.state.x;
      UIManager.measureLayoutRelativeToParent(React.findNodeHandle(this.refs.root), () => {
        // TODO: do something with the error
      }, (x, y, width) => {
        const location = self.props.location + (dx / width);
        self.props.onLocationChange(this.props.index, Math.min(1.0, Math.max(0, location)));
      });
    }
    this.setState({
      isMoving: true,
      x: e.nativeEvent.pageX,
    });
  },
  handleResponderRelease(e) {
    this.setState({
      isMoving: false,
    });
    // emit press event if not moved and released after less than 300ms
    const dxy = Math.abs(e.nativeEvent.pageX - this.state.x) + Math.abs(e.nativeEvent.pageY - this.state.y);
    const dt = (e.nativeEvent.timeStamp - this.state.t);
    if (dxy === 0 && dt < 300) {
      if (this.props.onPress) this.props.onPress(this.props.index);
    }
  },
  render() {
    const props = this.props;
    const left = {
      flex: (props.location || 0),
    };
    const right = {
      flex: 1.0 - (props.location || 0),
    };
    const colorBadge = {
      width: 18,
      height: 10,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 1,
      marginBottom: -11,
      backgroundColor: props.color,
    };
    return (
      <View ref="root" style={styles.root}>
        <View style={left} />
        <View style={styles.anchor} onStartShouldSetResponder={this.handleStartShouldSetResponder} onMoveShouldSetResponder={this.handleMoveShouldSetResponder} onResponderMove={this.handleResponderMove} onResponderRelease={this.handleResponderRelease}>
          <View style={colorBadge} />
          <Image source={anchorImage} />
        </View>
        <View style={right} />
      </View>
    );
  },
});

export default ColorAnchor;
