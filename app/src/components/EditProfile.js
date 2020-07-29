import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import {connect} from 'react-redux';

import {userDetails} from '../../selectors/AuthSelectors';
import CustomTextInput from '../CommonComponents/CustomTextInput';
import CustomButton from '../CommonComponents/CustomButton';
import {commonStyles, percentToVal} from '../styles/CommonStyles';
import {setLoader, userLoggedIN} from '../../redux/Auth/actions';
import SignUpService from '../../services/SignUpService';

const props = {};
class EditProfile extends Component<props> {
  constructor(props) {
    super(props);
    this.signUpService = new SignUpService();
    this.state = {};
  }

  UNSAFE_componentWillMount() {
    const {
      user: {
        userDetails: {email, password, fullName, nickName, photoURL},
      },
    } = this.props;
    this.setState({email, password, fullName, nickName, photoURL});
  }

  handleInputchange = (change) => {
    this.setState(change);
  };

  handleUpdate = () => {
    this.signUpService.updateDetails(
      this.state,
      this.props.setLoader,
      this.props.userLoggedIN,
    );
    this.props.navigation.navigate('dashboard');
  };

  render() {
    const {email, password, fullName, nickName, photoURL} = this.state;
    return (
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={percentToVal(52)}
        style={styles.mainContainer}>
        <View style={styles.profileImage}>
          <Image style={styles.profile} source={{url: photoURL}} />
        </View>
        <View style={styles.textInputs}>
          <CustomTextInput
            placeholder="Email Id"
            style={commonStyles.inputField}
            handleOnChange={this.handleInputchange}
            name="emailId"
            readOnly={true}
            value={email}
          />
          <CustomTextInput
            placeholder="New password"
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
          <CustomButton label="Update" handleOnPress={this.handleUpdate} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state, ownprops) => ({
  user: userDetails(state, {}),
});

export default connect(mapStateToProps, {setLoader, userLoggedIN})(EditProfile);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  profileImage: {
    flex: 1,
    height: percentToVal(100 / 6),
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
  },
  textInputs: {
    flex: 5,
  },
  profile: {
    borderWidth: 1,
    borderColor: 'red',
    height: percentToVal(100 / 7),
    width: percentToVal(100 / 7),
    borderRadius: percentToVal(100 / 14),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
});
