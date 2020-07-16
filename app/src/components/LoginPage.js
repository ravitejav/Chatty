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
import CustomButton from '../CommonComponents/CustomButton';
import CustomTextInput from '../CommonComponents/CustomTextInput';

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
          <View style={styles.appTile}>
            <Text style={styles.appName}> Chatty </Text>
          </View>
          <View style={styles.inputFields}>
            <CustomTextInput
              placeholder="Email Id"
              style={commonStyles.inputField}
              handleOnChange={this.handleInputchange}
              name="emailId"
            />
            <CustomTextInput
              placeholder="Password"
              secureTextEntry={true}
              handleOnChange={this.handleInputchange}
              name="password"
            />
            <CustomButton label="Login" handleOnPress={this.handleLogin} />
            <View style={styles.signUp}>
              <Text style={styles.signUpText}>New User? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('signupPage')}>
                <Text style={styles.signUpText}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.otherLoginOptions}>
            <View style={styles.orLine}>
              <View style={styles.line} />
              <View>
                <Text>or</Text>
              </View>
              <View style={styles.line} />
            </View>
            <View style={styles.otherOptions}>
              <CustomButton
                icon="google"
                iconSize={40}
                style={commonStyles.otherEclipseOption}
              />
            </View>
          </View>
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
    flex: 0.3,
    position: 'relative',
  },
  inputFields: {
    flex: 0.45,
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
    fontSize: percentToVal(2),
    color: 'blue',
  },
});
