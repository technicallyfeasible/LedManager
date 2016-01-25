/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import store from './app/store';
import React from 'react-native';
const {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
  Image,
} = React;
import { Provider } from 'react-redux';
import routes from './app/constants/routes';

import backImage from './app/img/back.png';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    marginTop: 5,
  },
  navText: {
    marginTop: 2,
    fontSize: 30,
  },
});

const LedManager = React.createClass({
  render() {
    const routeMapper = {
      LeftButton: (route, navigator, index) => {
        if (index === 0) return;
        return (
          <TouchableOpacity onPress={navigator.pop}>
            <Image source={backImage} width={48} height={42} />
          </TouchableOpacity>
        );
      },
      RightButton: (route, navigator, index, navState) => route.rightElement && route.rightElement(route, navigator, index, navState),
      Title: (route) => {
        return <Text style={styles.navText}>{route.name}</Text>;
      },
    };

    // modify top position for navigator container so it doesn't overlap the navbar
    const navStyles = {
      top: Navigator.NavigationBar.Styles.General.TotalNavHeight,
    };

    return (
      <Provider store={store}>
        <Navigator sceneStyle={[styles.container, navStyles]} initialRoute={routes.root()}
          renderScene={(route, navigator) =>
           <route.component route={route} navigator={navigator} />
          }
          navigationBar={<Navigator.NavigationBar style={styles.navBar} routeMapper={routeMapper} />}
        />
      </Provider>
    );
  },
});

AppRegistry.registerComponent('LedManager', () => LedManager);
