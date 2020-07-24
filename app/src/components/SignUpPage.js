import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import {commonStyles, percentToVal} from '../styles/CommonStyles';
import CustomButton from '../CommonComponents/CustomButton';
import CustomTextInput from '../CommonComponents/CustomTextInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SignUpService from '../../services/SignUpService';

import {addSignUpDetails, setLoader} from './../../redux/Auth/actions';
import {signUpDetails} from '../../selectors/AuthSelectors';

const props = {};
class SignUpPage extends Component<props> {
  loginService = null;

  constructor(props) {
    super(props);
    this.signUpService = new SignUpService();
  }

  handleSignUp = () => {
    this.props.setLoader(true);
    this.signUpService.addUserAndSendOtp(
      this.props.signUpDetails,
      this.handleSignUpResponse,
    );
  };

  handleSignUpResponse = (response) => {
    const {setLoader, addSignUpDetails} = this.props;
    Alert.alert(response.message);
    setLoader(false);
    addSignUpDetails({
      emailId: '',
      password: '',
      fullName: '',
      nickName: '',
    });
  };

  handleInputchange = (change) => {
    this.props.addSignUpDetails(change);
  };

  render() {
    const {
      signUpDetails: {emailId, password, fullName, nickName},
    } = this.props;
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
              value={emailId}
            />
            <CustomTextInput
              placeholder="Password"
              secureTextEntry={true}
              handleOnChange={this.handleInputchange}
              name="password"
              value={password}
            />
            <CustomTextInput
              placeholder="Full Name"
              handleOnChange={this.handleInputchange}
              name="fullName"
              value={fullName}
            />
            <CustomTextInput
              placeholder="Nick Name"
              handleOnChange={this.handleInputchange}
              name="nickName"
              value={nickName}
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

const mapStateToProps = (state, ownProps) => ({
  signUpDetails: signUpDetails(state),
});

export default connect(mapStateToProps, {addSignUpDetails, setLoader})(
  SignUpPage,
);

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
