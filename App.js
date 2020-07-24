/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import LoginNavigator from './app/src/components/navigator/LoginContainer';
import DashBoardNavigator from './app/src/components/navigator/DashBoardContainer';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {loader, userDetails} from './app/selectors/AuthSelectors';

const App: () => React$Node = (props) => {
  const {
    userDetails: {loggedIn, emailVerified},
  } = props;
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator
          size="large"
          color="#000000"
          animating={props.loader}
          style={props.loader ? styles.activity : {display: 'none'}}
        />
        <NavigationContainer>
          {loggedIn && emailVerified && <DashBoardNavigator />}
          {(!loggedIn || !emailVerified) && <LoginNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'column',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    color: '#000',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    opacity: 0.3,
    zIndex: 1,
  },
});

export default connect((state, ownprops) => ({
  loader: loader(state),
  userDetails: userDetails(state),
}))(App);
