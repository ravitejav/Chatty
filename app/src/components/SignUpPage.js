import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {commonStyles, percentToVal} from '../styles/CommonStyles';
import CustomButton from '../CommonComponents/CustomButton';
import CustomTextInput from '../CommonComponents/CustomTextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

const props = {};
export default class SignUpPage extends Component<props> {
  loginService = null;

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignUp = () => {};

  handleInputchange = (change) => {
    this.setState(change);
  };

  render() {
    return (
      <>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={percentToVal(15)}
          style={styles.mainContainer}>
          <View style={styles.appTile}>
            <Text style={styles.appName}> Chatty SignUp</Text>
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
            <CustomTextInput
              placeholder="Full Name"
              handleOnChange={this.handleInputchange}
              name="password"
            />
            <CustomTextInput
              placeholder="OTP"
              handleOnChange={this.handleInputchange}
              name="password"
            />
            <CustomButton label="SignUp" handleOnPress={this.handleSignUp} />
            <View style={styles.loginText}>
              <Text>Already Member? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('loginPage')}>
                <Text style={styles.loginButton}> Login Now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    fontSize: percentToVal(5),
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
    flex: 0.65,
    flexDirection: 'column',
    paddingTop: '9%',
  },
  loginText: {
    alignSelf: 'flex-end',
    paddingRight: percentToVal(0.5),
    paddingTop: percentToVal(1),
    flexDirection: 'row',
  },
  loginButton: {
    color: 'blue',
  },
});
