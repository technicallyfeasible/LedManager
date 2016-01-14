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
const ProgramEditor = require('./app/components/ProgramEditor.js');

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
          <ProgramEditor />
        </View>
      </Provider>
    );
  },
});

AppRegistry.registerComponent('LedManager', () => LedManager);