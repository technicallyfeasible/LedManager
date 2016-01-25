import React from 'react-native';
const {
  StyleSheet,
  View,
} = React;
import routes from '../constants/routes';
import Button from './elements/Button';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'flex-start',
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

const MainPage = React.createClass({
  propTypes: {
    navigator: React.PropTypes.object,
  },
  render() {
    return (
      <View style={styles.root}>
        <Button text="Edit Program" onClick={() => this.props.navigator.push(routes.editProgram())} />
        <Button text="Edit Blocks" onClick={() => this.props.navigator.push(routes.blocks())} />
      </View>
    );
  },
});

export default MainPage;
