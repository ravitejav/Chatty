import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {commonStyles, percentToVal} from '../styles/CommonStyles';

import LoginService from '../../services/LoginService';

const props = {};
export default class LoginPage extends Component<props> {
  loginService = null;

  constructor(props) {
    super(props);
    this.loginService = new LoginService();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  handleLogin = () => {
    const {emailId, password} = this.state;
    const loginResponse = this.loginService.loginWithEmail(emailId, password);
  };

  handleInputchange = (change) => {
    this.setState(change);
  };

  render() {
    return (
      <>
        <View style={styles.mainContainer}>
          <Text>Hello World!!</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  appName: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    fontSize: percentToVal(6),
    fontFamily: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
    }),
  },
  appTile: {
    flex: 0.25,
    position: 'relative',
  },
  inputFields: {
    flex: 0.5,
    flexDirection: 'column',
    paddingTop: '25%',
  },
  otherLoginOptions: {
    flex: 0.25,
    position: 'relative',
  },
  orLine: {
    flexDirection: 'row',
    height: percentToVal(5),
    justifyContent: 'space-around',
    paddingHorizontal: percentToVal(2),
  },
  line: {
    flex: 0.43,
    borderWidth: 1,
    height: 1,
    marginVertical: percentToVal(0.5),
    borderColor: '#000',
  },
  otherOptions: {
    top: 0,
    right: '42%',
    position: 'absolute',
  },
  signUp: {
    alignSelf: 'flex-end',
    marginBottom: percentToVal(1),
    marginRight: percentToVal(1),
    flexDirection: 'row',
  },
  signUpText: {
    color: 'blue',
  },
});
