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
  Text,
  View,
} = React;
const { Provider } = require('react-redux');

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
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      </Provider>
    );
  },
});

AppRegistry.registerComponent('LedManager', () => LedManager);
