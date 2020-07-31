import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

import {percentToVal} from '../styles/CommonStyles';
import Contacts from './Contacts';
import {contactSelector} from '../../selectors/SearchSelector';
import LoginService from '../../services/LoginService';
import {logOut} from '../../redux/Auth/actions';
import {resetFriendList} from '../../redux/Dashboard/actions';
import {resetMessages} from '../../redux/Messages/actions';
import {
  setCurentContact,
  removeCurrentContact,
} from '../../redux/Messages/actions';

const props = {};
class DashBoard extends Component<props> {
  constructor(props) {
    super(props);
    this.loginService = new LoginService();
  }

  onContactSelect = (item, index) => {
    this.props.setCurentContact({...item});
    this.props.navigation.navigate('messageContainer');
  };

  handleLogout = () => {
    this.loginService
      .logout()
      .then((response) => {
        this.props.logOut();
        this.props.resetFriendList();
        this.props.resetMessages();
      })
      .catch((error) => {
        alert('Failed to signout try again');
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.contacts}>
          <Contacts
            contacts={this.props.contacts}
            onContactSelect={this.onContactSelect}
          />
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('addFriend')}
            style={styles.bottomBarElements}>
            <Icon name="user-plus" size={18} />
            <Text>Add Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('editProfile')}
            style={styles.bottomBarElements}>
            <Icon name="user-edit" size={18} />
            <Text>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.handleLogout()}
            style={styles.bottomBarElements}>
            <Icon name="sign-in-alt" size={18} />
            <Text>LogOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  contacts: contactSelector(state, {}),
});

export default connect(mapStateToProps, {
  logOut,
  resetFriendList,
  setCurentContact,
  removeCurrentContact,
  resetMessages,
})(DashBoard);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  bottomBar: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomBarElements: {
    flex: 1,
    padding: percentToVal(2),
    borderWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contacts: {
    flex: 0.9,
  },
});
