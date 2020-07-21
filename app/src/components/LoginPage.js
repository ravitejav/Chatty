import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

import {commonStyles, percentToVal} from '../styles/CommonStyles';
import CustomButton from '../CommonComponents/CustomButton';
import CustomTextInput from '../CommonComponents/CustomTextInput';

import LoginService from '../../services/LoginService';
import {
  userLoggedIN,
  addLoginDetails,
  setLoader,
} from './../../redux/Auth/actions';
import {authDeatils} from './../../selectors/AuthSelectors';

const props = {};
class LoginPage extends Component<props> {
  // loginService = null;

  constructor(props) {
    super(props);
    this.loginService = new LoginService();
  }

  UNSAFE_componentWillMount() {
    const {
      authDetails: {emailId, password} = {},
      userLoggedIN,
      setLoader,
    } = this.props;
    if (emailId && password) {
      setLoader(true);
      this.loginService.loginWithEmail(
        emailId,
        password,
        userLoggedIN,
        setLoader,
      );
    }
  }

  handleLogin = () => {
    const {
      authDetails: {emailId, password},
      userLoggedIN,
      setLoader,
    } = this.props;

    this.loginService.loginWithEmail(
      emailId,
      password,
      userLoggedIN,
      setLoader,
    );
  };

  handleInputchange = (change) => {
    this.props.addLoginDetails(change);
  };

  render() {
    const {authDeatils: {emailId, password} = {}} = this.props;

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
              value={emailId}
            />
            <CustomTextInput
              placeholder="Password"
              secureTextEntry={true}
              handleOnChange={this.handleInputchange}
              name="password"
              value={password}
            />
            <CustomButton label="Login" handleOnPress={this.handleLogin} />
            <View style={styles.signUp}>
              <Text>New User? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('signupPage')}>
                <Text style={styles.signUpText}>SignUp Now!</Text>
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

const mapStateToProps = (state, ownProps) => {
  return {
    authDetails: authDeatils(state),
  };
};

export default connect(mapStateToProps, {
  userLoggedIN,
  addLoginDetails,
  setLoader,
})(LoginPage);

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
