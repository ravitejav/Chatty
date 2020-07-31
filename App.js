/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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
import {contactSelector} from './app/selectors/SearchSelector';
import FriendService from './app/services/FriendSerivce';
import {addFriendToContactList} from './app/redux/Dashboard/actions';
import {fromEmailToId} from './app/services/Transformer';

class App extends Component {
  constructor(props) {
    super(props);
    this.friendService = new FriendService();
  }

  componentDidMount() {
    const {
      userDetails: {userDetails: {email} = {}, loggedIn, emailVerified} = {},
    } = this.props;
    if (loggedIn && emailVerified) {
      this.friendService.getAllFriends(
        fromEmailToId(email),
        this.friendHandler,
        this.messageHandler,
      );
      this.friendService.getNewFriends(
        fromEmailToId(email),
        this.friendHandler,
      );
    }
  }

  friendHandler = (friend) => {
    const {
      addFriendToContactList,
      contacts,
      userDetails: {loggedIn, emailVerified} = {},
    } = this.props;
    if (
      !(
        contacts.filter((contact) => contact.emailId === friend.emailId)
          .length > 0
      ) &&
      loggedIn &&
      emailVerified
    ) {
      addFriendToContactList(friend);
    }
  };

  messageHandler = (message) => {};

  render() {
    const {
      userDetails: {loggedIn, emailVerified},
      loader,
    } = this.props;
    return (
      <>
        <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator
            size="large"
            color="#000000"
            animating={loader}
            style={loader ? styles.activity : {display: 'none'}}
          />
          <NavigationContainer>
            {loggedIn && emailVerified && <DashBoardNavigator />}
            {(!loggedIn || !emailVerified) && <LoginNavigator />}
          </NavigationContainer>
        </SafeAreaView>
      </>
    );
  }
}

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

export default connect(
  (state, ownprops) => ({
    contacts: contactSelector(state, {}),
    loader: loader(state),
    userDetails: userDetails(state),
  }),
  {addFriendToContactList},
)(App);
