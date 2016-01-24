/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import store from './app/store';
import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  View,
} = React;
import { Provider } from 'react-redux';
import { Button } from './app/components/elements';
import {
  ProgramEditor,
  BlockEditor,
} from './app/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
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
          <BlockEditor />
          <Button text="SEND TO DEVICE" />
        </View>
      </Provider>
    );
  },
});

AppRegistry.registerComponent('LedManager', () => LedManager);
