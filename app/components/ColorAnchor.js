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
    top: -11,
    bottom: -11,
    right: -11,
    left: -11,
    flexDirection: 'row',
  },
  anchor: {
    width: 22,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

const ColorAnchor = React.createClass({
  propTypes: {
    canMove: React.PropTypes.bool,
    color: React.PropTypes.string,
    location: React.PropTypes.number,
    onLocationChange: React.PropTypes.func,
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
        self.props.onLocationChange(Math.min(1.0, Math.max(0, location)));
      });
    }
    this.setState({
      isMoving: true,
      x: e.nativeEvent.pageX,
    });
  },
  handleResponderRelease() {
    this.setState({
      isMoving: false,
    });
  },
  render() {
    const props = this.props;
    const left = {
      flex: (props.location || 0),
    };
    const right = {
      flex: 1.0 - (props.location || 0),
    };
    return (
      <View ref="root" style={styles.root}>
        <View style={left} />
        <View style={styles.anchor} onStartShouldSetResponder={this.handleStartShouldSetResponder} onMoveShouldSetResponder={this.handleMoveShouldSetResponder} onResponderMove={this.handleResponderMove} onResponderRelease={this.handleResponderRelease}>
          <Image source={anchorImage} />
        </View>
        <View style={right} />
      </View>
    );
  },
});

export default ColorAnchor;
