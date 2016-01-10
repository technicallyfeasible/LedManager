/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

const store = require('./app/store');
const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  // Text,
  View,
} = React;
const { Provider } = require('react-redux');
const ColorGradient = require('./app/components/ColorGradient.js');
const Timeline = require('./app/components/Timeline.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const LedManager = React.createClass({
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
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Timeline />
          <ColorGradient colors={this.state.colors} onLocationChange={this.handleLocationChange} />
        </View>
      </Provider>
    );
  },
});

AppRegistry.registerComponent('LedManager', () => LedManager);
