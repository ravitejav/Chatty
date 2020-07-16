/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import StackNavigator from './app/src/components/navigator';
import { NavigationContainer } from '@react-navigation/native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <StackNavigator></StackNavigator>
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
});

export default App;
