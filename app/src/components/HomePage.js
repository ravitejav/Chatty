import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

const props = {};
export default class HomePage extends Component<props> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <LoginPage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
